
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Bookmark, BookmarkCheck, TrendingUp } from "lucide-react";
import { useBookmarks } from "@/context/BookmarkContext";
import { useCompare } from "@/context/CompareContext";
import { toast } from "@/components/ui/sonner";
import { Tool as ToolType } from "@/types/tools"; // Import the Tool type from types

export type Tool = ToolType; // Re-export for compatibility with existing code

interface ToolCardProps {
  tool: Tool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  const [imageError, setImageError] = useState(false);
  const { addToolBookmark, removeToolBookmark, isToolBookmarked } = useBookmarks();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  const handleImageError = () => {
    setImageError(true);
  };

  // Get category display name from slug
  const getCategoryName = (slug: string) => {
    switch(slug) {
      case "video-editing-tools":
      case "Video Editing Tools":
        return "Video Editing";
      case "photo-editing-tools":
      case "Photo Editing Tools":
        return "Photo Editing";
      case "copywriting-blogging-tools":
      case "Copywriting & Blogging":
        return "Copywriting";
      case "coding-assistants":
      case "Coding Assistants":
        return "Coding";
      case "ai-chatbots":
        return "AI Chatbot";
      case "no-code-ai-agents":
      case "No-code AI Agents":
        return "No-code AI";
      case "automation-workflow-tools":
      case "Automation & Workflow":
        return "Automation";
      case "content-creation":
        return "Content Creation";
      default: return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
  };

  const handleToggleBookmark = () => {
    const toolId = tool._id || tool.id || '';
    if (isToolBookmarked(toolId)) {
      removeToolBookmark(toolId);
      toast.success(`${tool.name} removed from bookmarks`);
    } else {
      addToolBookmark(tool);
      toast.success(`${tool.name} added to bookmarks`);
    }
  };

  const handleToggleCompare = () => {
    const toolId = tool._id || tool.id || '';
    if (isInCompare(toolId)) {
      removeFromCompare(toolId);
      toast.success(`${tool.name} removed from comparison`);
    } else {
      addToCompare(tool);
      toast.success(`${tool.name} added to comparison`);
    }
  };

  // Get pricing model badge
  const getPricingBadge = () => {
    if (!tool.pricingModel) return null;
    
    const badgeClasses = {
      free: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500",
      freemium: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500",
      subscription: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500",
      "one-time": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-500"
    };
    
    const pricingModel = tool.pricingModel as keyof typeof badgeClasses;
    const badgeClass = badgeClasses[pricingModel] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    
    return (
      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${badgeClass}`}>
        {pricingModel === "one-time" ? "One-time" : 
          pricingModel.charAt(0).toUpperCase() + pricingModel.slice(1)}
      </span>
    );
  };

  return (
<div className="tool-card bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm group border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
  {/* Header with logo, name, and actions */}
  <div className="flex items-start justify-between gap-3">
    <div className="flex items-start gap-3 flex-1 min-w-0">
      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
        {!imageError ? (
          <img
            src={tool.logo}
            alt={`${tool.name} logo`}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            onError={handleImageError}
          />
        ) : (
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-400 dark:text-gray-300 text-sm font-medium">
            {tool.name.charAt(0)}
          </div>
        )}
      </div>
      
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-sm sm:text-base md:text-lg dark:text-white truncate">
          {tool.name}
        </h3>
        <div className="flex flex-wrap gap-1 mt-0.5">
          <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground">
            {getCategoryName(tool.category)}
          </span>
          
          {tool.trending && (
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500">
              <TrendingUp className="w-3 h-3 mr-0.5" /> Trending
            </span>
          )}
          
          {tool.reviewed && (
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500">
              Reviewed
            </span>
          )}
        </div>
      </div>
    </div>
    
    <div className="flex items-center gap-1 flex-shrink-0">
      <button
        onClick={handleToggleBookmark}
        className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${isToolBookmarked(tool._id) ? 'text-primary' : 'text-gray-400'}`}
        aria-label={isToolBookmarked(tool._id) ? "Remove from bookmarks" : "Add to bookmarks"}
      >
        {isToolBookmarked(tool._id) ? <BookmarkCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
      </button>
      
      <button
        onClick={handleToggleCompare}
        className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${isInCompare(tool._id) ? 'text-primary' : 'text-gray-400'}`}
        aria-label={isInCompare(tool._id) ? "Remove from comparison" : "Add to comparison"}
      >
        <BarChart2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>
    </div>
  </div>
  
  {/* Description */}
  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm line-clamp-3 mt-2 sm:mt-3 flex-1">
    {tool.shortDescription || tool.description}
  </p>
  
  {/* Pricing model badge */}
  {tool.pricingModel && (
    <div className="mt-1 sm:mt-2">
      {getPricingBadge()}
    </div>
  )}
  
  {/* Features */}
  {tool.features && tool.features.length > 0 && (
    <div className="mt-2 sm:mt-3">
      <p className="text-xs text-gray-500 dark:text-gray-400">Key Features:</p>
      <div className="flex flex-wrap gap-1 mt-0.5">
        {tool.features.slice(0, 3).map((feature, index) => (
          <span key={index} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full truncate max-w-full">
            {feature}
          </span>
        ))}
      </div>
    </div>
  )}
  
  {/* Learn More Button */}
  <div className="mt-3 sm:mt-4 pt-1 sm:pt-2">
    <Link to={`/tools/${tool.slug}`} className="block">
      <Button 
        variant="outline" 
        size="sm"
        className="w-full group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary dark:border-gray-700 dark:text-gray-200 transition-colors text-xs sm:text-sm"
      >
        Learn More <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
      </Button>
    </Link>
  </div>
</div>
  );
};

export default ToolCard;
