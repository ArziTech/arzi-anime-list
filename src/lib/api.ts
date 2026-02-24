import { Anime, AnimeListResponse, AnimeParams } from '@/types/anime'

const JIKAN_API_BASE = 'https://api.jikan.moe/v4'

export type { Anime, AnimeListResponse, AnimeParams }

export async function getTopAnime(params: AnimeParams = {}): Promise<AnimeListResponse> {
  const { page = 1, limit = 24 } = params

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

  try {
    const response = await fetch(
      `${JIKAN_API_BASE}/top/anime?page=${page}&limit=${limit}`,
      {
        next: { revalidate: 900 },
        signal: controller.signal,
      }
    )

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error('Failed to fetch top anime')
    }

    return response.json()
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

export async function searchAnime(params: AnimeParams = {}): Promise<AnimeListResponse> {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value))
    }
  })

  const response = await fetch(
    `${JIKAN_API_BASE}/anime?${searchParams.toString()}`,
    { next: { revalidate: 600 } }
  )

  if (!response.ok) {
    throw new Error('Failed to search anime')
  }

  return response.json()
}

export async function getAnimeById(id: number): Promise<Anime> {
  const response = await fetch(
    `${JIKAN_API_BASE}/anime/${id}/full`,
    { next: { revalidate: 3600 } }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch anime details')
  }

  const data = await response.json()
  return data.data
}

export async function getAiringAnime(params: AnimeParams = {}): Promise<AnimeListResponse> {
  const { page = 1, limit = 25 } = params

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000)

  try {
    const response = await fetch(
      `${JIKAN_API_BASE}/top/anime?type=tv&filter=airing&page=${page}&limit=${limit}`,
      {
        next: { revalidate: 600 },
        signal: controller.signal,
      }
    )

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error('Failed to fetch airing anime')
    }

    return response.json()
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

export async function getCompletedAnime(params: AnimeParams = {}): Promise<AnimeListResponse> {
  const { page = 1, limit = 25 } = params

  const response = await fetch(
    `${JIKAN_API_BASE}/top/anime?page=${page}&limit=${limit}`,
    { next: { revalidate: 3600 } }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch completed anime')
  }

  return response.json()
}

export async function getAllAiringAnime(params: AnimeParams = {}): Promise<AnimeListResponse> {
  const { page = 1, limit = 25 } = params

  const response = await fetch(
    `${JIKAN_API_BASE}/top/anime?type=tv&filter=airing&page=${page}&limit=${limit}`,
    { next: { revalidate: 600 } }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch all airing anime')
  }

  return response.json()
}

// Server actions for home page
export async function getFeaturedAiringAnime() {
  const data = await getAiringAnime({ limit: 6 })
  return data.data
    .filter(anime => anime.status === 'Currently Airing' || anime.airing === true)
    .slice(0, 6)
}

export async function getFeaturedCompletedAnime() {
  const data = await getTopAnime({ limit: 25 })
  return data.data
    .filter(anime => anime.status === 'Finished Airing' || anime.airing === false)
    .slice(0, 6)
}
