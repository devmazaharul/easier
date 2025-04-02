import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true, // No optimization, but will allow ALL images
  },
};

export default nextConfig;
