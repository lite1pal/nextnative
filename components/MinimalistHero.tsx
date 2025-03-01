"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function MinimalistHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate rotation based on mouse position relative to the center
      const newRotateY = ((e.clientX - centerX) / (rect.width / 2)) * 3;
      const newRotateX = ((e.clientY - centerY) / (rect.height / 2)) * -3;

      setRotateX(newRotateX);
      setRotateY(newRotateY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="bg-black text-white relative overflow-hidden py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Minimalist floating element */}
          <div
            ref={containerRef}
            className="relative mb-12 perspective-1000"
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <div className="relative h-36 w-36 md:h-48 md:w-48 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%)",
                }}
              />
            </div>

            <div className="absolute -top-2 -right-2 h-24 w-24 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400" />

            <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500" />
          </div>

          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
              Turn web skills into
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400">
                native mobile apps
              </span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              The simplest way to build cross-platform apps using the tech stack
              you already love. Build once, deploy to web, iOS, and Android.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90"
              >
                Get started for free
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-gray-700 hover:bg-gray-800"
              >
                See examples
              </Button>
            </div>

            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Downloads", value: "50K+" },
                { label: "Active users", value: "12K+" },
                { label: "Apps shipped", value: "2.5K+" },
                { label: "Time saved", value: "80%" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Minimal grid lines */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 border-t border-b border-gray-500" />
        <div className="h-full mx-auto border-l border-r border-gray-500 max-w-7xl" />
      </div>
    </section>
  );
}

export default MinimalistHero;
