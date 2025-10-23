/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/events/**',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          { type: 'host', value: 'eth-bc-portal-htg.pages.dev' },
        ],
        destination: 'https://eth-blockchain.org/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
