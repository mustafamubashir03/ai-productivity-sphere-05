
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/sonner';

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

// Updated useTools hook to handle the new response format with tools array
export const useTools = (params?: Record<string, string>) => {
  return useApiQuery(
    ['tools', JSON.stringify(params)], 
    '/api/tools',
    { params }
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

// Helper function to adapt API response for tools
export const adaptToolsResponse = (data: any): any[] => {
  if (!data) return [];
  
  // If the data is already an array of tools
  if (Array.isArray(data)) {
    return data;
  }
  
  // If the data is a paginated response with a tools array
  if (data.tools && Array.isArray(data.tools)) {
    return data.tools;
  }
  
  return [];
};

// Helper function to adapt API response for blogs
export const adaptBlogsResponse = (data: any): any[] => {
  if (!data) return [];
  
  // If the data is already an array of blogs
  if (Array.isArray(data)) {
    return data;
  }
  
  // If the data is a paginated response with a blogs array
  if (data.blogs && Array.isArray(data.blogs)) {
    return data.blogs;
  }
  
  return [];
};
