"use client";

import { useState } from "react";
import HighlightedSpan from "@/components/HighlightedSpan";

export default function AppStoreScreenshotSizes() {
  const [platform, setPlatform] = useState<"ios" | "android">("ios");

  const iosDevices = [
    {
      device: "iPhone 16 Pro Max",
      displaySize: '6.9"',
      resolution: "1320 × 2868 px",
      aspectRatio: "19.5:9",
    },
    {
      device: "iPhone 16 Pro",
      displaySize: '6.3"',
      resolution: "1206 × 2622 px",
      aspectRatio: "19.5:9",
    },
    {
      device: "iPhone 16 Plus",
      displaySize: '6.7"',
      resolution: "1290 × 2796 px",
      aspectRatio: "19.5:9",
    },
    {
      device: "iPhone 16",
      displaySize: '6.1"',
      resolution: "1179 × 2556 px",
      aspectRatio: "19.5:9",
    },
    {
      device: "iPhone 15 Pro Max",
      displaySize: '6.7"',
      resolution: "1290 × 2796 px",
      aspectRatio: "19.5:9",
    },
    {
      device: "iPhone 15 Pro",
      displaySize: '6.1"',
      resolution: "1179 × 2556 px",
      aspectRatio: "19.5:9",
    },
    {
      device: "iPhone 14 Pro Max",
      displaySize: '6.7"',
      resolution: "1290 × 2796 px",
      aspectRatio: "19.5:9",
    },
    {
      device: "iPhone SE (3rd gen)",
      displaySize: '4.7"',
      resolution: "750 × 1334 px",
      aspectRatio: "16:9",
    },
    {
      device: 'iPad Pro 13" (M4)',
      displaySize: '13"',
      resolution: "2064 × 2752 px",
      aspectRatio: "4:3",
    },
    {
      device: 'iPad Pro 12.9"',
      displaySize: '12.9"',
      resolution: "2048 × 2732 px",
      aspectRatio: "4:3",
    },
    {
      device: 'iPad Pro 11"',
      displaySize: '11"',
      resolution: "1668 × 2388 px",
      aspectRatio: "4:3",
    },
  ];

  const androidDevices = [
    {
      device: "Phone",
      displaySize: 'Up to 7"',
      resolution: "1080 × 1920 px (min)",
      note: "16:9 or taller",
    },
    {
      device: '7" Tablet',
      displaySize: '7"',
      resolution: "1200 × 1920 px (min)",
      note: "16:10 recommended",
    },
    {
      device: '10" Tablet',
      displaySize: '10"',
      resolution: "1600 × 2560 px (min)",
      note: "16:10 recommended",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[962px] py-12 xl:max-w-[1260px]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 py-10 text-center">
          <h1 className="mb-4 text-4xl font-semibold text-gray-900 md:text-[74px] md:leading-[91px]">
            App Store Screenshot <HighlightedSpan>Sizes</HighlightedSpan> 📱
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600">
            Complete reference for iOS App Store and Google Play screenshot
            dimensions. Updated for 2025 with the latest iPhone & iPad models.
          </p>

          {/* Social proof / usage stats */}
          <div className="mx-auto flex flex-wrap items-center justify-center gap-6 text-base text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                📱
              </span>
              <span>
                <strong className="text-gray-900">iOS & Android</strong> sizes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                ⚡
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
                <strong className="text-gray-900">Quick reference</strong>
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

        {/* iOS Table */}
        {platform === "ios" && (
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-900">
                    Device
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-900">
                    Display Size
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-900">
                    Screenshot Resolution
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-900">
                    Aspect Ratio
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {iosDevices.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{item.device}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {item.displaySize}
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-gray-900">
                      {item.resolution}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {item.aspectRatio}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Android Table */}
        {platform === "android" && (
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-900">
                    Device Type
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-900">
                    Display Size
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-900">
                    Minimum Resolution
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-900">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {androidDevices.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{item.device}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {item.displaySize}
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-gray-900">
                      {item.resolution}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Requirements Box */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            {platform === "ios"
              ? "App Store Screenshot Requirements"
              : "Google Play Screenshot Requirements"}
          </h2>
          <ul className="space-y-2 text-gray-700">
            {platform === "ios" ? (
              <>
                <li>
                  • <strong>Format:</strong> JPG or PNG (no transparency)
                </li>
                <li>
                  • <strong>Color space:</strong> RGB (not CMYK)
                </li>
                <li>
                  • <strong>Number:</strong> Up to 10 screenshots per device
                  size
                </li>
                <li>
                  • <strong>Orientation:</strong> Portrait or landscape (must
                  match for all screenshots in a set)
                </li>
                <li>
                  • <strong>Required sizes:</strong> At least one set for 6.7"
                  or 6.9" display
                </li>
              </>
            ) : (
              <>
                <li>
                  • <strong>Format:</strong> JPG or PNG (24-bit RGB, no alpha)
                </li>
                <li>
                  • <strong>Number:</strong> Minimum 2, maximum 8 per device
                  type
                </li>
                <li>
                  • <strong>File size:</strong> Max 8 MB each
                </li>
                <li>
                  • <strong>Aspect ratio:</strong> Between 16:9 and 9:16
                </li>
                <li>
                  • <strong>Minimum dimension:</strong> 320 px on shortest side
                </li>
                <li>
                  • <strong>Maximum dimension:</strong> 3840 px on longest side
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Tips */}
        <div className="mt-8 rounded-2xl bg-green-50 p-6">
          <h3 className="mb-2 font-semibold text-gray-900">💡 Pro Tips</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>
              • You only need to provide screenshots for one device size per
              category
            </li>
            <li>
              • Apple will scale your screenshots to fit other devices
              automatically
            </li>
            <li>
              • For best results, design for the largest size in each category
            </li>
            <li>
              • Use our{" "}
              <a
                href="/free-tools/app-store-screenshot-generator"
                className="font-semibold text-green-600 underline"
              >
                Screenshot Generator
              </a>{" "}
              to create beautiful app store screenshots
            </li>
          </ul>
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
