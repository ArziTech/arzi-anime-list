'use client'

import { useQuery } from '@tanstack/react-query'
import { AnimeHorizontalCard } from '@/components/anime-horizontal-card'
import { AnimeHorizontalSkeleton } from '@/components/anime-horizontal-skeleton'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Anime } from '@/types/anime'
import { useState, useEffect } from 'react'

interface OnGoingPageContentProps {
  initialAnime: Anime[]
  initialDay: string
}

const days = [
  { value: 'all', label: 'All' },
  { value: 'Mondays', label: 'Mon' },
  { value: 'Tuesdays', label: 'Tue' },
  { value: 'Wednesdays', label: 'Wed' },
  { value: 'Thursdays', label: 'Thu' },
  { value: 'Fridays', label: 'Fri' },
  { value: 'Saturdays', label: 'Sat' },
  { value: 'Sundays', label: 'Sun' },
] as const

export function OnGoingPageContent({ initialAnime, initialDay }: OnGoingPageContentProps) {
  const [selectedDay, setSelectedDay] = useState(initialDay)

  const { data: allAnime = initialAnime, isLoading } = useQuery({
    queryKey: ['anime', 'airing'],
    queryFn: async () => {
      const response = await fetch('/api/airing-anime')
      if (!response.ok) throw new Error('Failed to fetch airing anime')
      return response.json() as Promise<Anime[]>
    },
    initialData: initialAnime,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })

  // Update URL without page refresh when day changes
  const handleDayChange = (day: string) => {
    setSelectedDay(day)
    const url = new URL(window.location.href)
    url.searchParams.set('day', day)
    window.history.replaceState({}, '', url.toString())
  }

  // Filter anime by selected day
  const filteredAnime = selectedDay === 'all'
    ? allAnime
    : allAnime.filter((anime: Anime) => anime.broadcast?.day === selectedDay)

  if (isLoading && !allAnime.length) {
    return (
      <main>
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6">On Going Anime</h1>
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <AnimeHorizontalSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">On Going Anime</h1>

        {/* Day Filter Tabs */}
        <Tabs value={selectedDay} onValueChange={handleDayChange} className="mb-8">
          <TabsList variant="default" className="flex-wrap">
            {days.map((d) => (
              <TabsTrigger key={d.value} value={d.value}>
                {d.label}
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
