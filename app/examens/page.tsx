"use client";
import Link from "next/link";
import { useState } from "react";
import CodeBlock from "@/components/CodeBlock";
import QuizCard from "@/components/QuizCard";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import AnnaleCard from "@/components/AnnaleCard";
import { annales } from "@/lib/annales-data";
import { examensQuiz } from "@/lib/quiz-data";
import { updateModuleProgress } from "@/lib/progress";

const ficheActiviteTemplate = `FICHE DESCRIPTIVE D'ACTIVITÉ PROFESSIONNELLE
============================================

CONTEXTE :
----------
Entreprise / Organisation : _______________________
Période : du ____/____/____ au ____/____/____
Type de structure : PME / Grande entreprise / Administration / Association
Effectif : _________ personnes
Secteur d'activité : _______________________

SITUATION PROFESSIONNELLE :
---------------------------
Titre : _______________________

Description du besoin / problématique :
_______________________
_______________________
_______________________

Environnement technique :
- Matériel : _______________________
- Logiciels / Technologies : _______________________
- Contraintes : _______________________

RÉALISATIONS :
--------------
1. Analyse de la demande
   - Recueil du besoin auprès de : _______________________
   - Analyse des besoins fonctionnels et techniques
   - Étude de l'existant
   
2. Conception de la solution
   - Schémas / maquettes / modélisations réalisés (MCD, UML, wireframes...)
   - Choix technologiques justifiés
   - Architecture retenue
   
3. Développement / mise en œuvre
   - Technologies et outils utilisés : _______________________
   - Méthodes (agile, cycle en V...) : _______________________
   - Difficultés rencontrées et solutions apportées
   
4. Tests et validation
   - Tests unitaires / Tests d'intégration / Tests utilisateurs
   - Validation par le client / maître de stage
   
5. Documentation
   - Documentation technique (code, architecture)
   - Documentation utilisateur (guide, FAQ)
   - Procédures de déploiement

COMPÉTENCES MOBILISÉES :
------------------------
□ Gérer le patrimoine informatique
□ Répondre aux incidents et aux demandes d'assistance
□ Développer la présence en ligne
□ Travailler en mode projet
□ Mettre à disposition des utilisateurs un service informatique
□ Organiser son développement professionnel
[Cocher et détailler les compétences du référentiel]

PRODUCTION(S) ASSOCIÉE(S) :
---------------------------
- Captures d'écran
- Extraits de code commentés (2-3 pages max)
- Schémas techniques (MCD, diagrammes UML, architecture réseau...)
- Tableau de tests

BILAN / APPORTS :
-----------------
- Compétences techniques développées : _______________________
- Compétences transversales acquises : _______________________
- Points d'amélioration identifiés : _______________________
- Suite donnée au projet : _______________________`;

const epreuvesItems = [
  { label: "E4 — Support et mise à disposition", value: "Oral 40 min (20+20) — Portfolio professionnel + 2 situations — Coef 4", code: false },
  { label: "E4 — Contenu portfolio", value: "2 situations pro détaillées (contexte, réalisations, compétences, productions)", code: false },
  { label: "E5 — Conception et dev", value: "Pratique 4h + oral 20 min — Développement d'une solution applicative — Coef 4", code: false },
  { label: "E5 — Partie pratique", value: "Développement sur poste à partir d'un cahier des charges (analyse, code, tests)", code: false },
  { label: "E5 — Partie orale", value: "Présentation des choix techniques + questions du jury (10+10 min)", code: false },
  { label: "E6 — Cybersécurité", value: "Écrit 2h — Étude de cas cybersécurité (SLAM et SISR) — Coef 1 — Obligatoire", code: false },
  { label: "E6 — Thématiques", value: "OWASP, RGPD, PRA/PCA, firewall, sauvegardes, VPN, conformité, audit", code: false },
  { label: "Critères de notation", value: "Pertinence technique, justification des choix, qualité docs, communication orale", code: false },
];

const conseils = `CONSEILS POUR RÉUSSIR LES ÉPREUVES BTS SIO
==========================================

E4 — PORTFOLIO PROFESSIONNEL :
-------------------------------
✓ Choisir 2 situations SIGNIFICATIVES et DIFFÉRENTES
  (1 réseau/système + 1 développement par ex, ou 1 stage + 1 projet école)
✓ Contextualiser : entreprise, besoin client, enjeux, contraintes
✓ Détailler les RÉALISATIONS concrètes (pas juste "j'ai fait", mais COMMENT)
✓ Justifier les CHOIX TECHNIQUES (pourquoi cette techno, cet outil ?)
✓ Produire des PREUVES : captures, code commenté, schémas, tableaux de tests
✓ Anticiper les questions : "Pourquoi pas autre solution ?", "Et si...", "Sécurité ?"

E5 — DÉVELOPPEMENT :
--------------------
✓ Lire TOUT le sujet avant de commencer (gestion du temps : 4h)
✓ Analyser le cahier des charges (fonctionnalités, contraintes, livrables)
✓ Structurer le code (MVC, fonctions/classes bien nommées, commentaires clairs)
✓ TESTER au fur et à mesure (ne pas tout coder puis tester à la fin)
✓ Documenter les choix techniques dans un fichier README
✓ Préparer l'oral : savoir expliquer CHAQUE ligne de code

E6 — CYBERSÉCURITÉ :
--------------------
✓ Réviser OWASP Top 10, RGPD (droits, délais), PRA/PCA (RPO/RTO)
✓ Connaître les outils : iptables, VPN (IPsec, OpenVPN), sauvegarde 3-2-1
✓ Raisonner en RISQUES et CONTRE-MESURES (pas juste réciter des définitions)
✓ Étude de cas : identifier les vulnérabilités, proposer des solutions chiffrées
✓ Argumenter les choix (coût, complexité, impact sur les utilisateurs)

ORAL — COMMUNICATION :
----------------------
✓ Structurer la présentation (intro, contexte, réalisations, bilan)
✓ Utiliser le vocabulaire technique PRÉCIS (pas "truc", "machin")
✓ Regarder le jury, ne pas lire ses notes
✓ Si on ne sait pas : "Je ne me souviens plus, mais je sais où trouver l'info"
✓ Gérer le stress : respirer, parler lentement, reformuler si nécessaire`;

