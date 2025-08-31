"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, Sparkles } from 'lucide-react';

interface SearchBarProps {
  initialQuery?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchBar({ 
  initialQuery = '', 
  placeholder = 'Buscar películas...', 
  autoFocus = false 
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const clearSearch = () => {
    setQuery('');
    if (initialQuery) {
      router.push('/search');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsFocused(false);
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex w-full max-w-md group">
      <div className={`relative flex-1 transition-all duration-300 ${
        isFocused ? 'scale-105' : 'scale-100'
      }`}>
        {/* Background glow effect */}
        <div className={`absolute inset-0 bg-primary/20 blur-md rounded-md opacity-0 transition-opacity duration-300 ${
          isFocused ? 'opacity-100' : 'opacity-0'
        }`} />
        
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-all duration-200 ${
            isFocused ? 'text-primary scale-110' : 'text-muted-foreground'
          }`} />
          
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            autoFocus={autoFocus}
            className={`pl-10 pr-10 transition-all duration-200 glass ${
              isFocused 
                ? 'ring-2 ring-primary/50 border-primary/50 bg-background/80' 
                : 'border-muted hover:border-primary/30'
            }`}
          />
          
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0 hover:bg-destructive/20 hover:text-destructive transition-all duration-200 hover:scale-110"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      <Button 
        type="submit" 
        className={`ml-2 button-glow relative overflow-hidden transition-all duration-200 ${
          query.trim() ? 'hover:scale-105' : ''
        }`}
        disabled={!query.trim()}
      >
        <Sparkles className="h-4 w-4 mr-1" />
        Buscar
      </Button>
    </form>
  );
}
