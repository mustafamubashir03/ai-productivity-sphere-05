
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import EnhancedSEO from "@/components/common/EnhancedSEO";
import { getToolBySlug } from "@/data/tools";

const CompareToolsPage = () => {
  const { slugs } = useParams<{ slugs: string }>();
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (slugs) {
      const toolSlugs = slugs.split(',');
      
      // Simulate data fetching delay
      const timer = setTimeout(() => {
        const fetchedTools = toolSlugs
          .map(slug => getToolBySlug(slug))
          .filter(Boolean);
        
        setTools(fetchedTools);
        setLoading(false);
      }, 800);
      
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [slugs]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, index) => (
              <div key={index} className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (!tools.length) {
    return (
      <div className="container mx-auto px-4 py-10 text-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">No Tools to Compare</h2>
        <p className="mb-6 dark:text-gray-300">Please select at least two tools to compare from our tools collection.</p>
        <Link to="/tools">
          <Button>Browse Tools</Button>
        </Link>
      </div>
    );
  }
  
  // Get all unique features across tools
  const allFeatures = Array.from(
    new Set(tools.flatMap(tool => tool.features))
  );
  
  // Get all unique use cases across tools
  const allUseCases = Array.from(
    new Set(tools.flatMap(tool => tool.useCases))
  );
  
  // Structured data for SEO
  const structuredData = [
    {
      type: "Article" as const,
      data: {
        headline: `Comparing ${tools.map(t => t.name).join(' vs ')}`,
        description: `Side-by-side comparison of ${tools.map(t => t.name).join(' vs ')}`,
        author: {
          "@type": "Organization",
          name: "AI Productivity Hub"
        },
        publisher: {
          "@type": "Organization",
          name: "AI Productivity Hub",
          logo: {
            "@type": "ImageObject",
            url: window.location.origin + "/favicon.svg"
          }
        },
        datePublished: new Date().toISOString()
      }
    }
  ];
  
  return (
    <>
      <EnhancedSEO 
        title={`Compare: ${tools.map(t => t.name).join(' vs ')} - AI Productivity Hub`}
        description={`Side by side comparison of ${tools.map(t => t.name).join(', ')} with features, pricing, and ratings.`}
        structuredData={structuredData}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/tools" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Tools
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-8 dark:text-white">Compare AI Tools</h1>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="p-4 text-left text-gray-600 dark:text-gray-300 font-medium min-w-[200px]">Tool</th>
                {tools.map(tool => (
                  <th key={tool.id} className="p-4 text-center min-w-[250px]">
                    <div className="flex flex-col items-center">
                      <img 
                        src={tool.logo} 
                        alt={`${tool.name} logo`} 
                        className="w-12 h-12 object-contain mb-2 bg-white dark:bg-gray-700 rounded-md p-1"
                      />
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white">{tool.name}</h2>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Rating */}
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-4 text-gray-800 dark:text-white font-medium">Rating</td>
                {tools.map(tool => (
                  <td key={`rating-${tool.id}`} className="p-4 text-center">
                    <div className="flex items-center justify-center">
                      <div className="font-bold text-xl text-primary">{tool.rating || '-'}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 ml-1">/5</div>
                    </div>
                  </td>
                ))}
              </tr>
              
              {/* Pricing */}
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <td className="p-4 text-gray-800 dark:text-white font-medium">Pricing</td>
                {tools.map(tool => (
                  <td key={`pricing-${tool.id}`} className="p-4 text-center text-gray-700 dark:text-gray-300">{tool.pricing}</td>
                ))}
              </tr>
              
              {/* Description */}
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-4 text-gray-800 dark:text-white font-medium">Description</td>
                {tools.map(tool => (
                  <td key={`desc-${tool.id}`} className="p-4 text-center text-gray-700 dark:text-gray-300">{tool.description}</td>
                ))}
              </tr>
              
              {/* Features */}
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <td className="p-4 text-gray-800 dark:text-white font-medium">Features</td>
                {tools.map(tool => (
                  <td key={`features-${tool.id}`} className="p-4">
                    <ul className="space-y-2">
                      {tool.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              
              {/* Feature comparison */}
              <tr className="border-b-2 border-gray-300 dark:border-gray-600 bg-primary/5 dark:bg-primary/10">
                <td colSpan={tools.length + 1} className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">Feature-by-Feature Comparison</h3>
                </td>
              </tr>
              
              {allFeatures.map((feature, index) => (
                <tr key={index} className={`border-b border-gray-200 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''}`}>
                  <td className="p-4 text-gray-800 dark:text-white">{feature}</td>
                  {tools.map(tool => (
                    <td key={`${tool.id}-${index}`} className="p-4 text-center">
                      {tool.features.includes(feature) ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              
              {/* Use Cases */}
              <tr className="border-b-2 border-gray-300 dark:border-gray-600 bg-primary/5 dark:bg-primary/10">
                <td colSpan={tools.length + 1} className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">Use Cases Comparison</h3>
                </td>
              </tr>
              
              {allUseCases.map((useCase, index) => (
                <tr key={index} className={`border-b border-gray-200 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''}`}>
                  <td className="p-4 text-gray-800 dark:text-white">{useCase}</td>
                  {tools.map(tool => (
                    <td key={`${tool.id}-${index}`} className="p-4 text-center">
                      {tool.useCases.includes(useCase) ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              
              {/* CTA */}
              <tr className="bg-gray-50 dark:bg-gray-800">
                <td className="p-4 text-gray-800 dark:text-white font-medium">Visit</td>
                {tools.map(tool => (
                  <td key={`cta-${tool.id}`} className="p-4 text-center">
                    <a
                      href={tool.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button>Try {tool.name}</Button>
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CompareToolsPage;
