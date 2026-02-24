'use client'

import { useAllAiringAnime } from '@/lib/hooks/useAnime'
import { AnimeHorizontalCard } from '@/components/anime-horizontal-card'
import { AnimeHorizontalSkeleton } from '@/components/anime-horizontal-skeleton'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useState, useMemo } from 'react'

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

export default function OnGoingPage() {
  const { data: animeData, isLoading } = useAllAiringAnime()
  const [selectedDay, setSelectedDay] = useState('all')

  // Filter anime by selected day
  const filteredAnime = useMemo(() => {
    if (!animeData?.data) return []

    if (selectedDay === 'all') {
      return animeData.data
    }

    return animeData.data.filter(
      (anime) => anime.broadcast?.day === selectedDay
    )
  }, [animeData, selectedDay])

  return (
    <main className="">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">On Going Anime</h1>

        {/* Day Filter Tabs */}
        <Tabs value={selectedDay} onValueChange={setSelectedDay} className="mb-8">
          <TabsList variant="default" className="flex-wrap">
            {days.map((day) => (
              <TabsTrigger key={day.value} value={day.value}>
                {day.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Anime List */}
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <AnimeHorizontalSkeleton key={i} />
            ))}
          </div>
        ) : filteredAnime.length === 0 ? (
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
