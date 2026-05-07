"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import QuizCard from "@/components/QuizCard";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import { cejmFinanceQuiz } from "@/lib/quiz-cejm";
import { updateModuleProgress } from "@/lib/progress";

const cheatSheetItems = [
  { label: "Bilan", value: "Photo du patrimoine de l'entreprise à une date donnée." },
  { label: "Actif / Passif", value: "L'actif recense les emplois ; le passif recense les ressources." },
  { label: "Fonds de roulement (FR)", value: "Excédent des ressources stables sur les emplois stables." },
  { label: "Besoin en fonds de roulement (BFR)", value: "Besoin financier lié au cycle d'exploitation entre encaissements et décaissements." },
  { label: "Trésorerie", value: "Différence entre FR et BFR ; elle mesure la disponibilité financière immédiate." },
  { label: "Compte de résultat", value: "Tableau des charges et produits sur une période pour déterminer le résultat." },
  { label: "SIG — Valeur ajoutée", value: "Richesse créée par l'entreprise grâce à son activité." },
  { label: "SIG — EBE", value: "Excédent brut d'exploitation : performance économique avant politique d'investissement et de financement." },
  { label: "SIG — Résultat", value: "Résultat d'exploitation, courant puis net selon les niveaux d'analyse." },
  { label: "Ratios de liquidité", value: "Mesurent la capacité à faire face aux dettes à court terme." },
  { label: "Ratios de solvabilité", value: "Mesurent la capacité à honorer les engagements à moyen et long terme." },
  { label: "Ratios de rentabilité", value: "Évaluent la performance des capitaux investis ou de l'activité." },
  { label: "Investissement", value: "Décision engageant des ressources aujourd'hui pour des gains futurs." },
  { label: "VAN / TIR / délai de récupération", value: "Outils d'évaluation d'un projet d'investissement." },
  { label: "Financement", value: "Autofinancement, emprunt, crédit-bail, augmentation de capital, subventions." },
  { label: "Budget", value: "Prévision chiffrée qui aide à piloter l'activité et à contrôler les écarts." },
];

const oralQuestions = [
  { question: "Comment différencier bilan et compte de résultat ?", hint: "Le bilan photographie le patrimoine ; le compte de résultat mesure la performance sur une période." },
  { question: "À quoi servent le FR, le BFR et la trésorerie dans un diagnostic financier ?", hint: "Ils permettent d'analyser l'équilibre financier court terme / long terme." },
  { question: "Pourquoi les SIG sont-ils utiles pour lire la performance d'une entreprise ?", hint: "Ils décomposent la formation du résultat par étapes." },
  { question: "Quels ratios mobiliser pour apprécier la liquidité, la solvabilité et la rentabilité ?", hint: "Chaque famille répond à une question différente sur la santé financière." },
  { question: "Comment justifier une décision d'investissement à l'oral ?", hint: "Par la VAN, le TIR, le délai de récupération et la cohérence stratégique." },
  { question: "Quels sont les principaux modes de financement d'une entreprise ?", hint: "Interne avec l'autofinancement, externe avec emprunt, crédit-bail ou capital." },
];

export default function CejmFinancePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    if (currentQuestionIndex + 1 < cejmFinanceQuiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / cejmFinanceQuiz.length) * 100);
      updateModuleProgress("cejm-finance", percentage);
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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F59E0B] mb-3">Chapitre 5</p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">Gestion financière</h1>
          <p className="text-[#94A3B8] leading-relaxed">Revoyez les documents comptables, les indicateurs de performance et les outils de décision en investissement et financement.</p>
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
                <p className="text-[#94A3B8] mb-4">Question {currentQuestionIndex + 1} / {cejmFinanceQuiz.length}</p>
                <QuizCard question={cejmFinanceQuiz[currentQuestionIndex]} onComplete={handleQuizComplete} />
              </>
            ) : (
              <div className="text-center">
                <p className={`text-xl sm:text-2xl font-bold mb-2 ${scoreClass}`}>Quiz terminé ! Score : {score}/{cejmFinanceQuiz.length}</p>
                <p className="text-[#94A3B8] mb-4">
                  {score >= 5 ? "Très bonne lecture des outils financiers. 🎉" : score >= 3 ? "Le diagnostic financier est en bonne voie, mais quelques indicateurs restent à consolider." : "Refaites une lecture des notions comptables avant de recommencer."}
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
