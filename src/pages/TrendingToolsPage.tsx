
import SEOHead from "@/components/common/SEOHead";
import PageHeader from "@/components/common/PageHeader";
import ToolCard from "@/components/common/ToolCard";
import ToolCardSkeleton from "@/components/skeletons/ToolCardSkeleton";
import { useState, useEffect } from "react";
import { useTools } from "@/hooks/use-api";
import { toast } from "@/components/ui/sonner";

const TrendingToolsPage = () => {
  // Fetch trending tools from the API
  const { 
    data: trendingTools,
    isLoading: loading,
    error
  } = useTools({ trending: "true", limit: "12" });
  
  // Show error toast if API request fails
  useEffect(() => {
    if (error) {
      toast.error("Error loading trending tools. Please try again later.");
      console.error("API error:", error);
    }
  }, [error]);

  return (
    <>
      <SEOHead 
        title="Trending AI Tools - AI Productivity Hub"
        description="Discover the most popular and trending AI tools for productivity and workflow optimization."
      />
      
      <PageHeader 
        title="Trending AI Tools"
        description="Explore the most popular and trending AI tools that are transforming productivity and workflows."
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, index) => (
              <ToolCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        ) : trendingTools && trendingTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingTools.map((tool) => (
              <ToolCard key={tool._id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">No trending tools found</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Check back soon for updates on trending AI tools.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default TrendingToolsPage;
