"use client";

interface Props {
  badges?: string[];
}

const BADGE_DEFS = [
  {
    id: "maitre-owasp",
    label: "Maître OWASP",
    emoji: "🛡️",
    desc: "Score 80%+ en sécurité applicative",
  },
  {
    id: "gardien-donnees",
    label: "Gardien des Données",
    emoji: "🔒",
    desc: "Tous les modules Bloc 3 complétés à 100%",
  },
  {
    id: "expert-reseau",
    label: "Expert Réseau",
    emoji: "🌐",
    desc: "Tous les modules SISR complétés",
  },
  {
    id: "as-du-sql",
    label: "As du SQL",
    emoji: "🗄️",
    desc: "Quiz SQL complété avec 100%",
  },
  {
    id: "hacker-ethique",
    label: "Hacker Éthique",
    emoji: "💻",
    desc: "Module cybersécurité terminé",
  },
];

export default function BadgesSection({ badges = [] }: Props) {
  const earnedCount = badges.length;
  const totalBadges = BADGE_DEFS.length;

  return (
    <section className="mb-8">
      <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
        <span>🏆</span>
        Mes Badges
      </h2>

      <div className="flex flex-wrap gap-3 mb-4">
        {BADGE_DEFS.map((badge) => {
          const isEarned = badges.includes(badge.id);

          return (
            <div
              key={badge.id}
              className={`rounded-xl p-4 w-36 text-center transition-all ${
                isEarned
                  ? "bg-[#1E293B] border border-[#334155]"
                  : "bg-[#0F172A] border border-[#1E293B] opacity-40 grayscale"
              }`}
              role="article"
              aria-label={`${badge.label} — ${isEarned ? 'obtenu' : 'non obtenu'}`}
            >
              <div className="text-4xl mb-2" aria-hidden="true">
                {isEarned ? badge.emoji : "🔐"}
              </div>
              <div className="text-white font-semibold text-sm mb-1">
                {badge.label}
              </div>
              <div className="text-[#64748B] text-xs">{badge.desc}</div>
            </div>
          );
        })}
      </div>

      <div className="text-[#94A3B8] text-sm">
        {earnedCount}/{totalBadges} badges obtenus
      </div>
    </section>
  );
}
