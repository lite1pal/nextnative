"use client";

import { useState } from "react";
import ComponentPreview from "./ComponentPreview";
import { components, type ComponentCategory } from "./components";

const categories = [
  { id: "all", name: "All Components" },
  { id: "mobile-apps", name: "Mobile Apps" },
  { id: "3d", name: "3D" },
  { id: "navbar", name: "Navigation" },
  { id: "hero", name: "Hero Sections" },
  { id: "features", name: "Features" },
  { id: "pricing", name: "Pricing" },
  { id: "cta", name: "Call to Action" },
  { id: "testimonials", name: "Testimonials" },
  { id: "forms", name: "Forms" },
  { id: "footer", name: "Footer" },
] as const;

export default function ComponentShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<
    ComponentCategory | "all"
  >("mobile-apps");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredComponents = components.filter((component) => {
    const matchesCategory =
      selectedCategory === "all" || component.category === selectedCategory;
    const matchesSearch =
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="sm:sticky sm:top-0 z-10 backdrop-blur-sm py-4 sm:border-b">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-5">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 cursor-pointer rounded-lg whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-white text-foreground hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 mb-5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-16">
        {filteredComponents.map((component) => (
          <ComponentPreview
            key={component.id}
            name={component.name}
            description={component.description}
            component={<component.component />}
            code={component.code}
          />
        ))}
      </div>
    </div>
  );
}
