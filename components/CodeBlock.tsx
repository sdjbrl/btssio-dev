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
    <div className="rounded-lg overflow-hidden border border-[#475569] my-4">
      {filename && (
        <div className="bg-[#272F42] px-4 py-2 text-xs font-mono text-[#94A3B8] border-b border-[#475569] flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#EF4444]/70 inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#22C55E]/70 inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#8B5CF6]/70 inline-block" />
          <span className="ml-2">{filename}</span>
        </div>
      )}
      <pre className="m-0 overflow-x-auto">
        <code ref={ref} className={`language-${language}`}>{code.trim()}</code>
      </pre>
    </div>
  );
}
