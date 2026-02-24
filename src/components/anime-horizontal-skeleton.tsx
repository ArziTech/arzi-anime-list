import { Card, CardContent } from '@/components/ui/card'

export function AnimeHorizontalSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="w-16 sm:w-20 aspect-[3/4] animate-pulse bg-muted rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-3/4 animate-pulse bg-muted rounded" />
            <div className="h-4 w-full animate-pulse bg-muted rounded" />
            <div className="h-4 w-2/3 animate-pulse bg-muted rounded" />
            <div className="flex gap-2">
              <div className="h-6 w-12 animate-pulse bg-muted rounded-full" />
              <div className="h-6 w-12 animate-pulse bg-muted rounded-full" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
