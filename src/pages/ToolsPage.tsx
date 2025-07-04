import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import EnhancedSEO from "@/components/common/EnhancedSEO";
import PageHeader from "@/components/common/PageHeader";
import ToolCard from "@/components/common/ToolCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PaginationControls } from "@/components/ui/pagination";
import { Search, Home, ChevronDown } from "lucide-react";
import { categories, getCategoryBySlug } from "@/data/categories";
import ToolCardSkeleton from "@/components/skeletons/ToolCardSkeleton";
import CompareBar from "@/components/tools/CompareBar";
import FilterSidebar from "@/components/tools/FilterSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTools } from "@/hooks/use-api";
import { toast } from "@/components/ui/sonner";
import { Tool, ToolsApiResponse } from "@/types/tools";
import { adaptToolsResponse } from "@/hooks/use-api";
import { formatToolsData } from "@/utils/formatters";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { blogPosts, getBlogPosts } from "@/data/blog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const TOOLS_PER_PAGE = 12; // Exactly 12 tools per page (4 cards per row × 3 rows)

const ToolsPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // State for filters and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(categorySlug || null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);
  const [activeUseCase, setActiveUseCase] = useState<string | null>(null);
  const [activePricingModel, setActivePricingModel] = useState<string | null>(null);
  const [activePlatform, setActivePlatform] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [paginationInfo, setPaginationInfo] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1
  });
  
  // Prepare API params based on filters
  const apiParams = useMemo(() => {
    const params: Record<string, string> = {};
    if (activeCategory) params.category = activeCategory;
    if (activeIndustry) params.industry = activeIndustry;
    if (activeUseCase) params.useCase = activeUseCase;
    if (activePricingModel) params.pricingModel = activePricingModel;
    if (activePlatform) params.platform = activePlatform;
    if (searchQuery) params.search = searchQuery;
    
    // Handle pagination for server-side pagination
    params.page = String(currentPage - 1); // API uses 0-based indexing
    params.limit = String(TOOLS_PER_PAGE);
    
    return params;
  }, [activeCategory, activeIndustry, activeUseCase, activePricingModel, activePlatform, searchQuery, currentPage]);
  
  // Fetch tools based on filters
  const { data: toolsData, isLoading: loading, error } = useTools(apiParams);
  
  // Store all fetched tools in state after formatting
  useEffect(() => {
    if (toolsData) {
      console.log("Tools data:", toolsData.tools.length);
      
      // Check if data follows the new API response format
      if ('tools' in toolsData && Array.isArray(toolsData.tools)) {
        // New API format (paginated response)
        const apiResponse = toolsData as ToolsApiResponse;
        const formattedTools = formatToolsData(apiResponse.tools);
        
        setAllTools(formattedTools);
        setPaginationInfo({
          totalItems: apiResponse.totalItems || 0,
          totalPages: apiResponse.totalPages || 1,
          currentPage: (apiResponse.currentPage || 0) + 1 // Convert from 0-based to 1-based
        });
      } else {
        // Legacy format or direct array
        const toolsArray = adaptToolsResponse(toolsData);
        const formattedTools = formatToolsData(toolsArray);
        
        setAllTools(formattedTools);
        setPaginationInfo({
          totalItems: formattedTools.length,
          totalPages: Math.ceil(formattedTools.length / TOOLS_PER_PAGE),
          currentPage: 1
        });
      }
    }
  }, [toolsData]);
  
  // Show toast error if API request fails
  useEffect(() => {
    if (error) {
      toast.error("Error loading tools. Please try again later.");
      console.error("API error:", error);
    }
  }, [error]);
  
  // Client-side filtering for subcategories (since they're not directly filterable via API)
  const filteredTools = useMemo(() => {
    if (!allTools.length) return [];
    
    if (activeSubcategory) {
      return allTools.filter(tool => 
        tool.subcategories && 
        tool.subcategories.includes(activeSubcategory)
      );
    }
    
    return allTools;
  }, [allTools, activeSubcategory]);
  
  // Update URL when category changes (without page reload)
  useEffect(() => {
    if (categorySlug !== activeCategory) {
      setActiveCategory(categorySlug || null);
      setCurrentPage(1); // Reset pagination when category changes
    }
  }, [categorySlug, activeCategory]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset pagination when searching
  };
  
  const handleCategoryClick = (e: React.MouseEvent, slug: string | null) => {
    e.preventDefault(); // Prevent default action
    e.stopPropagation(); // Stop event propagation
    
    setActiveCategory(slug);
    setActiveSubcategory(null); // Reset subcategory when category changes
    setCurrentPage(1); // Reset pagination when category changes
    
    // Update the URL without causing a page refresh
    const path = slug ? `/tools/category/${slug}` : '/tools';
    navigate(path, { replace: true });
  };
  
  const handleCategoryTabChange = (value: string) => {
    const categorySlug = value === "all" ? null : value;
    setActiveCategory(categorySlug);
    setActiveSubcategory(null);
    setCurrentPage(1);
    
    // Update the URL
    const path = categorySlug ? `/tools/category/${categorySlug}` : '/tools';
    navigate(path, { replace: true });
  };
  
  const handleIndustryChange = (industrySlug: string | null) => {
    setActiveIndustry(industrySlug);
    setCurrentPage(1); // Reset pagination when industry changes
  };
  
  const handleUseCaseChange = (useCaseSlug: string | null) => {
    setActiveUseCase(useCaseSlug);
    setCurrentPage(1); // Reset pagination when use case changes
  };

  const handlePricingModelChange = (pricingModel: string | null) => {
    setActivePricingModel(pricingModel);
    setCurrentPage(1);
  };

  const handlePlatformChange = (platform: string | null) => {
    setActivePlatform(platform);
    setCurrentPage(1);
  };

  const handleSubcategoryChange = (subcategory: string | null) => {
    setActiveSubcategory(subcategory);
    setCurrentPage(1);
  };
  
  // Smooth pagination handler that prevents scrolling
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Prevent default scroll behavior
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }, []);
  
  // Get unique subcategories, pricing models, and platforms from tools for filters
  const uniqueSubcategories = useMemo(() => {
    const subcategories = new Set<string>();
    
    allTools.forEach(tool => {
      if (tool.subcategories && Array.isArray(tool.subcategories)) {
        tool.subcategories.forEach(subcategory => subcategories.add(subcategory));
      }
    });
    
    return Array.from(subcategories);
  }, [allTools]);
  
  const uniquePricingModels = useMemo(() => {
    const pricingModels = new Set<string>();
    
    allTools.forEach(tool => {
      if (tool.pricingModel) {
        pricingModels.add(tool.pricingModel);
      }
    });
    
    return Array.from(pricingModels);
  }, [allTools]);
  
  const uniquePlatforms = useMemo(() => {
    const platforms = new Set<string>();
    
    allTools.forEach(tool => {
      if (tool.platforms && Array.isArray(tool.platforms)) {
        tool.platforms.forEach(platform => platforms.add(platform));
      }
    });
    
    return Array.from(platforms);
  }, [allTools]);
  
  // Calculate pagination (use server-side pagination if available)
  const totalTools = paginationInfo.totalItems;
  const totalPages = paginationInfo.totalPages || 1;
  
  // Use server-side pagination or client-side pagination depending on API
  const paginatedTools = filteredTools;
  
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

  // Define FAQ data based on category
  const getFaqData = () => {
    const defaultFaqs = [
      {
        question: `What are the best ${title.toLowerCase()}?`,
        answer: `We've curated the top-rated ${title.toLowerCase()} for productivity and efficiency. Browse our selection to find the perfect tool for your needs.`
      },
      {
        question: "Are these AI tools free or paid?",
        answer: "Our collection includes both free and paid AI tools. Many offer freemium models, allowing you to test before committing to a paid plan."
      },
      {
        question: "How can I find the right AI tool for my specific needs?",
        answer: "You can use our filters to narrow down by category, platform, pricing model, or specific use cases. You can also search for specific features or browse our blog for detailed guides."
      },
      {
        question: "Can I compare different AI tools?",
        answer: "Yes! Add tools to your compare list by clicking the compare button on any tool card, then click 'Compare Tools' to see a detailed side-by-side comparison."
      }
    ];

    if (activeCategory) {
      const category = categories.find(cat => cat.slug === activeCategory);
      if (category) {
        return [
          {
            question: `What are the best ${category.name.toLowerCase()}?`,
            answer: `Our curated selection of ${category.name.toLowerCase()} helps users find the right tools for ${category.description.toLowerCase()}. Browse our top-rated options to find tools that match your specific requirements.`
          },
          ...defaultFaqs.slice(1)
        ];
      }
    }
    
    return defaultFaqs;
  };

  // Generate FAQ items for structured data
  const faqItems = getFaqData().map(faq => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }));

  // Generate breadcrumb items
  const generateBreadcrumbItems = () => {
    const items = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://alltopaitools.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://alltopaitools.com/tools"
      }
    ];

    if (activeCategory) {
      const category = categories.find(cat => cat.slug === activeCategory);
      if (category) {
        items.push({
          "@type": "ListItem",
          position: 3,
          name: category.name,
          item: `https://alltopaitools.com/tools/category/${activeCategory}`
        });
      }
    }

    return items;
  };

  // Generate structured data
  const structuredData = [
    {
      type: "WebSite" as const,
      data: {
        name: `${title} - Top AI Tools`,
        description: description,
        url: activeCategory 
          ? `https://alltopaitools.com/tools/category/${activeCategory}`
          : "https://alltopaitools.com/tools",
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
        itemListElement: generateBreadcrumbItems()
      }
    },
    {
      type: "FAQPage" as const,
      data: {
        mainEntity: faqItems
      }
    }
  ];

  // Save filter preferences to localStorage
  useEffect(() => {
    // Store user's last filter preferences
    const filterPreferences = {
      category: activeCategory,
      subcategory: activeSubcategory,
      industry: activeIndustry,
      useCase: activeUseCase,
      pricingModel: activePricingModel,
      platform: activePlatform,
      page: currentPage
    };
    
    localStorage.setItem('filterPreferences', JSON.stringify(filterPreferences));
  }, [activeCategory, activeSubcategory, activeIndustry, activeUseCase, activePricingModel, activePlatform, currentPage]);

  // Load filter preferences from localStorage on initial load
  useEffect(() => {
    const savedPreferences = localStorage.getItem('filterPreferences');
    
    if (savedPreferences && !categorySlug) {
      try {
        const preferences = JSON.parse(savedPreferences);
        
        // Only apply if URL doesn't already have a category
        if (!categorySlug) {
          // Apply saved filters
          if (preferences.category) setActiveCategory(preferences.category);
          if (preferences.subcategory) setActiveSubcategory(preferences.subcategory);
          if (preferences.industry) setActiveIndustry(preferences.industry);
          if (preferences.useCase) setActiveUseCase(preferences.useCase);
          if (preferences.pricingModel) setActivePricingModel(preferences.pricingModel);
          if (preferences.platform) setActivePlatform(preferences.platform);
          if (preferences.page > 1) setCurrentPage(preferences.page);
        }
      } catch (e) {
        console.error("Error parsing saved filter preferences", e);
      }
    }
  }, [categorySlug]);

  // Get random blog posts from our own blog data
  const getRelatedLinks = () => {
    // Get all blog posts from our own data source
    const allBlogPosts = getBlogPosts();
    
    // Shuffle array randomly
    const shuffled = [...allBlogPosts].sort(() => 0.5 - Math.random());
    
    // Return 3-5 random blog posts
    return shuffled.slice(0, Math.floor(Math.random() * 3) + 3).map(post => ({
      title: post.title,
      url: `/blog/${post.slug}`
    }));
  };

  return (
    <>
      <EnhancedSEO 
        title={`${title} - Top AI Tools`}
        description={`Discover top ${title.toLowerCase()} to enhance your productivity and workflow efficiency.`}
        canonicalUrl={activeCategory ? `/tools/category/${activeCategory}` : "/tools"}
        structuredData={structuredData}
        image={`https://alltopaitools.com/og-image-tools${activeCategory ? '-' + activeCategory : ''}.png`}
        ogType="website"
      />
      
      <PageHeader title={title} description={description} />
      
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-4 sm:mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-1" aria-hidden="true" />
                <span className="text-xs sm:text-sm">Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {!activeCategory ? (
                <BreadcrumbPage className="text-xs sm:text-sm">Tools</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href="/tools" className="text-xs sm:text-sm">Tools</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {activeCategory && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-xs sm:text-sm">
                    {categories.find(cat => cat.slug === activeCategory)?.name || activeCategory}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Search */}
        <div className="mb-6 sm:mb-8">
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-4 sm:mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              <Input
                type="text"
                placeholder="Search for tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base dark:bg-gray-800 dark:text-white dark:border-gray-700 shadow-sm"
                aria-label="Search for tools"
              />
            </div>
          </form>
          
          {/* Category Tabs - Responsive */}
          <div className="w-full max-w-full mb-4">
            <Tabs 
              defaultValue={activeCategory || "all"} 
              value={activeCategory || "all"}
              onValueChange={handleCategoryTabChange}
              className="w-full"
            >
              <TabsList className="w-full h-auto flex flex-wrap justify-start px-1 sm:px-2 py-1 mb-4 bg-muted/80">
                <TabsTrigger 
                  value="all" 
                  className="m-0.5 sm:m-1 whitespace-nowrap text-xs sm:text-sm px-2 sm:px-3"
                >
                  All Tools
                </TabsTrigger>

                {categories.map((cat) => (
                  <TabsTrigger 
                    key={cat.id} 
                    value={cat.slug} 
                    className="m-0.5 sm:m-1 whitespace-nowrap flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3"
                  >
                    <cat.LucideIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden xs:inline sm:inline">{cat.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {/* Filters - Horizontal collapsible */}
        <FilterSidebar
          onSelectIndustry={handleIndustryChange}
          onSelectUseCase={handleUseCaseChange}
          onSelectPricingModel={handlePricingModelChange}
          onSelectPlatform={handlePlatformChange}
          onSelectSubcategory={handleSubcategoryChange}
          activeIndustry={activeIndustry}
          activeUseCase={activeUseCase}
          activePricingModel={activePricingModel}
          activePlatform={activePlatform}
          activeSubcategory={activeSubcategory}
          subcategories={uniqueSubcategories}
          pricingModels={uniquePricingModels}
          platforms={uniquePlatforms}
          isMobile={isMobile}
        />
        
        {/* Tools Grid - Fixed to 4 cards per row (12 tools total per page) */}
        <div className="w-full">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
              {Array(12).fill(0).map((_, index) => (
                <ToolCardSkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          ) : paginatedTools.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
                {paginatedTools.map((tool) => (
                  <ToolCard key={tool._id || tool.id} tool={tool} />
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
              
              {/* Related blog posts for internal linking */}
              <div className="mt-8 sm:mt-10 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Related Articles</h3>
                <ul className="space-y-1 sm:space-y-2">
                  {getRelatedLinks().map((link, index) => (
                    <li key={index} className="story-link">
                      <Link 
                        to={link.url} 
                        className="text-primary hover:text-primary-dark transition-colors text-sm sm:text-base"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* FAQ Section - Using Accordion for collapsible Q&A */}
              <div className="mt-8 sm:mt-10 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
                <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {getFaqData().map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 dark:border-gray-700">
                      <AccordionTrigger className="text-sm sm:text-lg font-semibold py-3 sm:py-4 hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-300 pt-2 pb-3 sm:pb-4 text-sm sm:text-base">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </>
          ) : (
            <div className="text-center py-8 sm:py-10 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-medium mb-2 text-gray-800 dark:text-white">No tools found</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory(null);
                  setActiveSubcategory(null);
                  setActiveIndustry(null);
                  setActiveUseCase(null);
                  setActivePricingModel(null);
                  setActivePlatform(null);
                  setCurrentPage(1);
                  navigate('/tools', { replace: true });
                  
                  // Also clear localStorage preferences
                  localStorage.removeItem('filterPreferences');
                }}
                variant="outline"
                className="mt-4 text-sm sm:text-base"
                type="button"
              >
                Reset all filters
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Compare Bar */}
      <CompareBar />
    </>
  );
};

export default ToolsPage;
