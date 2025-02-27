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
    <div className="py-20 px-4 bg-[#111] text-white">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="text-primary font-medium mb-4 block">
            Pricing Plans
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Choose the plan that's right for you
            <br />
            and start building today
          </h2>
          <div className="flex items-center justify-center gap-2 text-lg">
            <svg
              className="w-5 h-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-green-400">Limited Time</span>
            <span className="text-gray-400">Save 20% with annual billing</span>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Starter Plan */}
          <motion.div
            variants={itemVariants}
            className="bg-[#1a1a1a] rounded-2xl p-8"
          >
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-gray-500 line-through">$299</span>
              <span className="text-4xl font-bold">$199</span>
              <span className="text-gray-400">USD</span>
            </div>
            <h3 className="text-xl font-semibold mb-6">Starter</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Complete component library</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div className="flex items-center gap-2">
                  <span>Regular updates</span>
                  <span className="px-2 py-0.5 text-xs bg-green-400/20 text-green-400 rounded-full">
                    Updated weekly
                  </span>
                </div>
              </li>
            </ul>
            <button className="w-full py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
              Get Started Now
            </button>
            <p className="text-gray-500 text-sm text-center mt-4">
              30-day money-back guarantee
            </p>
          </motion.div>

          {/* All-in Plan */}
          <motion.div
            variants={itemVariants}
            className="bg-[#1a1a1a] rounded-2xl p-8"
          >
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-gray-500 line-through">$349</span>
              <span className="text-4xl font-bold">$249</span>
              <span className="text-gray-400">/year</span>
            </div>
            <h3 className="text-xl font-semibold mb-6">Professional</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Everything in Starter</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Priority Support</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Advanced Features</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div className="flex items-center gap-2">
                  <span>Premium Support</span>
                  <span className="px-2 py-0.5 text-xs bg-green-400/20 text-green-400 rounded-full">
                    24/7 Available
                  </span>
                </div>
              </li>
            </ul>
            <button className="w-full py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
              Start Professional Plan
            </button>
            <p className="text-gray-500 text-sm text-center mt-4">
              Includes 30-day satisfaction guarantee
            </p>
          </motion.div>

          {/* Bundle Plan */}
          <motion.div
            variants={itemVariants}
            className="relative bg-[#1a1a1a] rounded-2xl p-8 ring-2 ring-green-400"
          >
            <div className="absolute -top-3 right-6 px-3 py-1 bg-green-400 text-black text-sm font-medium rounded-full">
              BEST VALUE
            </div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-gray-500 line-through">$599</span>
              <span className="text-4xl font-bold">$399</span>
              <span className="text-gray-400">/year</span>
            </div>
            <h3 className="text-xl font-semibold mb-1">Enterprise</h3>
            <p className="text-gray-400 mb-6">
              Everything in Professional, plus...
            </p>
            <div className="bg-black/30 rounded-xl p-4 mb-8">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">Custom Solutions</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Dedicated Account Manager</li>
                <li>• Custom Integrations</li>
                <li>• Advanced Security Features</li>
              </ul>
            </div>
            <button className="w-full py-4 bg-green-400 text-black font-medium rounded-lg hover:bg-green-500 transition-colors">
              Contact Sales
            </button>
            <p className="text-gray-500 text-sm text-center mt-4">
              Custom pricing for enterprise needs
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export const DarkPricing: ShowcaseComponent = {
  id: "dark-pricing",
  name: "Dark Pricing",
  description:
    "A modern dark pricing section with bundle offers and promotional pricing",
  category: "pricing",
  component: Component,
  code: `"use client";

import { motion } from "framer-motion";

export default function DarkPricing() {
  return (
    <div className="py-20 px-4 bg-[#111] text-white">
      {/* ... rest of the component code ... */}
    </div>
  );
}`,
};
