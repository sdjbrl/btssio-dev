"use client";
import { useState } from "react";
import CodeBlock from "@/components/CodeBlock";
import QuizCard from "@/components/QuizCard";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import { slamBloc2Quiz } from "@/lib/quiz-data";
import { updateModuleProgress } from "@/lib/progress";

const phpPooCode = `<?php
// === PROGRAMMATION ORIENTÉE OBJET EN PHP ===

// Classe de base avec encapsulation
class Utilisateur {
    // Propriétés privées (encapsulation)
    private $id;
    private $nom;
    private $email;
    
    // Constructeur
    public function __construct(int $id, string $nom, string $email) {
        $this->id = $id;
        $this->nom = $nom;
        $this->setEmail($email); // validation via setter
    }
    
    // Getters
    public function getId(): int {
        return $this->id;
    }
    
    public function getNom(): string {
        return $this->nom;
    }
    
    // Setter avec validation
    public function setEmail(string $email): void {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException("Email invalide");
        }
        $this->email = $email;
    }
    
    // Méthode métier
    public function afficherProfil(): string {
        return "Utilisateur: {$this->nom} ({$this->email})";
    }
}

// Héritage — classe enfant étend la classe parente
class Admin extends Utilisateur {
    private $niveau;
    
    public function __construct(int $id, string $nom, string $email, int $niveau) {
        parent::__construct($id, $nom, $email); // Appel constructeur parent
        $this->niveau = $niveau;
    }
    
    // Redéfinition (override) de méthode
    public function afficherProfil(): string {
        return parent::afficherProfil() . " [Admin niveau {$this->niveau}]";
    }
    
    public function supprimerUtilisateur(int $userId): void {
        // Logique de suppression réservée aux admins
        echo "Admin: suppression de l'utilisateur $userId";
    }
}

// Interface — contrat de méthodes
interface Authentifiable {
    public function login(string $email, string $password): bool;
    public function logout(): void;
}

// Utilisation
$user = new Utilisateur(1, "Jean Dupont", "jean@example.com");
echo $user->afficherProfil();

$admin = new Admin(2, "Marie Admin", "marie@example.com", 3);
echo $admin->afficherProfil();
$admin->supprimerUtilisateur(42);`;

const sqlAdvancedCode = `-- === SQL AVANCÉ — Jointures, agrégations, sous-requêtes ===

-- INNER JOIN — utilisateurs avec leurs commandes
SELECT 
    u.nom,
    u.email,
    c.numero_commande,
    c.montant,
    c.date_commande
FROM utilisateurs u
INNER JOIN commandes c ON u.id = c.utilisateur_id
WHERE c.date_commande >= '2024-01-01'
ORDER BY c.date_commande DESC;

-- LEFT JOIN — tous les utilisateurs, même sans commande
SELECT 
    u.nom,
    COUNT(c.id) AS nb_commandes,
    COALESCE(SUM(c.montant), 0) AS total_depenses
FROM utilisateurs u
LEFT JOIN commandes c ON u.id = c.utilisateur_id
GROUP BY u.id, u.nom
HAVING total_depenses > 500
ORDER BY total_depenses DESC;

-- Sous-requête — utilisateurs ayant commandé plus que la moyenne
SELECT nom, email
FROM utilisateurs
WHERE id IN (
    SELECT utilisateur_id
    FROM commandes
    GROUP BY utilisateur_id
    HAVING SUM(montant) > (SELECT AVG(total) FROM (
        SELECT SUM(montant) AS total
        FROM commandes
        GROUP BY utilisateur_id
    ) AS avg_commandes)
);

-- WITH (CTE) — requête plus lisible
WITH ventes_mensuelles AS (
    SELECT 
        DATE_FORMAT(date_commande, '%Y-%m') AS mois,
        SUM(montant) AS total
    FROM commandes
    GROUP BY mois
)
SELECT 
    mois,
    total,
    total - LAG(total) OVER (ORDER BY mois) AS evolution
FROM ventes_mensuelles;

-- TRANSACTION — atomicité des opérations
START TRANSACTION;

UPDATE comptes SET solde = solde - 100 WHERE id = 1;
UPDATE comptes SET solde = solde + 100 WHERE id = 2;

-- Validation si tout OK, sinon ROLLBACK
COMMIT;

-- INDEX pour performances
CREATE INDEX idx_commandes_date ON commandes(date_commande);
CREATE INDEX idx_utilisateurs_email ON utilisateurs(email);`;

const apiRestCode = `<?php
// === API REST EN PHP ===

header('Content-Type: application/json; charset=utf-8');

// Récupérer la méthode HTTP et la route
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Connexion BDD (PDO sécurisé)
$pdo = new PDO('mysql:host=localhost;dbname=app;charset=utf8mb4', 'user', 'pass', [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);

// === ROUTING ===
if ($path === '/api/users' && $method === 'GET') {
    // GET /api/users — liste tous les utilisateurs
    $stmt = $pdo->query('SELECT id, nom, email FROM utilisateurs ORDER BY nom');
    $users = $stmt->fetchAll();
    
    http_response_code(200);
    echo json_encode(['success' => true, 'data' => $users]);
    
} elseif (preg_match('#^/api/users/(\\d+)$#', $path, $matches) && $method === 'GET') {
    // GET /api/users/{id} — récupère un utilisateur
    $id = (int) $matches[1];
    $stmt = $pdo->prepare('SELECT id, nom, email FROM utilisateurs WHERE id = ?');
    $stmt->execute([$id]);
    $user = $stmt->fetch();
    
    if ($user) {
        http_response_code(200);
        echo json_encode(['success' => true, 'data' => $user]);
    } else {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Utilisateur non trouvé']);
    }
    
} elseif ($path === '/api/users' && $method === 'POST') {
    // POST /api/users — crée un utilisateur
    $input = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $pdo->prepare('INSERT INTO utilisateurs (nom, email) VALUES (?, ?)');
    $stmt->execute([$input['nom'], $input['email']]);
    
    http_response_code(201);
    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
    
} elseif (preg_match('#^/api/users/(\\d+)$#', $path, $matches) && $method === 'DELETE') {
    // DELETE /api/users/{id} — supprime un utilisateur
    $id = (int) $matches[1];
    $stmt = $pdo->prepare('DELETE FROM utilisateurs WHERE id = ?');
    $stmt->execute([$id]);
    
    http_response_code(204); // No Content
    
} else {
    http_response_code(404);
    echo json_encode(['success' => false, 'error' => 'Route non trouvée']);
}`;

