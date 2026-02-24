import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Currently Airing Anime',
    description: 'Browse currently airing anime organized by release day. Find out what anime is airing on Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, and Sunday. Stay updated with the latest episodes.',
    keywords: ['airing anime', 'currently airing', 'anime schedule', 'weekly anime', 'new anime releases', 'anime by day'],
  }
}
