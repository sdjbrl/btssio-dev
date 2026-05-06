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

export const troncCommunQuiz: QuizQuestion[] = [
  {
    id: "q1",
    question: "Dans le modèle OSI, quelle couche gère l'adressage IP ?",
    choices: ["Couche 2 — Liaison", "Couche 3 — Réseau", "Couche 4 — Transport", "Couche 7 — Application"],
    correct: 1,
    explanation: "La couche 3 (Réseau) du modèle OSI gère l'adressage logique (IP) et le routage des paquets entre réseaux.",
  },
  {
    id: "q2",
    question: "Quelle méthode ITIL est utilisée pour gérer un dysfonctionnement temporaire d'un service ?",
    choices: ["Gestion des problèmes", "Gestion des incidents", "Gestion des changements", "Gestion des configurations"],
    correct: 1,
    explanation: "La gestion des incidents ITIL vise à restaurer le service aussi rapidement que possible après un incident. La gestion des problèmes cherche la cause racine.",
  },
  {
    id: "q3",
    question: "GLPI est principalement utilisé pour :",
    choices: ["Développement d'applications", "Gestion de parc informatique", "Conception de bases de données", "Création de sites web"],
    correct: 1,
    explanation: "GLPI est un logiciel libre de gestion de parc informatique et de helpdesk, conforme aux processus ITIL.",
  },
  {
    id: "q4",
    question: "Quelle commande PowerShell affiche les informations système du PC ?",
    choices: ["Get-Info", "Get-ComputerInfo", "Show-SystemInfo", "Display-Computer"],
    correct: 1,
    explanation: "Get-ComputerInfo retourne toutes les propriétés système et matériel de l'ordinateur (OS, BIOS, réseau, etc.).",
  },
  {
    id: "q5",
    question: "Le temps de résolution maximal d'un incident prioritaire (P1) dans un SLA typique est :",
    choices: ["15 minutes", "1 heure", "4 heures", "24 heures"],
    correct: 2,
    explanation: "Les incidents critiques (P1) ont généralement un SLA de 4 heures maximum de résolution, avec un délai de réponse de 15-30 minutes.",
  },
];

export const sisrBloc2Quiz: QuizQuestion[] = [
  {
    id: "q1",
    question: "Quelle commande Cisco IOS permet d'afficher la table de routage ?",
    choices: ["show route", "show ip route", "display routing-table", "get route"],
    correct: 1,
    explanation: "La commande 'show ip route' affiche la table de routage IPv4 avec les routes statiques, directement connectées et dynamiques.",
  },
  {
    id: "q2",
    question: "Un VLAN permet de :",
    choices: [
      "Augmenter la vitesse du réseau",
      "Segmenter un réseau en plusieurs domaines de diffusion",
      "Chiffrer les communications",
      "Remplacer un routeur"
    ],
    correct: 1,
    explanation: "Un VLAN (Virtual LAN) segmente un réseau physique en plusieurs réseaux logiques, créant des domaines de diffusion distincts pour améliorer la sécurité et les performances.",
  },
  {
    id: "q3",
    question: "Dans Active Directory, l'objet qui contient les utilisateurs et ordinateurs d'un service est :",
    choices: ["Domaine", "Unité d'organisation (OU)", "Groupe de sécurité", "Forêt"],
    correct: 1,
    explanation: "Les Unités d'Organisation (OU) permettent d'organiser les objets AD (utilisateurs, ordinateurs, groupes) et d'appliquer des GPO de façon granulaire.",
  },
  {
    id: "q4",
    question: "Quelle commande Linux affiche les interfaces réseau et leurs adresses IP ?",
    choices: ["ifconfig", "ip addr", "netstat -i", "show interfaces"],
    correct: 1,
    explanation: "La commande 'ip addr' (ou 'ip a') est la commande moderne sous Linux pour afficher les interfaces réseau et leurs configurations IP. ifconfig est obsolète.",
  },
  {
    id: "q5",
    question: "Le protocole OSPF est un protocole de routage :",
    choices: ["À vecteur de distance", "À état de liens", "Statique", "Hybride"],
    correct: 1,
    explanation: "OSPF (Open Shortest Path First) est un protocole de routage dynamique à état de liens qui utilise l'algorithme de Dijkstra pour calculer le plus court chemin.",
  },
];

