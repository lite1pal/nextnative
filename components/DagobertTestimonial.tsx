import { ChevronUp } from "lucide-react";
import Image from "next/image";

export default function DagobertTestimonial() {
  return (
    <div className="mx-auto my-4 flex w-fit flex-col items-center gap-3 sm:my-16">
      <ChevronUp className="text-gray" />
      <div className="flex items-center gap-6 rounded-full bg-white px-6 py-4 pr-10">
        <Image
          src={"/testimonials/dagobert.webp"}
          alt="Dagobert X profile picture"
          width={100}
          height={100}
          className="h-[80px] w-[80px] rounded-full object-cover"
          sizes="25vw"
        />
        <div className="flex flex-col gap-1 text-lg sm:text-xl">
          <p className="font-[500]">Love the ambition behind this</p>
          <p className="text-gray text-sm sm:text-xl">
            Dagobert — Entrepreneur
          </p>
        </div>
      </div>
    </div>
  );
}
