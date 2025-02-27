"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ShowcaseComponent } from "../index";

function Component() {
  const [selectedTab, setSelectedTab] = useState("JavaScript");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="bg-white min-h-[500px] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />

      <motion.div
        className="relative max-w-7xl mx-auto px-4 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-[500] text-foreground text-center mb-4"
          >
            If it's magic, show how it works
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-foreground text-center mb-8"
          >
            Reveal the ancient secrets behind your enchantments
          </motion.p>

          <motion.div variants={itemVariants} className="mt-12">
            <div className="bg-foreground rounded-xl overflow-hidden border border-white/10">
              <div className="flex items-center gap-2 p-4 border-b border-white/10">
                <button
                  onClick={() => setSelectedTab("JavaScript")}
                  className={`px-4 py-1 rounded-lg ${
                    selectedTab === "JavaScript"
                      ? "bg-primary text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Arcane Script
                </button>
                <button
                  onClick={() => setSelectedTab("Python")}
                  className={`px-4 py-1 rounded-lg ${
                    selectedTab === "Python"
                      ? "bg-primary text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Runic Python
                </button>
                <div className="ml-auto flex items-center gap-2 text-foreground">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>1,234</span>
                </div>
              </div>
              <div className="p-4">
                <pre className="text-foreground font-mono">
                  <span className="text-foreground">1</span>{" "}
                  <span className="text-purple-400">import</span>{" "}
                  <span className="text-white">{"{ initializeSpell }"}</span>{" "}
                  <span className="text-purple-400">from</span>{" "}
                  <span className="text-green-400">"arcane-codex"</span>;
                  <br />
                  <span className="text-foreground">2</span>
                  <br />
                  <span className="text-foreground">3</span>{" "}
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-blue-400">spell</span>{" "}
                  <span className="text-white">=</span>{" "}
                  <span className="text-blue-400">initializeSpell</span>
                  <span className="text-white">({"{"}</span>
                  <br />
                  <span className="text-foreground">4</span> {"  "}
                  <span className="text-white">runeKey:</span>{" "}
                  <span className="text-green-400">"rk_ancient123"</span>
                  <br />
                  <span className="text-foreground">5</span>{" "}
                  <span className="text-white">{"}"});</span>
                  <br />
                  <span className="text-foreground">6</span>
                  <br />
                  <span className="text-foreground">7</span>{" "}
                  <span className="text-blue-400">spell</span>
                  <span className="text-white">.castEnchantment();</span>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export const CodeHero: ShowcaseComponent = {
  id: "code-hero",
  name: "Arcane Codex Hero",
  description:
    "A mystical hero section for revealing the inner workings of magical systems",
  category: "hero",
  component: Component,
  code: `"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CodeHero() {
  // ... rest of the component code ...
}`,
};
