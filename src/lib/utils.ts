
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFilterLayoutClasses(isMobile: boolean) {
  return {
    container: cn(
      "bg-white dark:bg-gray-800 border rounded-lg shadow-sm transition-all",
      isMobile ? "w-full" : "lg:sticky lg:top-20"
    ),
    header: "flex items-center justify-between px-4 py-3 border-b",
    content: "p-4 space-y-6",
    sectionTitle: "text-lg font-medium mb-3 text-gray-800 dark:text-gray-200",
    buttonGroup: "space-y-2",
    button: "w-full justify-start text-left",
  }
}
