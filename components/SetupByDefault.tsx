import Image from "next/image";
import Heading from "./Heading";
import Subheading from "./Subheading";
import StarburstSign from "./StarburstSign";

const tools = [
  { src: "/tools/auth.png", alt: "Firebase Auth", isRectangular: false },
  {
    src: "/tools/inapppurchases.png",
    alt: "In-App Purchases",
    isRectangular: true,
  },
  { src: "/tools/mongo.png", alt: "Mongo Database", isRectangular: false },
  { src: "/tools/nextjs.png", alt: "Serverless API", isRectangular: true },
  { src: "/tools/tailwind.png", alt: "TailwindCSS", isRectangular: false },
  { src: "/tools/auth.png", alt: "Push Notifications", isRectangular: false },
  { src: "/tools/i18n.png", alt: "Internationalization", isRectangular: true },
  { src: "/tools/daisyui.png", alt: "Any UI Library", isRectangular: true },
  { src: "/tools/prisma.png", alt: "Prisma ORM", isRectangular: false },
  { src: "/tools/cap.png", alt: "Capacitor", isRectangular: true },
  { src: "/tools/ts.png", alt: "TypeScript", isRectangular: false },
  { src: "/tools/ionic.png", alt: "Ionic", isRectangular: false },
];

function SetupByDefault() {
  return (
    <div className="flex flex-col gap-4 py-12 md:py-20 mx-auto text-center">
      <StarburstSign
        position="bottom-right"
        rotation={180}
        className="w-fit mx-auto"
        svgClassName="bottom-[-40px] right-[-30px]"
      >
        <Subheading
          className="items-center"
          heading1="Everything you need,"
          heading2="setup by default"
        />
      </StarburstSign>
      <div className="grid mt-16 md:mt-28 md:grid-cols-3 gap-[60px] md:gap-[88px]">
        {tools.map((tool) => (
          <ToolCard
            key={tool.alt}
            src={tool.src}
            alt={tool.alt}
            isRectangular={tool.isRectangular}
          />
        ))}
      </div>
    </div>
  );
}

export default SetupByDefault;

function ToolCard({
  src,
  alt,
  isRectangular,
}: {
  src: string;
  alt: string;
  isRectangular: boolean;
}) {
  return (
    <div className="flex items-center justify-center flex-col gap-[34px]">
      <div
        className={`h-[130px] w-[130px] rounded-[20px] overflow-hidden ${
          isRectangular ? "w-[195px]" : "w-[130px]"
        }`}
      >
        <Image
          src={src}
          alt={alt}
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-lg md:text-[30px] font-[500]">{alt}</div>
    </div>
  );
}
