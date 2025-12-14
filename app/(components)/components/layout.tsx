import type { Metadata } from "next";
import LayoutWrapper from "./layout-wrapper";

export const metadata: Metadata = {
  title: "Mobile UI Components - NextNative",
  description:
    "Browse beautiful UI components and screens for your mobile app.",
  alternates: {
    canonical: "https://nextnative.dev/components",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
