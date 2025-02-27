"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ShowcaseComponent } from "../index";

function Component() {
  const [email, setEmail] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="bg-[#110829] min-h-[500px] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100%,#ffffff10,transparent)]" />

      <motion.div
        className="relative max-w-7xl mx-auto px-4 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl">
          <motion.div variants={itemVariants} className="mb-6">
            <span className="text-[#4ade80] text-2xl sm:text-3xl font-medium">
              QUANTUM LEAP
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-[500] text-white mb-6"
          >
            PORTALS TO
            <br />
            INFINITE REALMS
          </motion.h1>

          <motion.div variants={itemVariants} className="space-y-6 mb-12">
            <p className="text-xl sm:text-2xl text-gray-400">
              We're crafting
              <span className="text-white"> quantum gateways </span>
              to new dimensions.
            </p>
            <p className="text-xl sm:text-2xl text-gray-400">
              Join us as we unlock the secrets of interdimensional travel.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <div className="relative flex-1 w-full sm:max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your quantum coordinates"
                className="w-full px-4 text-lg py-3 bg-white/5 border border-white/10 rounded-lg text-white font-[500] placeholder:text-gray-500 focus:outline-none focus:border-[#4ade80] focus:ring-1 focus:ring-[#4ade80]"
              />
            </div>
            <button className="px-8 py-3 bg-[#4ade80] text-black font-medium rounded-lg hover:bg-[#4ade80]/90 transition-colors">
              Join the Waitlist
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export const DarkHero: ShowcaseComponent = {
  id: "dark-hero",
  name: "Quantum Portal Hero",
  description:
    "A dark, futuristic hero section for interdimensional travel technology",
  category: "hero",
  component: Component,
  code: `"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function DarkHero() {
  const [email, setEmail] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="bg-[#111] min-h-[500px] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100%,#ffffff10,transparent)]" />

      <motion.div
        className="relative max-w-7xl mx-auto px-4 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl">
          <motion.div variants={itemVariants} className="mb-6">
            <span className="text-[#4ade80] text-2xl sm:text-3xl font-medium">
              QUANTUM LEAP
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-[500] text-white mb-6"
          >
            PORTALS TO
            <br />
            INFINITE REALMS
          </motion.h1>

          <motion.div variants={itemVariants} className="space-y-6 mb-12">
            <p className="text-xl sm:text-2xl text-gray-400">
              We're crafting
              <span className="text-white"> quantum gateways </span>
              to new dimensions.
            </p>
            <p className="text-xl sm:text-2xl text-gray-400">
              Join us as we unlock the secrets of interdimensional travel.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <div className="relative flex-1 w-full sm:max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your quantum coordinates 🌌"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[#4ade80] focus:ring-1 focus:ring-[#4ade80]"
              />
            </div>
            <button className="px-8 py-3 bg-[#4ade80] text-black font-medium rounded-lg hover:bg-[#4ade80]/90 transition-colors">
              Begin Transmission
            </button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 right-8 text-gray-600 text-xl"
          >
            2/4
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}`,
};
