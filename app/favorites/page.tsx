"use client";

import { useFavorites } from '@/hooks/use-favorites';
import { MoviesGrid } from '@/components/movies-grid';
import { Button } from '@/components/ui/button';
import { Heart, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesPage() {
  const { favorites, clearFavorites, isLoaded, favoritesCount } = useFavorites();

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            Cargando favoritos...
          </p>
        </div>
      </div>
    );
  }

  if (favoritesCount === 0) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Mis Películas Favoritas
            </h1>
            <p className="text-lg text-muted-foreground">
              Guarda tus películas favoritas para verlas más tarde
            </p>
          </div>

          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <Heart className="h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">
              No tienes películas favoritas aún
            </h2>
            <p className="text-muted-foreground mb-6">
              Explora películas y haz clic en el corazón para agregarlas a tus favoritos
            </p>
            <Button asChild>
              <Link href="/">Explorar Películas</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              Mis Películas Favoritas
            </h1>
            <p className="text-lg text-muted-foreground">
              {favoritesCount} {favoritesCount === 1 ? 'película' : 'películas'} en tu lista
            </p>
          </div>
          
          <Button 
            variant="outline" 
            onClick={clearFavorites}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Limpiar Todo
          </Button>
        </div>

        {/* Movies Grid */}
        <MoviesGrid movies={favorites} />
      </div>
    </div>
  );
}
