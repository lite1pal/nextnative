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
import { ReactNode, useEffect, useRef, useState } from "react";
import Subheading from "@/components/Subheading";
import { trackEvent } from "@/services/custom-analytics";
import HeroSection2 from "@/components/HeroSection2";

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
  useEffect(() => {
    trackEvent("Home_page_loaded");
  }, []);

  return (
    <>
      <HeroSection2 />
      <div className="grid xl:hidden grid-cols-1 items-center lg:grid-cols-2 gap-8 sm:gap-16">
        <HeroSection />

        <div className="max-w-xl mx-auto">
          <Image
            className="w-full h-full z-10 relative object-cover"
            src="/hero-section-tools.png"
            alt="Tools included in NextNative"
            priority
            width={600}
            height={600}
          />
        </div>
      </div>
      <Testimonial
        imgSrc={"/testimonials/vitaliy.jpeg"}
        name="Vitalii Zabrodskyi"
        description="Senior .NET Developer"
        testimonial={
          <div>
            I’m really pumped about it! The setup seems super easy, and I{" "}
            <span className="bg-primary p-1 rounded text-white font-[500]">
              can’t wait to finally build my app!
            </span>
            <br /> <br />{" "}
            <a
              target="_blank"
              href="https://x.com/nextnative"
              className="text-blue-600"
            >
              @nextnative
            </a>{" "}
            by{" "}
            <a
              target="_blank"
              href="https://x.com/shipwithdenis"
              className="text-blue-600"
            >
              @shipwithdenis
            </a>{" "}
            is such a phenomenal tool!
            <br /> <br /> Wow, just wow!
          </div>
        }
      />
      <DemoVideo />

      <div
        id="interactive-demo"
        className="flex justify-center  max-md:scale-[0.6] h-[500px] max-md:left-10 relative sm:h-full md:py-16 space-x-[-200px]"
      >
        <div className="rotate-[-30deg]">
          <IPhoneMockup isDark={false}>
            <div onClick={() => trackEvent("NoteList_clicked")}>
              <NoteList />
            </div>
          </IPhoneMockup>
        </div>
        <div className="rotate-[0deg] z-20">
          <IPhoneMockup isDark={true}>
            <div
              className="dark"
              onClick={() => trackEvent("PomodoroApp_clicked")}
            >
              <PomodoroApp />
            </div>
          </IPhoneMockup>
        </div>
        <div className="rotate-[30deg]">
          <IPhoneMockup isDark={false}>
            <div onClick={() => trackEvent("ExpenseApp_clicked")}>
              <ExpenseApp />
            </div>
          </IPhoneMockup>
        </div>
      </div>
      <SocialProof />
      <Testimonial
        imgSrc={
          "https://pbs.twimg.com/profile_images/1799370892855660544/sd7E-_7S_400x400.jpg"
        }
        name="Denis Tarasenko"
        description="Founder of Lasting Habits"
        testimonial={
          <div>
            So much value in this!{" "}
            <span className="bg-primary p-1 rounded text-white font-[500]">
              I was impressed
            </span>{" "}
            that building a mobile app is so easy! Amazing work 🙌
          </div>
        }
      />
      <WastedTime />

      <SetupByDefault />

      <div className="flex flex-col gap-28 sm:gap-52 py-16 sm:py-32">
        {features.map((feature, index) => (
          <FeatureSection
            key={index}
            heading1={feature.heading1}
            heading2={feature.heading2}
            description={feature.description}
            isImageLeft={feature.isImageLeft}
            src={feature.src}
            alt={feature.alt}
          />
        ))}
      </div>
      <Testimonial
        name="Matthias Schaefer"
        description="Developer"
        testimonial={
          <div>
            Hi Denis,
            <br />
            <br />
            Cool stuff! I saw{" "}
            <a
              target="_blank"
              className="text-blue-600"
              href="https://www.reddit.com/r/capacitor/comments/1lbhqv0/just_shipped_nextnative_which_lets_you_build/"
            >
              your post
            </a>{" "}
            on Reddit and grabbed a copy of your work!
            <br />
            <br />
            I'll have a look at it a bit later -{" "}
            <span className="bg-primary p-1 rounded text-white font-[500]">
              it's what I'm looking for!
            </span>
          </div>
        }
      />
      <Spend5Minutes />
      <PricingSection />

      <div className=""></div>
      <CallToAction
        title="Start building in minutes."
        subtitle="Save weeks of work."
        buttonText="Launch mobile apps"
      />
      <FAQ />
    </>
  );
}

