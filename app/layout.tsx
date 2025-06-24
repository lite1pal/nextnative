import type { Metadata } from "next";
import "./globals.css";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import { Outfit } from "next/font/google";
import Footer from "@/components/Footer";
import BackgroundSVG from "@/components/BackgroundSVG";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

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
      <head>
        {/* Meta Pixel base code */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){
              if(f.fbq) return;
              n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq) f._fbq=n;
              n.push=n;
              n.loaded=!0;
              n.version='2.0';
              n.queue=[];
              t=b.createElement(e);
              t.async=!0;
              t.src=v;
              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
            }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1617501955599224');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className={`antialiased bg-background ${outfit.className}`}>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1617501955599224&ev=PageView&noscript=1"
            alt="Facebook Pixel"
          />
        </noscript>
        <Toaster />
        <main className="flex relative max-xl:overflow-hidden flex-col">
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
