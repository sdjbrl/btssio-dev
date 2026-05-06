# Auth System Design — BTSSIO.DEV

**Date:** 2026-05-06  
**Status:** Approved

## Context

The platform is fully private. All content requires authentication. Users log in with email + password. The first account created automatically becomes admin; only admins can create, disable, or delete other accounts.

## Stack

- **NextAuth.js v5** (Auth.js) — session management (JWT), credentials provider, middleware route protection
- **Supabase** (PostgreSQL) — user storage (`users` table) with bcrypt-hashed passwords
- No Supabase Auth SDK — using Supabase only as a database via `@supabase/supabase-js`

## Database Schema

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student', -- 'admin' | 'student'
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

The first inserted row gets `role = 'admin'`. All subsequent rows get `role = 'student'`.

## Route Protection

Handled by Next.js middleware (`middleware.ts`):

| Route | Access |
|-------|--------|
| `/login` | Public (only unauthenticated page) |
| `/admin` | Authenticated + role = 'admin' only |
| `/*` | Authenticated users only |

Unauthenticated requests to protected routes → redirect to `/login`.  
Authenticated non-admin requests to `/admin` → redirect to `/`.

## Pages & Components

### `/login`

- Single page accessible without session
- Form: email input + password input + submit button
- On first visit with 0 users in DB → form displays as "Initialisation — Créer le compte administrateur"
- On error: generic message "Identifiants invalides" (no distinguishing email vs password)
- On success: redirect to `/` (or intended URL via `callbackUrl`)

### `/admin`

Admin-only dashboard with two sections:

**User list table:**
- Columns: Email, Rôle, Statut (Actif/Inactif), Date de création, Actions
- Actions per row: Désactiver / Réactiver toggle, Supprimer (with confirmation)
- Admin cannot delete or disable their own account (button disabled + tooltip)

**Create account form:**
- Fields: Email, Mot de passe temporaire
- Role is always `student` (only one admin)
- On success: account added to table immediately

## Auth Flow

```
1. User visits any route → middleware checks session
2. No session → redirect to /login
3. /login POST → NextAuth credentials provider
   a. Count users in DB
   b. If count = 0 → create admin account → return session
   c. If count > 0 → look up user by email, verify bcrypt hash, check is_active
4. Session stored as JWT (no DB session table needed)
5. JWT includes: id, email, role
6. Admin routes: middleware reads role from JWT → deny if not 'admin'
```

## Security

- Passwords hashed with `bcrypt` (cost factor 12)
- NextAuth secret via `AUTH_SECRET` env var
- Supabase connection via `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` env vars (server-side only, never exposed to client)
- No public registration endpoint
- Disabled accounts cannot log in (checked during credentials validation)
- Admin self-delete/disable blocked at UI and API level

## Environment Variables

```
AUTH_SECRET=<random 32-char string>
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service role key>
NEXTAUTH_URL=https://btssio.saiddev.fr
```

## Files to Create / Modify

| File | Action | Purpose |
|------|--------|---------|
| `lib/supabase.ts` | Create | Supabase client (server-side) |
| `lib/auth.ts` | Create | NextAuth config (credentials provider, callbacks) |
| `middleware.ts` | Create | Route protection logic |
| `app/login/page.tsx` | Create | Login + first-run init form |
| `app/admin/page.tsx` | Create | Admin dashboard |
| `app/admin/actions.ts` | Create | Server actions: createUser, toggleActive, deleteUser |
| `app/layout.tsx` | Modify | Add SessionProvider wrapper |
| `components/Navbar.tsx` | Modify | Show user email + logout button when authenticated |

## Out of Scope

- Password reset / forgot password flow
- Email verification
- OAuth providers (Google, GitHub, etc.)
- Multiple admin roles
- Audit logs
