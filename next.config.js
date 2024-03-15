/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: true,
  experimental: {
    ppr: true,
    taint: true,
  },
  compress: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: false,
  },
  images: {
    remotePatterns: [{ hostname: 'i.scdn.co' }],
  },
  rewrites: () => [
    {
      source: '/convert',
      destination: 'https://anki.phib.ro/convert',
    },
  ],
};

module.exports = nextConfig;
