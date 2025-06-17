import type { Metadata } from "next";
import "./globals.css";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import { Outfit } from "next/font/google";
import Footer from "@/components/Footer";
import BackgroundSVG from "@/components/BackgroundSVG";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "NextNative | Launch Mobile Apps Faster With Next.js",
  description:
    "Skip React Native. Use the web tools you already know, combined with Capacitor, to launch cross-platform apps in days.",
  metadataBase: new URL("https://nextnative.dev"),
  robots: {
    index: true,
    follow: true,
  },
};

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-background ${outfit.className}`}>
        <Toaster />
        <main className="flex relative overflow-x-hidden flex-col">
          <BackgroundSVG />
          <Container>
            <Navbar />
            {children}
            <Footer />
          </Container>
        </main>
        <Analytics />
      </body>
    </html>
  );
}
