import Link from "next/link";
import { FileText, ExternalLink } from "lucide-react";
import type { Annale } from "@/lib/annales-data";

const EPREUVE_COLORS: Record<string, string> = {
  E4: "bg-blue-900/50 text-blue-300 border-blue-700",
  E5: "bg-green-900/50 text-green-300 border-green-700",
  E6: "bg-red-900/50 text-red-300 border-red-700",
  TC: "bg-yellow-900/50 text-yellow-300 border-yellow-700",
};

const OPTION_COLORS: Record<string, string> = {
  SISR: "bg-emerald-900/40 text-emerald-300",
  SLAM: "bg-purple-900/40 text-purple-300",
  Commun: "bg-gray-800 text-gray-400",
};

interface Props {
  annale: Annale;
}

export default function AnnaleCard({ annale }: Props) {
  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5 flex flex-col gap-4 hover:border-[#475569] transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex gap-2 flex-wrap">
          <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${EPREUVE_COLORS[annale.epreuve] ?? "bg-gray-800 text-gray-300"}`}>
            {annale.epreuve}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded ${OPTION_COLORS[annale.option]}`}>
            {annale.option}
          </span>
        </div>
        <span className="text-2xl font-bold font-mono text-white shrink-0">{annale.year}</span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-medium text-[#CBD5E1] leading-snug">{annale.title}</h3>

      {/* Themes */}
      <div className="flex flex-wrap gap-1.5">
        {annale.themes.slice(0, 3).map((t) => (
          <span key={t} className="text-xs bg-[#0F172A] text-[#64748B] px-2 py-0.5 rounded">
            {t}
          </span>
        ))}
        {annale.themes.length > 3 && (
          <span className="text-xs text-[#475569]">+{annale.themes.length - 3}</span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-2 border-t border-[#334155]">
        <a
          href={annale.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#0F172A] hover:bg-[#1E293B] border border-[#334155] hover:border-[#475569] text-[#94A3B8] rounded-lg transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Page Eduscol
        </a>
        <Link
          href={`/annales/${annale.id}`}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors ml-auto"
        >
          <FileText className="w-3 h-3" />
          Réviser →
        </Link>
      </div>
    </div>
  );
}
