import { MetadataRoute } from 'next'
import { STATIC_ANIME_LIST } from '@/lib/constant-anime-list'

const baseUrl = 'https://arzianime.list'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/on-going`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/completed`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/favorite`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  // Add all static anime pages to sitemap with their metadata
  const animeRoutes = STATIC_ANIME_LIST.map((anime) => ({
    url: `${baseUrl}/anime/${anime.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  return [...staticRoutes, ...animeRoutes]
}
