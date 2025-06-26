"use client";

import IPhoneMockup from "@/components/note-taking/iphone-mockup";
import { Wrench } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";

const NoteList = dynamic(() => import("@/components/note-taking/note-list"), {
  ssr: false,
});

const apps = [
  {
    logo: "/showcase/logo-lastinghabits.png", // Add to your /public folder
    name: "Lasting Habits",
    description:
      "Build habits that last. A minimal tracker with daily streaks and reminders.",
    image: "/showcase/lastinghabits.png", // Add to your /public folder
    storeLinks: {
      appStore: "https://apps.apple.com/ua/app/lasting-habits/id6736766976",
      googlePlay: "",
    },
  },
  {
    logo: "/showcase/logo-pomodoro.png",
    name: "Pomodoro Timer",
    description: "A focused pomodoro timer app with work and break sessions.",
    image: "/showcase/pomodoro.png", // Add to your /public folder
    storeLinks: {
      appStore: "",
      googlePlay: "",
    },
  },
  {
    logo: "/showcase/logo-thinknest.png",
    name: "ThinkNestAI",
    description: "A note-taking app powered by AI",
    // image: "/showcase/pomodoro.png", // Add to your /public folder
    realDemo: NoteList,
    storeLinks: {
      appStore: "",
      googlePlay: "",
    },
  },
];

function Apps() {
  return (
    <div className="grid bg-white gap-10 rounded-xl xl:grid-cols-2 py-10">
      {apps.map((app) => (
        <article key={app.name} className="flex flex-col items-center gap-4">
          {/* Heading + description */}
          <div className="text-center max-w-sm">
            <div className="flex justify-center mb-4">
              {app.logo && (
                <Image
                  src={app.logo}
                  alt={`${app.name} logo`}
                  width={50}
                  height={50}
                  className="rounded-xl"
                />
              )}
            </div>
            <h3 className="text-3xl font-semibold">{app.name}</h3>
            <p className="text-muted-foreground mt-3">{app.description}</p>
          </div>

          {/* Store buttons */}
          <div className="flex gap-3">
            {!app.storeLinks?.appStore && !app.storeLinks?.googlePlay && (
              <span className="text-primary flex items-center gap-1.5 text-lg py-2">
                In development, coming soon!
                <Wrench className="size-5" />
              </span>
            )}
            {app.storeLinks?.appStore && (
              <a
                href={app.storeLinks.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#fff"
                    d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25"
                  />
                </svg>
                App Store
              </a>
            )}
            {app.storeLinks?.googlePlay && (
              <a
                href={app.storeLinks.googlePlay}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-300 text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3.066 1.932a1.5 1.5 0 0 0-.691 1.36v17.417a1.5 1.5 0 0 0 2.342 1.232l14.235-8.708a1.5 1.5 0 0 0 0-2.56L4.717 1.965a1.5 1.5 0 0 0-1.65-.033zM6.104 4.143l10.574 6.456-2.498 2.499L6.104 4.143zm0 15.714 8.076-4.932-2.498-2.5L6.104 19.857z" />
                </svg>
                Google Play
              </a>
            )}
          </div>

          <div className="max-sm:left-12 max-sm:max-h-[770px] relative">
            <IPhoneMockup isDark={false}>
              {app.realDemo ? (
                <app.realDemo />
              ) : (
                <div>
                  <Image
                    src={app.image}
                    alt={app.name}
                    width={400}
                    height={800}
                    className="absolute inset-0 w-full h-full object-cover"
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
