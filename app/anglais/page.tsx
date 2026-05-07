"use client";

import Link from "next/link";
import { BookOpen, ChevronLeft, ChevronRight, Headphones, MessageSquare } from "lucide-react";

const chapters = [
  {
    href: "/anglais/vocabulaire-technique",
    icon: BookOpen,
    title: "Vocabulaire technique informatique",
    description: "Maîtrise les mots-clés de l'IT en anglais : réseau, cybersécurité, développement, cloud et gestion de projet.",
    points: ["Networking", "Security", "Development", "Cloud & DevOps"],
  },
  {
    href: "/anglais/comprehension",
    icon: Headphones,
    title: "Compréhension écrite et orale",
    description: "Apprends à décoder emails, documentations, tickets et consignes techniques en anglais professionnel.",
    points: ["Emails IT", "Documentation", "Abréviations", "Faux amis"],
  },
  {
    href: "/anglais/expression",
    icon: MessageSquare,
    title: "Expression écrite et orale",
    description: "Prépare tes emails, prises de parole et explications techniques pour le BTS SIO et le monde pro.",
    points: ["Emails formels", "Présentations", "Clarification", "Explication technique"],
  },
];

export default function AnglaisHubPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/matieres-generales"
          className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-white transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour aux matières générales
        </Link>

        <div className="mb-8 sm:mb-10">
          <span className="inline-flex items-center rounded-full border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 px-3 py-1 text-xs font-semibold text-[#0EA5E9]">
            Matière générale — Anglais
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-4 mb-3">Anglais pour l&apos;informatique</h1>
          <p className="text-[#94A3B8] leading-relaxed max-w-3xl">
            Révise l&apos;anglais professionnel du BTS SIO : vocabulaire technique, compréhension de documents IT et expression écrite ou orale.
          </p>
        </div>

        <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6 mb-8 sm:mb-10">
          <p className="text-[#0EA5E9] font-semibold mb-2">À retenir</p>
          <p className="text-[#94A3B8] leading-relaxed">
            L&apos;anglais représente <span className="text-white font-semibold">1/4 de la note du BTS SIO</span>. Cette matière évalue autant la compréhension que la capacité à communiquer dans un contexte technique.
          </p>
        </div>

        <div className="grid gap-6">
          {chapters.map((chapter) => {
            const Icon = chapter.icon;

            return (
              <Link
                key={chapter.href}
                href={chapter.href}
                className="group bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6 hover:border-[#0EA5E9]/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[#0EA5E9]/10 p-3 border border-[#0EA5E9]/20">
                      <Icon className="w-6 h-6 text-[#0EA5E9]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{chapter.title}</h2>
                      <p className="text-[#94A3B8] text-sm mt-1">{chapter.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#94A3B8] group-hover:text-[#0EA5E9] transition-colors shrink-0" />
                </div>

                <div className="flex flex-wrap gap-2">
                  {chapter.points.map((point) => (
                    <span
                      key={point}
                      className="rounded-full border border-[#334155] bg-[#0F172A] px-3 py-1 text-xs text-[#94A3B8]"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
