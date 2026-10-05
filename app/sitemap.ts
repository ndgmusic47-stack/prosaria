import type { MetadataRoute } from 'next'

const BASE = 'https://www.prosaria.co.uk'

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes: no lastModified — we have no genuine modification dates.
  return [
    { url: `${BASE}/`,                  changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE}/what-we-invest-in`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/how-we-work`,       changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/about`,             changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`,           changeFrequency: 'yearly',  priority: 0.8 },
    { url: `${BASE}/privacy`,           changeFrequency: 'yearly',  priority: 0.3 },
  ]
}
