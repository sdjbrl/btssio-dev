"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Grid } from "lucide-react";
import QuizCard from "@/components/QuizCard";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import { mathsMatricesQuiz } from "@/lib/quiz-mathematiques";
import { updateModuleProgress } from "@/lib/progress";

const cheatSheetItems = [
  { label: "Définition", value: "A = [[a11, a12], [a21, a22]]", code: true },
  { label: "Dimensions", value: "Une matrice m × n possède m lignes et n colonnes", code: false },
  { label: "Addition", value: "A + B possible seulement si A et B ont la même taille", code: false },
  { label: "Produit matriciel", value: "A(m×n) × B(n×p) = C(m×p)", code: true },
  { label: "Coefficient du produit", value: "cij = somme des produits de la ligne i de A par la colonne j de B", code: false },
  { label: "Transposée", value: "Aᵀ : les lignes deviennent des colonnes", code: true },
  { label: "Matrice identité", value: "I3 = [[1,0,0],[0,1,0],[0,0,1]]", code: true },
  { label: "Déterminant 2x2", value: "det([[a,b],[c,d]]) = ad - bc", code: true },
  { label: "Déterminant 3x3", value: "Se calcule par développement ou règle de Sarrus sur une matrice 3 × 3", code: false },
  { label: "Inverse", value: "A × A^-1 = I si det(A) ≠ 0", code: true },
  { label: "Système linéaire", value: "Peut se traduire sous la forme AX = B", code: true },
  { label: "Méthode de Gauss", value: "Opérations sur les lignes pour obtenir une forme échelonnée puis remonter aux inconnues", code: false },
  { label: "Application aux graphes", value: "La matrice d'adjacence représente les liens entre sommets d'un graphe", code: false },
  { label: "Application à la cryptographie", value: "Certaines méthodes pédagogiques utilisent des matrices pour coder ou décoder un message", code: false },
];

const oralQuestions = [
  {
    question: "Comment définissez-vous une matrice et comment lisez-vous ses dimensions ?",
    hint: "Nombre de lignes × nombre de colonnes, par exemple 2 × 3.",
  },
  {
    question: "Dans quelles conditions peut-on additionner ou multiplier deux matrices ?",
    hint: "Addition : même taille. Multiplication : colonnes de A = lignes de B.",
  },
  {
    question: "Quel est le rôle de la matrice identité ?",
    hint: "Élément neutre pour la multiplication matricielle.",
  },
  {
    question: "Expliquez le calcul du déterminant d'une matrice 2x2.",
    hint: "ad - bc pour [[a,b],[c,d]].",
  },
  {
    question: "À quoi sert la méthode de Gauss dans le cadre du BTS SIO ?",
    hint: "Résoudre des systèmes linéaires et transformer une matrice en forme échelonnée.",
  },
  {
    question: "Citez deux applications concrètes des matrices en informatique.",
    hint: "Graphes, cryptographie, traitement d'image, transformation 2D/3D, calcul scientifique.",
  },
];

export default function MathematiquesMatricesPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    if (currentQuestionIndex + 1 < mathsMatricesQuiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / mathsMatricesQuiz.length) * 100);
      updateModuleProgress("maths-matrices", percentage);
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
            <Grid className="w-4 h-4" />
            Module maths-matrices
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Matrices et Systèmes Linéaires</h1>
          <p className="text-[#94A3B8] text-base sm:text-lg">
            Un chapitre clé pour comprendre les représentations matricielles, résoudre des systèmes et relier les mathématiques à l&apos;informatique.
          </p>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#EC4899] mb-4">Aide-mémoire BTS SIO</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            <CheatSheet items={cheatSheetItems} title="Calcul matriciel et pivot de Gauss" />
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#EC4899] mb-4">Quiz de validation</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            {!quizComplete ? (
              <>
                <p className="text-[#94A3B8] mb-4">
                  Question {currentQuestionIndex + 1} / {mathsMatricesQuiz.length}
                </p>
                <QuizCard question={mathsMatricesQuiz[currentQuestionIndex]} onComplete={handleQuizComplete} />
              </>
            ) : (
              <div className="text-center">
                <p className={`text-2xl font-bold mb-2 ${getScoreColor(score)}`}>
                  Quiz terminé ! Score : {score}/{mathsMatricesQuiz.length}
                </p>
                <p className="text-[#94A3B8] mb-4">
                  {score >= 5
                    ? "Très bon niveau sur les opérations matricielles."
                    : score >= 3
                      ? "La logique est comprise, révisez encore les déterminants et les systèmes."
                      : "Reprenez les notations et les opérations de base avant de recommencer."}
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
