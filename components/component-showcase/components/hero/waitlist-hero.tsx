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
    <div className="relative min-h-[600px] bg-black overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute -bottom-40 right-0 w-80 h-80 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      {/* Content */}
      <motion.div
        className="relative max-w-7xl mx-auto px-4 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div variants={itemVariants}>
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-white/10 text-white rounded-full">
              Prophecy Foretold
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8"
          >
            JOURNEY TO
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              THE DIGITAL REALM
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 mb-12"
          >
            We're forging powerful new technologies in the depths of the digital
            realm.
            <br />
            Join our fellowship of early adventurers.
          </motion.p>

          <motion.form
            variants={itemVariants}
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to join the fellowship 🌟"
              className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap">
              Join the Fellowship
            </button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}

export const WaitlistHero: ShowcaseComponent = {
  id: "waitlist-hero",
  name: "Waitlist Hero",
  description:
    "A modern hero section for waitlist signups with gradient accents and animations",
  category: "hero",
  component: Component,
  code: `"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function WaitlistHero() {
  const [email, setEmail] = useState("");

  return (
    <div className="relative min-h-[600px] bg-black overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute -bottom-40 right-0 w-80 h-80 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-white/10 text-white rounded-full">
            Prophecy Foretold
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8">
            JOURNEY TO
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              THE DIGITAL REALM
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-12">
            We're forging powerful new technologies in the depths of the digital realm.
            <br />
            Join our fellowship of early adventurers.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to join the fellowship 🌟"
              className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap">
              Join the Fellowship
            </button>
          </form>

          <div className="absolute bottom-8 right-8 text-gray-600 text-xl">
            2/4
          </div>
        </div>
      </div>
    </div>
  );
}`,
};
