interface Props {
  items: Array<{ label: string; value: string; code?: boolean }>;
  title?: string;
}

export default function CheatSheet({ items, title }: Props) {
  return (
    <div>
      {title && (
        <h3 className="text-[#8B5CF6] font-semibold text-lg mb-4">{title}</h3>
      )}
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li
            key={`${item.label}-${i}`}
            className="pb-3 border-b border-[#1E293B] last:border-b-0 last:pb-0"
          >
            <div className="text-[#94A3B8] text-sm mb-1">{item.label}</div>
            <div className="text-sm">
              {item.code ? (
                <code className="bg-[#1E293B] px-1 rounded font-mono text-[#22C55E] text-sm">
                  {item.value}
                </code>
              ) : (
                <span className="text-[#E2E8F0]">{item.value}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
