"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, PenLine } from "lucide-react";
import QuizCard from "@/components/QuizCard";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import { cgeExpressionEcriteQuiz } from "@/lib/quiz-culture-generale";
import { updateModuleProgress } from "@/lib/progress";

const expressionItems = [
  { label: "Registre familier", value: "À éviter dans une copie : vocabulaire relâché, oral, abréviations, formulations trop personnelles." },
  { label: "Registre courant", value: "Clair, correct, simple : adapté à la majorité des phrases d'une copie d'examen." },
  { label: "Registre soutenu", value: "Précis et élaboré, utile dans l'argumentation si le vocabulaire reste naturel et maîtrisé." },
  { label: "Plan dialectique", value: "Oui / non / dépassement : utile pour répondre à une question qui oppose deux positions." },
  { label: "Plan thématique", value: "Organisation par axes complémentaires : culturel, social, économique, technique, éthique..." },
  { label: "Métaphore", value: "Comparer sans outil comparatif. Exemple : “Internet est une jungle informationnelle.”" },
  { label: "Anaphore", value: "Répéter un mot en début de phrase. Exemple : “Il faut comprendre, il faut vérifier, il faut agir.”" },
  { label: "Paradoxe", value: "Associer deux idées contraires en apparence pour surprendre et faire réfléchir." },
  { label: "Oxymore", value: "Réunir deux mots opposés. Exemple : “une obscure clarté”." },
  { label: "Connecteurs d'opposition", value: "Cependant, pourtant, néanmoins, en revanche, au contraire." },
  { label: "Connecteurs d'addition", value: "De plus, en outre, par ailleurs, également, aussi." },
  { label: "Connecteurs de cause", value: "Parce que, puisque, en effet, du fait de, car." },
  { label: "Connecteurs de conséquence", value: "Donc, ainsi, par conséquent, de ce fait, si bien que." },
  { label: "Connecteurs d'illustration", value: "Par exemple, notamment, comme, ainsi, en particulier." },
  { label: "Ponctuation", value: "Une phrase = une idée principale ; éviter les phrases interminables et les points d'exclamation répétés." },
  { label: "Majuscules", value: "Début de phrase, noms propres, institutions nommées précisément : République française, CNIL, Europe." },
  { label: "Accord du participe passé", value: "Avec être, accord avec le sujet ; avec avoir, accord avec le COD s'il est placé avant." },
  { label: "Subjonctif ou indicatif", value: "Subjonctif après le doute, le souhait, la nécessité ; indicatif pour le constat ou le réel." },
  { label: "Citation", value: "Guillemets + source si possible ; une citation appuie une idée mais ne remplace jamais l'argumentation." },
  { label: "Paraphrase", value: "Reformuler une source avec ses propres mots tout en respectant son sens initial." },
];

const oralQuestions = [
  {
    question: "Pourquoi le registre familier est-il déconseillé dans une copie de BTS ?",
    hint: "Parce qu'il affaiblit la crédibilité et donne une impression d'imprécision ou d'oralité.",
  },
  {
    question: "Comment choisir entre plan dialectique et plan thématique dans une écriture personnelle ?",
    hint: "Dialectique pour un débat contradictoire, thématique pour plusieurs angles complémentaires.",
  },
  {
    question: "Pouvez-vous expliquer la différence entre métaphore, paradoxe et oxymore ?",
    hint: "Métaphore = image implicite, paradoxe = idée surprenante, oxymore = deux mots opposés accolés.",
  },
  {
    question: "Quels connecteurs logiques utilisez-vous pour marquer l'opposition, la cause et la conséquence ?",
    hint: "Cependant / parce que ou en effet / donc ou par conséquent.",
  },
  {
    question: "Comment intégrer une citation sans casser la fluidité du paragraphe ?",
    hint: "Introduire la citation, l'expliquer, puis la relier à votre argument.",
  },
  {
    question: "Dans quels cas le subjonctif est-il préférable à l'indicatif ?",
    hint: "Après le doute, le souhait, la nécessité, l'émotion ou l'incertitude.",
  },
];

export default function CultureGeneraleExpressionEcritePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    if (currentQuestionIndex + 1 < cgeExpressionEcriteQuiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / cgeExpressionEcriteQuiz.length) * 100);
      updateModuleProgress("cge-expression-ecrite", percentage);
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
              <PenLine className="w-6 h-6 text-[#F97316]" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F97316] mb-2">Module cge-expression-ecrite</p>
              <h1 className="text-3xl sm:text-4xl font-bold mb-3">Expression Écrite</h1>
              <p className="text-[#94A3B8] leading-relaxed">
                Ce chapitre regroupe les bases indispensables pour rédiger une copie claire, correcte et convaincante :
                registres de langue, plans, figures de style, connecteurs logiques et vigilance grammaticale.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[#F97316] mb-4">Aide-mémoire d&apos;expression</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            <CheatSheet items={expressionItems} />
          </div>
        </section>

        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[#F97316] mb-4">Réflexes à adopter</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Pour mieux écrire</h3>
              <ul className="space-y-2 text-sm text-[#94A3B8] leading-relaxed">
                <li>• Préférer des phrases courtes à une accumulation confuse de propositions.</li>
                <li>• Relire chaque paragraphe pour vérifier l&apos;enchaînement logique des idées.</li>
                <li>• Employer un vocabulaire précis plutôt que des expressions vagues comme “truc” ou “ça”.</li>
              </ul>
            </div>
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Pour gagner des points</h3>
              <ul className="space-y-2 text-sm text-[#94A3B8] leading-relaxed">
                <li>• Soigner l&apos;introduction et la première phrase de chaque partie.</li>
                <li>• Introduire les exemples et les citations, puis les commenter.</li>
                <li>• Réserver 10 minutes finales à la relecture orthographique et grammaticale.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[#F97316] mb-4">Quiz expression écrite</h2>
          {!quizComplete ? (
            <>
              <p className="text-[#94A3B8] mb-4">
                Question {currentQuestionIndex + 1} / {cgeExpressionEcriteQuiz.length}
              </p>
              <QuizCard question={cgeExpressionEcriteQuiz[currentQuestionIndex]} onComplete={handleQuizComplete} />
            </>
          ) : (
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6 text-center">
              <p className={`text-xl sm:text-2xl font-bold mb-2 ${scoreTone}`}>
                Quiz terminé ! Score : {score}/{cgeExpressionEcriteQuiz.length}
              </p>
              <p className="text-[#94A3B8] mb-4">
                {score >= 5
                  ? "Très bien : ton socle d'expression écrite est solide."
                  : score >= 3
                    ? "C'est encourageant, mais révise les connecteurs et les figures de style."
                    : "Relis la fiche puis retravaille les bases de langue et d'argumentation."}
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
