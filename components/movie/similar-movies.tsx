import { Suspense } from 'react';
import { getSimilarMovies } from '@/lib/tmdb';
import { MoviesGrid } from '@/components/movies-grid';
import { LoadingSkeleton } from '@/components/ui/loading';

interface SimilarMoviesProps {
  movieId: string;
}

export function SimilarMovies({ movieId }: SimilarMoviesProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        🎯 Películas Similares
      </h2>
      <Suspense fallback={<LoadingSkeleton type="grid" count={12} />}>
        <SimilarMoviesContent movieId={movieId} />
      </Suspense>
    </section>
  );
}

async function SimilarMoviesContent({ movieId }: { movieId: string }) {
  try {
    const similarMovies = await getSimilarMovies(movieId);
    
    if (similarMovies.results.length === 0) {
      return (
        <div className="text-center py-8 glass rounded-lg">
          <p className="text-muted-foreground">
            No se encontraron películas similares.
          </p>
        </div>
      );
    }

    return <MoviesGrid movies={similarMovies.results.slice(0, 12)} />;
  } catch (error) {
    console.error('Error loading similar movies:', error);
    return (
      <div className="text-center py-8 glass rounded-lg">
        <p className="text-muted-foreground">
          Error al cargar películas similares.
        </p>
      </div>
    );
  }
}
