"use client";

import { useState } from "react";
import type { ShowcaseComponent } from "../index";

function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [links] = useState([
    { text: "Features", href: "#" },
    { text: "Pricing", href: "#" },
    { text: "About", href: "#" },
  ]);

  return (
    <nav className="w-full border-b py-4">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="text-xl font-[500]">Logo</div>

        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 md:left-auto w-full md:w-auto bg-white md:bg-transparent border-b md:border-0 p-4 md:p-0 items-start md:items-center gap-4 md:gap-8`}
        >
          {links.map((link) => (
            <a
              key={link.text}
              href={link.href}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {link.text}
            </a>
          ))}
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors w-full md:w-auto">
            Get Started
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export const SimpleNavbar: ShowcaseComponent = {
  id: "simple-navbar",
  name: "Simple Navbar",
  description: "A responsive navbar with mobile menu and navigation links",
  category: "navbar",
  component: Component,
  code: `"use client";

import { useState } from "react";

export default function SimpleNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [links] = useState([
    { text: "Features", href: "#" },
    { text: "Pricing", href: "#" },
    { text: "About", href: "#" },
  ]);

  return (
    <nav className="w-full border-b py-4">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="text-xl font-[500]">Logo</div>
        
        <div className={\`\${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 md:left-auto w-full md:w-auto bg-white md:bg-transparent border-b md:border-0 p-4 md:p-0 items-start md:items-center gap-4 md:gap-8\`}>
          {links.map(link => (
            <a key={link.text} href={link.href} className="text-gray-600 hover:text-primary transition-colors">
              {link.text}
            </a>
          ))}
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors w-full md:w-auto">
            Get Started
          </button>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}`,
};
