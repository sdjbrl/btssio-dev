"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trophy, BookOpen, CheckCircle2, Circle } from "lucide-react";
import { getProgress } from "@/lib/progress";

interface ModuleDef {
  label: string;
  href: string;
  key: string;
}

const mainModules: ModuleDef[] = [
  { label: "Tronc Commun — Bloc 1", href: "/tronc-commun", key: "tronc-commun" },
  { label: "SISR — Bloc 2", href: "/sisr/bloc2", key: "sisr-bloc2" },
  { label: "SISR — Bloc 3 Cybersécurité", href: "/sisr/bloc3", key: "sisr-bloc3" },
  { label: "SLAM — Bloc 2", href: "/slam/bloc2", key: "slam-bloc2" },
  { label: "SLAM — Bloc 3 Cybersécurité", href: "/slam/bloc3", key: "slam-bloc3" },
  { label: "Préparation aux Épreuves", href: "/examens", key: "examens" },
];

const generalSubjectGroups: Array<{ title: string; modules: ModuleDef[] }> = [
  {
    title: "CEJM",
    modules: [
      { label: "CEJM — Le Marché", href: "/cejm/marche", key: "cejm-marche" },
      { label: "CEJM — Droit", href: "/cejm/droit", key: "cejm-droit" },
      { label: "CEJM — Management", href: "/cejm/management", key: "cejm-management" },
      { label: "CEJM — Ressources Humaines", href: "/cejm/ressources-humaines", key: "cejm-rh" },
      { label: "CEJM — Finance", href: "/cejm/finance", key: "cejm-finance" },
    ],
  },
  {
    title: "Anglais",
    modules: [
      { label: "Anglais — Vocabulaire Tech", href: "/anglais/vocabulaire-technique", key: "anglais-vocabulaire" },
      { label: "Anglais — Compréhension", href: "/anglais/comprehension", key: "anglais-comprehension" },
      { label: "Anglais — Expression", href: "/anglais/expression", key: "anglais-expression" },
    ],
  },
  {
    title: "Mathématiques",
    modules: [
      { label: "Maths — Algorithmique", href: "/mathematiques/algorithmique", key: "maths-algorithmique" },
      { label: "Maths — Graphes", href: "/mathematiques/graphes", key: "maths-graphes" },
      { label: "Maths — Matrices", href: "/mathematiques/matrices", key: "maths-matrices" },
      { label: "Maths — Cryptographie", href: "/mathematiques/cryptographie", key: "maths-cryptographie" },
      { label: "Maths — Probabilités", href: "/mathematiques/probabilites", key: "maths-probabilites" },
    ],
  },
  {
    title: "Culture Générale",
    modules: [
      { label: "Culture Gén. — Méthodologie", href: "/culture-generale/methodologie", key: "cge-methodologie" },
      { label: "Culture Gén. — Expression", href: "/culture-generale/expression-ecrite", key: "cge-expression-ecrite" },
      { label: "Culture Gén. — Numérique", href: "/culture-generale/culture-numerique", key: "cge-culture-numerique" },
    ],
  },
  {
    title: "Maths Expertes",
    modules: [
      { label: "Maths Exp. — Arithmétique", href: "/mathematiques-expertes/arithmetique", key: "maths-expertes-arithmetique" },
      { label: "Maths Exp. — Graphes", href: "/mathematiques-expertes/graphes-avances", key: "maths-expertes-graphes" },
      { label: "Maths Exp. — Probabilités", href: "/mathematiques-expertes/probabilites-avancees", key: "maths-expertes-proba" },
    ],
  },
];

const allModules = [...mainModules, ...generalSubjectGroups.flatMap((group) => group.modules)];

interface Progress {
  [key: string]: number;
}

function ModuleList({ modules, progress }: { modules: ModuleDef[]; progress: Progress }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {modules.map((mod) => {
        const pct = progress[mod.key] ?? 0;
        const done = pct >= 100;

        return (
          <Link
            key={mod.key}
            href={mod.href}
            className="group flex flex-col gap-4 rounded-xl border border-[#334155] bg-[#1E293B] p-4 transition-all hover:border-[#475569] sm:flex-row sm:items-center sm:p-5"
          >
            {done ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#22C55E]" />
            ) : (
              <Circle className="h-5 w-5 shrink-0 text-[#475569]" />
            )}
            <div className="min-w-0 flex-1">
              <div className="mb-1.5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <span className="truncate text-sm font-medium">{mod.label}</span>
                <span className="ml-2 text-xs font-mono text-[#94A3B8]">{pct}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[#334155]">
                <div
                  className="h-full rounded-full bg-[#22C55E] transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
            <BookOpen className="h-4 w-4 shrink-0 text-[#475569] transition-colors group-hover:text-white" />
          </Link>
        );
      })}
    </div>
  );
}

export default function ProgressionPage() {
  const [progress, setProgress] = useState<Progress>({});

  useEffect(() => {
    const parsed = getProgress().modules as Progress;
    // Reading localStorage after mount — safe pattern, setState intentional
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(parsed);
  }, []);

  const completed = allModules.filter((m) => (progress[m.key] ?? 0) >= 100).length;
  const total = allModules.length;
  const globalPct = Math.round((completed / total) * 100);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono mb-2">Ma Progression</h1>
          <p className="text-[#94A3B8]">Suivi de ta révision par module</p>
        </div>

        <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <Trophy className="w-6 h-6 text-[#F59E0B]" />
            <span className="font-semibold">Progression globale</span>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-2">
            <span className="text-sm text-[#94A3B8]">{completed} / {total} modules terminés</span>
            <span className="text-sm font-mono font-bold text-[#22C55E]">{globalPct}%</span>
          </div>
          <div className="h-2 bg-[#334155] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] rounded-full transition-all duration-500"
              style={{ width: `${globalPct}%` }}
            />
          </div>
        </div>

        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-white">Parcours principal</h2>
            <p className="text-sm text-[#94A3B8]">Tronc commun, spécialités et préparation aux épreuves.</p>
          </div>
          <ModuleList modules={mainModules} progress={progress} />
        </section>

        <section>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">Matières Générales</h2>
            <p className="text-sm text-[#94A3B8]">Tous les modules complémentaires pour renforcer la culture générale du BTS SIO.</p>
          </div>

          <div className="space-y-8">
            {generalSubjectGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 text-lg font-semibold text-[#E2E8F0]">{group.title}</h3>
                <ModuleList modules={group.modules} progress={progress} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
