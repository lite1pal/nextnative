"use client";

import { Play } from "lucide-react";
import { useRef, useState } from "react";
import StarburstSign from "./StarburstSign";
import Image from "next/image";
import { trackEvent } from "@/services/custom-analytics";
import Subheading from "./Subheading";

function DemoVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  const videoId = "9iDXsyiP134";
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&`;
  const thumbnailUrl = "/thumbnail-4.png";

  const handleVideoClick = () => {
    trackEvent("DemoVideo_clicked");
    setIsPlaying(true);
  };

  return (
    <div
      id="demo"
      ref={videoRef}
      className="mt-16 mb-10 flex flex-col sm:mt-10 sm:mb-20 sm:px-20 md:py-20"
    >
      <div className="mb-16 text-center">
        <Subheading
          heading1="Watch NextNative"
          heading2="Demo"
          className="text-start md:items-center md:text-center"
        />
        <p className="mt-6 w-fit max-w-2xl self-start text-start text-lg md:mx-auto md:text-center">
          I explain in 3 minutes how you can get started building mobile apps
          with Next.js
        </p>
      </div>

      <StarburstSign position="bottom-right" rotation={180}>
        <div
          style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
          className={`relative h-full max-w-[962px] overflow-hidden rounded-[20px] bg-white xl:h-[620px] xl:max-w-[1260px]`}
        >
          {isPlaying ? (
            <iframe
              data-testid="demo-video"
              className="h-full w-full"
              src={embedUrl}
              title="NextNative Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div
              data-testid="demo-video-placeholder"
              onClick={handleVideoClick}
              className="group relative h-full w-full cursor-pointer"
            >
              <div className="absolute inset-0 z-10" />
              <Image
                src={thumbnailUrl}
                alt="NextNative demo - Build cross-platform mobile apps with web technologies"
                width={1920}
                height={1080}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                <div className="group-hover:bg-primary/90 bg-primary flex h-[72px] w-[72px] items-center justify-center rounded-full group-hover:scale-110">
                  <Play className="h-8 w-8 fill-white text-white" />
                </div>
              </div>
            </div>
          )}
        </div>
      </StarburstSign>
    </div>
  );
}

export default DemoVideo;
