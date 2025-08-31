"use client";

import Link from 'next/link';
import { SearchBar } from '@/components/search';
import { ThemeToggle } from './theme-toggle';
import { Heart, Search, Menu, X, Zap, Database, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useFavorites } from '@/hooks/use-favorites';
import { Badge } from '@/components/ui/badge';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { favorites } = useFavorites();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'MATRIZ', icon: Database, active: pathname === '/' },
    { href: '/search', label: 'SCAN', icon: Search, active: pathname === '/search' },
    { href: '/favorites', label: 'ARCHIVE', icon: Heart, active: pathname === '/favorites' },
  ];

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-500 ${
      isScrolled 
        ? 'glass-neon border-b border-primary/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)]' 
        : 'holographic-card border-b border-primary/20'
    }`}>
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex h-16 items-center justify-between">
          {/* Cyber Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-md rounded-full animate-pulse"></div>
              <Monitor className="h-7 w-7 text-primary transition-all duration-300 group-hover:scale-110 group-hover:text-neon-cyan relative z-10 animate-glow" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg gradient-text font-mono">CINE</span>
              <span className="text-xs text-muted-foreground font-mono -mt-1">MATRIX_V2.0</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`relative group px-4 py-2 text-sm font-mono font-medium rounded-lg transition-all duration-300 hover:scale-105 ${
                    link.active 
                      ? 'text-neon glass-neon border border-primary/50 animate-neon-pulse' 
                      : 'text-muted-foreground hover:text-neon-cyan hover:glass-neon'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <IconComponent className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>
                  {link.active && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-glow" />
                  )}
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              );
            })}
          </div>
          
          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            {/* Desktop Search */}
            <div className="hidden lg:block">
              <SearchBar />
            </div>
            
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden button-glow glass-neon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-4 w-4 text-neon-cyan" />
            </Button>
            
            {/* Cyber Favorites Archive */}
            <Link href="/favorites">
              <Button
                variant="ghost"
                size="icon"
                className="relative button-glow glass-neon hover:scale-110 transition-all duration-300"
              >
                <Heart className={`h-4 w-4 transition-colors duration-300 ${
                  pathname === '/favorites' 
                    ? 'fill-current text-neon-pink animate-pulse' 
                    : 'text-muted-foreground hover:text-neon-pink'
                }`} />
                {favorites.length > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-neon-pulse bg-neon-pink border-0 font-mono"
                  >
                    {favorites.length}
                  </Badge>
                )}
                {/* Data indicator */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-neon-cyan rounded-full animate-pulse"></div>
              </Button>
            </Link>
            
            <ThemeToggle />
            
            {/* Mobile Cyber Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden button-glow glass-neon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? 
                <X className="h-4 w-4 text-neon-pink" /> : 
                <Menu className="h-4 w-4 text-neon-cyan" />
              }
            </Button>
          </div>
        </div>
        
        {/* Mobile Cyber Search */}
        {isSearchOpen && (
          <div className="pb-4 lg:hidden animate-slide-in-up glass-neon rounded-lg m-4 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-muted-foreground">ESCÁNER ACTIVO</span>
            </div>
            <SearchBar />
          </div>
        )}
        
        {/* Mobile Cyber Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-primary/30 holographic-card animate-slide-in-up">
            <div className="px-4 pt-4 pb-6 space-y-2">
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="w-4 h-4 text-neon-yellow animate-pulse" />
                <span className="text-sm font-mono text-muted-foreground">MENÚ DE NAVEGACIÓN</span>
              </div>
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center space-x-3 px-4 py-3 text-base font-mono font-medium rounded-lg transition-all duration-300 ${
                      link.active
                        ? 'text-neon glass-neon border border-primary/50 animate-neon-pulse'
                        : 'text-muted-foreground hover:text-neon-cyan hover:glass-neon'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{link.label}</span>
                    {link.active && (
                      <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
