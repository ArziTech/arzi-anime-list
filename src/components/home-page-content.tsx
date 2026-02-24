'use client'

import { useQuery } from '@tanstack/react-query'
import { AnimeCard } from '@/components/anime-card'
import { AnimeCardSkeleton } from '@/components/anime-skeleton'
import { getFeaturedAiringAnime, getFeaturedCompletedAnime } from '@/lib/api'

export function useFeaturedAiringAnime() {
  return useQuery({
    queryKey: ['anime', 'featured-airing'],
    queryFn: getFeaturedAiringAnime,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useFeaturedCompletedAnime() {
  return useQuery({
    queryKey: ['anime', 'featured-completed'],
    queryFn: getFeaturedCompletedAnime,
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}

interface HomePageContentProps {
  initialAiring: Awaited<ReturnType<typeof getFeaturedAiringAnime>>
  initialCompleted: Awaited<ReturnType<typeof getFeaturedCompletedAnime>>
}

export function HomePageContent({ initialAiring, initialCompleted }: HomePageContentProps) {
  const { data: airingAnime } = useFeaturedAiringAnime()
  const { data: completedAnime } = useFeaturedCompletedAnime()

  return (
    <>
      {/* Featured On Going */}
      <section className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured On Going</h2>
          <a href="/on-going" className="inline-flex items justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            View All
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {(airingAnime || initialAiring).map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      </section>

      {/* Featured Completed */}
      <section className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Completed</h2>
          <a href="/completed" className="inline-flex items justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            View All
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {(completedAnime || initialCompleted).map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      </section>
    </>
  )
}
