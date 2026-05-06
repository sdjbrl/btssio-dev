"use client";

import { useState, useMemo } from "react";
import { annales } from "@/lib/annales-data";
import AnnaleCard from "@/components/AnnaleCard";
import AnnaleFilter from "@/components/AnnaleFilter";
import { BookMarked } from "lucide-react";

interface Filters {
  year: string;
  epreuve: string;
  option: string;
}

const DEFAULT_FILTERS: Filters = { year: "Toutes", epreuve: "Toutes", option: "Tous" };

export default function AnnalesPage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const filtered = useMemo(() => {
    return annales.filter((a) => {
      if (filters.year !== "Toutes" && a.year !== parseInt(filters.year)) return false;
      if (filters.epreuve !== "Toutes" && a.epreuve !== filters.epreuve) return false;
      if (filters.option !== "Tous" && a.option !== filters.option) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <BookMarked className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold font-mono">Annales BTS SIO</h1>
          </div>
          <p className="text-[#94A3B8] max-w-2xl">
            Anciens sujets d&apos;examen 2019–2024 pour toutes les épreuves (E4, E5, E6) et le tronc commun.
            Questions reformulées + corrections indicatives non officielles.
          </p>
        </div>

        {/* Filters */}
        <AnnaleFilter filters={filters} onChange={setFilters} totalCount={filtered.length} />

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-[#475569]">
            <BookMarked className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>Aucun sujet trouvé pour ces filtres.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((a) => (
              <AnnaleCard key={a.id} annale={a} />
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <p className="mt-12 text-xs text-[#475569] text-center border-t border-[#1E293B] pt-6">
          ⚠️ Les questions sont reformulées à des fins pédagogiques. Les corrections sont indicatives et non officielles.
          Liens PDF vers les sources officielles Eduscol.
        </p>
      </div>
    </div>
  );
}
