"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Headphones } from "lucide-react";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import QuizCard from "@/components/QuizCard";
import { updateModuleProgress } from "@/lib/progress";
import { anglaisComprehensionQuiz } from "@/lib/quiz-anglais";

const comprehensionItems = [
  { label: "Subject / Greeting / Body / Closing", value: "Structure classique d'un email professionnel : objet, formule d'appel, message, formule de fin." },
  { label: "Dear..., Kind regards", value: "Marqueurs d'un email formel en anglais professionnel." },
  { label: "Hi team / Thanks", value: "Formules plus neutres ou semi-formelles, fréquentes en entreprise IT." },
  { label: "Please find attached", value: "Expression utilisée pour signaler une pièce jointe." },
  { label: "As discussed", value: "Permet de rappeler un échange précédent dans un compte rendu ou un email." },
  { label: "Issue / Root cause / Workaround", value: "Schéma fréquent dans les tickets et rapports d'incident : problème, cause racine, solution de contournement." },
  { label: "Requirements / Scope / Deliverables", value: "Mots-clés typiques d'un cahier des charges ou d'un document projet." },
  { label: "ASAP", value: "As Soon As Possible — dès que possible." },
  { label: "FYI", value: "For Your Information — pour information." },
  { label: "EOD", value: "End Of Day — fin de journée." },
  { label: "ETA", value: "Estimated Time of Arrival — heure ou délai estimé." },
  { label: "POC", value: "Proof Of Concept — preuve de concept." },
  { label: "MVP", value: "Minimum Viable Product — version minimale viable d'un produit." },
  { label: "ROI", value: "Return On Investment — retour sur investissement." },
  { label: "SLA", value: "Service Level Agreement — accord sur le niveau de service." },
  { label: "KPI", value: "Key Performance Indicator — indicateur clé de performance." },
  { label: "eventually", value: "Faux ami : signifie finalement, et non éventuellement." },
  { label: "library", value: "Faux ami : bibliothèque logicielle, et non librairie." },
  { label: "however / nevertheless", value: "Connecteurs d'opposition ou de contraste." },
  { label: "furthermore / in addition", value: "Connecteurs d'ajout pour compléter une idée." },
  { label: "therefore / consequently", value: "Connecteurs de conséquence, fréquents dans les conclusions techniques." },
];

const oralQuestions = [
  {
    question: "What does the abbreviation FYI mean in a professional email?",
    hint: "It introduces information that does not necessarily require action.",
  },
  {
    question: "How can you identify a formal email in English?",
    hint: "Look at the greeting, the tone, and the closing expression.",
  },
  {
    question: "What is the meaning of EOD in a project update?",
    hint: "It refers to a deadline at the end of the working day.",
  },
  {
    question: "Why is the word 'eventually' a false friend for French speakers?",
    hint: "It means finally, not éventuellement.",
  },
  {
    question: "In technical documentation, what do 'requirements' and 'deliverables' usually refer to?",
    hint: "Think about expected needs and what must be produced at the end.",
  },
  {
    question: "How do connectors such as however and therefore help you understand a text?",
    hint: "They show contrast, consequence, or logical structure.",
  },
];

export default function AnglaisComprehensionPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    if (currentQuestionIndex + 1 < anglaisComprehensionQuiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / anglaisComprehensionQuiz.length) * 100);
      updateModuleProgress("anglais-comprehension", percentage);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
  };

  const percentage = Math.round((score / anglaisComprehensionQuiz.length) * 100);

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
              <Headphones className="w-6 h-6 text-[#0EA5E9]" />
            </div>
            <div>
              <p className="text-sm text-[#0EA5E9] font-semibold">Module anglais-comprehension</p>
              <h1 className="text-3xl sm:text-4xl font-bold">Compréhension écrite et orale</h1>
            </div>
          </div>
          <p className="text-[#94A3B8] leading-relaxed">
            Développe des réflexes pour comprendre rapidement les emails, tickets, notes de version et documentations techniques en anglais.
          </p>
        </div>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0EA5E9] mb-4">Repères de compréhension</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            <CheatSheet items={comprehensionItems} />
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0EA5E9] mb-4">Quiz de compréhension</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            {!quizComplete ? (
              <>
                <div className="flex items-center justify-between gap-4 mb-4 text-sm">
                  <span className="text-[#94A3B8]">
                    Question {currentQuestionIndex + 1} / {anglaisComprehensionQuiz.length}
                  </span>
                  <span className="text-[#0EA5E9] font-semibold">Emails, docs et faux amis</span>
                </div>
                <QuizCard
                  question={anglaisComprehensionQuiz[currentQuestionIndex]}
                  onComplete={handleQuizComplete}
                />
              </>
            ) : (
              <div className="text-center">
                <p className="text-2xl font-bold text-[#0EA5E9] mb-2">
                  Quiz terminé : {score}/{anglaisComprehensionQuiz.length}
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
