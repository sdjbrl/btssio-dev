"use client";
import { useState, useEffect } from "react";

interface Question {
  question: string;
  hint: string;
}

interface Props {
  questions: Question[];
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function OralSimulator({ questions }: Props) {
  const [shuffledQuestions] = useState<Question[]>(() => shuffleArray(questions));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setCurrentIndex((i) => Math.min(i + 1, shuffledQuestions.length - 1));
        setShowHint(false);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setCurrentIndex((i) => Math.max(i - 1, 0));
        setShowHint(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [shuffledQuestions.length]);

  if (shuffledQuestions.length === 0) {
    return (
      <div className="rounded-lg border border-[#475569] bg-[#1E293B] p-6" role="alert">
        <p className="text-[#94A3B8]">Aucune question disponible.</p>
      </div>
    );
  }

  const current = shuffledQuestions[currentIndex];

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowHint(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowHint(false);
    }
  };

  return (
    <div className="rounded-lg border border-[#475569] bg-[#1E293B] p-6">
      <h3 className="text-[#8B5CF6] font-semibold text-lg mb-4 flex items-center gap-2">
        <span>🎤</span>
        <span>Simulateur d&apos;Oral</span>
      </h3>

      <div className="mb-6" aria-live="polite" aria-atomic="true">
        <p className="text-xl text-white leading-relaxed mb-4">
          {current.question}
        </p>

        <button
          onClick={() => setShowHint(!showHint)}
          className="text-sm text-[#8B5CF6] hover:text-[#7C3AED] transition-colors"
        >
          {showHint ? "Masquer l'indice" : "Voir un indice"}
        </button>

        {showHint && (
          <div className="mt-3 p-3 rounded-md bg-[#272F42] border border-[#475569]">
            <p className="text-sm text-[#94A3B8] italic">{current.hint}</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-4 py-2 text-sm rounded-md bg-[#272F42] text-[#94A3B8] hover:bg-[#334155] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Question précédente
        </button>

        <p className="text-sm text-[#94A3B8]">
          Question {currentIndex + 1} / {shuffledQuestions.length}
        </p>

        <button
          onClick={handleNext}
          disabled={currentIndex === shuffledQuestions.length - 1}
          className="px-4 py-2 text-sm rounded-md bg-[#272F42] text-[#94A3B8] hover:bg-[#334155] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Question suivante →
        </button>
      </div>
    </div>
  );
}
