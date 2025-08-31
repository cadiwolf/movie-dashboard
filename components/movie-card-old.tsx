"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/lib/types';
import { getImageUrl } from '@/lib/tmdb';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, TrendingUp, Zap, Database } from 'lucide-react';
import { FavoriteButton } from '@/components/favorite-button';

interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
}

export function MovieCard({ movie, priority = false }: MovieCardProps) {
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
  const imageUrl = getImageUrl(movie.poster_path);
  
  return (
    <Card className="group relative overflow-hidden border-0 holographic-card card-hover animate-scale-in">
      {/* Cyber Border Effect */}
      <div className="absolute inset-0 neon-border rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Matrix-style Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      
      {/* Holographic Scanning Line */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent h-full w-full opacity-0 group-hover:opacity-100 transform -translate-y-full group-hover:translate-y-full transition-all duration-1000 z-15" />
      
      <CardContent className="p-0 relative">
        <Link href={`/movie/${movie.id}`} className="block relative">
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={movie.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                priority={priority}
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              />
            ) : (
              <div className="w-full h-full glass-neon flex items-center justify-center animate-holographic">
                <div className="text-center p-4">
                  <Database className="w-12 h-12 mx-auto mb-3 text-neon-cyan animate-pulse" />
                  <p className="text-sm text-cyber">DATOS NO DISPONIBLES</p>
                </div>
              </div>
            )}
            
            {/* Cyber Overlay Content */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 translate-y-4 group-hover:translate-y-0">
              {/* Top Section */}
              <div className="flex justify-between items-start">
                <Badge 
                  variant="secondary" 
                  className="glass-neon text-xs font-mono animate-neon-pulse"
                >
                  {year || 'UNKNOWN'}
                <FavoriteButton movie={movie} size="sm" />
              </div>
              
              {/* Bottom Section - Cyber Stats */}
              <div className="space-y-3">
                <div className="glass-neon p-3 rounded-lg">
                  <h3 className="font-bold text-sm leading-tight line-clamp-2 text-neon mb-2">
                    {movie.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center text-neon-cyan">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span className="font-mono">{year || 'UNKNOWN'}</span>
                    </div>
                    <div className="flex items-center text-neon-yellow">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      <span className="font-mono">{movie.vote_average.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Data Transmission Indicator */}
                <div className="flex items-center justify-center space-x-1">
                  <div className="w-1 h-1 bg-neon-cyan rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-neon-pink rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                  <div className="w-1 h-1 bg-neon-yellow rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                  <span className="text-xs font-mono text-muted-foreground ml-2">DATA_LINK</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
        
        {/* Cyber Info Panel - Always Visible */}
        <div className="p-4 space-y-3 glass-neon">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm leading-tight line-clamp-2 group-hover:gradient-text transition-all duration-300">
              {movie.title}
            </h3>
            <div className="transform scale-100 lg:scale-0 lg:group-hover:scale-100 transition-transform duration-300">
              <FavoriteButton movie={movie} size="sm" />
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center text-muted-foreground font-mono">
              <Calendar className="w-3 h-3 mr-1" />
              {year || 'UNKNOWN'}
            </div>
            <div className="flex items-center text-muted-foreground font-mono">
              <Star className="w-3 h-3 mr-1 fill-current text-neon-yellow" />
              {movie.vote_average.toFixed(1)}
            </div>
          </div>
          
          {/* Signal Strength Indicator */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className={`w-1 h-2 rounded-full transition-all duration-300 ${
                    i < Math.floor(movie.vote_average / 2) 
                      ? 'bg-neon-cyan animate-pulse' 
                      : 'bg-muted'
                  }`}
                  style={{animationDelay: `${i * 0.1}s`}}
                />
              ))}
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              ID: {movie.id}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
          </div>
          
          {/* Mobile favorite button */}
          <div className="md:hidden pt-1">
            <FavoriteButton movie={movie} size="sm" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
