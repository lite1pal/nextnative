import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free App Icon & Splash Screen Generator (iOS & Android) | NextNative",
  description:
    "Generate every required app icon and splash screen size for iOS & Android from one image. Fast, free, no signup. Includes iOS App Store 1024×1024, Android adaptive icons, and portrait/landscape splash screens.",
  metadataBase: new URL("https://nextnative.dev"),
  alternates: {
    canonical: "/free-tools/app-icon-splash-generator",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  category: "technology",
  openGraph: {
    type: "website",
    url: "https://nextnative.dev/free-tools/app-icon-splash-generator",
    siteName: "NextNative",
    title: "Free App Icon & Splash Screen Generator for iOS & Android",
    description:
      "Upload one image and instantly get all required app icon and splash sizes for iOS & Android. 100% free, no signup.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@nextnative", // set if you have one
    creator: "@shipwithdenis", // set if you like
    title: "Free App Icon & Splash Screen Generator",
    description:
      "Create iOS & Android app icons and splash screens from one image. Free, fast, no signup.",
  },
  keywords: [
    // core intents
    "app icon generator",
    "splash screen generator",
    "generate app icons",
    "app icon maker",
    "create splash screen",
    // iOS long-tail
    "iOS app icon sizes",
    "App Store icon 1024x1024",
    "Xcode asset catalog icons",
    "iOS splash screen sizes",
    // Android long-tail
    "Android adaptive icon generator",
    "launcher icon generator",
    "Play Store icon size",
    "Android splash screen sizes",
    // framework intents
    "React Native app icons",
    "Flutter app icons",
    "Capacitor icon generator",
    "Ionic app icons",
    // feature terms
    "rounded corners app icon",
    "background color splash screen",
    "portrait splash screen",
    "landscape splash screen",
  ],
  other: {
    "theme-color": "#F5F9F5",
  },
};

export default function AppIconGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "App Icon & Splash Screen Generator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: "https://nextnative.dev/free-tools/app-icon-splash-generator",
    description:
      "Generate every required app icon and splash screen size for iOS & Android from one image. Fast, free, no signup.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "NextNative",
      url: "https://nextnative.dev",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </main>
  );
}
