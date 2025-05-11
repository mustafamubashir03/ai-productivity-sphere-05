
import { Skeleton } from "@/components/ui/skeleton";

const CategoryCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 flex flex-col items-center text-center gap-3">
      <Skeleton className="w-16 h-16 rounded-full mb-2" />
      <Skeleton className="h-6 w-32 mb-1" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
};

export default CategoryCardSkeleton;
