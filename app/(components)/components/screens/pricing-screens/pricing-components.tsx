"use client";

import { cn } from "@/lib/utils";
import {
  Check,
  X,
  Shield,
  Infinity,
  Crown,
  Zap,
  Star,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

// ============================================
// 1. SUBSCRIPTION PRICING SCREEN (Duolingo/Spotify style)
// ============================================
export function SubscriptionPricingScreen() {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">(
    "yearly",
  );

  const plans = {
    monthly: { price: 9.99, period: "month", savings: null as string | null },
    yearly: { price: 59.99, period: "year", savings: "Save 50%" },
  };

  const features = [
    "Unlimited access to all content",
    "Ad-free experience",
    "Offline downloads",
    "Priority support",
    "Exclusive member perks",
  ];

  const yearlyPerMonth = (plans.yearly.price / 12).toFixed(2);

  return (
    <div className="relative flex min-h-[850px] flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-600 to-purple-700 px-4 pt-16 pb-10 text-white">
      {/* soft glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-black/15 blur-3xl" />

      {/* Header */}
      <div className="relative text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-white/12 ring-1 ring-white/15">
          <Crown className="size-7 text-yellow-300" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">Go Premium</h1>
        <p className="mt-2 text-sm text-white/75">
          Unlock the full experience. Cancel anytime.
        </p>
      </div>

      {/* Main card */}
      <div className="relative mt-6 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
        {/* Plan switcher */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setSelectedPlan("monthly")}
            className={cn(
              "relative rounded-xl px-4 py-3 text-left transition",
              selectedPlan === "monthly"
                ? "bg-white text-indigo-700 shadow-sm"
                : "bg-white/5 text-white hover:bg-white/10",
            )}
          >
            <div className="text-sm font-semibold">Monthly</div>
            <div
              className={cn(
                "mt-1 text-xs",
                selectedPlan === "monthly"
                  ? "text-indigo-700/70"
                  : "text-white/70",
              )}
            >
              ${plans.monthly.price}/{plans.monthly.period}
            </div>
          </button>

          <button
            onClick={() => setSelectedPlan("yearly")}
            className={cn(
              "relative rounded-xl px-4 py-3 text-left transition",
              selectedPlan === "yearly"
                ? "bg-white text-indigo-700 shadow-sm"
                : "bg-white/5 text-white hover:bg-white/10",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold">Yearly</span>
              {plans.yearly.savings && (
                <span className="rounded-full bg-emerald-500/90 px-2 py-0.5 text-[11px] font-semibold text-white">
                  {plans.yearly.savings}
                </span>
              )}
            </div>
            <div
              className={cn(
                "mt-1 text-xs",
                selectedPlan === "yearly"
                  ? "text-indigo-700/70"
                  : "text-white/70",
              )}
            >
              ${plans.yearly.price}/{plans.yearly.period}
            </div>
          </button>
        </div>

        {/* Price */}
        <div className="mt-6 text-center">
          <div className="flex items-end justify-center gap-1">
            <span className="text-5xl font-semibold tracking-tight">
              ${plans[selectedPlan].price}
            </span>
            <span className="pb-2 text-sm text-white/70">
              /{plans[selectedPlan].period}
            </span>
          </div>

          {selectedPlan === "yearly" && (
            <p className="mt-2 text-xs text-white/70">
              Works out to{" "}
              <span className="font-semibold text-white">
                ${yearlyPerMonth}
              </span>
              /month
            </p>
          )}
        </div>

        {/* Features */}
        <div className="mt-6 rounded-2xl bg-black/10 p-4 ring-1 ring-white/10">
          <div className="space-y-3">
            {features.map((text, i) => (
              <div key={text} className="flex items-center gap-3">
                <div className="flex size-6 items-center justify-center rounded-full bg-emerald-400/90">
                  <Check className="size-4 text-emerald-950" />
                </div>
                <span className="text-sm text-white/90">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative mt-auto pt-6">
        <button className="w-full rounded-2xl bg-white py-4 text-base font-semibold text-indigo-700 shadow-lg shadow-black/10 transition active:scale-[0.99]">
          Start free trial
        </button>

        <button className="mt-3 w-full py-2 text-sm text-white/70 hover:text-white/90">
          Maybe later
        </button>

        <p className="mt-3 text-center text-[11px] leading-relaxed text-white/60">
          Payment will be charged to your account at the end of the trial. You
          can cancel anytime.
        </p>
      </div>
    </div>
  );
}

// ============================================
// 2. TIERED PRICING SCREEN (SaaS style)
// ============================================
// ============================================
// 2. TIERED PRICING SCREEN (SaaS style, follows Subscription patterns)
// ============================================
export function TieredPricingScreen() {
  const [selectedTier, setSelectedTier] = useState(1);

  const tiers = [
    {
      name: "Basic",
      price: 0,
      period: "forever",
      description: "For casual users",
      features: [
        { text: "5 projects", included: true },
        { text: "Basic analytics", included: true },
        { text: "Community support", included: true },
        { text: "Advanced features", included: false },
        { text: "Priority support", included: false },
      ],
      cta: "Current plan",
      variant: "muted" as const,
    },
    {
      name: "Pro",
      price: 12,
      period: "month",
      description: "For power users",
      features: [
        { text: "Unlimited projects", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Priority support", included: true },
        { text: "Custom integrations", included: true },
        { text: "Team collaboration", included: false },
      ],
      cta: "Upgrade to Pro",
      variant: "primary" as const,
      popular: true,
    },
    {
      name: "Team",
      price: 29,
      period: "month",
      description: "For teams",
      features: [
        { text: "Everything in Pro", included: true },
        { text: "Team collaboration", included: true },
        { text: "Admin dashboard", included: true },
        { text: "SSO authentication", included: true },
        { text: "Dedicated support", included: true },
      ],
      cta: "Contact sales",
      variant: "outline" as const,
    },
  ];

  const tier = tiers[selectedTier];

  return (
    <div className="relative flex min-h-[850px] flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-slate-950 to-slate-900 px-4 pt-16 pb-10 text-white">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
          <Zap className="size-7 text-white/90" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">Choose a plan</h1>
        <p className="mt-2 text-sm text-white/70">
          Pick what fits today. Upgrade anytime.
        </p>
      </div>

      <div className="relative mt-6 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
        <div className="grid grid-cols-3 gap-2">
          {tiers.map((t, i) => {
            const active = selectedTier === i;

            return (
              <button
                key={t.name}
                onClick={() => setSelectedTier(i)}
                className={cn(
                  "relative rounded-xl px-3 py-3 text-left transition",
                  active
                    ? "bg-white text-slate-950 shadow-sm"
                    : "bg-white/5 text-white hover:bg-white/10",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-semibold">{t.name}</div>
                  {t.popular ? (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                        active
                          ? "bg-slate-950/10 text-slate-900"
                          : "bg-white/10 text-white/80",
                      )}
                    >
                      Popular
                    </span>
                  ) : null}
                </div>

                <div
                  className={cn(
                    "mt-1 text-xs",
                    active ? "text-slate-600" : "text-white/70",
                  )}
                >
                  {t.price === 0 ? (
                    "Free"
                  ) : (
                    <>
                      ${t.price}/<span className="capitalize">{t.period}</span>
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <div className="flex items-end justify-center gap-1">
            <span className="text-5xl font-semibold tracking-tight">
              {tier.price === 0 ? "Free" : `$${tier.price}`}
            </span>
            {tier.price !== 0 ? (
              <span className="pb-2 text-sm text-white/70">/{tier.period}</span>
            ) : null}
          </div>

          <p className="mt-2 text-xs text-white/70">{tier.description}</p>
        </div>

        <div className="mt-6 rounded-2xl bg-black/10 p-4 ring-1 ring-white/10">
          <div className="space-y-3">
            {tier.features.map((f, i) => (
              <div key={f.text} className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full",
                    f.included ? "bg-emerald-400/90" : "bg-white/10",
                  )}
                >
                  {f.included ? (
                    <Check className="size-4 text-emerald-950" />
                  ) : (
                    <X className="size-4 text-white/40" />
                  )}
                </div>

                <span
                  className={cn(
                    "text-sm",
                    f.included ? "text-white/90" : "text-white/45",
                  )}
                >
                  {f.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust row (quiet) */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-white/55">
          <div className="flex items-center gap-1.5 text-xs">
            <Shield className="size-4" />
            <span>Secure payment</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <Star className="size-4" />
            <span>30-day guarantee</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <Infinity className="size-4" />
            <span>Upgrade anytime</span>
          </div>
        </div>
      </div>

      <div className="relative mt-auto pt-6">
        <button
          className={cn(
            "w-full rounded-2xl py-4 text-base font-semibold shadow-lg shadow-black/10 transition active:scale-[0.99]",
            tier.variant === "primary" && "bg-white text-slate-950",
            tier.variant === "outline" &&
              "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15",
            tier.variant === "muted" &&
              "bg-white/10 text-white/70 ring-1 ring-white/15",
          )}
          disabled={tier.variant === "muted"}
        >
          {tier.cta}
        </button>

        <button className="mt-3 w-full py-2 text-sm text-white/60 hover:text-white/85">
          Not now
        </button>

        <p className="mt-3 text-center text-[11px] leading-relaxed text-white/45">
          Prices shown in USD. Taxes may apply. Cancel anytime.
        </p>
      </div>
    </div>
  );
}

// ============================================
// 3. PAYWALL SCREEN (Apple-style)
// ============================================
export function PaywallScreen() {
  const [plan, setPlan] = useState<"yearly" | "monthly">("yearly");

  const pricing = {
    yearly: {
      price: 49.99,
      period: "year",
      note: "Best value",
      trial: "7-day free trial",
    },
    monthly: {
      price: 9.99,
      period: "month",
      note: null as string | null,
      trial: null as string | null,
    },
  };

  const features = [
    "Unlimited access to everything",
    "Faster sync and premium servers",
    "Offline mode and downloads",
    "Enhanced privacy controls",
    "Priority support",
  ];

  const perMonth = (pricing.yearly.price / 12).toFixed(2);

  return (
    <div className="relative flex min-h-[850px] flex-col overflow-hidden rounded-3xl bg-white p-6 text-slate-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-slate-200/70 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-200/60 blur-3xl" />
      </div>

      <button
        className="absolute top-4 right-4 z-10 rounded-xl border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50"
        aria-label="Close"
        type="button"
      >
        <X className="size-5" />
      </button>

      <div className="relative mt-10">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">
            <Sparkles className="size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Unlock Pro
            </h1>
            <p className="mt-0.5 text-sm text-slate-600">
              Everything you need, without limits.
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-6 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setPlan("yearly")}
            className={cn(
              "relative rounded-xl px-4 py-3 text-left transition",
              plan === "yearly"
                ? "bg-slate-950 text-white"
                : "bg-slate-50 text-slate-900 hover:bg-slate-100",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold">Yearly</span>
              <span
                className={cn(
                  "rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800",
                )}
              >
                Best value
              </span>
            </div>
            <div
              className={cn(
                "mt-1 text-xs",
                plan === "yearly" ? "text-white/75" : "text-slate-600",
              )}
            >
              ${pricing.yearly.price}/{pricing.yearly.period} • ${perMonth}/mo
            </div>
          </button>

          <button
            type="button"
            onClick={() => setPlan("monthly")}
            className={cn(
              "relative rounded-xl px-4 py-3 text-left transition",
              plan === "monthly"
                ? "bg-slate-950 text-white"
                : "bg-slate-50 text-slate-900 hover:bg-slate-100",
            )}
          >
            <div className="text-sm font-semibold">Monthly</div>
            <div
              className={cn(
                "mt-1 text-xs",
                plan === "monthly" ? "text-white/75" : "text-slate-600",
              )}
            >
              ${pricing.monthly.price}/{pricing.monthly.period}
            </div>
          </button>
        </div>
      </div>

      <div className="relative mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-900">
            What you get
          </div>
          {plan === "yearly" && pricing.yearly.trial ? (
            <div className="text-xs font-medium text-emerald-700">
              {pricing.yearly.trial}
            </div>
          ) : null}
        </div>

        <div className="mt-3 space-y-2.5">
          {features.map((text, i) => (
            <div key={text} className="flex items-center gap-3">
              <div className="flex size-6 items-center justify-center rounded-full bg-emerald-500">
                <Check className="size-4 text-white" />
              </div>
              <span className="text-sm text-slate-700">{text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <Shield className="size-4" />
          <span>Secure payment</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Infinity className="size-4" />
          <span>Cancel anytime</span>
        </div>
      </div>
      <div className="relative mt-auto pt-6">
        <button
          className="w-full rounded-2xl bg-slate-950 py-4 text-base font-semibold text-white shadow-lg shadow-slate-950/10 transition active:scale-[0.99]"
          type="button"
        >
          Continue
        </button>

        <div className="mt-3 text-center text-[11px] leading-relaxed text-slate-500">
          {plan === "yearly" ? (
            <>
              After the trial, billed ${pricing.yearly.price}/
              {pricing.yearly.period}. Cancel anytime.
            </>
          ) : (
            <>
              Billed ${pricing.monthly.price}/{pricing.monthly.period}. Cancel
              anytime.
            </>
          )}
        </div>

        <button
          className="mt-4 w-full py-2 text-center text-sm text-slate-600 hover:text-slate-900"
          type="button"
        >
          Restore purchases
        </button>
      </div>
    </div>
  );
}
