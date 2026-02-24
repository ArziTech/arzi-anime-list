import { getAiringAnime } from '@/lib/api'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Fetch multiple pages with error handling
    const pages = await Promise.allSettled([
      getAiringAnime({ limit: 25, page: 1 }),
      getAiringAnime({ limit: 25, page: 2 }),
      getAiringAnime({ limit: 25, page: 3 }),
    ])

    const allAnime = pages
      .filter((p): p is PromiseFulfilledResult<Awaited<ReturnType<typeof getAiringAnime>>> => p.status === 'fulfilled')
      .flatMap(p => p.value.data)

    return NextResponse.json(allAnime)
  } catch (error) {
    console.error('Error fetching airing anime:', error)
    return NextResponse.json([], { status: 200 })
  }
}
