export interface UserProgress {
  option: "SISR" | "SLAM" | null;
  modules: Record<string, number>; // moduleId → % completion 0-100
  streak: number;
  lastVisit: string; // ISO date
  badges: string[];
}

const KEY = "btssio_progress";

export function getProgress(): UserProgress {
  if (typeof window === "undefined") return defaultProgress();
  try {
    const stored = localStorage.getItem(KEY);
    return stored ? JSON.parse(stored) : defaultProgress();
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(p: UserProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function setOption(option: "SISR" | "SLAM"): void {
  const p = getProgress();
  saveProgress({ ...p, option });
}

export function updateModuleProgress(moduleId: string, pct: number): void {
  const p = getProgress();
  p.modules[moduleId] = Math.min(100, Math.max(0, pct));
  checkBadges(p);
  saveProgress(p);
}

function checkBadges(p: UserProgress): void {
  const allBloc3 = ["bloc3-slam-owasp", "bloc3-slam-rgpd", "bloc3-slam-auth", "bloc3-slam-comms", "bloc3-slam-bdd"];
  if (allBloc3.every((id) => (p.modules[id] ?? 0) >= 100) && !p.badges.includes("gardien-donnees")) {
    p.badges.push("gardien-donnees");
  }
  if ((p.modules["bloc3-slam-owasp"] ?? 0) >= 80 && !p.badges.includes("maitre-owasp")) {
    p.badges.push("maitre-owasp");
  }
}

function defaultProgress(): UserProgress {
  return { option: null, modules: {}, streak: 0, lastVisit: "", badges: [] };
}
