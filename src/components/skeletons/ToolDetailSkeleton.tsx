
import { Skeleton } from "@/components/ui/skeleton";

const ToolDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back Button */}
      <div className="mb-6">
        <Skeleton className="h-5 w-32" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="w-16 h-16 rounded-md flex-shrink-0" />
            <Skeleton className="h-8 w-64" />
          </div>
          
          <div className="space-y-6">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
            
            <div className="mb-8">
              <Skeleton className="h-7 w-48 mb-3" />
              <div className="space-y-2 pl-5">
                <div className="flex items-center">
                  <Skeleton className="h-2 w-2 rounded-full mr-2" />
                  <Skeleton className="h-5 w-full" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-2 w-2 rounded-full mr-2" />
                  <Skeleton className="h-5 w-full" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-2 w-2 rounded-full mr-2" />
                  <Skeleton className="h-5 w-full" />
                </div>
              </div>
            </div>
            
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-5 w-full mb-6" />
            <Skeleton className="h-10 w-full rounded-md mb-6" />
            
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-5 w-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetailSkeleton;
