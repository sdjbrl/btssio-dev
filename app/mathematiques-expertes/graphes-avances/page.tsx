"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Network } from "lucide-react";
import QuizCard from "@/components/QuizCard";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import { mathsExpertesGraphesQuiz } from "@/lib/quiz-mathematiques-expertes";
import { updateModuleProgress } from "@/lib/progress";

const cheatSheetItems = [
  { label: "Graphe valué", value: "Chaque arête ou arc porte un poids : coût, durée, distance ou capacité.", code: false },
  { label: "Dijkstra — usage", value: "Plus court chemin depuis une source si tous les poids sont positifs.", code: false },
  {
    label: "Dijkstra — étapes",
    value: "Initialiser les distances, choisir le sommet non traité le plus proche, relâcher ses voisins, recommencer.",
    code: false,
  },
  {
    label: "Dijkstra — mémo",
    value: "distance[source] = 0 puis on fige progressivement les plus petites distances",
    code: true,
  },
  {
    label: "Bellman-Ford — usage",
    value: "Plus court chemin avec possibilité de poids négatifs et détection de cycles de poids négatif.",
    code: false,
  },
  {
    label: "Bellman-Ford — principe",
    value: "On relâche toutes les arêtes |V|−1 fois, puis on vérifie s'il reste une amélioration possible.",
    code: false,
  },
  {
    label: "Ford-Fulkerson",
    value: "Algorithme de flot maximal : on augmente le flux le long de chaînes améliorantes jusqu'à saturation.",
    code: false,
  },
  {
    label: "Matrice de transition",
    value: "Matrice carrée de probabilités ; chaque ligne somme à 1.",
    code: false,
  },
  {
    label: "Vecteur de probabilité",
    value: "Vecteur dont les composantes sont positives et dont la somme vaut 1.",
    code: false,
  },
  {
    label: "Chaîne de Markov",
    value: "L'état futur dépend seulement de l'état présent et non de tout l'historique.",
    code: false,
  },
  {
    label: "État stationnaire",
    value: "Une distribution π est stationnaire si πP = π.",
    code: true,
  },
  {
    label: "Planéité",
    value: "Un graphe est planaire s'il peut être dessiné sans croisement d'arêtes.",
    code: false,
  },
  {
    label: "Formule d'Euler",
    value: "V − E + F = 2 pour un graphe planaire connexe",
    code: true,
  },
  {
    label: "Coloration de graphe",
    value: "Attribuer des couleurs aux sommets en évitant deux voisins de même couleur.",
    code: false,
  },
  {
    label: "Théorème des 4 couleurs",
    value: "Toute carte planaire peut être coloriée avec au plus 4 couleurs.",
    code: false,
  },
];

const oralQuestions = [
  {
    question: "Quelle différence faites-vous entre Dijkstra et Bellman-Ford ?",
    hint: "Dijkstra est plus rapide mais suppose des poids positifs ; Bellman-Ford accepte des poids négatifs.",
  },
  {
    question: "Comment expliqueriez-vous simplement la notion de flot maximal ?",
    hint: "C'est la quantité maximale qu'on peut faire circuler d'une source vers un puits dans un réseau capacitaire.",
  },
  {
    question: "Qu'est-ce qu'une matrice de transition et comment l'interpréter ?",
    hint: "Chaque ligne donne les probabilités de passage depuis un état vers les autres états.",
  },
  {
    question: "Que signifie qu'une chaîne de Markov possède un état stationnaire ?",
    hint: "Après une transition, la distribution reste la même : πP = π.",
  },
  {
    question: "Comment utilisez-vous la formule d'Euler pour raisonner sur un graphe planaire ?",
    hint: "Elle relie le nombre de sommets, d'arêtes et de faces pour vérifier une structure planaire.",
  },
  {
    question: "Pourquoi la coloration de graphes est-elle utile en informatique ?",
    hint: "Allocation de ressources, ordonnancement, fréquences radio, contraintes de voisinage.",
  },
];

export default function MathematiquesExpertesGraphesPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    if (currentQuestionIndex + 1 < mathsExpertesGraphesQuiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / mathsExpertesGraphesQuiz.length) * 100);
      updateModuleProgress("maths-expertes-graphes", percentage);
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
    if (value >= 5) return "Très bonne maîtrise des graphes avancés, des matrices de transition et des théorèmes clés.";
    if (value >= 3) return "Bonne base générale, révisez encore Bellman-Ford, Markov et la planéité.";
    return "Reprenez les définitions centrales avant de refaire le quiz : flot, coloration, transition et Euler.";
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
            <Network className="w-4 h-4" />
            Module maths-expertes-graphes
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Graphes et Matrices Avancés</h1>
          <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
            Ce chapitre approfondit les algorithmes de parcours optimaux, les réseaux de flux, la planéité, la coloration et les modèles probabilistes par matrices.
          </p>
        </section>

        <section className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6 mb-8 sm:mb-12">
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            <span className="font-semibold text-[#A78BFA]">Applications informatiques :</span> routage, ordonnancement, allocation de ressources, modélisation de navigation ou analyse de réseaux.
          </p>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#A78BFA] mb-4">Aide-mémoire essentiel</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            <CheatSheet items={cheatSheetItems} title="Graphes valués, Markov et planéité" />
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#A78BFA] mb-4">Quiz de validation</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            {!quizComplete ? (
              <>
                <p className="text-[#94A3B8] mb-4">
                  Question {currentQuestionIndex + 1} / {mathsExpertesGraphesQuiz.length}
                </p>
                <QuizCard question={mathsExpertesGraphesQuiz[currentQuestionIndex]} onComplete={handleQuizComplete} />
              </>
            ) : (
              <div className="text-center">
                <p className={`text-2xl font-bold mb-2 ${getScoreColor(score)}`}>
                  Quiz terminé ! Score : {score}/{mathsExpertesGraphesQuiz.length}
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
