
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tool } from '@/types/tools';
import { useTools } from '@/hooks/use-api';

interface RelatedToolsProps {
  currentToolId: string;
  category: string;
  currentToolName: string;
}

const RelatedTools: React.FC<RelatedToolsProps> = ({ 
  currentToolId, 
  category, 
  currentToolName 
}) => {
  const [relatedTools, setRelatedTools] = useState<Tool[]>([]);
  const { data: toolsData } = useTools({ category, limit: "10" });

  useEffect(() => {
    if (toolsData?.tools) {
      // Filter out current tool and get random 3 tools from same category
      const filtered = toolsData.tools.filter(tool => 
        (tool._id || tool.id) !== currentToolId
      );
      
      // Shuffle and take first 3
      const shuffled = [...filtered].sort(() => 0.5 - Math.random());
      setRelatedTools(shuffled.slice(0, 3));
    }
  }, [toolsData, currentToolId]);

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 lg:mt-12">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800 dark:text-white">
        More Tools Like {currentToolName}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {relatedTools.map(tool => (
          <div 
            key={tool._id || tool.id} 
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-5 lg:p-6 hover:shadow-lg transition-shadow h-full flex flex-col"
          >
            <div className="flex items-start gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <img
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-md"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-white truncate">{tool.name}</h3>
                  {tool.featured && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs flex-shrink-0">
                      Featured
                    </Badge>
                  )}
                </div>
                {tool.rating && (
                  <div className="flex items-center text-yellow-500 mb-2">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="ml-1 text-xs text-gray-600 dark:text-gray-400">
                      {tool.rating}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-3 flex-1">
              {tool.shortDescription || tool.description}
            </p>
            
            {tool.pricing && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 sm:mb-4 line-clamp-2">
                {tool.pricing.length > 40 ? tool.pricing.substring(0, 40) + '...' : tool.pricing}
              </p>
            )}
            
            <div className="flex gap-2 mt-auto">
              <Link to={`/tools/${tool.slug}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  View Details
                </Button>
              </Link>
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0"
              >
                <Button size="sm" className="text-xs px-2">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedTools;