const features = [
  {
    heading1: "Splash screen",
    heading2: "",
    description: (
      <>
        Super simple, yet powerful! <br />
        <br /> Swap in your logo, and you’re good to launch with a stunning
        first impression.
      </>
    ),
    isImageLeft: false,
    src: "/section-videos/splash-section.mp4",
    alt: "Splash screen demonstration",
  },
  {
    heading1: "Onboarding screen",
    heading2: "",
    description: (
      <>
        Hook users right away! <br />
        <br /> Deliver value from the start with a smooth, engaging onboarding
        experience.
      </>
    ),
    isImageLeft: true,
    src: "/section-videos/onboarding-section.mp4",
    alt: "Onboarding process demonstration",
  },
  {
    heading1: "API routes",
    heading2: "in the same codebase",
    description: (
      <>
        Add and manage API routes right in the same codebase! <br />
        <br /> Keep everything unified and efficient with Next.js power.
      </>
    ),
    isImageLeft: false,
    src: "/section-videos/api-section.mp4",
    alt: "API routes demonstration",
  },
  // {
  //   heading1: "Payments",
  //   heading2: "",
  //   description: (
  //     <>
  //       Turn your app into a money-maker! <br />
  //       <br /> Easily set up subscriptions and in-app purchases with RevenueCat,
  //       and use already designed pricing screens for you to get started with.
  //     </>
  //   ),
  //   isImageLeft: true,
  //   src: "/section-videos/payments-section.mp4",
  //   alt: "Payments setup demonstration",
  // },
  // {
  //   heading1: "Offline Storage Support",
  //   heading2: "",
  //   description: (
  //     <>
  //       Keep your app running anytime! <br />
  //       <br /> Move to offline database quickly at any point, ensuring users
  //       stay productive even without an internet connection.
  //     </>
  //   ),
  //   isImageLeft: false,
  //   src: "/section-videos/offline-storage-section.mp4",
  //   alt: "Offline storage support demonstration",
  // },
  {
    heading1: "Authentication",
    heading2: "",
    description: (
      <>
        Effortlessly authenticate your users. <br />
        <br /> Let users log in with their favorite social accounts using
        Firebase Auth, making onboarding a breeze.
      </>
    ),
    isImageLeft: true,
    src: "/section-videos/signin-section-optimized.mp4",
    alt: "Authentication demonstration",
  },
  {
    heading1: "Native-like",
    heading2: "page transitions",
    description: (
      <>
        Deliver a polished, app-like experience! <br />
        <br /> Add fluid, native-style page transitions with included components
        that use Ionic underhood, keeping your users engaged and delighted.
      </>
    ),
    isImageLeft: false,
    src: "/section-videos/transitions-section-optimized.mp4",
    alt: "Native-like page transitions demonstration",
  },
];

const FeatureSection = ({
  heading1,
  heading2,
  description,
  isImageLeft = false,
  src = "/section-videos/onboarding-section.mp4",
  alt = "Onboarding process demonstration",
}: {
  heading1: string;
  heading2: string;
  description: ReactNode;
  isImageLeft: boolean;
  src: string;
  alt?: string;
}) => {
  return (
    <div className="grid xl:grid-cols-2 gap-12 xl:gap-36">
      {isImageLeft ? (
        <>
          <LazyVideo src={src} alt={src} />
          <div className="flex flex-col gap-10 order-1 xl:order-2">
            <Subheading heading1={heading1} heading2={heading2} />
            <p className="text-base max-w-xl sm:text-lg md:text-2xl leading-relaxed">
              {description}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-10 order-1 xl:order-1">
            <Subheading heading1={heading1} heading2={heading2} />
            <p className="text-base max-w-xl sm:text-lg md:text-2xl leading-relaxed">
              {description}
            </p>
          </div>
          <LazyVideo src={src} alt={src} />
        </>
      )}
    </div>
  );
};

interface LazyVideoProps {
  src: string;
  alt: string;
}

function LazyVideo({ src, alt }: LazyVideoProps) {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.05,
        rootMargin: "50px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full relative md:w-[550px] overflow-hidden h-[350px] bg-[#4c1190] rounded-3xl order-2 md:order-2"
      role="region"
      aria-label={alt}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {isInView && (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full" />
            </div>
          )}
          <video
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            controls={showControls}
            preload="metadata"
            aria-label={alt}
            onCanPlay={() => setIsLoaded(true)}
            onError={() => console.error("Video failed to load")}
          />
        </>
      )}
    </div>
  );
}
