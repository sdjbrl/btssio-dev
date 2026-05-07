import type { QuizQuestion } from "@/lib/quiz-data";

export const cejmMarcheQuiz: QuizQuestion[] = [
  {
    id: "cejm-marche-q1",
    question: "Sur un marché concurrentiel, une hausse de la demande entraîne généralement :",
    choices: [
      "Une baisse automatique des prix",
      "Une hausse des prix si l'offre reste inchangée",
      "La disparition des concurrents",
      "Une suppression du besoin marketing",
    ],
    correct: 1,
    explanation:
      "Quand la demande augmente alors que l'offre reste stable, la tension sur le marché peut faire monter les prix jusqu'à un nouvel équilibre.",
  },
  {
    id: "cejm-marche-q2",
    question: "Un marché dominé par quelques grands producteurs est appelé :",
    choices: ["Monopole", "Concurrence pure et parfaite", "Oligopole", "Monopsone"],
    correct: 2,
    explanation:
      "L'oligopole désigne une structure de marché où un petit nombre d'entreprises détiennent l'essentiel de l'offre et influencent fortement la concurrence.",
  },
  {
    id: "cejm-marche-q3",
    question: "Dans le marketing mix, le \"prix\" correspond à l'un des :",
    choices: ["2A", "3C", "4P", "5M"],
    correct: 2,
    explanation:
      "Le marketing mix repose classiquement sur les 4P : Product, Price, Place, Promotion.",
  },
  {
    id: "cejm-marche-q4",
    question: "Le positionnement d'une entreprise consiste principalement à :",
    choices: [
      "Fixer le salaire des commerciaux",
      "Choisir la place voulue dans l'esprit du client",
      "Déterminer le siège social",
      "Supprimer toute concurrence",
    ],
    correct: 1,
    explanation:
      "Le positionnement vise à construire une image claire et différenciante de l'offre dans l'esprit de la cible.",
  },
  {
    id: "cejm-marche-q5",
    question: "Une plateforme numérique crée souvent de la valeur grâce à :",
    choices: [
      "La disparition des données",
      "La mise en relation de plusieurs catégories d'utilisateurs",
      "L'absence totale d'intermédiaires",
      "La suppression des coûts fixes",
    ],
    correct: 1,
    explanation:
      "Les plateformes numériques organisent des marchés multifaces en connectant vendeurs, acheteurs, annonceurs ou prestataires, avec des effets de réseau.",
  },
  {
    id: "cejm-marche-q6",
    question: "Dans l'économie numérique, les données personnelles peuvent être considérées comme :",
    choices: [
      "Un actif économique stratégique sous conditions juridiques",
      "Un bien libre sans valeur",
      "Une monnaie officielle",
      "Un document comptable obligatoire",
    ],
    correct: 0,
    explanation:
      "Les données ont une forte valeur économique pour personnaliser les services, piloter le marketing ou entraîner des modèles, mais leur usage est encadré juridiquement.",
  },
];

export const cejmDroitQuiz: QuizQuestion[] = [
  {
    id: "cejm-droit-q1",
    question: "Pour qu'un contrat soit valablement formé, il faut notamment :",
    choices: [
      "Un accord des volontés libre et éclairé",
      "Un paiement immédiat obligatoire",
      "Un écrit dans tous les cas",
      "Une validation par un juge",
    ],
    correct: 0,
    explanation:
      "Le contrat suppose un consentement valable, la capacité des parties et un contenu licite et certain. Un écrit n'est pas toujours obligatoire.",
  },
  {
    id: "cejm-droit-q2",
    question: "La responsabilité contractuelle est engagée lorsqu'une partie :",
    choices: [
      "Cause un dommage sans aucun contrat",
      "N'exécute pas correctement son obligation contractuelle",
      "Dépose une marque à l'INPI",
      "Refuse une publicité en ligne",
    ],
    correct: 1,
    explanation:
      "La responsabilité contractuelle sanctionne l'inexécution, le retard ou la mauvaise exécution d'une obligation prévue par un contrat.",
  },
  {
    id: "cejm-droit-q3",
    question: "Le RGPD repose notamment sur quel principe ?",
    choices: [
      "Collecter toutes les données possibles par précaution",
      "Limiter les données à ce qui est nécessaire",
      "Conserver les données sans durée maximale",
      "Exclure le droit d'accès des personnes",
    ],
    correct: 1,
    explanation:
      "Le principe de minimisation impose de ne collecter que les données pertinentes et nécessaires au regard de la finalité poursuivie.",
  },
  {
    id: "cejm-droit-q4",
    question: "Le droit d'auteur protège principalement :",
    choices: [
      "Une idée seule",
      "Une œuvre de l'esprit originale",
      "Uniquement les logiciels propriétaires étrangers",
      "Les données brutes non structurées",
    ],
    correct: 1,
    explanation:
      "Le droit d'auteur protège l'expression originale d'une œuvre de l'esprit, y compris un logiciel, et non l'idée abstraite en elle-même.",
  },
  {
    id: "cejm-droit-q5",
    question: "Un hébergeur voit sa responsabilité engagée s'il :",
    choices: [
      "Ignore un contenu manifestement illicite après notification",
      "Fournit un espace de stockage",
      "Utilise un serveur en France",
      "Signe un contrat d'hébergement",
    ],
    correct: 0,
    explanation:
      "Le régime de responsabilité de l'hébergeur impose d'agir promptement pour retirer ou rendre inaccessible un contenu manifestement illicite signalé.",
  },
  {
    id: "cejm-droit-q6",
    question: "En droit du travail, le contrat à durée indéterminée (CDI) est :",
    choices: [
      "Le contrat de travail de droit commun",
      "Interdit pour les PME",
      "Réservé aux cadres",
      "Toujours limité à 18 mois",
    ],
    correct: 0,
    explanation:
      "Le CDI constitue la forme normale et générale de la relation de travail. Le CDD reste encadré et limité à des cas précis.",
  },
];

