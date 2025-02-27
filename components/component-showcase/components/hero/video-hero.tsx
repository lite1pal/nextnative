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
    <div className="relative min-h-screen bg-[#faf9f6] overflow-hidden">
      {/* Cross Pattern Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Navigation */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold">Chronica</span>
              <div className="h-6 w-[1px] bg-gray-200 mx-4" />
              <nav className="hidden md:flex items-center gap-8">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Dimensions
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Time Streams
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Artifacts
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Chronicles
                </a>
              </nav>
            </div>
            <button className="px-6 py-2 bg-sage-100 text-gray-900 rounded-full hover:bg-sage-200 transition-colors">
              Begin Journey
            </button>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative max-w-7xl mx-auto px-4 pt-20 pb-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8"
          >
            Chronicle your journey
            <br />
            <span className="inline-block bg-[#1a202c] text-white px-4 py-2 rounded-lg mt-2">
              across the multiverse
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            Capture and organize insights from every dimension. Create
            time-stamped markers to navigate through the streams of reality.
          </motion.p>

          <motion.div variants={itemVariants}>
            <button className="px-8 py-4 bg-sage-100 text-gray-900 rounded-full hover:bg-sage-200 transition-colors inline-flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              Begin Your Journey
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export const VideoHero: ShowcaseComponent = {
  id: "video-hero",
  name: "Dimensional Chronicle Hero",
  description:
    "A mystical hero section for navigating and documenting journeys across realities",
  category: "hero",
  component: Component,
  code: `"use client";

import { motion } from "framer-motion";

export default function VideoHero() {
  return (
    <div className="relative min-h-screen bg-[#faf9f6] overflow-hidden">
      {/* ... rest of the component code ... */}
    </div>
  );
}`,
};
