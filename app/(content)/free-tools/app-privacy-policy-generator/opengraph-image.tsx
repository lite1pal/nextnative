// app/opengraph-image.tsx (or app/[slug]/opengraph-image.tsx)
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// ── Meta ──────────────────────────────────────────────────────────────────────
export const alt = "NextNative";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ── OG generator ──────────────────────────────────────────────────────────────
export default async function Image() {
  const outfitRegular = await readFile(
    join(process.cwd(), "public/fonts/Outfit-Regular.ttf"),
  );
  const outfitMedium = await readFile(
    join(process.cwd(), "public/fonts/Outfit-Medium.ttf"),
  );

  const title = "App Privacy Policy Generator"!.slice(0, 120);

  const desc = "Generate a privacy policy for your app instantly."!.slice(
    0,
    160,
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          justifyContent: "space-between",
          background: "white",
          backgroundSize: "24px 24px, cover",
          backgroundPosition: "0 0, center",
          flexDirection: "column",
          gap: 22,
          fontFamily: "Outfit",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingTop: 64,
            paddingLeft: 64,
            gap: 16,
          }}
        >
          <svg
            width="52"
            height="52"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: "translateY(2px)" }}
          >
            <path
              d="M11.3711 23.8639L23.6958 11.1566"
              stroke="#06B300"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M6.69141 19.3918L19.0161 6.68448"
              stroke="#06B300"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M2 14.8401L14.3247 2.1328"
              stroke="#06B300"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <p
            style={{
              fontSize: 38,
              fontFamily: "OutfitMedium",
              fontWeight: 500,
            }}
          >
            nextnative
          </p>
        </div>

        {/* Title / Paragraph (mimic hero typography) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 48,
            paddingLeft: 64,
            paddingBottom: 64,
          }}
        >
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.2,
              letterSpacing: -1.2,
              fontWeight: 500,
              color: "#111827",
              fontFamily: "OutfitMedium",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: "#374151",
              maxWidth: 820,
              fontFamily: "OutfitRegular",
            }}
          >
            {desc}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      width: size.width,
      height: size.height,
      fonts: [
        {
          name: "OutfitRegular",
          data: outfitRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "OutfitMedium",
          data: outfitMedium,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
