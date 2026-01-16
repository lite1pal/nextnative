"use client";

import { useState } from "react";
import HighlightedSpan from "@/components/HighlightedSpan";
import Link from "next/link";

export default function AppDevelopmentCostCalculatorPage() {
  const [features, setFeatures] = useState({
    auth: true,
    database: true,
    pushNotifications: false,
    payment: false,
    realtime: false,
    maps: false,
    camera: false,
    social: false,
    analytics: false,
    admin: false,
  });

  const [design, setDesign] = useState<"template" | "custom">("template");
  const [platforms, setPlatforms] = useState<"web" | "ios" | "android" | "all">(
    "all",
  );

  const featureCosts: Record<string, number> = {
    auth: 500,
    database: 800,
    pushNotifications: 1200,
    payment: 2500,
    realtime: 3000,
    maps: 1500,
    camera: 800,
    social: 1000,
    analytics: 600,
    admin: 2000,
  };

  const designCosts = {
    template: 500,
    custom: 5000,
  };

  const platformMultiplier = {
    web: 0.5,
    ios: 0.8,
    android: 0.8,
    all: 1,
  };

  const baseCost = 3000;
  const selectedFeaturesCost = Object.entries(features)
    .filter(([_, enabled]) => enabled)
    .reduce((sum, [feature]) => sum + featureCosts[feature], 0);

  const totalCost = Math.round(
    (baseCost + selectedFeaturesCost + designCosts[design]) *
      platformMultiplier[platforms],
  );

  const timelineWeeks = Math.ceil(totalCost / 2000);

  return (
    <div className="mx-auto w-full max-w-[962px] py-12 xl:max-w-[1260px]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 py-10 text-center">
          <h1 className="mb-4 text-4xl font-semibold text-gray-900 md:text-[74px] md:leading-[91px]">
            App Development Cost <HighlightedSpan>Calculator</HighlightedSpan>{" "}
            📊
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600">
            Get an instant estimate for your mobile app project. Select
            features, platform, and design to calculate development costs and
            timeline.
          </p>

          {/* Social proof / usage stats */}
          <div className="mx-auto flex flex-wrap items-center justify-center gap-6 text-base text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                📊
              </span>
              <span>
                <strong className="text-gray-900">Accurate</strong> estimates
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                ⚡
              </span>
              <span>
                <strong className="text-gray-900">Instant</strong> calculation
              </span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-3xl" aria-hidden="true">
                💰
              </span>
              <span>
                <strong className="text-gray-900">Feature</strong> breakdown
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Calculator */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Side - Options */}
            <div className="space-y-6 lg:col-span-2">
              {/* Platform Selection */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                  1. Choose Platform
                </h2>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {[
                    { id: "web", label: "Web App", icon: "🌐" },
                    { id: "ios", label: "iOS Only", icon: "🍎" },
                    { id: "android", label: "Android Only", icon: "🤖" },
                    { id: "all", label: "iOS + Android", icon: "📱" },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() =>
                        setPlatforms(option.id as typeof platforms)
                      }
                      className={`rounded-xl border-2 p-4 text-center transition ${
                        platforms === option.id
                          ? "border-green-600 bg-green-50"
                          : "border-gray-200 bg-white hover:bg-gray-50"
                      }`}
                    >
                      <div className="mb-1 text-2xl">{option.icon}</div>
                      <div className="text-sm font-medium">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Design Selection */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                  2. Choose Design
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      id: "template",
                      label: "Template",
                      desc: "Pre-built design",
                      cost: "$500",
                    },
                    {
                      id: "custom",
                      label: "Custom",
                      desc: "Tailored design",
                      cost: "$5,000",
                    },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setDesign(option.id as typeof design)}
                      className={`rounded-xl border-2 p-4 text-left transition ${
                        design === option.id
                          ? "border-green-600 bg-green-50"
                          : "border-gray-200 bg-white hover:bg-gray-50"
                      }`}
                    >
                      <div className="mb-1 font-semibold text-gray-900">
                        {option.label}
                      </div>
                      <div className="mb-2 text-sm text-gray-600">
                        {option.desc}
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        {option.cost}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Features Selection */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                  3. Select Features
                </h2>
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    {
                      id: "auth",
                      label: "User Authentication",
                      icon: "🔐",
                      cost: 500,
                    },
                    {
                      id: "database",
                      label: "Database",
                      icon: "🗄️",
                      cost: 800,
                    },
                    {
                      id: "pushNotifications",
                      label: "Push Notifications",
                      icon: "🔔",
                      cost: 1200,
                    },
                    {
                      id: "payment",
                      label: "Payment Integration",
                      icon: "💳",
                      cost: 2500,
                    },
                    {
                      id: "realtime",
                      label: "Real-time Updates",
                      icon: "⚡",
                      cost: 3000,
                    },
                    {
                      id: "maps",
                      label: "Maps & Location",
                      icon: "🗺️",
                      cost: 1500,
                    },
                    {
                      id: "camera",
                      label: "Camera & Photos",
                      icon: "📷",
                      cost: 800,
                    },
                    {
                      id: "social",
                      label: "Social Sharing",
                      icon: "📤",
                      cost: 1000,
                    },
                    {
                      id: "analytics",
                      label: "Analytics",
                      icon: "📊",
                      cost: 600,
                    },
                    {
                      id: "admin",
                      label: "Admin Panel",
                      icon: "⚙️",
                      cost: 2000,
                    },
                  ].map((feature) => (
                    <label
                      key={feature.id}
                      className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-3 transition hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={features[feature.id as keyof typeof features]}
                        onChange={(e) =>
                          setFeatures({
                            ...features,
                            [feature.id]: e.target.checked,
                          })
                        }
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span>{feature.icon}</span>
                          <span className="font-medium text-gray-900">
                            {feature.label}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          +${feature.cost.toLocaleString()}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Results (Sticky) */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                  Estimated Cost
                </h2>

                <div className="mb-6 rounded-xl bg-green-50 p-6 text-center ring-1 ring-green-200">
                  <div className="mb-2 text-sm text-gray-600">Total Cost</div>
                  <div className="text-5xl font-bold text-green-600">
                    ${totalCost.toLocaleString()}
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    Timeline: {timelineWeeks} weeks
                  </div>
                </div>

                <div className="mb-6 space-y-2 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Base Cost:</span>
                    <span className="font-medium">
                      ${baseCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Features:</span>
                    <span className="font-medium">
                      ${selectedFeaturesCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Design:</span>
                    <span className="font-medium">
                      ${designCosts[design].toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Platform:</span>
                    <span className="font-medium">
                      {platforms === "all" ? "iOS + Android" : platforms}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-center text-xs text-gray-500">
                  This is an estimate. Actual costs may vary based on specific
                  requirements.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-24 mb-16 rounded-3xl bg-white p-12 text-center shadow-xl md:p-16">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 flex items-center justify-center gap-3">
                <span className="text-4xl">🚀</span>
                <h2 className="text-4xl font-bold md:text-5xl">
                  Stop Calculating. Start Building
                </h2>
              </div>
              <p className="mb-10 text-xl text-gray-700 md:text-2xl">
                Get everything you need to launch: Next.js + Capacitor
                boilerplate, authentication & onboarding flow, in-app purchases
                & subscriptions, push notifications, secure backend & database,
                and 7 premium template apps. For just $125.
              </p>

              <div className="mb-10 flex flex-col items-center gap-4">
                <Link
                  href="/#pricing"
                  className="rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white hover:bg-green-700"
                >
                  Get NextNative →
                </Link>
                <p className="text-base text-gray-600">
                  $125 · Unlimited apps · 14-day money-back guarantee
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
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Cost Calculator FAQ
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="mb-2 font-semibold text-gray-900">
                  How accurate is this calculator?
                </h3>
                <p className="text-gray-700">
                  This calculator provides estimates based on industry averages
                  for 2025. Actual costs depend on complexity, team location,
                  and specific requirements. Use it as a starting point for
                  budgeting.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="mb-2 font-semibold text-gray-900">
                  What's not included in these estimates?
                </h3>
                <p className="text-gray-700">
                  Ongoing costs like hosting ($50-500/month), App Store fees
                  ($99-124/year), maintenance (15-20% annually), and marketing
                  are not included. These add significantly to total ownership
                  cost.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Can I really build an app for under $500?
                </h3>
                <p className="text-gray-700">
                  Yes, with no-code/low-code platforms like NextNative, you can
                  convert your existing website into mobile apps for $125. This
                  works best if you already have a web app built with Next.js or
                  React.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
