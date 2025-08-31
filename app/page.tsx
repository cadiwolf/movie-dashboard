"use client";

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getPopularMovies, getMoviesByGenre, getGenres } from '@/lib/tmdb';
import { MoviesGrid } from '@/components/movies-grid';
import { MovieGridSkeleton } from '@/components/ui/loading';
import { GenreFilter } from '@/components/genre-filter';
import { MoviesPagination } from '@/components/movies-pagination';
import { FavoritesStats } from '@/components/favorites-stats';
import { Star, Film, Play, Search } from 'lucide-react';
import Link from 'next/link';
import { Movie, Genre } from '@/lib/types';

interface MoviesData {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

function HomePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    total_pages: 1,
    total_results: 0
  });

  const page = parseInt(searchParams?.get('page') || '1');
  const genreId = searchParams?.get('genre');

  // Load genres on mount
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genresData = await getGenres();
        setGenres(genresData.genres);
      } catch (error) {
        console.error('Error loading genres:', error);
      }
    };
    loadGenres();
  }, []);

  // Load movies when page or genre changes
  useEffect(() => {
    const loadMovies = async () => {
      setMoviesLoading(true);
      try {
        const moviesData: MoviesData = genreId 
          ? await getMoviesByGenre(genreId, page)
          : await getPopularMovies(page);
        
        setMovies(moviesData.results);
        setPagination({
          page: moviesData.page,
          total_pages: moviesData.total_pages,
          total_results: moviesData.total_results
        });
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovies([]);
      } finally {
        setMoviesLoading(false);
        setLoading(false);
      }
    };
    
    loadMovies();
  }, [page, genreId]);

  const handleGenreChange = (newGenreId: string | null) => {
    const params = new URLSearchParams(searchParams?.toString());
    
    if (newGenreId) {
      params.set('genre', newGenreId);
    } else {
      params.delete('genre');
    }
    
    // Reset page when changing genre
    params.delete('page');
    
    const queryString = params.toString();
    router.push(`/?${queryString}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section with Modern Layout */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Hero Content */}
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-6">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                    <Star className="w-4 h-4 text-primary fill-current" />
                    <span className="text-sm font-medium text-primary">Tu plataforma de películas</span>
                  </div>
                  
                  {/* Main Title */}
                  <div className="space-y-4">
                    <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-foreground">
                      Movie Dashboard
                    </h1>
                    
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                    {genreId ? 
                      'Explora películas increíbles por género y descubre tu próxima obsesión cinematográfica.' : 
                      'Descubre, explora y organiza las mejores películas del mundo en un solo lugar.'
                    }
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Film className="w-4 h-4 text-primary" />
                      <span>Miles de películas</span>
                    </div>
                    <span>Actualizado diariamente</span>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-scale-in max-w-lg mx-auto lg:mx-0">
                {/* Search Card */}
                <Link href="/search" className="group">
                  <div className="relative p-8 bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/30">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                        <Search className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">Buscar</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">Encuentra tu película ideal entre miles de opciones</p>
                    </div>
                  </div>
                </Link>
                
                {/* Favorites Card with Live Stats */}
                <div className="group">
                  <FavoritesStats />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12">
        <div className="container mx-auto px-4 space-y-12">
          {/* Filters Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <h2 className="text-2xl font-semibold">Filtros y Búsqueda</h2>
              </div>
              
              {/* Genre Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Géneros</h3>
                {loading ? (
                  <div className="text-center text-muted-foreground py-4">
                    <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                    Cargando géneros...
                  </div>
                ) : (
                  <GenreFilter 
                    genres={genres} 
                    currentGenre={genreId || undefined} 
                    onGenreChange={handleGenreChange}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Movies Grid Section */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse delay-150"></div>
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-300"></div>
                </div>
                <h3 className="text-2xl font-semibold">
                  {genreId ? 'Películas por Género' : 'Películas Populares'}
                </h3>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Play className="w-4 h-4" />
                <span>Actualizadas recientemente</span>
              </div>
            </div>
            
            {/* Active Genre Indicator - Removed, now handled by GenreFilter */}
            
            {/* Movies Content */}
            {moviesLoading ? (
              <MovieGridSkeleton />
            ) : movies.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No se encontraron películas.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                <MoviesGrid movies={movies} />
                
                {/* Pagination */}
                <MoviesPagination 
                  currentPage={pagination.page}
                  totalPages={pagination.total_pages}
                  totalResults={pagination.total_results}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">Cargando dashboard...</p>
          </div>
        </div>
      </div>
    }>
      <HomePageContent />
    </Suspense>
  );
}
