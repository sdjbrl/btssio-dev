"use client";

import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { getAnnaleById } from "@/lib/annales-data";
import { ChevronDown, ChevronRight, ExternalLink, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function AnnaleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const annale = getAnnaleById(id);

  if (!annale) notFound();

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <Link
          href="/annales"
          className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux annales
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded border bg-blue-900/50 text-blue-300 border-blue-700">
              {annale.epreuve}
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-400">
              {annale.option}
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#1E293B] text-[#94A3B8]">
              {annale.year}
            </span>
          </div>
          <h1 className="text-3xl font-bold font-mono mb-4">{annale.title}</h1>

          {/* Themes */}
          <div className="flex flex-wrap gap-2 mb-6">
            {annale.themes.map((t) => (
              <span key={t} className="text-xs bg-[#1E293B] text-[#94A3B8] border border-[#334155] px-2 py-1 rounded">
                {t}
              </span>
            ))}
          </div>

          <a
            href={annale.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E293B] border border-[#334155] hover:border-[#475569] text-sm text-[#94A3B8] rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Voir le sujet officiel (PDF Eduscol)
          </a>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold font-mono mb-6 text-[#CBD5E1]">
            Questions et corrections
          </h2>
          {annale.questions.map((q) => (
            <QuestionAccordion key={q.id} question={q} />
          ))}
        </div>

        <p className="mt-10 text-xs text-[#475569] border-t border-[#1E293B] pt-6">
          ⚠️ Corrigé indicatif non officiel — reformulé à des fins pédagogiques.
        </p>
      </div>
    </div>
  );
}

function QuestionAccordion({
  question,
}: {
  question: { id: string; numero: string; intitule: string; bareme: number; correction: string };
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[#334155] rounded-xl overflow-hidden">
      {/* Question header */}
      <div className="bg-[#1E293B] p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <span className="text-xs font-mono text-blue-400 font-bold">{question.numero}</span>
          <span className="text-xs text-[#64748B] shrink-0">{question.bareme} pts</span>
        </div>
        <p className="text-sm text-[#CBD5E1] leading-relaxed">{question.intitule}</p>
      </div>

      {/* Correction toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3 bg-[#0F172A] border-t border-[#334155] text-sm text-[#64748B] hover:text-white hover:bg-[#1E293B] transition-colors"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          {open ? "Masquer la correction" : "Voir la correction indicative"}
        </span>
      </button>

      {open && (
        <div className="p-5 bg-[#0F172A] border-t border-[#334155] prose prose-invert prose-sm max-w-none
          prose-code:bg-[#1E293B] prose-code:px-1 prose-code:rounded prose-code:text-green-300
          prose-pre:bg-[#1E293B] prose-pre:border prose-pre:border-[#334155]">
          <ReactMarkdown>{question.correction}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
