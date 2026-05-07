"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import QuizCard from "@/components/QuizCard";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import { cejmManagementQuiz } from "@/lib/quiz-cejm";
import { updateModuleProgress } from "@/lib/progress";

const cheatSheetItems = [
  { label: "Style autoritaire", value: "Le manager décide seul et contrôle fortement l'exécution." },
  { label: "Style participatif", value: "Les collaborateurs sont associés aux décisions pour favoriser l'adhésion." },
  { label: "Style délégatif", value: "Le manager fixe le cadre puis laisse une marge d'autonomie importante." },
  { label: "Style consultatif", value: "Le manager recueille les avis avant de trancher." },
  { label: "Taylor", value: "Organisation scientifique du travail : division, standardisation, recherche d'efficacité." },
  { label: "Fayol", value: "Fonctions administratives du manager : prévoir, organiser, commander, coordonner, contrôler." },
  { label: "Mayo", value: "École des relations humaines : importance des facteurs sociaux et de la motivation." },
  { label: "Maslow", value: "Hiérarchie des besoins : physiologiques, sécurité, appartenance, estime, accomplissement." },
  { label: "Herzberg", value: "Distinction entre facteurs d'hygiène et facteurs de motivation." },
  { label: "Structure fonctionnelle", value: "Organisation par grandes fonctions spécialisées." },
  { label: "Structure divisionnelle", value: "Organisation par produits, marchés ou zones géographiques." },
  { label: "Structure matricielle", value: "Double rattachement, par fonction et par projet." },
  { label: "Management par projet", value: "Pilotage transversal orienté objectifs, délais, coûts et qualité." },
  { label: "Conduite du changement", value: "Démarche d'accompagnement humain et organisationnel lors d'une transformation." },
  { label: "Culture d'entreprise", value: "Valeurs, symboles et pratiques partagées au sein de l'organisation." },
  { label: "RSE", value: "Responsabilité sociétale de l'entreprise : intégration des enjeux sociaux, éthiques et environnementaux." },
];

const oralQuestions = [
  { question: "Dans quel contexte un style participatif est-il plus efficace qu'un style autoritaire ?", hint: "Quand l'expertise est distribuée et que l'adhésion des équipes est essentielle." },
  { question: "Que retenez-vous des apports de Taylor, Mayo et Maslow ?", hint: "Efficacité productive, relations humaines et motivation." },
  { question: "Comment distinguer structure fonctionnelle, divisionnelle et matricielle ?", hint: "Regardez le critère de regroupement et le niveau de transversalité." },
  { question: "Quels sont les avantages du management par projet dans le numérique ?", hint: "Coordination transverse, objectifs clairs, délais, livrables." },
  { question: "Pourquoi la conduite du changement est-elle indispensable lors d'une transformation digitale ?", hint: "Parce qu'un outil nouveau modifie les pratiques, les rôles et parfois la culture." },
  { question: "Comment la RSE influence-t-elle le management d'une organisation ?", hint: "Elle oriente les décisions vers des critères sociaux, environnementaux et éthiques." },
];

export default function CejmManagementPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    if (currentQuestionIndex + 1 < cejmManagementQuiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / cejmManagementQuiz.length) * 100);
      updateModuleProgress("cejm-management", percentage);
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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F59E0B] mb-3">Chapitre 3</p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">Management et organisation</h1>
          <p className="text-[#94A3B8] leading-relaxed">Travaillez les styles de direction, les grandes théories du management, les structures et l&apos;accompagnement du changement.</p>
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
                <p className="text-[#94A3B8] mb-4">Question {currentQuestionIndex + 1} / {cejmManagementQuiz.length}</p>
                <QuizCard question={cejmManagementQuiz[currentQuestionIndex]} onComplete={handleQuizComplete} />
              </>
            ) : (
              <div className="text-center">
                <p className={`text-xl sm:text-2xl font-bold mb-2 ${scoreClass}`}>Quiz terminé ! Score : {score}/{cejmManagementQuiz.length}</p>
                <p className="text-[#94A3B8] mb-4">
                  {score >= 5 ? "Très bon niveau d'analyse managériale. 🎉" : score >= 3 ? "Le chapitre est compris dans l'ensemble, mais quelques repères restent à consolider." : "Reprenez les théories et les structures avant de recommencer."}
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
