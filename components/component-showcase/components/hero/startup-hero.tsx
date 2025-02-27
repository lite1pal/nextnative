"use client";

import { motion } from "framer-motion";
import type { ShowcaseComponent } from "../index";

function Component() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-orange-500 to-green-500">
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <motion.div
        className="relative max-w-7xl mx-auto px-4 pt-32 pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8 tracking-tight"
          >
            The Force-Enhanced Code Editor
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-white/90 mb-12 font-mono"
          >
            Built for a more civilized age of coding,
            <br />
            Enhance your abilities with the power of the Force.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-4 bg-white text-black rounded-xl hover:bg-white/90 transition-colors inline-flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
              </svg>
              DOWNLOAD FOR MACOS
            </button>
            <button className="px-8 py-4 bg-black text-white rounded-xl hover:bg-black/80 transition-colors">
              ALL DOWNLOADS
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

export const StartupHero: ShowcaseComponent = {
  id: "startup-hero",
  name: "Startup Hero",
  description:
    "A vibrant hero section with gradient background for a modern startup",
  category: "hero",
  component: Component,
  code: `"use client";

import { motion } from "framer-motion";

export default function StartupHero() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ... rest of the component code ... */}
    </div>
  );
}`,
};
