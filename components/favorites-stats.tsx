"use client";

import { useFavorites } from '@/hooks/use-favorites';
import { Heart, Star, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export function FavoritesStats() {
  const { favorites, favoritesCount, isLoaded } = useFavorites();

  if (!isLoaded) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (favoritesCount === 0) {
    return (
      <Link href="/favorites" className="group">
        <div className="relative p-8 bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-red-400/30">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Favoritos</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Comienza guardando tus películas favoritas</p>
          </div>
        </div>
      </Link>
    );
  }

  // Calculate some stats
  const averageRating = favorites.length > 0 
    ? (favorites.reduce((sum, movie) => sum + movie.vote_average, 0) / favorites.length).toFixed(1)
    : '0.0';

  const latestYear = favorites.length > 0
    ? Math.max(...favorites.map(movie => 
        movie.release_date ? new Date(movie.release_date).getFullYear() : 0
      ))
    : new Date().getFullYear();

  return (
    <Link href="/favorites" className="group">
      <div className="relative p-8 bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-red-400/30">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
            <Heart className="w-8 h-8 text-red-500 fill-current" />
          </div>
          <h3 className="text-xl font-semibold mb-3">
            {favoritesCount} Favorito{favoritesCount !== 1 ? 's' : ''}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span>{averageRating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{latestYear}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">Ver tu colección completa</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
