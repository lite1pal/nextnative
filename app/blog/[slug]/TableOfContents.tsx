"use client";

import { useEffect, useState } from "react";

export default function TableOfContents({
  headings,
}: {
  headings: { id: string; text: string; level: string }[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -70% 0px", // trigger a bit before heading hits top
        threshold: 0,
      },
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav className="rounded-x mt-8 p-5">
      <div className="mb-5 flex items-center gap-2 font-medium uppercase">
        <span>Table of Contents</span>
      </div>
      <ul className="space-y-2 text-base">
        {headings.map((h) => (
          <li key={h.id} className={h.level === "h3" ? "ml-4" : ""}>
            <a
              href={`#${h.id}`}
              className={`block transition-colors ${
                activeId === h.id
                  ? "text-primary font-[500]"
                  : "hover:text-primary text-gray-600"
              }`}
            >
              {h.text.replaceAll("#", "")}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
