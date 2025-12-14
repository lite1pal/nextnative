"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function ComponentWrapperClient({
  codeExample,
  children,
}: {
  codeExample: string;
  children: [React.ReactNode, React.ReactNode]; // [Preview, Code]
}) {
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState<"preview" | "code">("preview");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeExample);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {}
  };

  const [previewNode, codeNode] = children;

  return (
    <div className="py-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-1 rounded-xl border border-gray-200 bg-white p-1">
          <button
            type="button"
            onClick={() => setActive("preview")}
            className={[
              "cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium",
              active === "preview"
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-50",
            ].join(" ")}
          >
            Preview
          </button>
          <button
            type="button"
            onClick={() => setActive("code")}
            className={[
              "cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium",
              active === "code"
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-50",
            ].join(" ")}
          >
            Code
          </button>
        </div>

        {active === "code" && (
          <button
            onClick={handleCopy}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50"
            title="Copy code"
            type="button"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>

      {/* Both are ALWAYS rendered (SSR-visible). Only visibility changes. */}
      <div className="mt-4">
        <div className={active === "preview" ? "block" : "hidden"}>
          {previewNode}
        </div>
        <div className={active === "code" ? "block" : "hidden"}>{codeNode}</div>
      </div>
    </div>
  );
}
