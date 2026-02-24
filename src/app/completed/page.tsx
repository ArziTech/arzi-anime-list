'use client'

import { useCompletedAnime } from '@/lib/hooks/useAnime'
import { AnimeHorizontalCard } from '@/components/anime-horizontal-card'
import { AnimeHorizontalSkeleton } from '@/components/anime-horizontal-skeleton'
import { Button } from '@/components/ui/button'
import { useMemo } from 'react'

export default function CompletedPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useCompletedAnime({ limit: 25 })

  // Filter only completed anime
  const filteredData = useMemo(() => {
    if (!data) return { pages: [] }
    return {
      pages: data.pages.map(page => ({
        ...page,
        data: page.data.filter(anime => anime.status === 'Finished Airing' || anime.airing === false)
      }))
    }
  }, [data])

  return (
    <main className="">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Completed Anime</h1>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <AnimeHorizontalSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredData?.pages.map((page) =>
              page.data.map((anime) => (
                <AnimeHorizontalCard key={anime.mal_id} anime={anime} />
              ))
            )}
          </div>
        )}

        {hasNextPage && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? 'Loading...' : 'Load More'}
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
