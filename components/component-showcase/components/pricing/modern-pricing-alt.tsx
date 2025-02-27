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
    "Access to 100+ React UI components",
    "Dark and light mode support",
    "Customizable and responsive",
    "Regular updates with new components",
    "Priority support for all your questions",
  ];

  return (
    <div className="py-24 px-4 bg-[#f8f5ff]">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="text-[#6366f1] font-medium mb-4 block">
            Unlock Your React UI
          </span>
          <h2 className="text-4xl sm:text-5xl font-[500] mb-6">
            Elevate your React projects with our UI components
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Choose a plan that best fits your React project needs. All plans
            include our core UI components with options to scale as your project
            grows.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Pre-order Beta Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl p-8 shadow-sm relative"
          >
            <div className="absolute -top-3 right-8 px-4 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
              Limited time offer
            </div>
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-6 h-6 text-orange-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.88-11.71L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z" />
              </svg>
              <h3 className="text-2xl font-medium">Pre-order Beta 🎉</h3>
            </div>
            <p className="text-gray-600 mb-8">
              Get early access to our React UI component library for a one-time
              payment of $99. Limited time offer!
            </p>
            <div className="mb-8">
              <div className="text-5xl font-bold mb-1">$99</div>
              <div className="text-gray-600">One-time payment!</div>
            </div>
            <button className="w-full py-4 px-6 bg-[#1d1d1f] text-white rounded-2xl hover:bg-black transition-colors mb-8">
              Get it now! 🚀
            </button>
            <ul className="space-y-4">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <svg
                    className="w-5 h-5 text-orange-500 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Monthly Access Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl p-8 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-6 h-6 text-blue-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.88-11.71L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z" />
              </svg>
              <h3 className="text-2xl font-medium">Monthly access 🚀</h3>
            </div>
            <p className="text-gray-600 mb-8">
              Enjoy full access to our React UI component library for just
              $49/month. Price locked until we reach 200 components!
            </p>
            <div className="mb-8">
              <h3 className="text-[#6366f1] font-medium mb-6">Basic</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-[500]">$49</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-gray-600">
                Perfect for individuals and small teams just getting started
              </p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-gray-600">
                <svg
                  className="w-5 h-5 text-blue-500 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                </svg>
                Up to 10 projects
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <svg
                  className="w-5 h-5 text-blue-500 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                </svg>
                Basic analytics
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <svg
                  className="w-5 h-5 text-blue-500 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                </svg>
                Community support
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <svg
                  className="w-5 h-5 text-blue-500 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                </svg>
                Monthly updates
              </li>
            </ul>
            <button className="w-full py-3 text-[#6366f1] border-2 border-[#6366f1] rounded-lg font-medium hover:bg-[#6366f1] hover:text-white transition-colors">
              Start Basic Plan
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export const ModernPricingAlt: ShowcaseComponent = {
  id: "modern-pricing-alt",
  name: "Modern Pricing Alt",
  description:
    "A clean and modern pricing section with lifetime and monthly options for React UI components",
  category: "pricing",
  component: Component,
  code: `"use client";

import { motion } from "framer-motion";

export default function ModernPricingAlt() {
  return (
    <div className="py-24 px-4 bg-[#f8f5ff]">
      {/* ... rest of the component code ... */}
    </div>
  );
}`,
};
