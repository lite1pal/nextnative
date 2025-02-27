"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ShowcaseComponent } from "../index";

function Component() {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: {
      y: "-50%",
      x: "60%",
      scale: 0,
      transition: {
        // type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      y: "0%",
      x: "0%",
      scale: 1,
      transition: {
        // type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const menuItemVariants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  const menuItems = [
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Services", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <div className="relative p-10 min-h-[600px] bg-background">
      <button
        className="relative z-50 flex ml-auto h-16 w-16 cursor-pointer items-center justify-center rounded-md bg-indigo-700 text-white p-2 text-muted-foreground transition-colors hover:bg-indigo-600 hover:text-accent-foreground"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle menu"
      >
        <span className="sr-only">Toggle menu</span>
        <div className="absolute flex h-5 w-5 flex-col items-center justify-center">
          <span
            className={`absolute block h-0.5 w-5 transform bg-current transition duration-500 ease-in-out ${
              isOpen ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute block h-0.5 w-5 bg-current transition-all duration-500 ease-in-out ${
              isOpen ? "opacity-0 translate-x-3" : "opacity-100"
            }`}
          />
          <span
            className={`absolute block h-0.5 w-5 transform bg-current transition duration-500 ease-in-out ${
              isOpen ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </div>
      </button>

      {/* Mobile menu with slide animation */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="absolute right-0 top-0 z-40 w-full  h-full bg-indigo-700 p-6 shadow-lg"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <nav className="mt-16 flex flex-col gap-6">
                {menuItems.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="transition-colors w-fit text-slate-300 font-[600] text-7xl hover:text-white"
                    onClick={() => setIsOpen(false)}
                    variants={menuItemVariants}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export const AnimatedHamburger: ShowcaseComponent = {
  id: "animated-hamburger",
  name: "Animated Hamburger",
  description: "A responsive navigation with smooth animations and transitions",
  category: "navbar",
  component: Component,
  code: `"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedHamburger() {
  // ... rest of the component code ...
}`,
};
