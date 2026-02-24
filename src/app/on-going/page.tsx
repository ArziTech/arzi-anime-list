import { getAiringAnime } from '@/lib/api'
import { OnGoingPageContent } from '@/components/on-going-page-content'
import { QueryClient } from '@tanstack/react-query'
import { dehydrate } from '@tanstack/react-query'
import { HydrationBoundary } from '@tanstack/react-query'

// Revalidate every 10 minutes
export const revalidate = 600

interface OnGoingPageProps {
  searchParams: Promise<{ day?: string }>
}

async function getAiringAnimeData() {
  try {
    // Fetch multiple pages with error handling
    const pages = await Promise.allSettled([
      getAiringAnime({ limit: 25, page: 1 }),
      getAiringAnime({ limit: 25, page: 2 }),
      getAiringAnime({ limit: 25, page: 3 }),
    ])

    return pages
      .filter((p): p is PromiseFulfilledResult<Awaited<ReturnType<typeof getAiringAnime>>> => p.status === 'fulfilled')
      .flatMap(p => p.value.data)
  } catch (error) {
    console.error('Error fetching airing anime:', error)
    return []
  }
}

export default async function OnGoingPage({ searchParams }: OnGoingPageProps) {
  const { day = 'all' } = await searchParams

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10 * 60 * 1000, // 10 minutes
      },
    },
  })

  // Fetch data server-side for initial render
  const initialAnime = await getAiringAnimeData()

  // Prefetch query for client-side
  await queryClient.prefetchQuery({
    queryKey: ['anime', 'airing'],
    queryFn: async () => {
      const pages = await Promise.allSettled([
        getAiringAnime({ limit: 25, page: 1 }),
        getAiringAnime({ limit: 25, page: 2 }),
        getAiringAnime({ limit: 25, page: 3 }),
      ])
      return pages
        .filter((p): p is PromiseFulfilledResult<Awaited<ReturnType<typeof getAiringAnime>>> => p.status === 'fulfilled')
        .flatMap(p => p.value.data)
    },
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <OnGoingPageContent initialAnime={initialAnime} initialDay={day} />
    </HydrationBoundary>
  )
}
