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
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="py-20 px-4 bg-gradient-to-br from-purple-50 to-purple-100/50">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="text-[#6366f1] font-medium mb-4 block">
            Simple Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-[500] mb-6">
            Transparent pricing for everyone
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Choose a plan that works best for your business. All plans include
            core features with flexible options to scale.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {/* Hobby Plan */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300"
          >
            <div className="mb-8">
              <h3 className="text-[#6366f1] font-medium mb-6">Hobby</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-[500]">$29</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-gray-600">
                The perfect plan if you're just getting started with our
                product.
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-gray-600">
                <svg
                  className="w-5 h-5 text-[#6366f1]"
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
                25 products
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <svg
                  className="w-5 h-5 text-[#6366f1]"
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
                Up to 10,000 subscribers
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <svg
                  className="w-5 h-5 text-[#6366f1]"
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
                Advanced analytics
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <svg
                  className="w-5 h-5 text-[#6366f1]"
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
                24-hour support response time
              </li>
            </ul>

            <button className="w-full py-3 text-[#6366f1] border-2 border-[#6366f1] rounded-lg font-medium hover:bg-[#6366f1] hover:text-white transition-colors">
              Get started today
            </button>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            variants={itemVariants}
            className="bg-[#1e1b4b] text-white rounded-3xl p-8 shadow-xl"
          >
            <div className="mb-8">
              <h3 className="text-[#818cf8] font-medium mb-6">Enterprise</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-[500]">$99</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="text-gray-300">
                Dedicated support and infrastructure for your company.
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-gray-300">
                <svg
                  className="w-5 h-5 text-[#818cf8]"
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
                Unlimited products
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <svg
                  className="w-5 h-5 text-[#818cf8]"
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
                Unlimited subscribers
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <svg
                  className="w-5 h-5 text-[#818cf8]"
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
                Advanced analytics
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <svg
                  className="w-5 h-5 text-[#818cf8]"
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
                Dedicated support representative
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <svg
                  className="w-5 h-5 text-[#818cf8]"
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
                Marketing automations
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <svg
                  className="w-5 h-5 text-[#818cf8]"
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
                Custom integrations
              </li>
            </ul>

            <button className="w-full py-3 bg-[#818cf8] text-white rounded-lg font-medium hover:bg-[#818cf8]/90 transition-colors">
              Get started today
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export const ModernPricing: ShowcaseComponent = {
  id: "modern-pricing",
  name: "Modern Pricing",
  description:
    "A clean and modern pricing section with two-tier plans and feature lists",
  category: "pricing",
  component: Component,
  code: `"use client";

import { motion } from "framer-motion";

export default function ModernPricing() {
  // ... rest of the component code ...
}`,
};
