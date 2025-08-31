"use client";

import { Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Movie } from '@/lib/types';
import { useFavorites } from '@/hooks/use-favorites';
import { showToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface FavoriteButtonProps {
  movie: Movie;
  size?: 'sm' | 'default' | 'lg' | 'icon';
  variant?: 'default' | 'ghost' | 'outline';
  className?: string;
  showText?: boolean;
}

export function FavoriteButton({ 
  movie, 
  size = 'default', 
  variant = 'ghost',
  className,
  showText = false
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);
  
  if (!isLoaded) {
    return (
      <Button 
        variant={variant} 
        size={size} 
        disabled
        className={cn("transition-all duration-300", className)}
      >
        <Heart className={cn(
          size === 'sm' && 'h-3 w-3',
          size === 'default' && 'h-4 w-4',
          size === 'lg' && 'h-5 w-5',
          size === 'icon' && 'h-4 w-4',
          "animate-pulse"
        )} />
        {showText && <span className="ml-2">Favorito</span>}
      </Button>
    );
  }

  const isMovieFavorite = isFavorite(movie.id);
  console.log(`FavoriteButton for ${movie.title}: isMovieFavorite=${isMovieFavorite}`);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAnimating(true);
    const wasAlreadyFavorite = isMovieFavorite;
    
    // Actualizar inmediatamente
    toggleFavorite(movie);
    
    // Show toast notification inmediatamente
    if (wasAlreadyFavorite) {
      showToast({
        message: `"${movie.title}" quitado de favoritos`,
        type: 'info',
        icon: <X className="w-4 h-4" />,
        duration: 2000
      });
    } else {
      showToast({
        message: `"${movie.title}" agregado a favoritos`,
        type: 'success',
        icon: <Heart className="w-4 h-4 fill-current" />,
        duration: 2000
      });
    }
    
    // Reset animation after it completes
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <Button 
      variant={variant} 
      size={size}
      onClick={handleClick}
      className={cn(
        "relative overflow-hidden transition-all duration-300 group",
        "hover:scale-110 active:scale-95",
        isMovieFavorite && "text-red-500 hover:text-red-600 shadow-md hover:shadow-lg",
        !isMovieFavorite && "hover:text-primary hover:shadow-md",
        isAnimating && "animate-pulse",
        className
      )}
      title={isMovieFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      {/* Animated background effect */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-r transition-opacity duration-300 rounded-md",
        isMovieFavorite 
          ? "from-red-500/10 to-pink-500/10 opacity-100" 
          : "from-primary/10 to-emerald-500/10 opacity-0 group-hover:opacity-100"
      )} />
      
      <Heart 
        className={cn(
          "relative z-10 transition-all duration-300",
          size === 'sm' && 'h-3 w-3',
          size === 'default' && 'h-4 w-4',
          size === 'lg' && 'h-5 w-5',
          size === 'icon' && 'h-4 w-4',
          isMovieFavorite && 'fill-current',
          isAnimating && (isMovieFavorite ? 'animate-bounce' : 'animate-pulse'),
          !isMovieFavorite && 'group-hover:drop-shadow-lg'
        )} 
      />
      
      {showText && (
        <span className="ml-2 relative z-10 transition-all duration-200">
          {isMovieFavorite ? 'En favoritos' : 'Agregar a favoritos'}
        </span>
      )}
      
      {/* Success ripple effect */}
      {isAnimating && isMovieFavorite && (
        <div className="absolute inset-0 bg-red-500/20 rounded-md animate-ping" />
      )}
      
      {/* Add ripple effect */}
      {isAnimating && !isMovieFavorite && (
        <div className="absolute inset-0 bg-primary/20 rounded-md animate-ping" />
      )}
    </Button>
  );
}
