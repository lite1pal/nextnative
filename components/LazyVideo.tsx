"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function LazyVideo({ src, alt }: LazyVideoProps) {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!isInView) return;
    const v = videoRef.current;
    if (!v) return;

    // Make autoplay more reliable on iOS Safari
    v.muted = true;
    v.playsInline = true;

    const p = v.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        // ignore — Safari may block until gesture, but we tried
      });
    }
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.playsInline = true;

    const p = v.play();
    if (p && typeof (p as Promise<void>).catch === "function") {
      (p as Promise<void>).catch(() => {});
    }
  }, [isInView]);

  // optional iOS IO fallback
  useEffect(() => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isiOS = /iPad|iPhone|iPod/.test(ua);
    if (!isiOS) return;

    const t = setTimeout(() => {
      setIsInView((prev) => prev || true);
    }, 1500);

    return () => clearTimeout(t);
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
      {/* {src.includes("iap-section") && (
        <Image
          src="/section-videos/placeholder.webp"
          alt={alt}
          width={100}
          height={100}
          objectFit="cover"
          sizes="33vw"
          quality={25}
        />
      )} */}
      {isInView && (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
            </div>
          )}
          <video
            ref={videoRef}
            className={`${src.includes("iap-section") && "px-24 sm:px-44"} absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            disablePictureInPicture
            controls={showControls}
            preload="auto"
            aria-label={alt}
            onLoadedData={() => setIsLoaded(true)}
            onPlaying={() => setIsLoaded(true)}
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
