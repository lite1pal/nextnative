"use client";

import { useMemo, useState } from "react";
import HighlightedSpan from "@/components/HighlightedSpan";

type Idea = {
  title: string;
  tagline: string;
  description: string;
  category: string;
  target: string;
  monetization: string;
  coreFeatures: string[];
};

const categories = [
  "Productivity",
  "Health & Fitness",
  "Finance",
  "Education",
  "Creator Tools",
  "Travel",
  "Wellness",
  "AI Utilities",
  "Developer Tools",
  "Photo & Video",
  "Local Services",
  "Lifestyle",
  "Kids & Family",
  "Sports",
  "Music",
];

const targets = [
  "indie makers",
  "remote teams",
  "students",
  "content creators",
  "parents",
  "freelancers",
  "travelers",
  "busy professionals",
  "runners",
  "gamers",
  "small businesses",
  "teachers",
  "designers",
  "developers",
  "book lovers",
];

const nouns = [
  "Pulse",
  "Sprout",
  "Loop",
  "Forge",
  "Spark",
  "Pilot",
  "Nest",
  "Beam",
  "Flow",
  "Mint",
  "Hatch",
  "Shift",
  "Drift",
  "Glow",
  "Bloom",
  "Dash",
  "Mate",
  "Mark",
  "Stack",
  "Pilot",
  "Vault",
  "Quest",
  "Buddy",
  "Craft",
  "Deck",
];

const adjectives = [
  "Quick",
  "Calm",
  "Clever",
  "Daily",
  "Pocket",
  "Native",
  "Bright",
  "Simple",
  "Prime",
  "Magic",
  "Mighty",
  "Silent",
  "Swift",
  "Neo",
  "Hyper",
  "True",
  "Open",
];

const problems = [
  "habits don’t stick",
  "budgeting is hard",
  "planning takes too long",
  "ideas get lost",
  "focus is difficult",
  "learning is boring",
  "photos pile up",
  "travel planning is messy",
  "meal plans fail",
  "inbox overload",
  "not enough exercise",
  "sleep is irregular",
  "documentation is scattered",
  "kids’ chores are chaotic",
  "language practice is inconsistent",
];

const features = [
  "streaks & reminders",
  "AI summaries",
  "offline-first storage",
  "camera-based input",
  "GPS & maps",
  "voice-to-text",
  "calendar sync",
  "shared workspaces",
  "push notifications",
  "widgets",
  "scanning & OCR",
  "QR sharing",
  "AR overlays",
  "background processing",
  "cloud backup",
  "Markdown notes",
  "tagging & smart search",
];

const monetizations = [
  "freemium + $3.99/mo Pro",
  "one-time $9.99",
  "ads + $2.99 remove-ads",
  "team plan $4/user",
  "$19 lifetime",
  "$29/yr subscription",
  "tips only (no paywall)",
  "marketplace commission 10%",
];

function random<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function titleCase(s: string) {
  return s
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function AppIdeaGenerator() {
  const [seed, setSeed] = useState(() => Date.now());

  const idea: Idea = useMemo(() => {
    // generate a reproducible-ish idea from seed
    const rng = (max: number, i: number) =>
      ((Math.abs(Math.sin(seed + i)) % 1) * max) | 0;

    const cat = categories[rng(categories.length, 1)];
    const tar = targets[rng(targets.length, 2)];
    const prob = problems[rng(problems.length, 3)];

    const name = `${random(adjectives)} ${random(nouns)}`;
    const unique = new Set<string>();
    while (unique.size < 4) unique.add(random(features));
    const feats = Array.from(unique);

    const monet = random(monetizations);

    return {
      title: titleCase(name),
      tagline: `${titleCase(cat)} app for ${tar}`,
      description: `Solve the problem that "${prob}". The app helps ${tar} with ${feats[0]} and ${feats[1]}, while staying simple and fast.`,
      category: cat,
      target: tar,
      monetization: monet,
      coreFeatures: feats,
    };
  }, [seed]);

  const exportIdea = () => {
    const blob = new Blob([JSON.stringify(idea, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${idea.title.replace(/\s+/g, "-").toLowerCase()}-idea.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto w-full max-w-[962px] py-12 xl:max-w-[1260px]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 py-10 text-center">
          <h1 className="mb-4 text-4xl font-semibold text-gray-900 md:text-[74px] md:leading-[91px]">
            App Idea <HighlightedSpan>Generator</HighlightedSpan> 💡
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600">
            Press generate to get a fresh, buildable app idea with features and
            monetization strategy.
          </p>

          {/* Social proof / usage stats */}
          <div className="mx-auto flex flex-wrap items-center justify-center gap-6 text-base text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                💡
              </span>
              <span>
                <strong className="text-gray-900">Buildable</strong> ideas
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                🎯
              </span>
              <span>
                <strong className="text-gray-900">Target</strong> audience
              </span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-3xl" aria-hidden="true">
                💰
              </span>
              <span>
                <strong className="text-gray-900">Monetization</strong> included
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex justify-center gap-3">
            <button
              onClick={() => setSeed(Date.now())}
              className="rounded-xl bg-green-600 px-5 py-2.5 font-semibold text-white hover:bg-green-700"
            >
              Generate idea
            </button>
            <button
              onClick={() =>
                navigator.clipboard.writeText(`${idea.title} — ${idea.tagline}`)
              }
              className="rounded-xl border border-green-600 px-5 py-2.5 font-semibold text-green-600 hover:bg-green-50"
            >
              Copy title
            </button>
            <button
              onClick={exportIdea}
              className="rounded-xl border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-50"
            >
              Download JSON
            </button>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900">
              {idea.title}
            </h2>
            <p className="mt-1 text-gray-600">{idea.tagline}</p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-4">
                <div className="text-sm text-gray-500">Category</div>
                <div className="text-base font-medium">{idea.category}</div>
              </div>
              <div className="rounded-xl bg-gray-50 p-4">
                <div className="text-sm text-gray-500">Target audience</div>
                <div className="text-base font-medium">{idea.target}</div>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 sm:col-span-2">
                <div className="text-sm text-gray-500">Monetization</div>
                <div className="text-base font-medium">{idea.monetization}</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm text-gray-500">Core features</div>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-800">
                {idea.coreFeatures.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <div className="text-sm text-gray-500">Why it matters</div>
              <p className="mt-2 text-gray-800">{idea.description}</p>
            </div>
          </div>

          <p className="mt-10 text-center text-lg text-gray-500">
            Like this idea?{" "}
            <a
              href="https://nextnative.dev"
              className="font-semibold text-green-600 underline hover:text-green-700"
            >
              Turn it into a real iOS & Android app with NextNative
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
