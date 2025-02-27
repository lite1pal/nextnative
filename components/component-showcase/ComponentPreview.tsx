"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ComponentPreviewProps {
  name: string;
  description: string;
  component: React.ReactNode;
  code: string;
}

export default function ComponentPreview({
  name,
  description,
  component,
  code,
}: ComponentPreviewProps) {
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden ">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-[500] mb-2">{name}</h3>
          <p className="text-gray">{description}</p>
        </div>

        <button
          onClick={() => setIsCodeVisible(!isCodeVisible)}
          className="text-primary cursor-pointer hover:text-primary/80"
        >
          {isCodeVisible ? "Hide Code" : "View Code"}
        </button>
      </div>

      <div className="relative mt-5">
        <div className="sm:bg-white min-h-[300px]">{component}</div>

        {isCodeVisible && (
          <div className="absolute inset-0 z-[99] bg-gray-900 text-white overflow-auto">
            <div className="sticky top-0 flex justify-between items-center bg-gray-800 p-4">
              <span className="text-sm">Component Code</span>
              <button
                onClick={copyCode}
                className="px-3 py-1 text-sm bg-gray-700 rounded hover:bg-gray-600"
              >
                {isCopied ? "Copied!" : "Copy"}
              </button>
            </div>
            <SyntaxHighlighter language="javascript" style={nightOwl}>
              {code}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    </div>
  );
}