export const sisrBloc3Quiz: QuizQuestion[] = [
  {
    id: "q1",
    question: "Un PRA (Plan de Reprise d'Activité) vise à :",
    choices: [
      "Prévenir les incidents de sécurité",
      "Restaurer le SI après un sinistre majeur",
      "Gérer les tickets utilisateurs",
      "Déployer de nouveaux postes"
    ],
    correct: 1,
    explanation: "Le PRA définit les procédures de restauration du SI après un sinistre majeur (incendie, inondation, cyberattaque). Le PCA assure la continuité pendant la crise.",
  },
  {
    id: "q2",
    question: "La règle de sauvegarde 3-2-1 signifie :",
    choices: [
      "3 sauvegardes par jour, 2 par semaine, 1 par mois",
      "3 copies, 2 supports différents, 1 copie hors site",
      "3 serveurs, 2 baies de stockage, 1 cloud",
      "3 niveaux de sécurité, 2 firewalls, 1 VPN"
    ],
    correct: 1,
    explanation: "La règle 3-2-1 : conserver 3 copies des données, sur 2 types de supports différents, dont 1 copie externalisée (hors site ou cloud).",
  },
  {
    id: "q3",
    question: "Quelle règle iptables autorise les connexions SSH entrantes ?",
    choices: [
      "iptables -A INPUT -p tcp --dport 22 -j ACCEPT",
      "iptables -A OUTPUT -p tcp --dport 22 -j ACCEPT",
      "iptables -I FORWARD -p ssh -j ALLOW",
      "iptables --add SSH --allow"
    ],
    correct: 0,
    explanation: "La règle 'iptables -A INPUT -p tcp --dport 22 -j ACCEPT' ajoute une règle en fin de chaîne INPUT pour accepter les paquets TCP vers le port 22 (SSH).",
  },
  {
    id: "q4",
    question: "Une DMZ (Zone Démilitarisée) permet de :",
    choices: [
      "Bloquer toutes les connexions Internet",
      "Isoler les serveurs publics du réseau interne",
      "Accélérer le routage réseau",
      "Chiffrer les communications VPN"
    ],
    correct: 1,
    explanation: "La DMZ est un sous-réseau isolé placé entre Internet et le réseau interne, hébergeant les serveurs exposés (web, mail) pour limiter les risques d'intrusion.",
  },
  {
    id: "q5",
    question: "Le protocole IPsec fonctionne à quelle couche OSI ?",
    choices: ["Couche 2 (Liaison)", "Couche 3 (Réseau)", "Couche 4 (Transport)", "Couche 7 (Application)"],
    correct: 1,
    explanation: "IPsec opère à la couche 3 (Réseau) du modèle OSI, chiffrant et authentifiant les paquets IP. Il peut fonctionner en mode tunnel ou transport.",
  },
];

export const slamBloc2Quiz: QuizQuestion[] = [
  {
    id: "q1",
    question: "En POO, l'héritage permet à une classe de :",
    choices: [
      "Créer plusieurs instances",
      "Réutiliser les propriétés et méthodes d'une classe parente",
      "Déclarer des variables statiques",
      "Chiffrer les données"
    ],
    correct: 1,
    explanation: "L'héritage permet à une classe fille d'hériter des attributs et méthodes de sa classe parente, favorisant la réutilisabilité du code.",
  },
  {
    id: "q2",
    question: "Quelle clause SQL permet de filtrer les résultats d'un GROUP BY ?",
    choices: ["WHERE", "FILTER", "HAVING", "SELECT"],
    correct: 2,
    explanation: "HAVING filtre les groupes après l'agrégation (GROUP BY), tandis que WHERE filtre les lignes avant le regroupement.",
  },
  {
    id: "q3",
    question: "Dans l'architecture MVC, le Modèle gère :",
    choices: [
      "L'affichage des données",
      "La logique métier et l'accès aux données",
      "Le routage des requêtes",
      "Les sessions utilisateurs"
    ],
    correct: 1,
    explanation: "Le Modèle (Model) encapsule la logique métier et l'accès aux données. La Vue affiche, le Contrôleur orchestre.",
  },
  {
    id: "q4",
    question: "Quelle méthode HTTP est utilisée pour créer une nouvelle ressource dans une API REST ?",
    choices: ["GET", "POST", "PUT", "DELETE"],
    correct: 1,
    explanation: "POST crée une nouvelle ressource. GET lit, PUT met à jour (ou crée avec ID connu), DELETE supprime.",
  },
  {
    id: "q5",
    question: "Le code HTTP 404 signifie :",
    choices: [
      "Requête réussie",
      "Ressource non trouvée",
      "Erreur serveur",
      "Redirection permanente"
    ],
    correct: 1,
    explanation: "404 Not Found indique que la ressource demandée n'existe pas. 200 = succès, 500 = erreur serveur, 301 = redirection permanente.",
  },
];

export const examensQuiz: QuizQuestion[] = [
  {
    id: "q1",
    question: "L'épreuve E4 du BTS SIO consiste en :",
    choices: [
      "Un développement technique de 40 heures",
      "La présentation du portfolio professionnel",
      "Un examen écrit de 4 heures",
      "Une soutenance de projet tutoré"
    ],
    correct: 1,
    explanation: "L'épreuve E4 est basée sur le portfolio professionnel (PPE) comprenant les réalisations en entreprise et en formation. Coefficient 4.",
  },
  {
    id: "q2",
    question: "Combien de situations professionnelles doivent être présentées en E4 ?",
    choices: ["1 situation", "2 situations", "3 situations", "5 situations"],
    correct: 1,
    explanation: "Le candidat présente 2 situations professionnelles significatives tirées de son parcours de formation (stage, alternance, projets).",
  },
  {
    id: "q3",
    question: "La durée de passage pour l'épreuve E4 est de :",
    choices: ["20 minutes", "40 minutes", "1 heure", "2 heures"],
    correct: 1,
    explanation: "L'épreuve E4 dure 40 minutes : 20 minutes de présentation par le candidat + 20 minutes de questions du jury.",
  },
  {
    id: "q4",
    question: "L'épreuve E5 porte sur :",
    choices: [
      "La gestion de projet",
      "La conception et développement d'une solution applicative",
      "La cybersécurité uniquement",
      "L'administration système"
    ],
    correct: 1,
    explanation: "E5 évalue les compétences de conception et développement d'une solution applicative à partir d'un cahier des charges. Coefficient 4.",
  },
  {
    id: "q5",
    question: "L'épreuve E6 Cybersécurité est :",
    choices: [
      "Facultative",
      "Obligatoire avec coefficient 1",
      "Réservée aux SISR",
      "Une certification externe"
    ],
    correct: 1,
    explanation: "Depuis 2023, l'épreuve E6 Cybersécurité est obligatoire pour tous les candidats BTS SIO (SLAM et SISR), avec un coefficient 1.",
  },
];
