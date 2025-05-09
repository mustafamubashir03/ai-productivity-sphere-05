
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SEOHead from "@/components/common/SEOHead";
import PageHeader from "@/components/common/PageHeader";
import ToolCard, { Tool } from "@/components/common/ToolCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { tools, getToolsByCategory } from "@/data/tools";
import { categories } from "@/data/categories";

const ToolsPage = () => {
  const { categorySlug } = useParams();
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(categorySlug || null);
  
  // Find category by slug
  const category = categorySlug 
    ? categories.find(cat => cat.slug === categorySlug) 
    : null;
  
  useEffect(() => {
    let result = [...tools];
    
    // Filter by category if provided
    if (activeCategory) {
      result = getToolsByCategory(activeCategory);
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
  }, [searchQuery, activeCategory, categorySlug]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is already handled by the useEffect
  };
  
  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug === activeCategory ? null : slug);
  };
  
  const title = category ? `${category.name}` : "All AI Tools";
  const description = category 
    ? category.description
    : "Browse our comprehensive collection of AI productivity tools to find the perfect solutions for your workflow.";

  return (
    <>
      <SEOHead 
        title={`${title} - AI Productivity Hub`}
        description={`Discover top ${title.toLowerCase()} to enhance your productivity and workflow efficiency.`}
      />
      
      <PageHeader title={title} description={description} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search and Filter */}
        <div className="mb-10 space-y-6">
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2"
              />
            </div>
          </form>
          
          {!categorySlug && (
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.slug ? "default" : "outline"}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className="mb-2"
                >
                  {cat.name}
                </Button>
              ))}
              {activeCategory && (
                <Button 
                  variant="secondary" 
                  onClick={() => setActiveCategory(null)}
                  className="mb-2"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
        
        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-medium mb-2">No tools found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ToolsPage;
