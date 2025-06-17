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
import { ReactNode, useEffect, useState } from "react";
import {
  Smartphone,
  Lock,
  CreditCard,
  Brush,
  Database,
  Bell,
  UploadCloud,
  MoreHorizontal,
  KeyRound,
  Component,
  MessageSquareWarning,
  UserX,
  ArrowRight,
  LayoutGrid,
  Layers,
  PencilRuler,
  Repeat,
  PackageCheck,
  ShieldCheck,
  Wind,
  Palette,
  TabletSmartphone,
  Library,
  DatabaseZap,
  RadioTower,
  TerminalSquare,
  FileArchive,
  Send,
  SmartphoneNfc,
  UserCheck,
  CalendarClock,
  CloudCog,
  Apple,
  Play,
  DownloadCloud,
  Cog,
  Languages,
  Code,
  Coffee,
} from "lucide-react";
import Subheading from "@/components/Subheading";
import { trackEvent } from "@/services/custom-analytics";
import HeroSection2 from "@/components/HeroSection2";
import { useMediaQuery } from "@/hooks/use-media-query";
import StarburstSign from "@/components/StarburstSign";

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

  const { isDesktop } = useMediaQuery();

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
              href="https://x.com/lite_pal"
              className="text-blue-600"
            >
              @lite_pal
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

      {/* <div className="flex flex-col gap-28 sm:gap-52 py-16 sm:py-32">
        {features.map((feature, index) => (
          <FeatureSection
            key={index}
            heading1={feature.heading1}
            heading2={feature.heading2}
            description={feature.description}
            isImageLeft={feature.isImageLeft}
          />
        ))}
      </div> */}
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
      {/* <FeaturesSection /> */}
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
    description: `Super simple, yet powerful! <br /><br /> Swap in your logo, and you’re good to launch with a stunning first impression.`,
    isImageLeft: false,
  },
  {
    heading1: "Onboarding screen",
    heading2: "",
    description: `Hook users right away! <br /><br /> Deliver value from the start with a smooth, engaging onboarding experience.`,
    isImageLeft: true,
  },
  {
    heading1: "API routes",
    heading2: "in the same codebase",
    description: `Add and manage API routes right in the same codebase! <br /><br /> Keep everything unified and efficient with Next.js power.`,
    isImageLeft: false,
  },
  {
    heading1: "Payments",
    heading2: "",
    description: `Turn your app into a money-maker! <br /><br /> Easily set up subscriptions and in-app purchases with RevenueCat, and already designed pricing screens for you to get started with.`,
    isImageLeft: true,
  },
  {
    heading1: "Offline Storage Support",
    heading2: "",
    description: `Keep your app running anytime! <br /><br /> Move to offline database quickly at any point, ensuring users stay productive even without an internet connection.`,
    isImageLeft: false,
  },
  {
    heading1: "Authentication",
    heading2: "",
    description: (
      <div>
        Effortlessly authenticate your users. <br />
        <br /> Let users log in with their favorite social accounts using
        Firebase Auth, making onboarding a breeze.
      </div>
    ),
    isImageLeft: true,
  },
  {
    heading1: "Native-like",
    heading2: "page transitions",
    description: (
      <div>
        Deliver a polished, app-like experience! <br />
        <br /> Add fluid, native-style page transitions with included components
        that use Ionic underhood, keeping your users engaged and delighted.
      </div>
    ),
    isImageLeft: false,
  },
];

