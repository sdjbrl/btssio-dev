import type { QuizQuestion } from "@/lib/quiz-data";

export const mathsExpertesArithmetiqueQuiz: QuizQuestion[] = [
  {
    id: "maths-expertes-arithmetique-1",
    question: "Quel est le PGCD de 252 et 198 ?",
    choices: ["18", "24", "36", "54"],
    correct: 0,
    explanation:
      "Avec l'algorithme d'Euclide : 252 = 198 × 1 + 54, 198 = 54 × 3 + 36, 54 = 36 × 1 + 18, 36 = 18 × 2 + 0. Le dernier reste non nul est 18.",
  },
  {
    id: "maths-expertes-arithmetique-2",
    question: "Quel est le PPCM de 18 et 30 ?",
    choices: ["60", "72", "90", "180"],
    correct: 2,
    explanation:
      "On utilise PGCD × PPCM = a × b. Comme PGCD(18,30) = 6, on obtient PPCM = (18 × 30) / 6 = 90.",
  },
  {
    id: "maths-expertes-arithmetique-3",
    question: "À quoi est congru 137 modulo 12 ?",
    choices: ["1", "3", "5", "11"],
    correct: 2,
    explanation:
      "137 = 12 × 11 + 5, donc 137 ≡ 5 (mod 12). On retient le reste de la division euclidienne.",
  },
  {
    id: "maths-expertes-arithmetique-4",
    question: "Quel est l'inverse de 3 modulo 7 ?",
    choices: ["2", "3", "5", "6"],
    correct: 2,
    explanation:
      "On cherche x tel que 3x ≡ 1 (mod 7). Or 3 × 5 = 15 et 15 ≡ 1 (mod 7), donc 5 est l'inverse de 3 modulo 7.",
  },
  {
    id: "maths-expertes-arithmetique-5",
    question: "D'après le petit théorème de Fermat, à quoi est égal 3^6 modulo 7 ?",
    choices: ["0", "1", "3", "6"],
    correct: 1,
    explanation:
      "Comme 7 est premier et 3 n'est pas multiple de 7, on a 3^(7-1) ≡ 1 (mod 7), donc 3^6 ≡ 1 (mod 7).",
  },
  {
    id: "maths-expertes-arithmetique-6",
    question: "En RSA simplifié, si φ(n) = 40 et e = 3, quelle valeur peut jouer le rôle de d ?",
    choices: ["9", "13", "27", "37"],
    correct: 2,
    explanation:
      "On cherche d tel que e × d ≡ 1 (mod 40). Avec 3 × 27 = 81 et 81 ≡ 1 (mod 40), on peut prendre d = 27.",
  },
];

export const mathsExpertesGraphesQuiz: QuizQuestion[] = [
  {
    id: "maths-expertes-graphes-1",
    question: "Quel algorithme est classiquement utilisé pour calculer un flot maximal dans un réseau ?",
    choices: ["Dijkstra", "Ford-Fulkerson", "Bellman-Ford", "Welsh-Powell"],
    correct: 1,
    explanation:
      "Ford-Fulkerson augmente progressivement le flux le long de chaînes améliorantes jusqu'à atteindre le flot maximal.",
  },
  {
    id: "maths-expertes-graphes-2",
    question: "Quel avantage Bellman-Ford possède-t-il par rapport à Dijkstra ?",
    choices: [
      "Il colorie les graphes planaires",
      "Il calcule un flot maximal",
      "Il gère les arcs de poids négatif",
      "Il fonctionne seulement sur les arbres",
    ],
    correct: 2,
    explanation:
      "Bellman-Ford supporte des poids négatifs et peut même détecter des cycles absorbants, contrairement à Dijkstra.",
  },
  {
    id: "maths-expertes-graphes-3",
    question: "Dans une matrice de transition de chaîne de Markov, que vaut la somme des probabilités d'une ligne ?",
    choices: ["0", "1", "Le nombre d'états", "Elle varie librement"],
    correct: 1,
    explanation:
      "Chaque ligne décrit toutes les transitions possibles depuis un état : la somme des probabilités vaut donc 1.",
  },
  {
    id: "maths-expertes-graphes-4",
    question: "Pour un graphe planaire connexe, quelle relation d'Euler est correcte ?",
    choices: ["V + E + F = 2", "V − E + F = 2", "V − E − F = 2", "2V − E + F = 0"],
    correct: 1,
    explanation:
      "La formule d'Euler pour un graphe planaire connexe est V − E + F = 2, avec V sommets, E arêtes et F faces.",
  },
  {
    id: "maths-expertes-graphes-5",
    question: "Quel énoncé résume le théorème des 4 couleurs ?",
    choices: [
      "Tout graphe orienté a 4 sommets",
      "Tout graphe valué possède 4 chemins minimaux",
      "Toute carte planaire peut être coloriée avec au plus 4 couleurs",
      "Tout graphe simple admet exactement 4 composantes connexes",
    ],
    correct: 2,
    explanation:
      "Le théorème des 4 couleurs affirme qu'une carte planaire peut être coloriée avec au plus 4 couleurs sans voisins de même couleur.",
  },
  {
    id: "maths-expertes-graphes-6",
    question: "Pour une distribution stationnaire π d'une chaîne de Markov, quelle relation doit être vérifiée ?",
    choices: ["Pπ = 0", "πP = π", "π + P = I", "P² = P"],
    correct: 1,
    explanation:
      "Une distribution stationnaire reste inchangée après une transition : on écrit donc πP = π.",
  },
];

