"use client";

import { useState } from "react";
import { toggleActive, deleteUser } from "./actions";
import { UserDisplay } from "./page";

interface Props {
  users: UserDisplay[];
  currentUserId: string;
}

export default function UserTable({ users, currentUserId }: Props) {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  async function handleToggle(user: UserDisplay) {
    setLoading(user.id);
    setError(null);
    const result = await toggleActive(user.id, user.is_active);
    if ("error" in result) setError(result.error || null);
    setLoading(null);
  }

  async function handleDelete(userId: string) {
    if (confirmId !== userId) {
      setConfirmId(userId);
      return;
    }
    setConfirmId(null);
    setLoading(userId);
    setError(null);
    const result = await deleteUser(userId);
    if ("error" in result) setError(result.error || null);
    setLoading(null);
  }

  return (
    <div>
      {error && (
        <div role="alert" className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-300 text-sm">
          {error}
        </div>
      )}
      <div className="overflow-x-auto rounded-lg border border-gray-800">
        <table className="w-full text-sm">
          <thead className="bg-gray-900 text-gray-400">
            <tr>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Rôle</th>
              <th className="text-left px-4 py-3">Statut</th>
              <th className="text-left px-4 py-3">Créé le</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {users.map((user) => {
              const isSelf = user.id === currentUserId;
              const isLoading = loading === user.id;
              return (
                <tr key={user.id} className="bg-gray-900/50 hover:bg-gray-900 transition-colors">
                  <td className="px-4 py-3 font-mono text-gray-200">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-purple-900/50 text-purple-300"
                        : "bg-blue-900/50 text-blue-300"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      user.is_active
                        ? "bg-green-900/50 text-green-300"
                        : "bg-red-900/50 text-red-300"
                    }`}>
                      {user.is_active ? "Actif" : "Inactif"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {new Date(user.created_at).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    {!isSelf && (
                      <>
                        <button
                          onClick={() => handleToggle(user)}
                          disabled={isLoading}
                          className="px-3 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition-colors"
                        >
                          {isLoading ? "..." : user.is_active ? "Désactiver" : "Activer"}
                        </button>
                        {confirmId === user.id ? (
                          <span className="inline-flex gap-1">
                            <button
                              onClick={() => handleDelete(user.id)}
                              disabled={isLoading}
                              aria-label={`Confirmer la suppression de ${user.email}`}
                              className="px-3 py-1 text-xs rounded bg-red-700 hover:bg-red-600 text-white disabled:opacity-50 transition-colors"
                            >
                              Confirmer
                            </button>
                            <button
                              onClick={() => setConfirmId(null)}
                              className="px-3 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition-colors"
                            >
                              Annuler
                            </button>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleDelete(user.id)}
                            disabled={isLoading}
                            className="px-3 py-1 text-xs rounded bg-red-900/50 hover:bg-red-800 text-red-300 disabled:opacity-50 transition-colors"
                          >
                            {isLoading ? "..." : "Supprimer"}
                          </button>
                        )}
                      </>
                    )}
                    {isSelf && <span className="text-gray-600 text-xs">Vous</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
