"use client";

import { useState } from "react";
import HighlightedSpan from "@/components/HighlightedSpan";
import Link from "next/link";

export default function CostToPublishAppPage() {
  const [platform, setPlatform] = useState<"ios" | "android" | "both">("both");
  const [updates, setUpdates] = useState(4); // per year

  const costs = {
    ios: {
      developer: 99,
      commission15: 0.15,
      commission30: 0.3,
    },
    android: {
      developer: 25, // one-time
      commission15: 0.15,
      commission30: 0.3,
    },
  };

  const annualDeveloperFees =
    platform === "both"
      ? costs.ios.developer + costs.android.developer
      : platform === "ios"
        ? costs.ios.developer
        : costs.android.developer;

  return (
    <div className="mx-auto w-full max-w-[962px] py-12 xl:max-w-[1260px]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 py-10 text-center">
          <h1 className="mb-4 text-4xl font-semibold text-gray-900 md:text-[74px] md:leading-[91px]">
            Cost to Publish App on <HighlightedSpan>App Store</HighlightedSpan>{" "}
            📱
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600">
            Complete breakdown of costs to publish your app on Apple App Store
            and Google Play Store. Developer fees, commissions, and hidden costs
            explained.
          </p>

          {/* Social proof / usage stats */}
          <div className="mx-auto flex flex-wrap items-center justify-center gap-6 text-base text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                💰
              </span>
              <span>
                <strong className="text-gray-900">Complete</strong> breakdown
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                📊
              </span>
              <span>
                <strong className="text-gray-900">2025</strong> updated
              </span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-3xl" aria-hidden="true">
                ✨
              </span>
              <span>
                <strong className="text-gray-900">No</strong> hidden fees
              </span>
            </div>
          </div>
        </div>

        {/* Top CTA */}
        <div className="mx-auto mb-16 max-w-5xl rounded-3xl bg-white p-8 shadow-lg md:p-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-3xl">⚡</span>
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Publishing made easy with NextNative
            </h2>
          </div>
          <p className="mb-6 text-lg text-gray-700 md:text-xl">
            NextNative includes App Store & Google Play launch guides,
            production-ready boilerplate, all required features, and 3 months
            support to help you get approved on first try.
          </p>
          <div className="mb-6 grid gap-4 py-6 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <p className="font-semibold text-gray-900">Launch guides</p>
                <p className="text-sm text-gray-600">
                  Step-by-step for both stores
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <p className="font-semibold text-gray-900">Complete features</p>
                <p className="text-sm text-gray-600">
                  Auth, payments, database
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
              Get NextNative →
            </Link>
          </div>
          <p className="mt-4 text-center text-sm text-gray-600 sm:text-left">
            $125 · Launch guides included · 14-day money-back guarantee
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Quick Comparison */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Quick Comparison
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Apple App Store */}
              <div className="rounded-xl border-2 border-gray-200 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-4xl">🍎</span>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    Apple App Store
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Developer Account:</span>
                    <span className="font-semibold text-gray-900">
                      $99/year
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Commission:</span>
                    <span className="font-semibold text-gray-900">15-30%</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Review Time:</span>
                    <span className="font-semibold text-gray-900">
                      1-3 days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Updates:</span>
                    <span className="font-semibold text-gray-900">
                      Free, unlimited
                    </span>
                  </div>
                </div>
              </div>

              {/* Google Play Store */}
              <div className="rounded-xl border-2 border-gray-200 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-4xl">🤖</span>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    Google Play Store
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Developer Account:</span>
                    <span className="font-semibold text-gray-900">
                      $25 one-time
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Commission:</span>
                    <span className="font-semibold text-gray-900">15-30%</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Review Time:</span>
                    <span className="font-semibold text-gray-900">
                      Hours to days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Updates:</span>
                    <span className="font-semibold text-gray-900">
                      Free, unlimited
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fee Calculator */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Annual Fee Calculator
            </h2>
            <div className="mb-6">
              <label className="mb-3 block font-medium text-gray-900">
                Select Platform(s)
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: "ios", label: "iOS Only", icon: "🍎" },
                  { id: "android", label: "Android Only", icon: "🤖" },
                  { id: "both", label: "Both", icon: "📱" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setPlatform(option.id as typeof platform)}
                    className={`rounded-xl border-2 p-4 text-center transition ${
                      platform === option.id
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

            <div className="rounded-xl bg-green-50 p-6 ring-1 ring-green-200">
              <div className="mb-4 flex items-baseline justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  First Year Cost
                </h3>
                <div className="text-4xl font-bold text-green-600">
                  ${annualDeveloperFees}
                </div>
              </div>
              <div className="space-y-2 border-t border-green-200 pt-4 text-sm">
                {platform === "both" || platform === "ios" ? (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Apple Developer:</span>
                    <span className="font-medium">$99/year</span>
                  </div>
                ) : null}
                {platform === "both" || platform === "android" ? (
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Google Play Developer:
                    </span>
                    <span className="font-medium">$25 one-time</span>
                  </div>
                ) : null}
              </div>
              <div className="mt-4 text-sm text-gray-600">
                + 15-30% commission on all sales/subscriptions
              </div>
            </div>
          </div>

          {/* Commission Breakdown */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Commission Rates Explained
            </h2>

            <div className="space-y-6">
              <div className="rounded-xl bg-green-50 p-6">
                <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-gray-900">
                  <span>✓</span>
                  15% Commission (Small Business Program)
                </h3>
                <p className="mb-3 text-gray-700">
                  You qualify for the reduced 15% commission rate if you earned
                  less than $1 million in the previous calendar year.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Example:</strong> $10,000 revenue = $1,500 commission,
                  $8,500 take-home
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 p-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  30% Commission (Standard)
                </h3>
                <p className="mb-3 text-gray-700">
                  Standard commission rate for apps earning over $1 million
                  annually, or for the portion above $1M.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Example:</strong> $10,000 revenue = $3,000 commission,
                  $7,000 take-home
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm">
              <strong className="text-blue-900">💡 Pro Tip:</strong>
              <span className="text-blue-800">
                {" "}
                Both Apple and Google automatically enroll eligible developers
                in their small business programs. No application needed!
              </span>
            </div>
          </div>

          {/* Hidden Costs */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Additional Costs to Consider
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "📜 Business/LLC Registration",
                  cost: "$0-500",
                  desc: "Required for business accounts in some regions",
                },
                {
                  title: "💳 Payment Processing",
                  cost: "~3%",
                  desc: "If selling outside app stores (web, physical goods)",
                },
                {
                  title: "🔒 App Store Optimization (ASO)",
                  cost: "$0-5,000",
                  desc: "Keywords, screenshots, A/B testing tools",
                },
                {
                  title: "🖼️ App Assets",
                  cost: "$0-1,000",
                  desc: "Icons, screenshots, promo graphics",
                },
                {
                  title: "📊 Analytics Tools",
                  cost: "$0-200/mo",
                  desc: "Firebase, Mixpanel, Amplitude (often free tier)",
                },
                {
                  title: "🔔 Push Notification Service",
                  cost: "$0-50/mo",
                  desc: "Firebase, OneSignal (free for most apps)",
                },
                {
                  title: "☁️ Backend/Hosting",
                  cost: "$0-500/mo",
                  desc: "Depends on users and features",
                },
                {
                  title: "🛡️ App Signing Certificate",
                  cost: "Included",
                  desc: "Free with developer accounts",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex-1">
                    <div className="mb-1 font-semibold text-gray-900">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-600">{item.desc}</div>
                  </div>
                  <div className="font-bold text-green-600">{item.cost}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Publishing Process */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              How to Publish Your App
            </h2>

            <div className="space-y-6">
              {/* iOS Steps */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
                  <span>🍎</span>
                  Apple App Store
                </h3>
                <div className="space-y-3">
                  {[
                    "Create Apple Developer account ($99/year)",
                    "Set up App Store Connect",
                    "Generate app signing certificate",
                    "Create app listing (name, description, screenshots)",
                    "Upload build via Xcode or Transporter",
                    "Submit for review (1-3 days)",
                    "App goes live after approval",
                  ].map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                        {i + 1}
                      </div>
                      <div className="text-gray-700">{step}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Android Steps */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
                  <span>🤖</span>
                  Google Play Store
                </h3>
                <div className="space-y-3">
                  {[
                    "Create Google Play Developer account ($25 one-time)",
                    "Set up Google Play Console",
                    "Create signing key (keystore file)",
                    "Create store listing (name, description, graphics)",
                    "Upload AAB file",
                    "Submit for review (hours to 1 day)",
                    "App goes live after approval",
                  ].map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                        {i + 1}
                      </div>
                      <div className="text-gray-700">{step}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Free Tools CTA */}
          <div className="mb-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Free Tools to Help You Publish
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                href="/free-tools/app-store-metadata-generator"
                className="rounded-xl border border-green-200 bg-white p-4 transition hover:shadow-md"
              >
                <div className="mb-2 text-2xl">📝</div>
                <div className="font-semibold text-gray-900">
                  App Store Metadata Generator
                </div>
                <div className="text-sm text-gray-600">
                  Create titles, descriptions & keywords
                </div>
              </Link>
              <Link
                href="/free-tools/app-store-screenshot-generator"
                className="rounded-xl border border-green-200 bg-white p-4 transition hover:shadow-md"
              >
                <div className="mb-2 text-2xl">📸</div>
                <div className="font-semibold text-gray-900">
                  Screenshot Generator
                </div>
                <div className="text-sm text-gray-600">
                  Create beautiful app store screenshots
                </div>
              </Link>
              <Link
                href="/free-tools/app-icon-splash-generator"
                className="rounded-xl border border-green-200 bg-white p-4 transition hover:shadow-md"
              >
                <div className="mb-2 text-2xl">🎨</div>
                <div className="font-semibold text-gray-900">
                  App Icon Generator
                </div>
                <div className="text-sm text-gray-600">
                  Generate all required icon sizes
                </div>
              </Link>
              <Link
                href="/free-tools/app-store-connect-api"
                className="rounded-xl border border-green-200 bg-white p-4 transition hover:shadow-md"
              >
                <div className="mb-2 text-2xl">🔑</div>
                <div className="font-semibold text-gray-900">
                  App Store Connect API
                </div>
                <div className="text-sm text-gray-600">
                  Automate app uploads & updates
                </div>
              </Link>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-24 mb-16 rounded-3xl bg-white p-12 text-center shadow-xl md:p-16">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 flex items-center justify-center gap-3">
                <span className="text-4xl">🚀</span>
                <h2 className="text-4xl font-bold md:text-5xl">
                  Ready to Publish?
                </h2>
              </div>
              <p className="mb-10 text-xl text-gray-700 md:text-2xl">
                NextNative includes everything for successful app store
                publishing: App Store & Google Play launch guides,
                production-ready Next.js + Capacitor boilerplate with
                authentication, in-app purchases, push notifications, and 3
                months developer support. Get approved faster.
              </p>

              <div className="mb-10 flex flex-col items-center gap-4">
                <Link
                  href="/#pricing"
                  className="rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white hover:bg-green-700"
                >
                  Get NextNative →
                </Link>
                <p className="text-base text-gray-600">
                  $125 · Launch guides included · 14-day money-back guarantee
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
              Publishing FAQ
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="mb-2 font-semibold text-gray-900">
                  How much does it cost to publish an app on the App Store?
                </h3>
                <p className="text-gray-700">
                  Apple charges $99/year for an Apple Developer account. Google
                  Play charges a one-time $25 fee. Both take 15-30% commission
                  on sales and subscriptions.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Can I publish an app for free?
                </h3>
                <p className="text-gray-700">
                  You cannot publish to official app stores for free. However,
                  you can distribute Android apps as APK files directly
                  (sideloading) without Google Play fees, though this limits
                  your reach.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="mb-2 font-semibold text-gray-900">
                  How long does app review take?
                </h3>
                <p className="text-gray-700">
                  Apple typically reviews apps in 1-3 days. Google Play reviews
                  usually complete within hours to 1 day. Complex apps or first
                  submissions may take longer.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Do I need both developer accounts?
                </h3>
                <p className="text-gray-700">
                  Only if you want to publish on both platforms. Most businesses
                  publish on both iOS and Android to maximize reach, totaling
                  $124 for the first year.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
