"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Genre } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface GenreFilterProps {
  genres: Genre[];
  currentGenre?: string;
}

export function GenreFilter({ genres, currentGenre }: GenreFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleGenreClick = (genreId: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (currentGenre === genreId) {
      // Remove genre filter if clicking the same genre
      params.delete('genre');
    } else {
      params.set('genre', genreId);
    }
    
    // Reset page when changing genre
    params.delete('page');
    
    const queryString = params.toString();
    router.push(`/?${queryString}`);
  };

  const clearFilters = () => {
    router.push('/');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={!currentGenre ? "default" : "outline"}
          size="sm"
          onClick={clearFilters}
        >
          Todos
        </Button>
        
        {genres.map((genre) => (
          <Button
            key={genre.id}
            variant={currentGenre === genre.id.toString() ? "default" : "outline"}
            size="sm"
            onClick={() => handleGenreClick(genre.id.toString())}
          >
            {genre.name}
          </Button>
        ))}
      </div>
      
      {currentGenre && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtro activo:</span>
          <Badge variant="secondary">
            {genres.find(g => g.id.toString() === currentGenre)?.name}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-auto p-1 text-xs"
          >
            Limpiar
          </Button>
        </div>
      )}
    </div>
  );
}
