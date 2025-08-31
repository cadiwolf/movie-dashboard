"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Filter } from 'lucide-react';
import { Genre } from '@/lib/types';

interface AdvancedFiltersProps {
  genres: Genre[];
}

export function AdvancedFilters({ genres }: AdvancedFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    year: searchParams.get('year') || 'all',
    genre: searchParams.get('genre') || 'all',
    minRating: searchParams.get('min_rating') || 'all',
    sortBy: searchParams.get('sort_by') || 'popularity.desc'
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const sortOptions = [
    { value: 'popularity.desc', label: 'Más Popular' },
    { value: 'popularity.asc', label: 'Menos Popular' },
    { value: 'release_date.desc', label: 'Más Reciente' },
    { value: 'release_date.asc', label: 'Más Antigua' },
    { value: 'vote_average.desc', label: 'Mejor Valorada' },
    { value: 'vote_average.asc', label: 'Peor Valorada' },
    { value: 'title.asc', label: 'A-Z' },
    { value: 'title.desc', label: 'Z-A' }
  ];

  const ratingOptions = [
    { value: 'all', label: 'Cualquier Rating' },
    { value: '7', label: '7+ estrellas' },
    { value: '8', label: '8+ estrellas' },
    { value: '9', label: '9+ estrellas' }
  ];

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    
    // Mantener la query de búsqueda
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        if (key === 'minRating') {
          params.set('min_rating', value);
        } else {
          params.set(key, value);
        }
      } else {
        if (key === 'minRating') {
          params.delete('min_rating');
        } else {
          params.delete(key);
        }
      }
    });

    // Reset page when applying filters
    params.delete('page');
    
    router.push(`/search?${params.toString()}`);
    setIsOpen(false);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('year');
    params.delete('genre');
    params.delete('min_rating');
    params.delete('sort_by');
    params.delete('page');
    
    setFilters({
      year: 'all',
      genre: 'all',
      minRating: 'all',
      sortBy: 'popularity.desc'
    });
    
    router.push(`/search?${params.toString()}`);
    setIsOpen(false);
  };

  const hasActiveFilters = (filters.year && filters.year !== 'all') || 
                          (filters.genre && filters.genre !== 'all') || 
                          (filters.minRating && filters.minRating !== 'all') || 
                          filters.sortBy !== 'popularity.desc';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filtros Avanzados
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-1">
              {Object.values(filters).filter(Boolean).length}
            </Badge>
          )}
        </Button>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="gap-1"
          >
            <X className="h-4 w-4" />
            Limpiar filtros
          </Button>
        )}
      </div>

      {isOpen && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtros de Búsqueda</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Año */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Año</label>
                <Select
                  value={filters.year}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, year: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Cualquier año" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Cualquier año</SelectItem>
                    {years.map(year => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Género */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Género</label>
                <Select
                  value={filters.genre}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, genre: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Cualquier género" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Cualquier género</SelectItem>
                    {genres.map(genre => (
                      <SelectItem key={genre.id} value={genre.id.toString()}>
                        {genre.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Rating mínimo */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Rating Mínimo</label>
                <Select
                  value={filters.minRating}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, minRating: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Cualquier rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {ratingOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Ordenar por */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Ordenar por</label>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={applyFilters} className="flex-1">
                Aplicar Filtros
              </Button>
              <Button variant="outline" onClick={clearFilters}>
                Limpiar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.year && (
            <Badge variant="secondary" className="gap-1">
              Año: {filters.year}
              <button
                onClick={() => setFilters(prev => ({ ...prev, year: '' }))}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.genre && (
            <Badge variant="secondary" className="gap-1">
              Género: {genres.find(g => g.id.toString() === filters.genre)?.name}
              <button
                onClick={() => setFilters(prev => ({ ...prev, genre: '' }))}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.minRating && (
            <Badge variant="secondary" className="gap-1">
              Rating: {filters.minRating}+ estrellas
              <button
                onClick={() => setFilters(prev => ({ ...prev, minRating: '' }))}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.sortBy !== 'popularity.desc' && (
            <Badge variant="secondary" className="gap-1">
              Orden: {sortOptions.find(s => s.value === filters.sortBy)?.label}
              <button
                onClick={() => setFilters(prev => ({ ...prev, sortBy: 'popularity.desc' }))}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
