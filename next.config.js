/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove console.log in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Optimize CSS - reduce file size
  experimental: {
    optimizeCss: true,
  },

  // Compress output
  compress: true,

  // Production source maps (smaller)
  productionBrowserSourceMaps: false,

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  // Optimize JavaScript bundles
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Better code splitting strategy
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk - all node_modules
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20
          },
          // Common chunk - shared code
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    }
    return config
  },
}

module.exports = nextConfig