const devItems = [
  { label: "POO — Encapsulation", value: "Propriétés privées + getters/setters → contrôle d'accès et validation", code: false },
  { label: "POO — Héritage", value: "Classe enfant extends classe parente → réutilisation du code", code: true },
  { label: "POO — Polymorphisme", value: "Une méthode, plusieurs formes (override, interfaces) → flexibilité", code: false },
  { label: "MVC", value: "Modèle (données/logique) + Vue (affichage) + Contrôleur (orchestration)", code: false },
  { label: "SQL JOIN", value: "INNER (intersection), LEFT (tous à gauche), RIGHT, FULL OUTER", code: false },
  { label: "API REST — Verbes HTTP", value: "GET (lire), POST (créer), PUT/PATCH (modifier), DELETE (supprimer)", code: false },
  { label: "HTTP Status Codes", value: "200 OK, 201 Created, 204 No Content, 400 Bad Request, 404 Not Found, 500 Error", code: false },
  { label: "TRANSACTION SQL", value: "START TRANSACTION → opérations → COMMIT (valide) ou ROLLBACK (annule)", code: true },
];

const oralQuestions = [
  { question: "Expliquez les 3 principes fondamentaux de la POO : encapsulation, héritage, polymorphisme.", hint: "Encapsulation = cacher détails, Héritage = réutiliser, Polymorphisme = adapter" },
  { question: "Quelle est la différence entre INNER JOIN et LEFT JOIN en SQL ?", hint: "INNER = intersection, LEFT = tous les enregistrements de gauche + correspondances" },
  { question: "Qu'est-ce que l'architecture MVC et quels sont les rôles de chaque composant ?", hint: "Modèle = données/logique, Vue = affichage, Contrôleur = chef d'orchestre" },
  { question: "Quels sont les 4 verbes HTTP principaux d'une API REST et leur usage ?", hint: "GET (lire), POST (créer), PUT/PATCH (modifier), DELETE (supprimer)" },
  { question: "Qu'est-ce qu'une transaction SQL et pourquoi l'utiliser ?", hint: "Atomicité : tout ou rien (ex: virement bancaire)" },
  { question: "Comment sécurisez-vous une API REST en PHP ?", hint: "JWT/OAuth, HTTPS, validation entrées, rate limiting, CORS" },
  { question: "Expliquez la différence entre WHERE et HAVING en SQL.", hint: "WHERE filtre avant GROUP BY, HAVING filtre après (agrégations)" },
];

export default function SlamBloc2Page() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    
    if (currentQuestionIndex + 1 < slamBloc2Quiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / slamBloc2Quiz.length) * 100);
      updateModuleProgress("slam-bloc2-dev", percentage);
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
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">SLAM — Bloc 2 Développement</h1>
        <p className="text-[#94A3B8] mb-8 sm:mb-10">
          Conception et développement d&apos;applications : POO, SQL, MVC, API REST
        </p>

        {/* SECTION 1 — Dev Cheat Sheet */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#8B5CF6] mb-4">
            🧩 Développement — Aide-mémoire
          </h2>
          <div className="rounded-lg border border-[#475569] bg-[#1E293B] p-4 sm:p-6">
            <CheatSheet items={devItems} />
          </div>
        </section>

        {/* SECTION 2 — Code Examples */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#8B5CF6] mb-4">
            💻 Exemples de Code
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-3">
                1. Programmation Orientée Objet (PHP)
              </h3>
              <CodeBlock code={phpPooCode} language="php" filename="poo_example.php" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-3">
                2. SQL Avancé — Jointures, Agrégations, Transactions
              </h3>
              <CodeBlock code={sqlAdvancedCode} language="sql" filename="sql_advanced.sql" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-3">
                3. API REST en PHP
              </h3>
              <CodeBlock code={apiRestCode} language="php" filename="api_rest.php" />
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
                Question {currentQuestionIndex + 1} / {slamBloc2Quiz.length}
              </p>
              <QuizCard
                question={slamBloc2Quiz[currentQuestionIndex]}
                onComplete={handleQuizComplete}
              />
            </>
          ) : (
            <div className="rounded-lg border border-[#475569] bg-[#1E293B] p-4 sm:p-6 text-center">
              <p className="text-xl sm:text-2xl font-bold mb-2" style={{ color: getScoreColor(score) }}>
                Quiz terminé ! Score : {score}/{slamBloc2Quiz.length}
              </p>
              <p className="text-[#94A3B8] mb-4">
                {score >= 4
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
