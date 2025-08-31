import { Movie, MovieDetails, MoviesResponse, Credits, Video, Genre } from './types';

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Configura tu API key aquí
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!API_KEY) {
  throw new Error('TMDB API key is required. Please set NEXT_PUBLIC_TMDB_API_KEY in your environment variables.');
}

// Clase personalizada para errores de TMDB
export class TMDBError extends Error {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string,
    public endpoint?: string
  ) {
    super(message);
    this.name = 'TMDBError';
  }
}

async function fetchFromTMDB(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', API_KEY!);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new TMDBError(
        errorData?.status_message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        response.statusText,
        endpoint
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TMDBError) {
      throw error;
    }
    
    // Errores de red u otros errores
    throw new TMDBError(
      `Error al conectar con TMDB: ${error instanceof Error ? error.message : 'Error desconocido'}`,
      undefined,
      undefined,
      endpoint
    );
  }
}

export async function getPopularMovies(page: number = 1): Promise<MoviesResponse> {
  return fetchFromTMDB('/movie/popular', { page: page.toString() });
}

export async function getTopRatedMovies(page: number = 1): Promise<MoviesResponse> {
  return fetchFromTMDB('/movie/top_rated', { page: page.toString() });
}

export async function getNowPlayingMovies(page: number = 1): Promise<MoviesResponse> {
  return fetchFromTMDB('/movie/now_playing', { page: page.toString() });
}

export async function getUpcomingMovies(page: number = 1): Promise<MoviesResponse> {
  return fetchFromTMDB('/movie/upcoming', { page: page.toString() });
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  return fetchFromTMDB(`/movie/${id}`);
}

export async function getMovieCredits(id: string): Promise<Credits> {
  return fetchFromTMDB(`/movie/${id}/credits`);
}

export async function getMovieVideos(id: string): Promise<{ results: Video[] }> {
  return fetchFromTMDB(`/movie/${id}/videos`);
}

export async function getSimilarMovies(id: string, page: number = 1): Promise<MoviesResponse> {
  return fetchFromTMDB(`/movie/${id}/similar`, { page: page.toString() });
}

export async function searchMovies(query: string, page: number = 1): Promise<MoviesResponse> {
  return fetchFromTMDB('/search/movie', { 
    query: encodeURIComponent(query), 
    page: page.toString() 
  });
}

export async function searchMoviesAdvanced(params: {
  query: string;
  page?: number;
  year?: string;
  genre?: string;
  minRating?: string;
  sortBy?: string;
}): Promise<MoviesResponse> {
  const searchParams: Record<string, string> = {};
  
  if (params.query) {
    // Si hay query, usar search endpoint
    searchParams.query = encodeURIComponent(params.query);
    searchParams.page = params.page?.toString() || '1';
    
    const results = await fetchFromTMDB('/search/movie', searchParams);
    
    // Aplicar filtros adicionales si es necesario
    if (params.year || params.genre || params.minRating) {
      results.results = results.results.filter((movie: Movie) => {
        if (params.year && !movie.release_date?.startsWith(params.year)) return false;
        if (params.genre && !movie.genre_ids.includes(parseInt(params.genre))) return false;
        if (params.minRating && movie.vote_average < parseFloat(params.minRating)) return false;
        return true;
      });
    }
    
    // Aplicar ordenamiento
    if (params.sortBy && params.sortBy !== 'popularity.desc') {
      results.results.sort((a: Movie, b: Movie) => {
        switch (params.sortBy) {
          case 'popularity.asc':
            return a.popularity - b.popularity;
          case 'release_date.desc':
            return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
          case 'release_date.asc':
            return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
          case 'vote_average.desc':
            return b.vote_average - a.vote_average;
          case 'vote_average.asc':
            return a.vote_average - b.vote_average;
          case 'title.asc':
            return a.title.localeCompare(b.title);
          case 'title.desc':
            return b.title.localeCompare(a.title);
          default:
            return b.popularity - a.popularity;
        }
      });
    }
    
    return results;
  } else {
    // Si no hay query, usar discover endpoint
    if (params.page) searchParams.page = params.page.toString();
    if (params.year) searchParams.primary_release_year = params.year;
    if (params.genre) searchParams.with_genres = params.genre;
    if (params.minRating) searchParams['vote_average.gte'] = params.minRating;
    if (params.sortBy) searchParams.sort_by = params.sortBy;
    
    return fetchFromTMDB('/discover/movie', searchParams);
  }
}

export async function getMoviesByGenre(genreId: string, page: number = 1): Promise<MoviesResponse> {
  return fetchFromTMDB('/discover/movie', { 
    with_genres: genreId, 
    page: page.toString(),
    sort_by: 'popularity.desc'
  });
}

export async function getGenres(): Promise<{ genres: Genre[] }> {
  return fetchFromTMDB('/genre/movie/list');
}

export async function discoverMovies(params: {
  page?: number;
  sort_by?: string;
  with_genres?: string;
  primary_release_year?: string;
  'vote_average.gte'?: string;
  'vote_average.lte'?: string;
} = {}): Promise<MoviesResponse> {
  const searchParams: Record<string, string> = {};
  
  if (params.page) searchParams.page = params.page.toString();
  if (params.sort_by) searchParams.sort_by = params.sort_by;
  if (params.with_genres) searchParams.with_genres = params.with_genres;
  if (params.primary_release_year) searchParams.primary_release_year = params.primary_release_year;
  if (params['vote_average.gte']) searchParams['vote_average.gte'] = params['vote_average.gte'];
  if (params['vote_average.lte']) searchParams['vote_average.lte'] = params['vote_average.lte'];
  
  return fetchFromTMDB('/discover/movie', searchParams);
}

// Helper functions for image URLs
export function getImageUrl(path: string | null, size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'): string {
  if (!path) return '/placeholder-movie.svg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function getBackdropUrl(path: string | null, size: 'w300' | 'w780' | 'w1280' | 'original' = 'w1280'): string {
  if (!path) return '/placeholder-movie.svg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function getProfileUrl(path: string | null, size: 'w45' | 'w185' | 'h632' | 'original' = 'w185'): string {
  if (!path) return '/placeholder-movie.svg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

// Helper function to format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Helper function to format runtime
export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes}min`;
  }
  
  return `${hours}h ${remainingMinutes}min`;
}

// Helper function to get YouTube embed URL
export function getYouTubeEmbedUrl(key: string): string {
  return `https://www.youtube.com/embed/${key}`;
}
