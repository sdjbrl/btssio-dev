"use client";

import Link from "next/link";
import { BookOpen, Globe, Calculator, Briefcase, FlaskConical } from "lucide-react";

const subjects = [
  {
    title: "Culture Générale & Expression",
    description: "Méthodologie, expression écrite et culture numérique pour réussir l'épreuve E1.",
    href: "/culture-generale",
    accent: "#F97316",
    accentClasses: {
      border: "border-[#F97316]/30",
      bg: "bg-[#F97316]/10",
      text: "text-[#F97316]",
      hover: "hover:border-[#F97316]/60",
    },
    icon: BookOpen,
  },
  {
    title: "Anglais Technique",
    description: "Vocabulaire IT, compréhension et expression dans un contexte professionnel.",
    href: "/anglais",
    accent: "#0EA5E9",
    accentClasses: {
      border: "border-[#0EA5E9]/30",
      bg: "bg-[#0EA5E9]/10",
      text: "text-[#0EA5E9]",
      hover: "hover:border-[#0EA5E9]/60",
    },
    icon: Globe,
  },
  {
    title: "Mathématiques",
    description: "Algorithmique, graphes, matrices, cryptographie et probabilités appliquées au BTS SIO.",
    href: "/mathematiques",
    accent: "#EC4899",
    accentClasses: {
      border: "border-[#EC4899]/30",
      bg: "bg-[#EC4899]/10",
      text: "text-[#EC4899]",
      hover: "hover:border-[#EC4899]/60",
    },
    icon: Calculator,
  },
  {
    title: "CEJM",
    description: "Culture économique, juridique et managériale pour analyser l'entreprise et son environnement.",
    href: "/cejm",
    accent: "#F59E0B",
    accentClasses: {
      border: "border-[#F59E0B]/30",
      bg: "bg-[#F59E0B]/10",
      text: "text-[#F59E0B]",
      hover: "hover:border-[#F59E0B]/60",
    },
    icon: Briefcase,
  },
  {
    title: "Maths Expertes",
    description: "Approfondissements optionnels en arithmétique, graphes avancés et probabilités avancées.",
    href: "/mathematiques-expertes",
    accent: "#A78BFA",
    accentClasses: {
      border: "border-[#A78BFA]/30",
      bg: "bg-[#A78BFA]/10",
      text: "text-[#A78BFA]",
      hover: "hover:border-[#A78BFA]/60",
    },
    icon: FlaskConical,
    badge: "Option",
  },
];

export default function MatieresGeneralesPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#94A3B8] transition-colors hover:text-white">
          <span aria-hidden="true">←</span>
          Accueil
        </Link>

        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#38BDF8]">Hub de révision</p>
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">Matières Générales</h1>
          <p className="mt-3 text-base text-[#94A3B8] sm:text-lg">
            Toutes les matières générales du BTS SIO
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {subjects.map((subject) => {
            const Icon = subject.icon;

            return (
              <Link
                key={subject.href}
                href={subject.href}
                className={`group rounded-2xl border bg-[#1E293B] p-5 transition-all ${subject.accentClasses.border} ${subject.accentClasses.hover}`}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${subject.accentClasses.border} ${subject.accentClasses.bg}`}>
                    <Icon className={`h-6 w-6 ${subject.accentClasses.text}`} />
                  </div>
                  {subject.badge ? (
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${subject.accentClasses.border} ${subject.accentClasses.bg} ${subject.accentClasses.text}`}>
                      ({subject.badge})
                    </span>
                  ) : null}
                </div>
                <h2 className="mb-2 text-xl font-bold text-white">{subject.title}</h2>
                <p className="text-sm leading-relaxed text-[#94A3B8]">{subject.description}</p>
                <span className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${subject.accentClasses.text}`}>
                  Ouvrir la matière
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
