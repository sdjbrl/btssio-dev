import Link from "next/link";
import { Hexagon } from "lucide-react";

const links = [
  { label: "Accueil", href: "/" },
  { label: "SISR", href: "/sisr" },
  { label: "SLAM", href: "/slam" },
  { label: "Examens", href: "/examens" },
  { label: "À propos", href: "/a-propos" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#475569] mt-24 py-10 bg-[#1B2336]/40">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 font-mono text-[#94A3B8] text-sm">
          <Hexagon className="w-5 h-5 text-[#22C55E]" />
          <span>BTSSIO.DEV</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-5" aria-label="Pied de page">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className="text-xs text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="text-xs text-[#94A3B8] text-center space-y-1">
          <p>
            Créé par{" "}
            <span className="text-[#22C55E] font-semibold">Saïd-Djibril AHMED MOUSSA</span>
          </p>
          <p>BTS SIO option SISR — 2ème année</p>
          <p className="text-[#475569]">Conforme BO spécial n°5 du 11 avril 2019</p>
        </div>
      </div>
    </footer>
  );
}
