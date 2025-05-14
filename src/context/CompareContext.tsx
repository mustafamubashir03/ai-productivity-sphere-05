
import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Tool } from "@/components/common/ToolCard";
import { toast } from "@/components/ui/sonner";

interface CompareContextType {
  toolsToCompare: Tool[];
  addToCompare: (tool: Tool) => void;
  removeFromCompare: (toolId: string) => void;
  isInCompare: (toolId: string) => boolean;
  clearCompare: () => void;
  compareTools: () => void;
  maxCompareItems: number;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [toolsToCompare, setToolsToCompare] = useState<Tool[]>([]);
  const maxCompareItems = 3;

  const addToCompare = (tool: Tool) => {
    if (toolsToCompare.length >= maxCompareItems) {
      toast.error(`You can only compare up to ${maxCompareItems} tools at once`);
      return;
    }
    
    if (toolsToCompare.some((t) => t.id === tool.id)) {
      toast.info(`${tool.name} is already in your comparison list`);
      return;
    }
    
    setToolsToCompare([...toolsToCompare, tool]);
    toast.success(`${tool.name} added to comparison`);
  };

  const removeFromCompare = (toolId: string) => {
    const tool = toolsToCompare.find((t) => t.id === toolId);
    if (tool) {
      setToolsToCompare(toolsToCompare.filter((t) => t.id !== toolId));
      toast.info(`${tool.name} removed from comparison`);
    }
  };

  const isInCompare = (toolId: string) => {
    return toolsToCompare.some((tool) => tool.id === toolId);
  };

  const clearCompare = () => {
    setToolsToCompare([]);
  };
  
  // New function to handle comparison navigation using React Router
  const compareTools = () => {
    if (toolsToCompare.length < 2) {
      toast.error("Select at least 2 tools to compare");
      return;
    }
    
    const toolIds = toolsToCompare.map(t => t.slug).join(',');
    navigate(`/compare/${toolIds}`);
  };

  return (
    <CompareContext.Provider
      value={{
        toolsToCompare,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        compareTools,
        maxCompareItems,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
