import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

interface LoadingSkeletonProps {
  type?: 'grid' | 'list' | 'card' | 'details';
  count?: number;
  className?: string;
}

export function LoadingSkeleton({ type = 'grid', count = 12, className }: LoadingSkeletonProps) {
  switch (type) {
    case 'details':
      return <MovieDetailsSkeleton className={className} />;
    case 'list':
      return <MovieListSkeleton count={count} className={className} />;
    case 'card':
      return <MovieCardSkeleton className={className} />;
    default:
      return <MovieGridSkeleton count={count} className={className} />;
  }
}

function MovieGridSkeleton({ count, className }: { count: number; className?: string }) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}

function MovieCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={`overflow-hidden border-0 bg-card/60 backdrop-blur-sm ${className}`}>
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
  );
}

function MovieListSkeleton({ count, className }: { count: number; className?: string }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="p-4">
          <div className="flex gap-4">
            <Skeleton className="w-20 h-28 rounded-md flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-12 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-12" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function MovieDetailsSkeleton({ className }: { className?: string }) {
  return (
    <div className={`min-h-screen animate-pulse ${className}`}>
      {/* Hero Skeleton */}
      <div className="relative h-[60vh] bg-muted">
        <Skeleton className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent">
          <div className="container mx-auto px-4 h-full flex items-end pb-8">
            <div className="flex gap-6 w-full">
              <Skeleton className="w-64 h-96 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-12 w-3/4" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-20 w-full" />
                <div className="flex gap-4">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Cast Section */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-32" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <Skeleton className="aspect-[2/3] w-full" />
                  <div className="p-3 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Videos Section */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-24" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-0">
                  <Skeleton className="aspect-video w-full" />
                  <div className="p-4">
                    <Skeleton className="h-5 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Similar Movies Section */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <MovieGridSkeleton count={10} />
        </div>
      </div>
    </div>
  );
}
