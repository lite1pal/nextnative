"use client";

import { useState } from "react";
import type { ShowcaseComponent } from "../index";

function Component() {
  const [heading, setHeading] = useState("Ready to get started?");
  const [description, setDescription] = useState(
    "Join thousands of satisfied customers building better products"
  );
  const [buttonText, setButtonText] = useState("Get Started Now");

  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-[500] mb-4">{heading}</h2>
        <p className="text-gray-600 text-lg mb-8">{description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-primary text-white px-8 py-3 rounded-xl text-lg font-[500] hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-primary/25">
            {buttonText}
          </button>
          <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl text-lg font-[500] hover:bg-gray-50 transition-all duration-200">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}

export const SimpleCTA: ShowcaseComponent = {
  id: "simple-cta",
  name: "Simple CTA",
  description: "A clean call-to-action section with gradient background",
  category: "cta",
  component: Component,
  code: `"use client";

import { useState } from "react";

export default function SimpleCTA() {
  const [heading, setHeading] = useState("Ready to get started?");
  const [description, setDescription] = useState("Join thousands of satisfied customers building better products");
  const [buttonText, setButtonText] = useState("Get Started Now");

  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-[500] mb-4">{heading}</h2>
        <p className="text-gray-600 text-lg mb-8">{description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-primary text-white px-8 py-3 rounded-xl text-lg font-[500] hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-primary/25">
            {buttonText}
          </button>
          <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl text-lg font-[500] hover:bg-gray-50 transition-all duration-200">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}`,
};
