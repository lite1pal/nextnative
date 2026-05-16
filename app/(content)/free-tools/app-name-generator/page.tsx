"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import HighlightedSpan from "@/components/HighlightedSpan";

type Idea = {
  name: string;
  tagline: string;
  style: string;
  category: string;
  tlds: string[]; // suggested domains (no live check, purely syntactic)
};

const categories = [
  "Productivity",
  "Health & Fitness",
  "Finance",
  "Education",
  "Creator",
  "Travel",
  "Wellness",
  "AI Utilities",
  "Developer Tools",
  "Photo & Video",
  "Business",
  "Lifestyle",
  "Kids & Family",
  "Sports",
  "Music",
];

const styles = [
  "Short & punchy",
  "Two-word combo",
  "Invented brand",
  "Latin/Greek root",
  "Verb-based",
  "Animal-based",
  "Minimalist",
  "Techy",
  "Friendly",
  "Premium",
];

const syllablesA = [
  "neo",
  "hyper",
  "snap",
  "kit",
  "ship",
  "zap",
  "flux",
  "lite",
  "loop",
  "mint",
  "pulse",
  "tap",
  "task",
  "flow",
  "sync",
  "swipe",
  "spark",
  "pilot",
  "craft",
  "nest",
];
const syllablesB = [
  "mate",
  "ly",
  "hub",
  "ify",
  "able",
  "deck",
  "base",
  "beam",
  "forge",
  "box",
  "pad",
  "lane",
  "lane",
  "mark",
  "stack",
  "cloud",
  "grid",
  "dash",
  "gen",
  "pilot",
];

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function title(s: string) {
  return s.replace(/\b\w/g, (m) => m.toUpperCase());
}
function rand<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function suggestTLDs(name: string) {
  const base = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const roots = [
    `${base}.app`,
    `${base}.io`,
    `${base}.dev`,
    `${base}app.com`,
    `${base}hq.com`,
  ];
  return Array.from(new Set(roots)).slice(0, 5);
}

