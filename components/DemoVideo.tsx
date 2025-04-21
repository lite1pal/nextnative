"use client";

import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { playpenSans } from "./PricingSection";
import StarburstSign from "./StarburstSign";
import Image from "next/image";
import HighlightedSpan from "./HighlightedSpan";
import { trackEvent } from "@/services/custom-analytics";
import { toast } from "react-hot-toast";

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

  const handleVideoClick = () => {
    trackEvent("DemoVideo_clicked");

    toast.custom(
      (t) => (
        <div
          className={`${t.visible ? "animate-enter" : "animate-leave"} 
        max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto 
        flex ring-1 ring-black ring-opacity-5 border-l-4 border-primary`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Play className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Coming soon!
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  The demo video is in progress, sorry 🎬
                </p>
                <p className="mt-5 text-sm text-gray-500">
                  Feel free to message me on{" "}
                  <a
                    href="https://x.com/lite_pal"
                    className="text-primary underline"
                  >
                    X
                  </a>{" "}
                  or{" "}
                  <a
                    href="mailto:deniskatarasenko6@gmail.com"
                    className="text-primary underline"
                  >
                    email me
                  </a>{" "}
                  for more details!
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-primary hover:text-primary/80 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      ),
      { duration: 6000 }
    );
  };

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
          className={`w-full h-[300px] md:h-[800px] rounded-[20px] overflow-hidden relative shadow-lg border border-gray-100 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            onClick={handleVideoClick}
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
