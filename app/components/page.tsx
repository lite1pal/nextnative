"use client";

import ComponentShowcase from "@/components/component-showcase/ComponentShowcase";

export default function ComponentsPage() {
  return (
    <div className="py-12">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col gap-6 mb-12">
          <h1 className="text-4xl font-[500]">Landing Page Components</h1>
          <p className="text-gray text-lg">
            Browse through our collection of ready-to-use components. Click on
            any component to view its code and live preview.
          </p>
        </div>
        <ComponentShowcase />
      </div>
    </div>
  );
}
