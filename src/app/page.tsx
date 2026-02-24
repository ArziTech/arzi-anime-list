import { getTopAnime, getAiringAnime } from '@/lib/api'
import { AnimeCard } from '@/components/anime-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Revalidate every 15 minutes (900 seconds)
export const revalidate = 900

async function getFeaturedAnime() {
  // Fetch data in parallel
  const [airingData, topData] = await Promise.all([
    getAiringAnime({ limit: 6 }),
    getTopAnime({ limit: 25 }),
  ])

  // Filter for on-going (currently airing)
  const airingAnime = airingData.data
    .filter(anime => anime.status === 'Currently Airing' || anime.airing === true)
    .slice(0, 6)

  // Filter for completed (finished airing)
  const completedAnime = topData.data
    .filter(anime => anime.status === 'Finished Airing' || anime.airing === false)
    .slice(0, 6)

  return { airingAnime, completedAnime }
}

export default async function HomePage() {
  const { airingAnime, completedAnime } = await getFeaturedAnime()

  return (
    <main>
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

      {/* Featured On Going */}
      <section className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured On Going</h2>
          <Link href="/on-going">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {airingAnime.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      </section>

      {/* Featured Completed */}
      <section className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Completed</h2>
          <Link href="/completed">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {completedAnime.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      </section>
    </main>
  )
}
