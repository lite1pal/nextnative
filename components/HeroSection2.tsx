import Image from "next/image";
import CTA from "./CTA";
import HighlightedSpan from "./HighlightedSpan";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/services/custom-analytics";

function HeroSection2() {
  return (
    <div className="hidden xl:flex flex-col relative py-12 md:py-20 md:pt-16 items-center mx-auto justify-center">
      <div className="flex justify-between pb-10 w-full items-center">
        <div className="rotate-[-7deg]">
          <ToolCard
            tool="Next.js"
            bullets={["API Routes", "A single codebase"]}
            img="/tools/nextjs-dark.jpeg"
          />
        </div>
        <div className="rotate-[7deg]">
          <ToolCard
            tool="Capacitor"
            bullets={["Native functionality", "Cross-platform support"]}
            img="/tools/cap-small.png"
          />
        </div>
      </div>

      <div className="flex absolute bottom-14 pointer-events-none justify-between w-full items-center">
        <div className="rotate-[-15deg] relative -left-16 pb-10">
          <ToolCard
            tool="Tailwind"
            bullets={["Utility classes", "Responsive design"]}
            img="/tools/tailwind.png"
          />
        </div>
        <div className="rotate-[15deg] relative -right-16">
          <ToolCard
            tool="RevenueCat"
            bullets={["One-time payments", "Subscriptions"]}
            img="/tools/revenuecat-small.png"
          />
        </div>
      </div>

      <div className="flex flex-col max-w-[946.5px] w-full items-center text-center gap-8 md:gap-[45px]">
        <div className="flex flex-col items-center text-center gap-6 md:gap-[36px]">
          <div className="flex flex-col items-center">
            {/* <div className="text-sm sm:text-base flex gap-2 md:text-lg text-gray">
              <span className="text-foreground">👋</span>
              Build with web tools you love
            </div> */}
            <h1 className="text-[44px] md:text-[74px] leading-[60px] md:leading-[91px] font-[600]">
              Launch mobile apps faster with{" "}
              <HighlightedSpan>Next.js</HighlightedSpan>
            </h1>
          </div>

          <p className="text-base max-w-[654.36px] sm:text-lg md:text-[22px] leading-relaxed">
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

export default HeroSection2;

function ToolCard({ tool, bullets, img }: any) {
  return (
    <div
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
      className="w-fit px-16 h-[121.4px] rounded-[20px] py-4 flex items-center justify-center bg-white"
    >
      <div className="flex gap-[20px]">
        <div className="w-[60px] h-[60px] rounded-[10px] overflow-hidden">
          <Image
            src={img}
            width={300}
            height={300}
            className="object-cover w-full h-full"
            priority
            alt={tool}
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-[24px] font-medium">{tool}</div>

          <ul role="list" className="list-disc pl-[17px] market-[#868C98]">
            {bullets.map((bullet: string) => (
              <li key={bullet} className="text-[16px] text-[#868C98]">
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function RatingSvg() {
  return (
    <svg
      width="109"
      height="25"
      viewBox="0 0 109 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.1587 18.0443L8.91439 20.6011C8.72689 20.7205 8.53087 20.7716 8.32633 20.7545C8.12178 20.7375 7.94281 20.6693 7.7894 20.55C7.63599 20.4307 7.51668 20.2817 7.43145 20.1031C7.34623 19.9244 7.32918 19.724 7.38032 19.5017L8.5053 14.6693L4.74683 11.4222C4.57637 11.2688 4.47001 11.0939 4.42774 10.8975C4.38547 10.7011 4.39808 10.5096 4.46558 10.3227C4.53308 10.1359 4.63535 9.9825 4.77239 9.8625C4.90944 9.7425 5.09693 9.6658 5.33489 9.63239L10.2951 9.19773L12.2126 4.6466C12.2979 4.44205 12.4301 4.28864 12.6095 4.18637C12.7888 4.0841 12.9718 4.03296 13.1587 4.03296C13.3455 4.03296 13.5285 4.0841 13.7079 4.18637C13.8872 4.28864 14.0194 4.44205 14.1047 4.6466L16.0223 9.19773L20.9824 9.63239C21.2211 9.66648 21.4086 9.74319 21.5449 9.8625C21.6813 9.98182 21.7836 10.1352 21.8517 10.3227C21.9199 10.5102 21.9329 10.7022 21.8906 10.8985C21.8483 11.0949 21.7416 11.2694 21.5705 11.4222L17.812 14.6693L18.937 19.5017C18.9881 19.7233 18.9711 19.9238 18.8859 20.1031C18.8006 20.2824 18.6813 20.4314 18.5279 20.55C18.3745 20.6686 18.1955 20.7368 17.991 20.7545C17.7864 20.7723 17.5904 20.7211 17.4029 20.6011L13.1587 18.0443Z"
        fill="#FFC800"
      />
      <path
        d="M34.0219 18.0443L29.7777 20.6011C29.5902 20.7205 29.3942 20.7716 29.1896 20.7545C28.9851 20.7375 28.8061 20.6693 28.6527 20.55C28.4993 20.4307 28.38 20.2817 28.2947 20.1031C28.2095 19.9244 28.1925 19.724 28.2436 19.5017L29.3686 14.6693L25.6101 11.4222C25.4397 11.2688 25.3333 11.0939 25.291 10.8975C25.2487 10.7011 25.2614 10.5096 25.3289 10.3227C25.3964 10.1359 25.4986 9.9825 25.6357 9.8625C25.7727 9.7425 25.9602 9.6658 26.1982 9.63239L31.1583 9.19773L33.0759 4.6466C33.1612 4.44205 33.2934 4.28864 33.4727 4.18637C33.6521 4.0841 33.8351 4.03296 34.0219 4.03296C34.2088 4.03296 34.3918 4.0841 34.5711 4.18637C34.7505 4.28864 34.8827 4.44205 34.9679 4.6466L36.8855 9.19773L41.8457 9.63239C42.0843 9.66648 42.2718 9.74319 42.4082 9.8625C42.5446 9.98182 42.6468 10.1352 42.715 10.3227C42.7832 10.5102 42.7961 10.7022 42.7539 10.8985C42.7116 11.0949 42.6049 11.2694 42.4338 11.4222L38.6753 14.6693L39.8003 19.5017C39.8514 19.7233 39.8344 19.9238 39.7491 20.1031C39.6639 20.2824 39.5446 20.4314 39.3912 20.55C39.2378 20.6686 39.0588 20.7368 38.8543 20.7545C38.6497 20.7723 38.4537 20.7211 38.2662 20.6011L34.0219 18.0443Z"
        fill="#FFC800"
      />
      <path
        d="M54.8852 18.0443L50.641 20.6011C50.4535 20.7205 50.2574 20.7716 50.0529 20.7545C49.8483 20.7375 49.6694 20.6693 49.516 20.55C49.3626 20.4307 49.2432 20.2817 49.158 20.1031C49.0728 19.9244 49.0557 19.724 49.1069 19.5017L50.2319 14.6693L46.4734 11.4222C46.3029 11.2688 46.1966 11.0939 46.1543 10.8975C46.112 10.7011 46.1246 10.5096 46.1921 10.3227C46.2596 10.1359 46.3619 9.9825 46.499 9.8625C46.636 9.7425 46.8235 9.6658 47.0614 9.63239L52.0216 9.19773L53.9392 4.6466C54.0244 4.44205 54.1567 4.28864 54.336 4.18637C54.5153 4.0841 54.6984 4.03296 54.8852 4.03296C55.072 4.03296 55.2551 4.0841 55.4344 4.18637C55.6137 4.28864 55.746 4.44205 55.8312 4.6466L57.7488 9.19773L62.709 9.63239C62.9476 9.66648 63.1351 9.74319 63.2715 9.8625C63.4078 9.98182 63.5101 10.1352 63.5783 10.3227C63.6465 10.5102 63.6594 10.7022 63.6172 10.8985C63.5749 11.0949 63.4682 11.2694 63.297 11.4222L59.5386 14.6693L60.6636 19.5017C60.7147 19.7233 60.6976 19.9238 60.6124 20.1031C60.5272 20.2824 60.4079 20.4314 60.2545 20.55C60.1011 20.6686 59.9221 20.7368 59.7175 20.7545C59.513 20.7723 59.317 20.7211 59.1295 20.6011L54.8852 18.0443Z"
        fill="#FFC800"
      />
      <path
        d="M75.7485 18.0443L71.5042 20.6011C71.3167 20.7205 71.1207 20.7716 70.9162 20.7545C70.7116 20.7375 70.5327 20.6693 70.3792 20.55C70.2258 20.4307 70.1065 20.2817 70.0213 20.1031C69.9361 19.9244 69.919 19.724 69.9702 19.5017L71.0951 14.6693L67.3367 11.4222C67.1662 11.2688 67.0599 11.0939 67.0176 10.8975C66.9753 10.7011 66.9879 10.5096 67.0554 10.3227C67.1229 10.1359 67.2252 9.9825 67.3622 9.8625C67.4993 9.7425 67.6868 9.6658 67.9247 9.63239L72.8849 9.19773L74.8025 4.6466C74.8877 4.44205 75.02 4.28864 75.1993 4.18637C75.3786 4.0841 75.5617 4.03296 75.7485 4.03296C75.9353 4.03296 76.1184 4.0841 76.2977 4.18637C76.477 4.28864 76.6093 4.44205 76.6945 4.6466L78.6121 9.19773L83.5723 9.63239C83.8109 9.66648 83.9984 9.74319 84.1348 9.8625C84.2711 9.98182 84.3734 10.1352 84.4416 10.3227C84.5098 10.5102 84.5227 10.7022 84.4804 10.8985C84.4382 11.0949 84.3315 11.2694 84.1603 11.4222L80.4019 14.6693L81.5268 19.5017C81.578 19.7233 81.5609 19.9238 81.4757 20.1031C81.3905 20.2824 81.2712 20.4314 81.1178 20.55C80.9643 20.6686 80.7854 20.7368 80.5808 20.7545C80.3763 20.7723 80.1803 20.7211 79.9928 20.6011L75.7485 18.0443Z"
        fill="#FFC800"
      />
      <path
        d="M96.6137 18.0443L92.3695 20.6011C92.182 20.7205 91.9859 20.7716 91.7814 20.7545C91.5769 20.7375 91.3979 20.6693 91.2445 20.55C91.0911 20.4307 90.9718 20.2817 90.8865 20.1031C90.8013 19.9244 90.7843 19.724 90.8354 19.5017L91.9604 14.6693L88.2019 11.4222C88.0315 11.2688 87.9251 11.0939 87.8828 10.8975C87.8405 10.7011 87.8532 10.5096 87.9207 10.3227C87.9882 10.1359 88.0904 9.9825 88.2275 9.8625C88.3645 9.7425 88.552 9.6658 88.79 9.63239L93.7501 9.19773L95.6677 4.6466C95.7529 4.44205 95.8852 4.28864 96.0645 4.18637C96.2439 4.0841 96.4269 4.03296 96.6137 4.03296C96.8005 4.03296 96.9836 4.0841 97.1629 4.18637C97.3422 4.28864 97.4745 4.44205 97.5597 4.6466L99.4773 9.19773L104.438 9.63239C104.676 9.66648 104.864 9.74319 105 9.8625C105.136 9.98182 105.239 10.1352 105.307 10.3227C105.375 10.5102 105.388 10.7022 105.346 10.8985C105.303 11.0949 105.197 11.2694 105.026 11.4222L101.267 14.6693L102.392 19.5017C102.443 19.7233 102.426 19.9238 102.341 20.1031C102.256 20.2824 102.136 20.4314 101.983 20.55C101.83 20.6686 101.651 20.7368 101.446 20.7545C101.242 20.7723 101.045 20.7211 100.858 20.6011L96.6137 18.0443Z"
        fill="#FFC800"
      />
    </svg>
  );
}

const data = [
  {
    name: "Vlad",
    position: "Android developer",
    image: "/testimonials/vlad.jpg",
  },
  {
    name: "Bogdan",
    position: "NVIDIA GPU Engineer",
    image: "/testimonials/bogdan.jpg",
  },
  {
    name: "Denis",
    position: "Web developer",
    image: "/testimonials/denis.jpg",
  },
];

function AvatarList({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes: Record<"sm" | "md" | "lg", string> = {
    lg: "m-3 size-6",
    md: "m-2 size-12",
    sm: "m-1 size-8",
  };

  return (
    <div className={cn("flex", className)}>
      {data.map((item) => (
        <div
          key={item.name}
          className="group relative -space-x-2 z-0 -ml-4 flex scale-100 items-center transition-all duration-200 ease-in-out hover:z-10 hover:scale-110"
        >
          <div className="relative overflow-hidden rounded-full">
            <div className="bg-size pointer-events-none absolute h-full w-full animate-bg-position from-violet-500 from-30% via-cyan-400 via-50% to-pink-500 to-80% bg-[length:300%_auto] opacity-15 group-hover:bg-gradient-to-r" />
            <div className="z-1 blur-lg" />
            <Image
              src={item.image}
              alt={item.name}
              width={300}
              height={300}
              className={cn(
                "rounded-full object-cover",
                sizes[size] ?? sizes.md
              )}
            />
          </div>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 translate-y-2 transform whitespace-nowrap rounded bg-slate-900 p-2 text-white opacity-0 transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:opacity-100 dark:bg-slate-100 dark:text-slate-900">
            <div className="text-sm font-semibold">{item.name}</div>
            <div className="text-sm">{item.position}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
