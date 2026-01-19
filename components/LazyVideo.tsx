import Image from "next/image";

interface LazyVideoProps {
  src: string;
  alt: string;
  posterSrc?: string;
  controls?: boolean;
  preload?: "none" | "metadata" | "auto";
}

export default function LazyVideo({
  src,
  alt,
  posterSrc = "/section-videos/placeholder.webp",
  controls = false,
  preload = "none",
}: LazyVideoProps) {
  const isIapSection = src.includes("iap-section");

  return (
    <div
      className="relative order-2 h-[350px] w-full overflow-hidden rounded-3xl bg-[#4c1190] md:order-2 md:w-[550px]"
      role="region"
      aria-label={alt}
    >
      {isIapSection && (
        <Image
          src={posterSrc}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 550px"
          quality={40}
          className="object-cover"
          priority={false}
        />
      )}

      <video
        className={[
          "absolute inset-0 h-full w-full object-cover",
          isIapSection ? "px-24 sm:px-44" : "",
        ].join(" ")}
        src={src}
        poster={posterSrc}
        autoPlay
        muted
        loop
        playsInline
        controls={controls}
        preload={preload}
        aria-label={alt}
        disablePictureInPicture
      />
    </div>
  );
}
