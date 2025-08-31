import { MovieGridSkeleton } from '@/components/ui/loading';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Header skeleton */}
      <div className="space-y-4 text-center lg:text-left">
        <div className="h-12 bg-muted rounded-lg w-3/4 shimmer" />
        <div className="h-6 bg-muted rounded w-1/2 shimmer" />
      </div>

      {/* Filters skeleton */}
      <div className="glass rounded-lg p-6">
        <div className="h-8 bg-muted rounded w-32 mb-4 shimmer" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-8 bg-muted rounded-full w-20 shimmer" />
          ))}
        </div>
      </div>

      {/* Movies grid skeleton */}
      <MovieGridSkeleton />
    </div>
  );
}
