import type { QuizQuestion } from "@/lib/quiz-data";

export const anglaisVocabulaireQuiz: QuizQuestion[] = [
  {
    id: "anglais-vocabulaire-q1",
    question: "En réseau, que signifie le terme anglais \"throughput\" ?",
    choices: [
      "Le débit réel observé sur une liaison",
      "Le temps de réponse d'un serveur",
      "Le nombre maximal d'utilisateurs",
      "Le protocole utilisé pour chiffrer les données",
    ],
    correct: 0,
    explanation:
      "Throughput désigne le débit réel effectivement mesuré. Il est souvent inférieur à la bandwidth, qui correspond au débit théorique maximal.",
  },
  {
    id: "anglais-vocabulaire-q2",
    question: "Comment traduit-on \"pare-feu\" en anglais technique ?",
    choices: ["Router", "Firewall", "Switch", "Gateway"],
    correct: 1,
    explanation:
      "Firewall est la traduction correcte de pare-feu. Un firewall filtre les flux réseau selon des règles de sécurité définies.",
  },
  {
    id: "anglais-vocabulaire-q3",
    question: "Dans un projet de développement, qu'est-ce qu'un \"repository\" ?",
    choices: [
      "Un serveur DNS secondaire",
      "Un journal d'incidents",
      "Un espace qui stocke le code source et son historique",
      "Une documentation utilisateur finale",
    ],
    correct: 2,
    explanation:
      "Un repository est un dépôt de code, par exemple sur GitHub ou GitLab, qui contient les fichiers du projet et l'historique des versions.",
  },
  {
    id: "anglais-vocabulaire-q4",
    question: "En cybersécurité, que désigne une \"vulnerability\" ?",
    choices: [
      "Un mot de passe temporaire",
      "Une faille exploitable dans un système",
      "Une sauvegarde chiffrée",
      "Un audit de conformité",
    ],
    correct: 1,
    explanation:
      "Une vulnerability est une faiblesse technique ou organisationnelle pouvant être exploitée pour compromettre un système ou des données.",
  },
  {
    id: "anglais-vocabulaire-q5",
    question: "Que signifie le terme \"bottleneck\" dans un contexte informatique ?",
    choices: [
      "Un goulet d'étranglement qui limite les performances",
      "Un logiciel de sauvegarde automatique",
      "Un protocole de routage dynamique",
      "Une méthode de chiffrement asymétrique",
    ],
    correct: 0,
    explanation:
      "Un bottleneck est l'élément le plus lent d'une chaîne de traitement : CPU, disque, réseau ou base de données, qui réduit les performances globales.",
  },
  {
    id: "anglais-vocabulaire-q6",
    question: "Dans le cloud, à quoi sert un \"load balancer\" ?",
    choices: [
      "À compresser les fichiers avant déploiement",
      "À surveiller la température des serveurs",
      "À répartir la charge entre plusieurs serveurs",
      "À chiffrer les connexions utilisateur",
    ],
    correct: 2,
    explanation:
      "Un load balancer distribue les requêtes sur plusieurs instances pour améliorer la disponibilité, la scalabilité et la tolérance aux pannes.",
  },
];

