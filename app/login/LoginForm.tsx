"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

interface Props {
  isFirstRun: boolean;
  callbackUrl: string;
}

export default function LoginForm({ isFirstRun, callbackUrl }: Props) {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
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
            <input type="hidden" name="callbackUrl" value={callbackUrl} />

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
