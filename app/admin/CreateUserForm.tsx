"use client";

import { useActionState } from "react";
import { createUser } from "./actions";

type State = { error?: string; success?: boolean } | null;

async function createUserAction(_: State, formData: FormData): Promise<State> {
  return createUser(formData);
}

export default function CreateUserForm() {
  const [state, formAction, pending] = useActionState<State, FormData>(createUserAction, null);

  return (
    <form action={formAction} className="w-full max-w-md sm:max-w-lg bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-800">
      {state?.success && (
        <div role="status" className="mb-4 p-3 bg-green-900/50 border border-green-500 rounded text-green-300 text-sm">
          Compte créé avec succès.
        </div>
      )}
      {state?.error && (
        <div role="alert" className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-300 text-sm">
          {state.error}
        </div>
      )}
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="etudiant@exemple.fr"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Mot de passe (8 caractères minimum)
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-lg transition-colors"
        >
          {pending ? "Création..." : "Créer le compte"}
        </button>
      </div>
    </form>
  );
}
