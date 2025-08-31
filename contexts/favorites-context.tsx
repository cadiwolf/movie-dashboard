"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Movie } from '@/lib/types';

const FAVORITES_KEY = 'movies-dashboard-favorites';

interface FavoritesContextType {
  favorites: Movie[];
  favoritesCount: number;
  isLoaded: boolean;
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (movieId: number) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0); // Para forzar re-renders

  // Cargar favoritos del localStorage al inicializar
  useEffect(() => {
    const loadFavorites = () => {
      try {
        if (typeof window !== 'undefined') {
          const savedFavorites = localStorage.getItem(FAVORITES_KEY);
          if (savedFavorites) {
            const parsed = JSON.parse(savedFavorites);
            setFavorites(parsed);
            console.log('Loaded favorites from localStorage:', parsed.length);
          }
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadFavorites();
  }, []);

  // Guardar en localStorage cada vez que cambian los favoritos
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        console.log('Saved favorites to localStorage:', favorites.length);
        
        // Disparar evento personalizado para notificar a otros componentes
        window.dispatchEvent(new CustomEvent('favorites-updated', { 
          detail: { count: favorites.length } 
        }));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
    }
  }, [favorites, isLoaded]);

  const addFavorite = (movie: Movie) => {
    console.log('Adding favorite:', movie.title);
    
    setFavorites(current => {
      // Verificar si ya existe para evitar duplicados
      if (current.some(fav => fav.id === movie.id)) {
        console.log('Movie already in favorites:', movie.title);
        return current;
      }
      
      const updated = [...current, movie];
      console.log('New favorites count:', updated.length);
      
      // Forzar re-render
      setUpdateTrigger(prev => prev + 1);
      
      return updated;
    });
  };

  const removeFavorite = (movieId: number) => {
    console.log('Removing favorite:', movieId);
    
    setFavorites(current => {
      const updated = current.filter(movie => movie.id !== movieId);
      console.log('New favorites count:', updated.length);
      
      // Forzar re-render
      setUpdateTrigger(prev => prev + 1);
      
      return updated;
    });
  };

  const toggleFavorite = (movie: Movie) => {
    const isCurrentlyFavorite = favorites.some(fav => fav.id === movie.id);
    
    if (isCurrentlyFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const isFavorite = (movieId: number): boolean => {
    return favorites.some(movie => movie.id === movieId);
  };

  const clearFavorites = () => {
    console.log('Clearing all favorites');
    setFavorites([]);
  };

  const contextValue: FavoritesContextType = {
    favorites,
    favoritesCount: favorites.length,
    isLoaded,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
