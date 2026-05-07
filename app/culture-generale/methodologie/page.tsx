"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, GraduationCap } from "lucide-react";
import QuizCard from "@/components/QuizCard";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import { cgeMethodologieQuiz } from "@/lib/quiz-culture-generale";
import { updateModuleProgress } from "@/lib/progress";

const methodologyItems = [
  { label: "Exercices de l'E1", value: "Résumé, synthèse de documents et écriture personnelle argumentée." },
  { label: "Résumé — longueur", value: "Environ 1/4 du texte source, sans titre ni commentaires personnels." },
  { label: "Résumé — règle d'or", value: "Reformuler fidèlement les idées essentielles sans copier les phrases de l'auteur." },
  { label: "Résumé — étapes", value: "Lire, repérer thème/thèse, surligner idées clés, hiérarchiser, rédiger, vérifier la fidélité." },
  { label: "Résumé — à éviter", value: "Exemples secondaires, digressions, citations longues, jugement personnel, paraphrase maladroite." },
  { label: "Synthèse — objectif", value: "Comparer plusieurs documents et organiser leurs idées dans un plan logique et neutre." },
  { label: "Synthèse — introduction", value: "Présenter le thème commun, contextualiser le corpus, formuler la problématique et annoncer le plan." },
  { label: "Synthèse — développement", value: "Construire des axes thématiques, croiser les documents et citer les auteurs seulement si nécessaire." },
  { label: "Synthèse — conclusion", value: "Faire un bilan des idées majeures sans ouvrir un nouveau débat personnel." },
  { label: "Neutralité de la synthèse", value: "Employer un ton objectif : pas de “je”, pas d'avis, pas de prise de position personnelle." },
  { label: "Plan dialectique", value: "Thèse → antithèse → synthèse/dépassement. Idéal pour discuter une question polémique." },
  { label: "Plan thématique", value: "Classer le sujet par grands axes complémentaires : social, culturel, économique, éthique..." },
  { label: "Paragraphe PREP", value: "Point, Raison, Exemple, Point final reformulé : un mini-raisonnement complet en 4 temps." },
  { label: "Modèle d'introduction", value: "Accroche brève → définition/cadrage → problématique → annonce du plan." },
  { label: "Modèle de conclusion", value: "Bilan de la démonstration → réponse claire à la problématique → ouverture courte si pertinente." },
];

const oralQuestions = [
  {
    question: "Comment distinguer résumé, synthèse de documents et écriture personnelle à l'épreuve E1 ?",
    hint: "Résumé = un texte, synthèse = plusieurs documents, écriture personnelle = prise de position argumentée.",
  },
  {
    question: "Quelles sont les étapes concrètes pour réussir un résumé sans déformer la pensée de l'auteur ?",
    hint: "Lecture globale, repérage des idées clés, hiérarchisation, reformulation, relecture finale.",
  },
  {
    question: "Pourquoi parle-t-on de neutralité dans la synthèse de documents ?",
    hint: "On restitue et on compare les idées du corpus, sans introduire son avis personnel.",
  },
  {
    question: "Dans quel cas choisir un plan dialectique plutôt qu'un plan thématique ?",
    hint: "Plan dialectique si le sujet oppose deux positions ; plan thématique si plusieurs angles se complètent.",
  },
  {
    question: "Comment construire un paragraphe argumentatif solide avec la méthode PREP ?",
    hint: "Idée directrice, justification, exemple précis, reformulation finale.",
  },
  {
    question: "Que doit contenir une bonne introduction de copie en CGE ?",
    hint: "Cadrage du sujet, problématique et annonce du plan, sans partir dans un développement trop long.",
  },
];

export default function CultureGeneraleMethodologiePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    if (currentQuestionIndex + 1 < cgeMethodologieQuiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / cgeMethodologieQuiz.length) * 100);
      updateModuleProgress("cge-methodologie", percentage);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
  };

  const scoreTone = score >= 5 ? "text-green-400" : score >= 3 ? "text-amber-300" : "text-red-400";

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/culture-generale"
          className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-[#F97316] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à Culture Générale et Expression
        </Link>

        <section className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6 mb-8 sm:mb-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F97316]/15 border border-[#F97316]/30 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6 text-[#F97316]" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F97316] mb-2">Module cge-methodologie</p>
              <h1 className="text-3xl sm:text-4xl font-bold mb-3">Méthodologie de l&apos;épreuve E1</h1>
              <p className="text-[#94A3B8] leading-relaxed">
                Ici, tu révises les méthodes attendues à l&apos;épreuve : résumé, synthèse de documents et écriture personnelle.
                L&apos;objectif est d&apos;apprendre à lire vite, organiser les idées et rédiger une copie claire en 4 heures.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[#F97316] mb-4">Fiche méthode</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            <CheatSheet items={methodologyItems} />
          </div>
        </section>

        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[#F97316] mb-4">Repères concrets pour la copie</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Avant de rédiger</h3>
              <ul className="space-y-2 text-sm text-[#94A3B8] leading-relaxed">
                <li>• Lire l&apos;ensemble du sujet et répartir le temps entre lecture, brouillon et rédaction.</li>
                <li>• Surligner uniquement les idées majeures, pas chaque exemple secondaire.</li>
                <li>• Formuler une problématique simple qui guidera tout le devoir.</li>
              </ul>
            </div>
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Pendant la rédaction</h3>
              <ul className="space-y-2 text-sm text-[#94A3B8] leading-relaxed">
                <li>• Un paragraphe = une idée directrice appuyée par une justification et un exemple.</li>
                <li>• Utiliser des connecteurs logiques visibles pour guider le correcteur.</li>
                <li>• Garder une conclusion courte, nette et directement liée à la problématique.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[#F97316] mb-4">Quiz méthodologie</h2>
          {!quizComplete ? (
            <>
              <p className="text-[#94A3B8] mb-4">
                Question {currentQuestionIndex + 1} / {cgeMethodologieQuiz.length}
              </p>
              <QuizCard question={cgeMethodologieQuiz[currentQuestionIndex]} onComplete={handleQuizComplete} />
            </>
          ) : (
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6 text-center">
              <p className={`text-xl sm:text-2xl font-bold mb-2 ${scoreTone}`}>
                Quiz terminé ! Score : {score}/{cgeMethodologieQuiz.length}
              </p>
              <p className="text-[#94A3B8] mb-4">
                {score >= 5
                  ? "Très bon niveau : tu maîtrises déjà les attendus de l'E1."
                  : score >= 3
                    ? "Bonne base, mais révise la structure des exercices pour gagner en efficacité."
                    : "Reprends la fiche méthode puis refais le quiz pour sécuriser les automatismes."}
              </p>
              <button
                onClick={handleRestart}
                className="px-6 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-md text-sm font-medium transition-colors"
              >
                Recommencer
              </button>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F97316] mb-4">Simulation orale</h2>
          <OralSimulator questions={oralQuestions} />
        </section>
      </div>
    </div>
  );
}
