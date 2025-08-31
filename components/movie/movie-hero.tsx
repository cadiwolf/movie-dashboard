import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Calendar } from 'lucide-react';
import { MovieDetails } from '@/lib/types';
import { getImageUrl, getBackdropUrl, formatDate, formatRuntime } from '@/lib/tmdb';
import { FavoriteButton } from '@/components/favorite-button';

interface MovieHeroProps {
  movie: MovieDetails;
}

export function MovieHero({ movie }: MovieHeroProps) {
  return (
    <div className="relative h-[70vh] overflow-hidden">
      {movie.backdrop_path && (
        <Image
          src={getBackdropUrl(movie.backdrop_path, 'w1280')}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            {/* Poster */}
            <div className="flex-shrink-0">
              <div className="relative w-64 aspect-[2/3] rounded-lg overflow-hidden shadow-2xl card-hover">
                <Image
                  src={getImageUrl(movie.poster_path, 'w500')}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Movie Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-2 gradient-text">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className="text-lg text-muted-foreground italic">
                    {movie.tagline}
                  </p>
                )}
              </div>
              
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-1 glass px-3 py-1 rounded-full">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                  <span className="text-muted-foreground text-sm">
                    ({movie.vote_count.toLocaleString()})
                  </span>
                </div>
                
                {movie.runtime && (
                  <div className="flex items-center gap-1 glass px-3 py-1 rounded-full">
                    <Clock className="h-4 w-4" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-1 glass px-3 py-1 rounded-full">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(movie.release_date)}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge key={genre.id} variant="secondary" className="animate-scale-in">
                    {genre.name}
                  </Badge>
                ))}
              </div>

              {/* Favorite Button */}
              <div className="pt-4">
                <FavoriteButton movie={movie} size="lg" showText />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
