import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Thumbnail uploads go through server actions (default limit is 1 MB).
    serverActions: { bodySizeLimit: "6mb" },
  },
  async redirects() {
    // Old mock pages from the first version of the site.
    return [
      { source: "/order", destination: "/contact", permanent: false },
      { source: "/dashboard", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
