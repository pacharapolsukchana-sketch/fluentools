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

  // Force HTTPS redirect
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://fluentools.com/:path*',
        permanent: true,
      },
    ];
  },

  // Security headers for HTTPS
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Remove legacy polyfills
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Use SWC minifier (faster and removes polyfills)
  swcMinify: true,
}

module.exports = nextConfig
