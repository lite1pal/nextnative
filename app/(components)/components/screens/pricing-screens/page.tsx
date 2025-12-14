import type { Metadata } from "next";
import ComponentWrapper from "../../component-wrapper";
import { ScreensJsonLd } from "../../JsonLd";
import Link from "next/link";
import { UiItem } from "../../types";
import {
  PaywallPreview,
  SubscriptionPricingPreview,
  TieredPricingPreview,
} from "../screen-previews";

const URL = "https://nextnative.dev/components/screens/pricing-screens";

export const metadata: Metadata = {
  title:
    "Mobile Pricing Screen Templates for React & Tailwind CSS | NextNative",
  description:
    "Production-ready mobile pricing screen templates for React apps. Subscription tiers, freemium models, paywalls, and in-app purchase UI patterns styled with Tailwind CSS.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Mobile Pricing Screen Templates | NextNative",
    description:
      "Ready-to-use pricing screen components for your mobile React app. Subscription pricing, tiered plans, and app paywalls.",
    url: URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Pricing Screen Templates | NextNative",
    description:
      "Copy-paste pricing screens for React + Tailwind apps. Subscription, tiered, and paywall patterns.",
  },
};

// --- Pricing Screen Code Strings ---
const subscriptionPricingCode = `"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Crown } from "lucide-react";
import { useState } from "react";

export function SubscriptionPricingScreen() {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");

  const plans = {
    monthly: { price: 9.99, period: "month", savings: null },
    yearly: { price: 59.99, period: "year", savings: "Save 50%" },
  };

  const features = [
    { text: "Unlimited access to all content", included: true },
    { text: "Ad-free experience", included: true },
    { text: "Offline downloads", included: true },
    { text: "Priority support", included: true },
    { text: "Exclusive member perks", included: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-[700px] flex-col bg-gradient-to-b from-indigo-600 to-purple-700 p-6 text-white"
    >
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-yellow-400">
          <Crown className="size-8 text-yellow-800" />
        </div>
        <h1 className="text-2xl font-bold">Go Premium</h1>
        <p className="mt-2 text-white/80">Unlock the full experience</p>
      </div>

      {/* Plan Toggle */}
      <div className="mx-auto mt-6 flex gap-2 rounded-full bg-white/10 p-1">
        {(["monthly", "yearly"] as const).map((plan) => (
          <button
            key={plan}
            onClick={() => setSelectedPlan(plan)}
            className={cn(
              "rounded-full px-6 py-2 text-sm font-semibold transition-all",
              selectedPlan === plan ? "bg-white text-indigo-600" : "text-white/80"
            )}
          >
            {plan === "yearly" && plans.yearly.savings && (
              <span className="mr-2 rounded-full bg-green-500 px-2 py-0.5 text-xs text-white">
                {plans.yearly.savings}
              </span>
            )}
            {plan.charAt(0).toUpperCase() + plan.slice(1)}
          </button>
        ))}
      </div>

      {/* Price */}
      <div className="mt-8 text-center">
        <span className="text-5xl font-bold">\${plans[selectedPlan].price}</span>
        <span className="text-white/70">/{plans[selectedPlan].period}</span>
      </div>

      {/* Features */}
      <div className="mt-8 space-y-3">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex size-6 items-center justify-center rounded-full bg-green-400">
              <Check className="size-4 text-green-800" />
            </div>
            <span className="text-white/90">{feature.text}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-auto space-y-3">
        <button className="w-full rounded-xl bg-white py-4 text-lg font-bold text-indigo-600">
          Start Free Trial
        </button>
        <button className="w-full py-3 text-sm text-white/70">Maybe later</button>
      </div>
    </motion.div>
  );
}`;

const tieredPricingCode = `"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, X, Sparkles, Shield, Star } from "lucide-react";
import { useState } from "react";

export function TieredPricingScreen() {
  const [selectedTier, setSelectedTier] = useState(1);

  const tiers = [
    {
      name: "Basic", price: 0, period: "Forever",
      features: [
        { text: "5 projects", included: true },
        { text: "Basic analytics", included: true },
        { text: "Advanced features", included: false },
      ],
      popular: false, buttonText: "Current Plan",
    },
    {
      name: "Pro", price: 12, period: "/month",
      features: [
        { text: "Unlimited projects", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Priority support", included: true },
      ],
      popular: true, buttonText: "Upgrade to Pro",
    },
    {
      name: "Team", price: 29, period: "/month",
      features: [
        { text: "Everything in Pro", included: true },
        { text: "Team collaboration", included: true },
        { text: "Admin dashboard", included: true },
      ],
      popular: false, buttonText: "Contact Sales",
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-[700px] bg-gray-50 p-4">
      <h1 className="text-center text-2xl font-bold text-gray-900">Choose Your Plan</h1>

      <div className="scrollbar-hide mt-6 flex gap-3 overflow-x-auto pb-4">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            onClick={() => setSelectedTier(i)}
            className={cn(
              "relative w-[260px] shrink-0 cursor-pointer rounded-2xl border-2 p-5 transition-all",
              selectedTier === i ? "border-blue-500 bg-white shadow-lg" : "border-gray-200 bg-white"
            )}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                Most Popular
              </div>
            )}
            <h3 className="text-lg font-bold text-gray-900">{tier.name}</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-bold">\${tier.price}</span>
              <span className="text-gray-500">{tier.period}</span>
            </div>
            <div className="mt-4 space-y-2">
              {tier.features.map((f, j) => (
                <div key={j} className="flex items-center gap-2 text-sm">
                  {f.included ? <Check className="size-4 text-green-500" /> : <X className="size-4 text-gray-300" />}
                  <span className={f.included ? "text-gray-700" : "text-gray-400"}>{f.text}</span>
                </div>
              ))}
            </div>
            <button className={cn(
              "mt-5 w-full rounded-xl py-3 text-sm font-semibold",
              tier.popular ? "bg-blue-500 text-white" : "border-2 border-gray-200 text-gray-700"
            )}>
              {tier.buttonText}
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}`;

