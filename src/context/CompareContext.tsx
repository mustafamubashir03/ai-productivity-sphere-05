
import { createContext, useContext, useState, ReactNode } from "react";
import { Tool } from "@/components/common/ToolCard";
import { toast } from "@/components/ui/sonner";

interface CompareContextType {
  toolsToCompare: Tool[];
  addToCompare: (tool: Tool) => void;
  removeFromCompare: (toolId: string) => void;
  isInCompare: (toolId: string) => boolean;
  clearCompare: () => void;
  maxCompareItems: number;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
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

  return (
    <CompareContext.Provider
      value={{
        toolsToCompare,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
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
