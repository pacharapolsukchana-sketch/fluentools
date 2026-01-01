/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  compress: true,
  productionBrowserSourceMaps: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
}

module.exports = nextConfig