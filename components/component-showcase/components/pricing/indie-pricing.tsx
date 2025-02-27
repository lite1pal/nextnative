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

  const plans = [
    {
      name: "Starter",
      price: "9",
      description: "Perfect for your first indie project",
      features: [
        "1 project",
        "Basic analytics",
        "Community access",
        "Email support",
        "Basic integrations",
      ],
      popular: false,
      cta: "Start Building",
    },
    {
      name: "Maker",
      price: "29",
      description: "For serious indie hackers building multiple projects",
      features: [
        "5 projects",
        "Advanced analytics",
        "Priority support",
        "API access",
        "Custom domain",
        "Remove branding",
        "Team members (2)",
      ],
      popular: true,
      cta: "Ship Faster",
    },
    {
      name: "Founder",
      price: "79",
      description: "When your side project becomes your main business",
      features: [
        "Unlimited projects",
        "White-label solution",
        "Priority support",
        "Custom integrations",
        "Team members (5)",
        "SLA guarantee",
        "Custom contracts",
      ],
      popular: false,
      cta: "Scale Up",
    },
  ];

  return (
    <div className="py-20 px-4 bg-gray-50">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="text-primary font-medium mb-4 block">
            Simple Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-[500] mb-6">
            Start small, scale big
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Pricing that grows with your success. No hidden fees, no surprises.
            Cancel anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              className={`rounded-2xl p-8 ${
                plan.popular
                  ? "bg-white border-2 border-primary ring-4 ring-primary/10 shadow-xl"
                  : "bg-white border shadow-sm"
              }`}
            >
              {plan.popular && (
                <span className="inline-block px-3 py-1 text-sm text-primary bg-primary/10 rounded-full mb-4">
                  Most Popular
                </span>
              )}
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
                  plan.popular
                    ? "bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-primary/25"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-12 text-center text-gray-600"
        >
          <p>
            All plans include: SSL certificates, CDN, automatic backups, and
            99.9% uptime guarantee
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export const IndiePricing: ShowcaseComponent = {
  id: "indie-pricing",
  name: "Indie Pricing",
  description:
    "A straightforward pricing section for indie makers and bootstrappers",
  category: "pricing",
  component: Component,
  code: `"use client";

import { motion } from "framer-motion";

export default function IndiePricing() {
  // ... rest of the component code ...
}`,
};
