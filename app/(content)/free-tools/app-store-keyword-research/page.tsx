"use client";

import { useState } from "react";
import { Search, TrendingUp, Lightbulb } from "lucide-react";
import HighlightedSpan from "@/components/HighlightedSpan";

export default function AppStoreKeywordResearch() {
  const [keyword, setKeyword] = useState("");
  const [platform, setPlatform] = useState<"ios" | "android">("ios");

  // Sample suggestions - in production, this would come from an API
  const getSuggestions = (query: string) => {
    if (!query) return [];

    const baseSuggestions = {
      fitness: [
        { keyword: "fitness tracker", difficulty: "High", volume: "500K+" },
        { keyword: "workout planner", difficulty: "Medium", volume: "250K+" },
        { keyword: "home workout", difficulty: "Medium", volume: "300K+" },
        { keyword: "yoga app", difficulty: "High", volume: "200K+" },
        { keyword: "calorie counter", difficulty: "High", volume: "400K+" },
      ],
      note: [
        { keyword: "note taking app", difficulty: "High", volume: "300K+" },
        { keyword: "simple notes", difficulty: "Medium", volume: "150K+" },
        { keyword: "quick notes", difficulty: "Low", volume: "80K+" },
        { keyword: "notes organizer", difficulty: "Medium", volume: "100K+" },
        { keyword: "sticky notes", difficulty: "Medium", volume: "120K+" },
      ],
      productivity: [
        { keyword: "task manager", difficulty: "High", volume: "400K+" },
        { keyword: "to do list", difficulty: "High", volume: "600K+" },
        { keyword: "productivity app", difficulty: "High", volume: "350K+" },
        { keyword: "time tracker", difficulty: "Medium", volume: "200K+" },
        { keyword: "goal tracker", difficulty: "Medium", volume: "150K+" },
      ],
    };

    // Return suggestions based on keyword
    const lowerQuery = query.toLowerCase();
    for (const [key, suggestions] of Object.entries(baseSuggestions)) {
      if (lowerQuery.includes(key)) {
        return suggestions;
      }
    }

    // Default generic suggestions
    return [
      { keyword: `${query} app`, difficulty: "Medium", volume: "100K+" },
      { keyword: `best ${query}`, difficulty: "High", volume: "80K+" },
      { keyword: `free ${query}`, difficulty: "High", volume: "120K+" },
      { keyword: `${query} tracker`, difficulty: "Medium", volume: "60K+" },
      { keyword: `simple ${query}`, difficulty: "Low", volume: "40K+" },
    ];
  };

  const suggestions = getSuggestions(keyword);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const tips = [
    {
      title: "Use long-tail keywords",
      description:
        "Instead of 'fitness', try 'home workout for beginners' - less competition, more targeted",
    },
    {
      title: "Check competitor keywords",
      description:
        "Search for similar apps and see what keywords appear in their titles and descriptions",
    },
    {
      title: "Localize your keywords",
      description:
        "Different keywords work better in different languages and regions",
    },
    {
      title: "Update regularly",
      description:
        "Refresh your keywords every few months based on performance data from App Store Connect",
    },
    {
      title: "Front-load important keywords",
      description:
        "Put your most important keywords in the app title and subtitle for maximum impact",
    },
  ];

  const characterLimits = {
    ios: {
      title: 30,
      subtitle: 30,
      keywords: 100,
      description: 4000,
    },
    android: {
      title: 30,
      shortDescription: 80,
      fullDescription: 4000,
    },
  };

  return (
    <div className="mx-auto w-full max-w-[962px] py-12 xl:max-w-[1260px]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 py-10 text-center">
          <h1 className="mb-4 text-4xl font-semibold text-gray-900 md:text-[74px] md:leading-[91px]">
            App Store Keyword <HighlightedSpan>Research</HighlightedSpan> 🔍
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600">
            Discover the best keywords for your app with difficulty scores and
            volume estimates. Optimize your App Store and Google Play listings
            for maximum visibility.
          </p>

          {/* Social proof / usage stats */}
          <div className="mx-auto flex flex-wrap items-center justify-center gap-6 text-base text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                🔍
              </span>
              <span>
                <strong className="text-gray-900">Smart</strong> suggestions
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                📊
              </span>
              <span>
                <strong className="text-gray-900">Difficulty</strong> scores
              </span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-3xl" aria-hidden="true">
                ⚡
              </span>
              <span>
                <strong className="text-gray-900">Volume</strong> estimates
              </span>
            </div>
          </div>
        </div>

        {/* Platform Toggle */}
        <div className="mb-8 flex justify-center gap-4">
          <button
            onClick={() => setPlatform("ios")}
            className={`rounded-xl px-6 py-2 font-semibold transition ${
              platform === "ios"
                ? "bg-green-600 text-white"
                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            iOS App Store
          </button>
          <button
            onClick={() => setPlatform("android")}
            className={`rounded-xl px-6 py-2 font-semibold transition ${
              platform === "android"
                ? "bg-green-600 text-white"
                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Google Play Store
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <label className="flex flex-col text-left">
            <span className="mb-2 font-semibold text-gray-900">
              Enter your app category or main keyword
            </span>
            <div className="relative">
              <Search
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pr-4 pl-11 text-gray-900"
                placeholder="e.g., fitness, note taking, productivity..."
              />
            </div>
          </label>
        </div>

        {/* Keyword Suggestions */}
        {keyword && suggestions.length > 0 && (
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="text-green-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-900">
                Keyword Suggestions
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="pr-4 pb-3 font-semibold text-gray-900">
                      Keyword
                    </th>
                    <th className="pr-4 pb-3 font-semibold text-gray-900">
                      Difficulty
                    </th>
                    <th className="pb-3 font-semibold text-gray-900">
                      Est. Search Volume
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {suggestions.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="py-3 pr-4 font-medium text-gray-900">
                        {item.keyword}
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getDifficultyColor(item.difficulty)}`}
                        >
                          {item.difficulty}
                        </span>
                      </td>
                      <td className="py-3 text-gray-600">{item.volume}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              💡 <strong>Tip:</strong> Focus on "Low" or "Medium" difficulty
              keywords when starting out. High-difficulty keywords are dominated
              by established apps.
            </p>
          </div>
        )}

        {/* Character Limits */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            {platform === "ios" ? "iOS App Store" : "Google Play"} Character
            Limits
          </h2>

          {platform === "ios" ? (
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-medium">App Name (Title):</span>
                <span className="font-semibold text-gray-900">
                  {characterLimits.ios.title} characters
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-medium">Subtitle:</span>
                <span className="font-semibold text-gray-900">
                  {characterLimits.ios.subtitle} characters
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-medium">Keyword Field:</span>
                <span className="font-semibold text-gray-900">
                  {characterLimits.ios.keywords} characters
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Description:</span>
                <span className="font-semibold text-gray-900">
                  {characterLimits.ios.description.toLocaleString()} characters
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-medium">App Name (Title):</span>
                <span className="font-semibold text-gray-900">
                  {characterLimits.android.title} characters
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-medium">Short Description:</span>
                <span className="font-semibold text-gray-900">
                  {characterLimits.android.shortDescription} characters
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Full Description:</span>
                <span className="font-semibold text-gray-900">
                  {characterLimits.android.fullDescription.toLocaleString()}{" "}
                  characters
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ASO Tips */}
        <div className="mb-8 rounded-2xl bg-blue-50 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">
              ASO Best Practices
            </h2>
          </div>

          <div className="space-y-3">
            {tips.map((tip, idx) => (
              <div key={idx} className="text-sm">
                <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                <p className="text-gray-700">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Links */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-3 font-semibold text-gray-900">🛠️ Related Tools</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              • Use our{" "}
              <a
                href="/free-tools/app-store-metadata-generator"
                className="font-semibold text-green-600 underline"
              >
                App Store Metadata Generator
              </a>{" "}
              to create optimized titles and descriptions
            </li>
            <li>
              • Check{" "}
              <a
                href="/free-tools/app-store-screenshot-sizes"
                className="font-semibold text-green-600 underline"
              >
                Screenshot Sizes
              </a>{" "}
              for visual ASO
            </li>
            <li>
              • Calculate potential revenue with our{" "}
              <a
                href="/free-tools/app-revenue-calculator"
                className="font-semibold text-green-600 underline"
              >
                App Revenue Calculator
              </a>
            </li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 rounded-2xl bg-gray-50 p-4 text-center text-sm text-gray-600">
          <p>
            <strong>Note:</strong> Keyword difficulty and search volume are
            estimates based on industry data. For precise data, use Apple's
            Search Ads or Google Play Console analytics.
          </p>
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
  );
}
