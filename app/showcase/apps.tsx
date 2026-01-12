"use client";

import IPhoneMockup from "@/components/note-taking/iphone-mockup";
import { trackEvent } from "@/services/custom-analytics";
import Image from "next/image";

const apps = [
  {
    logo: "/showcase/bill-organizer/logo.webp",
    name: "Bill Organizer - Matcharge",
    description:
      "Track subscriptions in a calm, visual way to avoid surprise charges and understand your spending habits.",
    image: "/showcase/bill-organizer/screen-3-2.png",
    storeLinks: {
      appStore:
        "https://apps.apple.com/us/app/bill-organizer-matcharge/id6752604627",
      googlePlay: "soon",
      website: "https://matcharge.app/?via=nextnative",
    },
  },
  {
    logo: "/showcase/sproutly-logo-2.webp",
    name: "Sproutly: AI Plant Identifier",
    description:
      "An AI-powered plant identification app. Snap a photo and get instant plant care tips.",
    image: "/showcase/sproutly-premium-screen.jpg",
    storeLinks: {
      appStore:
        "https://apps.apple.com/ua/app/sproutly-ai-plant-identifier/id6748902696",
      googlePlay:
        "https://play.google.com/store/apps/details?id=com.sproutly.app",
    },
  },
  {
    logo: "/showcase/logo-lastinghabits.png",
    name: "Lasting Habits: A Habit Tracker",
    description:
      "Build habits that last. A minimal tracker with daily streaks and reminders.",
    image: "/showcase/lastinghabits.png",
    storeLinks: {
      appStore: "https://apps.apple.com/ua/app/lasting-habits/id6736766976",
      googlePlay: "soon",
      website: "https://lasting-habits.vercel.app",
    },
  },
  {
    logo: "/showcase/get-pippin/logo.webp",
    name: "Pippin - Overthinking Journal",
    description:
      "Pippin is a private space to brain dump stress, and keep a personal diary without pressure, judgment, or noise.",
    image: "/showcase/get-pippin/pippin_mockup_1-1.webp",
    storeLinks: {
      appStore:
        "https://apps.apple.com/us/app/pippin-overthinking-journal/id6755423327",
      googlePlay: "soon",
      website: "https://getpippin.app/",
    },
  },
];

function Apps({ maxApps = 10 }: { maxApps?: number }) {
  return (
    <div className="gap-10 gap-y-20 rounded-xl xl:grid xl:grid-cols-2">
      {apps.slice(0, maxApps).map((app: any, i) => (
        <article
          key={app.name}
          className="mx-auto flex flex-col items-center gap-4"
        >
          {/* Heading + description */}
          <div className="flex max-w-xs flex-col gap-3 text-center md:max-w-md">
            <div className="mb-4 flex justify-center">
              {app.logo && (
                <Image
                  src={app.logo}
                  alt={`${app.name} logo`}
                  width={80}
                  height={80}
                  className="rounded-xl"
                  priority={i < 2}
                />
              )}
            </div>
            <h3 className="text-3xl font-semibold">{app.name}</h3>
            <p className="text-gray mt-3 text-lg font-[500]">
              {app.description}
            </p>
          </div>

          {/* Store buttons */}
          <div className="flex flex-col items-center gap-3 -space-y-10 md:h-32 md:flex-row md:space-y-0">
            {app.storeLinks?.appStore && (
              <a
                href={app.storeLinks.appStore}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent(`App_store_${app.name}_clicked`);
                }}
              >
                <Image
                  src="/showcase/download-on-the-app-store.svg"
                  width={200}
                  height={200}
                  alt="Download on the App Store"
                  priority={i < 2}
                />
              </a>
            )}
            {app.storeLinks?.googlePlay &&
              app.storeLinks?.googlePlay !== "soon" && (
                <a
                  href={app.storeLinks.googlePlay}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent(`Google_Play_${app.name}_clicked`);
                  }}
                >
                  <Image
                    src="/showcase/download-on-google-play.webp"
                    width={247}
                    height={247}
                    alt="Download on Google Play"
                    priority={i < 2}
                  />
                </a>
              )}

            {app.storeLinks?.website && (
              <a
                href={app.storeLinks.website}
                target="_blank"
                rel="noopener"
                onClick={() => {
                  trackEvent(`Website_${app.name}_clicked`);
                }}
                className="hover:text-primary flex w-[200px] items-center justify-center rounded-lg border-black bg-white py-5 text-xl font-[500] max-md:mt-10"
              >
                Visit Website
              </a>
            )}

            {/* <div
              onClick={() => {
                toast.success("Coming soon to Google Play!", {
                  duration: 3000,
                  position: "top-center",
                  className: "text-xl",
                });
                trackEvent(`Google_Play_${app.name}_clicked`);
              }}
              className="cursor-pointer"
              aria-label="Download on Google Play"
            >
              <Image
                src="/showcase/download-on-google-play.webp"
                width={247}
                height={247}
                alt="Download on Google Play"
              />
            </div> */}
          </div>

          <div className="pointer-events-none relative max-sm:left-12 max-sm:max-h-[770px]">
            <IPhoneMockup isDark={false}>
              {app.realDemo ? (
                <app.realDemo />
              ) : (
                <div>
                  <Image
                    src={app.image}
                    alt={app.name}
                    width={1920}
                    height={1080}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              )}
            </IPhoneMockup>
          </div>
        </article>
      ))}
    </div>
  );
}

export default Apps;