export default function AppNameGeneratorPage() {
  const [seed, setSeed] = useState(() => Date.now());
  const [topic, setTopic] = useState("notes, tasks, reminders");
  const [vibe, setVibe] = useState("Short & punchy");
  const [cat, setCat] = useState("Productivity");
  const [include, setInclude] = useState("");
  const [avoid, setAvoid] = useState("ai, pro, plus"); // over-used

  const ideas: Idea[] = useMemo(() => {
    const rng = (i: number, max: number) =>
      ((Math.abs(Math.sin(seed + i)) % 1) * max) | 0;
    const tone = vibe || rand(styles);
    const category = cat || rand(categories);

    const forbidden = new Set(
      avoid
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean),
    );
    const must = include
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const out: Idea[] = [];
    for (let i = 0; i < 16; i++) {
      let name = "";
      const mode = rng(i, 4);

      if (mode === 0) {
        // Short brand
        name = title(rand(syllablesA) + rand(syllablesB));
      } else if (mode === 1) {
        // Two-word combo
        const a = cap(rand(syllablesA));
        const b = cap(
          rand(syllablesB).replace(/ly$/, "ly").replace(/ify$/, "ify"),
        );
        name = `${a} ${b}`;
      } else if (mode === 2) {
        // Verb-based
        const verbs = [
          "Focus",
          "Launch",
          "Capture",
          "Sprint",
          "Track",
          "Flow",
          "Glow",
          "Spark",
          "Nest",
          "Forge",
        ];
        const suffix = ["Now", "Mate", "Kit", "Buddy", "Lab", "Box"];
        name = `${rand(verbs)} ${rand(suffix)}`;
      } else {
        // Invented brand
        const pool = [
          "Astra",
          "Nexa",
          "Vela",
          "Luma",
          "Kairo",
          "Hava",
          "Aero",
          "Sola",
          "Vivo",
          "Miro",
          "Ovi",
          "Zeno",
        ];
        name = rand(pool);
      }

      // Ensure includes/excludes
      if (must.length) {
        const hasAll = must.every((m) =>
          name.toLowerCase().includes(m.toLowerCase()),
        );
        if (!hasAll) name = `${cap(must[0])} ${name}`;
      }
      if (
        Array.from(forbidden).some((f) => f && name.toLowerCase().includes(f))
      ) {
        i--;
        continue;
      }

      const tagline = `${title(category)} app for ${topic.replace(/\.+$/, "")}.`;
      out.push({
        name,
        tagline,
        style: tone,
        category,
        tlds: suggestTLDs(name),
      });
    }
    return out;
  }, [seed, topic, vibe, cat, include, avoid]);

  const exportCSV = () => {
    const header = "name,tagline,style,category,tlds\n";
    const rows = ideas
      .map((i) => {
        const tlds = `"${i.tlds.join(" | ")}"`;
        return `${i.name.replace(/,/g, "")},${i.tagline.replace(/,/g, "")},${i.style},${i.category},${tlds}`;
      })
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "app-name-ideas.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyList = async () => {
    const txt = ideas.map((i) => `• ${i.name} — ${i.tagline}`).join("\n");
    await navigator.clipboard.writeText(txt);
  };

  return (
    <div className="mx-auto w-full max-w-[962px] py-12 xl:max-w-[1260px]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 py-10 text-center">
          <h1 className="mb-4 text-4xl font-semibold text-gray-900 md:text-[74px] md:leading-[91px]">
            App Name <HighlightedSpan>Generator</HighlightedSpan> 🔤
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600">
            Get brandable app name ideas in seconds. Choose your vibe, add
            required words, and grab domain suggestions. 100% free.
          </p>

          {/* Social proof / usage stats */}
          <div className="mx-auto flex flex-wrap items-center justify-center gap-6 text-base text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                🔤
              </span>
              <span>
                <strong className="text-gray-900">Brandable</strong> names
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                ⚡
              </span>
              <span>
                <strong className="text-gray-900">Domain</strong> suggestions
              </span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-3xl" aria-hidden="true">
                ✨
              </span>
              <span>
                <strong className="text-gray-900">Custom</strong> vibes
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex flex-col">
              <span className="mb-1 text-sm font-medium">
                What does your app do?
              </span>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white p-2"
                placeholder="notes, tasks, reminders"
              />
            </label>

            <label className="flex flex-col">
              <span className="mb-1 text-sm font-medium">Category</span>
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white p-2"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col">
              <span className="mb-1 text-sm font-medium">Name style</span>
              <select
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white p-2"
              >
                {styles.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col">
              <span className="mb-1 text-sm font-medium">
                Must include (comma-separated)
              </span>
              <input
                value={include}
                onChange={(e) => setInclude(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white p-2"
                placeholder="notes, fit, cash"
              />
            </label>

            <label className="flex flex-col">
              <span className="mb-1 text-sm font-medium">
                Avoid words (comma-separated)
              </span>
              <input
                value={avoid}
                onChange={(e) => setAvoid(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white p-2"
                placeholder="ai, pro, plus"
              />
              <span className="mt-1 text-xs text-gray-500">
                Tip: remove overused suffixes to look original.
              </span>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-gray-500">
              Generating <strong>16</strong> names per click.
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSeed(Date.now())}
                className="rounded-xl bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
              >
                Generate names
              </button>
              <button
                onClick={copyList}
                className="rounded-xl border border-green-600 px-4 py-2 font-semibold text-green-700 hover:bg-green-50"
              >
                Copy list
              </button>
              <button
                onClick={exportCSV}
                className="rounded-xl border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50"
              >
                Download CSV
              </button>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {ideas.map((i, idx) => (
            <article
              key={idx}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {i.name}
                </h3>
                <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-green-200">
                  {i.style}
                </span>
              </div>
              <p className="mt-1 text-gray-600">{i.tagline}</p>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                {i.tlds.map((d) => (
                  <span
                    key={d}
                    className="rounded-lg bg-gray-50 px-2 py-1 text-gray-700 ring-1 ring-gray-200"
                  >
                    {d}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => navigator.clipboard.writeText(i.name)}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Copy name
                </button>
                <a
                  href={`/free-tools/app-store-metadata-generator?title=${encodeURIComponent(i.name)}&subtitle=${encodeURIComponent(i.tagline)}`}
                  className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-700"
                >
                  Generate metadata →
                </a>
              </div>
            </article>
          ))}
        </section>

        <p className="mt-10 text-center text-gray-500">
          Found a winner?{" "}
          <Link
            href="/#pricing"
            className="font-semibold text-green-600 underline"
          >
            Get the NextNative Starter
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
