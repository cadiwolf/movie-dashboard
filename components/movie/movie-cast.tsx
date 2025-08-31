import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Credits } from '@/lib/types';
import { getImageUrl } from '@/lib/tmdb';

interface MovieCastProps {
  credits: Credits;
  director?: string;
}

export function MovieCast({ credits, director }: MovieCastProps) {
  const mainCast = credits.cast.slice(0, 8);

  if (mainCast.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        🎭 Reparto Principal
      </h2>
      
      {director && (
        <p className="mb-6 text-muted-foreground">
          <span className="font-semibold text-foreground">Director:</span> {director}
        </p>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {mainCast.map((actor, index) => (
          <Card key={actor.id} className="text-center group card-hover animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardContent className="p-4">
              <div className="relative w-full aspect-[2/3] mb-3 rounded-md overflow-hidden">
                <Image
                  src={getImageUrl(actor.profile_path, 'w185')}
                  alt={actor.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                {actor.name}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {actor.character}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
