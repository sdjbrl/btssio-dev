import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { supabase, DbUser } from "./supabase";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
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
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        // First-run: create admin account if no users exist
        const { count } = await supabase
          .from("users")
          .select("id", { count: "exact", head: true });

        if (count === 0) {
          const hash = await bcrypt.hash(password, 12);
          const { data, error } = await supabase
            .from("users")
            .insert({ email, password_hash: hash, role: "admin" })
            .select()
            .single();
          if (error || !data) return null;
          const user = data as DbUser;
          return { id: user.id, email: user.email, role: user.role };
        }

        // Normal login
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .single();

        if (error || !data) return null;
        const user = data as DbUser;

        if (!user.is_active) return null;

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) return null;

        return { id: user.id, email: user.email, role: user.role };
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
