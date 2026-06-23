import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_URL || 'http://localhost:3120';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Proxy API requests to backend
      {
        source: '/auth/:path*',
        destination: `${backendUrl}/auth/:path*`,
      },
      {
        source: '/meta/:path*',
        destination: `${backendUrl}/meta/:path*`,
      },
      {
        source: '/knowledge-base/:path*',
        destination: `${backendUrl}/knowledge-base/:path*`,
      },
      {
        source: '/conversations/:path*',
        destination: `${backendUrl}/conversations/:path*`,
      },
      {
        source: '/health-check',
        destination: `${backendUrl}/health-check`,
      },
      {
        source: '/user/:path*',
        destination: `${backendUrl}/user/:path*`,
      },
    ];
  },
};

export default nextConfig;
