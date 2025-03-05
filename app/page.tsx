"use client";

import HeroSection from "@/components/HeroSection";
import SocialProof from "@/components/SocialProof";
import PricingSection from "@/components/PricingSection";
import WastedTime from "@/components/WastedTime";
import Spend5Minutes from "@/components/Spend5Minutes";
import CallToAction from "@/components/CallToAction";
import FAQ from "@/components/FAQ";
import DemoVideo from "@/components/DemoVideo";
import Testimonial from "@/components/Testimonial";
import SetupByDefault from "@/components/SetupByDefault";
import Image from "next/image";
import IPhoneMockup from "@/components/note-taking/iphone-mockup";
import dynamic from "next/dynamic";

const NoteList = dynamic(() => import("@/components/note-taking/note-list"), {
  ssr: false,
});

const PomodoroApp = dynamic(
  () => import("@/components/pomodoro/pomodoro-app"),
  {
    ssr: false,
  }
);

const ExpenseApp = dynamic(() => import("@/components/expenses/expense-app"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-8 sm:gap-16">
        <HeroSection />

        {/* Add the TechStackShowcase component */}
        <div className="relative max-w-xl mx-auto">
          <Image
            className="w-full h-full object-cover"
            src="/hero-section-tools.png"
            alt="Tools included in NextNative"
            priority
            width={600}
            height={600}
          />
        </div>
      </div>
      <div className="flex justify-center max-md:scale-[0.6] h-[500px] max-md:left-10 relative sm:h-full md:py-16 space-x-[-200px]">
        <div className="rotate-[-30deg]">
          <IPhoneMockup isDark={false}>
            <NoteList />
          </IPhoneMockup>
        </div>
        <div className="rotate-[0deg] z-20">
          <IPhoneMockup isDark={true}>
            <div className="dark">
              <PomodoroApp />
            </div>
          </IPhoneMockup>
        </div>
        <div className="rotate-[30deg]">
          <IPhoneMockup isDark={false}>
            <ExpenseApp />
          </IPhoneMockup>
        </div>
      </div>
      <DemoVideo />
      <SocialProof />
      <Testimonial />
      <WastedTime />
      <SetupByDefault />
      <Spend5Minutes />
      <PricingSection />
      <CallToAction
        title="Start building in minutes."
        subtitle="Save weeks of work."
        buttonText="Launch mobile apps"
      />
      <FAQ />
    </>
  );
}
