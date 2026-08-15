import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

const BASE = 'https://www.prosaria.co.uk'

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes: no lastModified — we have no genuine modification dates.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,             changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE}/work`,         changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/about`,        changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/case-studies`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/sell-supported-living-business`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/insight`,      changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/contact`,      changeFrequency: 'yearly',  priority: 0.8 },
    { url: `${BASE}/privacy`,      changeFrequency: 'yearly',  priority: 0.3 },
  ]

  // Articles: include lastModified only when the post has a genuine, valid date.
  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((p) => {
    const entry: MetadataRoute.Sitemap[number] = {
      url: `${BASE}/insight/${p.slug}`,
      changeFrequency: 'yearly',
      priority: 0.6,
    }
    if (p.date) {
      const d = new Date(p.date)
      if (!isNaN(d.getTime())) entry.lastModified = d
    }
    return entry
  })

  return [...staticRoutes, ...postRoutes]
}
