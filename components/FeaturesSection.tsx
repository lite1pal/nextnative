import { ReactNode } from "react";
import LazyVideo from "./LazyVideo";
import Subheading from "./Subheading";

export default function FeaturesSection() {
  return (
    <div className="flex flex-col gap-20 py-16 sm:gap-52 sm:py-32">
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
    src: "https://cdn.nextnative.dev/splash-section.mp4",
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
    src: "https://cdn.nextnative.dev/onboarding-section.mp4",
    alt: "Onboarding process demonstration",
  },
  {
    heading1: "Secure API routes",
    heading2: "in the same codebase",
    description: (
      <>
        Add and manage secure API routes right in the same codebase! <br />
        <br /> Keep everything unified and efficient with Next.js power.
      </>
    ),
    isImageLeft: false,
    src: "https://cdn.nextnative.dev/api-section.mp4",
    alt: "API routes demonstration",
  },
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
    src: "https://cdn.nextnative.dev/signin-section-optimized.mp4",
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
    src: "https://cdn.nextnative.dev/transitions-section-optimized.mp4",
    alt: "Native-like page transitions demonstration",
  },
  {
    heading1: "In-App Purchases",
    heading2: "& Subscriptions",
    description: (
      <>
        Monetize your app effortlessly! <br />
        <br /> Set up in-app purchases and subscriptions with RevenueCat, and
        use pre-designed screens to get started quickly.
      </>
    ),
    isImageLeft: true,
    src: "https://cdn.nextnative.dev/iap-section.MP4",
    alt: "In-App Purchases demonstration",
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
    <div className="grid gap-12 xl:grid-cols-2 xl:gap-36">
      {isImageLeft ? (
        <>
          <LazyVideo src={src} alt={src} />
          <div className="order-1 flex flex-col gap-10 xl:order-2">
            <Subheading heading1={heading1} heading2={heading2} />
            <p className="max-w-xl text-base leading-relaxed sm:text-lg md:text-2xl">
              {description}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="order-1 flex flex-col gap-10 xl:order-1">
            <Subheading heading1={heading1} heading2={heading2} />
            <p className="max-w-xl text-base leading-relaxed sm:text-lg md:text-2xl">
              {description}
            </p>
          </div>
          <LazyVideo src={src} alt={src} />
        </>
      )}
    </div>
  );
};
