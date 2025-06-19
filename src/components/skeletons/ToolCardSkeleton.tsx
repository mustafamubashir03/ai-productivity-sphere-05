
import { Skeleton } from "@/components/ui/skeleton";

const ToolCardSkeleton = () => {
  return (
    <div className="tool-card bg-white dark:bg-gray-800 p-3 sm:p-4 lg:p-5 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 h-full flex flex-col">
      <div className="flex items-center gap-2 sm:gap-3">
        <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-md flex-shrink-0" />
        <div className="w-full">
          <Skeleton className="h-3 sm:h-4 lg:h-5 w-20 sm:w-24 lg:w-32 mb-1 sm:mb-2" />
          <Skeleton className="h-2 sm:h-3 lg:h-4 w-12 sm:w-16 lg:w-20" />
        </div>
      </div>
      
      <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2 flex-1">
        <Skeleton className="h-2 sm:h-3 lg:h-4 w-full" />
        <Skeleton className="h-2 sm:h-3 lg:h-4 w-full" />
        <Skeleton className="h-2 sm:h-3 lg:h-4 w-3/4" />
      </div>
      
      {/* Pricing badge skeleton */}
      <div className="mt-2 sm:mt-3">
        <Skeleton className="h-4 sm:h-5 w-16 sm:w-20 rounded-full" />
      </div>
      
      {/* Features skeleton */}
      <div className="mt-2 sm:mt-3">
        <Skeleton className="h-2 sm:h-3 w-16 sm:w-20 lg:w-24 mb-1 sm:mb-2" />
        <div className="flex gap-1 sm:gap-2">
          <Skeleton className="h-3 sm:h-4 lg:h-5 w-10 sm:w-12 lg:w-16 rounded-full" />
          <Skeleton className="h-3 sm:h-4 lg:h-5 w-12 sm:w-16 lg:w-20 rounded-full" />
        </div>
      </div>
      
      <div className="mt-2 sm:mt-3 pt-1">
        <Skeleton className="h-7 sm:h-8 w-full rounded-md" />
      </div>
    </div>
  );
};

export default ToolCardSkeleton;
