import Link from 'next/link'
import Image from 'next/image'
import { Anime } from '@/types/anime'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface AnimeHorizontalCardProps {
  anime: Anime
  showReleaseDay?: boolean
}

const dayMap: Record<string, string> = {
  'Mondays': 'Mon',
  'Tuesdays': 'Tue',
  'Wednesdays': 'Wed',
  'Thursdays': 'Thu',
  'Fridays': 'Fri',
  'Saturdays': 'Sat',
  'Sundays': 'Sun',
}

export function AnimeHorizontalCard({ anime, showReleaseDay = false }: AnimeHorizontalCardProps) {
  const releaseDay = anime.broadcast?.day ? dayMap[anime.broadcast.day] || anime.broadcast.day : null

  return (
    <Link href={`/anime/${anime.mal_id}`} className="block">
      <Card className="group overflow-hidden transition-all hover:shadow-lg hover:scale-[1.01]">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* Poster */}
            <div className="relative w-16 sm:w-20 flex-shrink-0 aspect-[3/4] rounded-lg overflow-hidden bg-muted">
              <Image
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                fill
                sizes="80px"
                className="object-cover"
              />

            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 space-y-2">
              <div className='w-full flex justify-between items-center'>
                <h3 className="font-semibold line-clamp-1">{anime.title}</h3>
                {showReleaseDay && releaseDay && (
                  <Badge className=" right-1 top-1 bg-primary/90 backdrop-blur text-xs px-1.5 py-0.5">
                    {releaseDay}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {anime.synopsis || 'No synopsis available.'}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {anime.score && (
                  <Badge className="bg-primary/90 text-xs">★ {anime.score}</Badge>
                )}
                {anime.episodes && (
                  <Badge variant="secondary" className="text-xs">{anime.episodes} eps</Badge>
                )}
                <Badge variant="outline" className="text-xs">{anime.status}</Badge>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-1">
                {anime.genres.slice(0, 3).map((genre) => (
                  <Badge key={genre.mal_id} variant="outline" className="text-xs">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
