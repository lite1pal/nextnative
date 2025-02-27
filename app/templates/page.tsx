"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Template {
  name: string;
  description: string;
  components: string[];
  preview: string;
  category: string;
  color: string;
}

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
  ] as const;

  const categories = Array.from(new Set(templates.map((t) => t.category)));

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6">
            Ready-to-use Templates
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Start with a professionally designed template and customize it to
            match your brand. Each template combines our best components for
            specific use cases.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !selectedCategory
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
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
      </div>
    </div>
  );
}
