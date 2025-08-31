"use client";

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; reset: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const reset = () => this.setState({ hasError: false, error: undefined });
      
      if (this.props.fallback) {
        return <this.props.fallback error={this.state.error} reset={reset} />;
      }

      return <DefaultErrorFallback error={this.state.error} reset={reset} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, reset }: { error?: Error; reset: () => void }) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-xl">¡Oops! Algo salió mal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">
            {error?.message || 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button 
              onClick={reset} 
              variant="default" 
              className="button-glow"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Intentar de nuevo
            </Button>
            
            <Button asChild variant="outline">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Volver al inicio
              </Link>
            </Button>
          </div>
          
          {process.env.NODE_ENV === 'development' && error?.stack && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm font-medium">
                Detalles técnicos (desarrollo)
              </summary>
              <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto max-h-32">
                {error.stack}
              </pre>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Hook para manejar errores en componentes funcionales
export function useErrorHandler() {
  return (error: Error, errorInfo?: React.ErrorInfo) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo);
    // Aquí podrías enviar el error a un servicio de logging como Sentry
  };
}
