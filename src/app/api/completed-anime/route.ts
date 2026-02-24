import { getTopAnime } from '@/lib/api'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Fetch multiple pages with error handling
    const pages = await Promise.allSettled([
      getTopAnime({ limit: 25, page: 1 }),
      getTopAnime({ limit: 25, page: 2 }),
      getTopAnime({ limit: 25, page: 3 }),
      getTopAnime({ limit: 25, page: 4 }),
    ])

    const allAnime = pages
      .filter((p): p is PromiseFulfilledResult<Awaited<ReturnType<typeof getTopAnime>>> => p.status === 'fulfilled')
      .flatMap(p => p.value.data)
      .filter(anime => anime.status === 'Finished Airing' || anime.airing === false)

    return NextResponse.json(allAnime)
  } catch (error) {
    console.error('Error fetching completed anime:', error)
    return NextResponse.json([], { status: 200 })
  }
}
