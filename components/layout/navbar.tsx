"use client";

import Link from 'next/link';
import { SearchBar } from '@/components/search';
import { ThemeToggle } from './theme-toggle';
import { Heart, Search, Menu, X, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useFavorites } from '@/hooks/use-favorites';
import { Badge } from '@/components/ui/badge';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { favoritesCount, isLoaded } = useFavorites();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Inicio', active: pathname === '/' },
    { href: '/search', label: 'Buscar', active: pathname === '/search' },
    { href: '/favorites', label: 'Favoritos', active: pathname === '/favorites' },
  ];

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' 
        : 'bg-background/80 backdrop-blur-sm border-b border-border/50'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Film className="h-6 w-6 text-primary transition-colors duration-200 group-hover:text-primary/80" />
            <span className="font-semibold text-xl">MovieDash</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  link.active 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Desktop Search */}
            <div className="hidden lg:block">
              <SearchBar />
            </div>
            
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-4 w-4" />
            </Button>
            
            {/* Favorites */}
            <Link href="/favorites">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-muted/50 transition-colors duration-200"
              >
                <Heart className={`h-4 w-4 transition-colors duration-200 ${
                  pathname === '/favorites' 
                    ? 'fill-current text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`} />
                {isLoaded && favoritesCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {favoritesCount > 99 ? '99+' : favoritesCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <ThemeToggle />
            
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? 
                <X className="h-4 w-4" /> : 
                <Menu className="h-4 w-4" />
              }
            </Button>
          </div>
        </div>
        
        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="pb-4 lg:hidden">
            <div className="bg-muted/50 rounded-lg p-4">
              <SearchBar />
            </div>
          </div>
        )}
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                    link.active
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
