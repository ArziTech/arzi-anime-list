import { getAiringAnime } from '@/lib/api'
import { AnimeHorizontalCard } from '@/components/anime-horizontal-card'
import { AnimeHorizontalSkeleton } from '@/components/anime-horizontal-skeleton'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

// Revalidate every 10 minutes (600 seconds) since airing anime changes frequently
export const revalidate = 600

const days = [
  { value: 'all', label: 'All' },
  { value: 'Mondays', label: 'Mon' },
  { value: 'Tuesdays', label: 'Tue' },
  { value: 'Wednesdays', label: 'Wed' },
  { value: 'Thursdays', label: 'Thu' },
  { value: 'Fridays', label: 'Fri' },
  { value: 'Saturdays', label: 'Sat' },
  { value: 'Sundays', label: 'Sun' },
]

async function getAiringAnimeData() {
  // Fetch multiple pages to get more anime
  const pages = await Promise.all([
    getAiringAnime({ limit: 25, page: 1 }),
    getAiringAnime({ limit: 25, page: 2 }),
    getAiringAnime({ limit: 25, page: 3 }),
  ])

  return pages.flatMap(p => p.data)
}

interface OnGoingPageProps {
  searchParams: Promise<{ day?: string }>
}

export default async function OnGoingPage({ searchParams }: OnGoingPageProps) {
  const { day = 'all' } = await searchParams
  const allAnime = await getAiringAnimeData()

  // Filter anime by selected day
  const filteredAnime = day === 'all'
    ? allAnime
    : allAnime.filter(anime => anime.broadcast?.day === day)

  return (
    <main>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">On Going Anime</h1>

        {/* Day Filter Tabs */}
        <Tabs defaultValue={day} className="mb-8">
          <TabsList variant="default" className="flex-wrap">
            {days.map((d) => (
              <TabsTrigger key={d.value} value={d.value} asChild>
                <Link href={`/on-going?day=${d.value}`}>
                  {d.label}
                </Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Anime List */}
        {filteredAnime.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No anime found for this day.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAnime.map((anime) => (
              <AnimeHorizontalCard key={anime.mal_id} anime={anime} showReleaseDay />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
