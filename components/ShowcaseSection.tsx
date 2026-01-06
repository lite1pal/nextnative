import Link from "next/link";
import IPhoneMockup from "./note-taking/iphone-mockup";
import Image from "next/image";
import Subheading from "./Subheading";

function ShowcaseSection() {
  return (
    <div>
      <div className="text-center max-md:mt-24 md:mb-16">
        <Subheading
          heading1="See what"
          heading2="you can build in days"
          className="text-start md:items-center md:text-center"
        />

        <p className="mt-6 w-fit max-w-2xl self-start text-start text-lg md:mx-auto md:text-center">
          Real apps. Real features. Fully cross-platform.
        </p>
      </div>
      <Link
        href="/showcase"
        id="interactive-demo"
        className="relative flex h-[500px] justify-center space-x-[-200px] max-md:left-10 max-md:scale-[0.6] max-sm:pointer-events-none sm:h-full md:py-16"
      >
        <div className="rotate-[-30deg]">
          <IPhoneMockup isDark={false}>
            <div>
              <Image
                src="/showcase/lastinghabits.png"
                alt="Lasting Habits App Screenshot"
                width={1920}
                height={1080}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </IPhoneMockup>
        </div>
        <div className="z-20 rotate-[0deg]">
          <IPhoneMockup isDark={true}>
            <div>
              <Image
                src="/showcase/sproutly-premium-screen.jpg"
                alt="AI Plant identification app screenshot"
                width={1920}
                height={1080}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </IPhoneMockup>
        </div>
        <div className="rotate-[30deg] max-sm:relative max-sm:top-10">
          <IPhoneMockup isDark={false}>
            <div>
              <Image
                src="/showcase/bill-organizer/screen-3-2.png"
                alt="Bill Organizer - Matcharge"
                width={1920}
                height={1080}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </IPhoneMockup>
        </div>
      </Link>
    </div>
  );
}

export default ShowcaseSection;
