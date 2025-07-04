import EnhancedSEO from "@/components/common/EnhancedSEO";
import PageHeader from "@/components/common/PageHeader";
import ToolCard from "@/components/common/ToolCard";
import ToolCardSkeleton from "@/components/skeletons/ToolCardSkeleton";
import { PaginationControls } from "@/components/ui/pagination";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useTools, adaptToolsResponse } from "@/hooks/use-api";
import { formatToolsData } from "@/utils/formatters";
import { toast } from "@/components/ui/sonner";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const TOOLS_PER_PAGE = 12; // Exactly 12 tools per page (4 cards per row × 3 rows)

const TrendingToolsPage = () => {
  const isMobile = useIsMobile();
  
  // State to store formatted tools and pagination
  const [formattedTools, setFormattedTools] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch trending tools from the API with pagination
  const { 
    data: trendingToolsResponse,
    isLoading: loading,
    error
  } = useTools({ 
    trending: "true", 
    limit: String(TOOLS_PER_PAGE),
    page: String(currentPage - 1) // API uses 0-based indexing
  });
  
  // Smooth pagination handler that prevents scrolling
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Prevent default scroll behavior
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }, []);

  // Process and format tools data when it arrives
  useEffect(() => {
    if (trendingToolsResponse) {
      console.log("Trending tools response:", trendingToolsResponse);
      
      // Check if data follows the new API response format
      if ('tools' in trendingToolsResponse && Array.isArray(trendingToolsResponse.tools)) {
        // New API format (paginated response)
        const formatted = formatToolsData(trendingToolsResponse.tools);
        setFormattedTools(formatted);
        setTotalPages(trendingToolsResponse.totalPages || 1);
      } else {
        // Legacy format or direct array
        const toolsArray = adaptToolsResponse(trendingToolsResponse);
        const formatted = formatToolsData(toolsArray);
        
        // For client-side pagination
        const startIndex = (currentPage - 1) * TOOLS_PER_PAGE;
        const endIndex = startIndex + TOOLS_PER_PAGE;
        const paginatedTools = formatted.slice(startIndex, endIndex);
        
        setFormattedTools(paginatedTools);
        setTotalPages(Math.ceil(formatted.length / TOOLS_PER_PAGE));
      }
      
      console.log("Formatted trending tools:", formattedTools);
    }
  }, [trendingToolsResponse, currentPage]);
  
  // Show error toast if API request fails
  useEffect(() => {
    if (error) {
      toast.error("Error loading trending tools. Please try again later.");
      console.error("API error:", error);
    }
  }, [error]);

  // Generate structured data for trending tools page
  const structuredData = [
    {
      type: "WebSite" as const,
      data: {
        name: "Trending AI Tools - AI Productivity Hub",
        description: "Discover the most popular and trending AI tools for productivity and workflow optimization.",
        url: "https://alltopaitools.com/trending",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://alltopaitools.com/tools?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    },
    {
      type: "BreadcrumbList" as const,
      data: {
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://alltopaitools.com"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Trending Tools",
            item: "https://alltopaitools.com/trending"
          }
        ]
      }
    },
    {
      type: "FAQPage" as const,
      data: {
        mainEntity: [
          {
            "@type": "Question",
            name: "What makes an AI tool trending?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Trending AI tools are determined by a combination of recent user engagement, growth in popularity, positive reviews, and feature innovations. We regularly update our trending tools based on these metrics to showcase the most in-demand solutions."
            }
          },
          {
            "@type": "Question",
            name: "How often is the trending tools list updated?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We update our trending tools list weekly to ensure you're seeing the most current and popular AI productivity tools in the market."
            }
          },
          {
            "@type": "Question",
            name: "Are trending tools always paid solutions?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No, our trending tools include a mix of free, freemium, and premium solutions. The trending status is based on popularity and user engagement rather than pricing model."
            }
          }
        ]
      }
    }
  ];

  return (
    <>
      <EnhancedSEO 
        title="Trending AI Tools - AI Productivity Hub"
        description="Discover the most popular and trending AI tools for productivity and workflow optimization. Stay updated with the latest AI innovations transforming workflows."
        canonicalUrl="/trending"
        image="https://alltopaitools.com/og-image-trending.png"
        structuredData={structuredData}
      />
      
      <PageHeader 
        title="Trending AI Tools"
        description="Explore the most popular and trending AI tools that are transforming productivity and workflows."
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4 mr-1" aria-hidden="true" />
                <span>Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Trending Tools</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
            {Array(12).fill(0).map((_, index) => (
              <ToolCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        ) : formattedTools && formattedTools.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
              {formattedTools.map((tool) => (
                <ToolCard key={tool._id} tool={tool} />
              ))}
            </div>
            
            {/* Pagination - Positioned above FAQ section */}
            {totalPages > 1 && (
              <div className="mt-8 sm:mt-10">
                <PaginationControls 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  siblingCount={isMobile ? 0 : 1}
                />
              </div>
            )}
            
            {/* FAQ Section for SEO */}
            <div className="mt-16 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">What makes an AI tool trending?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Trending AI tools are determined by a combination of recent user engagement, growth in popularity, positive reviews, and feature innovations. We regularly update our trending tools based on these metrics to showcase the most in-demand solutions.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">How often is the trending tools list updated?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We update our trending tools list weekly to ensure you're seeing the most current and popular AI productivity tools in the market.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Are trending tools always paid solutions?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    No, our trending tools include a mix of free, freemium, and premium solutions. The trending status is based on popularity and user engagement rather than pricing model.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">How can I suggest a tool to be featured as trending?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    If you've discovered an exceptional AI tool that you believe deserves recognition, you can <Link to="/submit-tool" className="text-primary hover:underline">submit it</Link> for our review or contact our editorial team via the <Link to="/contact" className="text-primary hover:underline">contact page</Link>.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Related categories for internal linking */}
            <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-4">Explore AI Tools by Category</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <Link to="/tools/category/writing" className="text-primary hover:underline">AI Writing Tools</Link>
                <Link to="/tools/category/image-generation" className="text-primary hover:underline">AI Image Generation</Link>
                <Link to="/tools/category/coding" className="text-primary hover:underline">AI Coding Assistants</Link>
                <Link to="/tools/category/productivity" className="text-primary hover:underline">AI Productivity Tools</Link>
                <Link to="/tools/category/audio" className="text-primary hover:underline">AI Audio Tools</Link>
                <Link to="/tools/category/video" className="text-primary hover:underline">AI Video Tools</Link>
              </div>
            </div>
          </>
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
