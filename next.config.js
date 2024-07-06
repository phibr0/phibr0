/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['shiki', 'vscode-oniguruma'],
  experimental: {
    taint: true,
    reactCompiler: true,
    turbo: {
      resolveAlias: {
        canvas: './empty-module.ts',
      },
    },
  },
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [{ hostname: 'i.scdn.co' }],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

module.exports = nextConfig;
