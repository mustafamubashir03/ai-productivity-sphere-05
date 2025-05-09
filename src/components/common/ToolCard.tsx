
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

  return (
    <div className="tool-card group">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
          {!imageError ? (
            <img
              src={tool.logo}
              alt={`${tool.name} logo`}
              className="w-10 h-10 object-contain"
              onError={handleImageError}
            />
          ) : (
            <div className="w-10 h-10 flex items-center justify-center text-gray-400 text-sm font-medium">
              {tool.name.charAt(0)}
            </div>
          )}
        </div>
        <h3 className="font-semibold text-lg">{tool.name}</h3>
      </div>
      
      <p className="text-gray-600 text-sm line-clamp-3">{tool.description}</p>
      
      <div className="mt-auto pt-2">
        <Link to={`/tools/${tool.slug}`}>
          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
            Learn More <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ToolCard;
