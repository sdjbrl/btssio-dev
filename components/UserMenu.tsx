"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function UserMenu() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="flex items-center gap-3">
      {session.user.role === "admin" && (
        <Link
          href="/admin"
          className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          Admin
        </Link>
      )}
      <span className="text-sm text-gray-400 hidden sm:block">
        {session.user.email}
      </span>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
      >
        Déconnexion
      </button>
    </div>
  );
}
