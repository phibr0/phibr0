import { withContentlayer } from 'next-contentlayer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  swcMinify: true,
  compiler: {
    removeConsole: true,
  },
  compress: true,
  poweredByHeader: false,
  optimizeFonts: true,
  images: {
    domains: ['i.scdn.co'],
  },
  rewrites: async () => [
    {
      source: '/b',
      destination: '/blog',
    },
    {
      source: '/b/:slug',
      destination: '/blog/:slug',
    },
  ],
};

export default withContentlayer(nextConfig);
