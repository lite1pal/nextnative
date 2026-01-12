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
        destination: "https://testdocs.nextnative.dev/:path*",
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
      {
        source: "/docs/_next/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-CSRF-Token, Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
