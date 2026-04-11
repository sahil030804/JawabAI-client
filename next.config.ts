import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Proxy API requests to backend
      {
        source: '/api/:path*',
        destination: 'http://localhost:3120/api/:path*',
      },
    ];
  },
};

export default nextConfig;