export const anglaisComprehensionQuiz: QuizQuestion[] = [
  {
    id: "anglais-comprehension-q1",
    question:
      "Lisez cet extrait : \"The deployment has been postponed because the staging environment is unstable. Please fix the database timeout before EOD.\" Que doit-on comprendre ?",
    choices: [
      "Le déploiement en production est terminé",
      "Le déploiement est reporté tant que le problème de timeout n'est pas résolu",
      "Le staging doit être supprimé avant demain",
      "La base de données doit être remplacée complètement",
    ],
    correct: 1,
    explanation:
      "Postponed signifie reporté, unstable indique un environnement instable, et before EOD signifie avant la fin de journée.",
  },
  {
    id: "anglais-comprehension-q2",
    question:
      "Email : \"FYI, the client approved the proof of concept, but they expect a cost estimate by Friday.\" Quel est le message principal ?",
    choices: [
      "Le client refuse le POC",
      "Le client demande uniquement une démonstration orale",
      "Le client a validé le POC et attend un chiffrage avant vendredi",
      "Le client reporte la réunion à vendredi",
    ],
    correct: 2,
    explanation:
      "FYI signifie pour information. Approved the proof of concept indique une validation, et cost estimate by Friday signifie un devis ou chiffrage attendu avant vendredi.",
  },
  {
    id: "anglais-comprehension-q3",
    question:
      "Documentation : \"In the event of a breach, all credentials must be rotated immediately and the incident must be escalated to the security team.\" Que signifie \"credentials must be rotated\" ?",
    choices: [
      "Les mots de passe et secrets doivent être renouvelés",
      "Les comptes doivent être supprimés",
      "Les identifiants doivent être imprimés",
      "Les accès doivent être transférés au client",
    ],
    correct: 0,
    explanation:
      "Rotate credentials signifie changer rapidement les mots de passe, clés API ou secrets afin de limiter l'impact d'une compromission.",
  },
  {
    id: "anglais-comprehension-q4",
    question:
      "Message Teams : \"The issue is not critical; however, it impacts reporting accuracy.\" Quel rôle joue \"however\" ici ?",
    choices: [
      "Il exprime une conséquence",
      "Il ajoute un exemple",
      "Il marque une opposition ou une nuance",
      "Il indique une cause technique",
    ],
    correct: 2,
    explanation:
      "However sert à introduire une opposition : le problème n'est pas critique, mais il a tout de même un impact sur la fiabilité des rapports.",
  },
  {
    id: "anglais-comprehension-q5",
    question:
      "Texte : \"The library used by the application is deprecated.\" Quel est le bon sens de \"library\" dans ce contexte ?",
    choices: [
      "Une librairie au sens de magasin de livres",
      "Une bibliothèque logicielle réutilisable",
      "Un dossier de sauvegarde réseau",
      "Une base de données documentaire",
    ],
    correct: 1,
    explanation:
      "En informatique, library signifie bibliothèque logicielle. C'est un faux ami fréquent en anglais technique.",
  },
  {
    id: "anglais-comprehension-q6",
    question:
      "Extrait : \"We eventually migrated the API to a containerized environment.\" Comment faut-il comprendre \"eventually\" ?",
    choices: [
      "Éventuellement, si on a le temps",
      "Au hasard, sans planification",
      "Finalement, après un certain temps",
      "Immédiatement après la réunion",
    ],
    correct: 2,
    explanation:
      "Eventually est un faux ami : il signifie finalement, à la fin du processus, et non pas éventuellement.",
  },
];

export const anglaisExpressionQuiz: QuizQuestion[] = [
  {
    id: "anglais-expression-q1",
    question: "Quelle formule est adaptée pour commencer un email professionnel en anglais ?",
    choices: [
      "Hey buddy,",
      "Dear Sir or Madam,",
      "Yo team,",
      "What's up everyone,",
    ],
    correct: 1,
    explanation:
      "Dear Sir or Madam est une formule formelle adaptée quand on ne connaît pas précisément le destinataire. Dear Ms Smith convient si le nom est connu.",
  },
  {
    id: "anglais-expression-q2",
    question: "Dans un contexte professionnel, que signifie l'acronyme \"ASAP\" ?",
    choices: [
      "As Soon As Possible",
      "As Safe As Planned",
      "At Some App Point",
      "As Standard As Possible",
    ],
    correct: 0,
    explanation:
      "ASAP signifie As Soon As Possible, soit dès que possible. Il faut cependant l'utiliser avec tact dans les échanges professionnels.",
  },
  {
    id: "anglais-expression-q3",
    question: "Comment traduire correctement \"mettre à jour l'application\" ?",
    choices: [
      "Refresh the application",
      "Update the application",
      "Upload the application",
      "Actualize the application",
    ],
    correct: 1,
    explanation:
      "Update the application est la formule correcte. Actualize est un faux ami et ne convient pas ici.",
  },
  {
    id: "anglais-expression-q4",
    question: "Quelle phrase convient pour demander une précision lors d'une réunion ?",
    choices: [
      "Could you please clarify this point?",
      "Repeat faster, please.",
      "I don't understand anything.",
      "Explain that now.",
    ],
    correct: 0,
    explanation:
      "Could you please clarify this point? est poli, professionnel et adapté à une situation orale ou écrite.",
  },
  {
    id: "anglais-expression-q5",
    question: "Pour conclure une présentation, quelle expression est la plus appropriée ?",
    choices: [
      "Whatever, that's all.",
      "To summarize, our solution improves security and uptime.",
      "I am done, bye.",
      "No more slides, thanks.",
    ],
    correct: 1,
    explanation:
      "To summarize permet d'introduire une conclusion claire et structurée dans une présentation technique ou un oral d'examen.",
  },
  {
    id: "anglais-expression-q6",
    question: "Quelle formule est adaptée pour terminer un email de manière professionnelle ?",
    choices: [
      "See ya",
      "Cheers bro",
      "Looking forward to hearing from you.",
      "Talk later maybe",
    ],
    correct: 2,
    explanation:
      "Looking forward to hearing from you est une formule professionnelle courante. Elle peut être suivie de Best regards ou Kind regards.",
  },
];
