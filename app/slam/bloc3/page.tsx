"use client";
import { useState } from "react";
import CodeBlock from "@/components/CodeBlock";
import QuizCard from "@/components/QuizCard";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import { bloc3SlamQuiz } from "@/lib/quiz-data";
import { updateModuleProgress } from "@/lib/progress";

const phpPdoCode = `<?php
// Connexion PDO sécurisée
$dsn = 'mysql:host=localhost;dbname=btssio;charset=utf8mb4';
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];
$pdo = new PDO($dsn, $user, $password, $options);

// Requête préparée — protection injection SQL
$stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
$stmt->bindParam(':email', $email, PDO::PARAM_STR);
$stmt->execute();
$user = $stmt->fetch();

// Hachage sécurisé du mot de passe
$hash = password_hash($plainPassword, PASSWORD_ARGON2ID);
$valid = password_verify($plainPassword, $hash);`;

const securityHeadersCode = `<?php
// Headers de sécurité HTTP — à placer en début de chaque page
header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Content-Security-Policy: default-src \\'self\\'');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Permissions-Policy: camera=(), microphone=(), geolocation=()');

// Protection CSRF — génération du token
session_start();
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}`;

const validationCode = `<?php
// Validation et sanitisation des entrées
function sanitizeInput(string $input): string {
    $input = trim($input);
    $input = stripslashes($input);
    return htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
}

// Validation email
$email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
if (!$email) {
    throw new InvalidArgumentException('Email invalide');
}

// Upload sécurisé — vérification MIME type réel
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mimeType = $finfo->file($_FILES['upload']['tmp_name']);
$allowed = ['image/jpeg', 'image/png', 'application/pdf'];
if (!in_array($mimeType, $allowed)) {
    throw new RuntimeException('Type de fichier non autorisé');
}`;

const owaspItems = [
  { label: "A01 — Broken Access Control", value: "Contrôle d'accès défaillant — vérifier les droits côté serveur", code: false },
  { label: "A02 — Cryptographic Failures", value: "password_hash(PASSWORD_ARGON2ID) / HTTPS obligatoire", code: true },
  { label: "A03 — Injection SQL", value: "PDO + prepare() + bindParam() — JAMAIS de concaténation", code: true },
  { label: "A04 — Insecure Design", value: "Privacy by Design, threat modeling en phase conception", code: false },
  { label: "A05 — Security Misconfiguration", value: "Désactiver debug en prod, headers HTTP sécurisés (HSTS, CSP)", code: false },
  { label: "A06 — Vulnerable Components", value: "composer update --dry-run, npm audit fix", code: true },
  { label: "A07 — Auth Failures", value: "session_regenerate_id(true) après login, tokens JWT signés", code: true },
  { label: "A08 — Software Integrity Failures", value: "Vérifier checksums, CI/CD avec signature", code: false },
  { label: "A09 — Logging Failures", value: "Logger les accès sensibles, NE PAS logger les mots de passe", code: false },
  { label: "A10 — SSRF", value: "Valider et filtrer toutes les URLs fournies par l'utilisateur", code: false },
];

const oralQuestions = [
  { question: "Qu'est-ce que l'injection SQL et comment s'en protéger en PHP ?", hint: "PDO, requêtes préparées, bindParam" },
  { question: "Expliquez la différence entre authentification et autorisation.", hint: "Qui vous êtes vs ce que vous pouvez faire" },
  { question: "Quelles sont les obligations RGPD pour une application web ?", hint: "Consentement, droit d'accès, notification sous 72h" },
  { question: "Comment sécuriser le stockage des mots de passe ?", hint: "Argon2id, bcrypt — jamais MD5/SHA1 sans sel" },
  { question: "Qu'est-ce qu'une attaque CSRF et quelle est la parade ?", hint: "Token synchroniseur, SameSite cookie" },
  { question: "Citez 3 headers HTTP de sécurité et leur rôle.", hint: "HSTS, CSP, X-Frame-Options" },
  { question: "Qu'est-ce que le principe du moindre privilège ?", hint: "Chaque composant n'a accès qu'aux ressources strictement nécessaires" },
];

export default function Bloc3Page() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    
    if (currentQuestionIndex + 1 < bloc3SlamQuiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / bloc3SlamQuiz.length) * 100);
      updateModuleProgress("bloc3-slam-owasp", percentage);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
  };

  const getScoreColor = (s: number) => {
    if (s >= 5) return "#22C55E";
    if (s >= 3) return "#EAB308";
    return "#EF4444";
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Bloc 3 SLAM — Cybersécurité</h1>
        <p className="text-[#94A3B8] mb-8 sm:mb-10">
          OWASP Top 10, protection des données, RGPD et bonnes pratiques de sécurité applicative
        </p>

        {/* SECTION 1 — OWASP Top 10 Cheat Sheet */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#8B5CF6] mb-4">
            🛡️ OWASP Top 10 — Aide-mémoire
          </h2>
          <div className="rounded-lg border border-[#475569] bg-[#1E293B] p-4 sm:p-6">
            <CheatSheet items={owaspItems} />
          </div>
        </section>

        {/* SECTION 2 — Code Examples */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#8B5CF6] mb-4">
            💻 Exemples de Code Sécurisé
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-3">
                1. Connexion PDO et requêtes préparées
              </h3>
              <CodeBlock code={phpPdoCode} language="php" filename="db_secure.php" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-3">
                2. Headers HTTP de sécurité
              </h3>
              <CodeBlock code={securityHeadersCode} language="php" filename="security_headers.php" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-3">
                3. Validation et sanitisation
              </h3>
              <CodeBlock code={validationCode} language="php" filename="validation.php" />
            </div>
          </div>
        </section>

        {/* SECTION 3 — Interactive Quiz */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#8B5CF6] mb-4">
            ✅ Quiz de Validation
          </h2>

          {!quizComplete ? (
            <>
              <p className="text-[#94A3B8] mb-4">
                Question {currentQuestionIndex + 1} / {bloc3SlamQuiz.length}
              </p>
              <QuizCard
                question={bloc3SlamQuiz[currentQuestionIndex]}
                onComplete={handleQuizComplete}
              />
            </>
          ) : (
            <div className="rounded-lg border border-[#475569] bg-[#1E293B] p-4 sm:p-6 text-center">
              <p className="text-xl sm:text-2xl font-bold mb-2" style={{ color: getScoreColor(score) }}>
                Quiz terminé ! Score : {score}/{bloc3SlamQuiz.length}
              </p>
              <p className="text-[#94A3B8] mb-4">
                {score >= 5
                  ? "Excellent travail ! 🎉"
                  : score >= 3
                  ? "Pas mal, mais revoyez les points manquants 📚"
                  : "Révisez les concepts et réessayez 💪"}
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
            🎤 Préparation à l&apos;Oral
          </h2>
          <OralSimulator questions={oralQuestions} />
        </section>
      </div>
    </div>
  );
}
