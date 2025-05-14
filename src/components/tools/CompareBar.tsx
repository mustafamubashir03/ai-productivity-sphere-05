
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { X } from "lucide-react";
import { useCompare } from "@/context/CompareContext";

const CompareBar = () => {
  const { toolsToCompare, removeFromCompare, clearCompare, compareTools, maxCompareItems } = useCompare();

  // Don't render the bar if no tools selected
  if (toolsToCompare.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 shadow-lg z-50 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-2 sm:px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="text-sm font-medium dark:text-white">
              Compare {toolsToCompare.length} {toolsToCompare.length === 1 ? 'tool' : 'tools'}
            </span>
            <div className="flex flex-wrap gap-2">
              {toolsToCompare.map((tool) => (
                <div 
                  key={tool.id} 
                  className="relative bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-1.5 flex items-center"
                >
                  <span className="text-sm font-medium dark:text-white mr-6 truncate max-w-[120px]">{tool.name}</span>
                  <button
                    onClick={() => removeFromCompare(tool.id)}
                    className="absolute right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label={`Remove ${tool.name} from comparison`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {Array.from({ length: maxCompareItems - toolsToCompare.length }).map((_, index) => (
                <div 
                  key={`empty-${index}`} 
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-md px-3 py-1.5 border border-dashed border-gray-300 dark:border-gray-600 hidden sm:block"
                >
                  <span className="text-sm text-gray-400 dark:text-gray-500">Add tool</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearCompare}
              className="text-gray-500 dark:text-gray-400"
              type="button"
            >
              Clear
            </Button>
            
            <Button
              variant="default"
              size="sm"
              disabled={toolsToCompare.length < 2}
              onClick={compareTools}
              type="button"
            >
              Compare Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;