export const cejmManagementQuiz: QuizQuestion[] = [
  {
    id: "cejm-management-q1",
    question: "Un style de direction participatif consiste à :",
    choices: [
      "Décider seul sans consulter",
      "Associer les collaborateurs à la prise de décision",
      "Supprimer toute hiérarchie",
      "Déléguer sans contrôle ni objectif",
    ],
    correct: 1,
    explanation:
      "Le management participatif implique davantage les salariés dans la réflexion et certaines décisions afin de favoriser l'adhésion et la motivation.",
  },
  {
    id: "cejm-management-q2",
    question: "Taylor est principalement associé à :",
    choices: [
      "L'école des relations humaines",
      "L'organisation scientifique du travail",
      "La pyramide des besoins",
      "La théorie des parties prenantes",
    ],
    correct: 1,
    explanation:
      "Frederick Taylor a développé l'OST, centrée sur la division du travail, la standardisation et la recherche d'efficacité productive.",
  },
  {
    id: "cejm-management-q3",
    question: "Une structure fonctionnelle regroupe les salariés :",
    choices: [
      "Par zone géographique uniquement",
      "Par projet temporaire",
      "Par grandes fonctions de l'entreprise",
      "Par ancienneté",
    ],
    correct: 2,
    explanation:
      "La structure fonctionnelle organise l'entreprise autour de fonctions spécialisées : production, RH, finance, marketing, etc.",
  },
  {
    id: "cejm-management-q4",
    question: "La conduite du changement vise surtout à :",
    choices: [
      "Imposer un nouvel outil sans accompagnement",
      "Accompagner les acteurs dans l'évolution de l'organisation",
      "Éviter toute transformation",
      "Remplacer automatiquement les managers",
    ],
    correct: 1,
    explanation:
      "La conduite du changement prépare, explique et accompagne la transformation pour limiter les résistances et sécuriser l'appropriation.",
  },
  {
    id: "cejm-management-q5",
    question: "La culture d'entreprise correspond :",
    choices: [
      "Aux seules procédures comptables",
      "Aux valeurs, normes et pratiques partagées",
      "Au chiffre d'affaires annuel",
      "À l'organigramme juridique",
    ],
    correct: 1,
    explanation:
      "La culture d'entreprise rassemble les valeurs, rituels, symboles et comportements qui structurent l'identité collective.",
  },
  {
    id: "cejm-management-q6",
    question: "La RSE désigne :",
    choices: [
      "La responsabilité sociétale de l'entreprise",
      "Le règlement standard européen",
      "La rentabilité structurelle de l'exploitation",
      "Le réseau social de l'entreprise",
    ],
    correct: 0,
    explanation:
      "La RSE intègre les dimensions sociales, environnementales et éthiques dans la stratégie et les décisions de l'entreprise.",
  },
];

