"use client";
import { useState } from "react";
import type { QuizQuestion } from "@/lib/quiz-data";

interface Props {
  question: QuizQuestion;
  onComplete: (correct: boolean) => void;
}

export default function QuizCard({ question, onComplete }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleChoice = (index: number) => {
    setSelectedIndex(index);
    setAnswered(true);
  };

  const handleNext = () => {
    onComplete(selectedIndex === question.correct);
  };

  return (
    <div className="rounded-lg border border-[#475569] bg-[#1B2336] p-6 mb-4">
      <p className="font-sans font-medium text-[#F8FAFC] text-base leading-relaxed mb-4">
        {question.question}
      </p>

      <div className="grid gap-2 mb-4">
        {question.choices.map((choice, i) => {
          let style = "border-[#475569] bg-[#272F42] text-[#94A3B8]";
          
          if (answered) {
            if (i === question.correct) {
              style = "bg-[#22C55E]/20 border-[#22C55E] text-[#22C55E]";
            } else if (i === selectedIndex) {
              style = "bg-[#EF4444]/20 border-[#EF4444] text-[#EF4444]";
            }
          } else {
            style += " hover:border-[#94A3B8]";
          }

          return (
            <button
              key={i}
              onClick={() => !answered && handleChoice(i)}
              disabled={answered}
              className={`w-full text-left text-sm px-4 py-3 rounded-md border transition-all font-sans ${style} disabled:cursor-default`}
            >
              <span className="font-mono mr-2 text-xs opacity-60">
                {String.fromCharCode(97 + i)})
              </span>
              {choice}
            </button>
          );
        })}
      </div>

      {answered && (
        <>
          <div className="mt-4 p-4 rounded-md text-sm font-sans bg-[#1E293B] text-[#E2E8F0] border border-[#475569]">
            <p className="opacity-90 leading-relaxed">{question.explanation}</p>
          </div>
          <button
            onClick={handleNext}
            className="mt-4 px-6 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-md text-sm font-medium transition-colors"
          >
            Suivant →
          </button>
        </>
      )}
    </div>
  );
}
