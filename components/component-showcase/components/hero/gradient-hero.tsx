"use client";

import { useState } from "react";
import type { ShowcaseComponent } from "../index";

function Component() {
  const [badge, setBadge] = useState("New Feature Released");
  const [heading, setHeading] = useState("Build your next idea even faster");
  const [subheading, setSubheading] = useState(
    "Streamline your workflow with our intuitive platform. Build, deploy, and scale your applications with ease."
  );

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/10 to-transparent py-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#80808012,transparent)]" />
      <div className="relative max-w-7xl mx-auto px-4 flex flex-col items-center text-center gap-8">
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-[500] ring-1 ring-primary/20">
          {badge}
        </span>
        <h1 className="text-4xl md:text-6xl font-[600] max-w-4xl">{heading}</h1>
        <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
          {subheading}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-primary text-white px-8 py-3 rounded-xl text-lg font-[500] hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-primary/25">
            Get Started
          </button>
          <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl text-lg font-[500] hover:bg-gray-50 transition-all duration-200">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export const GradientHero: ShowcaseComponent = {
  id: "gradient-hero",
  name: "Gradient Hero",
  description:
    "A modern hero section with gradient background and floating elements",
  category: "hero",
  component: Component,
  code: `"use client";

import { useState } from "react";

export default function GradientHero() {
  const [badge, setBadge] = useState("New Feature Released");
  const [heading, setHeading] = useState("Build your next idea even faster");
  const [subheading, setSubheading] = useState("Streamline your workflow with our intuitive platform. Build, deploy, and scale your applications with ease.");

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/10 to-transparent py-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#80808012,transparent)]" />
      <div className="relative max-w-7xl mx-auto px-4 flex flex-col items-center text-center gap-8">
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-[500] ring-1 ring-primary/20">
          {badge}
        </span>
        <h1 className="text-4xl md:text-6xl font-[600] max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-primary to-gray-900">
          {heading}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
          {subheading}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-primary text-white px-8 py-3 rounded-xl text-lg font-[500] hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-primary/25">
            Get Started
          </button>
          <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl text-lg font-[500] hover:bg-gray-50 transition-all duration-200">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}`,
};
