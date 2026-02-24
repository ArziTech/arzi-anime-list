import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Arzi Anime List
            </span>
          </div>

          {/* Credits */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Data provided by</span>
            <a
              href="https://jikan.moe"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Jikan API
            </a>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 fill-destructive text-destructive" />
            <span>for anime lovers</span>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="mt-6 pt-6 border-t text-center text-xs text-muted-foreground">
          <p>Discover your next favorite anime</p>
          <p className="mt-2">
            Made by <a href="https://github.com/ArziTech" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Arzi</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
