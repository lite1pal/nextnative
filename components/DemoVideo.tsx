"use client";

import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { playpenSans } from "./PricingSection";
import StarburstSign from "./StarburstSign";
import Image from "next/image";
import HighlightedSpan from "./HighlightedSpan";
import { trackEvent } from "@/services/custom-analytics";

function DemoVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Replace with your actual video URL
  const embedUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div ref={videoRef} className="flex flex-col gap-4 my-20 px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-2">
        <h2 className="text-2xl md:text-3xl font-[500]">
          <HighlightedSpan>Watch NextNative in action</HighlightedSpan>
        </h2>
        <span
          className={`${playpenSans.className} text-sm sm:text-base font-[500] text-gray`}
        >
          Just 3 minutes to see how it works ⚡
        </span>
      </div>

      <StarburstSign position="bottom-right" rotation={180}>
        <div
          onClick={() => trackEvent("DemoVideo_clicked")}
          className={`w-full h-[300px] md:h-[800px] rounded-[20px] overflow-hidden relative shadow-lg border border-gray-100 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {!isPlaying ? (
            <div
              onClick={() => setIsPlaying(true)}
              className="w-full group cursor-pointer h-full relative"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />

              <Image
                src="/video-demo-2.png"
                alt="NextNative demo - Build cross-platform mobile apps with web technologies"
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
                loading="lazy"
              />

              {/* <div className="absolute bottom-6 right-6 text-white z-20 max-w-md text-left">
                <h3 className="text-xl md:text-2xl font-[500] mb-2">
                  Turn your web skills into mobile apps
                </h3>
                
              </div> */}

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-[72px] h-[72px] group-hover:scale-110 group-hover:bg-primary/90 transition-all duration-300 rounded-full bg-primary flex items-center justify-center">
                  <Play className="text-white fill-white w-8 h-8" />
                </div>
              </div>
            </div>
          ) : (
            <iframe
              src={embedUrl}
              title="NextNative Demo - Build cross-platform mobile apps with web technologies"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          )}
        </div>
      </StarburstSign>

      <p className="text-gray text-center mt-4 max-w-2xl mx-auto">
        Hey web developers! 👋 Tired of learning new frameworks just to build
        mobile apps? NextNative lets you use your favorite web tools (Next.js,
        React, Tailwind) to create stunning iOS and Android apps in a fraction
        of the time. No native code required!
      </p>
    </div>
  );
}

export default DemoVideo;
