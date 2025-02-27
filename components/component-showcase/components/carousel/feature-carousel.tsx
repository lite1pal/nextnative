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
      title: "Apple Intelligence",
      subtitle: "AI-opening possibilities.",
      description:
        "Experience the power of on-device AI with the A18 Pro chip.",
      image: "/images/ai-feature.jpg",
      tag: "Apple Intelligence",
      theme: "dark",
    },
    {
      title: "Picture your best photos and videos.",
      subtitle: "Cutting-Edge Cameras",
      description: "Capture stunning photos with our advanced camera system.",
      image: "/images/camera-feature.jpg",
      tag: "Cutting-Edge Cameras",
      theme: "blue",
    },
    {
      title: "Fast that lasts.",
      subtitle: "Chip and Battery Life",
      description:
        "All-day battery life with the most powerful chip in a smartphone.",
      image: "/images/chip-feature.jpg",
      tag: "Chip and Battery Life",
      theme: "dark",
    },
    {
      title: "Beautiful and durable, by design.",
      subtitle: "Innovation",
      description: "Crafted with precision using premium materials.",
      image: "/images/design-feature.jpg",
      tag: "Innovation",
      theme: "light",
    },
  ];

  return (
    <div className="py-20 bg-[#f5f5f7]">
      <motion.div
        className="max-w-7xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          variants={itemVariants}
          className="text-5xl sm:text-6xl font-semibold text-center mb-16"
        >
          Get to know iPhone.
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative rounded-3xl overflow-hidden aspect-[3/4] group cursor-pointer
                ${
                  feature.theme === "dark"
                    ? "bg-black text-white"
                    : feature.theme === "blue"
                    ? "bg-[#1d3c6e] text-white"
                    : "bg-white text-black"
                }`}
            >
              <div className="absolute inset-0 p-8 flex flex-col">
                <span className="text-sm opacity-80">{feature.tag}</span>
                <h3 className="text-2xl font-semibold mt-2 mb-4">
                  {feature.title}
                </h3>
                <div className="relative flex-1">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
              <div className="absolute bottom-4 right-4">
                <div className="w-8 h-8 rounded-full bg-gray-800/80 backdrop-blur flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export const FeatureCarousel: ShowcaseComponent = {
  id: "feature-carousel",
  name: "Feature Carousel",
  description:
    "A modern feature carousel inspired by Apple's product showcases",
  category: "features",
  component: Component,
  code: `"use client";

import { motion } from "framer-motion";

export default function FeatureCarousel() {
  return (
    <div className="py-20 bg-[#f5f5f7]">
      {/* ... rest of the component code ... */}
    </div>
  );
}`,
};
