import Link from 'next/link'
import Image from 'next/image'
import { Anime } from '@/types/anime'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface AnimeCardProps {
  anime: Anime
}

export function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Link href={`/anime/${anime.mal_id}`} className="block h-full">
      <Card className="group pt-0 h-full overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] flex flex-col">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
          {anime.score && (
            <Badge className="absolute right-2 top-2 bg-primary/90 backdrop-blur">
              ★ {anime.score}
            </Badge>
          )}
          {anime.episodes && (
            <Badge variant="secondary" className="absolute left-2 bottom-2">
              {anime.episodes} eps
            </Badge>
          )}
        </div>
        <CardContent className="p-3 flex flex-col flex-1">
          <h3 className="line-clamp-1 font-semibold text-sm leading-tight">{anime.title}</h3>
          <div className="mt-2 flex flex-wrap gap-1">
            {anime.genres.slice(0, 2).map((genre) => (
              <Badge key={genre.mal_id} variant="outline" className="text-xs">
                {genre.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
