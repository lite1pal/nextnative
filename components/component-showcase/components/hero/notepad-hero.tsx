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
    <div className="relative min-h-[600px] bg-gradient-to-b from-white to-green-50/50">
      {/* Navigation */}
      <div className="absolute top-0 left-0 right-0 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-green-800 font-semibold text-xl">
              timejump
            </span>
            <div className="h-5 w-[1px] bg-gray-300 mx-2" />
            <div className="flex items-center gap-8 text-gray-600">
              <span>Star Maps</span>
              <span>Chronicles</span>
              <span>Time Portal</span>
              <div className="px-2 py-1 bg-green-100 text-green-800 rounded">
                88 mph
              </div>
            </div>
          </div>
          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Initiate Download
          </button>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="relative max-w-7xl mx-auto px-4 pt-32 pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto">
          {/* Announcement Banner */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-12"
          >
            <span className="text-xl">⚡</span>
            <span className="font-medium">Time travel just got an upgrade</span>
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
              <span className="text-gray-400">The </span>
              <span className="text-green-800">time-traveling notepad</span>
              <br />
              <span className="text-gray-400">
                for adventurers across dimensions
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              TimeJump converts your scattered thoughts into crystal-clear
              chronicles
            </p>
            <button className="px-8 py-4 bg-green-400 text-black font-medium rounded-full hover:bg-green-500 transition-colors inline-flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              Download TimeJump for Mac
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export const NotepadHero: ShowcaseComponent = {
  id: "notepad-hero",
  name: "Notepad Hero",
  description:
    "A clean and modern hero section for a productivity app with announcement banner",
  category: "hero",
  component: Component,
  code: `"use client";

import { motion } from "framer-motion";

export default function NotepadHero() {
  return (
    <div className="relative min-h-[600px] bg-gradient-to-b from-white to-green-50/50">
      {/* ... rest of the component code ... */}
    </div>
  );
}`,
};
