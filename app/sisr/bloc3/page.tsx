"use client";
import { useState } from "react";
import CodeBlock from "@/components/CodeBlock";
import QuizCard from "@/components/QuizCard";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import { sisrBloc3Quiz } from "@/lib/quiz-data";
import { updateModuleProgress } from "@/lib/progress";

const iptablesCode = `# Configuration firewall iptables (Linux)

# === POLITIQUE PAR DÉFAUT (tout bloquer) ===
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# === RÈGLES DE BASE ===
# Autoriser le loopback
iptables -A INPUT -i lo -j ACCEPT

# Autoriser les connexions établies
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# === SERVICES AUTORISÉS ===
# SSH (port 22)
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# HTTP et HTTPS (ports 80, 443)
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# DNS (port 53, UDP et TCP)
iptables -A INPUT -p udp --dport 53 -j ACCEPT
iptables -A INPUT -p tcp --dport 53 -j ACCEPT

# === PROTECTION CONTRE LES ATTAQUES ===
# Bloquer les scans de ports
iptables -A INPUT -p tcp --tcp-flags ALL NONE -j DROP
iptables -A INPUT -p tcp --tcp-flags ALL ALL -j DROP

# Limiter les connexions SSH (anti brute-force)
iptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --set
iptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --update --seconds 60 --hitcount 4 -j DROP

# === BLOQUER UN SOUS-RÉSEAU ===
iptables -A INPUT -s 203.0.113.0/24 -j DROP

# === SAUVEGARDER LES RÈGLES ===
# Debian/Ubuntu
iptables-save > /etc/iptables/rules.v4

# RedHat/CentOS
service iptables save

# === AFFICHER LES RÈGLES ===
iptables -L -v -n --line-numbers`;

const backupCode = `#!/bin/bash
# Script de sauvegarde incrémentale conforme 3-2-1

# === CONFIGURATION ===
SOURCE="/srv/data"
BACKUP_LOCAL="/mnt/backup/daily"
BACKUP_REMOTE="backup@192.168.1.50:/backups"
LOG_FILE="/var/log/backup.log"
DATE=$(date +%Y-%m-%d_%H%M%S)
RETENTION_DAYS=30

# === FONCTION DE LOG ===
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# === SAUVEGARDE LOCALE (support #1) ===
log "Début de la sauvegarde locale"
rsync -avz --delete \\
    --link-dest="$BACKUP_LOCAL/latest" \\
    "$SOURCE/" \\
    "$BACKUP_LOCAL/$DATE/"

# Créer un lien symbolique vers la dernière sauvegarde
ln -snf "$BACKUP_LOCAL/$DATE" "$BACKUP_LOCAL/latest"
log "Sauvegarde locale terminée"

# === SAUVEGARDE DISTANTE (support #2, off-site) ===
log "Début de la sauvegarde distante"
rsync -avz -e "ssh -i /root/.ssh/backup_key" \\
    "$BACKUP_LOCAL/$DATE/" \\
    "$BACKUP_REMOTE/$DATE/"
log "Sauvegarde distante terminée"

# === NETTOYAGE (rétention 30 jours) ===
log "Nettoyage des sauvegardes anciennes"
find "$BACKUP_LOCAL" -maxdepth 1 -type d -mtime +$RETENTION_DAYS -exec rm -rf {} \\;

# === VÉRIFICATION INTÉGRITÉ ===
log "Vérification intégrité avec checksums"
cd "$BACKUP_LOCAL/$DATE" && find . -type f -exec sha256sum {} \\; > checksums.txt

log "Sauvegarde terminée avec succès"

# === RÈGLE 3-2-1 ===
# 3 copies : source + backup local + backup distant
# 2 supports : disque dur + NAS réseau
# 1 copie hors site : serveur distant`;

const openvpnCode = `# Configuration OpenVPN serveur (Debian/Ubuntu)

# === /etc/openvpn/server/server.conf ===
port 1194
proto udp
dev tun

# Certificats et clés
ca ca.crt
cert server.crt
key server.key
dh dh2048.pem
tls-auth ta.key 0

# Réseau VPN
server 10.8.0.0 255.255.255.0
ifconfig-pool-persist ipp.txt

# Pousser les routes vers le LAN interne
push "route 192.168.1.0 255.255.255.0"
push "dhcp-option DNS 192.168.1.1"

# Sécurité
cipher AES-256-GCM
auth SHA256
user nobody
group nogroup
persist-key
persist-tun

# Logging
status /var/log/openvpn-status.log
log-append /var/log/openvpn.log
verb 3

# === Démarrage du service ===
systemctl enable openvpn-server@server
systemctl start openvpn-server@server

# === Firewall (autoriser le forwarding) ===
echo 1 > /proc/sys/net/ipv4/ip_forward
iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -o eth0 -j MASQUERADE
iptables -A FORWARD -i tun0 -j ACCEPT`;

