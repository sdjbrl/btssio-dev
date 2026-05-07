"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import QuizCard from "@/components/QuizCard";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import { cejmDroitQuiz } from "@/lib/quiz-cejm";
import { updateModuleProgress } from "@/lib/progress";

const cheatSheetItems = [
  { label: "Contrat — formation", value: "Accord de volontés entre parties capables sur un contenu licite et certain." },
  { label: "Contrat — validité", value: "Consentement libre, capacité juridique et objet conforme au droit." },
  { label: "Contrat — exécution", value: "Les parties doivent exécuter le contrat de bonne foi et respecter leurs obligations." },
  { label: "Responsabilité contractuelle", value: "Sanction de l'inexécution ou de la mauvaise exécution d'un contrat." },
  { label: "Responsabilité délictuelle", value: "Responsabilité engagée hors contrat en cas de faute, dommage et lien de causalité." },
  { label: "RGPD — 6 principes", value: "Licéité, loyauté, transparence, finalité, minimisation, exactitude, limitation de conservation et sécurité avec responsabilité du traitement." },
  { label: "Droits des personnes", value: "Accès, rectification, effacement, limitation, opposition, portabilité." },
  { label: "Propriété intellectuelle", value: "Ensemble des droits protégeant les créations intellectuelles et signes distinctifs." },
  { label: "Droit d'auteur", value: "Protège une œuvre originale de l'esprit, y compris un logiciel." },
  { label: "Brevets et marques", value: "Le brevet protège une invention technique ; la marque protège un signe distinctif." },
  { label: "Droit des données", value: "Encadrement de la collecte, du traitement, du stockage et du partage des données." },
  { label: "Hébergement et responsabilité", value: "L'hébergeur doit retirer promptement un contenu manifestement illicite après notification." },
  { label: "Cybercriminalité", value: "Infractions liées aux systèmes d'information : accès frauduleux, escroquerie, atteinte aux données, etc." },
];

const oralQuestions = [
  { question: "Quelles sont les conditions de validité d'un contrat en droit français ?", hint: "Consentement, capacité et contenu licite et certain." },
  { question: "Comment distinguer responsabilité contractuelle et responsabilité délictuelle ?", hint: "La première suppose un contrat, la seconde intervient hors contrat." },
  { question: "Quels sont les principes essentiels du RGPD à connaître pour une entreprise numérique ?", hint: "Finalité, minimisation, transparence, sécurité et responsabilité." },
  { question: "Quels droits un utilisateur peut-il exercer sur ses données personnelles ?", hint: "Accès, rectification, effacement, opposition, portabilité..." },
  { question: "Comment le droit protège-t-il un logiciel ou une innovation ?", hint: "Droit d'auteur pour le logiciel, brevet selon les cas, marque pour les signes distinctifs." },
  { question: "Dans quels cas la responsabilité d'un hébergeur peut-elle être engagée ?", hint: "Lorsqu'il ne retire pas un contenu manifestement illicite signalé." },
];

export default function CejmDroitPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    if (currentQuestionIndex + 1 < cejmDroitQuiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / cejmDroitQuiz.length) * 100);
      updateModuleProgress("cejm-droit", percentage);
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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F59E0B] mb-3">Chapitre 2</p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">Droit du numérique et des affaires</h1>
          <p className="text-[#94A3B8] leading-relaxed">Révisez les contrats, la responsabilité, la protection des données et les règles juridiques qui encadrent les activités numériques.</p>
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
                <p className="text-[#94A3B8] mb-4">Question {currentQuestionIndex + 1} / {cejmDroitQuiz.length}</p>
                <QuizCard question={cejmDroitQuiz[currentQuestionIndex]} onComplete={handleQuizComplete} />
              </>
            ) : (
              <div className="text-center">
                <p className={`text-xl sm:text-2xl font-bold mb-2 ${scoreClass}`}>Quiz terminé ! Score : {score}/{cejmDroitQuiz.length}</p>
                <p className="text-[#94A3B8] mb-4">
                  {score >= 5 ? "Très bonne maîtrise du vocabulaire juridique. 🎉" : score >= 3 ? "Les bases sont là, mais certaines notions doivent être précisées." : "Revoyez les mécanismes juridiques puis refaites le quiz."}
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
