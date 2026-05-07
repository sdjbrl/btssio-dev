import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { supabase, DbUser } from "./supabase";
import { checkRateLimit, resetRateLimit } from "./rate-limit";

if (!process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET environment variable is not set");
}

// Dummy hash for constant-time comparison to prevent timing attacks
const DUMMY_HASH = "$2b$12$invalidsaltinvalidsaltinvalidsa";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const email = (credentials.email as string).trim().toLowerCase();
          const password = credentials.password as string;

          // Validate email format and enforce minimum password length
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email) || password.length < 8) return null;

          // Rate-limit inside authorize to protect direct NextAuth credential calls
          const rateLimitKey = `authorize:${email}`;
          const rateLimit = checkRateLimit(rateLimitKey);
          if (!rateLimit.allowed) return null;

          // First-run: create admin account if no users exist
          const { count, error: countError } = await supabase
            .from("users")
            .select("id", { count: "exact", head: true });

          if (countError || count === null) return null;

          if (count === 0) {
            const hash = await bcrypt.hash(password, 12);
            const { data, error } = await supabase
              .from("users")
              .insert({ email, password_hash: hash, role: "admin" })
              .select()
              .single();

            if (error) {
              if (error.code !== "23505") return null;
              // Race condition: another request created admin first — fall through to normal login below
            } else {
              const user = data as DbUser;
              resetRateLimit(rateLimitKey);
              return { id: user.id, email: user.email, role: user.role };
            }
          }

          // Normal login
          const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

          // Run dummy bcrypt to prevent user enumeration via timing
          if (error || !data) {
            await bcrypt.compare(password, DUMMY_HASH);
            return null;
          }
          const user = data as DbUser;

          if (!user.is_active) {
            await bcrypt.compare(password, DUMMY_HASH);
            return null;
          }

          const valid = await bcrypt.compare(password, user.password_hash);
          if (!valid) return null;

          resetRateLimit(rateLimitKey);
          return { id: user.id, email: user.email, role: user.role };
        } catch (err) {
          console.error("[auth] authorize error:", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.id) {
        token.id = user.id;
        token.role = (user as { id: string; email: string; role: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.id) {
        session.user.id = token.id;
        (session.user as { id: string; role: string }).role = token.role as string;
      }
      return session;
    },
  },
});
