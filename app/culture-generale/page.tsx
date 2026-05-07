"use client";

import Link from "next/link";
import { ArrowLeft, ChevronRight, Globe, GraduationCap, PenLine } from "lucide-react";

const chapters = [
  {
    title: "Méthodologie de l'épreuve E1",
    description:
      "Résumé, synthèse de documents, écriture personnelle, plans argumentatifs et méthodes de rédaction.",
    href: "/culture-generale/methodologie",
    icon: GraduationCap,
    points: ["Résumé", "Synthèse", "Plan dialectique"],
  },
  {
    title: "Expression écrite",
    description:
      "Registres, types de textes, connecteurs logiques, figures de style et correction de la langue.",
    href: "/culture-generale/expression-ecrite",
    icon: PenLine,
    points: ["Registres", "Figures de style", "Cohérence"],
  },
  {
    title: "Culture numérique et société",
    description:
      "Fracture numérique, vie privée, désinformation, identité numérique, IA et enjeux éthiques.",
    href: "/culture-generale/culture-numerique",
    icon: Globe,
    points: ["RGPD", "Fake news", "IA & éthique"],
  },
];

export default function CultureGeneralePage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/matieres-generales"
          className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-[#F97316] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux matières générales
        </Link>

        <section className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6 mb-8 sm:mb-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F97316]/15 border border-[#F97316]/30 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6 text-[#F97316]" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F97316] mb-2">Culture générale et expression</p>
              <h1 className="text-3xl sm:text-4xl font-bold mb-3">Réviser la CGE en BTS SIO</h1>
              <p className="text-[#94A3B8] leading-relaxed">
                L&apos;épreuve E1 (Culture Générale et Expression) est une épreuve écrite de 4h. Elle demande de
                maîtriser la méthode, la qualité d&apos;expression et la capacité à analyser les enjeux du monde contemporain.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[#F97316] mb-4">Chapitres disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {chapters.map(({ title, description, href, icon: Icon, points }) => (
              <Link
                key={href}
                href={href}
                className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6 transition-all hover:border-[#F97316] hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316]"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F97316]/15 border border-[#F97316]/30 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#F97316]" />
                </div>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">{description}</p>
                <ul className="space-y-2 mb-5">
                  {points.map((point) => (
                    <li key={point} className="text-sm text-[#E2E8F0] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                      {point}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#F97316]">
                  Ouvrir le chapitre
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#F97316] mb-4">Objectif de la matière</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-white font-semibold mb-2">Analyser</p>
              <p className="text-[#94A3B8]">Comprendre un corpus, repérer les idées essentielles et structurer une lecture critique.</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-2">Rédiger</p>
              <p className="text-[#94A3B8]">Construire une réponse claire, argumentée, grammaticale et adaptée à une copie d&apos;examen.</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-2">Prendre du recul</p>
              <p className="text-[#94A3B8]">Relier les thèmes de société aux usages numériques et au quotidien d&apos;un futur technicien BTS SIO.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
