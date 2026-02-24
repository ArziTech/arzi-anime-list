'use client'

import { useQuery } from '@tanstack/react-query'
import { AnimeHorizontalCard } from '@/components/anime-horizontal-card'
import { Button } from '@/components/ui/button'
import { Anime } from '@/types/anime'
import { useState, useEffect } from 'react'

interface CompletedPageContentProps {
  initialAnime: Anime[]
  initialPage: number
}

const pageSize = 25

export function CompletedPageContent({ initialAnime, initialPage }: CompletedPageContentProps) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const { data: allAnime = initialAnime, isLoading } = useQuery({
    queryKey: ['anime', 'completed'],
    queryFn: async () => {
      const response = await fetch('/api/completed-anime')
      if (!response.ok) throw new Error('Failed to fetch completed anime')
      return response.json() as Promise<Anime[]>
    },
    initialData: initialAnime,
    staleTime: 60 * 60 * 1000, // 1 hour
  })

  const totalPages = Math.ceil(allAnime.length / pageSize)

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentPageAnime = allAnime.slice(startIndex, endIndex)

  const hasNextPage = currentPage < totalPages
  const hasPrevPage = currentPage > 1

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    const url = new URL(window.location.href)
    url.searchParams.set('page', newPage.toString())
    window.history.replaceState({}, '', url.toString())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isLoading && !allAnime.length) {
    return (
      <main>
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-8">Completed Anime</h1>
          <div className="space-y-4" />
        </div>
      </main>
    )
  }

  return (
    <main>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Completed Anime</h1>

        <div className="space-y-4">
          {currentPageAnime.map((anime) => (
            <AnimeHorizontalCard key={anime.mal_id} anime={anime} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-8">
          {hasPrevPage && (
            <Button variant="outline" onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </Button>
          )}

          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>

          {hasNextPage && (
            <Button onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </Button>
          )}
        </div>
      </div>
    </main>
  )
}
