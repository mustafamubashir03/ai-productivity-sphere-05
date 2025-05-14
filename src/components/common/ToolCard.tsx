
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Bookmark, BookmarkCheck, Trending } from "lucide-react";
import { useBookmarks } from "@/context/BookmarkContext";
import { useCompare } from "@/context/CompareContext";
import { toast } from "@/components/ui/sonner";

export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  logo: string;
  category: string;
  trending?: boolean;
  rating?: number;
  reviewed?: boolean;
}

interface ToolCardProps {
  tool: Tool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  const [imageError, setImageError] = useState(false);
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  const handleImageError = () => {
    setImageError(true);
  };

  // Get category display name from slug
  const getCategoryName = (slug: string) => {
    switch(slug) {
      case "video-editing-tools": return "Video Editing";
      case "photo-editing-tools": return "Photo Editing";
      case "copywriting-blogging-tools": return "Copywriting";
      case "coding-assistants": return "Coding";
      case "no-code-ai-agents": return "No-code AI";
      case "automation-workflow-tools": return "Automation";
      default: return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
  };

  const handleToggleBookmark = () => {
    if (isBookmarked(tool.id)) {
      removeBookmark(tool.id);
    } else {
      addBookmark(tool.id);
      toast.success(`${tool.name} added to bookmarks`);
    }
  };

  const handleToggleCompare = () => {
    if (isInCompare(tool.id)) {
      removeFromCompare(tool.id);
    } else {
      addToCompare(tool);
    }
  };

  return (
    <div className="tool-card group border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            {!imageError ? (
              <img
                src={tool.logo}
                alt={`${tool.name} logo`}
                className="w-10 h-10 object-contain"
                onError={handleImageError}
              />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center text-gray-400 dark:text-gray-300 text-sm font-medium">
                {tool.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg dark:text-white">{tool.name}</h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground">
                {getCategoryName(tool.category)}
              </span>
              
              {tool.trending && (
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500">
                  <Trending className="w-3 h-3 mr-1" /> Trending
                </span>
              )}
              
              {tool.reviewed && (
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500">
                  Reviewed
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleBookmark}
            className={`p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${isBookmarked(tool.id) ? 'text-primary' : 'text-gray-400'}`}
            aria-label={isBookmarked(tool.id) ? "Remove from bookmarks" : "Add to bookmarks"}
          >
            {isBookmarked(tool.id) ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
          
          <button
            onClick={handleToggleCompare}
            className={`p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${isInCompare(tool.id) ? 'text-primary' : 'text-gray-400'}`}
            aria-label={isInCompare(tool.id) ? "Remove from comparison" : "Add to comparison"}
          >
            <BarChart2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mt-3">{tool.description}</p>
      
      <div className="mt-4 pt-2">
        <Link to={`/tools/${tool.slug}`}>
          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary dark:border-gray-700 dark:text-gray-200 transition-colors">
            Learn More <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ToolCard;
