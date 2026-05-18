import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/js/script.js",
        destination: "https://datafa.st/js/script.js",
      },
      {
        source: "/api/events",
        destination: "https://datafa.st/api/events",
      },

      // Docs
      {
        source: "/docs/:path*",
        destination: "https://testdocs.nextnative.dev/docs/:path*",
      },

      // Playground
      {
        source: "/playground",
        destination: "https://testplayground.nextnative.dev",
      },
      {
        source: "/assets/:path*",
        destination: "https://testplayground.nextnative.dev/assets/:path*",
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/mvp-app-development",
        destination: "/convert-website-to-app",
        permanent: true,
      },
      {
        source: "/blog/web-to-mobile-app",
        destination: "/blog/convert-web-app-to-mobile-app",
        permanent: true,
      },
    ];
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  async headers() {
    return [
      // {
      //   source: "/:path*",
      //   headers: [
      //     {
      //       key: "X-Frame-Options",
      //       value: "DENY",
      //     },
      //     {
      //       key: "X-Content-Type-Options",
      //       value: "nosniff",
      //     },
      //     {
      //       key: "Referrer-Policy",
      //       value: "strict-origin-when-cross-origin",
      //     },
      //     {
      //       key: "Permissions-Policy",
      //       value: "camera=(), microphone=(), geolocation=()",
      //     },
      //     {
      //       key: "Content-Security-Policy",
      //       value:
      //         "default-src 'self'; img-src 'self' https: data:; script-src 'self' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
      //     },
      //   ],
      // },
      {
        source: "/docs/_next/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
