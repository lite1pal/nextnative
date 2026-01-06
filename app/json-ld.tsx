import Script from "next/script";

export default function JsonLD() {
  return (
    <Script id="structured-data" type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "NextNative",
        url: "https://nextnative.dev",
        description:
          "NextNative helps developers launch iOS and Android apps using the same codebase they use for web. Built on Next.js + Capacitor.",
      })}
    </Script>
  );
}
