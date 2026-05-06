"use client";
import { useState } from "react";
import CodeBlock from "@/components/CodeBlock";
import QuizCard from "@/components/QuizCard";
import CheatSheet from "@/components/CheatSheet";
import OralSimulator from "@/components/OralSimulator";
import { sisrBloc2Quiz } from "@/lib/quiz-data";
import { updateModuleProgress } from "@/lib/progress";

const ciscoRoutingCode = `! Configuration routage statique et dynamique Cisco IOS

! === ROUTAGE STATIQUE ===
! Route vers réseau distant via passerelle
ip route 192.168.10.0 255.255.255.0 10.0.0.1

! Route par défaut
ip route 0.0.0.0 0.0.0.0 203.0.113.1

! === ROUTAGE DYNAMIQUE OSPF ===
router ospf 1
 router-id 1.1.1.1
 network 10.0.0.0 0.255.255.255 area 0
 network 192.168.1.0 0.0.0.255 area 0
 passive-interface GigabitEthernet0/0
 default-information originate

! === CONFIGURATION VLAN ===
! Création de VLANs
vlan 10
 name UTILISATEURS
vlan 20
 name SERVEURS

! Interface trunk (liaison inter-switchs)
interface GigabitEthernet0/1
 description TRUNK-TO-SW2
 switchport mode trunk
 switchport trunk allowed vlan 10,20,99

! Interface access (poste utilisateur)
interface FastEthernet0/5
 description PC-USER-01
 switchport mode access
 switchport access vlan 10
 spanning-tree portfast

! Afficher la table de routage
show ip route

! Vérifier les VLANs
show vlan brief`;

const linuxNetworkCode = `# Commandes réseau Linux (Debian/Ubuntu)

# === CONFIGURATION IP ===
# Afficher les interfaces réseau
ip addr show
ip a  # version courte

# Configurer une IP statique (temporaire)
sudo ip addr add 192.168.1.100/24 dev eth0
sudo ip link set eth0 up

# Configuration réseau avec NetworkManager
sudo nmcli con mod "Connexion filaire 1" ipv4.addresses 192.168.1.100/24
sudo nmcli con mod "Connexion filaire 1" ipv4.gateway 192.168.1.1
sudo nmcli con mod "Connexion filaire 1" ipv4.dns "8.8.8.8 8.8.4.4"
sudo nmcli con mod "Connexion filaire 1" ipv4.method manual
sudo nmcli con up "Connexion filaire 1"

# === DIAGNOSTIC RÉSEAU ===
# Test de connectivité
ping -c 4 8.8.8.8

# Tracer la route
traceroute 8.8.8.8
mtr 8.8.8.8  # version interactive

# Afficher la table de routage
ip route show

# Ports en écoute
sudo ss -tulpn
sudo netstat -tulpn  # version obsolète

# === FIREWALL UFW ===
# Activer le firewall
sudo ufw enable

# Règles de base
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw deny from 203.0.113.0/24  # Bloquer un sous-réseau

# Statut
sudo ufw status verbose`;

const windowsServerCode = `# Windows Server — Active Directory, DNS, DHCP

# === ACTIVE DIRECTORY ===
# Créer une OU
New-ADOrganizationalUnit -Name "Informatique" -Path "DC=entreprise,DC=local"

# Créer un utilisateur
New-ADUser -Name "Dupont Jean" -GivenName "Jean" -Surname "Dupont" \\
  -SamAccountName "jdupont" -UserPrincipalName "jdupont@entreprise.local" \\
  -Path "OU=Informatique,DC=entreprise,DC=local" \\
  -AccountPassword (ConvertTo-SecureString "P@ssw0rd!" -AsPlainText -Force) \\
  -Enabled $true

# Ajouter un utilisateur à un groupe
Add-ADGroupMember -Identity "Admins_Domaine" -Members "jdupont"

# Lister les utilisateurs d'une OU
Get-ADUser -Filter * -SearchBase "OU=Informatique,DC=entreprise,DC=local"

# === DNS ===
# Créer une zone de recherche directe
Add-DnsServerPrimaryZone -Name "entreprise.local" -ZoneFile "entreprise.local.dns"

# Ajouter un enregistrement A
Add-DnsServerResourceRecordA -Name "web01" -ZoneName "entreprise.local" -IPv4Address "192.168.1.10"

# === DHCP ===
# Créer une étendue DHCP
Add-DhcpServerv4Scope -Name "LAN-Utilisateurs" \\
  -StartRange 192.168.10.100 -EndRange 192.168.10.200 \\
  -SubnetMask 255.255.255.0 -State Active

# Configurer les options (passerelle, DNS)
Set-DhcpServerv4OptionValue -ScopeId 192.168.10.0 \\
  -Router 192.168.10.1 -DnsServer 192.168.10.2`;

