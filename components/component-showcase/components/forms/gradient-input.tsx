"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ShowcaseComponent } from "../index";

function Component() {
  const [email, setEmail] = useState("");

  return (
    <div className="p-8 rounded-2xl">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-stretch gap-2 p-1.5 bg-[#222] rounded-full"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-6 py-3 bg-transparent placeholder:text-white text-white focus:outline-none"
        />
        <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-medium rounded-full hover:opacity-90 transition-opacity">
          Join Waitlist
        </button>
      </form>
    </div>
  );
}

export const GradientInput: ShowcaseComponent = {
  id: "gradient-input",
  name: "Gradient Input",
  description: "A modern dark input with gradient button",
  category: "forms",
  component: Component,
  code: `"use client";

import { useState } from "react";

export default function GradientInput() {
  const [email, setEmail] = useState("");

  return (
    <div className="bg-black p-8 rounded-2xl">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-stretch gap-2 p-1.5 bg-[#222] rounded-full"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-6 py-3 bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
        />
        <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-medium rounded-full hover:opacity-90 transition-opacity">
          Join Waitlist
        </button>
      </form>
    </div>
  );
}`,
};
