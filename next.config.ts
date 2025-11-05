import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dqxoiudeespmrocafyip.supabase.co',
        pathname: '/storage/v1/object/public/events/**',
      },
    ],
  },
}

export default nextConfig
