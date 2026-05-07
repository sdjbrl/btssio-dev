"use client";
import { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-markup-templating"; // required by prism-php
import "prismjs/components/prism-php";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-powershell";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";

interface Props {
  code: string;
  language: string;
  filename?: string;
}

export default function CodeBlock({ code, language, filename }: Props) {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. HTTP context, denied permission)
      console.warn("Clipboard copy failed");
    }
  };

  return (
    <div className="bg-[#0D1117] border border-[#30363D] rounded-lg overflow-hidden">
      <div className="bg-[#161B22] flex justify-between items-center px-4 py-2">
        <div>
          {filename && (
            <span className="text-[#8B949E] text-sm font-mono">{filename}</span>
          )}
        </div>
        <div className="flex items-center">
          <span className="text-[#58A6FF] text-xs uppercase bg-[#21262D] px-2 py-1 rounded">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="text-[#8B949E] hover:text-white ml-2 text-sm"
          >
            {copied ? "✅" : "📋"}
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto p-4 text-sm font-mono">
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}
