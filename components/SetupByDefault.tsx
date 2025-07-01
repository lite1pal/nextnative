"use client";

import Image from "next/image";
import Subheading from "./Subheading";
import { motion } from "framer-motion";

interface Tool {
  src: string;
  alt: string;
  isRectangular: boolean;
  description: string;
}
const tools: Tool[] = [
  {
    src: "/tools/nextjs.png",
    alt: "Next.js Serverless API",
    isRectangular: true,
    description: "Build fullstack apps with API routes in the same codebase",
  },
  {
    src: "/tools/capacitor.png",
    alt: "Capacitor",
    isRectangular: true,
    description: "Access native features like camera, GPS, and offline storage",
  },
  {
    src: "/tools/tailwind.svg",
    alt: "TailwindCSS",
    isRectangular: false,
    description: "Craft responsive UIs fast with utility-first styling",
  },
  {
    src: "/tools/firebase.svg",
    alt: "Firebase Auth",
    isRectangular: false,
    description: "Social login and push notifications with zero setup",
  },
  {
    src: "/tools/revenuecat.svg",
    alt: "In-App Purchases",
    isRectangular: true,
    description: "Monetize with subscriptions and one-time payments",
  },
  {
    src: "/tools/supabase.svg",
    alt: "Supabase",
    isRectangular: true,
    description: "Postgres-backed storage, auth, and realtime — all in one",
  },
  {
    src: "/tools/daisyui.svg",
    alt: "Any UI Library",
    isRectangular: true,
    description: "Drop-in component library styled with Tailwind",
  },
  {
    src: "/tools/ts.svg",
    alt: "TypeScript",
    isRectangular: false,
    description: "Catch bugs early and ship with confidence",
  },
];

// Function to assign a gradient color based on index
function getGradientColor(index: number) {
  const colors = [
    "from-purple-400 to-purple-600",
    "from-amber-400 to-orange-500",
    "from-emerald-400 to-emerald-600",
    "from-slate-400 to-slate-600",
    "from-blue-400 to-blue-600",
    "from-teal-400 to-teal-600",
  ];

  return colors[index % colors.length];
}

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const gradientColor = getGradientColor(index);

  return (
    <div className="group">
      <div
        // style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
        className={`rounded-3xl p-6 h-full transition-shadow duration-300 flex flex-col`}
      >
        {/* <h3 className="text-xl font-[500] mb-4">{tool.alt}</h3> */}
        <div
          style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
          className={`rounded-2xl bg-white p-6 mb-4 flex items-center justify-center group-hover:scale-[0.98] transition-transform duration-300`}
        >
          <div className={`relative w-full h-36`}>
            <Image
              src={tool.src}
              alt={tool.alt}
              fill
              className="object-contain"
            />
          </div>
        </div>
        <p className="text-lg text-gray-500 font-[500]">{tool.description}</p>
      </div>
    </div>
  );
}

function SetupByDefault() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Subheading
            className="items-center"
            heading1="Everything you need,"
            heading2="setup by default"
          />

          <p className="mt-6 text-lg max-w-2xl mx-auto">
            Stop wasting time on configuration. Start with a fully-featured
            foundation and focus on what makes your app unique.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <ToolCard key={tool.alt} tool={tool} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SetupByDefault;
