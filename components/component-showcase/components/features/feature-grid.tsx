"use client";

import { useState } from "react";
import type { ShowcaseComponent } from "../index";

function Component() {
  const [features] = useState([
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Built for performance and speed",
    },
    {
      icon: "🛠️",
      title: "Customizable",
      description: "Tailor to your specific needs",
    },
    {
      icon: "🔒",
      title: "Secure",
      description: "Enterprise-grade security built-in",
    },
    {
      icon: "📱",
      title: "Responsive",
      description: "Works seamlessly on all devices",
    },
    {
      icon: "🔄",
      title: "Auto Updates",
      description: "Always up to date with latest features",
    },
    {
      icon: "📊",
      title: "Analytics",
      description: "Detailed insights and reporting",
    },
  ]);

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-[500] mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-gray-600 text-lg">
            Powerful features to help you build faster and better
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl border hover:border-primary/20 hover:bg-primary/5 transition-all duration-200"
            >
              <span className="text-3xl mb-4 block">{feature.icon}</span>
              <h3 className="text-xl font-[500] mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const FeatureGrid: ShowcaseComponent = {
  id: "feature-grid",
  name: "Feature Grid",
  description: "A responsive grid layout showcasing key features with icons",
  category: "features",
  component: Component,
  code: `"use client";

import { useState } from "react";

export default function FeatureGrid() {
  const [features] = useState([
    { icon: "⚡", title: "Lightning Fast", description: "Built for performance and speed" },
    { icon: "🛠️", title: "Customizable", description: "Tailor to your specific needs" },
    { icon: "🔒", title: "Secure", description: "Enterprise-grade security built-in" },
    { icon: "📱", title: "Responsive", description: "Works seamlessly on all devices" },
    { icon: "🔄", title: "Auto Updates", description: "Always up to date with latest features" },
    { icon: "📊", title: "Analytics", description: "Detailed insights and reporting" },
  ]);

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-[500] mb-4">Everything you need to succeed</h2>
          <p className="text-gray-600 text-lg">Powerful features to help you build faster and better</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map(feature => (
            <div key={feature.title} className="p-6 rounded-2xl border hover:border-primary/20 hover:bg-primary/5 transition-all duration-200">
              <span className="text-3xl mb-4 block">{feature.icon}</span>
              <h3 className="text-xl font-[500] mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
};
