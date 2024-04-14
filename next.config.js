/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: true,
  experimental: {
    ppr: true,
    taint: true,
    serverComponentsExternalPackages: ['shiki', 'vscode-oniguruma'],
    esmExternals: 'loose',
  },
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [{ hostname: 'i.scdn.co' }],
  },
};

module.exports = nextConfig;
