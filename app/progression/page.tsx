"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trophy, BookOpen, CheckCircle2, Circle } from "lucide-react";

const modules = [
  { label: "Tronc Commun — Bloc 1", href: "/tronc-commun", key: "tronc-commun" },
  { label: "SISR — Bloc 2", href: "/sisr/bloc2", key: "sisr-bloc2" },
  { label: "SISR — Bloc 3 Cybersécurité", href: "/sisr/bloc3", key: "sisr-bloc3" },
  { label: "SLAM — Bloc 2", href: "/slam/bloc2", key: "slam-bloc2" },
  { label: "SLAM — Bloc 3 Cybersécurité", href: "/slam/bloc3", key: "slam-bloc3" },
  { label: "Préparation aux Épreuves", href: "/examens", key: "examens" },
];

interface Progress {
  [key: string]: number;
}

export default function ProgressionPage() {
  const [progress, setProgress] = useState<Progress>({});

  useEffect(() => {
    let parsed: Progress = {};
    try {
      const stored = localStorage.getItem("btssio-progress");
      if (stored) parsed = JSON.parse(stored) as Progress;
    } catch {
      // localStorage unavailable
    }
    // Reading localStorage after mount — safe pattern, setState intentional
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(parsed);
  }, []);

  const completed = modules.filter((m) => (progress[m.key] ?? 0) >= 100).length;
  const total = modules.length;
  const globalPct = Math.round((completed / total) * 100);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono mb-2">Ma Progression</h1>
          <p className="text-[#94A3B8]">Suivi de ta révision par module</p>
        </div>

        {/* Global progress */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <Trophy className="w-6 h-6 text-[#F59E0B]" />
            <span className="font-semibold">Progression globale</span>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-2">
            <span className="text-sm text-[#94A3B8]">{completed} / {total} modules terminés</span>
            <span className="text-sm font-mono font-bold text-[#22C55E]">{globalPct}%</span>
          </div>
          <div className="h-2 bg-[#334155] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] rounded-full transition-all duration-500"
              style={{ width: `${globalPct}%` }}
            />
          </div>
        </div>

        {/* Module list */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {modules.map((mod) => {
            const pct = progress[mod.key] ?? 0;
            const done = pct >= 100;
            return (
              <Link
                key={mod.key}
                href={mod.href}
                className="flex flex-col gap-4 p-4 sm:p-5 bg-[#1E293B] border border-[#334155] hover:border-[#475569] rounded-xl transition-all group sm:flex-row sm:items-center"
              >
                {done ? (
                  <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-[#475569] shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-1.5">
                    <span className="text-sm font-medium truncate">{mod.label}</span>
                    <span className="text-xs font-mono text-[#94A3B8] ml-2">{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-[#334155] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#22C55E] rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <BookOpen className="w-4 h-4 text-[#475569] group-hover:text-white transition-colors shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
