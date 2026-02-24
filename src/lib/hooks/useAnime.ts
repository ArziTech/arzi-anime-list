'use client'

import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { getTopAnime, searchAnime, getAnimeById, getAiringAnime, getCompletedAnime, getAllAiringAnime, AnimeParams } from '@/lib/api'
import { Anime } from '@/types/anime'

export function useTopAnime(params: AnimeParams = {}) {
  return useQuery({
    queryKey: ['anime', 'top', params],
    queryFn: () => getTopAnime(params),
  })
}

export function useInfiniteAnime(params: AnimeParams = {}) {
  return useInfiniteQuery({
    queryKey: ['anime', 'infinite', params],
    queryFn: ({ pageParam = 1 }) => getTopAnime({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.has_next_page) {
        return lastPage.pagination.current_page + 1
      }
      return undefined
    },
  })
}

export function useAnimeSearch(params: AnimeParams) {
  return useQuery({
    queryKey: ['anime', 'search', params],
    queryFn: () => searchAnime(params),
    enabled: !!params.q, // Only run when there's a search query
  })
}

export function useAnime(id: number) {
  return useQuery({
    queryKey: ['anime', id],
    queryFn: () => getAnimeById(id),
    enabled: !!id,
  })
}

export function useAiringAnime(params: AnimeParams = {}) {
  return useInfiniteQuery({
    queryKey: ['anime', 'airing', params],
    queryFn: ({ pageParam = 1 }) => getAiringAnime({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.has_next_page) {
        return lastPage.pagination.current_page + 1
      }
      return undefined
    },
  })
}

export function useCompletedAnime(params: AnimeParams = {}) {
  return useInfiniteQuery({
    queryKey: ['anime', 'completed', params],
    queryFn: ({ pageParam = 1 }) => getCompletedAnime({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.has_next_page) {
        return lastPage.pagination.current_page + 1
      }
      return undefined
    },
  })
}

export function useAllAiringAnime() {
  return useQuery({
    queryKey: ['anime', 'all-airing'],
    queryFn: () => getAllAiringAnime({ limit: 25 }),
  })
}
