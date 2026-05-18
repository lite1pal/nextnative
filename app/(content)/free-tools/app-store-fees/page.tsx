"use client";

import { useState } from "react";
import HighlightedSpan from "@/components/HighlightedSpan";

export default function AppStoreFees() {
  const [revenue, setRevenue] = useState(10000);
  const [platform, setPlatform] = useState<"apple" | "google">("apple");
  const [programType, setProgramType] = useState<"standard" | "small-business">(
    "standard",
  );

  // Apple: 30% standard, 15% for small business program (< $1M/year)
  // Google: 30% standard, 15% for first $1M/year
  const calculateFees = () => {
    let commissionRate = 30;

    if (platform === "apple") {
      commissionRate = programType === "small-business" ? 15 : 30;
    } else {
      // Google Play: first $1M is 15%, rest is 30%
      if (revenue <= 1000000) {
        commissionRate = 15;
      } else {
        const firstMillion = 1000000 * 0.15;
        const remainder = (revenue - 1000000) * 0.3;
        const totalFees = firstMillion + remainder;
        return {
          commissionRate: Math.round((totalFees / revenue) * 100),
          platformFee: totalFees,
          netRevenue: revenue - totalFees,
        };
      }
    }

    const platformFee = (revenue * commissionRate) / 100;
    const netRevenue = revenue - platformFee;

    return { commissionRate, platformFee, netRevenue };
  };

  const { commissionRate, platformFee, netRevenue } = calculateFees();

  return (
    <div className="mx-auto w-full max-w-[962px] py-12 xl:max-w-[1260px]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 py-10 text-center">
          <h1 className="mb-4 text-4xl font-semibold text-gray-900 md:text-[74px] md:leading-[91px]">
            App Store Fees <HighlightedSpan>Calculator</HighlightedSpan> 💰
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600">
            Calculate how much Apple App Store and Google Play Store take from
            your app revenue. Updated with the latest commission rates and small
            business programs.
          </p>

          {/* Social proof / usage stats */}
          <div className="mx-auto flex flex-wrap items-center justify-center gap-6 text-base text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                💰
              </span>
              <span>
                <strong className="text-gray-900">Real-time</strong> calculation
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                📊
              </span>
              <span>
                <strong className="text-gray-900">Apple & Google</strong> fees
              </span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-3xl" aria-hidden="true">
                ✨
              </span>
              <span>
                <strong className="text-gray-900">Small business</strong> rates
              </span>
            </div>
          </div>
        </div>

        {/* Platform Toggle */}
        <div className="mb-6 flex justify-center gap-4">
          <button
            onClick={() => setPlatform("apple")}
            className={`rounded-xl px-6 py-2 font-semibold transition ${
              platform === "apple"
                ? "bg-green-600 text-white"
                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Apple App Store
          </button>
          <button
            onClick={() => setPlatform("google")}
            className={`rounded-xl px-6 py-2 font-semibold transition ${
              platform === "google"
                ? "bg-green-600 text-white"
                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Google Play Store
          </button>
        </div>

        {/* Inputs */}
        <div className="mb-8 space-y-4">
          <label className="flex flex-col text-left">
            <span className="mb-1 font-medium">
              Annual Revenue (before fees)
            </span>
            <input
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(+e.target.value)}
              className="rounded-xl border border-gray-300 bg-white p-3 text-gray-900"
              step="100"
              min="0"
            />
          </label>

          {platform === "apple" && (
            <label className="flex flex-col text-left">
              <span className="mb-1 font-medium">Program Type</span>
              <select
                value={programType}
                onChange={(e) =>
                  setProgramType(
                    e.target.value as "standard" | "small-business",
                  )
                }
                className="rounded-xl border border-gray-300 bg-white p-3 text-gray-900"
              >
                <option value="standard">Standard (30% commission)</option>
                <option value="small-business">
                  Small Business Program (15% commission, &lt; $1M/year)
                </option>
              </select>
            </label>
          )}
        </div>

        {/* Results */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Fee Breakdown
          </h2>
          <div className="space-y-2 text-left text-gray-700">
            <div className="flex items-center justify-between">
              <span className="font-medium">Gross Revenue:</span>
              <span className="text-lg font-semibold text-gray-900">
                ${revenue.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">
                {platform === "apple" ? "Apple" : "Google"} Commission (
                {commissionRate}%):
              </span>
              <span className="text-lg font-semibold text-red-600">
                –${platformFee.toLocaleString()}
              </span>
            </div>
            <hr className="my-3 border-gray-300" />
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">Net Revenue:</span>
              <span className="text-2xl font-bold text-green-600">
                ${netRevenue.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 rounded-2xl bg-blue-50 p-6 text-left">
          <h3 className="mb-2 font-semibold text-gray-900">
            💡 Fee Structure Explained
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            {platform === "apple" ? (
              <>
                <p>
                  <strong>Standard:</strong> Apple takes 30% of all revenue from
                  paid apps, in-app purchases, and subscriptions (15% after
                  first year for subscriptions).
                </p>
                <p>
                  <strong>Small Business Program:</strong> If you made less than
                  $1M in the previous calendar year, you qualify for a reduced
                  15% commission rate.
                </p>
                <p>
                  <strong>Note:</strong> Once you exceed $1M in a calendar year,
                  you'll revert to the 30% rate for the remainder of that year.
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>Google Play:</strong> 15% commission on the first $1M
                  of revenue each year, then 30% on revenue above $1M.
                </p>
                <p>
                  <strong>Example:</strong> If you earn $2M, you pay 15% on the
                  first $1M ($150k) and 30% on the remaining $1M ($300k), for a
                  total of $450k in fees.
                </p>
                <p>
                  <strong>Note:</strong> This applies automatically to all
                  developers—no enrollment required.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 text-left">
          <h3 className="mb-2 font-semibold text-gray-900">
            What fees are NOT included?
          </h3>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>
              • Payment processor fees (like RevenueCat, Stripe for web, etc.)
            </li>
            <li>• VAT/sales tax (varies by country)</li>
            <li>• Currency conversion fees</li>
            <li>
              • Developer account annual fee ($99 for Apple, $25 one-time for
              Google)
            </li>
          </ul>
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
  );
}
