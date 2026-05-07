import type { QuizQuestion } from "@/lib/quiz-data";

export const cgeMethodologieQuiz: QuizQuestion[] = [
  {
    id: "cge-methodologie-1",
    question: "Dans un résumé, quelle règle est indispensable ?",
    choices: [
      "Ajouter son avis pour nuancer le texte",
      "Conserver exactement les phrases de l'auteur",
      "Reformuler fidèlement sans commenter",
      "Supprimer l'idée principale pour gagner du temps",
    ],
    correct: 2,
    explanation:
      "Le résumé doit restituer fidèlement la pensée de l'auteur en reformulant. On évite les citations longues, les commentaires personnels et les ajouts d'idées.",
  },
  {
    id: "cge-methodologie-2",
    question: "La synthèse de documents demande avant tout de :",
    choices: [
      "Comparer et organiser les idées de plusieurs documents",
      "Donner son opinion personnelle dès l'introduction",
      "Recopier les documents dans l'ordre du dossier",
      "Résumer uniquement le document le plus long",
    ],
    correct: 0,
    explanation:
      "La synthèse croise plusieurs documents. Il faut regrouper les idées, repérer convergences et oppositions, puis construire un plan clair et neutre.",
  },
  {
    id: "cge-methodologie-3",
    question: "Dans un plan dialectique, l'enchaînement attendu est :",
    choices: [
      "Introduction, exemple, citation, conclusion",
      "Thèse, antithèse, synthèse ou dépassement",
      "Constat, résumé, opinion personnelle",
      "Description, narration, injonction",
    ],
    correct: 1,
    explanation:
      "Le plan dialectique confronte d'abord une thèse, puis son contraire, avant d'aboutir à une synthèse ou à un dépassement argumenté.",
  },
  {
    id: "cge-methodologie-4",
    question: "Quelle différence principale existe entre plan thématique et plan dialectique ?",
    choices: [
      "Le plan thématique classe des aspects d'un sujet, le plan dialectique oppose des points de vue",
      "Le plan thématique est réservé au résumé, le dialectique à la dictée",
      "Le plan dialectique ne comporte jamais de conclusion",
      "Le plan thématique interdit les exemples",
    ],
    correct: 0,
    explanation:
      "Le plan thématique organise des axes complémentaires (social, économique, culturel...). Le plan dialectique, lui, confronte des positions opposées.",
  },
  {
    id: "cge-methodologie-5",
    question: "Dans un paragraphe argumentatif efficace, on attend généralement :",
    choices: [
      "Une idée, un argument, un exemple, puis une mini-conclusion",
      "Trois citations et aucun lien logique",
      "Une opinion sans justification",
      "Une question rhétorique uniquement",
    ],
    correct: 0,
    explanation:
      "Le schéma PREP (Point, Raison, Exemple, Point) aide à construire un paragraphe clair, démonstratif et facile à suivre pour le correcteur.",
  },
  {
    id: "cge-methodologie-6",
    question: "Que doit faire une bonne introduction en CGE ?",
    choices: [
      "Annoncer le sujet, le problématiser et présenter le plan",
      "Donner directement la conclusion finale",
      "Empiler des citations sans explication",
      "Raconter une anecdote sans lien avec le sujet",
    ],
    correct: 0,
    explanation:
      "L'introduction sert à cadrer le sujet : accroche éventuelle, définition ou contextualisation, problématique, puis annonce du plan suivi dans le développement.",
  },
];