export const cejmRhQuiz: QuizQuestion[] = [
  {
    id: "cejm-rh-q1",
    question: "Le recrutement commence généralement par :",
    choices: [
      "La signature du contrat",
      "L'analyse du besoin en compétences",
      "La période d'essai",
      "La négociation collective",
    ],
    correct: 1,
    explanation:
      "Avant de diffuser une offre, l'entreprise doit définir le poste, les missions et les compétences attendues.",
  },
  {
    id: "cejm-rh-q2",
    question: "La GPEC a pour objectif principal de :",
    choices: [
      "Gérer uniquement les congés payés",
      "Anticiper l'évolution des emplois et des compétences",
      "Fixer les prix de vente",
      "Remplacer le dialogue social",
    ],
    correct: 1,
    explanation:
      "La gestion prévisionnelle des emplois et des compétences aide l'entreprise à anticiper ses besoins futurs et à adapter ses ressources humaines.",
  },
  {
    id: "cejm-rh-q3",
    question: "Le contrat d'apprentissage est un contrat :",
    choices: [
      "Réservé aux salariés déjà en CDI",
      "Qui alterne formation et travail en entreprise",
      "Sans aucune rémunération",
      "Interdit dans le secteur numérique",
    ],
    correct: 1,
    explanation:
      "L'alternance articule périodes de formation et activité en entreprise afin de développer des compétences professionnelles certifiantes.",
  },
  {
    id: "cejm-rh-q4",
    question: "La rémunération globale d'un salarié peut inclure :",
    choices: [
      "Uniquement le salaire de base",
      "Le fixe, le variable et les avantages sociaux",
      "Seulement les primes collectives",
      "Exclusivement les titres-restaurant",
    ],
    correct: 1,
    explanation:
      "La rémunération se compose souvent d'un fixe, d'éléments variables et d'avantages en nature ou sociaux.",
  },
  {
    id: "cejm-rh-q5",
    question: "La négociation collective se déroule notamment entre :",
    choices: [
      "Les clients et les fournisseurs",
      "L'employeur et les représentants des salariés",
      "Le juge et le DRH",
      "Les actionnaires et les consommateurs",
    ],
    correct: 1,
    explanation:
      "La négociation collective permet de définir des règles applicables dans l'entreprise ou la branche avec les représentants des salariés.",
  },
  {
    id: "cejm-rh-q6",
    question: "Un licenciement pour motif personnel doit notamment reposer sur :",
    choices: [
      "Une cause réelle et sérieuse",
      "Un simple désaccord oral",
      "Une baisse du marché boursier",
      "L'ancienneté du salarié uniquement",
    ],
    correct: 0,
    explanation:
      "Le licenciement doit être justifié par une cause réelle et sérieuse et respecter une procédure précise pour être valable.",
  },
];

export const cejmFinanceQuiz: QuizQuestion[] = [
  {
    id: "cejm-finance-q1",
    question: "Dans le bilan, l'actif représente :",
    choices: [
      "Les ressources stables uniquement",
      "Ce que possède l'entreprise",
      "Les dettes fiscales seulement",
      "Le résultat net de l'exercice",
    ],
    correct: 1,
    explanation:
      "L'actif recense les emplois : immobilisations, stocks, créances, disponibilités. Le passif recense les ressources.",
  },
  {
    id: "cejm-finance-q2",
    question: "Le compte de résultat permet de mesurer :",
    choices: [
      "La performance sur une période",
      "La valeur du patrimoine à une date",
      "Le nombre d'actionnaires",
      "La quantité de trésorerie en caisse uniquement",
    ],
    correct: 0,
    explanation:
      "Le compte de résultat compare les produits et les charges sur l'exercice pour déterminer le résultat bénéficiaire ou déficitaire.",
  },
  {
    id: "cejm-finance-q3",
    question: "L'EBE fait partie des :",
    choices: ["SIG", "VLAN", "KPI RH", "Titres financiers"],
    correct: 0,
    explanation:
      "L'excédent brut d'exploitation est un solde intermédiaire de gestion utilisé pour analyser la performance d'exploitation.",
  },
  {
    id: "cejm-finance-q4",
    question: "Un ratio de liquidité sert principalement à évaluer :",
    choices: [
      "La capacité de l'entreprise à faire face à ses dettes à court terme",
      "Le nombre de salariés formés",
      "La notoriété de la marque",
      "La part de marché numérique",
    ],
    correct: 0,
    explanation:
      "Les ratios de liquidité mesurent l'aptitude de l'entreprise à honorer ses échéances de court terme avec ses actifs disponibles ou rapidement mobilisables.",
  },
  {
    id: "cejm-finance-q5",
    question: "La VAN d'un investissement est jugée favorable lorsqu'elle est :",
    choices: ["Négative", "Nulle par principe", "Positive", "Toujours égale au TIR"],
    correct: 2,
    explanation:
      "Une valeur actuelle nette positive signifie que le projet crée de la valeur au-delà du coût du capital retenu.",
  },
  {
    id: "cejm-finance-q6",
    question: "L'autofinancement correspond à :",
    choices: [
      "Un financement interne généré par l'activité",
      "Un emprunt obligatoirement bancaire",
      "Une subvention publique automatique",
      "Une hausse du capital imposée par la loi",
    ],
    correct: 0,
    explanation:
      "L'autofinancement provient des ressources internes dégagées par l'entreprise, notamment sa capacité d'autofinancement.",
  },
];
