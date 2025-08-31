"use client";

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="glass button-glow">
        <Sun className="h-4 w-4 animate-pulse" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative glass button-glow overflow-hidden group hover:scale-110 transition-transform"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {/* Background animation */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-yellow-200 to-orange-300'
      }`} />
      
      {/* Icons with smooth transition */}
      <div className="relative">
        <Sun className={`h-4 w-4 absolute transition-all duration-500 ${
          isDark 
            ? 'rotate-90 scale-0 opacity-0' 
            : 'rotate-0 scale-100 opacity-100'
        }`} />
        <Moon className={`h-4 w-4 absolute transition-all duration-500 ${
          isDark 
            ? 'rotate-0 scale-100 opacity-100' 
            : '-rotate-90 scale-0 opacity-0'
        }`} />
      </div>
      
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-md opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${
        isDark 
          ? 'bg-blue-400 blur-md' 
          : 'bg-yellow-400 blur-md'
      }`} />
      
      <span className="sr-only">
        {isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      </span>
    </Button>
  );
}
