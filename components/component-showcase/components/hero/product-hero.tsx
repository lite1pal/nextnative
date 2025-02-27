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
    <div className="relative min-h-screen overflow-hidden bg-[#f5f5f7]">
      {/* Navigation */}
      <div className="relative border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="max-w-[980px] mx-auto px-4 py-3">
          <nav className="flex items-center justify-between text-sm">
            <svg className="w-5 h-5" viewBox="0 0 17 24" fill="currentColor">
              <path d="M14.5,24h-12C1.119,24,0,22.881,0,21.5v-19C0,1.119,1.119,0,2.5,0h12c1.381,0,2.5,1.119,2.5,2.5v19 C17,22.881,15.881,24,14.5,24z M2.5,1C1.671,1,1,1.671,1,2.5v19C1,22.329,1.671,23,2.5,23h12c0.829,0,1.5-0.671,1.5-1.5v-19 C16,1.671,15.329,1,14.5,1H2.5z" />
            </svg>
            <div className="flex items-center gap-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Store
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Mac
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                iPad
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                iPhone
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Watch
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Vision
              </a>
            </div>
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </nav>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="relative max-w-[980px] mx-auto px-4 pt-24 pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center">
          <motion.div variants={itemVariants}>
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-semibold text-gray-900 tracking-tight mb-4">
              iPhone 16
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                e
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl text-gray-600 mb-8">
              Latest iPhone. Greatest price.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#"
              className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-lg"
            >
              Learn more
            </a>
            <a
              href="#"
              className="px-8 py-3 bg-gray-100 text-gray-900 rounded-full hover:bg-gray-200 transition-colors text-lg"
            >
              Pre-order
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12">
            <div className="relative w-full max-w-2xl mx-auto aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200" />
              <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Watch the film
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export const ProductHero: ShowcaseComponent = {
  id: "product-hero",
  name: "Product Hero",
  description:
    "A minimal and clean hero section inspired by Apple's product pages",
  category: "hero",
  component: Component,
  code: `"use client";

import { motion } from "framer-motion";

export default function ProductHero() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ... rest of the component code ... */}
    </div>
  );
}`,
};
