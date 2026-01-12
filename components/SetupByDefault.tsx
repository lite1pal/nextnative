import Image from "next/image";
import Subheading from "./Subheading";
import HighlightedSpan2 from "./HighlightedSpan2";

interface Tool {
  src: string;
  alt: string;
  isRectangular: boolean;
  description: string;
}
const tools: Tool[] = [
  {
    src: "/tools/nextjs.webp",
    alt: "Next.js Serverless API",
    isRectangular: true,
    description: "Build fullstack apps with API routes in the same codebase",
  },
  {
    src: "/tools/capacitor.webp",
    alt: "Capacitor",
    isRectangular: true,
    description: "Access native features like camera, GPS, and offline storage",
  },
  {
    src: "/tools/tailwind.svg",
    alt: "TailwindCSS",
    isRectangular: false,
    description: "Create responsive UIs fast with utility-first styling",
  },
  {
    src: "/tools/firebase.svg",
    alt: "Firebase Auth",
    isRectangular: false,
    description: "Google/Apple logins and push notifications with zero setup",
  },
  {
    src: "/tools/revenuecat.svg",
    alt: "In-App Purchases",
    isRectangular: true,
    description: "Monetize with subscriptions and one-time payments",
  },
  {
    src: "/tools/supabase.svg",
    alt: "Supabase",
    isRectangular: true,
    description: "Postgres-backed storage. Use as a database or file storage",
  },
  // {
  //   src: "/tools/daisyui.svg",
  //   alt: "Any UI Library",
  //   isRectangular: true,
  //   description: "Drop-in component library styled with Tailwind",
  // },
  {
    src: "/tools/ts.svg",
    alt: "TypeScript",
    isRectangular: false,
    description: "Catch bugs early and ship with confidence",
  },
  // {
  //   src: "/tools/no-lockin.svg",
  //   alt: "No Vendor Lock-In",
  //   isRectangular: true,
  //   description: "No vendor lock-in. Swap to any UI library or infrastructure",
  // },
];

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="group">
      <div className={`flex h-full flex-col rounded-3xl sm:p-6`}>
        <div
          style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
          className={`${tool.src.includes("capacitor") && "px-20 sm:px-6"} mb-4 flex items-center justify-center rounded-2xl bg-white p-6`}
        >
          <div className={`relative h-36 w-full`}>
            <Image
              src={tool.src}
              alt={tool.alt}
              fill
              className="object-contain"
            />
          </div>
        </div>
        <p className="text-lg font-[500] text-gray-500">{tool.description}</p>
      </div>
    </div>
  );
}

function SetupByDefault() {
  return (
    <div className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <Subheading
            heading1="Everything you need,"
            heading2="setup by default"
            className="text-start md:items-center md:text-center"
          />

          <p className="mt-6 w-fit max-w-2xl self-start text-start text-lg md:mx-auto md:text-center">
            Stop wasting time on configuration. Start with a fully-featured
            foundation and focus on what makes your app unique.
          </p>
        </div>

        <div className="grid grid-cols-1 justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool, index) => (
            <ToolCard key={tool.alt} tool={tool} />
          ))}

          <p className="mt-18 text-center font-[500] text-gray-500">
            <HighlightedSpan2>
              <span className="text-3xl">No vendor lock-in</span>
            </HighlightedSpan2>
            <br />
            <br />
            <span className="text-lg">
              Swap to any UI library or infrastructure
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SetupByDefault;
