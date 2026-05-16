import NextNativeCard from "@/app/(content)/blog/[slug]/NextNativeCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Android Keystore | Free Keytool Command Generator",
  description:
    "Generate the keytool command to create an Android keystore file for signing your APK or AAB. Step-by-step guide with Capacitor integration. Free tool for Android developers.",
  metadataBase: new URL("https://nextnative.dev"),
  alternates: {
    canonical: "/free-tools/create-android-keystore",
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
    url: "https://nextnative.dev/free-tools/create-android-keystore",
    siteName: "NextNative",
    title: "Create Android Keystore | Free Keytool Generator",
    description:
      "Generate keytool commands to create Android keystores for signing APKs and AABs. Includes Capacitor setup instructions.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@nextnative",
    creator: "@shipwithdenis",
    title: "Create Android Keystore | NextNative",
    description:
      "Free tool to generate keytool commands for creating Android keystores. Perfect for Capacitor & React Native apps.",
  },
  keywords: [
    "create android keystore",
    "android keystore generator",
    "keytool command",
    "android signing key",
    "generate keystore android",
    "how to create keystore",
    "android app signing",
    "keytool genkey",
    "capacitor android keystore",
    "react native keystore",
    "google play signing key",
    "android release keystore",
    "keytool genkeypair",
    "android jks file",
  ],
  other: {
    "theme-color": "#F5F9F5",
  },
};

export default function CreateAndroidKeystoreLayout({
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
