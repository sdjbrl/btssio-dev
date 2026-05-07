"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Hash } from "lucide-react";
import QuizCard from "@/components/QuizCard";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import { mathsExpertesArithmetiqueQuiz } from "@/lib/quiz-mathematiques-expertes";
import { updateModuleProgress } from "@/lib/progress";

const cheatSheetItems = [
  { label: "Divisibilité", value: "a divise b si b = a × k pour un entier k.", code: false },
  {
    label: "Algorithme d'Euclide — principe",
    value: "On répète les divisions euclidiennes jusqu'à obtenir un reste nul ; le dernier reste non nul est le PGCD.",
    code: false,
  },
  {
    label: "Algorithme d'Euclide — schéma",
    value: "a = bq + r puis b = rq' + r' ... jusqu'à r = 0",
    code: true,
  },
  { label: "PGCD", value: "PGCD(a,b) = plus grand entier divisant a et b.", code: false },
  { label: "PPCM", value: "PPCM(a,b) = plus petit multiple commun non nul de a et b.", code: false },
  {
    label: "Lien PGCD / PPCM",
    value: "PGCD(a,b) × PPCM(a,b) = a × b",
    code: true,
  },
  {
    label: "Théorème de Bézout",
    value: "Si d = PGCD(a,b), il existe u et v tels que au + bv = d.",
    code: false,
  },
  {
    label: "Nombres premiers",
    value: "Un entier premier possède exactement deux diviseurs positifs : 1 et lui-même.",
    code: false,
  },
  {
    label: "Crible d'Ératosthène",
    value: "Méthode pour lister les nombres premiers en éliminant les multiples successifs de 2, 3, 5, etc.",
    code: false,
  },
  {
    label: "Congruence",
    value: "a ≡ b (mod n) signifie que n divise a − b.",
    code: true,
  },
  {
    label: "Propriétés des congruences",
    value: "On peut additionner, soustraire et multiplier membre à membre dans une même congruence modulo n.",
    code: false,
  },
  {
    label: "Inverse modulo n",
    value: "a est inversible modulo n si PGCD(a,n) = 1. On cherche x tel que ax ≡ 1 (mod n).",
    code: false,
  },
  {
    label: "Petit théorème de Fermat",
    value: "Si p est premier et a non multiple de p, alors a^(p-1) ≡ 1 (mod p).",
    code: true,
  },
  {
    label: "RSA — génération des clés",
    value: "Choisir p et q premiers, calculer n = pq, φ(n) = (p−1)(q−1), choisir e premier avec φ(n), puis trouver d tel que ed ≡ 1 (mod φ(n)).",
    code: false,
  },
  {
    label: "RSA — chiffrement",
    value: "c = m^e mod n",
    code: true,
  },
  {
    label: "RSA — déchiffrement",
    value: "m = c^d mod n",
    code: true,
  },
];

const oralQuestions = [
  {
    question: "Comment expliquez-vous l'algorithme d'Euclide à l'oral sur un exemple simple ?",
    hint: "Montrez les divisions successives et rappelez que le dernier reste non nul donne le PGCD.",
  },
  {
    question: "Pourquoi la relation PGCD(a,b) × PPCM(a,b) = a × b est-elle utile en calcul ?",
    hint: "Elle permet de retrouver rapidement le PPCM si le PGCD est connu.",
  },
  {
    question: "Que signifie la congruence a ≡ b (mod n) dans un contexte informatique ?",
    hint: "Deux valeurs ont le même reste modulo n ; cela intervient dans les horloges, hash et crypto.",
  },
  {
    question: "À quelle condition un entier est-il inversible modulo n ?",
    hint: "Il faut que son PGCD avec n soit égal à 1.",
  },
  {
    question: "Comment résumeriez-vous le petit théorème de Fermat et son intérêt ?",
    hint: "Il simplifie certains calculs modulaires et intervient dans les démonstrations liées à RSA.",
  },
  {
    question: "Pouvez-vous décrire les grandes étapes d'une génération de clés RSA simplifiée ?",
    hint: "p, q, n, φ(n), choix de e, calcul de d, puis clés publique et privée.",
  },
];

export default function MathematiquesExpertesArithmetiquePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    if (currentQuestionIndex + 1 < mathsExpertesArithmetiqueQuiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / mathsExpertesArithmetiqueQuiz.length) * 100);
      updateModuleProgress("maths-expertes-arithmetique", percentage);
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
    if (value >= 5) return "Excellent niveau sur l'arithmétique modulaire et les bases de RSA.";
    if (value >= 3) return "Les notions clés sont là, révisez encore les inverses modulaires et Fermat.";
    return "Reprenez les définitions de PGCD, congruences et RSA simplifié avant une nouvelle tentative.";
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
            <Hash className="w-4 h-4" />
            Module maths-expertes-arithmetique
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Arithmétique et Cryptographie</h1>
          <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
            Un chapitre d&apos;approfondissement sur la divisibilité, les congruences, les calculs modulaires et les mécanismes mathématiques qui rendent RSA possible.
          </p>
        </section>

        <section className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6 mb-8 sm:mb-12">
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            <span className="font-semibold text-[#A78BFA]">Focus BTS SIO :</span> cette partie relie les démonstrations d&apos;arithmétique aux usages concrets en cybersécurité, authentification et chiffrement asymétrique.
          </p>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#A78BFA] mb-4">Aide-mémoire essentiel</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            <CheatSheet items={cheatSheetItems} title="Arithmétique modulaire & RSA" />
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#A78BFA] mb-4">Quiz de validation</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            {!quizComplete ? (
              <>
                <p className="text-[#94A3B8] mb-4">
                  Question {currentQuestionIndex + 1} / {mathsExpertesArithmetiqueQuiz.length}
                </p>
                <QuizCard question={mathsExpertesArithmetiqueQuiz[currentQuestionIndex]} onComplete={handleQuizComplete} />
              </>
            ) : (
              <div className="text-center">
                <p className={`text-2xl font-bold mb-2 ${getScoreColor(score)}`}>
                  Quiz terminé ! Score : {score}/{mathsExpertesArithmetiqueQuiz.length}
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
