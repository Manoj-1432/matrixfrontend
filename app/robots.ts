import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/', '/account', '/account/', '/api/'],
    },
    sitemap: 'https://www.matrixmobiletyresandautos.com/sitemap.xml',
  };
}
