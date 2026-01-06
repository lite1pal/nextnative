import LovedByMakers from "./LovedByMakers";
import { AvatarList } from "./AvatarList";
import RatingSvg from "./RatingSvg";
import ToolCard from "./ToolCard";
import CTA from "./CTA";
import HighlightedSpan from "./HighlightedSpan";

function HeroSection() {
  return (
    <div className="relative mx-auto flex flex-col items-center justify-center py-12 md:py-20 md:pt-16">
      <div className="hidden w-full items-center justify-between pb-10 xl:flex">
        <div className="rotate-[-7deg]">
          <ToolCard
            tool="Next.js"
            bullets={["API Routes", "A single codebase"]}
            img="/tools/nextjs-dark.webp"
          />
        </div>
        <div className="rotate-[7deg]">
          <ToolCard
            tool="Capacitor"
            bullets={["Native functionality", "Cross-platform support"]}
            img="/tools/cap-small.webp"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-14 hidden w-full items-center justify-between xl:flex">
        <div className="relative -left-16 rotate-[-15deg] pb-10">
          <ToolCard
            tool="Tailwind"
            bullets={["Utility classes", "Responsive design"]}
            img="/tools/tailwind.webp"
          />
        </div>
        <div className="relative -right-16 rotate-[15deg]">
          <ToolCard
            tool="RevenueCat"
            bullets={["One-time payments", "Subscriptions"]}
            img="/tools/revenuecat-small.webp"
          />
        </div>
      </div>

      <div className="flex w-full max-w-[946.5px] flex-col gap-8 md:gap-[45px] xl:items-center xl:text-center">
        <div className="flex flex-col gap-6 md:gap-[36px] xl:items-center xl:text-center">
          <div className="flex flex-col items-center">
            <h1 className="text-[44px] leading-[60px] font-[600] md:text-[74px] md:leading-[91px]">
              Launch mobile apps <span className="sm:hidden">10x</span> faster
              with <HighlightedSpan>Next.js</HighlightedSpan>
            </h1>
          </div>
          <p className="max-w-[654.36px] text-base leading-relaxed sm:text-lg md:text-[22px]">
            Skip React Native. Use the web tools you already know, combined with
            Capacitor, to launch cross-platform apps in days.
          </p>
        </div>

        <CTA />

        <div className="-mt-2.5 flex items-center gap-3 max-sm:-ml-2.5 sm:gap-2">
          <AvatarList priority />
          <div className="flex flex-col">
            <RatingSvg priority />
            <LovedByMakers />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
