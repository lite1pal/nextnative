import Image from "next/image";

// Using the same tools array from SetupByDefault
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

function TechStackShowcase() {
  return (
    <div className="relative w-full max-w-4xl mx-auto py-16 md:py-24">
      {/* Elliptical border */}
      {/* <div className="absolute inset-0 border border-gray-300 rounded-full transform -rotate-12" /> */}

      {/* Center content with phone mockup */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div className="relative">
          {/* Phone mockup */}
          <div className="relative w-[220px] h-[440px] mx-auto mb-6">
            <div className="absolute inset-0 bg-black rounded-[36px] shadow-lg border-4 border-gray-800">
              {/* Phone screen content */}
              <div className="absolute inset-[3px] rounded-[32px] overflow-hidden bg-gradient-to-b from-blue-500 to-purple-600">
                {/* App screenshot/mockup */}
                <Image
                  src="/app-screenshot.png"
                  alt="App Screenshot"
                  width={214}
                  height={434}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.style.display = "none";
                    target.parentElement!.classList.add(
                      "flex",
                      "items-center",
                      "justify-center"
                    );
                    const div = document.createElement("div");
                    div.className = "text-white text-center p-4";
                    div.innerHTML = `
                      <div class="text-2xl font-bold mb-2">Your App</div>
                      <div class="text-sm mb-4">Built with web tech</div>
                      <div class="flex justify-center">
                        <div class="w-12 h-12 rounded-full bg-white/20 mb-2"></div>
                      </div>
                      <div class="grid grid-cols-3 gap-2 mt-4">
                        ${Array(6)
                          .fill(0)
                          .map(
                            () =>
                              `<div class="h-16 rounded-lg bg-white/10"></div>`
                          )
                          .join("")}
                      </div>
                    `;
                    target.parentElement!.appendChild(div);
                  }}
                />

                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-[14px]"></div>
              </div>
            </div>
          </div>

          {/* Text below phone */}
          <div className="bg-black/80 p-4 rounded-lg">
            <p className="text-xl md:text-2xl font-bold text-white">
              git clone ship-fast
            </p>
          </div>
          <p className="mt-4 text-sm text-gray-600 max-w-xs">
            + all the boring stuff (SEO tags, API calls, customer support)
          </p>
        </div>
      </div>

      {/* Tech logos positioned around the ellipse */}
      {tools.map((tool, index) => {
        // Calculate position around the ellipse
        const angle = (index / tools.length) * 2 * Math.PI;
        // Increased radius values to create more space between tools
        const xRadius = 40; // % of container width
        const yRadius = 130; // % of container height

        // Calculate x and y position as percentages
        const xPos = 50 + xRadius * Math.cos(angle);
        const yPos = 50 + yRadius * Math.sin(angle);

        return (
          <div
            key={`${tool.alt}-${index}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${xPos}%`,
              top: `${yPos}%`,
            }}
          >
            <div className="relative">
              <div
                className={`p-3 ${
                  tool.isRectangular ? "w-32 h-20" : "w-24 h-24"
                }`}
              >
                <Image
                  src={tool.src}
                  alt={tool.alt}
                  width={tool.isRectangular ? 120 : 80}
                  height={tool.isRectangular ? 70 : 80}
                  className="w-full h-full object-contain"
                />
                {/* <div className="absolute -bottom-6 left-0 right-0 text-center">
                  <span className="text-xs font-medium">{tool.alt}</span>
                </div> */}
              </div>

              {/* Add bullet points for some tools */}
              {["NextAuth", "Tailwind", "MongoDB", "Stripe"].includes(
                tool.alt
              ) && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 text-xs space-y-1">
                  <p>
                    •{" "}
                    {tool.alt === "NextAuth"
                      ? "Google login"
                      : tool.alt === "Tailwind"
                      ? "components"
                      : tool.alt === "MongoDB"
                      ? "Supabase"
                      : "webhook"}
                  </p>
                  <p>
                    •{" "}
                    {tool.alt === "NextAuth"
                      ? "Magic link"
                      : tool.alt === "Tailwind"
                      ? "animations"
                      : tool.alt === "MongoDB"
                      ? ""
                      : "checkout"}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TechStackShowcase;
