"use client";

import { motion } from "framer-motion";
import type { ShowcaseComponent } from "../index";

function Component() {
  const features = [
    {
      title: "Do a thing",
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      width: "md:col-span-1",
    },
    {
      title: "Do another thing",
      color: "bg-gradient-to-br from-amber-400 to-orange-500",
      width: "md:col-span-2",
    },
    {
      title: "And this too",
      color: "bg-gradient-to-br from-emerald-400 to-emerald-600",
      width: "md:col-span-2",
    },
    {
      title: "And finally this",
      color: "bg-gradient-to-br from-pink-400 to-rose-500",
      width: "md:col-span-1",
    },
  ];

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
    <div className="py-20 px-4 bg-gray-50">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-[500] mb-4">
            Grow faster with our
            <br />
            <span className="text-gray-400">all in one solution</span>
          </h2>
          <div className="flex justify-end">
            <button className="bg-[#111] text-white px-6 py-2.5 rounded-full hover:bg-[#222] transition-colors">
              Learn more
            </button>
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className={`${feature.width} group`}
            >
              <div className="bg-white rounded-3xl p-8 h-full shadow-sm hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-[500] mb-8">{feature.title}</h3>
                <div
                  className={`${feature.color} h-48 rounded-2xl flex items-center justify-center text-white font-medium group-hover:scale-[0.98] transition-transform duration-300`}
                >
                  FEATURE DEMO HERE
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export const FeatureCards: ShowcaseComponent = {
  id: "feature-cards",
  name: "Feature Cards",
  description:
    "A modern feature section with gradient cards and responsive grid layout",
  category: "features",
  component: Component,
  code: `"use client";

import { motion } from "framer-motion";

export default function FeatureCards() {
  const features = [
    {
      title: "Do a thing",
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      width: "md:col-span-1",
    },
    {
      title: "Do another thing",
      color: "bg-gradient-to-br from-amber-400 to-orange-500",
      width: "md:col-span-2",
    },
    {
      title: "And this too",
      color: "bg-gradient-to-br from-emerald-400 to-emerald-600",
      width: "md:col-span-2",
    },
    {
      title: "And finally this",
      color: "bg-gradient-to-br from-pink-400 to-rose-500",
      width: "md:col-span-1",
    },
  ];

  // ... rest of the component code ...
}`,
};
