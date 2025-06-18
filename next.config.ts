import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export",

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
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
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,",
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
