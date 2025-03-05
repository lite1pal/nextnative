import type { Metadata } from "next";
import "./globals.css";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import { Outfit } from "next/font/google";
import Footer from "@/components/Footer";
import BackgroundSVG from "@/components/BackgroundSVG";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "NextNative",
  description: "Build iOS & Android apps with Next.js and TailwindCSS",
  metadataBase: new URL("https://nextnative.dev"),
  robots: {
    index: false,
    follow: false,
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
        <main className="flex overflow-x-hidden flex-col min-h-screen">
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
