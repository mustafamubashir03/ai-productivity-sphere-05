
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  logo: string;
  category: string;
}

interface ToolCardProps {
  tool: Tool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  const [imageError, setImageError] = useState(false);

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

  return (
    <div className="tool-card group border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-all duration-300">
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
          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground mt-1">
            {getCategoryName(tool.category)}
          </span>
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
