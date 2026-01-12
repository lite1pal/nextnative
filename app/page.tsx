import SocialProof from "@/components/SocialProof";
import PricingSection from "@/components/PricingSection";
import WastedTime from "@/components/WastedTime";
import Spend5Minutes from "@/components/Spend5Minutes";
import QuickStart from "@/components/QuickStart";
import CallToAction from "@/components/CallToAction";
import FAQ from "@/components/FAQ";
import DemoVideo from "@/components/DemoVideo";
import SetupByDefault from "@/components/SetupByDefault";
import ShowcaseSection from "@/components/ShowcaseSection";
import StoreGuides from "@/components/StoreGuides";
import TestimonialsSection from "@/components/TestimonialsSection";
import AppsBuiltWithNextNative from "@/components/AppsBuiltWithNextNative";
import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import CTAWithSocialProof from "@/components/CTAWithSocialProof";
import JsonLD from "./json-ld";
import FeaturesSection from "@/components/FeaturesSection";
import DagobertTestimonial from "@/components/DagobertTestimonial";
import LeoVideoTestimonial from "@/components/LeoVideoTestimonial";
import TerryTestimonial from "@/components/TerryTestimonial";
import HappyCustomerTestimonial from "@/components/HappyCustomerTestimonial";
import VitaliyTestimonial from "@/components/VitaliyTestimonial";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://nextnative.dev",
  },
};

export default function Home() {
  return (
    <div>
      <JsonLD />

      <HeroSection />

      <VitaliyTestimonial />

      <QuickStart />

      <ShowcaseSection />

      <CTAWithSocialProof className="max-sm:mt-16" />

      <SocialProof />

      <HappyCustomerTestimonial />

      <WastedTime />

      <SetupByDefault />

      <TerryTestimonial />

      <AppsBuiltWithNextNative />

      <CTAWithSocialProof className="mt-10" />

      {/* <DemoVideo /> */}

      <FeaturesSection />

      <DagobertTestimonial />

      <StoreGuides />

      <Spend5Minutes />

      <LeoVideoTestimonial />

      <PricingSection />

      <TestimonialsSection />

      <CTAWithSocialProof className="mb-10 sm:mt-10" />

      <FAQ />
      <CallToAction />
    </div>
  );
}
