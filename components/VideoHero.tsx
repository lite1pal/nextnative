"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export function VideoHero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
    };

    videoElement.addEventListener("loadeddata", handleLoadedData);

    return () => {
      videoElement.removeEventListener("loadeddata", handleLoadedData);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-black/60 z-10" />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src="https://storage.googleapis.com/nextnative-marketing/background-video.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Fallback background while video loads */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-indigo-900 to-black transition-opacity duration-1000 ${
          isVideoLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Content */}
      <div className="relative z-20 flex h-full w-full items-center justify-center">
        <div className="container px-4 py-20 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 animate-fade-in-up inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-lg">
              <span className="mr-2 h-2 w-2 rounded-full bg-green-400" />
              <span className="text-sm font-medium text-white">
                Now available for all platforms
              </span>
            </div>

            <h1 className="animate-fade-in-up mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              From Web to
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text px-2 text-transparent">
                  Native Apps
                </span>
                <span className="absolute bottom-2 left-0 right-0 z-0 h-3 rounded-full bg-gradient-to-r from-blue-400/30 via-purple-500/30 to-pink-500/30 blur-md" />
              </span>
              in Minutes
            </h1>

            <p className="animate-fade-in-up mb-10 text-xl text-white/80">
              Build beautiful, performant mobile experiences with the web
              technologies you already know. NextNative bridges the gap between
              web and native development.
            </p>

            <div className="animate-fade-in-up flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90"
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-2 h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.413-1.667-.13-1.667-.986V5.653z"
                  />
                </svg>
                Watch Demo
              </Button>
            </div>

            {/* Vertical scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <div className="flex flex-col items-center">
                <span className="text-sm text-white/60">Scroll to explore</span>
                <div className="mt-2 h-12 w-6 rounded-full border border-white/20 p-1">
                  <div className="h-2 w-2 animate-bounce-slow rounded-full bg-white/80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
    </section>
  );
}

export default VideoHero;