const FeatureSection = ({
  heading1,
  heading2,
  description,
  isImageLeft = false,
}: {
  heading1: string;
  heading2: string;
  description: ReactNode;
  isImageLeft: boolean;
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-12 md:gap-36">
      {isImageLeft ? (
        <>
          <div className="w-full md:w-[550px] h-[350px] bg-indigo-100 rounded-3xl order-2 md:order-1"></div>
          <div className="flex flex-col gap-10 order-1 md:order-2">
            <Subheading heading1={heading1} heading2={heading2} />
            <p className="text-base max-w-xl sm:text-lg md:text-2xl leading-relaxed">
              {description}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-10 order-1 md:order-1">
            <Subheading heading1={heading1} heading2={heading2} />
            <p className="text-base max-w-xl sm:text-lg md:text-2xl leading-relaxed">
              {description}
            </p>
          </div>
          <div className="w-full md:w-[550px] h-[350px] bg-indigo-100 rounded-3xl order-2 md:order-2"></div>
        </>
      )}
    </div>
  );
};

// Define feature data (outside the component for clarity)
const featuresData = [
  {
    id: "demo",
    title: "Demo App",
    icon: Smartphone,
    description:
      "Explore a fully functional demo app showcasing core features and UI patterns.",
    integrationText:
      "Includes example implementations like note-taking, task management, and expense tracking to kickstart your development.",
    image: "/features/demo-mockup.png", // Placeholder image path
    subFeatures: [
      {
        title: "Multiple Examples",
        description: "See notes, pomodoro timer, and expense tracker examples.",
        icon: LayoutGrid,
      },
      {
        title: "Core Patterns",
        description:
          "Learn common navigation, data handling, and state management.",
        icon: Layers,
      },
      {
        title: "Ready to Customize",
        description:
          "Use the demos as a base for your own unique app features.",
        icon: PencilRuler,
      },
    ],
  },
  {
    id: "authentication",
    title: "Authentication",
    icon: Lock,
    description:
      "Securely authenticate your users using social login or password.",
    integrationText:
      "NativeExpress integrates Supabase Auth to provide a complete authentication system out of the box. Sign up, sign in, password reset, and social authentication with Apple and Google - all preconfigured and ready for your app.",
    image: "/features/auth-mockup.png", // Placeholder image path - MAKE SURE THIS EXISTS
    subFeatures: [
      {
        title: "Email & Password",
        description: "Sign in with Email and Password.",
        icon: ArrowRight,
      },
      {
        title: "OAuth",
        description: "Sign in with Google and Apple OAuth.",
        icon: KeyRound,
      },
      {
        title: "Auth components",
        description:
          "Comes with ready to use components for signup, signin, password reset, profile.",
        icon: Component,
      },
      {
        title: "Forgot password",
        description: "Password reset using email and deeplink.",
        icon: MessageSquareWarning,
      },
      {
        title: "Account deletion",
        description:
          "Allow users to delete their account to comply with submission guidelines.",
        icon: UserX,
      },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    icon: CreditCard,
    description: "Integrate payments easily using Stripe or other providers.",
    integrationText:
      "Leverage RevenueCat and Stripe for in-app purchases and subscriptions. Simplified setup for monetizing your app across platforms.",
    image: "/features/payments-mockup.png", // Placeholder image path
    subFeatures: [
      {
        title: "In-App Subscriptions",
        description: "Manage recurring payments via Apple and Google stores.",
        icon: Repeat,
      },
      {
        title: "RevenueCat SDK",
        description: "Cross-platform purchase abstraction layer.",
        icon: PackageCheck,
      },
      {
        title: "Stripe Integration",
        description:
          "Connect with Stripe for robust payment processing (optional).",
        icon: CreditCard,
      },
      {
        title: "Entitlements",
        description: "Easily check user access levels based on purchases.",
        icon: ShieldCheck,
      },
    ],
  },
  {
    id: "style",
    title: "Style",
    icon: Brush,
    description:
      "Customize the look and feel with a utility-first CSS framework and pre-built components.",
    integrationText:
      "Built with Tailwind CSS for rapid UI development. Easily adapt themes or integrate your favorite component library like DaisyUI or Shadcn/ui.",
    image: "/features/style-mockup.png", // Placeholder image path
    subFeatures: [
      {
        title: "Tailwind CSS",
        description: "Utility-first classes for maximum flexibility.",
        icon: Wind,
      },
      {
        title: "Theming Support",
        description: "Configure colors, fonts, and spacing globally.",
        icon: Palette,
      },
      {
        title: "Responsive Design",
        description: "Components adapt beautifully to all screen sizes.",
        icon: TabletSmartphone,
      },
      {
        title: "Component Libraries",
        description: "Integrate DaisyUI, Shadcn/ui, or others easily.",
        icon: Library,
      },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Database,
    description:
      "Leverage Supabase for a powerful and scalable backend solution.",
    integrationText:
      "Includes Supabase for database, authentication, storage, and edge functions. Get a production-ready backend without managing servers.",
    image: "/features/backend-mockup.png", // Placeholder image path
    subFeatures: [
      {
        title: "Postgres Database",
        description: "Full-featured SQL database with Row Level Security.",
        icon: DatabaseZap,
      },
      {
        title: "Realtime Subscriptions",
        description: "Listen for database changes instantly.",
        icon: RadioTower,
      },
      {
        title: "Edge Functions",
        description: "Serverless functions for custom backend logic.",
        icon: TerminalSquare,
      },
      {
        title: "File Storage",
        description: "Store and serve user-generated content securely.",
        icon: FileArchive,
      },
    ],
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    description: "Engage users effectively with push notifications.",
    integrationText:
      "Setup push notifications using Expo Push Services or connect to Firebase Cloud Messaging (FCM) for targeted user engagement.",
    image: "/features/notifications-mockup.png", // Placeholder image path
    subFeatures: [
      {
        title: "Push Setup",
        description: "Integrated configuration for Expo Push Services.",
        icon: Send,
      },
      {
        title: "Cross-Platform",
        description: "Send notifications to both iOS and Android devices.",
        icon: SmartphoneNfc,
      },
      {
        title: "Targeting (via Backend)",
        description: "Send targeted notifications based on user data.",
        icon: UserCheck,
      },
      {
        title: "Scheduling",
        description: "Schedule notifications for future delivery.",
        icon: CalendarClock,
      },
    ],
  },
  {
    id: "submission",
    title: "Submission",
    icon: UploadCloud,
    description:
      "Streamlined process for building and submitting to app stores.",
    integrationText:
      "Utilize Expo Application Services (EAS) Build for creating native builds in the cloud and simplify the submission process to TestFlight, App Store, and Google Play.",
    image: "/features/submission-mockup.png", // Placeholder image path
    subFeatures: [
      {
        title: "EAS Build Integration",
        description: "Cloud builds for iOS and Android without local setup.",
        icon: CloudCog,
      },
      {
        title: "App Store Connect",
        description: "Simplified uploads and metadata management.",
        icon: Apple,
      },
      {
        title: "Google Play Console",
        description: "Manage releases and testing tracks easily.",
        icon: Play,
      },
      {
        title: "Over-the-Air Updates",
        description: "Push updates directly to users without store review.",
        icon: DownloadCloud,
      },
    ],
  },
  {
    id: "more",
    title: "More",
    icon: MoreHorizontal,
    description:
      "Access native device features, internationalization, and more.",
    integrationText:
      "Leverage Capacitor or Expo Modules for native API access. Includes setup for internationalization (i18n) and best practices for a robust application.",
    image: "/features/more-mockup.png", // Placeholder image path
    subFeatures: [
      {
        title: "Native APIs",
        description: "Access camera, GPS, filesystem via Capacitor/Expo.",
        icon: Cog,
      },
      {
        title: "Internationalization",
        description: "Structure for adding multi-language support (i18n).",
        icon: Languages,
      },
      {
        title: "TypeScript",
        description: "End-to-end type safety for fewer runtime errors.",
        icon: Code,
      },
      {
        title: "Developer Experience",
        description: "Fast Refresh, debugger support, and clear structure.",
        icon: Coffee,
      },
    ],
  },
];

function FeaturesSection() {
  const [selectedFeatureId, setSelectedFeatureId] = useState(
    featuresData[1].id
  );
  const selectedFeature = featuresData.find((f) => f.id === selectedFeatureId);

  return (
    // Redesigned Section Styling
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header remains similar */}
        <div className="text-center mb-16">
          <Subheading
            className="items-center"
            heading1="Everything you need,"
            heading2="nothing you don't"
          />
        </div>

        {/* Main Content Area: Vertical Tabs + Details */}
        <div className="flex flex-col bg-white pb-16 p-8 rounded-lg lg:flex-row gap-12 lg:gap-16">
          {/* Vertical Tabs - Left Column */}
          <div className="flex flex-row flex-wrap mx-auto w-[250px] lg:flex-col lg:space-y-2 pr-4 lg:border-r lg:border-gray-200/80">
            {featuresData.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setSelectedFeatureId(feature.id)}
                className={`flex items-center cursor-pointer w-full font-medium text-left px-4 py-3 rounded-lg transition-all duration-200 ease-in-out focus:outline-none whitespace-nowrap lg:whitespace-normal mr-2 lg:mr-0 ${
                  selectedFeatureId === feature.id
                    ? "bg-secondary/50 text-primary shadow-sm"
                    : "text-gray-600 hover:bg-secondary/50 hover:text-primary"
                }`}
              >
                <feature.icon
                  className={`w-5 h-5 mr-3 flex-shrink-0 transition-colors duration-200 ease-in-out ${
                    selectedFeatureId === feature.id
                      ? "text-primary"
                      : "text-gray-400 group-hover:text-gray-600"
                  }`}
                  strokeWidth={selectedFeatureId === feature.id ? 2.5 : 1.5}
                />
                <span>{feature.title}</span>
              </button>
            ))}
          </div>

          {/* Feature Details - Right Column */}
          <div className="flex-1">
            {selectedFeature && (
              <div className="flex flex-col xl:flex-row gap-8 items-start">
                {/* Text Content & Subfeatures */}
                <div className="w-full">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                    {selectedFeature.title}
                  </h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {selectedFeature.description}
                  </p>
                  {selectedFeature.integrationText && (
                    <p className="text-gray-600 text-base mb-6 bg-orange-50/50 border-l-4 border-orange-200 p-4 rounded-r-md">
                      {selectedFeature.integrationText}
                    </p>
                  )}
                  {/* {selectedFeature.boltIcon && (
                    <Zap className="w-6 h-6 text-green-500 mb-8" />
                  )} */}

                  {/* Redesigned Sub-features List */}
                  {selectedFeature.subFeatures &&
                    selectedFeature.subFeatures.length > 0 && (
                      <div className="space-y-5 mt-8">
                        {selectedFeature.subFeatures.map((sub) => (
                          <div key={sub.title} className="flex items-start">
                            {sub.icon && (
                              <sub.icon
                                className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0"
                                strokeWidth={2}
                              />
                            )}
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-1">
                                {sub.title}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {sub.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                </div>

                {/* Image - Right side */}
                <div className="flex justify-center mx-auto w-fit items-start relative mt-4 md:mt-0">
                  {/* Keep the same phone mockup for now, could be swapped */}
                  <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[10px] rounded-[2.5rem] h-[550px] w-[280px] shadow-xl">
                    <div className="w-[140px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                    <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[13px] top-[64px] rounded-l-lg"></div>
                    <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[13px] top-[124px] rounded-l-lg"></div>
                    <div className="h-[54px] w-[3px] bg-gray-800 absolute -right-[13px] top-[100px] rounded-r-lg"></div>
                    <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-gray-800">
                      <Image
                        src={selectedFeature.image}
                        alt={`${selectedFeature.title} feature screenshot`}
                        width={280}
                        height={550}
                        className="object-cover w-full h-full"
                        // Consider adding priority if this section is high up
                        // priority={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
