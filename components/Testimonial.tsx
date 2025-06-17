import { PersonStanding } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

function Testimonial({
  name,
  description,
  testimonial,
  imgSrc,
}: {
  name: string;
  description: string;
  testimonial: ReactNode;
  imgSrc?: string;
}) {
  return (
    <div
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
      className="flex flex-col rounded-2xl px-10 bg-white text-lg md:text-[24px] gap-8 mx-auto max-w-[759.07px] py-8 sm:py-16 my-16"
    >
      <div className="flex items-center gap-4">
        <div className="relative w-[80px] h-[80px]">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt="Profile picture"
              fill
              className="rounded-full object-cover w-[80px] h-[80px]"
            />
          ) : (
            <div className="rounded-full flex items-center justify-center bg-green-400 object-cover w-[80px] h-[80px]">
              {/* <div className="bg-indigo-400 rounded-full w-[50px] h-[50px]"></div> */}
              MS
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <p className="font-[500]">{name}</p>
          <p className="text-gray">{description}</p>
        </div>
      </div>

      <blockquote>{testimonial}</blockquote>
    </div>
  );
}

export default Testimonial;
