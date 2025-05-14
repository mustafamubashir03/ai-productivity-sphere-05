
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import EnhancedSEO from "@/components/common/EnhancedSEO";
import PageHeader from "@/components/common/PageHeader";
import ToolCard, { Tool } from "@/components/common/ToolCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search } from "lucide-react";
import { tools, getToolsByCategory, getToolsByIndustry, getToolsByUseCase } from "@/data/tools";
import { categories } from "@/data/categories";
import { industries } from "@/data/industries";
import { useCases } from "@/data/useCases";
import ToolCardSkeleton from "@/components/skeletons/ToolCardSkeleton";
import IndustryFilter from "@/components/tools/IndustryFilter";
import UseCaseFilter from "@/components/tools/UseCaseFilter";
import CompareBar from "@/components/tools/CompareBar";

const TOOLS_PER_PAGE = 9;

const ToolsPage = () => {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(categorySlug || null);
  const [activeIndustry, setActiveIndustry] = useState<string | null>(searchParams.get("industry") || null);
  const [activeUseCase, setActiveUseCase] = useState<string | null>(searchParams.get("useCase") || null);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page") || "1", 10));
  const [loading, setLoading] = useState(true);
  
  // Find category, industry or use case by slug
  const category = categorySlug ? categories.find(cat => cat.slug === categorySlug) : null;
  const industry = activeIndustry ? industries.find(ind => ind.slug === activeIndustry) : null;
  const useCase = activeUseCase ? useCases.find(uc => uc.slug === activeUseCase) : null;
  
  useEffect(() => {
    // Update URL with filters
    const params = new URLSearchParams();
    if (currentPage > 1) params.set("page", String(currentPage));
    if (activeIndustry) params.set("industry", activeIndustry);
    if (activeUseCase) params.set("useCase", activeUseCase);
    setSearchParams(params);
    
    // Simulate data fetching delay
    const timer = setTimeout(() => {
      let result = [...tools];
      
      // Filter by category if provided
      if (activeCategory) {
        result = getToolsByCategory(activeCategory);
      }
      
      // Filter by industry if provided
      if (activeIndustry) {
        const industryTools = getToolsByIndustry(activeIndustry);
        result = activeCategory 
          ? result.filter(tool => industryTools.some(t => t.id === tool.id))
          : industryTools;
      }
      
      // Filter by use case if provided
      if (activeUseCase) {
        const useCaseTools = getToolsByUseCase(activeUseCase);
        result = result.filter(tool => useCaseTools.some(t => t.id === tool.id));
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(
          tool => tool.name.toLowerCase().includes(query) || 
                 tool.description.toLowerCase().includes(query)
        );
      }
      
      setFilteredTools(result);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [searchQuery, activeCategory, activeIndustry, activeUseCase, categorySlug, currentPage]);
  
  useEffect(() => {
    if (categorySlug !== activeCategory) {
      setActiveCategory(categorySlug || null);
      setCurrentPage(1); // Reset pagination when category changes
      setLoading(true);
    }
  }, [categorySlug]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset pagination when searching
    // The filtering is already handled by the useEffect
  };
  
  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug === activeCategory ? null : slug);
    setCurrentPage(1); // Reset pagination when category changes
    setLoading(true);
  };
  
  const handleIndustryChange = (industrySlug: string | null) => {
    setActiveIndustry(industrySlug);
    setCurrentPage(1); // Reset pagination when industry changes
    setLoading(true);
  };
  
  const handleUseCaseChange = (useCaseSlug: string | null) => {
    setActiveUseCase(useCaseSlug);
    setCurrentPage(1); // Reset pagination when use case changes
    setLoading(true);
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
  
  if (category) {
    title = category.name;
    description = category.description;
  } else if (industry) {
    title = `AI Tools for ${industry.name}`;
    description = industry.description;
  } else if (useCase) {
    title = `AI Tools for ${useCase.name}`;
    description = useCase.description;
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
        title={`${title} - AI Productivity Hub`}
        description={`Discover top ${title.toLowerCase()} to enhance your productivity and workflow efficiency.`}
        structuredData={structuredData}
      />
      
      <PageHeader title={title} description={description} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search and Filter */}
        <div className="mb-10 space-y-6">
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
            </div>
          </form>
          
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              key="all"
              variant={activeCategory === null ? "default" : "outline"}
              onClick={() => handleCategoryClick(null)}
              className="mb-2 dark:border-gray-700 dark:text-gray-200"
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.slug ? "default" : "outline"}
                onClick={() => handleCategoryClick(cat.slug)}
                className="mb-2 dark:border-gray-700 dark:text-gray-200"
              >
                {cat.name}
              </Button>
            ))}
          </div>
          
          {/* Industry Filter */}
          <IndustryFilter onSelectIndustry={handleIndustryChange} activeIndustry={activeIndustry} />
          
          {/* Use Case Filter */}
          <UseCaseFilter onSelectUseCase={handleUseCaseChange} activeUseCase={activeUseCase} />
        </div>
        
        {/* Tools Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, index) => (
              <ToolCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        ) : paginatedTools.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
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
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          isActive={currentPage === i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className="cursor-pointer dark:text-gray-300 dark:hover:text-white"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
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
          <div className="text-center py-10">
            <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">No tools found</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
      
      {/* Compare Bar */}
      <CompareBar />
    </>
  );
};

export default ToolsPage;
