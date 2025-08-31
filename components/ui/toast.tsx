"use client";

import { useEffect, useState } from 'react';
import { CheckCircle, X, Heart, HeartOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  icon?: React.ReactNode;
  duration?: number;
  onClose: () => void;
}

export function Toast({ 
  message, 
  type = 'success', 
  icon, 
  duration = 3000, 
  onClose 
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Slide in animation
    setIsVisible(true);
    
    // Auto dismiss
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for slide out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500/90 text-white border-green-600';
      case 'error':
        return 'bg-red-500/90 text-white border-red-600';
      case 'info':
        return 'bg-blue-500/90 text-white border-blue-600';
      default:
        return 'bg-primary/90 text-primary-foreground border-primary';
    }
  };

  const getDefaultIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'error':
        return <X className="w-4 h-4" />;
      default:
        return <Heart className="w-4 h-4" />;
    }
  };

  return (
    <div
      className={`fixed top-20 right-4 z-[100] transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border backdrop-blur-sm ${getTypeStyles()}`}>
        {icon || getDefaultIcon()}
        <span className="text-sm font-medium">{message}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="h-auto p-1 hover:bg-white/20 text-current"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}

// Toast Container Component
interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  icon?: React.ReactNode;
  duration?: number;
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  useEffect(() => {
    const handleToast = (event: CustomEvent<ToastMessage>) => {
      const newToast = {
        ...event.detail,
        id: Math.random().toString(36).substr(2, 9)
      };
      setToasts(prev => [...prev, newToast]);
    };

    window.addEventListener('show-toast' as any, handleToast);
    return () => window.removeEventListener('show-toast' as any, handleToast);
  }, []);

  return (
    <div className="fixed top-0 right-0 z-[100] pointer-events-none">
      <div className="flex flex-col gap-2 p-4">
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            className="pointer-events-auto"
            style={{ zIndex: 100 + index }}
          >
            <Toast
              message={toast.message}
              type={toast.type}
              icon={toast.icon}
              duration={toast.duration}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to show toasts
export const showToast = (toast: Omit<ToastMessage, 'id'>) => {
  window.dispatchEvent(new CustomEvent('show-toast', { detail: toast }));
};
