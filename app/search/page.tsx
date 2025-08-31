import { Suspense } from 'react';
import { Metadata } from 'next';
import { searchMoviesAdvanced, getGenres } from '@/lib/tmdb';
import { MoviesGrid } from '@/components/movies-grid';
import { LoadingSkeleton } from '@/components/ui/loading';
import { SearchBar, AdvancedFilters, SearchPagination } from '@/components/search';
import { ErrorBoundary } from '@/components/error-boundary';
import { Search, Filter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Buscar Películas | Movies Dashboard',
  description: 'Encuentra películas usando filtros avanzados: género, año, rating y más.',
  keywords: 'buscar películas, filtros, género, año, rating, TMDB',
};

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
    year?: string;
    genre?: string;
    min_rating?: string;
    sort_by?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const page = parseInt(params.page || '1');
  const year = params.year;
  const genre = params.genre;
  const minRating = params.min_rating;
  const sortBy = params.sort_by;

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8 space-y-8 animate-fade-in">
        {/* Header with search */}
        <div className="space-y-4 text-center lg:text-left">
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight gradient-text">
              Buscar Películas
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Encuentra películas usando filtros avanzados por género, año, calificación y más
          </p>
          <div className="max-w-2xl mx-auto lg:mx-0">
            <SearchBar initialQuery={query} autoFocus={true} />
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="glass rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Filtros Avanzados</h2>
          </div>
          <Suspense fallback={<div className="text-center text-muted-foreground">Cargando filtros...</div>}>
            <AdvancedFiltersSection />
          </Suspense>
        </div>

        {/* Results */}
        {query ? (
          <Suspense 
            key={`${query}-${page}-${year}-${genre}-${minRating}-${sortBy}`} 
            fallback={<LoadingSkeleton type="grid" count={20} />}
          >
            <SearchResults 
              query={query} 
              page={page}
              year={year}
              genre={genre}
              minRating={minRating}
              sortBy={sortBy}
            />
          </Suspense>
        ) : (
          <div className="text-center py-12 glass rounded-lg">
            <div className="space-y-4">
              <div className="h-16 w-16 rounded-full bg-muted/50 mx-auto flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">¡Comienza tu búsqueda!</h3>
                <p className="text-muted-foreground">
                  Ingresa un término de búsqueda arriba para encontrar películas increíbles.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}

async function AdvancedFiltersSection() {
  try {
    const genresData = await getGenres();
    return <AdvancedFilters genres={genresData.genres} />;
  } catch (error) {
    console.error('Error loading genres:', error);
    return null;
  }
}

async function SearchResults({ 
  query, 
  page, 
  year, 
  genre, 
  minRating, 
  sortBy 
}: { 
  query: string; 
  page: number;
  year?: string;
  genre?: string;
  minRating?: string;
  sortBy?: string;
}) {
  try {
    const searchResults = await searchMoviesAdvanced({
      query,
      page,
      year,
      genre,
      minRating,
      sortBy
    });
    
    if (!searchResults.results || searchResults.results.length === 0) {
      return (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">
            No se encontraron resultados
          </h2>
          <p className="text-muted-foreground">
            No se encontraron películas para &quot;{query}&quot;. Intenta con otros términos de búsqueda.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Resultados para &quot;{query}&quot;
          </h2>
          <p className="text-muted-foreground">
            {searchResults.total_results.toLocaleString()} resultados encontrados
          </p>
        </div>
        
        <MoviesGrid movies={searchResults.results} />
        
        {/* Pagination */}
        <SearchPagination 
          currentPage={searchResults.page}
          totalPages={searchResults.total_pages}
          totalResults={searchResults.total_results}
          query={query}
        />
      </div>
    );
  } catch (error) {
    console.error('Error searching movies:', error);
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2 text-destructive">
          Error en la búsqueda
        </h2>
        <p className="text-muted-foreground">
          Hubo un problema al buscar películas. Por favor, intenta de nuevo.
        </p>
      </div>
    );
  }
}
