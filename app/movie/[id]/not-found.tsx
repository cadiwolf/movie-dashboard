import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Film, Home, Search, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-md glass text-center">
        <CardHeader>
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Película no encontrada</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Lo sentimos, la película que buscas no existe o ha sido eliminada de nuestra base de datos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="default" className="button-glow">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Volver al inicio
              </Link>
            </Button>
            
            <Button asChild variant="outline">
              <Link href="/search">
                <Search className="h-4 w-4 mr-2" />
                Buscar películas
              </Link>
            </Button>
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Film className="h-3 w-3" />
              <span>Error 404 - Página no encontrada</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
