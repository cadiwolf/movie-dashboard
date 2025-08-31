import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function MovieSkeleton() {
  return (
    <Card className="overflow-hidden border-0 bg-card/60 backdrop-blur-sm animate-pulse">
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
          <Skeleton className="w-full h-full shimmer" />
          
          {/* Skeleton badges */}
          <div className="absolute top-2 right-2">
            <Skeleton className="w-12 h-5 rounded-full" />
          </div>
          <div className="absolute top-2 left-2">
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
        </div>
        
        <div className="p-3 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function MovieGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: 20 }).map((_, i) => (
        <MovieSkeleton key={i} />
      ))}
    </div>
  )
}
