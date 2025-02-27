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

  const features = [
    {
      title: "Frontier Intelligence",
      description:
        "Powered by a mix of purpose-built and frontier models, Cursor is smart and fast.",
      icon: (
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500 rounded-lg transform rotate-3" />
          <div className="absolute inset-0 bg-black rounded-lg" />
        </div>
      ),
    },
    {
      title: "Feels Familiar",
      description:
        "Import all your extensions, themes, and keybindings in one click.",
      icon: (
        <div className="relative w-16 h-16">
          <div className="grid grid-cols-2 gap-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-7 w-7 bg-gradient-to-br from-blue-500 to-purple-500 rounded"
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Privacy Options",
      description:
        "If you enable Privacy Mode, your code is never stored remotely. Cursor is SOC 2 certified.",
      icon: (
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-full" />
          <div className="absolute inset-[3px] bg-black rounded-full" />
        </div>
      ),
    },
  ];

  return (
    <div className="py-24 bg-black text-white">
      <motion.div
        className="max-w-7xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-5xl font-bold mb-4"
        >
          Build software faster
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-400 mb-16 font-mono"
        >
          Intelligent, fast, and familiar, Cursor is the best way to code with
          AI.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="p-6 rounded-2xl bg-[#111] border border-white/10 hover:border-white/20 transition-colors"
            >
              {feature.icon}
              <h3 className="text-2xl font-semibold mt-6 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export const FeatureGridDark: ShowcaseComponent = {
  id: "feature-grid-dark",
  name: "Feature Grid Dark",
  description: "A modern dark-themed feature grid with gradient accents",
  category: "features",
  component: Component,
  code: `"use client";

import { motion } from "framer-motion";

export default function FeatureGridDark() {
  return (
    <div className="py-24 bg-black text-white">
      {/* ... rest of the component code ... */}
    </div>
  );
}`,
};
