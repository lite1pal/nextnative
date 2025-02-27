"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ShowcaseComponent } from "../index";

function Component() {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [type, setType] = useState<"individual" | "company">("individual");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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

  return (
    <div className="min-h-[600px] grid">
      {/* Form Section */}
      <motion.div
        className="bg-[#6366f1] p-8 md:p-12 lg:p-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-4xl sm:text-5xl font-[500] text-white mb-12">
            Contact us
          </h2>
        </motion.div>

        <motion.form
          variants={containerVariants}
          className="space-y-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <motion.div variants={itemVariants}>
            <label className="text-white text-xl block mb-4">
              Hi 👋! My name is...
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name..."
              className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="text-white text-xl block mb-4">
              and I represent...
            </label>
            <div className="bg-white/10 inline-flex rounded-lg p-1">
              <button
                onClick={() => setType("individual")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  type === "individual"
                    ? "bg-white text-[#6366f1]"
                    : "text-white hover:bg-white/10"
                }`}
              >
                An individual
              </button>
              <button
                onClick={() => setType("company")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  type === "company"
                    ? "bg-white text-[#6366f1]"
                    : "text-white hover:bg-white/10"
                }`}
              >
                A company
              </button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="text-white text-xl block mb-4">
              I'd love to ask about...
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Whatever you want"
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 resize-none"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <button className="w-full py-4 bg-white text-[#6366f1] rounded-lg font-medium hover:bg-white/90 transition-colors">
              Submit
            </button>
          </motion.div>
        </motion.form>
      </motion.div>

      {/* Image Section */}
      {/* <div className="hidden md:block bg-[url('/workspace.jpg')] bg-cover bg-center" /> */}
    </div>
  );
}

export const ContactForm: ShowcaseComponent = {
  id: "contact-form",
  name: "Contact Form",
  description:
    "A modern contact form with segmented controls and a clean purple design",
  category: "forms",
  component: Component,
  code: `"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [type, setType] = useState<"individual" | "company">("individual");

  return (
    <div className="min-h-[600px] grid md:grid-cols-2">
      <div className="bg-[#6366f1] p-8 md:p-12 lg:p-16">
        <h2 className="text-4xl sm:text-5xl font-[500] text-white mb-12">
          Contact us
        </h2>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-white text-xl block mb-4">
              Hi 👋! My name is...
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name..."
              className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
            />
          </div>

          <div>
            <label className="text-white text-xl block mb-4">
              and I represent...
            </label>
            <div className="bg-white/10 inline-flex rounded-lg p-1">
              <button
                onClick={() => setType("individual")}
                className={\`px-6 py-2 rounded-md text-sm font-medium transition-colors \${
                  type === "individual"
                    ? "bg-white text-[#6366f1]"
                    : "text-white hover:bg-white/10"
                }\`}
              >
                An individual
              </button>
              <button
                onClick={() => setType("company")}
                className={\`px-6 py-2 rounded-md text-sm font-medium transition-colors \${
                  type === "company"
                    ? "bg-white text-[#6366f1]"
                    : "text-white hover:bg-white/10"
                }\`}
              >
                A company
              </button>
            </div>
          </div>

          <div>
            <label className="text-white text-xl block mb-4">
              I'd love to ask about...
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Whatever your heart desires :)"
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 resize-none"
            />
          </div>

          <button className="w-full py-4 bg-white text-[#6366f1] rounded-lg font-medium hover:bg-white/90 transition-colors">
            Submit
          </button>
        </form>
      </div>

      <div className="hidden md:block bg-[url('/workspace.jpg')] bg-cover bg-center" />
    </div>
  );
}`,
};
