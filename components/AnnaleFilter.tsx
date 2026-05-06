"use client";

interface Filters {
  year: string;
  epreuve: string;
  option: string;
}

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
  totalCount: number;
}

const YEARS = ["Toutes", "2024", "2023", "2022", "2021", "2020", "2019"];
const EPREUVES = ["Toutes", "E4", "E5", "E6", "TC"];
const OPTIONS = ["Tous", "SISR", "SLAM", "Commun"];

export default function AnnaleFilter({ filters, onChange, totalCount }: Props) {
  const select = (field: keyof Filters, value: string) =>
    onChange({ ...filters, [field]: value });

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 mb-8">
      <div className="flex flex-wrap gap-4 items-end">
        <FilterGroup
          label="Année"
          values={YEARS}
          current={filters.year}
          onChange={(v) => select("year", v)}
        />
        <FilterGroup
          label="Épreuve"
          values={EPREUVES}
          current={filters.epreuve}
          onChange={(v) => select("epreuve", v)}
        />
        <FilterGroup
          label="Option"
          values={OPTIONS}
          current={filters.option}
          onChange={(v) => select("option", v)}
        />
        <span className="text-sm text-[#64748B] ml-auto self-center">
          {totalCount} sujet{totalCount > 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  values,
  current,
  onChange,
}: {
  label: string;
  values: string[];
  current: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs text-[#64748B] font-medium">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {values.map((v) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={`px-3 py-1 text-xs rounded-lg border transition-colors ${
              current === v
                ? "bg-blue-600 border-blue-500 text-white"
                : "bg-[#0F172A] border-[#334155] text-[#94A3B8] hover:border-[#475569]"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
