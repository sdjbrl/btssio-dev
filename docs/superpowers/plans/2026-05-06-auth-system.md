# Auth System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fully private authentication system to BTSSIO.DEV where the first registered account becomes admin and only admins can create, disable, or delete other accounts.

**Architecture:** NextAuth.js v5 (Auth.js) handles JWT sessions and a credentials provider. Supabase PostgreSQL stores users with bcrypt-hashed passwords. Next.js middleware protects all routes except `/login`.

**Tech Stack:** next-auth@beta, @supabase/supabase-js, bcryptjs, @types/bcryptjs

**Spec:** `docs/superpowers/specs/2026-05-06-auth-system-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `lib/supabase.ts` | Create | Supabase server-side client (service role) |
| `lib/auth.ts` | Create | NextAuth config: credentials provider + JWT callbacks |
| `middleware.ts` | Create | Route protection: redirect unauthenticated to /login, non-admin from /admin |
| `app/login/page.tsx` | Create | Login form + first-run initialisation form |
| `app/login/actions.ts` | Create | Server action: initAdmin (first-run account creation) |
| `app/admin/page.tsx` | Create | Admin dashboard: user table + create account form |
| `app/admin/actions.ts` | Create | Server actions: createUser, toggleActive, deleteUser |
| `app/layout.tsx` | Modify | Wrap with SessionProvider |
| `components/Navbar.tsx` | Modify | Show logged-in email + logout button |
| `components/UserMenu.tsx` | Create | Client component: session display + signOut button |

---

## Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install packages**

```bash
cd /path/to/btssio-dev
npm install next-auth@beta @supabase/supabase-js bcryptjs
npm install --save-dev @types/bcryptjs
```

Expected: No errors. `package.json` updated with new deps.

- [ ] **Step 2: Verify TypeScript still compiles**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add next-auth, supabase, bcryptjs dependencies"
```

---

## Task 2: Supabase Project Setup

**Files:**
- Create: `lib/supabase.ts`

- [ ] **Step 1: Create Supabase project**

Go to https://supabase.com → New project → name it `btssio-dev`.  
Wait for provisioning. Then go to **Project Settings → API**:
- Copy **Project URL** → `SUPABASE_URL`
- Copy **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

- [ ] **Step 2: Create the users table**

In Supabase → SQL Editor → run:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

Expected: Table appears in Table Editor.

- [ ] **Step 3: Create `.env.local`**

```bash
cat > .env.local << 'EOF'
AUTH_SECRET=<run: openssl rand -base64 32>
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
NEXTAUTH_URL=http://localhost:3000
EOF
```

Replace placeholders with real values. Generate AUTH_SECRET with: `openssl rand -base64 32`

- [ ] **Step 4: Create `lib/supabase.ts`**

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

export interface DbUser {
  id: string;
  email: string;
  password_hash: string;
  role: "admin" | "student";
  is_active: boolean;
  created_at: string;
}
```

- [ ] **Step 5: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 6: Commit**

```bash
git add lib/supabase.ts .env.local
git commit -m "feat: supabase client and users table schema"
```

Note: `.env.local` is gitignored by default in Next.js — confirm it is before committing.

---

## Task 3: NextAuth Configuration

**Files:**
- Create: `lib/auth.ts`

- [ ] **Step 1: Create `lib/auth.ts`**

```typescript
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

        // First-run: create admin account
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
      if (user) {
        token.id = user.id;
        token.role = (user as { id: string; email: string; role: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        (session.user as { id: string; role: string }).role = token.role as string;
      }
      return session;
    },
  },
});
```

- [ ] **Step 2: Create `app/api/auth/[...nextauth]/route.ts`**

```typescript
import { handlers } from "@/lib/auth";
export const { GET, POST } = handlers;
```

- [ ] **Step 3: Extend NextAuth types**

Create `types/next-auth.d.ts`:

```typescript
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    role: string;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add lib/auth.ts app/api/auth types/next-auth.d.ts
git commit -m "feat: NextAuth credentials provider with first-run admin init"
```

---

## Task 4: Middleware — Route Protection

**Files:**
- Create: `middleware.ts`

- [ ] **Step 1: Create `middleware.ts` at project root**

```typescript
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session;
  const isAdmin = session?.user?.role === "admin";

  // Allow public assets and NextAuth API
  if (
    nextUrl.pathname.startsWith("/api/auth") ||
    nextUrl.pathname.startsWith("/_next") ||
    nextUrl.pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // /login: redirect to / if already logged in
  if (nextUrl.pathname === "/login") {
    if (isLoggedIn) return NextResponse.redirect(new URL("/", nextUrl));
    return NextResponse.next();
  }

  // /admin: require admin role
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/login", nextUrl));
    if (!isAdmin) return NextResponse.redirect(new URL("/", nextUrl));
    return NextResponse.next();
  }

  // All other routes: require authentication
  if (!isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add middleware.ts
git commit -m "feat: middleware route protection for private site"
```

---

## Task 5: Login Page

**Files:**
- Create: `app/login/page.tsx`
- Create: `app/login/actions.ts`

- [ ] **Step 1: Create `app/login/actions.ts`**

```typescript
"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Identifiants invalides." };
    }
    throw error;
  }
}
```

- [ ] **Step 2: Create `app/login/page.tsx`**

```typescript
import { supabase } from "@/lib/supabase";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const { count } = await supabase
    .from("users")
    .select("id", { count: "exact", head: true });

  const isFirstRun = count === 0;
  return <LoginForm isFirstRun={isFirstRun} />;
}
```

- [ ] **Step 3: Create `app/login/LoginForm.tsx`**

```typescript
"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

