
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { X } from "lucide-react";
import { useCompare } from "@/context/CompareContext";

const CompareBar = () => {
  const { toolsToCompare, removeFromCompare, clearCompare, maxCompareItems } = useCompare();

  // Don't render the bar if no tools selected
  if (toolsToCompare.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 shadow-lg z-50 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium dark:text-white">
              Compare {toolsToCompare.length} {toolsToCompare.length === 1 ? 'tool' : 'tools'}
            </span>
            <div className="flex items-center space-x-2">
              {toolsToCompare.map((tool) => (
                <div 
                  key={tool.id} 
                  className="relative bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-1.5 flex items-center"
                >
                  <span className="text-sm font-medium dark:text-white">{tool.name}</span>
                  <button
                    onClick={() => removeFromCompare(tool.id)}
                    className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label={`Remove ${tool.name} from comparison`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {Array.from({ length: maxCompareItems - toolsToCompare.length }).map((_, index) => (
                <div 
                  key={`empty-${index}`} 
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-md px-3 py-1.5 border border-dashed border-gray-300 dark:border-gray-600"
                >
                  <span className="text-sm text-gray-400 dark:text-gray-500">Add tool</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearCompare}
              className="text-gray-500 dark:text-gray-400"
            >
              Clear
            </Button>
            
            <Button
              variant="default"
              size="sm"
              disabled={toolsToCompare.length < 2}
              onClick={() => {
                if (toolsToCompare.length < 2) {
                  toast.error("Select at least 2 tools to compare");
                  return;
                }
                
                // Generate URL with tool IDs for comparison
                const toolIds = toolsToCompare.map(t => t.slug).join(',');
                window.location.href = `/compare/${toolIds}`;
              }}
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
