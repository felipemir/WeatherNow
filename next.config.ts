import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openweathermap.org",
        pathname: "/img/wn/**",
      },
    ],
  },
  allowedDevOrigins: [
    "localhost:3000",
    "127.0.0.1:3000",
    "0.0.0.0:3000",
  ],
};

export default nextConfig;
