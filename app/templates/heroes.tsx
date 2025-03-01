"use client";

import GradientHero from "@/components/GradientHero";
import SplitHero from "@/components/SplitHero";
import MinimalistHero from "@/components/MinimalistHero";
import VideoHero from "@/components/VideoHero";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function HeroTemplates() {
  const [activeHero, setActiveHero] = useState<number>(0);

  const heroes = [
    { component: <GradientHero />, name: "Gradient Hero" },
    { component: <SplitHero />, name: "Split Hero" },
    { component: <MinimalistHero />, name: "Minimalist Hero" },
    { component: <VideoHero />, name: "Video Hero" },
  ];

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Hero Section Templates</h1>
            <div className="flex gap-2">
              {heroes.map((hero, index) => (
                <Button
                  key={index}
                  variant={activeHero === index ? "default" : "outline"}
                  onClick={() => setActiveHero(index)}
                  className="text-sm"
                >
                  {hero.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>{heroes[activeHero].component}</div>

      <div className="container mx-auto px-4 py-12">
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <p className="mb-4">
            To use these hero sections in your project, simply import the
            desired component into your page:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">
            {`import ${heroes[activeHero].name.replace(
              " ",
              ""
            )} from "@/components/${heroes[activeHero].name.replace(" ", "")}";
            
export default function YourPage() {
  return (
    <div>
      <${heroes[activeHero].name.replace(" ", "")} />
      {/* Other page content */}
    </div>
  );
}`}
          </pre>

          <h3 className="text-xl font-bold mt-8 mb-4">Customization Options</h3>
          <p className="mb-4">
            Each hero section can be customized by modifying the following:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li>Text content and headings</li>
            <li>Colors and gradients via Tailwind classes</li>
            <li>Button text and actions</li>
            <li>Images and media sources</li>
          </ul>

          <div className="flex justify-end">
            <Button
              onClick={() =>
                navigator.clipboard.writeText(
                  `import ${heroes[activeHero].name.replace(
                    " ",
                    ""
                  )} from "@/components/${heroes[activeHero].name.replace(
                    " ",
                    ""
                  )}";`
                )
              }
            >
              Copy Import
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
