import { getFeaturedAiringAnime, getFeaturedCompletedAnime } from '@/lib/api'
import { HomePageContent } from '@/components/home-page-content'
import { QueryClient } from '@tanstack/react-query'
import { dehydrate } from '@tanstack/react-query'

// Revalidate every 15 minutes
export const revalidate = 900

export default async function HomePage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })

  // Fetch data server-side for initial render
  const [initialAiring, initialCompleted] = await Promise.all([
    getFeaturedAiringAnime(),
    getFeaturedCompletedAnime(),
  ])

  // Prefetch queries for client-side
  await queryClient.prefetchQuery({
    queryKey: ['anime', 'featured-airing'],
    queryFn: getFeaturedAiringAnime,
  })
  await queryClient.prefetchQuery({
    queryKey: ['anime', 'featured-completed'],
    queryFn: getFeaturedCompletedAnime,
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <>
      {/* Hero Section */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto py-12 md:py-20 px-4">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Arzi Anime List
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Discover your next favorite anime. Browse through thousands of titles, from classic masterpieces to the latest releases.
          </p>
        </div>
      </section>

      {/* Client Component with TanStack Query */}
      <HomePageContent
        initialAiring={initialAiring}
        initialCompleted={initialCompleted}
      />
    </>
  )
}
