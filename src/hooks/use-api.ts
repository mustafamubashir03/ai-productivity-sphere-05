
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/components/ui/sonner';

// Default API base URL - can be overridden with environment variables
const DEFAULT_API_URL = '/api';

// Get the API base URL from environment or use default
const getApiBaseUrl = () => {
  // This would be replaced with actual environment variable in a real app
  return DEFAULT_API_URL;
};

// Generic API fetch function
const fetchFromApi = async <T,>(endpoint: string, options?: RequestInit): Promise<T> => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });
    
    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
        // Couldn't parse error message, use default
      }
      
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
};

// Hook for fetching data with options to use mock data
export function useApiQuery<T>(
  queryKey: string[], 
  endpoint: string, 
  options?: {
    mockData?: T;
    useMock?: boolean;
    queryOptions?: any;
    requestOptions?: RequestInit;
  }
) {
  const { mockData, useMock = false, queryOptions = {}, requestOptions } = options || {};
  
  // Define fetch function based on mock settings
  const fetchData = async (): Promise<T> => {
    if (useMock && mockData) {
      // Simulate API delay with mock data
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockData);
        }, 800);
      });
    }
    
    return fetchFromApi<T>(endpoint, requestOptions);
  };
  
  // Use React Query for data fetching with the configured function
  return useQuery({
    queryKey,
    queryFn: fetchData,
    ...queryOptions,
    onError: (error: Error) => {
      // Display error toast
      toast.error(error.message || 'Failed to fetch data');
      
      // Call custom error handler if provided
      if (queryOptions.onError) {
        queryOptions.onError(error);
      }
    }
  });
}

// Hook for mutations (POST, PUT, DELETE)
export function useApiMutation<TData, TVariables>(
  endpoint: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  options?: {
    mockResponse?: TData;
    useMock?: boolean;
    onSuccessMessage?: string;
    onErrorMessage?: string;
  }
) {
  const { mockResponse, useMock = false, onSuccessMessage, onErrorMessage } = options || {};
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TData | null>(null);
  
  const mutate = async (variables: TVariables): Promise<TData> => {
    setIsLoading(true);
    setError(null);
    
    try {
      let result: TData;
      
      if (useMock && mockResponse) {
        // Simulate API delay with mock response
        await new Promise((resolve) => setTimeout(resolve, 800));
        result = mockResponse;
      } else {
        // Real API call
        result = await fetchFromApi<TData>(endpoint, {
          method,
          body: JSON.stringify(variables),
        });
      }
      
      setData(result);
      if (onSuccessMessage) {
        toast.success(onSuccessMessage);
      }
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(err instanceof Error ? err : new Error(errorMessage));
      
      if (onErrorMessage) {
        toast.error(onErrorMessage);
      } else {
        toast.error(errorMessage);
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    mutate,
    isLoading,
    error,
    data,
  };
}

export function useFetchTools(category?: string, industry?: string, useCase?: string, search?: string) {
  // This will be replaced with actual API call in production
  // For now, we're using local data
  const endpoint = `/tools?${category ? `category=${category}` : ''}${industry ? `&industry=${industry}` : ''}${useCase ? `&useCase=${useCase}` : ''}${search ? `&search=${search}` : ''}`;
  
  // Import tools directly for mock data
  const { tools } = require('@/data/tools');
  
  return useApiQuery(['tools', category, industry, useCase, search], endpoint, {
    mockData: tools,
    useMock: true, // Set to false when real API is ready
  });
}

export function useFetchToolDetail(slug: string) {
  const endpoint = `/tools/${slug}`;
  
  // Import tools directly for mock data
  const { getToolBySlug } = require('@/data/tools');
  const tool = getToolBySlug(slug);
  
  return useApiQuery(['tool', slug], endpoint, {
    mockData: tool,
    useMock: true, // Set to false when real API is ready
  });
}

export function useCompareTools(slugs: string[]) {
  const endpoint = `/tools/compare?slugs=${slugs.join(',')}`;
  
  // Import tools directly for mock data
  const { getToolBySlug } = require('@/data/tools');
  const tools = slugs.map(slug => getToolBySlug(slug)).filter(Boolean);
  
  return useApiQuery(['tools', 'compare', slugs], endpoint, {
    mockData: tools,
    useMock: true, // Set to false when real API is ready
  });
}
