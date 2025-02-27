"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import { playpenSans } from "./PricingSection";
import StarburstSign from "./StarburstSign";
import Image from "next/image";

function DemoVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  const embedUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";

  return (
    <div className="flex flex-col gap-2 my-20">
      <span
        className={`${playpenSans.className} text-sm sm:text-base font-[500] text-gray ml-auto`}
      >
        explaining the code in 3 minutes
      </span>
      <StarburstSign position="bottom-right" rotation={180}>
        <div className="w-full h-[600px] rounded-[20px] overflow-hidden relative">
          {!isPlaying ? (
            <div
              onClick={() => setIsPlaying(true)}
              className="w-full group cursor-pointer h-full relative"
            >
              <Image
                src="/video-demo.png"
                alt="video-demo"
                width={1000}
                height={1000}
                className="w-full h-full blur-xs object-cover"
              />
              {/* Thumbnail placeholder - you may want to add an actual thumbnail image */}
              <div className="w-full h-full bg-gray-100" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-[72px] group-hover:scale-150 h-[72px] transition-all duration-300 rounded-full bg-primary flex items-center justify-center">
                  <Play className="text-white fill-white" />
                </div>
              </div>
            </div>
          ) : (
            <iframe
              src={embedUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          )}
        </div>
      </StarburstSign>
    </div>
  );
}

export default DemoVideo;
