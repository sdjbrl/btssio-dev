"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BarChart2 } from "lucide-react";
import QuizCard from "@/components/QuizCard";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import { mathsProbaQuiz } from "@/lib/quiz-mathematiques";
import { updateModuleProgress } from "@/lib/progress";

const cheatSheetItems = [
  { label: "Univers Ω", value: "Ensemble de toutes les issues possibles d'une expérience aléatoire", code: false },
  { label: "Événement", value: "Sous-ensemble de Ω, par exemple A = 'obtenir une valeur paire'", code: false },
  { label: "Union", value: "P(A∪B) = probabilité que A ou B se réalise", code: true },
  { label: "Intersection", value: "P(A∩B) = probabilité que A et B se réalisent ensemble", code: true },
  { label: "Probabilité conditionnelle", value: "P(A|B) = P(A∩B) / P(B)", code: true },
  { label: "Indépendance", value: "Si A et B sont indépendants : P(A∩B) = P(A) × P(B)", code: true },
  { label: "Loi binomiale", value: "X suit B(n,p) pour modéliser n essais indépendants avec succès de probabilité p", code: false },
  { label: "Espérance binomiale", value: "E(X) = n × p", code: true },
  { label: "Variance binomiale", value: "V(X) = n × p × (1 - p)", code: true },
  { label: "Écart-type", value: "σ(X) = racine carrée de V(X)", code: true },
  { label: "Loi normale", value: "Loi continue en cloche définie par une moyenne μ et un écart-type σ", code: false },
  { label: "Intervalle de confiance", value: "À 95 %, on estime souvent la proportion avec f ± 1,96 × sqrt(f(1-f)/n)", code: true },
  { label: "Arrangement", value: "A(n,k) = n! / (n-k)! : l'ordre compte", code: true },
  { label: "Combinaison", value: "C(n,k) = n! / (k!(n-k)!) : l'ordre ne compte pas", code: true },
];

const oralQuestions = [
  {
    question: "Quelle différence faites-vous entre événement, univers et issue ?",
    hint: "Univers = ensemble de toutes les issues, issue = résultat élémentaire, événement = ensemble d'issues.",
  },
  {
    question: "Comment expliquez-vous une probabilité conditionnelle avec un exemple simple ?",
    hint: "On restreint l'univers à B puis on mesure la probabilité de A dans ce nouvel univers.",
  },
  {
    question: "Que signifie l'indépendance de deux événements ?",
    hint: "La réalisation de l'un ne change pas la probabilité de l'autre.",
  },
  {
    question: "Dans quel cas utilisez-vous une loi binomiale ?",
    hint: "Suite de n essais indépendants avec seulement succès/échec et probabilité p constante.",
  },
  {
    question: "À quoi servent l'espérance, la variance et l'écart-type ?",
    hint: "Espérance = valeur moyenne, variance et écart-type = dispersion autour de cette moyenne.",
  },
  {
    question: "Quelle différence entre arrangement et combinaison ?",
    hint: "Arrangement : l'ordre compte. Combinaison : l'ordre ne compte pas.",
  },
];

export default function MathematiquesProbabilitesPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    if (currentQuestionIndex + 1 < mathsProbaQuiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / mathsProbaQuiz.length) * 100);
      updateModuleProgress("maths-probabilites", percentage);
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

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/mathematiques" className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Retour aux mathématiques
        </Link>

        <section className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#EC4899]/30 bg-[#EC4899]/10 px-3 py-1 text-sm text-[#EC4899] mb-4">
            <BarChart2 className="w-4 h-4" />
            Module maths-probabilites
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Probabilités et Statistiques</h1>
          <p className="text-[#94A3B8] text-base sm:text-lg">
            Les outils probabilistes utiles pour modéliser l&apos;incertitude, lire des indicateurs et raisonner sur les données en contexte informatique.
          </p>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#EC4899] mb-4">Aide-mémoire BTS SIO</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            <CheatSheet items={cheatSheetItems} title="Probabilités, lois et dénombrement" />
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#EC4899] mb-4">Quiz de validation</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            {!quizComplete ? (
              <>
                <p className="text-[#94A3B8] mb-4">
                  Question {currentQuestionIndex + 1} / {mathsProbaQuiz.length}
                </p>
                <QuizCard question={mathsProbaQuiz[currentQuestionIndex]} onComplete={handleQuizComplete} />
              </>
            ) : (
              <div className="text-center">
                <p className={`text-2xl font-bold mb-2 ${getScoreColor(score)}`}>
                  Quiz terminé ! Score : {score}/{mathsProbaQuiz.length}
                </p>
                <p className="text-[#94A3B8] mb-4">
                  {score >= 5
                    ? "Très bon niveau sur les probabilités et les statistiques."
                    : score >= 3
                      ? "Les bases sont présentes, révisez encore les formules clés."
                      : "Reprenez les définitions et les lois avant de refaire le quiz."}
                </p>
                <button
                  onClick={handleRestart}
                  className="rounded-lg bg-[#EC4899] px-6 py-2 text-sm font-semibold hover:bg-[#DB2777] transition-colors"
                >
                  Recommencer
                </button>
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-[#EC4899] mb-4">Préparation à l&apos;oral</h2>
          <OralSimulator questions={oralQuestions} />
        </section>
      </div>
    </div>
  );
}
