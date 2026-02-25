import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getStaticAnimeParams, getStaticAnimeById } from '@/lib/constant-anime-list'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface AnimeDetailPageProps {
  params: Promise<{ id: string }>
}

// Generate metadata for SEO using static anime data
export async function generateMetadata({ params }: AnimeDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const staticAnime = getStaticAnimeById(parseInt(id))

  if (!staticAnime) {
    return {
      title: 'Anime Not Found - Arzi Anime List',
      description: 'The requested anime could not be found.',
    }
  }

  const genresText = staticAnime.genres.join(', ')
  const statusText = staticAnime.status === 'Currently Airing' ? 'Now Airing' : staticAnime.status
  const yearText = staticAnime.year ? `${staticAnime.year} Anime` : 'Anime'

  return {
    title: `${staticAnime.title} - ${yearText} | Arzi Anime List`,
    description: `Watch ${staticAnime.title}, a ${staticAnime.type} ${statusText} ${genresText} anime. Complete information about episodes, release date, and more.`,
    keywords: [
      staticAnime.title,
      ...staticAnime.genres,
      statusText,
      yearText,
      'anime',
      'watch anime',
      'anime streaming',
      staticAnime.slug,
    ].join(', '),
    openGraph: {
      title: staticAnime.title,
      description: `Discover ${staticAnime.title}, a ${staticAnime.type} ${genresText} anime that is ${statusText.toLowerCase()}.`,
      type: 'website',
      url: `https://arzianime.list/anime/${staticAnime.id}`,
      siteName: 'Arzi Anime List',
    },
    twitter: {
      card: 'summary_large_image',
      title: staticAnime.title,
      description: `${statusText} ${genresText} anime - ${staticAnime.title}`,
    },
    alternates: {
      canonical: `https://arzianime.list/anime/${staticAnime.id}`,
    },
  }
}

// Generate static params for popular anime
// Pre-renders known popular anime at build time
export async function generateStaticParams() {
  return getStaticAnimeParams()
}

// Revalidate every hour - enables ISR for on-demand generation
export const revalidate = 3600

// Global request tracker to add delays during build
let requestCount = 0
const BUILD_DELAY = 2000 // 2 seconds between requests during build

async function getAnime(id: string) {
  // Add delay during build to avoid rate limiting
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-build') {
    await new Promise(resolve => setTimeout(resolve, BUILD_DELAY))
  }

  // Retry function for fetch with longer delays
  async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
    for (let i = 0; i < retries; i++) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

        const response = await fetch(url, {
          next: { revalidate: 3600 },
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (response.ok || response.status === 404) {
          return response
        }

        // Rate limited (429) - wait longer before retry
        if (response.status === 429) {
          const waitTime = 5000 + (i * 5000) // 5s, 10s, 15s
          console.log(`Rate limited, waiting ${waitTime}ms before retry...`)
          await new Promise(resolve => setTimeout(resolve, waitTime))
          continue
        }

        if (i === retries - 1) {
          return response
        }
      } catch (error) {
        if (i === retries - 1) {
          throw error
        }
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 2000))
      }
    }
    throw new Error('Max retries reached')
  }

  try {
    const response = await fetchWithRetry(`https://api.jikan.moe/v4/anime/${id}/full`, 3)

    if (!response.ok) {
      console.error(`Failed to fetch anime ${id}: ${response.status}`)
      return null
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error(`Error fetching anime ${id}:`, error)
    return null
  }
}

interface AnimeDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function AnimeDetailPage({ params }: AnimeDetailPageProps) {
  const { id } = await params
  const anime = await getAnime(id)

  if (!anime) {
    notFound()
  }

  return (
    <main>
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
              {anime.genres.map((genre: { mal_id: number; name: string }) => (
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
                <p className="font-medium text-xs">{anime.studios.map((s: { name: string }) => s.name).join(', ') || '-'}</p>
              </div>
            </div>

            {/* Synopsis */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Synopsis</h2>
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
