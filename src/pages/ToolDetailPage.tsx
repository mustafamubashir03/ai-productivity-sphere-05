
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/common/SEOHead";
import { getToolBySlug } from "@/data/tools";
import ToolDetailSkeleton from "@/components/skeletons/ToolDetailSkeleton";

const ToolDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [tool, setTool] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (slug) {
      // Simulate data fetching delay
      const timer = setTimeout(() => {
        const foundTool = getToolBySlug(slug);
        setTool(foundTool);
        setLoading(false);
      }, 1200);
      
      return () => clearTimeout(timer);
    }
  }, [slug]);
  
  if (loading) {
    return <ToolDetailSkeleton />;
  }
  
  if (!tool) {
    return (
      <div className="container mx-auto px-4 py-10 text-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Tool Not Found</h2>
        <p className="mb-6 dark:text-gray-300">The tool you're looking for doesn't exist or has been removed.</p>
        <Link to="/tools">
          <Button>Back to All Tools</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <>
      <SEOHead 
        title={`${tool.name} - AI Productivity Hub`}
        description={tool.description}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/tools" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Tools
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
                <img
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h1 className="text-3xl font-bold dark:text-white">{tool.name}</h1>
            </div>
            
            <div className="prose max-w-none dark:prose-invert">
              <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">{tool.description}</p>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Key Features</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {tool.features.map((feature: string, index: number) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Use Cases</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {tool.useCases.map((useCase: string, index: number) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">{useCase}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-8">
                <img
                  src="/placeholder.svg"
                  alt={`${tool.name} screenshot`}
                  className="w-full h-auto rounded-md shadow-sm mb-4"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  {tool.name} interface screenshot
                </p>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 sticky top-20">
              {tool.pricing && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Pricing</h3>
                  <p className="text-gray-700 dark:text-gray-300">{tool.pricing}</p>
                </div>
              )}
              
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button className="w-full">
                  Try Tool <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Category</h3>
                <Link
                  to={`/tools/category/${tool.category}`}
                  className="text-primary hover:underline"
                >
                  {tool.category.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolDetailPage;
