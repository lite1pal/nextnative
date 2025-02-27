"use client";

import { motion } from "framer-motion";
import type { ShowcaseComponent } from "../index";

function Component() {
  const templates = [
    {
      title: "Next.js Commerce",
      description: "An all-in-one starter kit for high-performance e-commerce.",
      category: "Ecommerce",
      color: "bg-emerald-100 text-emerald-700",
      image: "/commerce.jpg",
    },
    {
      title: "Image Gallery",
      description: "An image gallery powered by Cloudinary.",
      category: "Portfolio",
      color: "bg-purple-100 text-purple-700",
      image: "/gallery.jpg",
    },
    {
      title: "Next.js Boilerplate",
      description: "A Next.js starter from create-next-app.",
      category: "Starter",
      color: "bg-violet-100 text-violet-700",
      image: "/boilerplate.jpg",
    },
    {
      title: "AI Platform",
      description: "Build AI-powered applications with ease.",
      category: "AI",
      color: "bg-blue-100 text-blue-700",
      image: "/ai.jpg",
    },
    {
      title: "Multi-tenant App",
      description: "A SaaS starter kit with multi-tenancy support.",
      category: "SaaS",
      color: "bg-green-100 text-green-700",
      image: "/saas.jpg",
    },
    {
      title: "Blog Platform",
      description: "A modern blog platform with MDX support.",
      category: "Blog",
      color: "bg-orange-100 text-orange-700",
      image: "/blog.jpg",
    },
  ];

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
    <div className="py-20 px-4 bg-white">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Get started in seconds
            <span className="text-gray-500 ml-3 font-normal">
              Deploy Next.js to Vercel
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Vercel is a frontend cloud from the creators of Next.js, making it
            easy to get started with Next.js quickly.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(templates.map((t) => t.category))).map(
              (category) => (
                <span
                  key={category}
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    templates.find((t) => t.category === category)?.color
                  }`}
                >
                  {category}
                </span>
              )
            )}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {templates.map((template) => (
            <motion.div
              key={template.title}
              variants={itemVariants}
              className="group relative bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <span
                  className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-4 ${template.color}`}
                >
                  {template.category}
                </span>
                <h3 className="text-xl font-semibold mb-2">{template.title}</h3>
                <p className="text-gray-600">{template.description}</p>
              </div>
              <div className="absolute top-6 right-6">
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mt-12">
          <button className="px-8 py-4 bg-black text-white font-medium rounded-full hover:bg-gray-900 transition-colors inline-flex items-center gap-2">
            Deploy a Template on Vercel
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export const TemplateGrid: ShowcaseComponent = {
  id: "template-grid",
  name: "Template Grid",
  description:
    "A modern template showcase with category tags and interactive cards",
  category: "features",
  component: Component,
  code: `"use client";

import { motion } from "framer-motion";

export default function TemplateGrid() {
  const templates = [
    {
      title: "Next.js Commerce",
      description: "An all-in-one starter kit for high-performance e-commerce.",
      category: "Ecommerce",
      color: "bg-emerald-100 text-emerald-700",
    },
    // ... rest of the templates
  ];

  return (
    <div className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Get started in seconds
            <span className="text-gray-500 ml-3 font-normal">
              Deploy Next.js to Vercel
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Vercel is a frontend cloud from the creators of Next.js,
            making it easy to get started with Next.js quickly.
          </p>
        </div>

        <div className="mb-12">
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(templates.map((t) => t.category))).map(
              (category) => (
                <span
                  key={category}
                  className={\`px-3 py-1 text-sm font-medium rounded-full \${
                    templates.find((t) => t.category === category)?.color
                  }\`}
                >
                  {category}
                </span>
              )
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.title}
              className="group relative bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <span
                  className={\`inline-block px-3 py-1 text-sm font-medium rounded-full mb-4 \${template.color}\`}
                >
                  {template.category}
                </span>
                <h3 className="text-xl font-semibold mb-2">{template.title}</h3>
                <p className="text-gray-600">{template.description}</p>
              </div>
              <div className="absolute top-6 right-6">
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-black text-white font-medium rounded-full hover:bg-gray-900 transition-colors inline-flex items-center gap-2">
            Deploy a Template on Vercel
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}`,
};
