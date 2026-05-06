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
    <div className="rounded-lg border border-[#475569] bg-[#1B2336] p-6 mb-4">
      <div className="flex items-start gap-3 mb-4">
        <HelpCircle className="w-5 h-5 text-[#8B5CF6] mt-0.5 shrink-0" />
        <p className="font-sans font-medium text-[#F8FAFC] text-sm leading-relaxed">
          <span className="text-[#94A3B8] text-xs mr-2">Q{number}.</span>
          {question.question}
        </p>
      </div>

      <div className="grid gap-2">
        {question.choices.map((choice, i) => {
          let style = "border-[#475569] bg-[#272F42] text-[#94A3B8] hover:border-[#94A3B8]";
          if (selected !== null) {
            if (i === question.correct) style = "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]";
            else if (i === selected && !isCorrect) style = "border-[#EF4444] bg-[#EF4444]/10 text-[#EF4444]";
          }
          return (
            <button
              key={i}
              onClick={() => selected === null && setSelected(i)}
              disabled={selected !== null}
              className={`w-full text-left text-sm px-4 py-3 rounded-md border transition-all font-sans ${style} disabled:cursor-default`}
            >
              <span className="font-mono mr-2 text-xs opacity-60">{String.fromCharCode(97 + i)})</span>
              {choice}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className={`mt-4 flex gap-3 p-4 rounded-md text-sm font-sans ${isCorrect ? "bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30" : "bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30"}`}>
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
