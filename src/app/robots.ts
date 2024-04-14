import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cv', '/uni', '/legal', '/l', '/f'],
    },
    host: 'https://phib.ro/',
    sitemap: 'https://phib.ro/sitemap.xml',
  };
}
