"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, TrendingUp } from "lucide-react";
import QuizCard from "@/components/QuizCard";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import { mathsExpertesProbaQuiz } from "@/lib/quiz-mathematiques-expertes";
import { updateModuleProgress } from "@/lib/progress";

const cheatSheetItems = [
  {
    label: "Loi de Poisson",
    value: "P(X = k) = λ^k·e^(-λ)/k!",
    code: true,
  },
  {
    label: "Poisson — usage",
    value: "Modélise un nombre d'événements rares sur un intervalle de temps ou d'espace.",
    code: false,
  },
  {
    label: "Loi exponentielle",
    value: "Décrit souvent un temps d'attente ; espérance = 1/λ.",
    code: false,
  },
  {
    label: "Loi normale",
    value: "X ~ N(μ,σ²)",
    code: true,
  },
  {
    label: "Normale centrée réduite",
    value: "Z ~ N(0,1)",
    code: true,
  },
  {
    label: "Standardisation",
    value: "Z = (X−μ)/σ",
    code: true,
  },
  {
    label: "Théorème central limite",
    value: "Pour n grand, la moyenne d'échantillon est approximativement normale sous des hypothèses classiques.",
    code: false,
  },
  {
    label: "Régression linéaire",
    value: "Ajuste une droite des moindres carrés y = ax + b pour modéliser une tendance.",
    code: false,
  },
  {
    label: "Coefficient de corrélation",
    value: "r mesure l'intensité et le sens d'une relation linéaire entre deux variables.",
    code: false,
  },
  {
    label: "Interprétation de r",
    value: "r proche de 1 : relation positive forte ; proche de −1 : relation négative forte ; proche de 0 : relation linéaire faible.",
    code: false,
  },
  {
    label: "Test du Chi²",
    value: "Compare effectifs observés et théoriques pour tester un ajustement ou une indépendance.",
    code: false,
  },
  {
    label: "Test de Student",
    value: "Permet de comparer une moyenne observée à une valeur théorique ou de comparer deux moyennes selon le contexte.",
    code: false,
  },
  {
    label: "p-value",
    value: "Probabilité d'obtenir un résultat au moins aussi extrême si H0 est vraie.",
    code: false,
  },
  {
    label: "Niveau de signification",
    value: "On note souvent α = 5 % ; si p-value < α, on rejette H0.",
    code: false,
  },
  {
    label: "Application Monte Carlo",
    value: "Répéter des simulations aléatoires pour estimer une probabilité ou une grandeur numérique.",
    code: false,
  },
  {
    label: "Applications informatiques",
    value: "Analyse de logs, prédiction, détection d'anomalies, expérimentation A/B, simulation réseau.",
    code: false,
  },
];

const oralQuestions = [
  {
    question: "Dans quel type de situation utilisez-vous une loi de Poisson ?",
    hint: "Quand on compte des événements rares sur une durée, une zone ou un volume donné.",
  },
  {
    question: "Comment passe-t-on d'une loi normale générale à la loi normale centrée réduite ?",
    hint: "On standardise avec Z = (X−μ)/σ.",
  },
  {
    question: "Comment présenter simplement le théorème central limite à un examinateur ?",
    hint: "Il explique pourquoi les moyennes d'échantillons deviennent approximativement normales quand n est grand.",
  },
  {
    question: "Que mesure exactement le coefficient de Pearson ?",
    hint: "Le sens et la force d'une relation linéaire entre deux variables quantitatives.",
  },
  {
    question: "À quoi sert une p-value dans un test statistique ?",
    hint: "À décider si le résultat observé est compatible avec l'hypothèse nulle H0.",
  },
  {
    question: "Pourquoi les simulations de Monte Carlo sont-elles utiles en informatique ?",
    hint: "Elles permettent d'estimer numériquement des probabilités ou des performances quand le calcul exact est difficile.",
  },
];

export default function MathematiquesExpertesProbabilitesPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    if (currentQuestionIndex + 1 < mathsExpertesProbaQuiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / mathsExpertesProbaQuiz.length) * 100);
      updateModuleProgress("maths-expertes-proba", percentage);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
  };

  const getScoreColor = (value: number) => {
    if (value >= 5) return "text-[#22C55E]";
    if (value >= 3) return "text-[#F59E0B]";
    return "text-[#F87171]";
  };

  const getScoreMessage = (value: number) => {
    if (value >= 5) return "Très bon niveau sur les lois avancées, les tests et l'interprétation statistique.";
    if (value >= 3) return "Bonne compréhension, mais révisez encore TCL, tests statistiques et corrélation.";
    return "Reprenez les formules essentielles et les règles d'interprétation avant de refaire le quiz.";
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/mathematiques-expertes"
          className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à mathématiques expertes
        </Link>

        <section className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#A78BFA]/30 bg-[#A78BFA]/10 px-3 py-1 text-sm text-[#A78BFA] mb-4">
            <TrendingUp className="w-4 h-4" />
            Module maths-expertes-proba
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Probabilités et Statistiques Avancées</h1>
          <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
            Un module orienté analyse quantitative : lois usuelles, estimation, corrélation, régression et interprétation de tests statistiques utiles aux données informatiques.
          </p>
        </section>

        <section className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6 mb-8 sm:mb-12">
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            <span className="font-semibold text-[#A78BFA]">Applications informatiques :</span> simulation Monte Carlo, performance, analyse de trafic, prédiction et aide à la décision à partir de données.
          </p>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#A78BFA] mb-4">Aide-mémoire essentiel</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            <CheatSheet items={cheatSheetItems} title="Lois, tests et modélisation" />
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#A78BFA] mb-4">Quiz de validation</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            {!quizComplete ? (
              <>
                <p className="text-[#94A3B8] mb-4">
                  Question {currentQuestionIndex + 1} / {mathsExpertesProbaQuiz.length}
                </p>
                <QuizCard question={mathsExpertesProbaQuiz[currentQuestionIndex]} onComplete={handleQuizComplete} />
              </>
            ) : (
              <div className="text-center">
                <p className={`text-2xl font-bold mb-2 ${getScoreColor(score)}`}>
                  Quiz terminé ! Score : {score}/{mathsExpertesProbaQuiz.length}
                </p>
                <p className="text-[#94A3B8] mb-4">{getScoreMessage(score)}</p>
                <button
                  onClick={handleRestart}
                  className="rounded-lg bg-[#A78BFA] px-6 py-2 text-sm font-semibold text-[#0F172A] hover:bg-[#C4B5FD] transition-colors"
                >
                  Recommencer
                </button>
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-[#A78BFA] mb-4">Préparation à l&apos;oral</h2>
          <OralSimulator questions={oralQuestions} />
        </section>
      </div>
    </div>
  );
}
