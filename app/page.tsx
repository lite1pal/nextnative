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

export default function Home() {
  return (
    <>
      <HeroSection />
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
