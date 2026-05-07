import type { QuizQuestion } from "@/lib/quiz-data";

export const mathsAlgoQuiz: QuizQuestion[] = [
  {
    id: "maths-algo-1",
    question: "En algorithmique, à quoi sert principalement une variable ?",
    choices: [
      "À stocker une valeur qui peut évoluer pendant l'exécution",
      "À afficher automatiquement un résultat à l'écran",
      "À remplacer une boucle POUR",
      "À chiffrer des données",
    ],
    correct: 0,
    explanation:
      "Une variable permet de mémoriser une information (entier, chaîne, booléen, etc.) et de la modifier au cours de l'algorithme.",
  },
  {
    id: "maths-algo-2",
    question: "Quelle structure de contrôle utilise-t-on quand le nombre d'itérations est connu à l'avance ?",
    choices: ["SI ... ALORS", "POUR", "TANT QUE", "RÉPÉTER ... JUSQU'À"],
    correct: 1,
    explanation:
      "La boucle POUR est adaptée quand on connaît le nombre de passages, par exemple POUR i DE 1 À n.",
  },
  {
    id: "maths-algo-3",
    question: "Une fonction qui s'appelle elle-même met en œuvre quel concept ?",
    choices: ["L'héritage", "La récursivité", "Le polymorphisme", "La compilation"],
    correct: 1,
    explanation:
      "La récursivité consiste à définir une fonction à partir d'elle-même, avec un cas d'arrêt indispensable.",
  },
  {
    id: "maths-algo-4",
    question: "Que signifie qu'un algorithme a une complexité en O(n) ?",
    choices: [
      "Le temps d'exécution croît globalement proportionnellement à la taille n de l'entrée",
      "Le temps d'exécution est toujours constant",
      "L'algorithme est forcément récursif",
      "L'algorithme trie forcément un tableau",
    ],
    correct: 0,
    explanation:
      "Une complexité O(n) indique une croissance linéaire : si la taille des données double, le travail est approximativement multiplié par deux.",
  },
  {
    id: "maths-algo-5",
    question: "Parmi ces algorithmes, lequel a en moyenne une complexité en O(n log n) ?",
    choices: ["Tri à bulles", "Tri par insertion", "Tri rapide", "Recherche linéaire"],
    correct: 2,
    explanation:
      "Le tri rapide (quicksort) possède en moyenne une complexité en O(n log n), contrairement au tri à bulles ou au tri par insertion souvent en O(n²).",
  },
  {
    id: "maths-algo-6",
    question: "Quelle condition est nécessaire pour appliquer correctement une recherche dichotomique ?",
    choices: [
      "Le tableau doit être trié",
      "Le tableau doit contenir uniquement des entiers",
      "Le tableau doit avoir une taille paire",
      "Le tableau doit être parcouru avec une boucle POUR",
    ],
    correct: 0,
    explanation:
      "La recherche dichotomique repose sur la comparaison avec l'élément central et ne fonctionne correctement que si les données sont déjà triées.",
  },
];

export const mathsGraphesQuiz: QuizQuestion[] = [
  {
    id: "maths-graphes-1",
    question: "Dans un graphe, comment appelle-t-on généralement les éléments reliés entre eux ?",
    choices: ["Les matrices", "Les sommets", "Les pivots", "Les vecteurs"],
    correct: 1,
    explanation:
      "Un graphe est constitué de sommets (ou nœuds) reliés par des arêtes dans un graphe non orienté ou des arcs dans un graphe orienté.",
  },
  {
    id: "maths-graphes-2",
    question: "Dans un graphe orienté, quelle particularité possède une arête ?",
    choices: [
      "Elle relie toujours exactement trois sommets",
      "Elle possède un sens de parcours",
      "Elle a forcément un poids égal à 1",
      "Elle n'apparaît jamais dans une matrice d'adjacence",
    ],
    correct: 1,
    explanation:
      "Un graphe orienté utilise des arcs dirigés : aller de A vers B n'implique pas nécessairement pouvoir aller de B vers A.",
  },
  {
    id: "maths-graphes-3",
    question: "Quel parcours explore en priorité les sommets les plus proches d'un sommet de départ ?",
    choices: ["DFS", "BFS", "Kruskal", "Prim"],
    correct: 1,
    explanation:
      "Le BFS (Breadth-First Search), ou parcours en largeur, visite d'abord tous les voisins immédiats avant de descendre d'un niveau supplémentaire.",
  },
  {
    id: "maths-graphes-4",
    question: "Quel algorithme sert à déterminer un plus court chemin dans un graphe pondéré à poids positifs ?",
    choices: ["Dijkstra", "Bubble sort", "Gauss", "RSA"],
    correct: 0,
    explanation:
      "L'algorithme de Dijkstra calcule les distances minimales depuis une source dans un graphe pondéré dont les poids sont positifs.",
  },
  {
    id: "maths-graphes-5",
    question: "À quoi servent les algorithmes de Kruskal et de Prim ?",
    choices: [
      "À calculer un arbre couvrant minimal",
      "À parcourir un arbre binaire en profondeur",
      "À chiffrer une clé publique",
      "À inverser une matrice",
    ],
    correct: 0,
    explanation:
      "Kruskal et Prim construisent un arbre couvrant minimal, c'est-à-dire un ensemble d'arêtes reliant tous les sommets avec un coût total minimal.",
  },
  {
    id: "maths-graphes-6",
    question: "Dans un arbre binaire, combien de fils au maximum un nœud peut-il posséder ?",
    choices: ["1", "2", "3", "4"],
    correct: 1,
    explanation:
      "Par définition, un arbre binaire est une structure arborescente dans laquelle chaque nœud a au plus deux enfants : un fils gauche et un fils droit.",
  },
];

