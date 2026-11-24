import type { MetadataRoute } from 'next';
import { audiencePages, site } from '@/data/site';

// Saída estática: o Next exige a marcação explícita em output: 'export'.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = ['/', audiencePages.voce.path, audiencePages.empresa.path, '/sobre', '/contato'];
  return paths.map((path) => ({
    url: `${site.url}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }));
}
