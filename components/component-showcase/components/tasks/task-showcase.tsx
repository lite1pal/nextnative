"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import type { ShowcaseComponent } from "../index";
import IPhoneMockup from "@/components/note-taking/iphone-mockup";
import dynamic from "next/dynamic";

const TaskApp = dynamic(() => import("@/components/tasks/task-app"), {
  ssr: false,
});

function Component() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="sm:p-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
            <div className="flex items-center justify-end mb-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full transition-colors ${
                  isDark
                    ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
            <IPhoneMockup isDark={isDark}>
              <TaskApp isDark={isDark} />
            </IPhoneMockup>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export const TaskShowcase: ShowcaseComponent = {
  id: "task-manager",
  name: "Task Manager",
  description:
    "A powerful task management app with drag-and-drop boards and tasks",
  category: "mobile-apps",
  component: Component,
  code: `"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// ... rest of the component code ...`,
};
