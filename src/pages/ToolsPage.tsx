
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import EnhancedSEO from "@/components/common/EnhancedSEO";
import PageHeader from "@/components/common/PageHeader";
import ToolCard, { Tool } from "@/components/common/ToolCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search } from "lucide-react";
import { categories } from "@/data/categories";
import ToolCardSkeleton from "@/components/skeletons/ToolCardSkeleton";
import CompareBar from "@/components/tools/CompareBar";
import FilterSidebar from "@/components/tools/FilterSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTools } from "@/hooks/use-api";

const TOOLS_PER_PAGE = 9;

const ToolsPage = () => {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(categorySlug || null);
  const [activeIndustry, setActiveIndustry] = useState<string | null>(searchParams.get("industry") || null);
  const [activeUseCase, setActiveUseCase] = useState<string | null>(searchParams.get("useCase") || null);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page") || "1", 10));
  
  // Create parameters for API request
  const apiParams: Record<string, string> = {};
  if (activeCategory) apiParams.category = activeCategory;
  if (activeIndustry) apiParams.industry = activeIndustry;
  if (activeUseCase) apiParams.useCase = activeUseCase;
  if (searchQuery) apiParams.search = searchQuery;
  
  // Fetch tools data from API
  const { data: toolsData, isLoading: loading } = useTools(apiParams);
  const tools: Tool[] = toolsData || [];
  
  // Filter tools client-side if needed (API should handle most filtering)
  const filteredTools = tools;
  
  useEffect(() => {
    // Update URL with filters without page reload
    const params = new URLSearchParams();
    if (currentPage > 1) params.set("page", String(currentPage));
    if (activeIndustry) params.set("industry", activeIndustry);
    if (activeUseCase) params.set("useCase", activeUseCase);
    setSearchParams(params, { replace: true });
  }, [currentPage, activeIndustry, activeUseCase]);
  
  useEffect(() => {
    if (categorySlug !== activeCategory) {
      setActiveCategory(categorySlug || null);
      setCurrentPage(1); // Reset pagination when category changes
    }
  }, [categorySlug]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset pagination when searching
  };
  
  const handleCategoryClick = (slug: string | null) => {
    if (slug === activeCategory) {
      // If clicking the active category, just update params
      const params = new URLSearchParams(searchParams);
      params.delete("page");
      setSearchParams(params);
      setActiveCategory(null);
    } else {
      // Navigate to new category using React Router
      navigate(slug ? `/tools/category/${slug}` : '/tools', {
        replace: true,
      });
      setActiveCategory(slug);
    }
    setCurrentPage(1);
  };
  
  const handleIndustryChange = (industrySlug: string | null) => {
    setActiveIndustry(industrySlug);
    setCurrentPage(1); // Reset pagination when industry changes
  };
  
  const handleUseCaseChange = (useCaseSlug: string | null) => {
    setActiveUseCase(useCaseSlug);
    setCurrentPage(1); // Reset pagination when use case changes
  };
  
  // Calculate pagination
  const totalTools = filteredTools.length;
  const totalPages = Math.ceil(totalTools / TOOLS_PER_PAGE);
  const paginatedTools = filteredTools.slice(
    (currentPage - 1) * TOOLS_PER_PAGE,
    currentPage * TOOLS_PER_PAGE
  );
  
  // Determine title and description based on active filters
  let title = "All AI Tools";
  let description = "Browse our comprehensive collection of AI productivity tools to find the perfect solutions for your workflow.";
  
  if (activeCategory) {
    const category = categories.find(cat => cat.slug === activeCategory);
    if (category) {
      title = category.name;
      description = category.description;
    }
  }

  // Generate structured data
  const structuredData = [
    {
      type: "FAQPage" as const,
      data: {
        mainEntity: [
          {
            "@type": "Question",
            name: `What are the best ${title.toLowerCase()}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `We've curated the top-rated ${title.toLowerCase()} for productivity and efficiency. Browse our selection to find the perfect tool for your needs.`
            }
          },
          {
            "@type": "Question",
            name: "Are these AI tools free or paid?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our collection includes both free and paid AI tools. Many offer freemium models, allowing you to test before committing to a paid plan."
            }
          }
        ]
      }
    }
  ];

  return (
    <>
      <EnhancedSEO 
        title={`${title} - Top Rated AI`}
        description={`Discover top ${title.toLowerCase()} to enhance your productivity and workflow efficiency.`}
        structuredData={structuredData}
      />
      
      <PageHeader title={title} description={description} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-700 shadow-sm"
              />
            </div>
          </form>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <Button
              key="all"
              variant={activeCategory === null ? "default" : "outline"}
              onClick={() => handleCategoryClick(null)}
              type="button"
              className={cn(
                "mb-2 dark:border-gray-700 dark:text-gray-200",
                "hover:bg-primary/90 transition-colors"
              )}
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.slug ? "default" : "outline"}
                onClick={() => handleCategoryClick(cat.slug)}
                type="button"
                className={cn(
                  "mb-2 dark:border-gray-700 dark:text-gray-200",
                  "hover:bg-primary/90 transition-colors"
                )}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <FilterSidebar
            onSelectIndustry={handleIndustryChange}
            onSelectUseCase={handleUseCaseChange}
            activeIndustry={activeIndustry}
            activeUseCase={activeUseCase}
            isMobile={isMobile}
          />
          
          {/* Tools Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array(6).fill(0).map((_, index) => (
                  <ToolCardSkeleton key={`skeleton-${index}`} />
                ))}
              </div>
            ) : paginatedTools.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {paginatedTools.map((tool) => (
                    <ToolCard key={tool._id} tool={tool} />
                  ))}
                </div>
                
                {/* Pagination - Only show if we have more than one page */}
                {totalPages > 1 && (
                  <div className="mt-10">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className={`${currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} dark:text-gray-300 dark:hover:text-white`}
                          />
                        </PaginationItem>
                        
                        {[...Array(totalPages)].map((_, i) => {
                          // Only display a limited number of pagination links on mobile
                          if (isMobile && totalPages > 5) {
                            // Always show first, last, current and adjacent pages
                            if (
                              i === 0 || 
                              i === totalPages - 1 || 
                              i === currentPage - 1 ||
                              i === currentPage - 2 ||
                              i === currentPage
                            ) {
                              return (
                                <PaginationItem key={i}>
                                  <PaginationLink
                                    isActive={currentPage === i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className="cursor-pointer dark:text-gray-300 dark:hover:text-white"
                                  >
                                    {i + 1}
                                  </PaginationLink>
                                </PaginationItem>
                              );
                            } else if (
                              (i === 1 && currentPage > 3) || 
                              (i === totalPages - 2 && currentPage < totalPages - 2)
                            ) {
                              // Add ellipsis where needed
                              return (
                                <PaginationItem key={i}>
                                  <span className="px-4 py-2 dark:text-gray-400">...</span>
                                </PaginationItem>
                              );
                            }
                            return null;
                          }
                          
                          // On desktop, show all pagination links
                          return (
                            <PaginationItem key={i}>
                              <PaginationLink
                                isActive={currentPage === i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className="cursor-pointer dark:text-gray-300 dark:hover:text-white"
                              >
                                {i + 1}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        })}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} dark:text-gray-300 dark:hover:text-white`}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">No tools found</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory(null);
                    setActiveIndustry(null);
                    setActiveUseCase(null);
                    setCurrentPage(1);
                  }}
                  variant="outline"
                  className="mt-4"
                  type="button"
                >
                  Reset all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Compare Bar */}
      <CompareBar />
    </>
  );
};

export default ToolsPage;
