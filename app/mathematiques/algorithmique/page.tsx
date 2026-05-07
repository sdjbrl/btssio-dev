"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Code2 } from "lucide-react";
import QuizCard from "@/components/QuizCard";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import { mathsAlgoQuiz } from "@/lib/quiz-mathematiques";
import { updateModuleProgress } from "@/lib/progress";

const cheatSheetItems = [
  { label: "Variable", value: "x ← 12", code: true },
  { label: "Type entier", value: "Compter des éléments, des tours de boucle ou des identifiants numériques", code: false },
  { label: "Type booléen", value: "vrai / faux pour piloter une condition ou un test", code: false },
  { label: "Condition SI", value: "SI note >= 10 ALORS afficher 'admis' SINON afficher 'rattrapage' FIN SI", code: true },
  { label: "Boucle TANT QUE", value: "TANT QUE i < n FAIRE i ← i + 1 FIN TANT QUE", code: true },
  { label: "Boucle POUR", value: "POUR i DE 1 À n FAIRE ... FIN POUR", code: true },
  { label: "Fonction", value: "FONCTION somme(a, b) RETOURNER a + b FIN FONCTION", code: true },
  { label: "Tableau", value: "tab[0], tab[1], ... permettent de stocker plusieurs valeurs du même type", code: false },
  { label: "Recherche linéaire", value: "Parcourt les éléments un à un → complexité O(n)", code: false },
  { label: "Recherche dichotomique", value: "Nécessite un tableau trié et coupe la zone de recherche en deux à chaque étape", code: false },
  { label: "Tri à bulles", value: "Compare les voisins et échange si nécessaire → simple mais souvent en O(n²)", code: false },
  { label: "Tri par insertion", value: "Insère chaque élément à la bonne place dans la partie déjà triée", code: false },
  { label: "Tri rapide", value: "Choisit un pivot puis partitionne → complexité moyenne O(n log n)", code: false },
  { label: "Récursivité", value: "FONCTION fact(n) SI n <= 1 RETOURNER 1 SINON RETOURNER n × fact(n-1) FIN SI", code: true },
  { label: "Complexité", value: "O(1) constant, O(n) linéaire, O(n²) quadratique : compare le coût d'un algorithme selon la taille n", code: false },
];

const oralQuestions = [
  {
    question: "Quelle différence faites-vous entre variable, constante et type de donnée en algorithmique ?",
    hint: "Variable = valeur modifiable, constante = valeur fixe, type = nature de la donnée (entier, réel, booléen, chaîne).",
  },
  {
    question: "Quand choisissez-vous une boucle POUR plutôt qu'une boucle TANT QUE ?",
    hint: "POUR si le nombre d'itérations est connu, TANT QUE si l'arrêt dépend d'une condition.",
  },
  {
    question: "Expliquez le principe d'une fonction et l'intérêt de découper un algorithme en sous-programmes.",
    hint: "Réutilisation, lisibilité, testabilité, séparation des traitements.",
  },
  {
    question: "Comment décririez-vous la récursivité à l'oral avec un exemple simple ?",
    hint: "Fonction qui s'appelle elle-même + cas d'arrêt obligatoire, par exemple factorielle ou parcours d'arbre.",
  },
  {
    question: "Pourquoi la complexité algorithmique est-elle importante en informatique ?",
    hint: "Elle permet d'estimer le coût en temps ou en mémoire selon la taille des données.",
  },
  {
    question: "Comparez rapidement tri à bulles, tri par insertion et tri rapide.",
    hint: "Bulles et insertion : simples mais souvent O(n²). Tri rapide : plus performant en moyenne en O(n log n).",
  },
];

export default function MathematiquesAlgorithmiquePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    if (currentQuestionIndex + 1 < mathsAlgoQuiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / mathsAlgoQuiz.length) * 100);
      updateModuleProgress("maths-algorithmique", percentage);
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
            <Code2 className="w-4 h-4" />
            Module maths-algorithmique
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Algorithmique et Programmation</h1>
          <p className="text-[#94A3B8] text-base sm:text-lg">
            Les bases mathématiques de l&apos;algorithmique utilisées en BTS SIO : structures de contrôle, fonctions, tris, recherche et analyse de complexité.
          </p>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#EC4899] mb-4">Aide-mémoire BTS SIO</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            <CheatSheet items={cheatSheetItems} title="Notions clés d'algorithmique" />
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#EC4899] mb-4">Quiz de validation</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            {!quizComplete ? (
              <>
                <p className="text-[#94A3B8] mb-4">
                  Question {currentQuestionIndex + 1} / {mathsAlgoQuiz.length}
                </p>
                <QuizCard question={mathsAlgoQuiz[currentQuestionIndex]} onComplete={handleQuizComplete} />
              </>
            ) : (
              <div className="text-center">
                <p className={`text-2xl font-bold mb-2 ${getScoreColor(score)}`}>
                  Quiz terminé ! Score : {score}/{mathsAlgoQuiz.length}
                </p>
                <p className="text-[#94A3B8] mb-4">
                  {score >= 5
                    ? "Très bon niveau en algorithmique."
                    : score >= 3
                      ? "Bonne base, mais quelques notions méritent une révision."
                      : "Reprenez les structures de base et les algorithmes classiques avant de recommencer."}
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
