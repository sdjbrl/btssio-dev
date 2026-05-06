import type { Metadata } from "next";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import ModuleCard from "@/components/ModuleCard";
import BadgesSection from "@/components/BadgesSection";
import { Shield, Network, Code2, BookOpen, Server } from "lucide-react";

export const metadata: Metadata = {
  title: "Modules de révision BTS SIO — BTSSIO.DEV",
  description: "Révisez le BTS SIO SISR & SLAM avec fiches de synthèse, QCM, TP guidés — basé sur le référentiel officiel BO n°5.",
};

export default function HomePage() {
  // Module data for the bento grid
  const modules = [
    {
      title: "Tronc Commun — Bloc 1",
      description: "Support et mise à disposition de services informatiques. Gestion des incidents, déploiement de postes, gestion de parc.",
      icon: <Server className="w-5 h-5" />,
      progress: 0,
      href: "/tronc-commun",
      option: "commun" as const,
    },
    {
      title: "SISR — Bloc 2",
      description: "Administration des systèmes et des réseaux. Routage, VLAN, Windows Server, Linux, services réseaux.",
      icon: <Network className="w-5 h-5" />,
      progress: 0,
      href: "/sisr/bloc2",
      option: "SISR" as const,
      badge: "SISR",
    },
    {
      title: "SISR — Bloc 3 Cybersécurité",
      description: "Sauvegardes, PRA/PCA, sécurisation des équipements, VPN, firewall.",
      icon: <Shield className="w-5 h-5" />,
      progress: 0,
      href: "/sisr/bloc3",
      option: "cyber" as const,
      badge: "SISR",
    },
    {
      title: "SLAM — Bloc 2",
      description: "Conception et développement d'applications. POO, SQL, dev web/mobile, MVC, API REST.",
      icon: <Code2 className="w-5 h-5" />,
      progress: 0,
      href: "/slam/bloc2",
      option: "SLAM" as const,
      badge: "SLAM",
    },
    {
      title: "SLAM — Bloc 3 Cybersécurité",
      description: "Sécurisation du code, failles OWASP, RGPD, sécurisation des BDD.",
      icon: <Shield className="w-5 h-5" />,
      progress: 0,
      href: "/slam/bloc3",
      option: "cyber" as const,
      badge: "SLAM",
    },
    {
      title: "Préparation aux Épreuves",
      description: "E4, E5, E6 — Dossier professionnel, simulateur d'oral, annales.",
      icon: <BookOpen className="w-5 h-5" />,
      progress: 0,
      href: "/examens",
      option: "commun" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Hero section */}
      <Hero />

      {/* Modules section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16" aria-labelledby="modules-heading">
        <div className="mb-8">
          <h2 id="modules-heading" className="text-xl sm:text-2xl font-bold text-white font-mono mb-2">
            <span aria-hidden="true">📚</span> Modules de révision
          </h2>
          <p className="text-[#94A3B8] text-sm">
            Basé sur le référentiel officiel BO spécial n°5 du 11 avril 2019
          </p>
        </div>
        <BentoGrid>
          {modules.map((mod) => (
            <ModuleCard key={mod.href} {...mod} />
          ))}
        </BentoGrid>
      </section>

      {/* Badges section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:pb-16" aria-labelledby="badges-heading">
        <h2 id="badges-heading" className="sr-only">Badges et récompenses</h2>
        <BadgesSection badges={[]} />
      </section>
    </div>
  );
}
