"use client";

import { Clock, CheckCircle2, Zap } from "lucide-react";
import usePurchaseStats from "@/hooks/use-purchase-stats";
import Button from "./Button";

export default function TutorialPricingCTA() {
  const { customersCount, discountLimit } = usePurchaseStats();

  const handleGetNextNative = () => {
    window?.datafast?.("tutorial_pricing_cta_get_nextnative_clicked");
  };

  const handleLearnMore = () => {
    window?.datafast?.("tutorial_pricing_cta_learn_more_clicked");
  };

  return (
    <section className="border-primary/20 from-primary/5 my-16 rounded-3xl border-2 p-8 shadow-lg md:p-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Zap className="text-primary h-8 w-8" />
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Get Everything Pre-Built
            </h2>
          </div>
          <p className="text-lg text-gray-700 md:text-xl">
            Skip 40+ hours of setup. NextNative includes auth, payments, push
            notifications, and 7 template apps.
          </p>
        </div>

        {/* Time Comparison */}
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-gray-300 bg-white p-6">
            <div className="mb-4 flex items-center gap-3">
              <Clock className="h-6 w-6 text-gray-500" />
              <h3 className="text-xl font-semibold text-gray-900">
                Manual Setup
              </h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                <span>30 mins basic setup</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                <span>Hours adding auth & payments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                <span>Days debugging iOS/Android</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                <span>No templates or examples</span>
              </li>
            </ul>
            <div className="mt-4 border-t-2 border-gray-200 pt-4">
              <p className="text-xl font-bold text-red-600">
                Total: 40-80+ hours
              </p>
            </div>
          </div>

          <div className="border-primary/50 rounded-2xl border-2 bg-white p-6">
            <div className="mb-4 flex items-center gap-3">
              <Zap className="text-primary h-6 w-6" />
              <h3 className="text-xl font-semibold text-gray-900">
                With NextNative
              </h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-primary h-5 w-5 flex-shrink-0" />
                <span>Next.js + Capacitor boilerplate</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-primary h-5 w-5 flex-shrink-0" />
                <span>Auth & onboarding flow</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-primary h-5 w-5 flex-shrink-0" />
                <span>In-app purchases & subscriptions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-primary h-5 w-5 flex-shrink-0" />
                <span>7 template apps + app store guides</span>
              </li>
            </ul>
            <div className="border-primary/20 mt-4 border-t-2 pt-4">
              <p className="text-primary text-xl font-bold">
                Ready in 5 minutes
              </p>
            </div>
          </div>
        </div>

        {/* Value Prop */}
        <div className="mb-8 rounded-2xl bg-white p-6 text-center">
          <p className="mb-2 text-xl font-semibold text-gray-900 md:text-2xl">
            One-time payment: <span className="text-primary">$125</span>
            <span className="ml-2 text-lg text-gray-500 line-through">
              $249
            </span>
          </p>
          <p className="text-gray-600">
            <span className="font-semibold text-red-500">
              50% off for the first {discountLimit} customers
            </span>
            , {discountLimit - customersCount} spots left
          </p>
          <p className="mt-2 text-base text-gray-600">Build unlimited apps.</p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            onClick={() => {
              handleGetNextNative();
              window.location.href = "/#pricing";
            }}
            variant="primary"
          >
            Get NextNative - $125 →
          </Button>
          <Button
            onClick={() => {
              handleLearnMore();
              window.location.href = "/";
            }}
            variant="secondary"
          >
            Learn More
          </Button>
        </div>

        {/* Trust signals */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="text-primary h-5 w-5" />
            Lifetime updates
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="text-primary h-5 w-5" />3 months support
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="text-primary h-5 w-5" />
            Team license included
          </span>
        </div>
      </div>
    </section>
  );
}