const paywallCode = `"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Infinity, Zap, Shield, Sparkles, X } from "lucide-react";

export function PaywallScreen() {
  const features = [
    { icon: Infinity, title: "Unlimited Access", description: "No limits on what you can do" },
    { icon: Zap, title: "Lightning Fast", description: "Premium servers for speed" },
    { icon: Shield, title: "Enhanced Privacy", description: "Your data stays yours" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-[700px] flex-col bg-black p-6 text-white"
    >
      <button className="absolute right-4 top-4 text-white/50"><X className="size-6" /></button>

      {/* Hero */}
      <div className="mt-8 text-center">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
          <Sparkles className="size-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold">Unlock Everything</h1>
        <p className="mt-2 text-white/60">Get the most out of your experience</p>
      </div>

      {/* Features */}
      <div className="mt-8 space-y-4">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-4 rounded-2xl bg-white/5 p-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
              <feature.icon className="size-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-white/60">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Options */}
      <div className="mt-auto space-y-3">
        <button className="relative w-full rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-left">
          <div className="absolute right-3 top-3 rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">Best Value</div>
          <div className="text-lg font-bold">Annual</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">$49.99</span>
            <span className="text-white/70">/year</span>
          </div>
          <div className="text-sm text-white/70">7-day free trial</div>
        </button>
        <button className="w-full rounded-2xl border border-white/20 bg-white/5 p-4 text-left">
          <div className="text-lg font-bold">Monthly</div>
          <span className="text-2xl font-bold">$9.99</span>
          <span className="text-white/70">/month</span>
        </button>
        <p className="text-center text-xs text-white/40">Cancel anytime. Terms apply.</p>
      </div>
    </motion.div>
  );
}`;

const pricingScreens: UiItem[] = [
  {
    id: "subscription-pricing",
    title: "Subscription Pricing Screen",
    description:
      "A premium subscription pricing screen with monthly/yearly toggle, feature list with checkmarks, and prominent CTA—perfect for SaaS apps, premium memberships, and freemium upsells.",
    tags: [
      "pricing",
      "subscription",
      "paywall",
      "premium",
      "monetization",
      "saas",
    ],
    code: subscriptionPricingCode,
    Preview: SubscriptionPricingPreview,
  },
  {
    id: "tiered-pricing",
    title: "Tiered Pricing Screen",
    description:
      "A horizontal scrolling tiered pricing screen with Basic/Pro/Team plans, feature comparison, and highlighted popular option—ideal for SaaS products and multi-tier subscriptions.",
    tags: ["pricing", "tiers", "saas", "plans", "comparison", "freemium"],
    code: tieredPricingCode,
    Preview: TieredPricingPreview,
  },
  {
    id: "paywall",
    title: "App Paywall Screen",
    description:
      "A dark-themed app paywall with premium features showcase, annual/monthly pricing options, and free trial emphasis—great for content apps, utilities, and premium mobile apps.",
    tags: [
      "paywall",
      "pricing",
      "premium",
      "subscription",
      "dark-theme",
      "trial",
    ],
    code: paywallCode,
    Preview: PaywallPreview,
  },
];

export default function PricingScreensPage() {
  const toc = pricingScreens.map(({ id, title }) => ({ id, title }));

  return (
    <div className="pb-16">
      <ScreensJsonLd items={pricingScreens} />

      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700">
              React + Tailwind
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700">
              Copy-paste code
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700">
              Monetization UI
            </span>
          </div>

          <h1 className="mt-4 text-[40px] leading-[1.1] font-[600] tracking-tight sm:text-[54px]">
            Pricing Screens
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-700 sm:text-lg">
            Production-ready pricing screen templates for subscription tiers,
            freemium models, and in-app purchase flows. Each template includes
            live preview and copy-paste code.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm">
              <span className="font-semibold">{pricingScreens.length}</span>{" "}
              pricing templates
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm">
              <span className="font-semibold">Preview</span> + code tabs
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Link
                href="/components/screens"
                className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
              >
                ← All Screens
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Content grid */}
      <div
        id="all"
        className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]"
      >
        {/* Main */}
        <div className="min-w-0">
          <div className="flex flex-col gap-10">
            {pricingScreens.map((item) => (
              <section key={item.id} id={item.id} className="scroll-mt-24">
                <ComponentWrapper
                  heading={item.title}
                  codeExample={item.code}
                  description={item.description}
                  id={item.id}
                  isDark={
                    item.id === "paywall" || item.id === "subscription-pricing"
                  }
                  fullMockup
                >
                  <item.Preview />
                </ComponentWrapper>
              </section>
            ))}
          </div>
        </div>

        {/* Right rail (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border border-gray-200 bg-white p-5">
            <div className="text-xs font-semibold text-gray-500">
              ON THIS PAGE
            </div>

            <ul className="mt-3 space-y-1">
              {toc.map((x) => (
                <li key={x.id}>
                  <a
                    href={`#${x.id}`}
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
                  >
                    {x.title}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4">
              <div className="text-xs font-semibold tracking-wide text-gray-500">
                ALSO SEE
              </div>
              <Link
                href="/components/screens"
                className="mt-2 block rounded-xl px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
              >
                Screens →
                <div className="mt-0.5 text-xs text-gray-500">
                  Full UI screens and layouts
                </div>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
