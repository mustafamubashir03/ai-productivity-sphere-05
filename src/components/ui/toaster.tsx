
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        // Map custom variants to appropriate base variants
        let mappedVariant = variant;
        if (variant === 'success' || variant === 'error' || 
            variant === 'warning' || variant === 'info') {
          mappedVariant = 'default';
        }
        
        // Add variant-specific styling
        let className = "";
        if (variant === 'success') {
          className = "border-green-500 bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-300";
        } else if (variant === 'error') {
          className = "border-red-500 bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-300";
        } else if (variant === 'warning') {
          className = "border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-900/20 dark:text-amber-300";
        } else if (variant === 'info') {
          className = "border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-300";
        }

        return (
          <Toast key={id} {...props} variant={mappedVariant as "default" | "destructive"} className={className}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
