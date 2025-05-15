import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/sonner';
import { adaptToolsToInternal } from '@/utils/dataAdapters';

// Updated API base URL to use the real API
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://topratedai.biovasurgicals.com';

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
        console.log(`Fetching data from: ${url}`);
        
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
        
        const data = await response.json();
        console.log(`Data received from ${endpoint}:`, data);
        return data;
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

// Updated useTools hook to use real API endpoint with filtering parameters
export const useTools = (params?: Record<string, string>) => {
  return useApiQuery(
    ['tools', JSON.stringify(params)], 
    '/api/tools',
    { 
      params,
      // Transform data to ensure consistent format
      onSuccess: (data) => {
        return adaptToolsToInternal(data);
      }
    }
  );
};

export const useTool = (slug: string) => {
  return useApiQuery(
    ['tool', slug], 
    `/api/tools/${slug}`
  );
};

export const useCompareTools = (slugs: string[]) => {
  const endpoint = `/api/tools/compare`;
  
  // Create params object for the API request
  const params: Record<string, string> = {
    slugs: slugs.join(',')
  };
  
  // Pass the params to useApiQuery
  return useApiQuery(['tools', 'compare', ...slugs], endpoint, {
    params
  });
};

// New hook to fetch blogs from the API
export const useBlogs = (params?: Record<string, string>) => {
  return useApiQuery(
    ['blogs', JSON.stringify(params)],
    '/api/blogs',
    { params }
  );
};

// Hook to fetch a single blog post by slug
export const useBlog = (slug: string) => {
  return useApiQuery(
    ['blog', slug],
    `/api/blogs/${slug}`
  );
};

export const useSubmitTool = () => {
  return useApiMutation('/api/tools', {
    onSuccess: () => {
      toast.success('Tool submitted successfully!');
    },
  });
};

export const useBookmarkTool = () => {
  const queryClient = useQueryClient();
  
  return useApiMutation('/api/user/bookmarks', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'bookmarks'] });
    },
  });
};

// New hook to directly fetch all data needed for the application
export const useBulkData = () => {
  // This hook fetches all necessary data at once, reducing multiple API calls
  const toolsQuery = useApiQuery(['all-tools'], '/api/tools');
  const categoriesQuery = useApiQuery(['categories'], '/api/categories');
  const industriesQuery = useApiQuery(['industries'], '/api/industries');
  const useCasesQuery = useApiQuery(['use-cases'], '/api/use-cases');
  
  return {
    tools: {
      data: toolsQuery.data ? adaptToolsToInternal(toolsQuery.data) : [],
      isLoading: toolsQuery.isLoading,
      error: toolsQuery.error
    },
    categories: {
      data: categoriesQuery.data || [],
      isLoading: categoriesQuery.isLoading,
      error: categoriesQuery.error
    },
    industries: {
      data: industriesQuery.data || [],
      isLoading: industriesQuery.isLoading,
      error: industriesQuery.error
    },
    useCases: {
      data: useCasesQuery.data || [],
      isLoading: useCasesQuery.isLoading,
      error: useCasesQuery.error
    },
    isLoading: toolsQuery.isLoading || categoriesQuery.isLoading || industriesQuery.isLoading || useCasesQuery.isLoading,
    error: toolsQuery.error || categoriesQuery.error || industriesQuery.error || useCasesQuery.error
  };
};
