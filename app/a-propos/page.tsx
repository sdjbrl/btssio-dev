import type { Metadata } from "next";
import { Hexagon, GraduationCap, BookOpen, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos | BTSSIO.DEV",
  description: "BTSSIO.DEV — Plateforme de révision créée par Saïd-Djibril AHMED MOUSSA, étudiant en BTS SIO SISR 2ème année.",
};

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <Hexagon className="w-10 h-10 text-[#22C55E]" />
          <div>
            <h1 className="text-3xl font-bold font-mono">BTSSIO.DEV</h1>
            <p className="text-[#94A3B8] text-sm">Plateforme de révision BTS SIO</p>
          </div>
        </div>

        {/* About */}
        <div className="space-y-8">
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-5 h-5 text-[#22C55E]" />
              <h2 className="font-semibold">Le projet</h2>
            </div>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              BTSSIO.DEV est une plateforme de révision dédiée aux étudiants du BTS SIO (Services Informatiques aux
              Organisations), options SISR et SLAM. Elle est basée strictement sur le{" "}
              <span className="text-white">référentiel officiel de l&apos;Éducation Nationale (BO spécial n°5 du 11 avril 2019)</span>.
            </p>
          </div>

          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-[#8B5CF6]" />
              <h2 className="font-semibold">Contenu disponible</h2>
            </div>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              {[
                "Fiches de synthèse (Cheat Sheets) par module",
                "Quiz et QCM d'auto-évaluation",
                "Extraits de code commentés (PHP, SQL, Cisco IOS, Linux…)",
                "Simulateur d'oral — questions de jurys BTS SIO",
                "Suivi de progression par module",
                "Préparation aux épreuves E4, E5, E6",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-[#F59E0B]" />
              <h2 className="font-semibold">Créateur</h2>
            </div>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Créé par{" "}
              <span className="text-[#22C55E] font-semibold">Saïd-Djibril AHMED MOUSSA</span>
              {" "}— étudiant en{" "}
              <span className="text-white font-medium">BTS SIO SISR 2ème année</span>.
              <br /><br />
              Ce projet a été développé pour aider les étudiants BTS SIO à préparer efficacement
              leurs épreuves finales avec des ressources structurées et interactives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
