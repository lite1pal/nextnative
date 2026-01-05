"use client";

import { useState } from "react";
import HighlightedSpan from "@/components/HighlightedSpan";
import Link from "next/link";

export default function AppDevelopmentCostPage() {
  const [appType, setAppType] = useState<"simple" | "moderate" | "complex">(
    "moderate",
  );
  const [platform, setPlatform] = useState<"single" | "both">("both");
  const [team, setTeam] = useState<"agency" | "freelancer" | "diy">("agency");

  const costs = {
    simple: {
      agency: { single: 25000, both: 40000 },
      freelancer: { single: 10000, both: 18000 },
      diy: { single: 500, both: 500 },
    },
    moderate: {
      agency: { single: 75000, both: 120000 },
      freelancer: { single: 30000, both: 50000 },
      diy: { single: 2000, both: 2000 },
    },
    complex: {
      agency: { single: 200000, both: 350000 },
      freelancer: { single: 80000, both: 140000 },
      diy: { single: 5000, both: 5000 },
    },
  };

  const timeline = {
    simple: {
      agency: "2-3 months",
      freelancer: "3-4 months",
      diy: "1-2 months",
    },
    moderate: {
      agency: "4-6 months",
      freelancer: "6-9 months",
      diy: "3-6 months",
    },
    complex: {
      agency: "9-12 months",
      freelancer: "12-18 months",
      diy: "6-12 months",
    },
  };

  const estimatedCost = costs[appType][team][platform];
  const estimatedTimeline = timeline[appType][team];

  return (
    <div className="mx-auto w-full max-w-[962px] py-12 xl:max-w-[1260px]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 py-10 text-center">
          <h1 className="mb-4 text-4xl font-semibold text-gray-900 md:text-[74px] md:leading-[91px]">
            How Much Does it Cost to{" "}
            <HighlightedSpan>Build an App</HighlightedSpan>? 💰
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600">
            Calculate the real cost of building a mobile app in 2025. From DIY
            no-code solutions to agency development - get accurate estimates
            based on your needs.
          </p>

          {/* Social proof / usage stats */}
          <div className="mx-auto flex flex-wrap items-center justify-center gap-6 text-base text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                💰
              </span>
              <span>
                <strong className="text-gray-900">Real</strong> 2025 pricing
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                📊
              </span>
              <span>
                <strong className="text-gray-900">Interactive</strong>{" "}
                calculator
              </span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-3xl" aria-hidden="true">
                ⚡
              </span>
              <span>
                <strong className="text-gray-900">Budget</strong> breakdowns
              </span>
            </div>
          </div>
        </div>

        {/* Top CTA */}
        <div className="mx-auto mb-16 max-w-5xl rounded-3xl bg-white p-8 shadow-lg md:p-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-3xl">⚡</span>
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Skip expensive agencies. Build for $299
            </h2>
          </div>
          <p className="mb-6 text-lg text-gray-700 md:text-xl">
            NextNative includes Next.js + Capacitor boilerplate, authentication,
            in-app purchases, push notifications, secure backend & database, and
            7 premium template apps. Save $50K+ in development costs.
          </p>
          <div className="mb-6 grid gap-4 py-6 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <p className="font-semibold text-gray-900">Complete setup</p>
                <p className="text-sm text-gray-600">
                  Auth, payments, push, database
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <p className="font-semibold text-gray-900">
                  7 premium templates
                </p>
                <p className="text-sm text-gray-600">
                  Expenses, flashcards, notes & more
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <p className="font-semibold text-gray-900">3 months support</p>
                <p className="text-sm text-gray-600">Hands-on help if stuck</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/#pricing"
              className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Get NextNative - 50% Off →
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-green-600 bg-white px-6 py-3 font-semibold text-green-600 hover:bg-green-50"
            >
              See All Features
            </Link>
          </div>
          <p className="mt-4 text-center text-sm text-gray-600 sm:text-left">
            One-time payment · Unlimited apps · 14-day money-back guarantee
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Calculator */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Cost Calculator
            </h2>

            <div className="mb-6 grid gap-6 md:grid-cols-3">
              {/* App Complexity */}
              <div>
                <label className="mb-2 block font-medium text-gray-900">
                  App Complexity
                </label>
                <div className="space-y-2">
                  {[
                    { id: "simple", label: "Simple", desc: "Basic features" },
                    {
                      id: "moderate",
                      label: "Moderate",
                      desc: "Multiple features",
                    },
                    {
                      id: "complex",
                      label: "Complex",
                      desc: "Advanced features",
                    },
                  ].map((option) => (
                    <label
                      key={option.id}
                      className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-3 transition hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name="appType"
                        checked={appType === option.id}
                        onChange={() => setAppType(option.id as typeof appType)}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {option.label}
                        </div>
                        <div className="text-sm text-gray-600">
                          {option.desc}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Platform */}
              <div>
                <label className="mb-2 block font-medium text-gray-900">
                  Platform
                </label>
                <div className="space-y-2">
                  {[
                    {
                      id: "single",
                      label: "iOS or Android",
                      desc: "One platform",
                    },
                    {
                      id: "both",
                      label: "iOS + Android",
                      desc: "Cross-platform",
                    },
                  ].map((option) => (
                    <label
                      key={option.id}
                      className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-3 transition hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name="platform"
                        checked={platform === option.id}
                        onChange={() =>
                          setPlatform(option.id as typeof platform)
                        }
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {option.label}
                        </div>
                        <div className="text-sm text-gray-600">
                          {option.desc}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Team Type */}
              <div>
                <label className="mb-2 block font-medium text-gray-900">
                  Development Team
                </label>
                <div className="space-y-2">
                  {[
                    {
                      id: "agency",
                      label: "Agency",
                      desc: "Professional team",
                    },
                    {
                      id: "freelancer",
                      label: "Freelancer",
                      desc: "Independent dev",
                    },
                    { id: "diy", label: "DIY/No-Code", desc: "Build yourself" },
                  ].map((option) => (
                    <label
                      key={option.id}
                      className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-3 transition hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name="team"
                        checked={team === option.id}
                        onChange={() => setTeam(option.id as typeof team)}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {option.label}
                        </div>
                        <div className="text-sm text-gray-600">
                          {option.desc}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="mt-8 rounded-xl bg-green-50 p-6 ring-1 ring-green-200">
              <div className="mb-4 flex items-baseline justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Estimated Cost
                </h3>
                <div className="text-4xl font-bold text-green-600">
                  ${estimatedCost.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-700">
                <span>Timeline:</span>
                <span className="font-semibold">{estimatedTimeline}</span>
              </div>
            </div>
          </div>

          {/* Cost Breakdown by App Type */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Detailed Cost Breakdown
            </h2>

            <div className="space-y-6">
              {/* Simple Apps */}
              <div className="rounded-xl border border-gray-200 p-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  Simple Apps ($500 - $40,000)
                </h3>
                <p className="mb-4 text-gray-600">
                  Basic functionality, minimal design, standard features
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Login & user profiles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Basic content display</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Simple forms and data input</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Push notifications</span>
                  </li>
                </ul>
                <div className="mt-4 text-sm text-gray-600">
                  <strong>Examples:</strong> To-do list, calculator, simple blog
                  reader, basic portfolio app
                </div>
              </div>

              {/* Moderate Apps */}
              <div className="rounded-xl border border-gray-200 p-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  Moderate Apps ($2,000 - $120,000)
                </h3>
                <p className="mb-4 text-gray-600">
                  Multiple features, custom design, API integrations
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>All simple features +</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Payment processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Real-time updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Social media integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Custom backend</span>
                  </li>
                </ul>
                <div className="mt-4 text-sm text-gray-600">
                  <strong>Examples:</strong> E-commerce app, food delivery,
                  fitness tracker, social networking
                </div>
              </div>

              {/* Complex Apps */}
              <div className="rounded-xl border border-gray-200 p-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  Complex Apps ($5,000 - $350,000+)
                </h3>
                <p className="mb-4 text-gray-600">
                  Advanced features, scalable architecture, AI/ML integration
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>All moderate features +</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>AI/ML features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Real-time multiplayer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Video/audio streaming</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Advanced security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Complex backend infrastructure</span>
                  </li>
                </ul>
                <div className="mt-4 text-sm text-gray-600">
                  <strong>Examples:</strong> Uber-like apps, banking apps, video
                  conferencing, AR/VR apps
                </div>
              </div>
            </div>
          </div>

          {/* Hidden Costs */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Hidden Costs to Consider
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-4">
                <h4 className="mb-2 font-semibold text-gray-900">
                  📱 App Store Fees
                </h4>
                <p className="text-sm text-gray-600">
                  Apple: $99/year + 15-30% commission
                  <br />
                  Google: $25 one-time + 15-30% commission
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <h4 className="mb-2 font-semibold text-gray-900">
                  🖥️ Backend & Hosting
                </h4>
                <p className="text-sm text-gray-600">
                  $50-500/month depending on users
                  <br />
                  Database, API, storage costs
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <h4 className="mb-2 font-semibold text-gray-900">
                  🔧 Maintenance
                </h4>
                <p className="text-sm text-gray-600">
                  15-20% of development cost annually
                  <br />
                  Bug fixes, updates, OS compatibility
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <h4 className="mb-2 font-semibold text-gray-900">
                  📣 Marketing
                </h4>
                <p className="text-sm text-gray-600">
                  $5,000-50,000+ for user acquisition
                  <br />
                  App Store Optimization, ads
                </p>
              </div>
            </div>
          </div>

          {/* How to Reduce Costs */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              How to Build an App on a Budget
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg bg-green-50 p-6">
                <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <span className="text-2xl">💡</span>
                  Use Cross-Platform Frameworks
                </h3>
                <p className="mb-3 text-gray-700">
                  Build once, deploy to iOS and Android. Save 40-60% compared to
                  native development.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Best options:</strong> React Native, Flutter,
                  Capacitor (for web devs)
                </div>
              </div>

              <div className="rounded-lg bg-green-50 p-6">
                <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <span className="text-2xl">🚀</span>
                  Start with MVP (Minimum Viable Product)
                </h3>
                <p className="mb-3 text-gray-700">
                  Launch with core features only, add more based on user
                  feedback. Reduces initial cost by 50-70%.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>MVP timeline:</strong> 2-3 months vs 6-12 months full
                  app
                </div>
              </div>

              <div className="rounded-lg bg-green-50 p-6">
                <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <span className="text-2xl">🎨</span>
                  Use Templates & UI Kits
                </h3>
                <p className="mb-3 text-gray-700">
                  Pre-built components save 30-50 hours of design and
                  development time.
                </p>
                <Link
                  href="/templates"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-green-600 underline hover:text-green-700"
                >
                  Browse NextNative templates →
                </Link>
              </div>

              <div className="rounded-lg bg-green-50 p-6">
                <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <span className="text-2xl">🔌</span>
                  Leverage Existing Services
                </h3>
                <p className="mb-3 text-gray-700">
                  Use Firebase, Supabase, or similar for backend instead of
                  building from scratch.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Saves:</strong> $10,000-30,000 in backend development
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-24 mb-16 rounded-3xl bg-white p-12 text-center shadow-xl md:p-16">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 flex items-center justify-center gap-3">
                <span className="text-4xl">🚀</span>
                <h2 className="text-4xl font-bold md:text-5xl">
                  Ready to Build Your App?
                </h2>
              </div>
              <p className="mb-10 text-xl text-gray-700 md:text-2xl">
                Get Next.js + Capacitor boilerplate with authentication, in-app
                purchases & subscriptions, push notifications, secure backend &
                database, 7 premium template apps, and 3 months developer
                support. Save $50K+ compared to agencies.
              </p>

              <div className="mb-10 flex flex-col items-center gap-4">
                <Link
                  href="/#pricing"
                  className="rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white hover:bg-green-700"
                >
                  Get NextNative →
                </Link>
                <p className="text-base text-gray-600">
                  $299 · Unlimited apps · 14-day money-back guarantee
                </p>
              </div>

              {/* Trust badges */}
              <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-6 border-t border-green-100 pt-8 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <span className="text-xl">✓</span>
                  Lifetime updates
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-xl">✓</span>3 months support
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-xl">✓</span>
                  Team license
                </span>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-8 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="mb-2 font-semibold text-gray-900">
                  What's the average cost to build a mobile app?
                </h3>
                <p className="text-gray-700">
                  The average cost ranges from $30,000 to $120,000 for a
                  moderate app with an agency. However, DIY solutions with
                  platforms like NextNative can reduce costs to under $500 for
                  simple apps.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="mb-2 font-semibold text-gray-900">
                  How long does it take to build an app?
                </h3>
                <p className="text-gray-700">
                  Simple apps: 1-3 months. Moderate apps: 4-6 months. Complex
                  apps: 9-18 months. With no-code tools like NextNative, you can
                  launch in days instead of months.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Is it cheaper to build for iOS or Android first?
                </h3>
                <p className="text-gray-700">
                  Development costs are similar, but using cross-platform
                  frameworks (React Native, Flutter, Capacitor) lets you build
                  for both simultaneously, saving 40-60% compared to building
                  separately.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="mb-2 font-semibold text-gray-900">
                  What's the cheapest way to build an app?
                </h3>
                <p className="text-gray-700">
                  Convert your existing website to an app using Capacitor or
                  similar tools. NextNative offers templates starting at $299
                  (50% off) that include all necessary features for launching on
                  app stores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
