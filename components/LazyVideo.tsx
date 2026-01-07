"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function LazyVideo({ src, alt }: LazyVideoProps) {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.05,
        rootMargin: "50px",
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative order-2 h-[350px] w-full overflow-hidden rounded-3xl bg-[#4c1190] md:order-2 md:w-[550px]"
      role="region"
      aria-label={alt}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {src.includes("iap-section") && (
        <Image
          src="/section-videos/placeholder.webp"
          alt={alt}
          width={100}
          height={100}
          objectFit="cover"
          sizes="33vw"
          quality={25}
        />
      )}
      {isInView && (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
            </div>
          )}
          <video
            className={`${src.includes("iap-section") && "px-24 sm:px-44"} absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            controls={showControls}
            preload="metadata"
            aria-label={alt}
            onCanPlay={() => setIsLoaded(true)}
            onError={() => console.error("Video failed to load")}
          />
        </>
      )}
    </div>
  );
}

interface LazyVideoProps {
  src: string;
  alt: string;
}

export default LazyVideo;
