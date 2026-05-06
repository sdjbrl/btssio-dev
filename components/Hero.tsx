"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Network, Code2, ChevronRight } from "lucide-react";

const LINES = [
  "$ btssio init --student",
  "✓ Chargement du référentiel BTS SIO...",
  "✓ Blocs de compétences SISR + SLAM détectés",
  "✓ Quiz adaptatifs prêts",
  "> Bonne révision ! 🚀",
];

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < LINES.length) {
        setVisibleLines((prev) => [...prev, LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 pt-16 pb-12">
      {/* Terminal */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="rounded-lg border border-[#475569] bg-[#0d1117] overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-[#272F42] border-b border-[#475569]">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]/70" />
            <span className="w-3 h-3 rounded-full bg-[#22C55E]/70" />
            <span className="w-3 h-3 rounded-full bg-[#8B5CF6]/70" />
            <span className="ml-2 text-xs text-[#94A3B8] font-mono">btssio.dev — terminal</span>
          </div>
          <div className="p-4 font-mono text-sm text-[#22C55E] min-h-[140px]">
            {visibleLines.map((line, i) => (
              <p key={i} className={i === visibleLines.length - 1 ? "animate-pulse" : ""}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="font-mono font-bold text-3xl md:text-5xl text-[#F8FAFC] leading-tight mb-4">
          Réussir ton BTS SIO,{" "}
          <span className="text-[#22C55E]">module par module.</span>
        </h1>
        <p className="text-[#94A3B8] font-sans text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Cours, QCM, TP guidés et simulateur d'oral basés sur le référentiel
          officiel de l'Éducation Nationale.
        </p>
      </div>

      {/* Option Cards */}
      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {/* SISR */}
        <Link
          href="/sisr"
          className="group rounded-xl border border-[#22C55E]/30 bg-[#22C55E]/5 p-6 hover:bg-[#22C55E]/10 hover:border-[#22C55E]/60 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-[#22C55E]/20">
              <Network className="w-6 h-6 text-[#22C55E]" />
            </div>
            <div>
              <p className="font-mono font-bold text-[#22C55E]">SISR</p>
              <p className="text-xs text-[#94A3B8] font-sans">Infrastructure & Réseaux</p>
            </div>
          </div>
          <p className="text-sm text-[#94A3B8] font-sans leading-relaxed mb-4">
            Windows Server, Linux, Routage, VLANs, Firewall, VPN, Cybersécurité infra.
          </p>
          <span className="inline-flex items-center gap-1 text-[#22C55E] text-sm font-semibold group-hover:gap-2 transition-all">
            Commencer SISR <ChevronRight size={16} />
          </span>
        </Link>

        {/* SLAM */}
        <Link
          href="/slam"
          className="group rounded-xl border border-[#8B5CF6]/30 bg-[#8B5CF6]/5 p-6 hover:bg-[#8B5CF6]/10 hover:border-[#8B5CF6]/60 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-[#8B5CF6]/20">
              <Code2 className="w-6 h-6 text-[#8B5CF6]" />
            </div>
            <div>
              <p className="font-mono font-bold text-[#8B5CF6]">SLAM</p>
              <p className="text-xs text-[#94A3B8] font-sans">Développement Applicatif</p>
            </div>
          </div>
          <p className="text-sm text-[#94A3B8] font-sans leading-relaxed mb-4">
            POO, SQL, MVC, API REST, Dev Web/Mobile, OWASP, RGPD, Sécurité code.
          </p>
          <span className="inline-flex items-center gap-1 text-[#8B5CF6] text-sm font-semibold group-hover:gap-2 transition-all">
            Commencer SLAM <ChevronRight size={16} />
          </span>
        </Link>
      </div>
    </section>
  );
}
