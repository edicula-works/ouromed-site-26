import type { MetadataRoute } from 'next';
import { services, site } from '@/data/site';

// Saída estática: o Next exige a marcação explícita em output: 'export'.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ['/', ...services.map((s) => `/${s.slug}`), '/sobre', '/contato'].map((path) => ({
    url: `${site.url}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }));
}
