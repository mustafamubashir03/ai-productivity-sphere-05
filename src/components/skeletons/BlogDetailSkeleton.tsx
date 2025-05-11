
import { Skeleton } from "@/components/ui/skeleton";

const BlogDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <Skeleton className="h-5 w-32" />
      </div>

      {/* Featured Image */}
      <div className="mb-8">
        <Skeleton className="w-full h-64 md:h-96 rounded-lg" />
      </div>

      {/* Post Header */}
      <div className="mb-8 text-center">
        <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-4 w-32 mx-auto" />
      </div>

      {/* Post Content */}
      <div className="max-w-3xl mx-auto space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        
        {/* Author Section */}
        <div className="mt-10 pt-10 border-t border-gray-200 dark:border-gray-700">
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
};

export default BlogDetailSkeleton;
