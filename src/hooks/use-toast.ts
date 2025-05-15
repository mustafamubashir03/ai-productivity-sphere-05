
import { useState, useCallback } from 'react';

type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastType;
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

  // Add common toast variants
  toast.success = (options: ToastOptions | string) => {
    const toastOptions = typeof options === 'string' 
      ? { description: options, variant: 'success' as ToastType }
      : { ...options, variant: 'success' as ToastType };
    return toast(toastOptions);
  };
  
  toast.error = (options: ToastOptions | string) => {
    const toastOptions = typeof options === 'string' 
      ? { description: options, variant: 'error' as ToastType }
      : { ...options, variant: 'error' as ToastType };
    return toast(toastOptions);
  };
  
  toast.warning = (options: ToastOptions | string) => {
    const toastOptions = typeof options === 'string' 
      ? { description: options, variant: 'warning' as ToastType }
      : { ...options, variant: 'warning' as ToastType };
    return toast(toastOptions);
  };
  
  toast.info = (options: ToastOptions | string) => {
    const toastOptions = typeof options === 'string' 
      ? { description: options, variant: 'info' as ToastType }
      : { ...options, variant: 'info' as ToastType };
    return toast(toastOptions);
  };

  return {
    toasts,
    toast,
    dismiss,
  };
}

// Export a singleton for easy use
export const toast = {
  success: (options: ToastOptions | string) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('toast', {
        detail: {
          options: typeof options === 'string' ? { description: options, variant: 'success' } : { ...options, variant: 'success' }
        }
      });
      window.dispatchEvent(event);
    }
  },
  error: (options: ToastOptions | string) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('toast', {
        detail: {
          options: typeof options === 'string' ? { description: options, variant: 'error' } : { ...options, variant: 'error' }
        }
      });
      window.dispatchEvent(event);
    }
  },
  warning: (options: ToastOptions | string) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('toast', {
        detail: {
          options: typeof options === 'string' ? { description: options, variant: 'warning' } : { ...options, variant: 'warning' }
        }
      });
      window.dispatchEvent(event);
    }
  },
  info: (options: ToastOptions | string) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('toast', {
        detail: {
          options: typeof options === 'string' ? { description: options, variant: 'info' } : { ...options, variant: 'info' }
        }
      });
      window.dispatchEvent(event);
    }
  },
  // Default toast
  (options: ToastOptions | string) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('toast', {
        detail: {
          options: typeof options === 'string' ? { description: options } : options
        }
      });
      window.dispatchEvent(event);
    }
  }
};
