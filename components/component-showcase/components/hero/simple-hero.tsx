"use client";

import { useState } from "react";
import type { ShowcaseComponent } from "../index";

function Component() {
  const [heading, setHeading] = useState(
    "Forge legendary tales with enchanted components"
  );
  const [subheading, setSubheading] = useState(
    "Save moons of crafting time with our collection of mystical components designed for modern spellcasting interfaces."
  );
  const [buttonText, setButtonText] = useState("Begin Your Quest");

  return (
    <div className="flex flex-col items-center gap-8 py-20 text-center">
      <h1 className="text-4xl sm:text-5xl font-[500] max-w-[800px] leading-[1.2] bg-clip-text text-transparent bg-gradient-to-r from-purple-900 to-purple-600">
        {heading}
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 max-w-[600px] leading-relaxed">
        {subheading}
      </p>
      <button className="bg-primary text-white px-8 py-3 rounded-xl text-lg font-[500] hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-primary/25">
        {buttonText}
      </button>
    </div>
  );
}

export const SimpleHero: ShowcaseComponent = {
  id: "simple-hero",
  name: "Simple Hero",
  description:
    "A clean and minimal hero section with a heading, subheading, and CTA button",
  category: "hero",
  component: Component,
  code: `"use client";

import { useState } from "react";

export default function SimpleHero() {
  const [heading, setHeading] = useState("Forge legendary tales with enchanted components");
  const [subheading, setSubheading] = useState("Save moons of crafting time with our collection of mystical components designed for modern spellcasting interfaces.");
  const [buttonText, setButtonText] = useState("Begin Your Quest");

  return (
    <div className="flex flex-col items-center gap-8 py-20 text-center">
      <h1 className="text-4xl sm:text-5xl font-[500] max-w-[800px] leading-[1.2] bg-clip-text text-transparent bg-gradient-to-r from-purple-900 to-purple-600">
        {heading}
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 max-w-[600px] leading-relaxed">
        {subheading}
      </p>
      <button className="bg-primary text-white px-8 py-3 rounded-xl text-lg font-[500] hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-primary/25">
        {buttonText}
      </button>
    </div>
  );
}`,
};
