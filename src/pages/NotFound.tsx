
import { Link } from "react-router-dom";
import { Home, ArrowRight } from "lucide-react";
import SEOHead from "@/components/common/SEOHead";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <>
      <SEOHead 
        title="Page Not Found - AI Productivity Hub"
        description="The page you're looking for doesn't exist or has been moved."
      />
      
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-6xl font-bold mb-6 text-primary">404</h1>
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Page Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The page you're looking for doesn't exist or has been moved to another location.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default">
              <Link to="/" className="inline-flex items-center">
                <Home className="mr-2 h-4 w-4" /> Return Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/tools" className="inline-flex items-center">
                Browse All Tools <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
