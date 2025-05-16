
import { useState, useCallback } from 'react';

type ToastVariant = 'default' | 'destructive' | 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: React.ReactNode;
  onDismiss?: () => void;
}

interface Toast extends ToastOptions {
  id: string;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(
    function showToast(options: ToastOptions | string) {
      const id = Math.random().toString(36).substring(2, 9);
      
      // Handle string shorthand
      const toastOptions: ToastOptions = typeof options === 'string'
        ? { description: options }
        : options;
      
      const newToast: Toast = {
        id,
        ...toastOptions,
      };
      
      setToasts((prevToasts) => [...prevToasts, newToast]);
      
      if (toastOptions.duration !== Infinity) {
        setTimeout(() => {
          setToasts((prevToasts) => 
            prevToasts.filter((toast) => toast.id !== id)
          );
          toastOptions.onDismiss?.();
        }, toastOptions.duration || 5000);
      }
      
      return id;
    },
    [setToasts]
  );
  
  const dismiss = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, [setToasts]);

  return {
    toasts,
    toast,
    dismiss,
  };
}

// Define the toast function type
interface ToastFunction {
  (options: ToastOptions | string): string;
  success: (options: ToastOptions | string) => string;
  error: (options: ToastOptions | string) => string;
  warning: (options: ToastOptions | string) => string;
  info: (options: ToastOptions | string) => string;
}

// Create and export the singleton toast object
const createToast = (): ToastFunction => {
  // Create the base function
  const fn = ((options: ToastOptions | string) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('toast', {
        detail: {
          options: typeof options === 'string' ? { description: options } : options
        }
      });
      window.dispatchEvent(event);
      return '';
    }
    return '';
  }) as ToastFunction;
  
  // Add the variant methods
  fn.success = (options: ToastOptions | string) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('toast', {
        detail: {
          options: typeof options === 'string' ? { description: options, variant: 'success' } : { ...options, variant: 'success' }
        }
      });
      window.dispatchEvent(event);
    }
    return '';
  };
  
  fn.error = (options: ToastOptions | string) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('toast', {
        detail: {
          options: typeof options === 'string' ? { description: options, variant: 'error' } : { ...options, variant: 'error' }
        }
      });
      window.dispatchEvent(event);
    }
    return '';
  };
  
  fn.warning = (options: ToastOptions | string) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('toast', {
        detail: {
          options: typeof options === 'string' ? { description: options, variant: 'warning' } : { ...options, variant: 'warning' }
        }
      });
      window.dispatchEvent(event);
    }
    return '';
  };
  
  fn.info = (options: ToastOptions | string) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('toast', {
        detail: {
          options: typeof options === 'string' ? { description: options, variant: 'info' } : { ...options, variant: 'info' }
        }
      });
      window.dispatchEvent(event);
    }
    return '';
  };
  
  return fn;
};

export const toast = createToast();
