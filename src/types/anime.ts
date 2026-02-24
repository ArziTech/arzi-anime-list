// Jikan API Response Types
export interface Anime {
  mal_id: number
  title: string
  title_japanese: string
  images: {
    jpg: {
      image_url: string
      large_image_url: string
    }
    webp: {
      image_url: string
      large_image_url: string
    }
  }
  synopsis: string
  score: number
  rank: number
  popularity: number
  episodes: number
  status: string
  airing: boolean
  type: string
  genres: Array<{
    mal_id: number
    name: string
  }>
  source: string
  studios: Array<{
    mal_id: number
    name: string
  }>
  broadcast?: {
    day: string
    time: string
    timezone: string
    string: string
  }
}

export interface AnimeListResponse {
  pagination: {
    current_page: number
    has_next_page: boolean
    items: {
      count: number
      total: number
      per_page: number
    }
  }
  data: Anime[]
}

export interface AnimeParams {
  page?: number
  limit?: number
  q?: string
  type?: string
  status?: string
  rating?: string
  order_by?: 'title' | 'score' | 'popularity' | 'rank'
  sort?: 'asc' | 'desc'
}
