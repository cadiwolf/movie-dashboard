interface MovieOverviewProps {
  overview: string;
  director?: string;
}

export function MovieOverview({ overview, director }: MovieOverviewProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        📖 Sinopsis
      </h2>
      <div className="glass p-6 rounded-lg">
        <p className="text-lg leading-relaxed mb-4">{overview}</p>
        {director && (
          <p className="text-muted-foreground border-t pt-4">
            <span className="font-semibold text-foreground">Director:</span> {director}
          </p>
        )}
      </div>
    </section>
  );
}
