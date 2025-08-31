"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/lib/types';
import { getImageUrl } from '@/lib/tmdb';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, Play } from 'lucide-react';
import { FavoriteButton } from '@/components/favorite-button';

interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
}

export function MovieCard({ movie, priority = false }: MovieCardProps) {
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
  const imageUrl = getImageUrl(movie.poster_path);
  
  return (
    <Card className="group relative overflow-hidden border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-0 relative">
        <Link href={`/movie/${movie.id}`} className="block relative">
          <div className="relative aspect-[2/3] overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={movie.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={priority}
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <div className="text-center p-4">
                  <Play className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Sin imagen</p>
                </div>
              </div>
            )}
            
            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
              {/* Top Section - Rating and Favorite */}
              <div className="flex justify-between items-start">
                <Badge variant="secondary" className="bg-black/80 text-white border-0">
                  <Star className="w-3 h-3 mr-1 fill-current text-yellow-400" />
                  {movie.vote_average.toFixed(1)}
                </Badge>
                <FavoriteButton movie={movie} size="sm" className="bg-black/80 hover:bg-black text-white" />
              </div>
              
              {/* Bottom Section - Title and Year */}
              <div className="space-y-2">
                <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2">
                  {movie.title}
                </h3>
                <div className="flex items-center text-white/80 text-xs">
                  <Calendar className="w-3 h-3 mr-1" />
                  {year || 'Sin fecha'}
                </div>
              </div>
            </div>
          </div>
        </Link>
        
        {/* Card Footer - Always Visible */}
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {movie.title}
            </h3>
            <div className="flex-shrink-0">
              <FavoriteButton movie={movie} size="sm" />
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {year || 'Sin fecha'}
            </div>
            <div className="flex items-center">
              <Star className="w-3 h-3 mr-1 fill-current text-yellow-400" />
              {movie.vote_average.toFixed(1)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
