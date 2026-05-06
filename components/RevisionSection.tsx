"use client";

interface Props {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  accent?: "sisr" | "slam" | "cyber";
  children: React.ReactNode;
}

const accentStyles = {
  sisr:  { border: "border-[#22C55E]/40", bg: "bg-[#22C55E]/5",  title: "text-[#22C55E]",  icon: "text-[#22C55E]"  },
  slam:  { border: "border-[#8B5CF6]/40", bg: "bg-[#8B5CF6]/5",  title: "text-[#8B5CF6]",  icon: "text-[#8B5CF6]"  },
  cyber: { border: "border-[#00FF41]/40", bg: "bg-[#00FF41]/5",  title: "text-[#00FF41]",  icon: "text-[#00FF41]"  },
};

export default function RevisionSection({ title, subtitle, icon, accent = "slam", children }: Props) {
  const s = accentStyles[accent];
  return (
    <section className={`rounded-xl border ${s.border} ${s.bg} p-6 mb-8`}>
      <div className="flex items-center gap-3 mb-4">
        {icon && <span className={s.icon}>{icon}</span>}
        <div>
          <h2 className={`font-mono font-bold text-lg ${s.title}`}>{title}</h2>
          {subtitle && <p className="text-xs text-[#94A3B8] mt-0.5 font-sans">{subtitle}</p>}
        </div>
      </div>
      <div className="font-sans text-sm leading-relaxed text-[#F8FAFC]/90">{children}</div>
    </section>
  );
}
