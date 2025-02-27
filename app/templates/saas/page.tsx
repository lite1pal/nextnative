"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

export default function SaasLandingTemplate() {
  const { scrollYProgress } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("monthly");

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div className="min-h-screen absolute top-0 left-0 right-0 w-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Floating Navigation Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section - Updated with gradient and pattern */}
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,transparent)] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,white,transparent)]" />
        <div className="relative border-b border-gray-200 bg-white/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                SaaSify
              </div>
              <div className="hidden md:flex items-center gap-8">
                <a
                  href="#features"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Testimonials
                </a>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                  Sign Up
                </button>
              </div>
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`fixed inset-0 bg-white z-30 md:hidden ${
            isMenuOpen ? "block" : "hidden"
          }`}
          initial={{ x: "100%" }}
          animate={{ x: isMenuOpen ? 0 : "100%" }}
          transition={{ type: "spring", damping: 20 }}
        >
          <div className="p-4">
            <div className="flex justify-end">
              <button onClick={() => setIsMenuOpen(false)}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-4 mt-8">
              <a
                href="#features"
                className="text-xl text-gray-600 hover:text-gray-900 transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-xl text-gray-600 hover:text-gray-900 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-xl text-gray-600 hover:text-gray-900 transition-colors"
              >
                Testimonials
              </a>
              <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </motion.div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 py-20">
          <motion.div style={{ opacity, scale }} className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 font-medium"
            >
              Launching on Product Hunt 🚀
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 text-transparent bg-clip-text">
              Build your SaaS
              <br />
              faster than ever
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Launch your software as a service platform with our ready-to-use
              components and templates. Save weeks of development time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-colors shadow-lg shadow-blue-500/25">
                Get Started Free
              </button>
              <button className="group px-8 py-4 text-gray-900 rounded-full inline-flex items-center justify-center gap-2 hover:bg-gray-100 transition-all duration-300">
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Users", value: "10K+" },
              { label: "Downloads", value: "50K+" },
              { label: "5-Star Reviews", value: "500+" },
              { label: "Countries", value: "30+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-blue-600">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section - With hover effects and animations */}
      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Everything you need</h2>
            <p className="text-xl text-gray-600">
              All the tools and features your SaaS needs, right out of the box
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Easy Integration",
                description:
                  "Connect with your favorite tools and services seamlessly",
                icon: "🔌",
              },
              {
                title: "Powerful Analytics",
                description:
                  "Get insights into your users and business metrics",
                icon: "📊",
              },
              {
                title: "Secure by Default",
                description: "Enterprise-grade security for your peace of mind",
                icon: "🔒",
              },
              {
                title: "Smart Automation",
                description: "Automate repetitive tasks and save time",
                icon: "⚡",
              },
              {
                title: "Real-time Updates",
                description: "Stay in sync with live data and notifications",
                icon: "🔄",
              },
              {
                title: "24/7 Support",
                description:
                  "Get help whenever you need it from our expert team",
                icon: "💬",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-gradient-to-br from-white to-blue-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section - With toggle and hover effects */}
      <div
        id="pricing"
        className="py-20 bg-gradient-to-b from-blue-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              No hidden fees, no surprises
            </p>

            <div className="inline-flex items-center gap-4 bg-gray-100 p-1 rounded-full">
              <button
                className={`px-6 py-2 rounded-full transition-colors ${
                  activeTab === "monthly"
                    ? "bg-white shadow-md"
                    : "hover:bg-white/50"
                }`}
                onClick={() => setActiveTab("monthly")}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-2 rounded-full transition-colors ${
                  activeTab === "annual"
                    ? "bg-white shadow-md"
                    : "hover:bg-white/50"
                }`}
                onClick={() => setActiveTab("annual")}
              >
                Annual
                <span className="ml-2 text-sm text-green-600">Save 20%</span>
              </button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: activeTab === "monthly" ? 29 : 23,
                features: [
                  "Up to 5 team members",
                  "Basic analytics",
                  "24/7 support",
                  "1 project",
                ],
              },
              {
                name: "Pro",
                price: activeTab === "monthly" ? 79 : 63,
                features: [
                  "Up to 15 team members",
                  "Advanced analytics",
                  "Priority support",
                  "5 projects",
                  "Custom domain",
                ],
                popular: true,
              },
              {
                name: "Enterprise",
                price: activeTab === "monthly" ? 199 : 159,
                features: [
                  "Unlimited team members",
                  "Custom analytics",
                  "Dedicated support",
                  "Unlimited projects",
                  "Custom domain",
                  "SLA",
                ],
              },
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-8 rounded-2xl ${
                  plan.popular
                    ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl shadow-blue-500/25"
                    : "bg-white shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      !plan.popular && "text-gray-900"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <div
                    className={`text-4xl font-bold mb-2 ${
                      !plan.popular && "text-gray-900"
                    }`}
                  >
                    ${plan.price}
                    <span
                      className={`text-xl ${
                        plan.popular ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      /mo
                    </span>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <svg
                        className={`w-5 h-5 ${
                          plan.popular ? "text-blue-100" : "text-green-500"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span
                        className={!plan.popular ? "text-gray-600" : undefined}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  className={`w-full px-8 py-4 rounded-full transition-colors ${
                    plan.popular
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Loved by developers</h2>
            <p className="text-xl text-gray-600">
              Here's what our customers have to say
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Frontend Developer",
                company: "TechCorp",
                image: "https://i.pravatar.cc/100?img=1",
                content:
                  "The components are so well designed and the documentation is fantastic. Saved me weeks of development time!",
              },
              {
                name: "John Smith",
                role: "CTO",
                company: "StartupX",
                image: "https://i.pravatar.cc/100?img=2",
                content:
                  "We've built our entire product using these components. The quality and support are outstanding.",
              },
              {
                name: "Maria Garcia",
                role: "Product Manager",
                company: "InnovateLabs",
                image: "https://i.pravatar.cc/100?img=3",
                content:
                  "The best investment we've made for our development team. The ROI is incredible.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gray-50 hover:bg-gradient-to-br hover:from-white hover:to-blue-50 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of developers building better SaaS products
            </p>
            <button className="px-8 py-4 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
              Start Building Now
            </button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">SaaSify</div>
              <p className="text-sm">
                Building the future of SaaS development, one component at a
                time.
              </p>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Documentation", "Changelog"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Security"],
              },
            ].map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-white mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
            © 2024 SaaSify. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating Copy Button */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => {
            navigator.clipboard.writeText(
              document.querySelector("#template-code")?.textContent || ""
            );
            alert("Template code copied to clipboard!");
          }}
          className="group px-6 py-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copy Template
        </button>
      </div>

      {/* Hidden template code for copying */}
      <div id="template-code" className="hidden">
        {`"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

export default function SaasLanding() {
  // ... The entire template code ...
}`}
      </div>
    </div>
  );
}
