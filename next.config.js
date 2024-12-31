/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  
  images: {
    unoptimized: true,
  },

  // 禁用 x-powered-by header
  poweredByHeader: false,

  // 禁用跟踪
  generateBuildId: () => 'build',
  experimental: {
    instrumentationHook: false
  }
}

module.exports = nextConfig 