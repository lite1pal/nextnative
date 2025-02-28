import CTA from "./CTA";
import Heading from "./Heading";

function HeroSection() {
  return (
    <div className="flex flex-col py-12 md:py-20 items-center max-w-[764px] mx-auto justify-center">
      <div className="flex flex-col gap-8 md:gap-[60px]">
        <div className="flex flex-col gap-6 md:gap-[36px]">
          <div className="flex flex-col">
            <div className="text-sm sm:text-base mx-auto flex items-center gap-2 md:text-lg text-gray">
              <span className="text-foreground">👋</span>
              {/*change text to align with this product*/}I bet you're a
              creative person!
            </div>
            <Heading />
          </div>

          <p className="text-base sm:text-lg md:text-2xl text-center leading-relaxed">
            Skip React Native. Use the tools you already know to launch
            cross-platform apps in days.
          </p>
        </div>

        <CTA />

        {/* {isWaitlist ? (
          <JoinWaitlistForm />
        ) : (
          <StarburstSign
            rotation={270}
            position="bottom-left"
            className="mx-auto"
          >
            <a href="#pricing" className="mx-auto">
              <Button variant="primary">Build your app today</Button>
            </a>
          </StarburstSign>
        )} */}
      </div>
    </div>
  );
}

export default HeroSection;
