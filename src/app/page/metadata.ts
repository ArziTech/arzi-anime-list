import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Home',
    description: 'Discover your next favorite anime. Browse featured currently airing anime and top-rated completed series. Explore thousands of anime titles with detailed information.',
    keywords: ['anime', 'anime list', 'top anime', 'airing anime', 'anime recommendations'],
  }
}
