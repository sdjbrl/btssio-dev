"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, GitBranch } from "lucide-react";
import QuizCard from "@/components/QuizCard";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import { mathsGraphesQuiz } from "@/lib/quiz-mathematiques";
import { updateModuleProgress } from "@/lib/progress";

const cheatSheetItems = [
  { label: "Définition", value: "Graphe G = (S, A) avec S = sommets et A = arêtes ou arcs", code: true },
  { label: "Sommet", value: "Point du graphe représentant un état, une machine, un routeur ou une ville", code: false },
  { label: "Arête / arc", value: "Lien entre deux sommets ; on parle d'arc si le lien est orienté", code: false },
  { label: "Chemin", value: "Suite de sommets reliés entre eux : A → B → C → D", code: true },
  { label: "Cycle", value: "Chemin fermé qui revient au sommet de départ", code: false },
  { label: "Graphe orienté", value: "A → B n'implique pas forcément B → A", code: true },
  { label: "Graphe non orienté", value: "L'arête {A,B} peut se parcourir dans les deux sens", code: true },
  { label: "Matrice d'adjacence", value: "M = [[0,1,0],[1,0,1],[0,1,0]] : 1 signifie qu'un lien existe entre deux sommets", code: true },
  { label: "Parcours BFS", value: "Explore par niveaux avec une file → utile pour les plus courts chemins en graphe non pondéré", code: false },
  { label: "Parcours DFS", value: "Explore en profondeur avec une pile ou de la récursivité", code: false },
  { label: "Dijkstra", value: "Calcule les distances minimales depuis une source dans un graphe pondéré à poids positifs", code: false },
  { label: "Kruskal", value: "Ajoute les arêtes de plus faible poids sans créer de cycle pour former un arbre couvrant minimal", code: false },
  { label: "Prim", value: "Construit un arbre couvrant minimal en partant d'un sommet et en ajoutant la meilleure arête disponible", code: false },
  { label: "Arbre binaire", value: "Structure où chaque nœud possède au plus deux enfants : gauche et droit", code: false },
];

const oralQuestions = [
  {
    question: "Comment définissez-vous simplement un graphe à l'oral ?",
    hint: "Ensemble de sommets reliés par des arêtes ou des arcs selon qu'il soit orienté ou non.",
  },
  {
    question: "Quelle différence faites-vous entre graphe orienté et non orienté ?",
    hint: "Orienté = sens de circulation, non orienté = relation symétrique.",
  },
  {
    question: "À quoi sert une matrice d'adjacence et comment la lire ?",
    hint: "Ligne i, colonne j : 1 ou un poids si un lien existe entre les sommets i et j.",
  },
  {
    question: "Comparez BFS et DFS sur un exemple de parcours.",
    hint: "BFS parcourt par niveaux avec une file, DFS va au fond avec pile ou récursivité.",
  },
  {
    question: "Dans quel cas utilisez-vous l'algorithme de Dijkstra ?",
    hint: "Pour trouver le plus court chemin avec des poids positifs : réseau, GPS, routage.",
  },
  {
    question: "Qu'est-ce qu'un arbre couvrant minimal et pourquoi Kruskal ou Prim sont-ils utiles ?",
    hint: "Relier tous les sommets au coût minimal, par exemple pour poser de la fibre ou câbler un réseau.",
  },
];

export default function MathematiquesGraphesPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    if (currentQuestionIndex + 1 < mathsGraphesQuiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / mathsGraphesQuiz.length) * 100);
      updateModuleProgress("maths-graphes", percentage);
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
            <GitBranch className="w-4 h-4" />
            Module maths-graphes
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Théorie des Graphes</h1>
          <p className="text-[#94A3B8] text-base sm:text-lg">
            Un chapitre utile pour modéliser des réseaux, analyser des connexions et comprendre plusieurs algorithmes fondamentaux du BTS SIO.
          </p>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#EC4899] mb-4">Aide-mémoire BTS SIO</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            <CheatSheet items={cheatSheetItems} title="Graphes, parcours et arbres" />
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#EC4899] mb-4">Quiz de validation</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            {!quizComplete ? (
              <>
                <p className="text-[#94A3B8] mb-4">
                  Question {currentQuestionIndex + 1} / {mathsGraphesQuiz.length}
                </p>
                <QuizCard question={mathsGraphesQuiz[currentQuestionIndex]} onComplete={handleQuizComplete} />
              </>
            ) : (
              <div className="text-center">
                <p className={`text-2xl font-bold mb-2 ${getScoreColor(score)}`}>
                  Quiz terminé ! Score : {score}/{mathsGraphesQuiz.length}
                </p>
                <p className="text-[#94A3B8] mb-4">
                  {score >= 5
                    ? "Très bon niveau sur les graphes et les algorithmes associés."
                    : score >= 3
                      ? "Les bases sont là, révisez encore les parcours et les arbres couvrants."
                      : "Reprenez les définitions de base avant de refaire le quiz."}
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
