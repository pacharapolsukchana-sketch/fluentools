/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove console.log in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Compress output
  compress: true,

  // Disable source maps in production
  productionBrowserSourceMaps: false,

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
}

module.exports = nextConfig