const reseauxItems = [
  { label: "VLAN (802.1Q)", value: "Virtual LAN — segmentation logique d'un réseau (isolation, sécurité, perf)", code: false },
  { label: "Trunk vs Access", value: "Trunk = plusieurs VLANs (tagged), Access = un seul VLAN (untagged)", code: false },
  { label: "OSPF", value: "Open Shortest Path First — routage dynamique à état de liens (métrique = coût)", code: false },
  { label: "RIP", value: "Routing Information Protocol — vecteur de distance (métrique = nombre de sauts, max 15)", code: false },
  { label: "Active Directory", value: "Annuaire Microsoft : utilisateurs, groupes, GPO, authentification centralisée Kerberos", code: false },
  { label: "DNS", value: "Domain Name System — résolution nom ↔ IP (A, AAAA, CNAME, MX, NS, PTR)", code: false },
  { label: "DHCP", value: "Dynamic Host Configuration Protocol — attribution automatique IP/masque/passerelle/DNS", code: false },
  { label: "Spanning Tree (STP)", value: "Protocole prévenant les boucles dans les réseaux commutés redondants", code: false },
];

const oralQuestions = [
  { question: "Expliquez la différence entre routage statique et routage dynamique (OSPF).", hint: "Statique = manuel, fixe. OSPF = auto, s'adapte aux pannes, métrique coût" },
  { question: "Qu'est-ce qu'un VLAN et pourquoi segmenter un réseau en VLANs ?", hint: "Isolation broadcast, sécurité, organisation logique, performances" },
  { question: "Comment configurez-vous un trunk 802.1Q entre deux switchs Cisco ?", hint: "switchport mode trunk, switchport trunk allowed vlan X,Y,Z" },
  { question: "Quel est le rôle d'Active Directory dans une infrastructure Windows ?", hint: "Annuaire centralisé : users, groupes, GPO, auth Kerberos, Single Sign-On" },
  { question: "Quelles sont les différences entre un enregistrement DNS A, CNAME et MX ?", hint: "A = nom→IP, CNAME = alias, MX = serveur mail" },
  { question: "Comment diagnostiquez-vous un problème de résolution DNS sous Linux ?", hint: "nslookup, dig, cat /etc/resolv.conf, systemctl status systemd-resolved" },
  { question: "Expliquez le fonctionnement du protocole DHCP (DORA).", hint: "Discover, Offer, Request, Acknowledge — attribution IP dynamique" },
];

export default function SisrBloc2Page() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    
    if (currentQuestionIndex + 1 < sisrBloc2Quiz.length) {
      if (correct) setScore(newScore);
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (correct) setScore(newScore);
      setQuizComplete(true);
      const percentage = Math.round((newScore / sisrBloc2Quiz.length) * 100);
      updateModuleProgress("sisr-bloc2-admin", percentage);
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
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">SISR — Bloc 2</h1>
        <p className="text-[#94A3B8] mb-8 sm:mb-10">
          Administration des systèmes et des réseaux (Cisco IOS, Windows Server, Linux, VLAN, routage, AD/DNS/DHCP)
        </p>

        {/* SECTION 1 — Réseaux Cheat Sheet */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#8B5CF6] mb-4">
            🌐 Réseaux & Services — Aide-mémoire
          </h2>
          <div className="rounded-lg border border-[#475569] bg-[#1E293B] p-4 sm:p-6">
            <CheatSheet items={reseauxItems} />
          </div>
        </section>

        {/* SECTION 2 — Code Examples */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#8B5CF6] mb-4">
            💻 Exemples de Configuration
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-3">
                1. Routage et VLAN — Cisco IOS
              </h3>
              <CodeBlock code={ciscoRoutingCode} language="cisco" filename="router_config.txt" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-3">
                2. Configuration réseau Linux
              </h3>
              <CodeBlock code={linuxNetworkCode} language="bash" filename="linux_network.sh" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-3">
                3. Windows Server — AD, DNS, DHCP
              </h3>
              <CodeBlock code={windowsServerCode} language="powershell" filename="windows_server.ps1" />
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
                Question {currentQuestionIndex + 1} / {sisrBloc2Quiz.length}
              </p>
              <QuizCard
                question={sisrBloc2Quiz[currentQuestionIndex]}
                onComplete={handleQuizComplete}
              />
            </>
          ) : (
            <div className="rounded-lg border border-[#475569] bg-[#1E293B] p-4 sm:p-6 text-center">
              <p className="text-xl sm:text-2xl font-bold mb-2" style={{ color: getScoreColor(score) }}>
                Quiz terminé ! Score : {score}/{sisrBloc2Quiz.length}
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
