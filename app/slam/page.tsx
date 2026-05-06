// app/slam/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Code2, Shield, BookOpen, ChevronRight, Database, Globe, Smartphone } from "lucide-react";
import BentoGrid from "@/components/BentoGrid";
import ModuleCard from "@/components/ModuleCard";

export const metadata: Metadata = {
  title: "Option SLAM — Développement | BTSSIO.DEV",
  description: "Révision BTS SIO option SLAM : Bloc 2 développement (POO, SQL, API, MVC) et Bloc 3 cybersécurité (OWASP, RGPD, sécurisation).",
};

export default function SlamPage() {
  const slamModules = [
    {
      title: "Bloc 2 — Développement Web",
      description: "PHP, HTML/CSS, JavaScript, frameworks MVC. Création d'applications web.",
      icon: <Globe className="w-5 h-5" />,
      progress: 0,
      href: "/slam/bloc2/web",
      option: "SLAM" as const,
    },
    {
      title: "Bloc 2 — Bases de Données",
      description: "SQL, modélisation MCD/MLD, requêtes complexes, procédures stockées.",
      icon: <Database className="w-5 h-5" />,
      progress: 0,
      href: "/slam/bloc2/bdd",
      option: "SLAM" as const,
    },
    {
      title: "Bloc 2 — POO & Architecture",
      description: "Programmation orientée objet, design patterns, UML, architecture MVC.",
      icon: <Code2 className="w-5 h-5" />,
      progress: 0,
      href: "/slam/bloc2/poo",
      option: "SLAM" as const,
    },
    {
      title: "Bloc 2 — Développement Mobile",
      description: "Applications mobiles natives et hybrides. React Native, Android.",
      icon: <Smartphone className="w-5 h-5" />,
      progress: 0,
      href: "/slam/bloc2/mobile",
      option: "SLAM" as const,
    },
    {
      title: "Bloc 3 — Cybersécurité SLAM",
      description: "OWASP Top 10, injection SQL, XSS, CSRF, RGPD, sécurisation du code PHP.",
      icon: <Shield className="w-5 h-5" />,
      progress: 0,
      href: "/slam/bloc3",
      option: "cyber" as const,
      badge: "Cyber",
    },
    {
      title: "Préparation Épreuves SLAM",
      description: "E4 dossier professionnel, E5 développement, E6 cybersécurité. Annales et oral.",
      icon: <BookOpen className="w-5 h-5" />,
      progress: 0,
      href: "/examens",
      option: "commun" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Hero banner for SLAM */}
      <div className="bg-gradient-to-br from-[#1E1033] to-[#0F172A] border-b border-[#2D1B69] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/30">
              <Code2 className="w-8 h-8 text-[#8B5CF6]" aria-hidden="true" />
            </div>
            <div>
              <span className="text-[#8B5CF6] text-sm font-mono font-semibold uppercase tracking-widest">Option</span>
              <h1 className="text-3xl md:text-4xl font-bold text-white font-mono">SLAM</h1>
            </div>
          </div>
          <p className="text-[#94A3B8] text-lg max-w-2xl">
            <strong className="text-[#8B5CF6]">S</strong>olutions <strong className="text-[#8B5CF6]">L</strong>ogicielles et <strong className="text-[#8B5CF6]">A</strong>pplications <strong className="text-[#8B5CF6]">M</strong>étiers
          </p>
          <p className="text-[#64748B] text-sm mt-2">
            Développement d&apos;applications, bases de données, cybersécurité du code
          </p>

          {/* Quick links */}
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              { label: "Bloc 2 — Développement", href: "/slam/bloc2" },
              { label: "Bloc 3 — Cybersécurité", href: "/slam/bloc3" },
              { label: "Fiches SQL", href: "/slam/bloc2/bdd" },
              { label: "OWASP Top 10", href: "/slam/bloc3#owasp" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-[#8B5CF6] text-sm font-mono hover:bg-[#8B5CF6]/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6]"
              >
                {link.label} <ChevronRight size={14} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Modules grid */}
      <section className="max-w-6xl mx-auto px-4 py-12" aria-labelledby="slam-modules-heading">
        <div className="mb-8">
          <h2 id="slam-modules-heading" className="text-2xl font-bold text-white font-mono mb-2">
            <span aria-hidden="true">🧩</span> Modules SLAM
          </h2>
          <p className="text-[#94A3B8] text-sm">
            Blocs 2 et 3 du référentiel BTS SIO option SLAM
          </p>
        </div>
        <BentoGrid>
          {slamModules.map((mod) => (
            <ModuleCard key={mod.href} {...mod} />
          ))}
        </BentoGrid>
      </section>

      {/* Back to home */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#94A3B8] text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#64748B] focus-visible:outline-offset-2 rounded"
        >
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
