import { Anime, AnimeListResponse, AnimeParams } from '@/types/anime'

const JIKAN_API_BASE = 'https://api.jikan.moe/v4'

export type { AnimeParams }

export async function getTopAnime(params: AnimeParams = {}): Promise<AnimeListResponse> {
  const { page = 1, limit = 24 } = params

  const response = await fetch(
    `${JIKAN_API_BASE}/top/anime?page=${page}&limit=${limit}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch top anime')
  }

  return response.json()
}

export async function searchAnime(params: AnimeParams = {}): Promise<AnimeListResponse> {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value))
    }
  })

  const response = await fetch(`${JIKAN_API_BASE}/anime?${searchParams.toString()}`)

  if (!response.ok) {
    throw new Error('Failed to search anime')
  }

  return response.json()
}

export async function getAnimeById(id: number): Promise<Anime> {
  const response = await fetch(`${JIKAN_API_BASE}/anime/${id}/full`)

  if (!response.ok) {
    throw new Error('Failed to fetch anime details')
  }

  const data = await response.json()
  return data.data
}

export async function getAiringAnime(params: AnimeParams = {}): Promise<AnimeListResponse> {
  const { page = 1, limit = 25 } = params

  const response = await fetch(
    `${JIKAN_API_BASE}/top/anime?type=tv&filter=airing&page=${page}&limit=${limit}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch airing anime')
  }

  return response.json()
}

export async function getCompletedAnime(params: AnimeParams = {}): Promise<AnimeListResponse> {
  const { page = 1, limit = 25 } = params

  // Use top anime endpoint ordered by score (mostly completed shows)
  const response = await fetch(
    `${JIKAN_API_BASE}/top/anime?page=${page}&limit=${limit}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch completed anime')
  }

  return response.json()
}

// Get all airing anime for client-side filtering by day
export async function getAllAiringAnime(params: AnimeParams = {}): Promise<AnimeListResponse> {
  const { page = 1, limit = 25 } = params

  const response = await fetch(
    `${JIKAN_API_BASE}/top/anime?type=tv&filter=airing&page=${page}&limit=${limit}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch all airing anime')
  }

  return response.json()
}
