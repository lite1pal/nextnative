import CTA from "./CTA";
import Heading from "./Heading";

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
      </div>
    </div>
  );
}

export default HeroSection;
