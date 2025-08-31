import { Video } from '@/lib/types';

interface MovieTrailerProps {
  videos: { results: Video[] };
}

export function MovieTrailer({ videos }: MovieTrailerProps) {
  const trailer = videos.results.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  if (!trailer) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        🎬 Tráiler
      </h2>
      <div className="aspect-video max-w-4xl mx-auto glass rounded-lg overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="Tráiler"
          className="w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </section>
  );
}
