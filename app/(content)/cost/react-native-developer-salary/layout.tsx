import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "React Native Developer Salary 2025: Complete Guide by Experience & Location | NextNative",
  description:
    "React Native developer salaries range from $25K to $190K depending on experience and location. Complete breakdown of junior, mid-level, senior, and lead developer salaries worldwide.",
  keywords: [
    "react native developer salary",
    "react native salary",
    "react native developer salary 2025",
    "mobile developer salary",
    "react native salary by experience",
    "react native developer salary usa",
    "react native developer salary europe",
    "react native freelance rates",
    "junior react native developer salary",
    "senior react native developer salary",
    "react native vs native salary",
    "mobile app developer salary",
    "cross-platform developer salary",
    "react native developer hourly rate",
    "how much do react native developers make",
  ],
  openGraph: {
    title: "React Native Developer Salary 2025: $25K-$190K Guide",
    description:
      "Complete salary guide for React Native developers. Compare salaries by experience level and location. Includes freelance rates and skills that boost pay.",
    type: "article",
    url: "https://nextnative.app/cost/react-native-developer-salary",
    images: [
      {
        url: "https://nextnative.app/cost/react-native-developer-salary/opengraph-image",
        width: 1200,
        height: 630,
        alt: "React Native Developer Salary Guide 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "React Native Developer Salary 2025",
    description:
      "$25K-$190K depending on experience and location. Full breakdown + freelance rates.",
  },
  alternates: {
    canonical: "https://nextnative.app/cost/react-native-developer-salary",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
