'use client'

import { useAnime } from '@/lib/hooks/useAnime'
import { AnimeCardSkeleton } from '@/components/anime-skeleton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { use } from 'react'

export default function AnimeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data: anime, isLoading } = useAnime(Number(id))

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimeCardSkeleton />
        </div>
      </main>
    )
  }

  if (!anime) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Anime not found</h1>
          <Link href="/">
            <Button className="mt-4">Back to Home</Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="">
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-10 items-start">
          {/* Poster - Sticky */}
          <div className="lg:sticky lg:top-20 order-2 lg:order-1">
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                fill
                sizes="(max-width: 768px) 100vw, 280px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6 pt-12 lg:pt-0 order-1 lg:order-2">
            {/* Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{anime.title}</h1>
              {anime.title_japanese && (
                <p className="text-muted-foreground mt-2">{anime.title_japanese}</p>
              )}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-primary px-2.5 py-1">★ {anime.score}</Badge>
              <Badge variant="secondary" className="px-2.5 py-1">Rank #{anime.rank}</Badge>
              <Badge variant="outline" className="px-2.5 py-1">Popularity #{anime.popularity}</Badge>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-1.5">
              {anime.genres.map((genre) => (
                <Badge key={genre.mal_id} variant="secondary" className="text-xs">
                  {genre.name}
                </Badge>
              ))}
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 text-sm">
              <div>
                <span className="text-muted-foreground text-xs">Episodes</span>
                <p className="font-medium">{anime.episodes || '?'}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-xs">Status</span>
                <p className="font-medium">{anime.status}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-xs">Source</span>
                <p className="font-medium">{anime.source}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-xs">Studios</span>
                <p className="font-medium text-xs">{anime.studios.map((s) => s.name).join(', ') || '-'}</p>
              </div>
            </div>

            {/* Synopsis */}
            <div>
              <h2 className="text-lg  font-semibold mb-2">Synopsis</h2>
              <p className="text-muted-foreground text-justify leading-relaxed text-sm">
                {anime.synopsis || 'No synopsis available.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
