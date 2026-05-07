"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, BarChart2, ChevronRight, Code2, GitBranch, Grid, Lock } from "lucide-react";

const chapters: Array<{
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  points: string[];
}> = [
  {
    href: "/mathematiques/algorithmique",
    title: "Algorithmique et Programmation",
    description: "Variables, structures de contrôle, fonctions, récursivité, complexité et algorithmes classiques.",
    icon: Code2,
    points: ["Pseudo-code BTS SIO", "Complexité O(n)", "Tri et recherche"],
  },
  {
    href: "/mathematiques/graphes",
    title: "Théorie des Graphes",
    description: "Sommets, arêtes, parcours, plus court chemin, arbres couvrants minimaux et arbres binaires.",
    icon: GitBranch,
    points: ["BFS / DFS", "Dijkstra", "Kruskal / Prim"],
  },
  {
    href: "/mathematiques/matrices",
    title: "Matrices et Systèmes Linéaires",
    description: "Calcul matriciel, déterminants, inverse, pivot de Gauss et applications aux graphes et à la crypto.",
    icon: Grid,
    points: ["Produit matriciel", "Déterminants", "Résolution de systèmes"],
  },
  {
    href: "/mathematiques/cryptographie",
    title: "Cryptographie et Sécurité",
    description: "AES, RSA, hachage, PKI, certificats, TLS et signature numérique dans les usages informatiques.",
    icon: Lock,
    points: ["Symétrique / asymétrique", "Hash & bcrypt", "Certificats TLS"],
  },
  {
    href: "/mathematiques/probabilites",
    title: "Probabilités et Statistiques",
    description: "Événements, conditionnelle, loi binomiale, loi normale, espérance, variance et intervalles de confiance.",
    icon: BarChart2,
    points: ["Probabilités conditionnelles", "Loi binomiale", "Combinaisons"],
  },
];

export default function MathematiquesPage() {
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
          <div className="inline-flex items-center gap-2 rounded-full border border-[#EC4899]/30 bg-[#EC4899]/10 px-3 py-1 text-sm text-[#EC4899] mb-4">
            <Code2 className="w-4 h-4" />
            Mathématiques pour l&apos;informatique
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">MATHÉMATIQUES — BTS SIO</h1>
          <p className="text-[#94A3B8] text-base sm:text-lg">
            Révisions ciblées sur les notions mathématiques utiles en BTS SIO : algorithmique, graphes, matrices, cryptographie et probabilités.
          </p>
        </section>

        <section className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6 mb-8 sm:mb-10">
          <p className="text-sm sm:text-base text-[#E2E8F0]">
            <span className="font-semibold text-[#EC4899]">Repère BTS SIO :</span> Les mathématiques représentent 2h/semaine dans le programme BTS SIO.
          </p>
          <p className="text-[#94A3B8] text-sm mt-2">
            Cette matière soutient la logique, l&apos;analyse de données, la cybersécurité, les réseaux et le développement d&apos;applications.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-[#EC4899] mb-4">Chapitres à réviser</h2>
          <div className="grid gap-4">
            {chapters.map((chapter) => {
              const Icon = chapter.icon;

              return (
                <Link
                  key={chapter.href}
                  href={chapter.href}
                  className="group bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6 hover:border-[#EC4899]/60 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EC4899]/10 border border-[#EC4899]/20">
                        <Icon className="w-6 h-6 text-[#EC4899]" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">{chapter.title}</h3>
                        <p className="text-[#94A3B8] text-sm sm:text-base mb-3">{chapter.description}</p>
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
                    <ChevronRight className="w-5 h-5 text-[#94A3B8] group-hover:text-[#EC4899] transition-colors shrink-0" />
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
