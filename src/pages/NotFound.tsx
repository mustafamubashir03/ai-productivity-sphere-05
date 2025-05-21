import { Link } from "react-router-dom";
import { Home, ArrowRight, Search } from "lucide-react";
import SEOHead from "@/components/common/SEOHead";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { categories } from "@/data/categories";

const NotFound = () => {
  // Generate some suggested links
  const [suggestedCategories, setSuggestedCategories] = useState<typeof categories>([]);
  
  useEffect(() => {
    // Get random categories to suggest
    const shuffled = [...categories].sort(() => 0.5 - Math.random());
    setSuggestedCategories(shuffled.slice(0, 4));
  }, []);

  return (
    <>
      <SEOHead 
        title="Page Not Found - Top AI Tools"
        description="The page you're looking for doesn't exist or has been moved."
        image="/favicon.svg"
      />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-8xl font-bold mb-6 text-primary">404</h1>
          <h2 className="text-3xl font-semibold mb-4 dark:text-white">Page Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            The page you're looking for doesn't exist or has been moved to another location.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild variant="default" size="lg">
              <Link to="/" className="inline-flex items-center">
                <Home className="mr-2 h-5 w-5" /> Return Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/tools" className="inline-flex items-center">
                Browse All Tools <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {/* Suggested Links */}
          <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-4 dark:text-white">Popular Categories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {suggestedCategories.map(category => (
                <Link 
                  key={category.id}
                  to={`/tools/category/${category.slug}`}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md hover:bg-primary/10 transition-colors text-left flex items-center"
                >
                  <span className="text-primary mr-2 text-xl">&bull;</span>
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Search Suggestion */}
          <div className="mt-8 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Try searching for what you're looking for:
            </p>
            <Link to="/tools" className="inline-flex items-center justify-center w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-md transition-colors">
              <Search className="mr-2 h-5 w-5" />
              Search Tools
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
