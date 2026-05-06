export interface QuizQuestion {
  id: string;
  question: string;
  choices: string[];
  correct: number; // index
  explanation: string;
}

export const bloc3SlamQuiz: QuizQuestion[] = [
  {
    id: "q1",
    question:
      "Une requête SQL construite en concaténant directement les entrées utilisateur expose à quelle type de faille ?",
    choices: ["XSS (Cross-Site Scripting)", "CSRF", "Injection SQL", "Broken Access Control"],
    correct: 2,
    explanation:
      "L'injection SQL survient quand les entrées utilisateur sont directement interpolées dans une requête SQL. La solution est d'utiliser des requêtes préparées avec PDO.",
  },
  {
    id: "q2",
    question:
      "Quelle fonction PHP est recommandée pour hacher un mot de passe de façon sécurisée en 2024 ?",
    choices: ["md5()", "sha256()", "crypt()", "password_hash() avec PASSWORD_ARGON2ID"],
    correct: 3,
    explanation:
      "password_hash() avec PASSWORD_ARGON2ID est l'algorithme recommandé. MD5 et SHA1 sont obsolètes et crackables via des rainbow tables.",
  },
  {
    id: "q3",
    question:
      "Le RGPD impose de notifier une violation de données personnelles à la CNIL dans quel délai ?",
    choices: ["24 heures", "48 heures", "72 heures", "1 semaine"],
    correct: 2,
    explanation:
      "L'article 33 du RGPD impose une notification à l'autorité de contrôle (CNIL en France) dans les 72 heures suivant la prise de connaissance d'une violation.",
  },
  {
    id: "q4",
    question:
      "Un attaquant forge une requête HTTP depuis un site malveillant en exploitant la session active d'un utilisateur. Il s'agit de :",
    choices: ["Injection SQL", "XSS Reflected", "CSRF (Cross-Site Request Forgery)", "IDOR"],
    correct: 2,
    explanation:
      "Le CSRF exploite la confiance qu'a l'application envers le navigateur de l'utilisateur connecté. La contre-mesure principale est le jeton CSRF (Synchronizer Token Pattern).",
  },
  {
    id: "q5",
    question:
      "L'en-tête HTTP 'Strict-Transport-Security' permet de :",
    choices: [
      "Empêcher le clickjacking",
      "Forcer l'utilisation de HTTPS",
      "Bloquer les scripts inline",
      "Masquer la version du serveur",
    ],
    correct: 1,
    explanation:
      "HSTS (HTTP Strict Transport Security) indique au navigateur de toujours utiliser HTTPS pour ce domaine, même si l'utilisateur tape http://",
  },
  {
    id: "q6",
    question: "Le principe 'Privacy by Design' signifie :",
    choices: [
      "Chiffrer toutes les données de l'application",
      "Intégrer la protection des données dès la conception",
      "Demander le consentement à chaque connexion",
      "Anonymiser toutes les données utilisateur",
    ],
    correct: 1,
    explanation:
      "Privacy by Design (Art. 25 RGPD) impose d'intégrer la protection des données personnelles dès la phase de conception, et non après coup.",
  },
  {
    id: "q7",
    question: "L'IDOR (Insecure Direct Object Reference) est un exemple de :",
    choices: [
      "Injection SQL",
      "XSS Stored",
      "Broken Access Control",
      "CSRF",
    ],
    correct: 2,
    explanation:
      "L'IDOR est une faille de contrôle d'accès (OWASP #1) où un attaquant peut accéder à des ressources d'autres utilisateurs en modifiant un identifiant dans l'URL.",
  },
];
