import HighlightedSpan from "@/components/HighlightedSpan";
import Apps from "./apps";
import UseCasesView from "../use-cases/use-cases-view";

export const metadata = {
  title: "Mobile App Showcase | Built with NextNative",
  description:
    "See real mobile apps built with the NextNative Starter Kit. Published to the App Store and Google Play — including habit trackers and productivity tools.",
  openGraph: {
    title: "NextNative Mobile Apps",
    description:
      "Explore real iOS and Android apps built using Next.js + Capacitor.",
  },
};

export default function ShowcasePage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-[1200px]">
        <div className="mt-16 mb-12 flex flex-col items-center gap-6 text-center">
          <h1 className="mb-6 text-[44px] leading-[60px] font-[600] md:text-[74px] md:leading-[91px]">
            Mobile apps built & published
            <br /> with <HighlightedSpan>NextNative</HighlightedSpan>
          </h1>
        </div>
        <div className="rounded-xl bg-white py-10">
          <Apps />
        </div>
      </div>

      <div className="py-36">
        <div className="mb-20 text-center">
          <h2 className="mb-8 text-5xl leading-tight font-[600] md:text-6xl lg:text-7xl">
            Mobile app <span className="text-primary">use cases</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 md:text-2xl lg:text-3xl">
            Explore real-world app templates and examples. See how NextNative
            can help you build any type of mobile app with Next.js and
            Capacitor.
          </p>
        </div>
        <UseCasesView />
      </div>
    </div>
  );
}
