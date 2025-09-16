import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.odpt.org/api/v4/:path*", // プロキシ先のURL
      },
    ]
  },
}

export default nextConfig
