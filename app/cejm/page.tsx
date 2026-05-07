"use client";

import Link from "next/link";
import { BarChart, ChevronLeft, ChevronRight, Scale, TrendingUp, UserCheck, Users } from "lucide-react";

const chapters = [
  {
    href: "/cejm/marche",
    title: "L'entreprise et son marché",
    description: "Comprendre l'environnement concurrentiel, la création de valeur et les logiques de stratégie commerciale.",
    topics: ["Offre et demande", "Concurrence et structures de marché", "Marketing mix et positionnement"],
    Icon: TrendingUp,
  },
  {
    href: "/cejm/droit",
    title: "Droit du numérique et des affaires",
    description: "Maîtriser les règles juridiques applicables aux contrats, aux données et aux activités numériques.",
    topics: ["Contrats et responsabilité", "RGPD et données personnelles", "Propriété intellectuelle"],
    Icon: Scale,
  },
  {
    href: "/cejm/management",
    title: "Management et organisation",
    description: "Analyser la gouvernance, les structures et la manière d'accompagner la performance collective.",
    topics: ["Styles de direction", "Structures organisationnelles", "Conduite du changement"],
    Icon: Users,
  },
  {
    href: "/cejm/ressources-humaines",
    title: "Ressources Humaines",
    description: "Réviser le recrutement, la gestion des compétences et le cadre social de la relation de travail.",
    topics: ["Recrutement", "GPEC et formation", "Relations sociales"],
    Icon: UserCheck,
  },
  {
    href: "/cejm/finance",
    title: "Gestion financière",
    description: "Lire les documents comptables et utiliser les indicateurs essentiels pour diagnostiquer une entreprise.",
    topics: ["Bilan et compte de résultat", "SIG et ratios", "Investissement et financement"],
    Icon: BarChart,
  },
];

export default function CejmPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        <Link
          href="/matieres-generales"
          className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#F59E0B] transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Retour aux matières générales
        </Link>

        <section className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F59E0B] mb-3">CEJM</p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">Culture Économique, Juridique et Managériale</h1>
          <p className="text-[#94A3B8] leading-relaxed">
            Cette matière aide à analyser l&apos;entreprise dans son environnement économique, juridique et humain. Les 5 chapitres ci-dessous reprennent les notions clés du référentiel BTS SIO en français, avec fiches de synthèse, quiz et préparation à l&apos;oral.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F59E0B] mb-4">Chapitres CEJM</h2>
          <div className="grid gap-4 sm:gap-6">
            {chapters.map(({ href, title, description, topics, Icon }) => (
              <Link
                key={href}
                href={href}
                className="group bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6 transition-colors hover:border-[#F59E0B]"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/30 p-3">
                      <Icon className="h-5 w-5 text-[#F59E0B]" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white">{title}</h3>
                      <p className="text-sm text-[#94A3B8] mt-1">{description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-[#94A3B8] group-hover:text-[#F59E0B] transition-colors" />
                </div>

                <ul className="space-y-2">
                  {topics.map((topic) => (
                    <li key={topic} className="flex items-center gap-2 text-sm text-[#94A3B8]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