const cyberItems = [
  { label: "PRA vs PCA", value: "PRA = Reprise après sinistre | PCA = Continuité pendant la crise (RPO, RTO)", code: false },
  { label: "Règle 3-2-1", value: "3 copies, 2 supports différents, 1 hors site (off-site ou cloud)", code: false },
  { label: "RPO / RTO", value: "Recovery Point Objective (perte max) / Recovery Time Objective (délai max)", code: false },
  { label: "VPN IPsec", value: "Chiffrement couche 3 — modes tunnel/transport, AH (auth) + ESP (chiffrement)", code: false },
  { label: "VPN SSL/TLS", value: "OpenVPN, WireGuard — chiffrement applicatif, compatible NAT, plus simple", code: false },
  { label: "DMZ", value: "Zone démilitarisée — sous-réseau isolé pour serveurs publics (web, mail)", code: false },
  { label: "Firewall stateful", value: "Analyse état des connexions (ESTABLISHED, RELATED, NEW) — ex: iptables, pfSense", code: false },
  { label: "Hardening", value: "Durcissement : désactiver services inutiles, mises à jour, fail2ban, SELinux/AppArmor", code: false },
];

const oralQuestions = [
  { question: "Quelle est la différence entre un PRA et un PCA ?", hint: "PRA = après (restauration), PCA = pendant (continuité), RTO/RPO" },
  { question: "Expliquez la règle de sauvegarde 3-2-1 et pourquoi elle est importante.", hint: "3 copies, 2 médias, 1 off-site — protection redondance + sinistre" },
  { question: "Qu'est-ce qu'une DMZ et pourquoi l'utiliser ?", hint: "Zone isolée pour services publics — limite l'exposition du LAN interne" },
  { question: "Comment configurez-vous un firewall iptables pour bloquer tout sauf SSH et HTTP ?", hint: "Policy DROP, accept lo, ESTABLISHED, ports 22 et 80" },
  { question: "Quelle est la différence entre VPN IPsec et VPN SSL (OpenVPN) ?", hint: "IPsec = couche 3, complexe, site-to-site | SSL = couche app, simple, remote access" },
  { question: "Quelles mesures de hardening appliquez-vous sur un serveur Linux ?", hint: "Désactiver services inutiles, UFW, fail2ban, mises à jour auto, SSH par clé" },
  { question: "Qu'est-ce que le RPO et le RTO dans un plan de reprise d'activité ?", hint: "RPO = perte de données max acceptable, RTO = délai de reprise max" },
];

export default function SisrBloc3Page() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    
    if (currentQuestionIndex + 1 < sisrBloc3Quiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / sisrBloc3Quiz.length) * 100);
      updateModuleProgress("sisr-bloc3-cyber", percentage);
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
        <h1 className="text-4xl font-bold mb-2">SISR — Bloc 3 Cybersécurité</h1>
        <p className="text-[#94A3B8] mb-8">
          Sécurité des infrastructures : PRA/PCA, sauvegardes, VPN, firewall, DMZ, hardening
        </p>

        {/* SECTION 1 — Cybersécurité Infra Cheat Sheet */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#8B5CF6] mb-4">
            🛡️ Cybersécurité Infrastructure — Aide-mémoire
          </h2>
          <div className="rounded-lg border border-[#475569] bg-[#1E293B] p-6">
            <CheatSheet items={cyberItems} />
          </div>
        </section>

        {/* SECTION 2 — Code Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#8B5CF6] mb-4">
            💻 Exemples de Configuration Sécurisée
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-3">
                1. Firewall iptables (Linux)
              </h3>
              <CodeBlock code={iptablesCode} language="bash" filename="firewall_iptables.sh" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-3">
                2. Script de sauvegarde 3-2-1 avec rsync
              </h3>
              <CodeBlock code={backupCode} language="bash" filename="backup_3-2-1.sh" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-3">
                3. Configuration VPN OpenVPN
              </h3>
              <CodeBlock code={openvpnCode} language="bash" filename="openvpn_server.conf" />
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
                Question {currentQuestionIndex + 1} / {sisrBloc3Quiz.length}
              </p>
              <QuizCard
                question={sisrBloc3Quiz[currentQuestionIndex]}
                onComplete={handleQuizComplete}
              />
            </>
          ) : (
            <div className="rounded-lg border border-[#475569] bg-[#1E293B] p-6 text-center">
              <p className="text-2xl font-bold mb-2" style={{ color: getScoreColor(score) }}>
                Quiz terminé ! Score : {score}/{sisrBloc3Quiz.length}
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
            🎤 Préparation à l&apos;Oral
          </h2>
          <OralSimulator questions={oralQuestions} />
        </section>
      </div>
    </div>
  );
}
