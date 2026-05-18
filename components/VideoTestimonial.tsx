"use client";

import { cn } from "@/lib/cn";
import { trackEvent } from "@/services/custom-analytics";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState, ReactNode } from "react";

function VideoTestimonial({
  name,
  testimonial,
  videoSrc,
  className = "",
  showStars = false,
  url,
  poster = "/testimonials/jack-poster.webp",
}: {
  name: string;
  testimonial: ReactNode | string;
  videoSrc: string;
  className?: string;
  showStars?: boolean;
  url?: string;
  poster?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className={cn(
        `mx-auto my-16 flex max-w-[759.07px] flex-col rounded-xl bg-white text-lg md:text-[22px]`,
        className,
      )}
    >
      {/* Video or Poster Section */}
      <div className="relative overflow-hidden rounded-t-xl">
        {isPlaying ? (
          <video
            autoPlay
            controls
            className="h-auto w-full rounded-t-xl"
            onEnded={() => setIsPlaying(false)}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div
            className="group relative cursor-pointer"
            onClick={() => {
              setIsPlaying(true);
              trackEvent("video_testimonial_play");
            }}
          >
            <Image
              src={poster}
              alt={`${name} testimonial placeholder`}
              className="h-auto w-full object-cover"
              width={759}
              height={427}
              sizes="20vw"
            />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <div className="bg-primary rounded-full p-4 group-hover:scale-110">
                <Play className="ml-1 h-8 w-8 text-white" fill="currentColor" />
              </div>
            </div>

            {/* Name and Stars */}
            <div className="absolute right-4 bottom-4 rounded-lg bg-black/70 px-3 py-2 text-white">
              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold">{name}</span>
                {showStars && (
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 fill-current text-yellow-400"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Testimonial Text */}
      <div>
        <blockquote className="bg-primary rounded-b-xl px-6 py-6 text-xl font-medium text-white md:text-2xl">
          {testimonial}
        </blockquote>
      </div>
    </div>
  );
}

export default VideoTestimonial;
