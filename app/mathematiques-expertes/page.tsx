"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, ChevronRight, Hash, Network, TrendingUp } from "lucide-react";

const chapters: Array<{
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  points: string[];
}> = [
  {
    href: "/mathematiques-expertes/arithmetique",
    title: "Arithmétique et Cryptographie",
    description:
      "Divisibilité, PGCD, congruences, inverses modulaires et bases mathématiques du chiffrement RSA.",
    icon: Hash,
    points: ["Algorithme d'Euclide", "Congruences", "RSA simplifié"],
  },
  {
    href: "/mathematiques-expertes/graphes-avances",
    title: "Graphes et Matrices Avancés",
    description:
      "Graphes valués, flot maximal, plus court chemin, planéité, coloration et chaînes de Markov.",
    icon: Network,
    points: ["Ford-Fulkerson", "Bellman-Ford", "Matrices de transition"],
  },
  {
    href: "/mathematiques-expertes/probabilites-avancees",
    title: "Probabilités et Statistiques Avancées",
    description:
      "Poisson, exponentielle, loi normale, tests statistiques, corrélation et simulation numérique.",
    icon: TrendingUp,
    points: ["TCL", "Chi² & Student", "Régression linéaire"],
  },
];

export default function MathematiquesExpertesPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/matieres-generales"
          className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux matières générales
        </Link>

        <section className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#A78BFA]/30 bg-[#A78BFA]/10 px-3 py-1 text-sm text-[#A78BFA] mb-4">
            <Hash className="w-4 h-4" />
            Option MATHÉMATIQUES EXPERTES
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">MATHÉMATIQUES EXPERTES</h1>
          <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
            Un espace d&apos;approfondissement pour aller plus loin en logique, modélisation, probabilités et outils mathématiques utiles à l&apos;informatique.
          </p>
        </section>

        <section className="bg-[#1E293B] border border-[#A78BFA]/40 rounded-xl p-4 sm:p-6 mb-8 sm:mb-10 shadow-[0_0_0_1px_rgba(167,139,250,0.08)]">
          <p className="text-sm sm:text-base font-semibold text-[#A78BFA] mb-2">
            ⚡ Option facultative — Pour les étudiants souhaitant approfondir les mathématiques
          </p>
          <p className="text-[#CBD5E1] text-sm sm:text-base leading-relaxed">
            Cette option met l&apos;accent sur des notions plus avancées que le tronc commun : arithmétique modulaire, graphes avancés, chaînes de Markov, statistiques et outils utiles en cryptographie ou en analyse de données.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-[#A78BFA] mb-4">Chapitres disponibles</h2>
          <div className="grid gap-4">
            {chapters.map((chapter) => {
              const Icon = chapter.icon;

              return (
                <Link
                  key={chapter.href}
                  href={chapter.href}
                  className="group bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6 hover:border-[#A78BFA]/60 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#A78BFA]/20 bg-[#A78BFA]/10 shrink-0">
                        <Icon className="w-6 h-6 text-[#A78BFA]" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">{chapter.title}</h3>
                        <p className="text-[#94A3B8] text-sm sm:text-base mb-3 leading-relaxed">{chapter.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {chapter.points.map((point) => (
                            <span
                              key={point}
                              className="rounded-full border border-[#334155] bg-[#0F172A] px-3 py-1 text-xs sm:text-sm text-[#CBD5E1]"
                            >
                              {point}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#94A3B8] group-hover:text-[#A78BFA] transition-colors shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
