"use client";

import { useState, useEffect } from 'react';
import { Movie } from '@/lib/types';

const FAVORITES_KEY = 'movies-dashboard-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Cargar favoritos del localStorage
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const addFavorite = (movie: Movie) => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error saving favorite:', error);
    }
  };

  const removeFavorite = (movieId: number) => {
    const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
    setFavorites(updatedFavorites);
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const toggleFavorite = (movie: Movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const isFavorite = (movieId: number) => {
    return favorites.some(movie => movie.id === movieId);
  };

  const clearFavorites = () => {
    setFavorites([]);
    try {
      localStorage.removeItem(FAVORITES_KEY);
    } catch (error) {
      console.error('Error clearing favorites:', error);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    isLoaded,
    favoritesCount: favorites.length
  };
}
