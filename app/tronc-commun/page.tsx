"use client";
import { useState } from "react";
import CodeBlock from "@/components/CodeBlock";
import QuizCard from "@/components/QuizCard";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import { troncCommunQuiz } from "@/lib/quiz-data";
import { updateModuleProgress } from "@/lib/progress";

const powershellCode = `# Commandes PowerShell de base pour la gestion de parc

# Afficher les informations système complètes
Get-ComputerInfo

# Lister les services et leur statut
Get-Service | Where-Object {$_.Status -eq "Running"} | Format-Table -AutoSize

# Obtenir les informations réseau (IP, DNS, passerelle)
Get-NetIPConfiguration

# Lister les logiciels installés
Get-WmiObject -Class Win32_Product | Select-Object Name, Version

# Redémarrer un service
Restart-Service -Name "Spooler" -Force

# Exécuter une commande sur un PC distant
Invoke-Command -ComputerName PC-01 -ScriptBlock { Get-Process }

# Exporter l'inventaire matériel en CSV
Get-WmiObject -Class Win32_ComputerSystem | Export-Csv -Path "inventaire.csv" -NoTypeInformation`;

const ticketingCode = `Exemple de fiche d'incident conforme ITIL :

INCIDENT #2024-0342
-----------------
Priorité : P2 (Haute)
Catégorie : Réseau / Connectivité
Statut : En cours de résolution

DESCRIPTION :
L'utilisateur ne peut plus accéder aux partages réseau depuis ce matin 9h15.
Message d'erreur : "Le chemin réseau n'a pas été trouvé"

ANALYSE INITIALE :
- Ping du serveur : OK
- Câble réseau : connecté
- VLAN : 10 (utilisateurs)
- IP obtenue en DHCP : 192.168.10.45

ACTIONS RÉALISÉES :
1. Vérification des droits d'accès AD → OK
2. Test avec un autre compte → Même problème
3. ipconfig /release puis /renew → Échec
4. Réinitialisation du port switch → Résolu

RÉSOLUTION : 15:30 (6h15 de durée)
CAUSE RACINE : Port switch bloqué en mode err-disabled suite à violation de sécurité

SUIVI : Incident escaladé en Problème #2024-0089 pour analyse approfondie.`;

const itilItems = [
  { label: "Incident", value: "Interruption non planifiée ou réduction de qualité d'un service → Restauration rapide", code: false },
  { label: "Problème", value: "Cause racine d'un ou plusieurs incidents → Analyse et solution définitive", code: false },
  { label: "Changement", value: "Modification contrôlée du SI (RFC) → Validation CAB, tests, rollback plan", code: false },
  { label: "Priorité", value: "Impact × Urgence (P1 critique, P2 haute, P3 normale, P4 basse)", code: false },
  { label: "SLA", value: "Service Level Agreement → Engagement contractuel de délai de réponse/résolution", code: false },
  { label: "CMDB", value: "Configuration Management Database → Base centralisée des CI (items de config)", code: false },
  { label: "Modèle OSI", value: "7 couches : Physique, Liaison, Réseau, Transport, Session, Présentation, Application", code: false },
  { label: "GLPI", value: "Gestion de parc + helpdesk + ITIL → inventaire, tickets, contrats, licences", code: true },
];

const oralQuestions = [
  { question: "Expliquez la différence entre un incident et un problème selon ITIL.", hint: "Incident = symptôme (restauration rapide), Problème = cause racine (analyse long terme)" },
  { question: "Quelles sont les 7 couches du modèle OSI et à quoi sert chaque couche ?", hint: "PHY-LIA-RES-TRA-SES-PRE-APP (câbles → applications)" },
  { question: "Comment priorisez-vous un ticket utilisateur en tant que technicien support ?", hint: "Matrice Impact × Urgence → P1/P2/P3/P4" },
  { question: "Qu'est-ce qu'un SLA et pourquoi est-ce important ?", hint: "Engagement contractuel de niveau de service (délai, dispo, performance)" },
  { question: "Comment documentez-vous la résolution d'un incident dans GLPI ?", hint: "Description, actions réalisées, cause racine, temps de résolution, pièces jointes" },
  { question: "Qu'est-ce qu'une CMDB et à quoi sert-elle ?", hint: "Base de données des CI (items de configuration) : matériel, logiciels, relations, changements" },
  { question: "Citez 3 commandes PowerShell utiles pour le support niveau 1.", hint: "Get-ComputerInfo, Get-Service, Get-NetIPConfiguration, Test-Connection" },
];

export default function TroncCommunPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    
    if (currentQuestionIndex + 1 < troncCommunQuiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / troncCommunQuiz.length) * 100);
      updateModuleProgress("tronc-commun-bloc1", percentage);
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
    <div className="min-h-screen bg-[#0F172A] text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-2">Tronc Commun — Bloc 1</h1>
        <p className="text-[#94A3B8] mb-8">
          Support et mise à disposition de services informatiques (ITIL, gestion de parc, ticketing, déploiement)
        </p>

        {/* SECTION 1 — ITIL & Support Cheat Sheet */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#8B5CF6] mb-4">
            🎫 ITIL & Gestion du Support — Aide-mémoire
          </h2>
          <div className="rounded-lg border border-[#475569] bg-[#1E293B] p-6">
            <CheatSheet items={itilItems} />
          </div>
        </section>

        {/* SECTION 2 — Code Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#8B5CF6] mb-4">
            💻 Exemples de Code & Documentation
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-3">
                1. Commandes PowerShell de base
              </h3>
              <CodeBlock code={powershellCode} language="powershell" filename="support_commands.ps1" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-3">
                2. Exemple de documentation d&apos;incident ITIL
              </h3>
              <CodeBlock code={ticketingCode} language="text" filename="incident_template.txt" />
            </div>
          </div>
        </section>

        {/* SECTION 3 — Interactive Quiz */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#8B5CF6] mb-4">
            ✅ Quiz de Validation
          </h2>

          {!quizComplete ? (
            <>
              <p className="text-[#94A3B8] mb-4">
                Question {currentQuestionIndex + 1} / {troncCommunQuiz.length}
              </p>
              <QuizCard
                question={troncCommunQuiz[currentQuestionIndex]}
                onComplete={handleQuizComplete}
              />
            </>
          ) : (
            <div className="rounded-lg border border-[#475569] bg-[#1E293B] p-6 text-center">
              <p className="text-2xl font-bold mb-2" style={{ color: getScoreColor(score) }}>
                Quiz terminé ! Score : {score}/{troncCommunQuiz.length}
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
          <h2 className="text-2xl font-bold text-[#8B5CF6] mb-4">
            🎤 Préparation à l&apos;Oral E4
          </h2>
          <OralSimulator questions={oralQuestions} />
        </section>
      </div>
    </div>
  );
}
