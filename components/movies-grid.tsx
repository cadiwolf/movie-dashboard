import { Movie } from '@/lib/types';
import { MovieCard } from '@/components/movie-card';

interface MoviesGridProps {
  movies: Movie[];
  className?: string;
}

export function MoviesGrid({ movies, className = '' }: MoviesGridProps) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 ${className}`}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
