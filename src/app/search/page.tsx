'use client'

import { useState, Suspense } from 'react'
import { useAnimeSearch } from '@/lib/hooks/useAnime'
import { AnimeCard } from '@/components/anime-card'
import { AnimeCardSkeleton } from '@/components/anime-skeleton'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search as SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

function SearchContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [searchTerm, setSearchTerm] = useState(initialQuery)

  const { data: searchResults, isLoading } = useAnimeSearch({
    q: searchTerm,
    limit: 24,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setSearchTerm(query)
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Search Anime</h1>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for anime..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      {/* Search Results */}
      {searchTerm && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {isLoading
              ? 'Searching...'
              : `Results for "${searchTerm}" (${searchResults?.data?.length || 0})`}
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <AnimeCardSkeleton key={i} />
              ))}
            </div>
          ) : searchResults?.data && searchResults.data.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {searchResults.data.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No results found for "{searchTerm}"</p>
              <p className="text-sm mt-2">Try different keywords or check your spelling</p>
            </div>
          )}
        </div>
      )}

      {/* Initial State */}
      {!searchTerm && (
        <div className="text-center py-12 text-muted-foreground">
          <SearchIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Enter an anime title to search</p>
          <p className="text-sm mt-2">
            Search through thousands of anime titles from MyAnimeList
          </p>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <main className="">
      <Suspense fallback={
        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <AnimeCardSkeleton key={i} />
            ))}
          </div>
        </div>
      }>
        <SearchContent />
      </Suspense>
    </main>
  )
}