export const mathsMatricesQuiz: QuizQuestion[] = [
  {
    id: "maths-matrices-1",
    question: "Comment note-t-on généralement la matrice identité d'ordre n ?",
    choices: ["An", "In", "Mn", "Dn"],
    correct: 1,
    explanation:
      "La matrice identité se note souvent In. Elle possède des 1 sur la diagonale principale et des 0 ailleurs.",
  },
  {
    id: "maths-matrices-2",
    question: "Quel est le déterminant de la matrice [[a, b], [c, d]] ?",
    choices: ["ab - cd", "ad - bc", "ac - bd", "a + d - b - c"],
    correct: 1,
    explanation:
      "Pour une matrice 2x2, le déterminant se calcule par la formule ad - bc.",
  },
  {
    id: "maths-matrices-3",
    question: "Pour multiplier une matrice A de taille 2x3 par une matrice B, quelle condition doit être vérifiée ?",
    choices: [
      "B doit avoir 2 lignes",
      "B doit avoir 3 lignes",
      "B doit être carrée",
      "B doit avoir 3 colonnes",
    ],
    correct: 1,
    explanation:
      "Le produit A × B est défini lorsque le nombre de colonnes de A est égal au nombre de lignes de B.",
  },
  {
    id: "maths-matrices-4",
    question: "Que fait la transposée d'une matrice ?",
    choices: [
      "Elle inverse tous les coefficients",
      "Elle échange les lignes et les colonnes",
      "Elle remplace tous les coefficients par 0",
      "Elle calcule directement le déterminant",
    ],
    correct: 1,
    explanation:
      "La transposée Aᵀ s'obtient en transformant chaque ligne en colonne et chaque colonne en ligne.",
  },
  {
    id: "maths-matrices-5",
    question: "Quelle méthode est classiquement utilisée pour résoudre un système linéaire en BTS SIO ?",
    choices: ["Dijkstra", "Gauss", "César", "Prim"],
    correct: 1,
    explanation:
      "La méthode de Gauss consiste à transformer le système par opérations élémentaires pour obtenir une forme plus simple à résoudre.",
  },
  {
    id: "maths-matrices-6",
    question: "Une matrice carrée A est inversible si :",
    choices: [
      "son déterminant est nul",
      "son déterminant est non nul",
      "elle contient uniquement des entiers",
      "elle est forcément symétrique",
    ],
    correct: 1,
    explanation:
      "Une matrice carrée admet une inverse exactement lorsque son déterminant est différent de 0.",
  },
];

