"use client";

import { useState } from "react";
import type { ShowcaseComponent } from "../index";

function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menus = {
    products: [
      { name: "Analytics", description: "Track and analyze user behavior" },
      { name: "Engagement", description: "Drive user interaction" },
      // { name: "Security", description: "Protect your data and users" },
      // { name: "Integrations", description: "Connect with other tools" },
    ],
  };

  const toggleDropdown = (menu: string) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menu);
    }
  };

  return (
    <nav className="relative bg-[#111] text-gray-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <a href="#" className="text-white text-xl font-semibold">
              Logo
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("products")}
                  className="px-4 py-2 rounded-lg hover:bg-white/10 flex items-center gap-2"
                >
                  Products
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      activeDropdown === "products" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {activeDropdown === "products" && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-[#111] rounded-xl border border-gray-800 shadow-xl">
                    <div className="p-2">
                      {menus.products.map((item) => (
                        <a
                          key={item.name}
                          href="#"
                          className="block px-4 py-3 rounded-lg hover:bg-white/10"
                        >
                          <div className="font-medium text-white">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-400">
                            {item.description}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <a href="#" className="px-4 py-2 rounded-lg hover:bg-white/10">
                Pricing
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10"
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
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#111] border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="px-3 py-2">
              <button
                onClick={() => toggleDropdown("products")}
                className="flex items-center justify-between w-full"
              >
                <span>Products</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    activeDropdown === "products" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeDropdown === "products" && (
                <div className="mt-2 space-y-2">
                  {menus.products.map((item) => (
                    <a
                      key={item.name}
                      href="#"
                      className="block px-4 py-3 rounded-lg hover:bg-white/10"
                    >
                      <div className="font-medium text-white">{item.name}</div>
                      <div className="text-sm text-gray-400">
                        {item.description}
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#"
              className="block px-3 py-2 rounded-lg hover:bg-white/10"
            >
              Pricing
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export const DropdownNavbar: ShowcaseComponent = {
  id: "dropdown-navbar",
  name: "Dropdown Navbar",
  description:
    "A dark-themed navbar with dropdown menus and mobile responsiveness",
  category: "navbar",
  component: Component,
  code: `"use client";

import { useState } from "react";

export default function DropdownNavbar() {
  // ... rest of the component code ...
}`,
};
