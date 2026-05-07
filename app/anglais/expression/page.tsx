"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, MessageSquare } from "lucide-react";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import QuizCard from "@/components/QuizCard";
import { updateModuleProgress } from "@/lib/progress";
import { anglaisExpressionQuiz } from "@/lib/quiz-anglais";

const expressionItems = [
  { label: "I am writing to...", value: "Je vous écris pour... — formule d'ouverture neutre et professionnelle." },
  { label: "I would like to...", value: "Je souhaiterais... — utile pour formuler une demande polie." },
  { label: "Further to our meeting...", value: "Suite à notre réunion... — permet de faire référence à un échange précédent." },
  { label: "Please find attached...", value: "Veuillez trouver ci-joint... — pour annoncer un document joint." },
  { label: "Could you please clarify...?", value: "Pourriez-vous préciser...? — demander un éclaircissement avec politesse." },
  { label: "I didn't quite catch that.", value: "Je n'ai pas bien saisi. — utile à l'oral pour demander une reformulation." },
  { label: "Today I would like to talk about...", value: "Aujourd'hui, je voudrais parler de... — bonne entrée pour une présentation." },
  { label: "Moving on to...", value: "Passons maintenant à... — transition orale claire entre deux parties." },
  { label: "To summarize...", value: "Pour résumer... — introduit la conclusion d'une présentation." },
  { label: "This works by...", value: "Cela fonctionne en... — amorce pour expliquer un mécanisme technique." },
  { label: "The purpose of this is to...", value: "L'objectif de cela est de... — utile pour justifier un choix technique." },
  { label: "Please do not hesitate to contact me.", value: "N'hésitez pas à me contacter. — formule de clôture professionnelle." },
  { label: "Looking forward to hearing from you.", value: "Dans l'attente de votre retour. — clôture fréquente dans les emails." },
  { label: "Best regards / Kind regards", value: "Cordialement / Bien cordialement — signatures de fin d'email." },
];

const oralQuestions = [
  {
    question: "Introduce yourself as an IT student in one minute.",
    hint: "Mention your name, your BTS SIO program, your option, and your professional goal.",
  },
  {
    question: "How would you start a formal email to report a technical issue?",
    hint: "Use a polite opening such as 'I am writing to report...' and state the issue clearly.",
  },
  {
    question: "Can you explain how a VPN works in simple English?",
    hint: "Use short sentences: secure tunnel, encrypted traffic, remote access.",
  },
  {
    question: "How do you ask for clarification during a technical meeting?",
    hint: "Use polite phrases like 'Could you please clarify...?' or 'Could you repeat that, please?'.",
  },
  {
    question: "How would you present the goal of a web application to a client?",
    hint: "Start with the purpose, then explain the benefits and the main features.",
  },
  {
    question: "Give a short conclusion for a presentation about cybersecurity.",
    hint: "Use 'To summarize' and mention security, risks, and best practices.",
  },
];

export default function AnglaisExpressionPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    if (currentQuestionIndex + 1 < anglaisExpressionQuiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / anglaisExpressionQuiz.length) * 100);
      updateModuleProgress("anglais-expression", percentage);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
  };

  const percentage = Math.round((score / anglaisExpressionQuiz.length) * 100);

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
              <MessageSquare className="w-6 h-6 text-[#0EA5E9]" />
            </div>
            <div>
              <p className="text-sm text-[#0EA5E9] font-semibold">Module anglais-expression</p>
              <h1 className="text-3xl sm:text-4xl font-bold">Expression écrite et orale</h1>
            </div>
          </div>
          <p className="text-[#94A3B8] leading-relaxed">
            Entraîne-toi à rédiger des emails clairs, présenter un sujet technique et reformuler correctement en anglais professionnel.
          </p>
        </div>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0EA5E9] mb-4">Formulations utiles</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            <CheatSheet items={expressionItems} />
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0EA5E9] mb-4">Quiz d&apos;expression</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            {!quizComplete ? (
              <>
                <div className="flex items-center justify-between gap-4 mb-4 text-sm">
                  <span className="text-[#94A3B8]">
                    Question {currentQuestionIndex + 1} / {anglaisExpressionQuiz.length}
                  </span>
                  <span className="text-[#0EA5E9] font-semibold">Emails, oral et vocabulaire pro</span>
                </div>
                <QuizCard
                  question={anglaisExpressionQuiz[currentQuestionIndex]}
                  onComplete={handleQuizComplete}
                />
              </>
            ) : (
              <div className="text-center">
                <p className="text-2xl font-bold text-[#0EA5E9] mb-2">
                  Quiz terminé : {score}/{anglaisExpressionQuiz.length}
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
