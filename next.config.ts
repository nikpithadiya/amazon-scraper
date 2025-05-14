import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
      remotePatterns: [
          {
            protocol: 'https',
            hostname: 'm.media-amazon.com',
          },
        ],
  },
  serverExternalPackages: [
    "puppeteer-extra",
    "puppeteer-extra-plugin-stealth",
  ],
};

export default nextConfig;
