"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Genre } from '@/lib/types';

interface GenreFilterProps {
  genres: Genre[];
  currentGenre?: string;
  onGenreChange?: (genreId: string | null) => void;
}

export function GenreFilter({ genres, currentGenre, onGenreChange }: GenreFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleGenreClick = (genreId: string) => {
    // If onGenreChange prop is provided, use it (for client-side updates)
    if (onGenreChange) {
      const newGenreId = currentGenre === genreId ? null : genreId;
      onGenreChange(newGenreId);
      return;
    }

    // Fallback to router navigation (for server-side behavior)
    const params = new URLSearchParams(searchParams);
    
    if (currentGenre === genreId) {
      params.delete('genre');
    } else {
      params.set('genre', genreId);
    }
    
    params.delete('page');
    
    const queryString = params.toString();
    router.push(`/?${queryString}`);
  };

  const clearFilters = () => {
    if (onGenreChange) {
      onGenreChange(null);
      return;
    }
    
    router.push('/');
  };

  return (
    <div className="space-y-6">
      {/* Genre Buttons Grid */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={clearFilters}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            !currentGenre 
              ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
              : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary hover:scale-105'
          }`}
        >
          <span className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${!currentGenre ? 'bg-primary-foreground animate-pulse' : 'bg-muted-foreground'}`}></div>
            Todos
          </span>
        </button>
        
        {genres.map((genre) => {
          const isActive = currentGenre === genre.id.toString();
          return (
            <button
              key={genre.id}
              onClick={() => handleGenreClick(genre.id.toString())}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105 ring-2 ring-primary/20' 
                  : 'bg-card border border-border hover:bg-accent hover:text-accent-foreground hover:border-accent-foreground/20'
              }`}
            >
              <span className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-primary-foreground animate-pulse' : 'bg-muted-foreground'}`}></div>
                {genre.name}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Active Filter Indicator */}
      {currentGenre && (
        <div className="flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-lg p-3 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">Filtro activo:</span>
          </div>
          <span className="font-semibold text-foreground">
            {genres.find(g => g.id.toString() === currentGenre)?.name}
          </span>
          <button
            onClick={clearFilters}
            className="ml-auto text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 flex items-center gap-1"
          >
            Limpiar <span className="text-xs">✕</span>
          </button>
        </div>
      )}
    </div>
  );
}
