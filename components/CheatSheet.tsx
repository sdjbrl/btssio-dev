interface CheatItem {
  label: string;
  value?: string;
  highlight?: boolean;
  danger?: boolean;
}

interface Props {
  items: CheatItem[];
  columns?: 1 | 2;
}

export default function CheatSheet({ items, columns = 1 }: Props) {
  return (
    <ul className={`grid gap-2 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
      {items.map((item, i) => (
        <li
          key={i}
          className={`flex items-start gap-2 text-sm px-3 py-2 rounded-md border
            ${item.danger
              ? "border-[#EF4444]/30 bg-[#EF4444]/5 text-[#EF4444]"
              : item.highlight
              ? "border-[#22C55E]/30 bg-[#22C55E]/5 text-[#22C55E]"
              : "border-[#475569] bg-[#272F42] text-[#F8FAFC]/80"
            }`}
        >
          <span className="text-[#94A3B8] font-mono text-xs mt-0.5">
            {item.danger ? "✗" : item.highlight ? "✓" : "·"}
          </span>
          <span>
            <span className="font-semibold">{item.label}</span>
            {item.value && <span className="text-[#94A3B8] ml-1">— {item.value}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}
