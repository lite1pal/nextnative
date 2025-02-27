"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ShowcaseComponent } from "../index";

function Component() {
  const features = [
    {
      title: "Mobile friendly",
      description:
        "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
      content: (
        <div className="bg-[#111] rounded-2xl p-4 shadow-xl">
          <div className="max-w-[280px] mx-auto">
            <div className="bg-[#1a1a1a] rounded-xl p-3">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-[#818cf8]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  </svg>
                  <span className="text-white">Deployments</span>
                </div>
                <button className="text-gray-400 hover:text-white">
                  <span className="sr-only">Sort</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth={2}
                      d="M7 10l5 5 5-5"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-3">
                {[
                  {
                    name: "ios-app",
                    status: "pending",
                    time: "1m 32s ago",
                  },
                  {
                    name: "mobile-api",
                    status: "success",
                    time: "3m ago",
                  },
                  {
                    name: "tailwindcss.com",
                    status: "pending",
                    time: "5m 45s ago",
                  },
                  {
                    name: "tailwindui.com",
                    status: "success",
                    time: "8m ago",
                  },
                ].map((deploy) => (
                  <div
                    key={deploy.name}
                    className="flex items-center justify-between p-3 bg-[#222] rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          deploy.status === "success"
                            ? "bg-green-500"
                            : "bg-gray-500"
                        }`}
                      />
                      <span className="text-gray-300 text-sm">
                        {deploy.name}
                      </span>
                    </div>
                    <span className="text-gray-500 text-sm">{deploy.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Performance",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit maiores impedit.",
      content: (
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-[#818cf8]">1.04</span>
            <span className="text-gray-600">s</span>
            <span className="ml-auto px-2 py-1 text-sm bg-green-100 text-green-700 rounded-full">
              -22%
            </span>
          </div>
          <div className="grid grid-cols-24 gap-1">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className={`h-16 rounded ${
                  i > 20 ? "bg-[#818cf8]/30" : "bg-[#818cf8]"
                }`}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Security",
      description:
        "Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi.",
      content: (
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="flex justify-around">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#818cf8]/10 rounded-full flex items-center justify-center mb-2">
                <svg
                  className="w-8 h-8 text-[#818cf8]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <span className="text-sm text-gray-600">Cloud Storage</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#818cf8]/10 rounded-full flex items-center justify-center mb-2">
                <svg
                  className="w-8 h-8 text-[#818cf8]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <span className="text-sm text-gray-600">SSL Security</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#818cf8]/10 rounded-full flex items-center justify-center mb-2">
                <svg
                  className="w-8 h-8 text-[#818cf8]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <span className="text-sm text-gray-600">Database</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Powerful APIs",
      description:
        "Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget sem sodales gravida.",
      content: (
        <div className="bg-[#111] rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-4 text-sm text-gray-400">
            <button className="bg-[#222] px-4 py-1 rounded-lg">
              NotificationSetting.jsx
            </button>
            <button className="hover:text-white">App.jsx</button>
          </div>
          <pre className="font-mono text-sm">
            <code>
              <span className="text-purple-400">import</span>{" "}
              <span className="text-white">{"{ useState }"}</span>{" "}
              <span className="text-purple-400">from</span>{" "}
              <span className="text-green-400">'react'</span>
              <br />
              <span className="text-purple-400">import</span>{" "}
              <span className="text-white">{"{ Switch }"}</span>{" "}
              <span className="text-purple-400">from</span>{" "}
              <span className="text-green-400">'@headlessui/react'</span>
              <br />
              <br />
              <span className="text-purple-400">function</span>{" "}
              <span className="text-blue-400">Example</span>
              <span className="text-white">()</span>{" "}
              <span className="text-white">{"{"}</span>
              <br />
              {"  "}
              <span className="text-purple-400">const</span>{" "}
              <span className="text-white">[enabled, setEnabled]</span>{" "}
              <span className="text-white">=</span>{" "}
              <span className="text-blue-400">useState</span>
              <span className="text-white">(true)</span>
              <br />
              <br />
              {"  "}
              <span className="text-purple-400">return</span>{" "}
              <span className="text-white">(</span>
              <br />
              {"    "}
              <span className="text-blue-400">{"<form"}</span>{" "}
              <span className="text-gray-400">
                action=
                <span className="text-green-400">"/notification-settings"</span>
              </span>
              <span className="text-blue-400">{">"}</span>
              <br />
              {"      "}
              <span className="text-blue-400">{"<Switch"}</span>{" "}
              <span className="text-gray-400">
                checked={"{"}
                <span className="text-white">enabled</span>
                {"}"} onChange={"{"}
                <span className="text-white">setEnabled</span>
                {"}"}
              </span>
              <span className="text-blue-400">{">"}</span>
              <br />
              {"        "}
              <span className="text-gray-400">{"/* ... */"}</span>
              <br />
              {"      "}
              <span className="text-blue-400">{"</Switch>"}</span>
              <br />
              {"    "}
              <span className="text-blue-400">{"</form>"}</span>
              <br />
              {"  "}
              <span className="text-white">)</span>
              <br />
              <span className="text-white">{"}"}</span>
            </code>
          </pre>
        </div>
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

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

  return (
    <div className="py-20 px-4">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid md:grid-cols-3 gap-12">
          <motion.div variants={itemVariants} className="md:col-span-1">
            <div className="space-y-6 sticky top-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`cursor-pointer transition-colors ${
                    activeTab === index
                      ? "text-[#818cf8]"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  <h3 className="text-xl font-[500] mb-2">{feature.title}</h3>
                  <p className="text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="md:col-span-2 min-h-[400px]"
          >
            {features[activeTab].content}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export const FeatureTabs: ShowcaseComponent = {
  id: "feature-tabs",
  name: "Feature Tabs",
  description:
    "An interactive feature showcase with tabs and detailed content views",
  category: "features",
  component: Component,
  code: `"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FeatureTabs() {
  // ... rest of the component code ...
}`,
};
