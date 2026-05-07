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
    if (!stored) return defaultProgress();
    const parsed = JSON.parse(stored);
    if (typeof parsed !== "object" || parsed === null) {
      console.warn("Progress data has invalid structure, resetting to default");
      return defaultProgress();
    }
    return parsed;
  } catch (err) {
    console.error("Failed to parse progress data:", err);
    return defaultProgress();
  }
}

export function saveProgress(p: UserProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch (err) {
    if (err instanceof Error && err.name === "QuotaExceededError") {
      console.warn("localStorage quota exceeded, cannot save progress:", err);
    } else {
      console.error("Failed to save progress:", err);
    }
  }
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
  const award = (id: string) => { if (!p.badges.includes(id)) p.badges.push(id); };

  // Maître OWASP: SLAM Bloc 3 quiz >= 80%
  if ((p.modules["bloc3-slam-owasp"] ?? 0) >= 80) award("maitre-owasp");

  // Gardien des Données: all SLAM Bloc 3 modules at 100%
  const slamBloc3 = ["bloc3-slam-owasp", "bloc3-slam-rgpd", "bloc3-slam-auth", "bloc3-slam-comms", "bloc3-slam-bdd"];
  if (slamBloc3.every((id) => (p.modules[id] ?? 0) >= 100)) award("gardien-donnees");

  // Expert Réseau: both SISR modules at 100%
  if ((p.modules["sisr-bloc2-admin"] ?? 0) >= 100 && (p.modules["sisr-bloc3-cyber"] ?? 0) >= 100) {
    award("expert-reseau");
  }

  // As du SQL: SLAM Bloc 2 (covers SQL) at 100%
  if ((p.modules["slam-bloc2-dev"] ?? 0) >= 100) award("as-du-sql");

  // Hacker Éthique: both cybersecurity modules at 100%
  if ((p.modules["sisr-bloc3-cyber"] ?? 0) >= 100 && (p.modules["bloc3-slam-owasp"] ?? 0) >= 100) {
    award("hacker-ethique");
  }

  const generalExpertModules = [
    "cejm-marche",
    "cejm-droit",
    "cejm-management",
    "cejm-rh",
    "cejm-finance",
    "anglais-vocabulaire",
    "anglais-comprehension",
    "anglais-expression",
    "maths-algorithmique",
    "cge-methodologie",
  ];

  if (generalExpertModules.every((id) => (p.modules[id] ?? 0) >= 100)) {
    award("expert-general");
  }
}

function defaultProgress(): UserProgress {
  return { option: null, modules: {}, streak: 0, lastVisit: "", badges: [] };
}
