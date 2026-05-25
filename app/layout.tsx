import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { inter, outfit } from "../lib/fonts";
import LayoutWrapper from "./layout-wrapper";

export const metadata: Metadata = {
  title: "Launch Mobile Apps Faster With Next.js | NextNative",
  description:
    "Skip React Native. Use the web tools you already know, combined with Capacitor, to launch cross-platform apps in days.",
  metadataBase: new URL("https://nextnative.dev"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src="https://analytics.denistarasenko.com/script.js"
          data-website-id="c4fd4a3a-c1eb-40a0-ba15-750124213746"
        ></script>
      </head>
      <body
        className={`bg-background antialiased ${outfit.className} ${inter.variable}`}
      >
        <Toaster />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
