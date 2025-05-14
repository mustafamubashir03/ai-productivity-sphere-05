
import { Skeleton } from "@/components/ui/skeleton";

const ToolCardSkeleton = () => {
  return (
    <div className="tool-card group border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-md flex-shrink-0" />
        <div className="w-full">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>
      
      <div className="mt-3 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      
      {/* Features skeleton */}
      <div className="mt-3">
        <Skeleton className="h-3 w-24 mb-2" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </div>
      
      <div className="mt-4 pt-2">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
};

export default ToolCardSkeleton;
