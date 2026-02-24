import { Button } from '@/components/ui/button'
import Link from 'next/link'

export async function generateMetadata() {
  return {
    title: 'Favorites',
    description: 'Your personal anime favorites collection. Save and organize your favorite anime titles. Coming soon - create your own watchlist and favorite anime collection.',
    keywords: ['favorites', 'watchlist', 'my anime list', 'anime collection', 'save anime'],
  }
}

export default function FavoritePage() {
  return (
    <main className="">
      <div className="container mx-auto py-20 px-4">
        <div className="text-center max-w-md mx-auto space-y-6">
          <div className="text-6xl"></div>
          <h1 className="text-3xl font-bold">Coming Soon</h1>
          <p className="text-muted-foreground">
            The favorites feature is under development. Soon you&apos;ll be able to save and organize your favorite anime!
          </p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
