"use client";

import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { playpenSans } from "./PricingSection";
import StarburstSign from "./StarburstSign";
import Image from "next/image";
import { trackEvent } from "@/services/custom-analytics";

function DemoVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // YouTube video ID and URLs
  const videoId = "9iDXsyiP134";
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&`;
  // const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const thumbnailUrl = "/thumbnail-4.png";

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

  const handleVideoClick = () => {
    trackEvent("DemoVideo_clicked");
    setIsPlaying(true);
  };

  return (
    <div
      ref={videoRef}
      className="flex flex-col mt-20 sm:mb-20 sm:px-20 md:py-20"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-2">
        <div></div>
        <span
          className={`${playpenSans.className} text-sm sm:text-xl font-[500] text-gray`}
        >
          Just 3 minutes to see how it works ⚡
        </span>
      </div>

      <StarburstSign position="bottom-right" rotation={180}>
        <div
          style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
          className={`max-w-[962px] xl:max-w-[1260px] h-full xl:h-[620px] rounded-[20px] overflow-hidden relative bg-white transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {isPlaying ? (
            <iframe
              className="w-full h-full"
              src={embedUrl}
              title="NextNative Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div
              onClick={handleVideoClick}
              className="w-full group cursor-pointer h-full relative"
            >
              <div className="absolute inset-0 z-10" />
              <Image
                src={thumbnailUrl}
                alt="NextNative demo - Build cross-platform mobile apps with web technologies"
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-[72px] h-[72px] group-hover:scale-125 group-hover:bg-primary/90 transition-all duration-300 rounded-full bg-primary flex items-center justify-center">
                  <Play className="text-white fill-white w-8 h-8" />
                </div>
              </div>
            </div>
          )}
        </div>
      </StarburstSign>
      {/* 
      <p className="text-gray text-center mt-4 max-w-2xl mx-auto">
        Hey web developers! 👋 Tired of learning new frameworks just to build
        mobile apps? NextNative lets you use your favorite web tools (Next.js,
        React, Tailwind) to create stunning iOS and Android apps in a fraction
        of the time. No native code required!
      </p> */}
    </div>
  );
}

export default DemoVideo;
