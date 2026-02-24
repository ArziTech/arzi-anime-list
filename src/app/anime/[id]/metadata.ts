import { Metadata } from 'next'
import { getAnimeById } from '@/lib/api'

interface AnimePageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: AnimePageProps): Promise<Metadata> {
  const { id } = await params
  try {
    const anime = await getAnimeById(Number(id))

    const description = anime.synopsis
      ? anime.synopsis.slice(0, 160) + '...'
      : `Discover ${anime.title}, a ${anime.type} anime rated ${anime.score}/10. ${anime.status} with ${anime.episodes || '?'} episodes.`

    const keywords = [
      anime.title,
      anime.title_japanese,
      ...anime.genres.map(g => g.name),
      anime.type,
      anime.status,
      'anime',
      'myanimelist',
    ]

    return {
      title: anime.title,
      description,
      keywords,
      openGraph: {
        title: anime.title,
        description,
        type: 'website',
        images: [
          {
            url: anime.images.jpg.large_image_url,
            width: 1200,
            height: 630,
            alt: anime.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: anime.title,
        description,
        images: [anime.images.jpg.large_image_url],
      },
      alternates: {
        canonical: `https://arzianime.list/anime/${id}`,
      },
    }
  } catch (error) {
    return {
      title: 'Anime Details',
      description: 'View detailed information about this anime.',
    }
  }
}