export const cgeExpressionEcriteQuiz: QuizQuestion[] = [
  {
    id: "cge-expression-1",
    question: "Quel registre de langue convient le mieux à une copie d'examen BTS ?",
    choices: ["Familier", "Courant ou soutenu selon le contexte", "Argotique", "Oral relâché"],
    correct: 1,
    explanation:
      "En examen, on privilégie une langue correcte, précise et soignée. Le registre familier ou argotique nuit à la crédibilité de l'argumentation.",
  },
  {
    id: "cge-expression-2",
    question: "Un texte argumentatif a pour objectif principal de :",
    choices: [
      "Raconter une histoire imaginaire",
      "Décrire un lieu avec précision",
      "Convaincre ou persuader le lecteur",
      "Donner un ordre sans justification",
    ],
    correct: 2,
    explanation:
      "Le texte argumentatif défend une idée à l'aide d'arguments, d'exemples et de connecteurs logiques pour convaincre ou persuader.",
  },
  {
    id: "cge-expression-3",
    question: "Quelle figure de style repose sur la répétition d'un même mot ou groupe de mots en début de phrase ?",
    choices: ["La métaphore", "L'anaphore", "L'oxymore", "L'hyperbole"],
    correct: 1,
    explanation:
      "L'anaphore répète un mot ou une structure en tête de phrase ou de proposition. Elle crée un effet d'insistance et de rythme.",
  },
  {
    id: "cge-expression-4",
    question: "Quel connecteur exprime une opposition ?",
    choices: ["En effet", "Par conséquent", "Cependant", "Par exemple"],
    correct: 2,
    explanation:
      "Le connecteur \"cependant\" sert à marquer l'opposition ou la concession. \"En effet\" introduit une explication, tandis que \"par conséquent\" annonce une conséquence.",
  },
  {
    id: "cge-expression-5",
    question: "Paraphraser une idée consiste à :",
    choices: [
      "Recopier mot pour mot la phrase d'origine",
      "Reformuler le contenu avec ses propres mots en gardant le sens",
      "Inventer un exemple sans rapport",
      "Supprimer les nuances importantes",
    ],
    correct: 1,
    explanation:
      "La paraphrase reformule fidèlement une idée. Elle permet d'intégrer une source sans citation intégrale, tout en respectant son sens.",
  },
  {
    id: "cge-expression-6",
    question: "La cohérence textuelle dépend surtout de :",
    choices: [
      "L'enchaînement logique des idées et des connecteurs adaptés",
      "La longueur des phrases uniquement",
      "Le nombre de citations présentes",
      "L'utilisation systématique du point d'exclamation",
    ],
    correct: 0,
    explanation:
      "Un texte cohérent progresse clairement : chaque idée suit la précédente, les connecteurs guident la lecture et les paragraphes servent l'argumentation.",
  },
];

export const cgeCultureNumeriqueQuiz: QuizQuestion[] = [
  {
    id: "cge-numerique-1",
    question: "La fracture numérique désigne principalement :",
    choices: [
      "Une panne générale d'Internet",
      "Les inégalités d'accès et d'usage du numérique",
      "La séparation entre matériel et logiciel",
      "Le coût de fabrication des smartphones",
    ],
    correct: 1,
    explanation:
      "La fracture numérique concerne les écarts d'équipement, de connexion et de compétences numériques entre individus, territoires ou générations.",
  },
  {
    id: "cge-numerique-2",
    question: "Le RGPD protège en priorité :",
    choices: [
      "Les mots-clés des moteurs de recherche",
      "Les données personnelles des individus",
      "Les brevets industriels uniquement",
      "Les serveurs physiques des entreprises",
    ],
    correct: 1,
    explanation:
      "Le RGPD encadre la collecte et le traitement des données personnelles : identité, email, IP, géolocalisation, historique de navigation, etc.",
  },
  {
    id: "cge-numerique-3",
    question: "Face à une fake news, le bon réflexe est de :",
    choices: [
      "La partager rapidement pour prévenir les autres",
      "Vérifier la source, la date et croiser l'information",
      "Se fier uniquement au nombre de vues",
      "Regarder si l'image paraît convaincante",
    ],
    correct: 1,
    explanation:
      "Le fact-checking repose sur plusieurs vérifications : auteur identifiable, média fiable, date, contexte, recoupement avec d'autres sources.",
  },
  {
    id: "cge-numerique-4",
    question: "Le cyberharcèlement se caractérise par :",
    choices: [
      "Un désaccord ponctuel sur un forum",
      "Des messages répétés ou humiliants via des outils numériques",
      "Une publicité ciblée sur les réseaux sociaux",
      "Le blocage d'un compte spam",
    ],
    correct: 1,
    explanation:
      "Le cyberharcèlement implique la répétition, la violence symbolique ou psychologique et l'usage d'outils numériques : réseaux, messageries, jeux en ligne.",
  },
  {
    id: "cge-numerique-5",
    question: "Dans le débat sur l'intelligence artificielle, un enjeu éthique majeur est :",
    choices: [
      "Augmenter le nombre d'écrans disponibles",
      "Éviter les biais et garantir la transparence des usages",
      "Supprimer toute intervention humaine en entreprise",
      "Rendre tous les algorithmes propriétaires",
    ],
    correct: 1,
    explanation:
      "Une IA peut reproduire des biais présents dans les données. Les questions de transparence, responsabilité et explicabilité sont donc centrales.",
  },
  {
    id: "cge-numerique-6",
    question: "L'identité numérique d'une personne correspond à :",
    choices: [
      "Son mot de passe principal",
      "L'ensemble des traces, contenus et profils associés à sa présence en ligne",
      "Son équipement informatique personnel",
      "Son abonnement Internet",
    ],
    correct: 1,
    explanation:
      "L'identité numérique regroupe les informations publiées volontairement ou laissées involontairement : profils, commentaires, photos, historiques, mentions.",
  },
];
