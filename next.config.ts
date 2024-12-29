import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/3dui',
  assetPrefix: '/3dui',
};

export default nextConfig;
