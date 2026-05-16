"use client";

import { useState } from "react";
import HighlightedSpan from "@/components/HighlightedSpan";

export default function BundleIdGenerator() {
  const [company, setCompany] = useState("nextnative");
  const [appName, setAppName] = useState("myapp");
  const [bundleId, setBundleId] = useState("com.nextnative.myapp");

  const generateBundleId = (company: string, app: string) => {
    const clean = (str: string) =>
      str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "")
        .trim();
    const c = clean(company);
    const a = clean(app);
    return `com.${c}.${a}`;
  };

  const handleGenerate = () => {
    const id = generateBundleId(company, appName);
    setBundleId(id);
  };

  return (
    <div className="mx-auto w-full max-w-[962px] py-12 xl:max-w-[1260px]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 py-10 text-center">
          <h1 className="mb-4 text-4xl font-semibold text-gray-900 md:text-[74px] md:leading-[91px]">
            iOS Bundle ID <HighlightedSpan>Generator</HighlightedSpan> 🍎
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600">
            Instantly generate a valid iOS Bundle ID in reverse domain format.
            Perfect for App Store, Xcode, and Capacitor apps.
          </p>

          {/* Social proof / usage stats */}
          <div className="mx-auto flex flex-wrap items-center justify-center gap-6 text-base text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                🍎
              </span>
              <span>
                <strong className="text-gray-900">iOS</strong> standard
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
                ✨
              </span>
              <span>
                <strong className="text-gray-900">Valid</strong> format
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col text-left">
              <span className="mb-1 font-medium">Company / Domain name</span>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900"
              />
            </label>
            <label className="flex flex-col text-left">
              <span className="mb-1 font-medium">App name</span>
              <input
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900"
              />
            </label>
          </div>

          <button
            onClick={handleGenerate}
            className="mb-6 rounded-xl bg-green-600 px-6 py-2 font-semibold text-white hover:bg-green-700"
          >
            Generate
          </button>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-2xl font-semibold text-gray-900">
              Generated Bundle ID
            </h2>
            <p className="mb-4 font-mono text-lg text-green-600">{bundleId}</p>
            <button
              onClick={() => navigator.clipboard.writeText(bundleId)}
              className="rounded-xl border border-green-600 px-4 py-2 font-semibold text-green-600 hover:bg-green-50"
            >
              Copy to Clipboard
            </button>
          </div>

          <p className="mt-10 text-gray-500">
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
