"use client";

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFavorites } from '@/hooks/use-favorites';

export function FavoritesCounter() {
  const { favoritesCount, isLoaded } = useFavorites();

  return (
    <Button variant="ghost" size="sm" asChild>
      <Link href="/favorites" className="relative">
        <Heart className="h-4 w-4" />
        {isLoaded && favoritesCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center"
          >
            {favoritesCount > 99 ? '99+' : favoritesCount}
          </Badge>
        )}
        <span className="sr-only">Ver favoritos</span>
      </Link>
    </Button>
  );
}
