
import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      isActive && "pointer-events-none bg-primary/10 border-primary/20 text-primary",
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5 font-medium", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5 font-medium", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

/**
 * Enhanced pagination component for Blog page
 */
type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: PaginationControlsProps) => {
  // Generate page numbers
  const generatePagination = () => {
    const pages = [];
    
    // Always include first page and last page
    if (totalPages <= 5) {
      // Less than 5 pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push({ type: 'page', number: i });
      }
    } else {
      // Always add first page
      pages.push({ type: 'page', number: 1 });
      
      // Calculate start and end of the middle section
      const startPage = Math.max(2, currentPage - siblingCount);
      const endPage = Math.min(totalPages - 1, currentPage + siblingCount);
      
      // Add ellipsis if needed before middle section
      if (startPage > 2) {
        pages.push({ type: 'ellipsis' });
      } else if (startPage === 2) {
        pages.push({ type: 'page', number: 2 });
      }
      
      // Add middle pages
      for (let i = Math.max(2, startPage); i <= Math.min(totalPages - 1, endPage); i++) {
        pages.push({ type: 'page', number: i });
      }
      
      // Add ellipsis if needed after middle section
      if (endPage < totalPages - 1) {
        pages.push({ type: 'ellipsis' });
      } else if (endPage === totalPages - 1) {
        pages.push({ type: 'page', number: totalPages - 1 });
      }
      
      // Always add last page
      if (totalPages > 1) {
        pages.push({ type: 'page', number: totalPages });
      }
    }
    
    return pages;
  };
  
  const pages = generatePagination();
  
  // If there's only one page, don't show pagination
  if (totalPages <= 1) {
    return null;
  }
  
  return (
    <Pagination className="mt-8 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={cn(
              "cursor-pointer",
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            )}
          />
        </PaginationItem>
        
        {pages.map((page, i) => (
          <PaginationItem key={`${page.type}-${i}`}>
            {page.type === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink 
                isActive={currentPage === page.number}
                onClick={() => onPageChange(page.number)}
                className={cn(
                  "cursor-pointer",
                  currentPage === page.number ? "font-bold" : ""
                )}
              >
                {page.number}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            className={cn(
              "cursor-pointer",
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationControls, // Exporting the enhanced component
}
