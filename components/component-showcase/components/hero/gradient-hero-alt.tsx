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
      <div className="absolute inset-0 bg-gradient-to-br from-sky-700 via-blue-700 to-purple-700">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(255,255,255,0.3),transparent)]" />
      </div>

      {/* Navigation */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold text-white">luminous.</span>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-white/90 hover:text-white">
                For Seekers
              </a>
              <a href="#" className="text-white/90 hover:text-white">
                For Guides
              </a>
              <a href="#" className="text-white/90 hover:text-white">
                Ancient Wisdom
              </a>
              <a href="#" className="text-white/90 hover:text-white">
                Scrolls
              </a>
            </nav>
            <button className="px-6 py-2 bg-yellow-200 text-gray-900 rounded-full hover:bg-yellow-100 transition-colors">
              Seek Guidance
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="relative max-w-7xl mx-auto px-4 pt-32 pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl font-serif text-white mb-8"
          >
            The <span className="italic">mystical path</span> for seekers
            <br />
            and their guides
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-white/90 mb-6"
          >
            The future of enchanted healing begins with the wisest guides.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg text-white/80 mb-12 max-w-3xl mx-auto"
          >
            Luminous supports healers with ancient wisdom and crystalline
            technology to establish sanctuaries that offer the personalized,
            ethereal care modern seekers desire.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-4 bg-white text-gray-900 rounded-xl hover:bg-white/90 transition-colors text-lg">
              Become a Luminous guide
            </button>
            <button className="px-8 py-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors text-lg">
              Begin your healing journey
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export const GradientHeroAlt: ShowcaseComponent = {
  id: "gradient-hero-alt",
  name: "Mystical Healing Hero",
  description:
    "An ethereal hero section with magical gradients and ancient wisdom aesthetics",
  category: "hero",
  component: Component,
  code: `"use client";

import { motion } from "framer-motion";

export default function GradientHeroAlt() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-400 to-blue-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(255,255,255,0.3),transparent)]" />
      </div>

      {/* Navigation */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold text-white">luminous.</span>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-white/90 hover:text-white">
                For Seekers
              </a>
              <a href="#" className="text-white/90 hover:text-white">
                For Guides
              </a>
              <a href="#" className="text-white/90 hover:text-white">
                Ancient Wisdom
              </a>
              <a href="#" className="text-white/90 hover:text-white">
                Scrolls
              </a>
            </nav>
            <button className="px-6 py-2 bg-yellow-200 text-gray-900 rounded-full hover:bg-yellow-100 transition-colors">
              Seek Guidance
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="relative max-w-7xl mx-auto px-4 pt-32 pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl font-serif text-white mb-8"
          >
            The <span className="italic">mystical path</span> for seekers
            <br />
            and their guides
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-white/90 mb-6"
          >
            The future of enchanted healing begins with the wisest guides.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg text-white/80 mb-12 max-w-3xl mx-auto"
          >
            Luminous supports healers with ancient wisdom and crystalline
            technology to establish sanctuaries that offer the personalized,
            ethereal care modern seekers desire.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-4 bg-white text-gray-900 rounded-xl hover:bg-white/90 transition-colors text-lg">
              Become a Luminous guide
            </button>
            <button className="px-8 py-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors text-lg">
              Begin your healing journey
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}`,
};
