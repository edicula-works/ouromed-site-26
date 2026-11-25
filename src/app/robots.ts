import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

// Saída estática: o Next exige a marcação explícita em output: 'export'.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
