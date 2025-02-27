"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ShowcaseComponent } from "../index";

function Component() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(0);

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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-[400px] bg-[#0f1117]">
      <div className="max-w-3xl mx-auto">
        {/* Terminal Window */}
        <div className="rounded-lg overflow-hidden shadow-2xl">
          {/* Title Bar */}
          <div className="bg-[#1c1f26] px-4 py-2 flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex-1 text-center text-gray-400 text-sm font-mono">
              contact@hover.dev
            </div>
          </div>

          {/* Terminal Content */}
          <motion.div
            className="bg-[#0f1117] p-6 font-mono text-gray-300"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="text-white">
                Hey there! We're excited to link{" "}
              </span>
              <span className="inline-block">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </span>
            </motion.div>

            <div className="border-t border-gray-800 my-6" />

            <motion.div variants={itemVariants} className="mb-4">
              <div className="text-gray-400 mb-2">
                To start, could you give us your{" "}
                <span className="text-[#818cf8]">email</span>?
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <span>→</span>
                <span>~</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email:"
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-600 font-mono"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export const TerminalForm: ShowcaseComponent = {
  id: "terminal-form",
  name: "Terminal Form",
  description:
    "A unique terminal-style contact form with command-line interface",
  category: "forms",
  component: Component,
  code: `"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function TerminalForm() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-[400px] bg-[#0f1117]">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-[#1c1f26] px-4 py-2 flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex-1 text-center text-gray-400 text-sm font-mono">
              contact@hover.dev
            </div>
          </div>

          <div className="bg-[#0f1117] p-6 font-mono text-gray-300">
            <div className="mb-6">
              <span className="text-white">Hey there! We're excited to link </span>
              <span className="inline-block">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </span>
            </div>

            <div className="border-t border-gray-800 my-6" />

            <div className="mb-4">
              <div className="text-gray-400 mb-2">
                To start, could you give us your{" "}
                <span className="text-[#818cf8]">email</span>?
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <span>→</span>
                <span>~</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email:"
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-600 font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`,
};
