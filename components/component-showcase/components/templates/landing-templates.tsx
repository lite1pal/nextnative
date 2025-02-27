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

  const templates = [
    {
      name: "SaaS Landing",
      description: "Modern SaaS product landing page with feature showcase",
      components: [
        "ProductHero",
        "FeatureCarousel",
        "ModernPricingAlt",
        "TwitterWall",
      ],
      preview: "/templates/saas-landing.jpg",
      category: "Landing",
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "Startup Landing",
      description: "Clean and minimal startup landing page",
      components: ["GradientHeroAlt", "FeatureGridDark", "DarkPricing"],
      preview: "/templates/startup-landing.jpg",
      category: "Landing",
      color: "bg-purple-100 text-purple-700",
    },
    {
      name: "Product Launch",
      description: "Apple-inspired product launch page",
      components: ["ProductHero", "FeatureCarousel", "TemplateGrid"],
      preview: "/templates/product-launch.jpg",
      category: "Product",
      color: "bg-gray-100 text-gray-700",
    },
    {
      name: "Agency Landing",
      description: "Professional agency landing page with dark mode sections",
      components: [
        "DarkHero",
        "FeatureGridDark",
        "SimpleTestimonial",
        "ContactForm",
      ],
      preview: "/templates/agency-landing.jpg",
      category: "Agency",
      color: "bg-emerald-100 text-emerald-700",
    },
  ];

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
            Ready-to-use templates
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start with a professionally designed template and customize it to
            match your brand. Each template combines our best components for
            specific use cases.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <motion.div
              key={template.name}
              variants={itemVariants}
              className="group relative bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-[16/9] rounded-t-2xl overflow-hidden bg-gray-100">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <span
                  className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-4 ${template.color}`}
                >
                  {template.category}
                </span>
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <div className="flex flex-wrap gap-2">
                  {template.components.map((component) => (
                    <span
                      key={component}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded"
                    >
                      {component}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-black/80 backdrop-blur text-white rounded-full hover:bg-black transition-colors">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export const LandingTemplates: ShowcaseComponent = {
  id: "landing-templates",
  name: "Landing Templates",
  description: "A collection of ready-to-use landing page templates",
  category: "hero",
  component: Component,
  code: `"use client";

import { motion } from "framer-motion";

export default function LandingTemplates() {
  return (
    <div className="py-20 px-4 bg-white">
      {/* ... rest of the component code ... */}
    </div>
  );
}`,
};
