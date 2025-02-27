"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ShowcaseComponent } from "../index";

function Component() {
  const [email, setEmail] = useState("");

  return (
    <div className="relative min-h-[200px] flex items-center justify-center overflow-hidden">
      {/* Background with blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-indigo-100" />
      <div className="absolute top-10 -left-10 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-10 w-40 h-40 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-10 left-20 w-40 h-40 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000" />

      {/* Input */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative flex items-stretch bg-white/10 backdrop-blur-lg border border-white/20 rounded-full overflow-hidden shadow-lg"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-6 py-3 bg-transparent text-gray-800 placeholder:text-gray-500 focus:outline-none"
        />
        <button className="px-8 py-3 bg-black text-white font-medium hover:bg-gray-900 transition-colors">
          Join Waitlist
        </button>
      </form>
    </div>
  );
}

export const GlassInput: ShowcaseComponent = {
  id: "glass-input",
  name: "Glass Input",
  description: "A glassmorphic input with animated background",
  category: "forms",
  component: Component,
  code: `"use client";

import { useState } from "react";

export default function GlassInput() {
  const [email, setEmail] = useState("");

  return (
    <div className="relative min-h-[200px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-indigo-100" />
      <div className="absolute top-10 -left-10 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-10 w-40 h-40 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-10 left-20 w-40 h-40 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000" />

      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative flex items-stretch bg-white/10 backdrop-blur-lg border border-white/20 rounded-full overflow-hidden shadow-lg"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-6 py-3 bg-transparent text-gray-800 placeholder:text-gray-500 focus:outline-none"
        />
        <button className="px-8 py-3 bg-black text-white font-medium hover:bg-gray-900 transition-colors">
          Join Waitlist
        </button>
      </form>
    </div>
  );
}`,
};
