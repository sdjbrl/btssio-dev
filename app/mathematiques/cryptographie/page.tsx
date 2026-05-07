"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import QuizCard from "@/components/QuizCard";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import { mathsCryptoQuiz } from "@/lib/quiz-mathematiques";
import { updateModuleProgress } from "@/lib/progress";

const cheatSheetItems = [
  { label: "Chiffrement de César", value: "Décalage de 3 : BONJOUR → ERQMRXU (exemple pédagogique)", code: true },
  { label: "Chiffrement symétrique", value: "Même clé pour chiffrer et déchiffrer : AES est la référence actuelle", code: false },
  { label: "DES", value: "Ancien algorithme symétrique aujourd'hui considéré comme insuffisant", code: false },
  { label: "Chiffrement asymétrique", value: "Paire clé publique / clé privée, par exemple RSA", code: false },
  { label: "Exemple RSA", value: "On chiffre avec la clé publique du destinataire et lui seul déchiffre avec sa clé privée", code: true },
  { label: "Fonction de hachage", value: "Produit une empreinte non réversible pour contrôler l'intégrité", code: false },
  { label: "MD5", value: "Très rapide mais obsolète pour la sécurité car sujet aux collisions", code: false },
  { label: "SHA-256", value: "Fonction de hachage plus robuste pour l'intégrité et les signatures", code: false },
  { label: "bcrypt", value: "Fonction adaptée au stockage de mots de passe grâce au salage et au coût configurable", code: false },
  { label: "PKI", value: "Infrastructure de gestion des clés publiques : autorités, certificats, révocation", code: false },
  { label: "Certificat numérique", value: "Document signé reliant l'identité d'une entité à sa clé publique", code: false },
  { label: "TLS / SSL", value: "Sécurise les échanges réseau ; HTTPS = HTTP + TLS", code: false },
  { label: "Signature numérique", value: "Hash du message puis signature avec la clé privée pour garantir authenticité et intégrité", code: false },
  { label: "Exemple d'empreinte", value: "SHA-256('BTSSIO') → une chaîne hexadécimale unique pour le message donné", code: true },
];

const oralQuestions = [
  {
    question: "Quelle différence faites-vous entre chiffrement symétrique et asymétrique ?",
    hint: "Symétrique = une seule clé partagée ; asymétrique = clé publique + clé privée.",
  },
  {
    question: "Pourquoi RSA est-il souvent associé à l'échange de clés ou aux signatures plutôt qu'au chiffrement massif ?",
    hint: "RSA est plus coûteux ; on l'utilise souvent pour échanger une clé de session AES ou signer.",
  },
  {
    question: "À quoi sert une fonction de hachage dans un système informatique ?",
    hint: "Vérification d'intégrité, stockage de mots de passe, signature numérique.",
  },
  {
    question: "Pourquoi bcrypt est-il préférable à MD5 pour un mot de passe ?",
    hint: "bcrypt intègre salage et coût de calcul, MD5 est trop rapide et dépassé.",
  },
  {
    question: "Quel est le rôle d'une PKI et d'un certificat numérique ?",
    hint: "Associer une identité à une clé publique de manière vérifiable.",
  },
  {
    question: "Comment résumeriez-vous le rôle de TLS dans la sécurisation du Web ?",
    hint: "Chiffrement du canal, authentification du serveur, intégrité des échanges.",
  },
];

export default function MathematiquesCryptographiePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    if (currentQuestionIndex + 1 < mathsCryptoQuiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / mathsCryptoQuiz.length) * 100);
      updateModuleProgress("maths-cryptographie", percentage);
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

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/mathematiques" className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Retour aux mathématiques
        </Link>

        <section className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#EC4899]/30 bg-[#EC4899]/10 px-3 py-1 text-sm text-[#EC4899] mb-4">
            <Lock className="w-4 h-4" />
            Module maths-cryptographie
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Cryptographie et Sécurité</h1>
          <p className="text-[#94A3B8] text-base sm:text-lg">
            Les notions mathématiques qui expliquent le chiffrement, les signatures, les certificats et la sécurisation des échanges numériques.
          </p>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#EC4899] mb-4">Aide-mémoire BTS SIO</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            <CheatSheet items={cheatSheetItems} title="Clés, hash et certificats" />
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#EC4899] mb-4">Quiz de validation</h2>
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6">
            {!quizComplete ? (
              <>
                <p className="text-[#94A3B8] mb-4">
                  Question {currentQuestionIndex + 1} / {mathsCryptoQuiz.length}
                </p>
                <QuizCard question={mathsCryptoQuiz[currentQuestionIndex]} onComplete={handleQuizComplete} />
              </>
            ) : (
              <div className="text-center">
                <p className={`text-2xl font-bold mb-2 ${getScoreColor(score)}`}>
                  Quiz terminé ! Score : {score}/{mathsCryptoQuiz.length}
                </p>
                <p className="text-[#94A3B8] mb-4">
                  {score >= 5
                    ? "Très bon niveau sur les fondamentaux de la cryptographie."
                    : score >= 3
                      ? "Bonne compréhension générale, révisez encore les usages des clés et des certificats."
                      : "Reprenez les définitions de base sur le chiffrement, le hachage et TLS."}
                </p>
                <button
                  onClick={handleRestart}
                  className="rounded-lg bg-[#EC4899] px-6 py-2 text-sm font-semibold hover:bg-[#DB2777] transition-colors"
                >
                  Recommencer
                </button>
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-[#EC4899] mb-4">Préparation à l&apos;oral</h2>
          <OralSimulator questions={oralQuestions} />
        </section>
      </div>
    </div>
  );
}
