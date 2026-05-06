"use client";

import Link from "next/link";

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  href: string;
  option: "SISR" | "SLAM" | "cyber" | "commun";
  badge?: string;
}

const accentColors = {
  SISR: "#22C55E",
  SLAM: "#8B5CF6",
  cyber: "#00FF41",
  commun: "#0EA5E9",
};

export default function ModuleCard({
  title,
  description,
  icon,
  progress,
  href,
  option,
  badge,
}: Props) {
  const accent = accentColors[option];
  const normalizedProgress = Math.max(0, Math.min(100, progress ?? 0));

  return (
    <Link
      href={href}
      className="block bg-[#1E293B] border border-[#334155] rounded-xl p-5 transition-all duration-300 hover:border-[var(--accent)] hover:bg-[#1E293B]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 flex-1">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
            style={{ backgroundColor: `${accent}20` }}
          >
            <span style={{ color: accent }}>{icon}</span>
          </div>
          <h3 className="text-white font-bold text-base">{title}</h3>
        </div>
        {badge && (
          <span
            className="px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
            style={{
              backgroundColor: `${accent}20`,
              color: accent,
            }}
            aria-label={`Badge : ${badge}`}
          >
            {badge}
          </span>
        )}
      </div>

      <p className="text-[#94A3B8] text-sm mt-2 mb-4">{description}</p>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[#64748B] text-xs">Progression</span>
          <span className="text-[#64748B] text-xs font-semibold">
            {normalizedProgress}%
          </span>
        </div>
        <div
          className="w-full bg-[#0F172A] rounded-full h-2 overflow-hidden"
          role="progressbar"
          aria-valuenow={normalizedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progression du module : ${normalizedProgress}%`}
        >
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${normalizedProgress}%`,
              backgroundColor: accent,
            }}
          />
        </div>
      </div>
    </Link>
  );
}
