import { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.matrixmobiletyresandautos.com';

const AREA_SLUGS = [
  'coventry', 'bedworth', 'kenilworth', 'meriden', 'nuneaton',
  'solihull', 'coleshill', 'warwick', 'leamington-spa', 'rugby',
  'hinckley', 'lutterworth', 'atherstone', 'sutton-coldfield', 'tamworth',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                          lastModified: new Date(), changeFrequency: 'weekly',  priority: 1    },
    { url: `${BASE}/tyres`,               lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9  },
    { url: `${BASE}/emergency-tyre-fitting`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/booking`,             lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9  },
    { url: `${BASE}/areas`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    ...AREA_SLUGS.map(slug => ({
      url: `${BASE}/areas/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    { url: `${BASE}/shop`,                lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/tpms`,                lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8  },
    ...['puncture-repair', 'run-flat-tyres', 'van-4x4-tyres', 'locking-wheel-nut-removal', 'part-worn-tyres', 'fleet-tyres', 'jump-start'].map(slug => ({
      url: `${BASE}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${BASE}/batteries`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/about`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6  },
    { url: `${BASE}/contact`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6  },
  ];
}
