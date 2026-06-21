import { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://matrixmobiletyres.co.uk';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin/', '/account/', '/checkout/'] },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
