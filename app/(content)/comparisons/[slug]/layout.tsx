import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Framework Comparisons | NextNative",
  description:
    "Compare Next.js, Capacitor, React Native, Flutter, Expo, and more. Find the best framework for your mobile app development needs.",
  alternates: {
    canonical: "https://nextnative.dev/comparisons",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ComparisonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
