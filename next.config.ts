import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    // Powers the thumbnail → hero morph when opening a case study.
    viewTransition: true,
  },
  trailingSlash: true,
  images: {
    // Project screenshots are hosted on ImageKit (carried over from v3).
     unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "ik.imagekit.io" }],
    // AVIF first — UI screenshots compress far better than WebP. Next falls
    // back to WebP automatically for browsers that don't accept AVIF.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