export const mathsExpertesProbaQuiz: QuizQuestion[] = [
  {
    id: "maths-expertes-proba-1",
    question: "Si X suit une loi de Poisson de paramètre λ = 3, quelle est la valeur de P(X = 0) ?",
    choices: ["e^(-3)", "3e^(-3)", "1 − e^(-3)", "3^0 + e^(-3)"],
    correct: 0,
    explanation:
      "Avec la formule P(X = k) = λ^k · e^(-λ) / k!, pour k = 0 on obtient P(X = 0) = 3^0 · e^(-3) / 0! = e^(-3).",
  },
  {
    id: "maths-expertes-proba-2",
    question: "Si T suit une loi exponentielle de paramètre λ = 0,5, quelle est son espérance ?",
    choices: ["0,5", "1", "2", "4"],
    correct: 2,
    explanation:
      "Pour une loi exponentielle de paramètre λ, l'espérance vaut 1/λ. Ici 1 / 0,5 = 2.",
  },
  {
    id: "maths-expertes-proba-3",
    question: "Pour X ~ N(50, 10²), quelle est la valeur standardisée associée à X = 70 ?",
    choices: ["1", "2", "3", "7"],
    correct: 1,
    explanation:
      "On applique Z = (X − μ) / σ = (70 − 50) / 10 = 2. La valeur est à deux écarts-types au-dessus de la moyenne.",
  },
  {
    id: "maths-expertes-proba-4",
    question: "Que dit le théorème central limite quand la taille d'échantillon devient grande ?",
    choices: [
      "La variance devient toujours nulle",
      "Toute variable suit exactement une loi uniforme",
      "La moyenne d'échantillon tend vers une loi approximativement normale",
      "Les observations deviennent indépendantes par définition",
    ],
    correct: 2,
    explanation:
      "Le TCL affirme que, sous des hypothèses classiques, la moyenne d'échantillon devient approximativement normale quand n est grand.",
  },
  {
    id: "maths-expertes-proba-5",
    question: "Un coefficient de Pearson r = -0,95 indique :",
    choices: [
      "Une absence de relation entre les variables",
      "Une forte corrélation linéaire négative",
      "Une corrélation positive parfaite",
      "Un test statistique non significatif",
    ],
    correct: 1,
    explanation:
      "Un coefficient proche de -1 traduit une forte relation linéaire décroissante : quand une variable augmente, l'autre a tendance à diminuer.",
  },
  {
    id: "maths-expertes-proba-6",
    question: "Si une p-value vaut 0,03 pour un test au seuil α = 0,05, quelle décision prend-on ?",
    choices: [
      "On conserve H0 car 0,03 > 0,05",
      "On rejette H0 car 0,03 < 0,05",
      "Le test est impossible à interpréter",
      "On conclut automatiquement à une causalité",
    ],
    correct: 1,
    explanation:
      "Comme la p-value est inférieure au seuil choisi, le résultat est jugé significatif et on rejette l'hypothèse nulle H0.",
  },
];
