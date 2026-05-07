"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import QuizCard from "@/components/QuizCard";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import { cejmMarcheQuiz } from "@/lib/quiz-cejm";
import { updateModuleProgress } from "@/lib/progress";

const cheatSheetItems = [
  { label: "Offre", value: "Quantité de biens ou services proposée par les entreprises à un prix donné." },
  { label: "Demande", value: "Quantité qu'un consommateur ou un marché souhaite et peut acheter à un prix donné." },
  { label: "Marché", value: "Lieu réel ou virtuel de rencontre entre l'offre et la demande." },
  { label: "Concurrence pure et parfaite", value: "Modèle théorique avec atomicité, homogénéité, libre entrée, transparence et mobilité des facteurs." },
  { label: "Monopole", value: "Structure de marché avec un seul offreur face à de nombreux demandeurs." },
  { label: "Oligopole", value: "Marché dominé par quelques grandes entreprises interdépendantes." },
  { label: "Marketing mix (4P)", value: "Produit, Prix, Place (distribution), Promotion (communication)." },
  { label: "Segmentation", value: "Découpage du marché en groupes homogènes de clients pour mieux cibler l'offre." },
  { label: "Positionnement", value: "Place distinctive que l'entreprise veut occuper dans l'esprit de sa cible." },
  { label: "Économie numérique", value: "Économie structurée par les plateformes, les données, les réseaux et les services digitaux." },
  { label: "Plateformes numériques", value: "Intermédiaires qui mettent en relation plusieurs catégories d'acteurs et profitent des effets de réseau." },
  { label: "Données personnelles comme actif économique", value: "Ressource stratégique pour personnaliser l'offre, piloter l'activité et créer de la valeur, sous encadrement juridique." },
];

const oralQuestions = [
  { question: "Comment l'entreprise adapte-t-elle son offre quand la demande évolue ?", hint: "Par l'analyse du marché, la veille, les ajustements de prix, de produit et de distribution." },
  { question: "Quelle différence faites-vous entre monopole, oligopole et concurrence pure et parfaite ?", hint: "Nombre d'offreurs, pouvoir de marché, degré de liberté sur les prix." },
  { question: "Pourquoi la segmentation est-elle indispensable dans une stratégie marketing ?", hint: "Elle permet de cibler des besoins spécifiques et d'adapter le positionnement." },
  { question: "Comment expliquez-vous le rôle du positionnement dans la réussite commerciale ?", hint: "Il crée une image claire et différenciante dans l'esprit du client." },
  { question: "En quoi les plateformes numériques transforment-elles les marchés ?", hint: "Elles organisent des marchés multifaces et exploitent les effets de réseau." },
  { question: "Pourquoi les données personnelles sont-elles devenues un enjeu économique majeur ?", hint: "Elles servent au ciblage, à l'analyse et à la personnalisation, tout en étant protégées par le droit." },
];

export default function CejmMarchePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    if (currentQuestionIndex + 1 < cejmMarcheQuiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / cejmMarcheQuiz.length) * 100);
      updateModuleProgress("cejm-marche", percentage);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
  };

  const scoreClass = score >= 5 ? "text-[#22C55E]" : score >= 3 ? "text-[#F59E0B]" : "text-[#EF4444]";

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        <Link href="/cejm" className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#F59E0B] transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Retour à la CEJM
        </Link>

        <header className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F59E0B] mb-3">Chapitre 1</p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">L&apos;entreprise et son marché</h1>
          <p className="text-[#94A3B8] leading-relaxed">Révisez les mécanismes de marché, les structures concurrentielles, le marketing mix et les spécificités de l&apos;économie numérique.</p>
        </header>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F59E0B] mb-4">Fiche de synthèse</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            <CheatSheet items={cheatSheetItems} />
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F59E0B] mb-4">Quiz</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            {!quizComplete ? (
              <>
                <p className="text-[#94A3B8] mb-4">Question {currentQuestionIndex + 1} / {cejmMarcheQuiz.length}</p>
                <QuizCard question={cejmMarcheQuiz[currentQuestionIndex]} onComplete={handleQuizComplete} />
              </>
            ) : (
              <div className="text-center">
                <p className={`text-xl sm:text-2xl font-bold mb-2 ${scoreClass}`}>Quiz terminé ! Score : {score}/{cejmMarcheQuiz.length}</p>
                <p className="text-[#94A3B8] mb-4">
                  {score >= 5 ? "Très bonne maîtrise du chapitre. 🎉" : score >= 3 ? "Bon socle, mais quelques notions méritent une relecture." : "Reprenez la fiche de synthèse puis relancez le quiz."}
                </p>
                <button onClick={handleRestart} className="px-6 py-2 rounded-md bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-medium transition-colors">
                  Recommencer
                </button>
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F59E0B] mb-4">Préparation à l&apos;oral</h2>
          <OralSimulator questions={oralQuestions} />
        </section>
      </div>
    </div>
  );
}
