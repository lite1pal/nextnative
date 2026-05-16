import NextNativeCard from "@/app/(content)/blog/[slug]/NextNativeCard";
import NextNativeCardSkeleton from "@/app/(content)/blog/[slug]/NextNativeCardSkeleton";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "App Privacy Policy Generator | Free Template for iOS & Android Apps",
  description:
    "Generate a privacy policy for your app instantly. Customizable for iOS, Android, and web. 100% free and App Store compliant.",
  metadataBase: new URL("https://nextnative.dev"),
  alternates: {
    canonical: "/free-tools/app-privacy-policy-generator",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://nextnative.dev/free-tools/app-privacy-policy-generator",
    siteName: "NextNative",
    title: "App Privacy Policy Generator | Free Template for Developers",
    description:
      "Instantly generate a customizable app privacy policy. Works for iOS, Android, and web apps.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free App Privacy Policy Generator | NextNative",
    description:
      "Create your app's privacy policy instantly. App Store & Google Play compliant. 100% free.",
  },
  keywords: [
    "app privacy policy generator",
    "privacy policy template",
    "ios app privacy policy",
    "android app privacy policy",
    "mobile app legal requirements",
    "app store privacy policy",
    "google play privacy policy",
    "generate privacy policy for app",
    "free app privacy policy creator",
  ],
};

export default function AppPrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="mx-auto mt-10 max-w-xl">
        <NextNativeCard post={{ slug: "free-tool" }} />
      </div>
      {children}
    </main>
  );
}
