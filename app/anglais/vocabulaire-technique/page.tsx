"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, ChevronLeft } from "lucide-react";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import QuizCard from "@/components/QuizCard";
import { updateModuleProgress } from "@/lib/progress";
import { anglaisVocabulaireQuiz } from "@/lib/quiz-anglais";

const vocabularyItems = [
  { label: "bandwidth", value: "Bande passante — débit maximal théorique d'un réseau." },
  { label: "throughput", value: "Débit réel — volume de données effectivement transmis." },
  { label: "latency", value: "Latence — temps nécessaire pour qu'un paquet atteigne sa destination." },
  { label: "packet", value: "Paquet — unité de données transmise sur un réseau." },
  { label: "router", value: "Routeur — équipement qui achemine les paquets entre plusieurs réseaux." },
  { label: "switch", value: "Commutateur — relie les équipements d'un même réseau local." },
  { label: "firewall", value: "Pare-feu — filtre le trafic selon des règles de sécurité." },
  { label: "VPN", value: "Réseau privé virtuel — tunnel chiffré entre deux points." },
  { label: "subnet", value: "Sous-réseau — subdivision logique d'un réseau IP." },
  { label: "vulnerability", value: "Vulnérabilité — faiblesse exploitable dans un système." },
  { label: "exploit", value: "Exploit — code ou méthode permettant de tirer parti d'une faille." },
  { label: "patch", value: "Correctif — mise à jour qui corrige une faille ou un bug." },
  { label: "breach", value: "Violation de sécurité — accès non autorisé à des données ou systèmes." },
  { label: "authentication", value: "Authentification — vérification de l'identité d'un utilisateur." },
  { label: "encryption", value: "Chiffrement — transformation des données pour les rendre illisibles sans clé." },
  { label: "hash", value: "Empreinte de hachage — résultat fixe produit par une fonction de hachage." },
  { label: "repository", value: "Dépôt de code — espace centralisé qui stocke le projet et son historique." },
  { label: "commit", value: "Validation — enregistrement d'un ensemble de modifications dans Git." },
  { label: "branch", value: "Branche — ligne de développement parallèle dans un dépôt." },
  { label: "merge", value: "Fusion — opération qui combine deux branches de code." },
  { label: "deploy", value: "Déployer — mettre une application à disposition sur un environnement cible." },
  { label: "debug", value: "Déboguer — rechercher puis corriger un dysfonctionnement." },
  { label: "refactor", value: "Refactoriser — améliorer le code sans changer son comportement fonctionnel." },
  { label: "API", value: "Interface de programmation — permet à deux applications de communiquer." },
  { label: "endpoint", value: "Point d'accès API — URL ou ressource précise exposée par un service." },
  { label: "scalability", value: "Scalabilité — capacité à supporter une montée en charge." },
  { label: "redundancy", value: "Redondance — duplication de composants pour éviter un point de panne unique." },
  { label: "load balancer", value: "Répartiteur de charge — distribue les requêtes entre plusieurs serveurs." },
  { label: "container", value: "Conteneur — environnement léger qui embarque application et dépendances." },
  { label: "orchestration", value: "Orchestration — gestion automatisée de plusieurs conteneurs ou services." },
  { label: "microservices", value: "Microservices — architecture composée de services indépendants et spécialisés." },
  { label: "stakeholder", value: "Partie prenante — personne ou groupe concerné par un projet." },
  { label: "deliverable", value: "Livrable — élément remis au client ou au responsable de projet." },
  { label: "milestone", value: "Jalon — étape importante dans le planning d'un projet." },
  { label: "SLA", value: "Accord de niveau de service — engagement sur la qualité et les délais d'un service." },
  { label: "uptime", value: "Temps de disponibilité — durée pendant laquelle un service fonctionne normalement." },
  { label: "downtime", value: "Temps d'indisponibilité — période pendant laquelle le service est arrêté." },
  { label: "incident", value: "Incident — événement perturbant le fonctionnement normal d'un service." },
];

const oralQuestions = [
  {
    question: "What is the difference between bandwidth and throughput?",
    hint: "Bandwidth is theoretical capacity; throughput is the actual measured data rate.",
  },
  {
    question: "Can you explain what a firewall does in a company network?",
    hint: "Mention traffic filtering, security rules, and protection against unauthorized access.",
  },
  {
    question: "What is a repository and why is it useful for a development team?",
    hint: "Talk about source code, version history, collaboration, and Git platforms.",
  },
  {
    question: "What do we mean by a vulnerability and a patch?",
    hint: "A vulnerability is a weakness; a patch is the fix that reduces the risk.",
  },
  {
    question: "What is the role of a load balancer in cloud computing?",
    hint: "Distribute requests, improve availability, and support scalability.",
  },
  {
    question: "Could you define uptime, downtime, and SLA in simple terms?",
    hint: "Availability, service interruption, and service commitment are the key ideas.",
  },
];

export default function AnglaisVocabulairePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    if (currentQuestionIndex + 1 < anglaisVocabulaireQuiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / anglaisVocabulaireQuiz.length) * 100);
      updateModuleProgress("anglais-vocabulaire", percentage);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
  };

  const percentage = Math.round((score / anglaisVocabulaireQuiz.length) * 100);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/anglais"
          className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-white transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour à l&apos;anglais
        </Link>

        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 p-3">
              <BookOpen className="w-6 h-6 text-[#0EA5E9]" />
            </div>
            <div>
              <p className="text-sm text-[#0EA5E9] font-semibold">Module anglais-vocabulaire</p>
              <h1 className="text-3xl sm:text-4xl font-bold">Vocabulaire technique informatique</h1>
            </div>
          </div>
          <p className="text-[#94A3B8] leading-relaxed">
            Consolide les termes essentiels de l&apos;anglais IT pour comprendre des documents techniques, répondre à l&apos;oral et utiliser le bon lexique en entreprise.
          </p>
        </div>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0EA5E9] mb-4">Lexique essentiel</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            <CheatSheet items={vocabularyItems} />
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0EA5E9] mb-4">Quiz de validation</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            {!quizComplete ? (
              <>
                <div className="flex items-center justify-between gap-4 mb-4 text-sm">
                  <span className="text-[#94A3B8]">
                    Question {currentQuestionIndex + 1} / {anglaisVocabulaireQuiz.length}
                  </span>
                  <span className="text-[#0EA5E9] font-semibold">Objectif : maîtriser le lexique IT</span>
                </div>
                <QuizCard
                  question={anglaisVocabulaireQuiz[currentQuestionIndex]}
                  onComplete={handleQuizComplete}
                />
              </>
            ) : (
              <div className="text-center">
                <p className="text-2xl font-bold text-[#0EA5E9] mb-2">
                  Quiz terminé : {score}/{anglaisVocabulaireQuiz.length}
                </p>
                <p className="text-[#94A3B8] mb-4">Progression enregistrée : {percentage}% sur ce module.</p>
                <button
                  onClick={handleRestart}
                  className="inline-flex items-center justify-center rounded-lg bg-[#0EA5E9] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0284C7] transition-colors"
                >
                  Recommencer le quiz
                </button>
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0EA5E9] mb-4">Simulation orale</h2>
          <OralSimulator questions={oralQuestions} />
        </section>
      </div>
    </div>
  );
}
