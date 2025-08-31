import { Suspense } from 'react';
import { getPopularMovies, getMoviesByGenre } from '@/lib/tmdb';
import { MoviesGrid } from '@/components/movies-grid';
import { MovieGridSkeleton } from '@/components/ui/loading';
import { FilterSection } from '@/components/filter-section';
import { MoviesPagination } from '@/components/movies-pagination';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; genre?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const genreId = params.genre;

  return (
    <div className="min-h-screen matrix-bg">
      {/* Futuristic Hero Section */}
      <div className="relative overflow-hidden">
        <div className="cyber-grid absolute inset-0 opacity-30"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center space-y-8 animate-fade-in">
            {/* Holographic Title */}
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-8xl font-bold tracking-tight gradient-text animate-holographic">
                CINE<span className="text-neon">MATRIX</span>
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto animate-glow"></div>
            </div>
            
            {/* Cyber Description */}
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto text-cyber">
              {genreId ? 
                '> EXPLORANDO DIMENSIÓN CINEMATOGRÁFICA SELECTA_' : 
                '> ACCEDIENDO A BASE DE DATOS CINEMATOGRÁFICA GLOBAL_'
              }
            </p>
            
            {/* Floating Elements */}
            <div className="flex justify-center space-x-8 mt-12">
              <div className="floating-element glass-neon p-4 rounded-lg">
                <span className="text-2xl">🎬</span>
              </div>
              <div className="floating-element glass-neon p-4 rounded-lg">
                <span className="text-2xl">🌟</span>
              </div>
              <div className="floating-element glass-neon p-4 rounded-lg">
                <span className="text-2xl">🎭</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="holographic-card rounded-lg p-8 neon-border animate-scale-in">
          <h2 className="text-2xl font-bold mb-6 text-neon flex items-center gap-3">
            <span className="w-3 h-3 bg-primary rounded-full animate-neon-pulse"></span>
            PANEL DE CONTROL
          </h2>
          <Suspense fallback={
            <div className="text-center text-muted-foreground text-cyber">
              {'> INICIALIZANDO FILTROS...'}
            </div>
          }>
            <FilterSection currentGenre={genreId} />
          </Suspense>
        </div>

        {/* Data Stream */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-neon-pink rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="w-2 h-2 bg-neon-yellow rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            <h3 className="text-xl font-bold text-cyber">TRANSMISIÓN DE DATOS ACTIVA</h3>
          </div>
          
          <Suspense fallback={<MovieGridSkeleton />}>
            <MoviesSection page={page} genreId={genreId} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function MoviesSection({ page, genreId }: { page: number; genreId?: string }) {
  try {
    // Si hay un género seleccionado, usar getMoviesByGenre, sino usar getPopularMovies
    const moviesData = genreId 
      ? await getMoviesByGenre(genreId, page)
      : await getPopularMovies(page);
    
    if (!moviesData.results || moviesData.results.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No se encontraron películas.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <MoviesGrid movies={moviesData.results} />
        
        {/* Pagination */}
        <MoviesPagination 
          currentPage={moviesData.page}
          totalPages={moviesData.total_pages}
          totalResults={moviesData.total_results}
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching movies:', error);
    return (
      <div className="text-center py-12">
        <p className="text-lg text-destructive">
          Error al cargar las películas. Por favor, intenta de nuevo.
        </p>
      </div>
    );
  }
}