export const mathsCryptoQuiz: QuizQuestion[] = [
  {
    id: "maths-crypto-1",
    question: "AES appartient à quelle famille de chiffrement ?",
    choices: ["Chiffrement symétrique", "Chiffrement asymétrique", "Fonction de hachage", "Compression"],
    correct: 0,
    explanation:
      "AES utilise une même clé secrète pour chiffrer et déchiffrer : c'est donc un algorithme de chiffrement symétrique.",
  },
  {
    id: "maths-crypto-2",
    question: "Dans RSA, quelle paire de clés est utilisée ?",
    choices: [
      "Une clé de session et une clé de sauvegarde",
      "Une clé publique et une clé privée",
      "Deux clés publiques identiques",
      "Une seule clé secrète partagée",
    ],
    correct: 1,
    explanation:
      "RSA repose sur une clé publique diffusée librement et une clé privée conservée secrète par son propriétaire.",
  },
  {
    id: "maths-crypto-3",
    question: "Quelle affirmation décrit correctement une fonction de hachage ?",
    choices: [
      "Elle permet de retrouver facilement le message initial",
      "Elle produit une empreinte théoriquement non réversible",
      "Elle sert uniquement à chiffrer des vidéos",
      "Elle remplace toujours un certificat TLS",
    ],
    correct: 1,
    explanation:
      "Une fonction de hachage transforme une donnée en empreinte. On l'utilise pour l'intégrité ou les mots de passe, sans déchiffrement direct.",
  },
  {
    id: "maths-crypto-4",
    question: "Quel élément associe l'identité d'une entité à sa clé publique ?",
    choices: ["Une matrice d'adjacence", "Un certificat numérique", "Un pare-feu", "Une boucle WHILE"],
    correct: 1,
    explanation:
      "Un certificat numérique, souvent au format X.509, relie une identité à une clé publique et est signé par une autorité de certification.",
  },
  {
    id: "maths-crypto-5",
    question: "Le protocole TLS est principalement utilisé pour :",
    choices: [
      "Accélérer les requêtes SQL",
      "Sécuriser les échanges réseau, notamment HTTPS",
      "Compresser les fichiers volumineux",
      "Créer une adresse IP publique",
    ],
    correct: 1,
    explanation:
      "TLS protège la confidentialité et l'intégrité des communications réseau ; HTTPS est HTTP transporté sur TLS.",
  },
  {
    id: "maths-crypto-6",
    question: "Une signature numérique permet surtout de garantir :",
    choices: [
      "La compression du document",
      "L'authenticité du signataire et l'intégrité du message",
      "La suppression des métadonnées",
      "Le routage du paquet IP",
    ],
    correct: 1,
    explanation:
      "La signature numérique prouve qu'un message provient bien du signataire annoncé et qu'il n'a pas été modifié après signature.",
  },
];

export const mathsProbaQuiz: QuizQuestion[] = [
  {
    id: "maths-proba-1",
    question: "Quelle formule définit la probabilité conditionnelle de A sachant B, avec P(B) ≠ 0 ?",
    choices: [
      "P(A|B) = P(A) + P(B)",
      "P(A|B) = P(A∩B) / P(B)",
      "P(A|B) = P(A) × P(B)",
      "P(A|B) = P(B) / P(A∩B)",
    ],
    correct: 1,
    explanation:
      "Par définition, P(A|B) = P(A∩B) / P(B) lorsque l'événement B a une probabilité non nulle.",
  },
  {
    id: "maths-proba-2",
    question: "Si deux événements A et B sont indépendants, quelle relation est vraie ?",
    choices: [
      "P(A∩B) = P(A) × P(B)",
      "P(A∩B) = P(A) + P(B)",
      "P(A|B) = 0",
      "P(A∪B) = 1",
    ],
    correct: 0,
    explanation:
      "L'indépendance signifie que la réalisation de B ne modifie pas la probabilité de A, d'où P(A∩B) = P(A) × P(B).",
  },
  {
    id: "maths-proba-3",
    question: "Pour une variable aléatoire X suivant une loi binomiale B(n,p), quelle est l'espérance de X ?",
    choices: ["n + p", "n / p", "n × p", "p / n"],
    correct: 2,
    explanation:
      "Pour une loi binomiale B(n,p), l'espérance vaut E(X) = np : c'est le nombre moyen de succès attendus sur n essais.",
  },
  {
    id: "maths-proba-4",
    question: "Quelle grandeur mesure la dispersion des valeurs autour de la moyenne ?",
    choices: ["L'espérance", "La variance", "La médiane", "Le mode"],
    correct: 1,
    explanation:
      "La variance mesure l'étalement des valeurs autour de la moyenne. Son unité au carré conduit souvent à utiliser aussi l'écart-type.",
  },
  {
    id: "maths-proba-5",
    question: "Quelle description correspond à la loi normale ?",
    choices: [
      "Une loi discrète limitée aux entiers naturels",
      "Une loi continue en cloche centrée autour d'une moyenne",
      "Une loi réservée au chiffrement RSA",
      "Une loi toujours uniforme entre 0 et 1",
    ],
    correct: 1,
    explanation:
      "La loi normale est une loi continue souvent représentée par une courbe en cloche, symétrique autour de sa moyenne.",
  },
  {
    id: "maths-proba-6",
    question: "Que compte une combinaison C(n,k) ?",
    choices: [
      "Le nombre de façons d'ordonner k éléments parmi n",
      "Le nombre de sous-ensembles de k éléments choisis parmi n, sans tenir compte de l'ordre",
      "Le nombre de chemins dans un graphe pondéré",
      "Le nombre d'inverses d'une matrice carrée",
    ],
    correct: 1,
    explanation:
      "Une combinaison C(n,k) dénombre les choix de k éléments parmi n lorsque l'ordre n'a pas d'importance.",
  },
];
