import { Card } from '@/components/ui/card'

export function AnimeCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[3/4] animate-pulse bg-muted" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-full animate-pulse bg-muted rounded" />
        <div className="h-4 w-2/3 animate-pulse bg-muted rounded" />
        <div className="flex gap-2">
          <div className="h-6 w-16 animate-pulse bg-muted rounded-full" />
          <div className="h-6 w-16 animate-pulse bg-muted rounded-full" />
        </div>
      </div>
    </Card>
  )
}
