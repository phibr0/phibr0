/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: true,
  experimental: {
    taint: true,
    serverComponentsExternalPackages: ['shiki', 'vscode-oniguruma'],
  },
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [{ hostname: 'i.scdn.co' }],
  },
};

module.exports = nextConfig;
