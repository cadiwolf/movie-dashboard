import { getGenres } from '@/lib/tmdb';
import { GenreFilter } from '@/components/genre-filter';

interface FilterSectionProps {
  currentGenre?: string;
}

export async function FilterSection({ currentGenre }: FilterSectionProps) {
  try {
    const genresData = await getGenres();
    
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Filtros</h2>
        <GenreFilter genres={genresData.genres} currentGenre={currentGenre} />
      </div>
    );
  } catch (error) {
    console.error('Error loading genres:', error);
    return null;
  }
}
