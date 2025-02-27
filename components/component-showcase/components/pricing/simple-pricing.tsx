"use client";

import { useState } from "react";
import type { ShowcaseComponent } from "../index";

function Component() {
  const [plans] = useState([
    {
      name: "Starter",
      price: "29",
      description: "Perfect for small projects and individual developers",
      features: [
        "Up to 5 projects",
        "Basic components",
        "Community support",
        "Monthly updates",
        "Basic analytics",
      ],
    },
    {
      name: "Professional",
      price: "79",
      description: "Ideal for growing teams and businesses",
      features: [
        "Unlimited projects",
        "Premium components",
        "Priority support",
        "Weekly updates",
        "Advanced analytics",
        "Custom branding",
        "Team collaboration",
      ],
    },
    {
      name: "Enterprise",
      price: "199",
      description: "For large organizations with custom needs",
      features: [
        "Everything in Pro",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantee",
        "Advanced security",
        "Custom training",
        "API access",
      ],
    },
  ]);

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div
            key={plan.name}
            className={`rounded-2xl p-8 ${
              i === 1
                ? "border-2 border-primary ring-4 ring-primary/10"
                : "border"
            }`}
          >
            <h3 className="text-2xl font-[500] mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-[600]">${plan.price}</span>
              <span className="text-gray-600">/month</span>
            </div>
            <p className="text-gray-600 mb-8">{plan.description}</p>
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-3 rounded-lg font-[500] transition-all duration-200 ${
                i === 1
                  ? "bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-primary/25"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export const SimplePricing: ShowcaseComponent = {
  id: "simple-pricing",
  name: "Simple Pricing",
  description: "A clean pricing section with three tiers and feature lists",
  category: "pricing",
  component: Component,
  code: `"use client";

import { useState } from "react";

export default function SimplePricing() {
  const [plans] = useState([
    {
      name: "Starter",
      price: "29",
      description: "Perfect for small projects and individual developers",
      features: [
        "Up to 5 projects",
        "Basic components",
        "Community support",
        "Monthly updates",
        "Basic analytics"
      ]
    },
    {
      name: "Professional",
      price: "79",
      description: "Ideal for growing teams and businesses",
      features: [
        "Unlimited projects",
        "Premium components",
        "Priority support",
        "Weekly updates",
        "Advanced analytics",
        "Custom branding",
        "Team collaboration"
      ]
    },
    {
      name: "Enterprise",
      price: "199",
      description: "For large organizations with custom needs",
      features: [
        "Everything in Pro",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantee",
        "Advanced security",
        "Custom training",
        "API access"
      ]
    }
  ]);

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div key={plan.name} className={\`rounded-2xl p-8 \${
            i === 1 ? 'border-2 border-primary ring-4 ring-primary/10' : 'border'
          }\`}>
            <h3 className="text-2xl font-[500] mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-[600]">{plan.price}</span>
              <span className="text-gray-600">/month</span>
            </div>
            <p className="text-gray-600 mb-8">{plan.description}</p>
            <ul className="space-y-4 mb-8">
              {plan.features.map(feature => (
                <li key={feature} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button className={\`w-full py-3 rounded-lg font-[500] transition-all duration-200 \${
              i === 1 
                ? 'bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-primary/25' 
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }\`}>
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}`,
};
