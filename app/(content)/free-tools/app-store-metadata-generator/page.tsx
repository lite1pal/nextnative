"use client";

import { useMemo, useState } from "react";
import HighlightedSpan from "@/components/HighlightedSpan";

type Out = {
  iosTitle: string;
  iosSubtitle: string;
  iosKeywords: string; // CSV (<=100 chars guidance)
  iosDescription: string;

  gpShort: string; // <=80 chars guidance
  gpLong: string;

  categories: string[];
  checklist: string[];
};

const clamp = (s: string, n: number) =>
  s.length <= n ? s : s.slice(0, n - 1) + "…";
const sanitize = (s: string) => s.replace(/\s+/g, " ").trim();
const csv = (arr: string[]) =>
  arr
    .map((x) =>
      x
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim(),
    )
    .filter(Boolean)
    .join(", ");

export default function AppStoreMetadataGenerator() {
  const [name, setName] = useState("NextNative Starter");
  const [oneLiner, setOneLiner] = useState(
    "Ship your Next.js app to iOS & Android with Capacitor.",
  );
  const [features, setFeatures] = useState(
    "Push notifications; Camera & files; In-app purchases; Offline mode",
  );
  const [audience, setAudience] = useState(
    "indie makers, web developers, startups",
  );
  const [keywords, setKeywords] = useState(
    "next.js, capacitor, mobile app, app store, pwa",
  );
  const [tone, setTone] = useState<"friendly" | "professional" | "playful">(
    "friendly",
  );

  const out: Out = useMemo(() => {
    const fList = sanitize(features)
      .split(/[;,\n]/)
      .map((s) => sanitize(s))
      .filter(Boolean)
      .slice(0, 10);

    const kwBase = sanitize(keywords)
      .split(/[;,]/)
      .map((k) => sanitize(k))
      .filter(Boolean);

    // Expand keywords lightly from features/audience
    const extra = [
      ...fList.map((f) => f.split(" ")[0]),
      ...audience.split(/[,\n]/).map((a) => sanitize(a).split(" ")[0]),
    ]
      .map((x) => x.toLowerCase())
      .filter(Boolean);

    const kwAll = Array.from(new Set([...kwBase, ...extra])).slice(0, 20);
    let kwCsv = csv(kwAll);
    if (kwCsv.length > 100) {
      // Trim to ~100 chars (Apple limit)
      kwCsv = kwCsv.slice(0, 100).replace(/[, ]+[^,]*$/, "");
    }

    // Title/subtitle heuristics
    const title = clamp(name, 30);
    const subRaw =
      oneLiner ||
      `${name} — ${fList[0] || "Mobile app"} for ${audience.split(",")[0] || "everyone"}`;
    const subtitle = clamp(subRaw, 30);

    // Tone presets
    const toneLead =
      tone === "friendly"
        ? "Simple, fast, and built for you."
        : tone === "playful"
          ? "No fuss, just ship."
          : "Reliable, documented, production-ready.";

    const sentences = [
      `${name} helps ${audience} ${oneLiner.toLowerCase().replace(/\.$/, "")}.`,
      `Key features include ${fList.slice(0, 3).join(", ")}${
        fList.length > 3 ? `, and more` : ""
      }.`,
      `Built for modern web teams: ${toneLead}`,
      `Start now and publish to the App Store and Google Play.`,
    ];

    const iosDescription = clamp(
      [
        sentences[0],
        "",
        "FEATURES",
        `• ${fList.join("\n• ")}`,
        "",
        sentences[2],
        "",
        sentences[3],
      ].join("\n"),
      4000,
    );

    const gpShort = clamp(oneLiner, 80);
    const gpLong = clamp(
      [
        oneLiner,
        "",
        `Who is it for: ${audience}.`,
        "",
        "Features:",
        ...fList.map((f) => `• ${f}`),
        "",
        toneLead,
        "Get started today.",
      ].join("\n"),
      4000,
    );

    const cats = [
      "Developer Tools",
      "Productivity",
      "Utilities",
      "Business",
      "Education",
    ];

    const checklist = [
      "Screenshots: 6+ per platform (different features)",
      "App icon: 1024×1024 (no transparency)",
      "Privacy policy URL",
      "Short & long description proofread",
      "Accurate age rating & permissions",
      "Keywords (iOS) within 100 chars",
    ];

    return {
      iosTitle: title,
      iosSubtitle: subtitle,
      iosKeywords: kwCsv,
      iosDescription,
      gpShort,
      gpLong,
      categories: cats,
      checklist,
    };
  }, [name, oneLiner, features, audience, keywords, tone]);

  const bundle = useMemo(() => {
    const meta = {
      ios: {
        title: out.iosTitle,
        subtitle: out.iosSubtitle,
        keywords: out.iosKeywords,
        description: out.iosDescription,
        suggestedCategories: out.categories.slice(0, 2),
      },
      googlePlay: {
        shortDescription: out.gpShort,
        fullDescription: out.gpLong,
        suggestedCategories: out.categories.slice(0, 2),
      },
    };
    return JSON.stringify(meta, null, 2);
  }, [out]);

  const download = () => {
    const blob = new Blob([bundle], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "app-store-metadata.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto w-full max-w-[962px] py-12 xl:max-w-[1260px]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 py-10 text-center">
          <h1 className="mb-4 text-4xl font-semibold text-gray-900 md:text-[74px] md:leading-[91px]">
            App Store Metadata <HighlightedSpan>Generator</HighlightedSpan> 📝
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600">
            Create iOS & Google Play titles, subtitles, keywords, and
            descriptions from a few fields. Copy or download JSON.
          </p>

          {/* Social proof / usage stats */}
          <div className="mx-auto flex flex-wrap items-center justify-center gap-6 text-base text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                📝
              </span>
              <span>
                <strong className="text-gray-900">iOS & Android</strong> ready
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                ⚡
              </span>
              <span>
                <strong className="text-gray-900">Instant</strong> generation
              </span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-3xl" aria-hidden="true">
                🎯
              </span>
              <span>
                <strong className="text-gray-900">ASO</strong> optimized
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Inputs */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col">
              <span className="mb-1 font-medium">App name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900"
              />
              <span className="mt-1 text-xs text-gray-400">
                Max 30 chars for iOS title
              </span>
            </label>

            <label className="flex flex-col">
              <span className="mb-1 font-medium">One-line value (tagline)</span>
              <input
                value={oneLiner}
                onChange={(e) => setOneLiner(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900"
              />
            </label>

            <label className="flex flex-col sm:col-span-2">
              <span className="mb-1 font-medium">
                Core features (separate with commas or semicolons)
              </span>
              <input
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900"
              />
            </label>

            <label className="flex flex-col">
              <span className="mb-1 font-medium">Primary audience</span>
              <input
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900"
              />
            </label>

            <label className="flex flex-col">
              <span className="mb-1 font-medium">
                Seed keywords (comma-separated)
              </span>
              <input
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900"
              />
              <span className="mt-1 text-xs text-gray-400">
                We’ll format a 100-char iOS keywords CSV
              </span>
            </label>

            <label className="flex flex-col">
              <span className="mb-1 font-medium">Tone</span>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as any)}
                className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900"
              >
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
                <option value="playful">Playful</option>
              </select>
            </label>
          </div>

          {/* Outputs */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card title="iOS App Store">
              <Field label="Title (≤30)">
                <code className="break-words">{out.iosTitle}</code>
              </Field>
              <Field label="Subtitle (≤30)">
                <code className="break-words">{out.iosSubtitle}</code>
              </Field>
              <Field label="Keywords CSV (≤100)">
                <textarea
                  readOnly
                  value={out.iosKeywords}
                  className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </Field>
              <Field label="Full description (≤4000)">
                <textarea
                  readOnly
                  value={out.iosDescription}
                  className="h-56 w-full rounded-xl border border-gray-300 bg-white p-3 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </Field>
            </Card>

            <Card title="Google Play">
              <Field label="Short description (≤80)">
                <textarea
                  readOnly
                  value={out.gpShort}
                  className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </Field>
              <Field label="Full description (≤4000)">
                <textarea
                  readOnly
                  value={out.gpLong}
                  className="h-56 w-full rounded-xl border border-gray-300 bg-white p-3 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </Field>
            </Card>

            <Card title="Suggestions">
              <Field label="Suggested categories">
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {out.categories.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </Field>
              <Field label="Screenshot checklist">
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {out.checklist.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </Field>
            </Card>

            <Card title="Download JSON">
              <textarea
                readOnly
                value={bundle}
                className="h-48 w-full rounded-xl border border-gray-300 bg-white p-3 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <div className="mt-3 flex justify-center gap-3">
                <button
                  onClick={() => navigator.clipboard.writeText(bundle)}
                  className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
                >
                  Copy
                </button>
                <button
                  onClick={download}
                  className="inline-flex items-center justify-center rounded-lg border border-green-600 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
                >
                  Download
                </button>
              </div>
            </Card>
          </div>

          {/* Related Tools */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 font-semibold text-gray-900">
              🛠️ Related Free Tools
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                • Use our{" "}
                <a
                  href="/free-tools/app-store-keyword-research"
                  className="font-semibold text-green-600 underline"
                >
                  Keyword Research Tool
                </a>{" "}
                to find high-impact keywords
              </li>
              <li>
                • Check{" "}
                <a
                  href="/free-tools/app-store-screenshot-sizes"
                  className="font-semibold text-green-600 underline"
                >
                  Screenshot Requirements
                </a>{" "}
                before uploading
              </li>
              <li>
                • Calculate revenue after fees with our{" "}
                <a
                  href="/free-tools/app-store-fees"
                  className="font-semibold text-green-600 underline"
                >
                  App Store Fees Calculator
                </a>
              </li>
            </ul>
          </div>

          <p className="mt-10 text-center text-gray-500">
            Built with ❤️ by{" "}
            <a
              href="https://nextnative.dev"
              className="font-semibold text-green-600 underline hover:text-green-700"
            >
              NextNative.dev
            </a>{" "}
            team.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- tiny presentational helpers ---------- */
function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-3 text-xl font-semibold text-gray-900">{title}</h3>
      {children}
    </section>
  );
}
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <div className="mb-1 text-sm font-medium text-gray-700">{label}</div>
      {children}
    </div>
  );
}

/* utility classes for textareas & buttons */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // no-op
    }
  }
}
