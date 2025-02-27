"use client";

import { motion } from "framer-motion";
import type { ShowcaseComponent } from "../index";

function Component() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
    <div className="relative min-h-[600px] bg-white overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#f8fafc_25%,transparent_25%,transparent_75%,#f8fafc_75%,#f8fafc),linear-gradient(45deg,#f8fafc_25%,transparent_25%,transparent_75%,#f8fafc_75%,#f8fafc)] bg-[length:60px_60px] bg-[position:0_0,30px_30px] opacity-30" />

      <motion.div
        className="relative max-w-7xl mx-auto px-4 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0f172a] mb-6"
          >
            Galactic Finance{" "}
            <span className="relative inline-block">
              <span className="text-[#3b82f6]">made simple</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8.5C47.5 3 152.5 2.5 298 9.5"
                  stroke="#93c5fd"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            for space traders
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            Most intergalactic trading systems are precise but complex. We focus
            on speed and simplicity - perfect for the bold merchant.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-4 bg-[#0f172a] text-white font-medium rounded-full hover:bg-[#1e293b] transition-colors">
              Start Your Space Journey
            </button>
            <button className="px-8 py-4 text-[#0f172a] font-medium rounded-full inline-flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
              </svg>
              View Star Charts
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export const BusinessHero: ShowcaseComponent = {
  id: "business-hero",
  name: "Galactic Commerce Hero",
  description:
    "A sleek hero section for intergalactic trading platforms with subtle space-inspired animations",
  category: "hero",
  component: Component,
  code: `"use client";

import { motion } from "framer-motion";

export default function BusinessHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
    <div className="relative min-h-[600px] bg-white overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#f8fafc_25%,transparent_25%,transparent_75%,#f8fafc_75%,#f8fafc),linear-gradient(45deg,#f8fafc_25%,transparent_25%,transparent_75%,#f8fafc_75%,#f8fafc)] bg-[length:60px_60px] bg-[position:0_0,30px_30px] opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0f172a] mb-6">
            Galactic Finance{" "}
            <span className="relative inline-block">
              <span className="text-[#3b82f6]">made simple</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8.5C47.5 3 152.5 2.5 298 9.5"
                  stroke="#93c5fd"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            for space traders
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Most intergalactic trading systems are precise but complex. We focus on speed and simplicity - perfect for the bold merchant.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-[#0f172a] text-white font-medium rounded-full hover:bg-[#1e293b] transition-colors">
              Start Your Space Journey
            </button>
            <button className="px-8 py-4 text-[#0f172a] font-medium rounded-full inline-flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
              </svg>
              View Star Charts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}`,
};
