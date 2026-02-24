import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Search Anime',
    description: 'Search through thousands of anime titles. Find anime by name, genre, or keyword. Get detailed information including ratings, synopsis, episodes, and more.',
    keywords: ['anime search', 'find anime', 'anime database', 'anime lookup', 'search by title'],
  }
}
