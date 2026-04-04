import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // productionBrowserSourceMaps: false,
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/static/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/static/uploads/**",
      },
      {
        protocol: "http",
        hostname: "developer.cribe.org",
        port: "",
        pathname: "/static/uploads/**",
      },
      // {
      //   protocol: "http",
      //   hostname: "localhost",
      //   port: "5000",
      //   pathname: "/**",
      // },
    ],
  },
};

export default nextConfig;
