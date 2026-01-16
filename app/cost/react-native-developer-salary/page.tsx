"use client";

import { useState } from "react";
import HighlightedSpan from "@/components/HighlightedSpan";
import Link from "next/link";

export default function ReactNativeDeveloperSalaryPage() {
  const [experience, setExperience] = useState<
    "junior" | "mid" | "senior" | "lead"
  >("mid");
  const [location, setLocation] = useState<"us" | "europe" | "asia" | "remote">(
    "us",
  );

  const salaries = {
    junior: { us: 75000, europe: 45000, asia: 25000, remote: 50000 },
    mid: { us: 115000, europe: 70000, asia: 40000, remote: 75000 },
    senior: { us: 155000, europe: 95000, asia: 60000, remote: 105000 },
    lead: { us: 190000, europe: 120000, asia: 80000, remote: 135000 },
  };

  const salary = salaries[experience][location];

  return (
    <div className="mx-auto w-full max-w-[962px] py-12 xl:max-w-[1260px]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 py-10 text-center">
          <h1 className="mb-4 text-4xl font-semibold text-gray-900 md:text-[74px] md:leading-[91px]">
            React Native Developer <HighlightedSpan>Salary</HighlightedSpan>{" "}
            2025 💼
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600">
            Complete salary guide for React Native developers. Compare salaries
            by experience level, location, and employment type with real 2025
            data.
          </p>

          {/* Social proof / usage stats */}
          <div className="mx-auto flex flex-wrap items-center justify-center gap-6 text-base text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                💼
              </span>
              <span>
                <strong className="text-gray-900">2025</strong> salaries
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                🌍
              </span>
              <span>
                <strong className="text-gray-900">Global</strong> comparison
              </span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-3xl" aria-hidden="true">
                📊
              </span>
              <span>
                <strong className="text-gray-900">Real</strong> data
              </span>
            </div>
          </div>
        </div>

        {/* Top CTA */}
        <div className="mx-auto mb-16 max-w-5xl rounded-3xl bg-white p-8 shadow-lg md:p-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-3xl">💡</span>
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Skip hiring. Build yourself for $125
            </h2>
          </div>
          <p className="mb-6 text-lg text-gray-700 md:text-xl">
            A junior developer costs $60K/year. A mid-level costs $115K. Get
            NextNative with Next.js + Capacitor boilerplate, authentication,
            in-app purchases, push notifications, database, 7 premium templates,
            and 3 months support for just $125 - that's 99.8% savings.
          </p>
          <div className="mb-6 grid gap-4 py-6 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <p className="font-semibold text-gray-900">
                  Complete boilerplate
                </p>
                <p className="text-sm text-gray-600">
                  Next.js + Capacitor + all features
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <p className="font-semibold text-gray-900">Save $115K/year</p>
                <p className="text-sm text-gray-600">
                  No developer salary needed
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <p className="font-semibold text-gray-900">3 months support</p>
                <p className="text-sm text-gray-600">Hands-on help included</p>
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
              See What's Included
            </Link>
          </div>
          <p className="mt-4 text-center text-sm text-gray-600 sm:text-left">
            One-time $125 vs $115K/year salary · Save 99.8%
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Salary Calculator */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Salary Calculator
            </h2>

            <div className="mb-8 grid gap-6 md:grid-cols-2">
              {/* Experience Level */}
              <div>
                <label className="mb-3 block font-medium text-gray-900">
                  Experience Level
                </label>
                <div className="space-y-2">
                  {[
                    { id: "junior", label: "Junior", desc: "0-2 years" },
                    { id: "mid", label: "Mid-Level", desc: "3-5 years" },
                    { id: "senior", label: "Senior", desc: "6-10 years" },
                    { id: "lead", label: "Lead/Staff", desc: "10+ years" },
                  ].map((option) => (
                    <label
                      key={option.id}
                      className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-3 transition hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name="experience"
                        checked={experience === option.id}
                        onChange={() =>
                          setExperience(option.id as typeof experience)
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

              {/* Location */}
              <div>
                <label className="mb-3 block font-medium text-gray-900">
                  Location
                </label>
                <div className="space-y-2">
                  {[
                    {
                      id: "us",
                      label: "United States",
                      desc: "SF, NYC, Austin",
                    },
                    {
                      id: "europe",
                      label: "Europe",
                      desc: "London, Berlin, Amsterdam",
                    },
                    {
                      id: "asia",
                      label: "Asia",
                      desc: "India, Philippines, Vietnam",
                    },
                    {
                      id: "remote",
                      label: "Remote Global",
                      desc: "Location independent",
                    },
                  ].map((option) => (
                    <label
                      key={option.id}
                      className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-3 transition hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name="location"
                        checked={location === option.id}
                        onChange={() =>
                          setLocation(option.id as typeof location)
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
            </div>

            {/* Result */}
            <div className="rounded-xl bg-green-50 p-6 ring-1 ring-green-200">
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Estimated Annual Salary
                </h3>
                <div className="text-4xl font-bold text-green-600">
                  ${salary.toLocaleString()}
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Hourly rate: ${Math.round(salary / 2080).toLocaleString()}/hr
              </div>
            </div>
          </div>

          {/* Salary by Experience Level */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Salary by Experience Level
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">
                      Experience
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900">
                      United States
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900">
                      Europe
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900">
                      Asia
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900">
                      Remote
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(salaries).map(([level, regions]) => (
                    <tr key={level}>
                      <td className="px-4 py-3 font-medium text-gray-900 capitalize">
                        {level}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-700">
                        ${regions.us.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-700">
                        ${regions.europe.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-700">
                        ${regions.asia.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-700">
                        ${regions.remote.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Skills that Increase Salary */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Skills That Increase Your Salary
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  skill: "TypeScript",
                  increase: "+$10K",
                  desc: "Type safety & better tooling",
                },
                {
                  skill: "Native Modules",
                  increase: "+$15K",
                  desc: "iOS/Android bridge development",
                },
                {
                  skill: "CI/CD",
                  increase: "+$8K",
                  desc: "Fastlane, GitHub Actions",
                },
                {
                  skill: "Performance Optimization",
                  increase: "+$12K",
                  desc: "Profiling & memory management",
                },
                {
                  skill: "GraphQL",
                  increase: "+$10K",
                  desc: "Modern API integration",
                },
                {
                  skill: "Testing (Jest/Detox)",
                  increase: "+$8K",
                  desc: "Unit & E2E testing",
                },
                {
                  skill: "State Management",
                  increase: "+$7K",
                  desc: "Redux, Zustand, Recoil",
                },
                {
                  skill: "AWS/Cloud",
                  increase: "+$15K",
                  desc: "Backend & infrastructure",
                },
              ].map((item) => (
                <div
                  key={item.skill}
                  className="flex items-start gap-3 rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex-1">
                    <div className="mb-1 font-semibold text-gray-900">
                      {item.skill}
                    </div>
                    <div className="text-sm text-gray-600">{item.desc}</div>
                  </div>
                  <div className="font-bold text-green-600">
                    {item.increase}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Freelance Rates */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Freelance Hourly Rates
            </h2>
            <div className="grid gap-4 md:grid-cols-4">
              {[
                {
                  level: "Junior",
                  rate: "$40-60",
                  projects: "Small apps, bug fixes",
                },
                {
                  level: "Mid-Level",
                  rate: "$60-90",
                  projects: "Full features, integrations",
                },
                {
                  level: "Senior",
                  rate: "$90-150",
                  projects: "Complex apps, architecture",
                },
                {
                  level: "Expert",
                  rate: "$150-250",
                  projects: "Enterprise, consulting",
                },
              ].map((tier) => (
                <div
                  key={tier.level}
                  className="rounded-xl border border-gray-200 p-6 text-center"
                >
                  <div className="mb-2 font-semibold text-gray-900">
                    {tier.level}
                  </div>
                  <div className="mb-3 text-3xl font-bold text-green-600">
                    {tier.rate}
                  </div>
                  <div className="text-sm text-gray-600">/hour</div>
                  <div className="mt-3 border-t border-gray-200 pt-3 text-xs text-gray-600">
                    {tier.projects}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-24 mb-16 rounded-3xl bg-white p-12 text-center shadow-xl md:p-16">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 flex items-center justify-center gap-3">
                <span className="text-4xl">🚀</span>
                <h2 className="text-4xl font-bold md:text-5xl">
                  Build Without Hiring
                </h2>
              </div>
              <p className="mb-10 text-xl text-gray-700 md:text-2xl">
                Why pay $115K/year for a developer when you can get a complete,
                production-ready codebase for $125? NextNative includes Next.js
                + Capacitor boilerplate, authentication & onboarding, in-app
                purchases & subscriptions, push notifications, secure backend &
                database, 7 premium templates, launch guides, and 3 months
                developer support.
              </p>

              <div className="mb-10 flex flex-col items-center gap-4">
                <Link
                  href="/#pricing"
                  className="rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white hover:bg-green-700"
                >
                  Get NextNative - 50% Off →
                </Link>
                <p className="text-base text-gray-600">
                  $125 · Save $115K+ · 14-day money-back guarantee
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
              React Native Salary FAQ
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="mb-2 font-semibold text-gray-900">
                  What's the average React Native developer salary in 2025?
                </h3>
                <p className="text-gray-700">
                  The average React Native developer salary in the US is
                  $115,000 for mid-level developers. Junior developers earn
                  around $75,000, while senior developers can make $155,000+.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Is React Native in demand?
                </h3>
                <p className="text-gray-700">
                  Yes, React Native remains highly in demand in 2025. Companies
                  prefer it for cross-platform development, saving 40-60% on
                  costs compared to separate iOS/Android teams.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Should I hire a React Native developer or use a no-code tool?
                </h3>
                <p className="text-gray-700">
                  If you already have a web app, no-code tools like NextNative
                  ($125) are 99% cheaper than hiring a developer ($115K/year).
                  For complex custom apps, hiring makes sense.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
