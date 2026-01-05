import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";
import RatingSvg from "./RatingSvg";

function Testimonial({
  name,
  description,
  testimonial,
  imgSrc,
  className = "",
  time,
  showStars = false,
  letters,
  url,
}: {
  testimonial: ReactNode;
  name?: string;
  description?: string;
  imgSrc?: string;
  className?: string;
  time?: string;
  showStars?: boolean;
  letters?: string;
  url?: string;
}) {
  return (
    <div
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
      className={cn(
        `mx-auto my-16 flex max-w-[759.07px] flex-col gap-6 rounded-2xl bg-white px-4 py-4 text-lg sm:px-10 sm:py-16 md:text-[22px]`,
        className,
      )}
    >
      <div className="flex items-center gap-4 max-sm:flex-wrap">
        <div
          className={`${imgSrc ? "h-[80px] w-[80px]" : "h-[50px] w-[50px]"} relative shrink-0`}
        >
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt="Profile picture"
              width={70}
              height={70}
              className="h-[80px] w-[80px] rounded-full object-cover"
            />
          ) : (
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-green-400 object-cover">
              {letters}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-xl font-[500]">{name}</p>
          <p className="text-gray text-lg">{description}</p>
        </div>
        {showStars && (
          <div className="mt-1">
            <RatingSvg />
          </div>
        )}

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener"
            className="text-gray ml-auto hidden sm:block"
            aria-label="Visit external link"
          >
            <img
              src="/external-link.svg"
              width={20}
              height={20}
              alt="MicroLaunch"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="opacity-50"
              style={{ display: "inline-block" }}
            />
          </a>
        )}
      </div>

      <blockquote className="leading-9 sm:leading-10">{testimonial}</blockquote>

      <time className="text-gray text-base">{time}</time>
    </div>
  );
}

export default Testimonial;
