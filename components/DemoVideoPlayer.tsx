"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "@/services/custom-analytics";

type Props = {
  videoId: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
};

export default function DemoVideoPlayer({
  videoId,
  thumbnailSrc,
  thumbnailAlt,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Keep the URL minimal; add params you actually need.
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  const handlePlay = () => {
    // Optional analytics
    try {
      trackEvent("DemoVideo_clicked");
    } catch {
      // don’t break UX if analytics fails
    }
    setIsPlaying(true);
  };

  if (isPlaying) {
    return (
      <iframe
        data-testid="demo-video"
        className="h-[250px] w-full sm:h-full"
        src={embedUrl}
        title="NextNative Demo Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      data-testid="demo-video-placeholder"
      onClick={handlePlay}
      className="group relative h-full w-full cursor-pointer"
      aria-label="Play demo video"
    >
      <span className="absolute inset-0 z-10" aria-hidden="true" />

      <Image
        src={thumbnailSrc}
        alt={thumbnailAlt}
        width={1920}
        height={1080}
        className="h-full w-full object-cover"
        priority={false}
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 962px, 1260px"
      />

      <span className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <span className="bg-primary group-hover:bg-primary/90 flex h-[72px] w-[72px] items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110">
          <Play className="h-8 w-8 fill-white text-white" />
        </span>
      </span>
    </button>
  );
}
