import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
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
        {/* DataFast */}
        <Script
          data-website-id="68665e138b39cc32bf5cf8ad"
          data-domain="nextnative.dev"
          src="/js/script.js"
          strategy="afterInteractive"
        />
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
      <body
        className={`bg-background antialiased ${outfit.className} ${inter.variable}`}
      >
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
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
      <GoogleAnalytics gaId="G-QJT70XZBP7" />
    </html>
  );
}
