import type { Metadata } from "next";
import Link from "next/link";
import { Network, Shield, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "SISR — Infrastructure & Réseaux | BTSSIO.DEV",
  description: "Révisez l'option SISR du BTS SIO : administration systèmes/réseaux (Bloc 2) et cybersécurité (Bloc 3).",
};

const blocs = [
  {
    href: "/sisr/bloc2",
    icon: Network,
    color: "text-[#22C55E]",
    border: "border-[#22C55E]/30 hover:border-[#22C55E]",
    bg: "bg-[#22C55E]/10",
    label: "Bloc 2",
    title: "Administration des systèmes et des réseaux",
    topics: ["Routage statique & dynamique (OSPF, RIP)", "VLAN — IEEE 802.1Q", "Windows Server (AD, DNS, DHCP)", "Linux — services et commandes", "Commandes Cisco IOS"],
  },
  {
    href: "/sisr/bloc3",
    icon: Shield,
    color: "text-[#F59E0B]",
    border: "border-[#F59E0B]/30 hover:border-[#F59E0B]",
    bg: "bg-[#F59E0B]/10",
    label: "Bloc 3",
    title: "Cybersécurité des services informatiques",
    topics: ["PRA / PCA — Plan de reprise d'activité", "Sauvegardes — règle 3-2-1", "Firewall iptables & pfSense", "VPN IPsec & OpenVPN", "Hardening systèmes"],
  },
];

export default function SisrPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-10">
          <span className="text-xs font-mono bg-[#22C55E]/20 text-[#22C55E] px-3 py-1 rounded-full">Option SISR</span>
          <h1 className="text-4xl font-bold font-mono mt-4 mb-2">
            Infrastructure & Réseaux
          </h1>
          <p className="text-[#94A3B8]">
            Services Informatiques aux Organisations — Spécialité Réseaux
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {blocs.map((bloc) => {
            const Icon = bloc.icon;
            return (
              <Link
                key={bloc.href}
                href={bloc.href}
                className={`group block p-6 rounded-xl border bg-[#1E293B] ${bloc.border} transition-all duration-200`}
              >
                <div className={`inline-flex p-3 rounded-lg ${bloc.bg} mb-4`}>
                  <Icon className={`w-6 h-6 ${bloc.color}`} />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${bloc.color}`}>{bloc.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#475569] group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-lg font-semibold text-white mb-4">{bloc.title}</h2>
                <ul className="space-y-1.5">
                  {bloc.topics.map((t) => (
                    <li key={t} className="text-sm text-[#94A3B8] flex items-center gap-2">
                      <span className={`w-1 h-1 rounded-full ${bloc.color} bg-current`} />
                      {t}
                    </li>
                  ))}
                </ul>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
