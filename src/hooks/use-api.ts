
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/sonner';

// Default base URL for API requests (replace with your actual API base URL when ready)
const API_BASE_URL = 'https://api.aiproductivityhub.com';

// Type definition for API options
interface ApiOptions {
  headers?: HeadersInit;
  params?: Record<string, string>;
  mockData?: any; // For development/testing without real API
  useMock?: boolean; // Toggle to use mock data
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

// Helper function to build URL with query parameters
export const buildUrl = (endpoint: string, params?: Record<string, string>): string => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    });
  }
  
  return url.toString();
};

// Generic GET request using React Query
export const useApiQuery = (
  queryKey: string | string[],
  endpoint: string,
  options: ApiOptions = {}
) => {
  const {
    headers,
    params,
    mockData,
    useMock = false,
    onSuccess,
    onError,
  } = options;
  
  return useQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: async () => {
      // Use mock data if specified (for development without API)
      if (useMock && mockData) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Fake delay
        return mockData;
      }
      
      try {
        const url = buildUrl(endpoint, params);
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('API request failed:', error);
        throw error;
      }
    },
    meta: {
      onSuccess: data => {
        onSuccess?.(data);
      },
      onError: error => {
        console.error('Query error:', error);
        onError?.(error);
      }
    }
  });
};

// Generic POST request using React Query
export const useApiMutation = (
  endpoint: string,
  options: ApiOptions = {}
) => {
  const queryClient = useQueryClient();
  const { headers, mockData, useMock = false, onSuccess, onError } = options;
  
  return useMutation({
    mutationFn: async (data: any) => {
      // Use mock response if specified (for development)
      if (useMock && mockData) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Fake delay
        return mockData;
      }
      
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `API error: ${response.status}`);
      }
      
      return await response.json();
    },
    onSuccess: (data, variables) => {
      onSuccess?.(data);
    },
    onError: (error: any) => {
      toast.error(error.message || 'An error occurred');
      onError?.(error);
    },
  });
};

// Pre-configured API hooks for specific endpoints
export const useTools = (params?: Record<string, string>) => {
  const { getToolsByCategory, getToolsByIndustry, getToolsByUseCase, tools } = require('@/data/tools');
  
  // Process the filter logic similar to what we do in the UI
  let mockResult = [...tools];
  
  if (params?.category) {
    mockResult = getToolsByCategory(params.category);
  }
  
  if (params?.industry) {
    const industryTools = getToolsByIndustry(params.industry);
    mockResult = params?.category 
      ? mockResult.filter(tool => industryTools.some(t => t.id === tool.id))
      : industryTools;
  }
  
  if (params?.useCase) {
    const useCaseTools = getToolsByUseCase(params.useCase);
    mockResult = mockResult.filter(tool => useCaseTools.some(t => t.id === tool.id));
  }
  
  if (params?.search) {
    const query = params.search.toLowerCase();
    mockResult = mockResult.filter(
      tool => tool.name.toLowerCase().includes(query) || 
              tool.description.toLowerCase().includes(query)
    );
  }
  
  return useApiQuery(
    ['tools', params], 
    '/tools',
    {
      params,
      mockData: mockResult,
      useMock: true, // Set to false when real API is ready
    }
  );
};

export const useTool = (slug: string) => {
  const { getToolBySlug } = require('@/data/tools');
  const tool = getToolBySlug(slug);
  
  return useApiQuery(
    ['tool', slug], 
    `/tools/${slug}`,
    {
      mockData: tool,
      useMock: true, // Set to false when real API is ready
    }
  );
};

export const useCompareTools = (slugs: string[]) => {
  const endpoint = `/tools/compare`;
  
  const { getToolBySlug } = require('@/data/tools');
  const tools = slugs.map(slug => getToolBySlug(slug)).filter(Boolean);
  
  // Create a properly typed params object - ensure it matches the ApiOptions interface
  const params: Record<string, string> = { 
    slugs: slugs.join(',')
  };
  
  // Pass the params object to useApiQuery
  return useApiQuery(['tools', 'compare', ...slugs], endpoint, {
    params,
    mockData: tools,
    useMock: true, // Set to false when real API is ready
  });
};

export const useSubmitTool = () => {
  return useApiMutation('/tools', {
    useMock: true,
    mockData: { success: true, message: 'Tool submitted successfully!' },
    onSuccess: () => {
      toast.success('Tool submitted successfully!');
    },
  });
};

export const useBookmarkTool = () => {
  const queryClient = useQueryClient();
  
  return useApiMutation('/user/bookmarks', {
    useMock: true,
    mockData: { success: true },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'bookmarks'] });
    },
  });
};

// Example of how to use these hooks in components:
/*
import { useTools, useTool, useCompareTools, useSubmitTool } from '@/hooks/use-api';

// In a component:
const { data: tools, isLoading } = useTools({ category: 'ai-writing' });
const { data: tool } = useTool('some-tool-slug');
const { data: compareData } = useCompareTools(['tool1-slug', 'tool2-slug']);
const { mutate: submitTool } = useSubmitTool();

// To submit a tool:
submitTool({
  name: 'New Tool',
  description: 'Tool description',
  // ...other fields
});
*/
