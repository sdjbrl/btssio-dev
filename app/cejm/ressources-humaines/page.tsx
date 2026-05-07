"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import QuizCard from "@/components/QuizCard";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import { cejmRhQuiz } from "@/lib/quiz-cejm";
import { updateModuleProgress } from "@/lib/progress";

const cheatSheetItems = [
  { label: "Recrutement — processus", value: "Analyse du besoin, sourcing, sélection, entretiens, décision et intégration." },
  { label: "Recrutement — méthodes", value: "CV, tests, entretiens, mises en situation, cooptation, réseaux professionnels." },
  { label: "GPEC", value: "Gestion prévisionnelle des emplois et des compétences pour anticiper les besoins futurs." },
  { label: "CDI", value: "Contrat de droit commun sans terme précis." },
  { label: "CDD", value: "Contrat temporaire autorisé seulement dans des cas prévus par la loi." },
  { label: "Alternance", value: "Contrat articulant travail en entreprise et formation diplômante ou qualifiante." },
  { label: "Rémunération fixe", value: "Salaire de base versé régulièrement selon le contrat de travail." },
  { label: "Rémunération variable", value: "Primes, commissions, bonus ou objectifs liés à la performance." },
  { label: "Avantages", value: "Titres-restaurant, mutuelle, télétravail, véhicule, épargne salariale, etc." },
  { label: "Formation professionnelle", value: "Développement des compétences via le plan de développement, le CPF ou l'alternance." },
  { label: "Droit syndical", value: "Liberté syndicale, représentation des salariés et défense des intérêts collectifs." },
  { label: "Négociation collective", value: "Dialogue entre employeur et représentants des salariés pour fixer des règles sociales." },
  { label: "Licenciement — motifs", value: "Motif personnel ou économique, sous réserve d'une cause réelle et sérieuse." },
  { label: "Licenciement — procédure", value: "Convocation, entretien préalable, notification et respect des délais légaux." },
];

const oralQuestions = [
  { question: "Comment une entreprise définit-elle un besoin de recrutement ?", hint: "Elle part des missions, des compétences attendues et du contexte organisationnel." },
  { question: "Quel est l'intérêt de la GPEC pour une organisation ?", hint: "Anticiper les évolutions métiers et sécuriser les compétences futures." },
  { question: "Comment distinguer CDI, CDD et alternance ?", hint: "Durée, finalité, encadrement juridique et articulation avec la formation." },
  { question: "Pourquoi parle-t-on de rémunération globale ?", hint: "Parce qu'elle dépasse le seul salaire fixe et inclut variable et avantages." },
  { question: "Quel rôle joue la formation professionnelle dans la performance RH ?", hint: "Elle sécurise l'employabilité et accompagne les transformations de l'entreprise." },
  { question: "Quelles garanties juridiques entourent une procédure de licenciement ?", hint: "Cause réelle et sérieuse, respect de la procédure et des droits du salarié." },
];

export default function CejmRhPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    if (currentQuestionIndex + 1 < cejmRhQuiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / cejmRhQuiz.length) * 100);
      updateModuleProgress("cejm-rh", percentage);
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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F59E0B] mb-3">Chapitre 4</p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">Ressources Humaines</h1>
          <p className="text-[#94A3B8] leading-relaxed">Révisez le recrutement, la gestion des compétences, la rémunération et les règles essentielles du cadre social en entreprise.</p>
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
                <p className="text-[#94A3B8] mb-4">Question {currentQuestionIndex + 1} / {cejmRhQuiz.length}</p>
                <QuizCard question={cejmRhQuiz[currentQuestionIndex]} onComplete={handleQuizComplete} />
              </>
            ) : (
              <div className="text-center">
                <p className={`text-xl sm:text-2xl font-bold mb-2 ${scoreClass}`}>Quiz terminé ! Score : {score}/{cejmRhQuiz.length}</p>
                <p className="text-[#94A3B8] mb-4">
                  {score >= 5 ? "Très bonne compréhension des enjeux RH. 🎉" : score >= 3 ? "Les fondamentaux sont acquis, mais quelques points juridiques restent à revoir." : "Relisez les notions RH avant de refaire le quiz."}
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
