import { getTopAnime } from '@/lib/api'
import { CompletedPageContent } from '@/components/completed-page-content'
import { QueryClient } from '@tanstack/react-query'
import { dehydrate } from '@tanstack/react-query'
import { HydrationBoundary } from '@tanstack/react-query'

// Revalidate every hour
export const revalidate = 3600

interface CompletedPageProps {
  searchParams: Promise<{ page?: string }>
}

async function getCompletedAnimeData() {
  try {
    // Fetch multiple pages with error handling
    const pages = await Promise.allSettled([
      getTopAnime({ limit: 25, page: 1 }),
      getTopAnime({ limit: 25, page: 2 }),
      getTopAnime({ limit: 25, page: 3 }),
      getTopAnime({ limit: 25, page: 4 }),
    ])

    return pages
      .filter((p): p is PromiseFulfilledResult<Awaited<ReturnType<typeof getTopAnime>>> => p.status === 'fulfilled')
      .flatMap(p => p.value.data)
      .filter(anime => anime.status === 'Finished Airing' || anime.airing === false)
  } catch (error) {
    console.error('Error fetching completed anime:', error)
    return []
  }
}

export default async function CompletedPage({ searchParams }: CompletedPageProps) {
  const { page: pageParam = '1' } = await searchParams
  const initialPage = parseInt(pageParam)

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 60 * 1000, // 1 hour
      },
    },
  })

  // Fetch data server-side for initial render
  const initialAnime = await getCompletedAnimeData()

  // Prefetch query for client-side
  await queryClient.prefetchQuery({
    queryKey: ['anime', 'completed'],
    queryFn: async () => {
      const pages = await Promise.allSettled([
        getTopAnime({ limit: 25, page: 1 }),
        getTopAnime({ limit: 25, page: 2 }),
        getTopAnime({ limit: 25, page: 3 }),
        getTopAnime({ limit: 25, page: 4 }),
      ])
      return pages
        .filter((p): p is PromiseFulfilledResult<Awaited<ReturnType<typeof getTopAnime>>> => p.status === 'fulfilled')
        .flatMap(p => p.value.data)
        .filter(anime => anime.status === 'Finished Airing' || anime.airing === false)
    },
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <CompletedPageContent initialAnime={initialAnime} initialPage={initialPage} />
    </HydrationBoundary>
  )
}
