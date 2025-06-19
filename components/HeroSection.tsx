import CTA from "./CTA";
import Heading from "./Heading";
import { AvatarList, RatingSvg } from "./HeroSection2";

function HeroSection() {
  return (
    <div className="flex flex-col py-12 md:py-20 items-center max-w-[764px] mx-auto justify-center">
      <div className="flex flex-col gap-8 md:gap-[45px]">
        <div className="flex flex-col gap-6 md:gap-[36px]">
          <div className="flex flex-col">
            <div className="text-sm sm:text-base flex gap-2 md:text-lg text-gray">
              <span className="text-foreground">👋</span>
              Build with web tools you love
            </div>
            <Heading />
          </div>

          <p className="text-base max-w-xl sm:text-lg md:text-2xl leading-relaxed">
            Skip React Native. Use the web tools you already know, combined with
            Capacitor, to launch cross-platform apps in days.
          </p>
        </div>

        <CTA />

        <div className="flex gap-2">
          {/* <div className="-space-x-2 flex items-center">
            <div className="w-12 h-12 overflow-hidden rounded-full bg-gray-200">
              <Image
                src="/testimonials/vlad.jpg"
                alt="Vlad"
                className="w-full h-full object-cover"
                width={300}
                height={300}
              />
            </div>
            <div className="w-12 h-12 overflow-hidden rounded-full bg-gray-200">
              <Image
                src="/testimonials/bogdan.jpg"
                alt="Bogdan"
                className="w-full h-full object-cover"
                width={300}
                height={300}
              />
            </div>
            <div className="w-12 h-12 overflow-hidden rounded-full bg-gray-200">
              <Image
                src="/testimonials/denis.jpg"
                alt="Denis"
                className="w-full h-full object-cover"
                width={300}
                height={300}
              />
            </div>
          </div> */}
          <div className="relative -top-1.5">
            <AvatarList />
          </div>
          <div className="flex flex-col">
            <RatingSvg />
            <div className="font-medium text-gray-500 pl-2">
              Loved by makers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
