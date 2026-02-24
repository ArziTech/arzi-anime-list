import { getTopAnime } from '@/lib/api'
import { AnimeHorizontalCard } from '@/components/anime-horizontal-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Revalidate every hour (3600 seconds)
export const revalidate = 3600

async function getCompletedAnimeData() {
  // Fetch multiple pages
  const pages = await Promise.all([
    getTopAnime({ limit: 25, page: 1 }),
    getTopAnime({ limit: 25, page: 2 }),
    getTopAnime({ limit: 25, page: 3 }),
    getTopAnime({ limit: 25, page: 4 }),
  ])

  return pages
    .flatMap(p => p.data)
    .filter(anime => anime.status === 'Finished Airing' || anime.airing === false)
}

interface CompletedPageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function CompletedPage({ searchParams }: CompletedPageProps) {
  const { page: pageParam = '1' } = await searchParams
  const page = parseInt(pageParam)
  const pageSize = 25

  const allAnime = await getCompletedAnimeData()
  const totalPages = Math.ceil(allAnime.length / pageSize)

  // Get current page data
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentPageAnime = allAnime.slice(startIndex, endIndex)

  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

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
            <Link href={`/completed?page=${page - 1}`}>
              <Button variant="outline">Previous</Button>
            </Link>
          )}

          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>

          {hasNextPage && (
            <Link href={`/completed?page=${page + 1}`}>
              <Button>Next</Button>
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}
