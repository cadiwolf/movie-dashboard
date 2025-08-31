import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getMovieDetails, getMovieCredits, getMovieVideos, getBackdropUrl } from '@/lib/tmdb';
import { MovieHero, MovieOverview, MovieCast, MovieTrailer, SimilarMovies } from '@/components/movie';
import { MovieDetailsSkeleton } from '@/components/ui/loading';
import { ErrorBoundary } from '@/components/error-boundary';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

// Generación de metadatos dinámicos mejorados para SEO
export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    
    // Validar que el ID es un número
    if (!/^\d+$/.test(id)) {
      return {
        title: 'Película no encontrada | Movies Dashboard',
        description: 'La película que buscas no fue encontrada.',
      };
    }

    const movie = await getMovieDetails(id);
    const releaseYear = new Date(movie.release_date).getFullYear();
    
    return {
      title: `${movie.title} (${releaseYear}) | Movies Dashboard`,
      description: movie.overview || `Descubre todo sobre ${movie.title}. Ver elenco, videos, películas similares y más información detallada.`,
      keywords: [
        movie.title,
        ...movie.genres.map(g => g.name),
        'película',
        'cine',
        'entretenimiento',
        'TMDB',
        releaseYear.toString()
      ].join(', '),
      authors: [{ name: 'Movies Dashboard' }],
      openGraph: {
        title: `${movie.title} (${releaseYear})`,
        description: movie.overview,
        images: movie.backdrop_path ? [
          {
            url: getBackdropUrl(movie.backdrop_path, 'w1280'),
            width: 1280,
            height: 720,
            alt: `${movie.title} backdrop`,
          }
        ] : [],
        type: 'video.movie',
        url: `https://movies-dashboard.vercel.app/movie/${id}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${movie.title} (${releaseYear})`,
        description: movie.overview,
        images: movie.backdrop_path ? [getBackdropUrl(movie.backdrop_path, 'w1280')] : [],
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Película no encontrada | Movies Dashboard',
      description: 'La película que buscas no fue encontrada o no está disponible.',
    };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  
  // Validar que el ID es un número válido
  if (!/^\d+$/.test(id)) {
    notFound();
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<MovieDetailsSkeleton />}>
        <MovieDetailsContent id={id} />
      </Suspense>
    </ErrorBoundary>
  );
}

// Server Component separado para manejar la carga de datos
async function MovieDetailsContent({ id }: { id: string }) {
  try {
    const [movie, credits, videos] = await Promise.all([
      getMovieDetails(id),
      getMovieCredits(id),
      getMovieVideos(id),
    ]);

    if (!movie) {
      notFound();
    }

    const director = credits.crew.find((person) => person.job === 'Director');

    return (
      <div className="min-h-screen animate-fade-in">
        {/* Hero Section */}
        <MovieHero movie={movie} />
        
        {/* Content */}
        <div className="container mx-auto px-4 py-8 space-y-12">
          {/* Overview */}
          <MovieOverview overview={movie.overview} director={director?.name} />

          {/* Cast */}
          <MovieCast credits={credits} director={director?.name} />

          {/* Trailer */}
          <MovieTrailer videos={videos} />

          {/* Similar Movies */}
          <SimilarMovies movieId={id} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading movie:', error);
    notFound();
  }
}
