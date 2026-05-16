"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

function normalizeUrl(input: string) {
  try {
    const u = new URL(input.startsWith("http") ? input : `https://${input}`);
    return u.origin + u.pathname;
  } catch {
    return "";
  }
}

export default function ConvertWebsiteToAppPage() {
  const [urlInput, setUrlInput] = useState("https://hotwire.dev");
  const [url, setUrl] = useState("https://hotwire.dev");

  const valid = useMemo(() => !!normalizeUrl(urlInput), [urlInput]);

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    const n = normalizeUrl(urlInput);
    if (n) setUrl(n);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* HERO */}
      <section className="flex flex-col gap-6 text-center">
        <h1 className="mb-3 text-4xl font-bold text-gray-900 md:text-5xl">
          Website-to-App Preview
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-gray-600">
          Preview any website inside a mobile frame.
        </p>

        <form
          onSubmit={handlePreview}
          className="mx-auto mb-10 flex w-full max-w-2xl flex-col gap-3 sm:flex-row"
        >
          <input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://your-website.com"
            className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900"
            aria-label="Website URL"
          />
          <button
            type="submit"
            disabled={!valid}
            className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
          >
            Preview
          </button>
        </form>

        {/* PHONE MOCK PREVIEW */}

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
          <IPhoneMockup>
            <div className="aspect-[9/19] overflow-hidden bg-white">
              {/* Some sites block iframes via X-Frame-Options; we show a friendly note if so */}
              <iframe
                key={url}
                src={url}
                className="h-full w-full"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              If the site doesn’t load in the preview, it likely blocks iframes.
              That’s OK — it will still work inside a native WebView.
            </p>
          </IPhoneMockup>

          <NextNativeUpsellCard />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto mt-16 max-w-5xl">
        <h2 className="mb-4 text-3xl font-semibold text-gray-900">
          How it works
        </h2>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            [
              "1. Wrap with Capacitor",
              "Add a lightweight native shell around your web app.",
            ],
            [
              "2. Configure icons & splash",
              "Generate assets and set your bundle ID.",
            ],
            [
              "3. Build iOS & Android",
              "Open Xcode/Android Studio and submit to the stores.",
            ],
          ].map(([t, d]) => (
            <li
              key={t}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <h3 className="mb-1 font-semibold">{t}</h3>
              <p className="text-gray-600">{d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-gray-600">
          NextNative bundles all configs and store requirements so your web app
          passes review on the first try. Need native APIs? Enable push
          notifications, camera, file access, in-app purchases and more, all via
          Capacitor plugins.
        </p>
      </section>

      {/* FAQ (visible content) */}
      <section className="mx-auto mt-16 max-w-5xl">
        <h2 className="mb-4 text-3xl font-semibold text-gray-900">FAQ</h2>
        <div className="space-y-4">
          <details className="rounded-xl border border-gray-200 p-4">
            <summary className="cursor-pointer font-medium">
              Can I access native features like camera or push notifications?
            </summary>
            <p className="mt-2 text-gray-600">
              Absolutely. Capacitor plugins expose camera, files, push,
              biometrics, and more. NextNative includes prewired examples.
            </p>
          </details>
        </div>
      </section>

      {/* JSON-LD for FAQ + HowTo */}
      <script
        type="application/ld+json"
        // FAQ + HowTo schema to boost rich results
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Convert Website to App",
            mainEntity: [
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Can I access native features like camera or push notifications?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Capacitor plugins expose camera, files, push, biometrics, and more. NextNative includes prewired examples.",
                    },
                  },
                ],
              },
              {
                "@type": "HowTo",
                name: "How to convert a website into a mobile app",
                step: [
                  { "@type": "HowToStep", name: "Wrap with Capacitor" },
                  { "@type": "HowToStep", name: "Configure icons & splash" },
                  { "@type": "HowToStep", name: "Build for iOS & Android" },
                ],
              },
            ],
          }),
        }}
      />
    </div>
  );
}

import HighlightedSpan from "@/components/HighlightedSpan";
import LogoSymbol from "@/components/LogoSymbol";
import { AvatarList } from "@/components/AvatarList";
import RatingSvg from "@/components/RatingSvg";
import IPhoneMockup from "@/components/iphone-mockup";
import CTABlogButton from "../blog/[slug]/CTABlogButton";

function NextNativeUpsellCard() {
  return (
    <div
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
      className="border-primary h-fit rounded-xl border-2 bg-white p-6"
    >
      <div className="flex flex-col items-center gap-1.5 text-center">
        <div className="flex items-center gap-3">
          <LogoSymbol />
        </div>

        <h4 className="mt-6 text-2xl font-semibold text-gray-900">
          Turn this preview into a real app
          <br /> with <HighlightedSpan>NextNative</HighlightedSpan>
        </h4>

        <p className="mt-2 max-w-md text-base text-gray-600">
          You’re already <strong>85%</strong> there.
          <br />
          <br />
          With NextNative you're getting a production-ready Next.js + Capacitor
          boilerplate that lets you ship real iOS & Android apps using your
          existing web stack.
        </p>

        <CTABlogButton post={{ slug: "converter" }} />
        <p className="mt-3 flex flex-col gap-1.5 text-gray-600">
          Want the exact steps?{" "}
          <Link
            href="/tutorials/convert-nextjs-to-mobile-app"
            className="font-semibold text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900"
          >
            Convert your Next.js app to iOS & Android with Capacitor (full
            guide)
          </Link>
        </p>
      </div>
    </div>
  );
}
