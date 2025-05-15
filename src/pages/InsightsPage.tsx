
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/common/SEOHead";
import PageHeader from "@/components/common/PageHeader";
import { Clock, ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useBlogs } from "@/hooks/use-api";
import { toast } from "@/components/ui/sonner";

const CATEGORIES = ["All", "Guides", "Comparisons", "Trends", "Insights"];

const InsightsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const { 
    data: insightsData,
    isLoading: loading,
    error
  } = useBlogs();
  
  // Show error toast if API request fails
  useEffect(() => {
    if (error) {
      toast.error("Error loading insights. Please try again later.");
      console.error("API error:", error);
    }
  }, [error]);
  
  // Format blog data to match our UI requirements
  const formatInsights = (blogs) => {
    if (!blogs || !blogs.length) return [];
    
    return blogs.map(blog => ({
      id: blog._id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || "Read this insight for valuable information on AI tools.",
      coverImage: blog.image || "/placeholder.svg",
      date: new Date(blog.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      readTime: blog.readTime || `${Math.ceil((blog.content?.length || 0) / 1500)} min read`,
      category: blog.category || "Guides" // Default to Guides if category is missing
    }));
  };
  
  const insights = formatInsights(insightsData);
  
  // Client-side category filtering
  const filteredInsights = activeCategory === "All" 
    ? insights 
    : insights.filter(insight => insight.category === activeCategory);
  
  return (
    <>
      <SEOHead 
        title="AI Tools Insights & Guides - AI Productivity Hub"
        description="Expert guides, comparisons, and insights on how to leverage AI tools for productivity and workflow optimization."
      />
      
      <PageHeader 
        title="Insights & Guides"
        description="Expert guides, comparisons, and insights to help you make the most out of AI productivity tools."
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm ${
                activeCategory === category
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <div className="w-full h-full rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                </div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : filteredInsights.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInsights.map((insight) => (
              <article key={insight.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <Link to={`/insights/${insight.slug}`}>
                  <div className="w-full h-48">
                    <AspectRatio ratio={16 / 9}>
                      <img 
                        src={insight.coverImage} 
                        alt={insight.title} 
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                </Link>
                
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-primary font-semibold px-2 py-1 rounded-full bg-primary/10">
                      {insight.category}
                    </span>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{insight.readTime}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                    <Link to={`/insights/${insight.slug}`} className="hover:text-primary transition-colors">
                      {insight.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {insight.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{insight.date}</span>
                    <Link 
                      to={`/insights/${insight.slug}`} 
                      className="inline-flex items-center text-primary text-sm font-medium hover:underline"
                    >
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">No insights found</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try selecting a different category.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default InsightsPage;