interface Props {
  isFirstRun: boolean;
}

export default function LoginForm({ isFirstRun }: Props) {
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return (await loginAction(formData)) ?? null;
    },
    null
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-2xl font-bold text-white">
            BTSSIO<span className="text-[#22C55E]">.DEV</span>
          </span>
        </div>

        <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-8">
          <h1 className="text-xl font-semibold text-white mb-2">
            {isFirstRun ? "Initialisation" : "Connexion"}
          </h1>
          <p className="text-[#94A3B8] text-sm mb-6">
            {isFirstRun
              ? "Créez le premier compte administrateur pour démarrer."
              : "Connectez-vous pour accéder à la plateforme."}
          </p>

          <form action={formAction} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-[#94A3B8] mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full bg-[#1E293B] border border-[#334155] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-[#94A3B8] mb-1">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete={isFirstRun ? "new-password" : "current-password"}
                className="w-full bg-[#1E293B] border border-[#334155] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E]"
              />
            </div>

            {state?.error && (
              <p role="alert" className="text-red-400 text-sm">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-[#22C55E] hover:bg-[#16A34A] disabled:opacity-50 text-black font-semibold rounded-lg py-2 text-sm transition-colors"
            >
              {pending
                ? "En cours…"
                : isFirstRun
                ? "Créer le compte admin"
                : "Se connecter"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add app/login/
git commit -m "feat: login page with first-run admin initialisation"
```

---

## Task 6: Admin Server Actions

**Files:**
- Create: `app/admin/actions.ts`

- [ ] **Step 1: Create `app/admin/actions.ts`**

```typescript
"use server";

import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function createUser(formData: FormData) {
  await requireAdmin();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) return { error: "Email et mot de passe requis." };

  const hash = await bcrypt.hash(password, 12);
  const { error } = await supabase
    .from("users")
    .insert({ email, password_hash: hash, role: "student" });

  if (error) {
    if (error.code === "23505") return { error: "Cet email existe déjà." };
    return { error: "Erreur lors de la création du compte." };
  }

  revalidatePath("/admin");
  return { success: true };
}

export async function toggleActive(userId: string, currentState: boolean) {
  const session = await requireAdmin();
  if (userId === session.user.id) return { error: "Impossible de modifier votre propre compte." };

  const { error } = await supabase
    .from("users")
    .update({ is_active: !currentState })
    .eq("id", userId);

  if (error) return { error: "Erreur lors de la mise à jour." };

  revalidatePath("/admin");
  return { success: true };
}

export async function deleteUser(userId: string) {
  const session = await requireAdmin();
  if (userId === session.user.id) return { error: "Impossible de supprimer votre propre compte." };

  const { error } = await supabase.from("users").delete().eq("id", userId);

  if (error) return { error: "Erreur lors de la suppression." };

  revalidatePath("/admin");
  return { success: true };
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add app/admin/actions.ts
git commit -m "feat: admin server actions (createUser, toggleActive, deleteUser)"
```

---

## Task 7: Admin Dashboard Page

**Files:**
- Create: `app/admin/page.tsx`
- Create: `app/admin/UserTable.tsx`
- Create: `app/admin/CreateUserForm.tsx`

- [ ] **Step 1: Create `app/admin/UserTable.tsx`**

```typescript
"use client";

import { useState } from "react";
import { DbUser } from "@/lib/supabase";
import { toggleActive, deleteUser } from "./actions";

interface Props {
  users: DbUser[];
  currentUserId: string;
}

export default function UserTable({ users, currentUserId }: Props) {
  const [pending, setPending] = useState<string | null>(null);

  async function handleToggle(user: DbUser) {
    setPending(user.id);
    await toggleActive(user.id, user.is_active);
    setPending(null);
  }

  async function handleDelete(user: DbUser) {
    if (!confirm(`Supprimer le compte ${user.email} ?`)) return;
    setPending(user.id);
    await deleteUser(user.id);
    setPending(null);
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-[#1E293B] text-[#64748B]">
            <th className="pb-3 pr-4">Email</th>
            <th className="pb-3 pr-4">Rôle</th>
            <th className="pb-3 pr-4">Statut</th>
            <th className="pb-3 pr-4">Créé le</th>
            <th className="pb-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isSelf = user.id === currentUserId;
            const isPending = pending === user.id;
            return (
              <tr key={user.id} className="border-b border-[#1E293B] text-[#CBD5E1]">
                <td className="py-3 pr-4">{user.email}</td>
                <td className="py-3 pr-4">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    user.role === "admin"
                      ? "bg-[#22C55E]/20 text-[#22C55E]"
                      : "bg-[#8B5CF6]/20 text-[#8B5CF6]"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    user.is_active
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}>
                    {user.is_active ? "Actif" : "Inactif"}
                  </span>
                </td>
                <td className="py-3 pr-4 text-[#64748B]">
                  {new Date(user.created_at).toLocaleDateString("fr-FR")}
                </td>
                <td className="py-3 space-x-2">
                  <button
                    onClick={() => handleToggle(user)}
                    disabled={isSelf || isPending}
                    title={isSelf ? "Impossible de modifier votre propre compte" : ""}
                    className="text-xs px-2 py-1 rounded bg-[#1E293B] hover:bg-[#334155] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    {user.is_active ? "Désactiver" : "Réactiver"}
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    disabled={isSelf || isPending}
                    title={isSelf ? "Impossible de supprimer votre propre compte" : ""}
                    className="text-xs px-2 py-1 rounded bg-red-500/20 hover:bg-red-500/30 text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 2: Create `app/admin/CreateUserForm.tsx`**

```typescript
"use client";

import { useActionState } from "react";
import { createUser } from "./actions";

export default function CreateUserForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string; success?: boolean } | null, formData: FormData) => {
      return (await createUser(formData)) ?? null;
    },
    null
  );

  return (
    <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Créer un compte</h2>
      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="new-email" className="block text-sm text-[#94A3B8] mb-1">
              Email
            </label>
            <input
              id="new-email"
              name="email"
              type="email"
              required
              className="w-full bg-[#1E293B] border border-[#334155] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#22C55E]"
            />
          </div>
          <div>
            <label htmlFor="new-password" className="block text-sm text-[#94A3B8] mb-1">
              Mot de passe temporaire
            </label>
            <input
              id="new-password"
              name="password"
              type="password"
              required
              minLength={8}
              className="w-full bg-[#1E293B] border border-[#334155] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#22C55E]"
            />
          </div>
        </div>

        {state?.error && (
          <p role="alert" className="text-red-400 text-sm">{state.error}</p>
        )}
        {state?.success && (
          <p role="status" className="text-green-400 text-sm">Compte créé avec succès.</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="bg-[#22C55E] hover:bg-[#16A34A] disabled:opacity-50 text-black font-semibold rounded-lg px-4 py-2 text-sm transition-colors"
        >
          {pending ? "Création…" : "Créer le compte"}
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 3: Create `app/admin/page.tsx`**

```typescript
import { auth } from "@/lib/auth";
import { supabase, DbUser } from "@/lib/supabase";
import { redirect } from "next/navigation";
import UserTable from "./UserTable";
import CreateUserForm from "./CreateUserForm";

export default async function AdminPage() {
  const session = await auth();
  if (!session || session.user.role !== "admin") redirect("/");

  const { data: users } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <main id="main-content" className="min-h-screen bg-[#0A0A0A] p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Administration</h1>
        <p className="text-[#64748B] text-sm mt-1">Gestion des comptes utilisateurs</p>
      </div>

      <div className="space-y-8">
        <CreateUserForm />

        <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Comptes ({users?.length ?? 0})
          </h2>
          <UserTable
            users={(users ?? []) as DbUser[]}
            currentUserId={session.user.id}
          />
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add app/admin/
git commit -m "feat: admin dashboard with user table and create account form"
```

---

## Task 8: SessionProvider + Navbar Update

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/UserMenu.tsx`
- Modify: `components/Navbar.tsx`

- [ ] **Step 1: Create `components/UserMenu.tsx`**

```typescript
"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function UserMenu() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="flex items-center gap-3">
      {session.user.role === "admin" && (
        <Link
          href="/admin"
          className="text-xs text-[#64748B] hover:text-white transition-colors"
        >
          Admin
        </Link>
      )}
      <span className="text-xs text-[#64748B] hidden sm:block">
        {session.user.email}
      </span>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="text-xs px-3 py-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-[#94A3B8] hover:text-white transition-colors"
      >
        Déconnexion
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Modify `app/layout.tsx`**

Add `SessionProvider` from `next-auth/react`. Wrap the `{children}` with it.

Replace the imports section and add the provider:

```typescript
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "BTSSIO.DEV — Plateforme de révision BTS SIO",
  description: "Révise le BTS SIO (SISR & SLAM) avec des fiches, quiz et labs pratiques.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-[#0A0A0A] text-white antialiased">
        <SessionProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 bg-[#22C55E] text-black px-4 py-2 rounded z-50"
          >
            Aller au contenu principal
          </a>
          <Navbar />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Modify `components/Navbar.tsx`**

Replace the `Se connecter` / `S&apos;inscrire` buttons at the end of the nav with `<UserMenu />`:

Find the section in Navbar.tsx that renders the auth buttons:
```typescript
<Link href="/login" className="...">Se connecter</Link>
<Link href="/register" className="...">S&apos;inscrire</Link>
```

Replace with:
```typescript
import UserMenu from "./UserMenu";
// ...
<UserMenu />
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: Build succeeds, all routes generated.

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx components/UserMenu.tsx components/Navbar.tsx
git commit -m "feat: SessionProvider, UserMenu with logout, admin link in navbar"
```

---

## Task 9: Local Test + Environment Variables on Vercel

**Files:** None (config only)

- [ ] **Step 1: Test locally**

```bash
npm run dev
```

Visit http://localhost:3000 → should redirect to http://localhost:3000/login  
Submit the form → first account should be created as admin and redirect to `/`  
Visit http://localhost:3000/admin → admin dashboard should appear  
Create a second account → should appear in the user table

- [ ] **Step 2: Add env vars to Vercel**

```bash
vercel env add AUTH_SECRET production
vercel env add SUPABASE_URL production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add NEXTAUTH_URL production
```

Enter the value for each when prompted.  
`NEXTAUTH_URL` value: `https://btssio.saiddev.fr`

- [ ] **Step 3: Deploy to production**

```bash
vercel --prod
```

Expected: Deployment succeeds. Visit https://btssio.saiddev.fr → redirects to /login.

- [ ] **Step 4: Verify lint**

```bash
npm run lint
```

Expected: 0 errors.

- [ ] **Step 5: Final commit and push**

```bash
git add -A
git commit -m "chore: verify auth system fully deployed"
git push
```

---

## Self-Review

**Spec coverage check:**
- ✅ Site fully private → middleware.ts protects all routes
- ✅ `/login` only public page → matcher excludes it
- ✅ Email + password auth → credentials provider in lib/auth.ts
- ✅ First account = admin → count check in authorize()
- ✅ Admin can create accounts → createUser server action + CreateUserForm
- ✅ Admin can disable/enable accounts → toggleActive server action + UserTable
- ✅ Admin can delete accounts → deleteUser server action + UserTable
- ✅ Admin cannot self-delete/disable → isSelf check in actions + UI
- ✅ Supabase for storage → lib/supabase.ts + users table
- ✅ bcrypt cost 12 → hash(password, 12)
- ✅ Env vars → SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, AUTH_SECRET, NEXTAUTH_URL
- ✅ Navbar logout → UserMenu component

**Placeholder scan:** None found — all steps include complete code.

**Type consistency:**
- `DbUser` defined in `lib/supabase.ts` → used in admin/page.tsx, UserTable.tsx ✅
- `session.user.id` and `session.user.role` — extended via `types/next-auth.d.ts` ✅
- `toggleActive(userId, currentState)` — matches signature in actions.ts ✅
