"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Globe } from "lucide-react";
import QuizCard from "@/components/QuizCard";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import { cgeCultureNumeriqueQuiz } from "@/lib/quiz-culture-generale";
import { updateModuleProgress } from "@/lib/progress";

const numeriqueItems = [
  { label: "Donnée personnelle", value: "Information qui permet d'identifier directement ou indirectement une personne : nom, email, IP, photo, géolocalisation." },
  { label: "Algorithme", value: "Suite d'instructions destinée à produire un résultat à partir de données d'entrée." },
  { label: "IA", value: "Systèmes capables d'analyser des données et de produire des prédictions, décisions ou contenus." },
  { label: "Big data", value: "Volumes massifs de données exploités pour repérer des tendances, comportements ou corrélations." },
  { label: "Cloud", value: "Ressources hébergées à distance : stockage, calcul, applications accessibles via Internet." },
  { label: "Enjeu éthique", value: "Éviter les biais, protéger la vie privée, garder une responsabilité humaine dans les décisions automatisées." },
  { label: "RGPD", value: "Règlement européen protégeant les données personnelles et imposant information, consentement et sécurité." },
  { label: "DSA", value: "Digital Services Act : renforce la responsabilité des plateformes face aux contenus illicites et à la transparence." },
  { label: "DMA", value: "Digital Markets Act : encadre les grandes plateformes pour limiter les abus de position dominante." },
  { label: "Fracture numérique", value: "Inégalités d'accès, d'équipement ou de compétences face aux outils numériques." },
  { label: "Fake news", value: "Information fausse ou trompeuse diffusée pour manipuler, influencer ou faire réagir." },
  { label: "Fact-checking", value: "Vérifier source, auteur, date, contexte, image et recouper avec plusieurs médias fiables." },
  { label: "Cyberharcèlement", value: "Violences répétées en ligne : insultes, humiliations, menaces, diffusion de contenus nuisibles." },
  { label: "Recours en cas de cyberharcèlement", value: "Capturer les preuves, signaler la plateforme, prévenir un adulte/référent, déposer plainte si nécessaire." },
  { label: "Identité numérique", value: "Ensemble des traces laissées en ligne : comptes, commentaires, photos, publications, historique public." },
  { label: "E-réputation", value: "Image renvoyée par les contenus trouvés sur soi ou sur une organisation via moteurs et réseaux." },
  { label: "Droits numériques", value: "Droit à l'information, à la protection des données, à l'oubli, à l'accès et à la rectification." },
  { label: "Désinformation", value: "Diffusion volontaire de contenus trompeurs pour orienter l'opinion ou semer le doute." },
];

const oralQuestions = [
  {
    question: "Comment définir la fracture numérique et pourquoi concerne-t-elle aussi les entreprises ?",
    hint: "Elle touche l'accès, l'équipement et les compétences ; elle influence l'emploi, les démarches et la formation.",
  },
  {
    question: "Quelles différences faites-vous entre donnée personnelle, identité numérique et e-réputation ?",
    hint: "La donnée est l'information, l'identité numérique regroupe les traces, l'e-réputation correspond à l'image perçue.",
  },
  {
    question: "Quels réflexes adopter pour vérifier une information avant de la partager ?",
    hint: "Source, date, auteur, image, croisement avec d'autres médias, sites de vérification.",
  },
  {
    question: "Pourquoi l'intelligence artificielle soulève-t-elle des questions éthiques ?",
    hint: "Biais, opacité, surveillance, responsabilité humaine, usage des données d'entraînement.",
  },
  {
    question: "Quels textes encadrent aujourd'hui le numérique en Europe ?",
    hint: "RGPD pour les données, DSA pour les plateformes, DMA pour la concurrence numérique.",
  },
  {
    question: "Que faire face à une situation de cyberharcèlement ?",
    hint: "Conserver les preuves, signaler, se faire accompagner, utiliser les recours juridiques si besoin.",
  },
];

export default function CultureGeneraleCultureNumeriquePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    if (currentQuestionIndex + 1 < cgeCultureNumeriqueQuiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / cgeCultureNumeriqueQuiz.length) * 100);
      updateModuleProgress("cge-culture-numerique", percentage);
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
              <Globe className="w-6 h-6 text-[#F97316]" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F97316] mb-2">Module cge-culture-numerique</p>
              <h1 className="text-3xl sm:text-4xl font-bold mb-3">Culture Numérique et Société</h1>
              <p className="text-[#94A3B8] leading-relaxed">
                Ce chapitre relie la culture générale aux usages numériques du quotidien : données personnelles,
                désinformation, cyberharcèlement, intelligence artificielle, réglementation et citoyenneté numérique.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[#F97316] mb-4">Fiche repères numériques</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            <CheatSheet items={numeriqueItems} />
          </div>
        </section>

        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[#F97316] mb-4">Pourquoi ce thème compte en BTS SIO</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Pour le futur professionnel</h3>
              <ul className="space-y-2 text-sm text-[#94A3B8] leading-relaxed">
                <li>• Un technicien BTS SIO manipule des données, des comptes et parfois des outils d&apos;automatisation.</li>
                <li>• Comprendre la réglementation aide à adopter de bons réflexes de conformité et de sécurité.</li>
                <li>• Les sujets de société nourrissent aussi les exemples d&apos;écriture personnelle en CGE.</li>
              </ul>
            </div>
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Pour le citoyen connecté</h3>
              <ul className="space-y-2 text-sm text-[#94A3B8] leading-relaxed">
                <li>• Vérifier l&apos;information permet de limiter la désinformation et les manipulations.</li>
                <li>• Protéger sa vie privée réduit les risques d&apos;usurpation, de profilage ou d&apos;exposition excessive.</li>
                <li>• Connaître ses droits numériques aide à agir face aux abus ou aux plateformes trop intrusives.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[#F97316] mb-4">Quiz culture numérique</h2>
          {!quizComplete ? (
            <>
              <p className="text-[#94A3B8] mb-4">
                Question {currentQuestionIndex + 1} / {cgeCultureNumeriqueQuiz.length}
              </p>
              <QuizCard question={cgeCultureNumeriqueQuiz[currentQuestionIndex]} onComplete={handleQuizComplete} />
            </>
          ) : (
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6 text-center">
              <p className={`text-xl sm:text-2xl font-bold mb-2 ${scoreTone}`}>
                Quiz terminé ! Score : {score}/{cgeCultureNumeriqueQuiz.length}
              </p>
              <p className="text-[#94A3B8] mb-4">
                {score >= 5
                  ? "Excellent : tu relis bien les enjeux numériques aux questions de société."
                  : score >= 3
                    ? "Bonne progression, mais révise les textes européens et les notions de vérification de l'information."
                    : "Reprends les définitions clés avant de recommencer le quiz."}
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
