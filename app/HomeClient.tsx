"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import ModuleCard from "@/components/ModuleCard";
import BadgesSection from "@/components/BadgesSection";
import { Shield, Network, Code2, BookOpen, Server, Globe, Calculator, Briefcase, FlaskConical } from "lucide-react";
import { getProgress } from "@/lib/progress";

const MODULE_DEFS = [
  {
    key: "tronc-commun-bloc1",
    title: "Tronc Commun — Bloc 1",
    description: "Support et mise à disposition de services informatiques. Gestion des incidents, déploiement de postes, gestion de parc.",
    icon: <Server className="w-5 h-5" />,
    href: "/tronc-commun",
    option: "commun" as const,
  },
  {
    key: "sisr-bloc2-admin",
    title: "SISR — Bloc 2",
    description: "Administration des systèmes et des réseaux. Routage, VLAN, Windows Server, Linux, services réseaux.",
    icon: <Network className="w-5 h-5" />,
    href: "/sisr/bloc2",
    option: "SISR" as const,
    badge: "SISR",
  },
  {
    key: "sisr-bloc3-cyber",
    title: "SISR — Bloc 3 Cybersécurité",
    description: "Sauvegardes, PRA/PCA, sécurisation des équipements, VPN, firewall.",
    icon: <Shield className="w-5 h-5" />,
    href: "/sisr/bloc3",
    option: "cyber" as const,
    badge: "SISR",
  },
  {
    key: "slam-bloc2-dev",
    title: "SLAM — Bloc 2",
    description: "Conception et développement d'applications. POO, SQL, dev web/mobile, MVC, API REST.",
    icon: <Code2 className="w-5 h-5" />,
    href: "/slam/bloc2",
    option: "SLAM" as const,
    badge: "SLAM",
  },
  {
    key: "bloc3-slam-owasp",
    title: "SLAM — Bloc 3 Cybersécurité",
    description: "Sécurisation du code, failles OWASP, RGPD, sécurisation des BDD.",
    icon: <Shield className="w-5 h-5" />,
    href: "/slam/bloc3",
    option: "cyber" as const,
    badge: "SLAM",
  },
  {
    key: "examens-preparation",
    title: "Préparation aux Épreuves",
    description: "E4, E5, E6 — Dossier professionnel, simulateur d'oral, annales.",
    icon: <BookOpen className="w-5 h-5" />,
    href: "/examens",
    option: "commun" as const,
  },
  {
    key: "cejm-marche",
    title: "CEJM — Le Marché",
    description: "Analyse du marché, de la concurrence et du positionnement de l'entreprise.",
    icon: <Briefcase className="w-5 h-5" />,
    href: "/cejm/marche",
    option: "commun" as const,
    badge: "CEJM",
  },
  {
    key: "cejm-droit",
    title: "CEJM — Droit",
    description: "Contrats, responsabilité, protection des données et cadre juridique du numérique.",
    icon: <Briefcase className="w-5 h-5" />,
    href: "/cejm/droit",
    option: "commun" as const,
    badge: "CEJM",
  },
  {
    key: "cejm-management",
    title: "CEJM — Management",
    description: "Organisation, gouvernance, styles de management et conduite du changement.",
    icon: <Briefcase className="w-5 h-5" />,
    href: "/cejm/management",
    option: "commun" as const,
    badge: "CEJM",
  },
  {
    key: "cejm-rh",
    title: "CEJM — Ressources Humaines",
    description: "Recrutement, compétences, formation et relations sociales en entreprise.",
    icon: <Briefcase className="w-5 h-5" />,
    href: "/cejm/ressources-humaines",
    option: "commun" as const,
    badge: "CEJM",
  },
  {
    key: "cejm-finance",
    title: "CEJM — Finance",
    description: "Lecture des documents comptables et indicateurs financiers essentiels.",
    icon: <Briefcase className="w-5 h-5" />,
    href: "/cejm/finance",
    option: "commun" as const,
    badge: "CEJM",
  },
  {
    key: "anglais-vocabulaire",
    title: "Anglais — Vocabulaire Tech",
    description: "Lexique anglais des réseaux, du développement, de la cybersécurité et du cloud.",
    icon: <Globe className="w-5 h-5" />,
    href: "/anglais/vocabulaire-technique",
    option: "commun" as const,
    badge: "Anglais",
  },
  {
    key: "anglais-comprehension",
    title: "Anglais — Compréhension",
    description: "Comprendre la documentation, les emails, les tickets et les consignes techniques.",
    icon: <Globe className="w-5 h-5" />,
    href: "/anglais/comprehension",
    option: "commun" as const,
    badge: "Anglais",
  },
  {
    key: "anglais-expression",
    title: "Anglais — Expression",
    description: "S'entraîner à rédiger et présenter clairement dans un contexte informatique.",
    icon: <Globe className="w-5 h-5" />,
    href: "/anglais/expression",
    option: "commun" as const,
    badge: "Anglais",
  },
  {
    key: "maths-algorithmique",
    title: "Maths — Algorithmique",
    description: "Logique, pseudo-code, complexité et algorithmes classiques du BTS SIO.",
    icon: <Calculator className="w-5 h-5" />,
    href: "/mathematiques/algorithmique",
    option: "commun" as const,
    badge: "Maths",
  },
  {
    key: "maths-graphes",
    title: "Maths — Graphes",
    description: "Parcours, plus court chemin, arbres couvrants et modélisation réseau.",
    icon: <Calculator className="w-5 h-5" />,
    href: "/mathematiques/graphes",
    option: "commun" as const,
    badge: "Maths",
  },
  {
    key: "maths-matrices",
    title: "Maths — Matrices",
    description: "Calcul matriciel, déterminants et résolution de systèmes linéaires.",
    icon: <Calculator className="w-5 h-5" />,
    href: "/mathematiques/matrices",
    option: "commun" as const,
    badge: "Maths",
  },
  {
    key: "maths-cryptographie",
    title: "Maths — Cryptographie",
    description: "Chiffrement, hachage, certificats et usages sécurité en informatique.",
    icon: <Calculator className="w-5 h-5" />,
    href: "/mathematiques/cryptographie",
    option: "commun" as const,
    badge: "Maths",
  },
  {
    key: "maths-probabilites",
    title: "Maths — Probabilités",
    description: "Probabilités conditionnelles, lois usuelles et statistiques pour l'analyse.",
    icon: <Calculator className="w-5 h-5" />,
    href: "/mathematiques/probabilites",
    option: "commun" as const,
    badge: "Maths",
  },
  {
    key: "cge-methodologie",
    title: "Culture Gén. — Méthodologie",
    description: "Méthodes de synthèse, résumé et écriture personnelle pour l'épreuve E1.",
    icon: <BookOpen className="w-5 h-5" />,
    href: "/culture-generale/methodologie",
    option: "commun" as const,
    badge: "CGE",
  },
  {
    key: "cge-expression-ecrite",
    title: "Culture Gén. — Expression",
    description: "Qualité de rédaction, cohérence argumentative et maîtrise de la langue.",
    icon: <BookOpen className="w-5 h-5" />,
    href: "/culture-generale/expression-ecrite",
    option: "commun" as const,
    badge: "CGE",
  },
  {
    key: "cge-culture-numerique",
    title: "Culture Gén. — Numérique",
    description: "Société numérique, vie privée, IA, désinformation et culture critique.",
    icon: <BookOpen className="w-5 h-5" />,
    href: "/culture-generale/culture-numerique",
    option: "commun" as const,
    badge: "CGE",
  },
  {
    key: "maths-expertes-arithmetique",
    title: "Maths Exp. — Arithmétique",
    description: "Approfondir les raisonnements arithmétiques utiles à la cryptographie et aux concours.",
    icon: <FlaskConical className="w-5 h-5" />,
    href: "/mathematiques-expertes/arithmetique",
    option: "commun" as const,
    badge: "Option",
  },
  {
    key: "maths-expertes-graphes",
    title: "Maths Exp. — Graphes",
    description: "Explorer des notions avancées de théorie des graphes et d'optimisation.",
    icon: <FlaskConical className="w-5 h-5" />,
    href: "/mathematiques-expertes/graphes-avances",
    option: "commun" as const,
    badge: "Option",
  },
  {
    key: "maths-expertes-proba",
    title: "Maths Exp. — Probabilités",
    description: "Réviser les probabilités avancées pour aller au-delà du programme standard.",
    icon: <FlaskConical className="w-5 h-5" />,
    href: "/mathematiques-expertes/probabilites-avancees",
    option: "commun" as const,
    badge: "Option",
  },
];

export default function HomeClient() {
  const [moduleProgress, setModuleProgress] = useState<Record<string, number>>({});
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    const p = getProgress();
    // Reading localStorage after mount — safe pattern, setState intentional
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setModuleProgress(p.modules);
    setBadges(p.badges);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Hero />

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
          {MODULE_DEFS.map((mod) => (
            <ModuleCard
              key={mod.href}
              title={mod.title}
              description={mod.description}
              icon={mod.icon}
              progress={moduleProgress[mod.key] ?? 0}
              href={mod.href}
              option={mod.option}
              badge={mod.badge}
            />
          ))}
        </BentoGrid>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:pb-16" aria-labelledby="badges-heading">
        <h2 id="badges-heading" className="sr-only">Badges et récompenses</h2>
        <BadgesSection badges={badges} />
      </section>
    </div>
  );
}
