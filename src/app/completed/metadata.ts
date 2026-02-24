import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Completed Anime',
    description: 'Explore top-rated completed anime series. Browse through finished anime with high ratings, detailed reviews, and comprehensive information. Find classic masterpieces and completed series.',
    keywords: ['completed anime', 'finished anime', 'top rated anime', 'best anime', 'anime classics', 'anime reviews'],
  }
}
