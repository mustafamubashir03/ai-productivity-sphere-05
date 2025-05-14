
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from '@/components/ui/sonner';

// Define the Tool type based on your data structure
interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  category: string;
  features: string[];
  pricing: string;
  rating?: number;
}

type SavedToolsContextType = {
  savedTools: Tool[];
  addTool: (tool: Tool) => void;
  removeTool: (toolId: string) => void;
  isSaved: (toolId: string) => boolean;
  clearSaved: () => void;
};

const SavedToolsContext = createContext<SavedToolsContextType | undefined>(undefined);

export function SavedToolsProvider({ children }: { children: ReactNode }) {
  const [savedTools, setSavedTools] = useState<Tool[]>([]);
  
  // Load saved tools from localStorage on initial mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('savedTools');
      if (savedData) {
        setSavedTools(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Failed to load saved tools', error);
      localStorage.removeItem('savedTools');
    }
  }, []);
  
  // Save to localStorage whenever savedTools changes
  useEffect(() => {
    localStorage.setItem('savedTools', JSON.stringify(savedTools));
  }, [savedTools]);
  
  // Add a tool to saved tools
  const addTool = (tool: Tool) => {
    if (savedTools.some(t => t.id === tool.id)) {
      toast.info(`${tool.name} is already in your saved tools`);
      return;
    }
    
    setSavedTools(prev => [...prev, tool]);
    toast.success(`${tool.name} added to saved tools`);
  };
  
  // Remove a tool from saved tools
  const removeTool = (toolId: string) => {
    const tool = savedTools.find(t => t.id === toolId);
    if (tool) {
      setSavedTools(savedTools.filter(t => t.id !== toolId));
      toast.info(`${tool.name} removed from saved tools`);
    }
  };
  
  // Check if a tool is saved
  const isSaved = (toolId: string) => {
    return savedTools.some(tool => tool.id === toolId);
  };
  
  // Clear all saved tools
  const clearSaved = () => {
    setSavedTools([]);
    toast.info('All saved tools cleared');
  };
  
  return (
    <SavedToolsContext.Provider
      value={{
        savedTools,
        addTool,
        removeTool,
        isSaved,
        clearSaved,
      }}
    >
      {children}
    </SavedToolsContext.Provider>
  );
}

// Hook to use the saved tools context
export function useSavedTools() {
  const context = useContext(SavedToolsContext);
  if (context === undefined) {
    throw new Error('useSavedTools must be used within a SavedToolsProvider');
  }
  return context;
}
