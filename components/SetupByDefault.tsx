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
    src: "/tools/auth.png",
    alt: "Firebase Auth",
    isRectangular: false,
    description: "User authentication with social logins",
  },
  {
    src: "/tools/inapppurchases.png",
    alt: "In-App Purchases",
    isRectangular: true,
    description: "Monetize your app with subscriptions",
  },
  {
    src: "/tools/mongo.png",
    alt: "Mongo Database",
    isRectangular: false,
    description: "Flexible data storage for your app",
  },
  {
    src: "/tools/nextjs.png",
    alt: "Serverless API",
    isRectangular: true,
    description: "Backend functions without the hassle",
  },
  {
    src: "/tools/tailwind.png",
    alt: "TailwindCSS",
    isRectangular: false,
    description: "Utility-first CSS framework",
  },
  {
    src: "/tools/auth.png",
    alt: "Push Notifications",
    isRectangular: false,
    description: "Engage users with timely alerts",
  },
  {
    src: "/tools/i18n.png",
    alt: "Internationalization",
    isRectangular: true,
    description: "Reach global audiences with translations",
  },
  {
    src: "/tools/daisyui.png",
    alt: "Any UI Library",
    isRectangular: true,
    description: "Beautiful components out of the box",
  },
  {
    src: "/tools/prisma.png",
    alt: "Prisma ORM",
    isRectangular: false,
    description: "Type-safe database access",
  },
  {
    src: "/tools/cap.png",
    alt: "Capacitor",
    isRectangular: true,
    description: "Native device features for your app",
  },
  {
    src: "/tools/ts.png",
    alt: "TypeScript",
    isRectangular: false,
    description: "Type safety for your codebase",
  },
  {
    src: "/tools/ionic.png",
    alt: "Ionic",
    isRectangular: false,
    description: "Cross-platform UI components",
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
        style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
        className={`bg-white rounded-3xl p-6 h-full hover:shadow-xl transition-shadow duration-300 flex flex-col`}
      >
        <h3 className="text-xl font-[500] mb-4">{tool.alt}</h3>
        <div
          className={`bg-gradient-to-br ${gradientColor}  rounded-2xl p-6 mb-4 flex items-center justify-center group-hover:scale-[0.98] transition-transform duration-300`}
        >
          <div
            className={`relative ${
              tool.isRectangular ? "w-[120px] h-[80px]" : "w-[80px] h-[80px]"
            }`}
          >
            <Image
              src={tool.src}
              alt={tool.alt}
              fill
              className="object-contain"
            />
          </div>
        </div>
        <p className="text-gray font-[500]">{tool.description}</p>
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