const oralQuestions = [
  { question: "Comment avez-vous structuré votre portfolio professionnel pour l'épreuve E4 ?", hint: "2 situations distinctes, contexte, réalisations, compétences, productions" },
  { question: "Quelles sont les différences entre les épreuves E4, E5 et E6 ?", hint: "E4 = oral portfolio, E5 = dev pratique + oral, E6 = écrit cybersécurité" },
  { question: "Comment justifier vos choix techniques devant un jury ?", hint: "Contexte, contraintes, alternatives envisagées, avantages/inconvénients, pertinence" },
  { question: "Que faire si le jury vous pose une question dont vous ne connaissez pas la réponse ?", hint: "Honnêteté, reconnaître, expliquer démarche pour trouver, ne pas inventer" },
  { question: "Quels types de productions joindre à vos fiches descriptives ?", hint: "Captures écran, code commenté, schémas (MCD, archi réseau), tableaux de tests, docs" },
  { question: "Comment gérez-vous le temps lors de l'épreuve pratique E5 (4 heures) ?", hint: "Lecture sujet (15 min), analyse besoin (30 min), dev (2h30), tests (45 min), doc (30 min)" },
  { question: "Quels sont les critères de notation du jury pour l'oral E4 ?", hint: "Pertinence réalisations, maîtrise technique, communication, justification choix, qualité docs" },
];

export default function ExamensPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    
    if (currentQuestionIndex + 1 < examensQuiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / examensQuiz.length) * 100);
      updateModuleProgress("examens-preparation", percentage);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
  };

  const getScoreColor = (s: number) => {
    if (s >= 4) return "#22C55E";
    if (s >= 3) return "#EAB308";
    return "#EF4444";
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Préparation aux Épreuves</h1>
        <p className="text-[#94A3B8] mb-8 sm:mb-10">
          E4 Portfolio professionnel, E5 Conception & développement, E6 Cybersécurité
        </p>

        {/* SECTION 1 — Structure des épreuves */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#8B5CF6] mb-4">
            📋 Structure des Épreuves — Aide-mémoire
          </h2>
          <div className="rounded-lg border border-[#475569] bg-[#1E293B] p-4 sm:p-6">
            <CheatSheet items={epreuvesItems} />
          </div>
        </section>

        {/* SECTION 2 — Templates et conseils */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#8B5CF6] mb-4">
            📝 Modèles et Conseils
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-3">
                1. Template de Fiche Descriptive d&apos;Activité (E4)
              </h3>
              <CodeBlock code={ficheActiviteTemplate} language="text" filename="fiche_activite_template.txt" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-3">
                2. Conseils pour réussir les épreuves
              </h3>
              <CodeBlock code={conseils} language="text" filename="conseils_examens.txt" />
            </div>
          </div>
        </section>

        {/* SECTION 3 — Interactive Quiz */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#8B5CF6] mb-4">
            ✅ Quiz sur le Format des Épreuves
          </h2>

          {!quizComplete ? (
            <>
              <p className="text-[#94A3B8] mb-4">
                Question {currentQuestionIndex + 1} / {examensQuiz.length}
              </p>
              <QuizCard
                question={examensQuiz[currentQuestionIndex]}
                onComplete={handleQuizComplete}
              />
            </>
          ) : (
            <div className="rounded-lg border border-[#475569] bg-[#1E293B] p-4 sm:p-6 text-center">
              <p className="text-xl sm:text-2xl font-bold mb-2" style={{ color: getScoreColor(score) }}>
                Quiz terminé ! Score : {score}/{examensQuiz.length}
              </p>
              <p className="text-[#94A3B8] mb-4">
                {score >= 4
                  ? "Excellent travail ! Vous maîtrisez le format des épreuves 🎉"
                  : score >= 3
                  ? "Pas mal, mais revoyez les modalités d'examen 📚"
                  : "Révisez la structure des épreuves et réessayez 💪"}
              </p>
              <button
                onClick={handleRestart}
                className="px-6 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-md text-sm font-medium transition-colors"
              >
                Recommencer
              </button>
            </div>
          )}
        </section>

        {/* SECTION 4 — Oral Simulator */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-[#8B5CF6] mb-4">
            🎤 Questions Classiques des Jurys BTS SIO
          </h2>
          <OralSimulator questions={oralQuestions} />
        </section>

        {/* Annales récentes */}
        <section className="mt-16 border-t border-[#334155] pt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold font-mono">📋 Annales récentes</h2>
            <Link
              href="/annales"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Voir toutes les annales →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...annales]
              .sort((a, b) => b.year - a.year)
              .slice(0, 6)
              .map((a) => (
                <AnnaleCard key={a.id} annale={a} />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
