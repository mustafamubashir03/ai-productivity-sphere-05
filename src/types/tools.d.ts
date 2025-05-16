
// Type definitions for tool-related data structures

export interface SeoData {
  canonicalUrl?: string;
  structuredData?: any;
  noIndex?: boolean;
}

export interface Testimonial {
  name: string;
  company?: string;
  comment: string;
}

// Tool interface that supports both id and _id to handle different data formats
export interface Tool {
  // Core identifiers
  _id: string;
  id?: string;
  
  // Basic info
  name: string;
  slug: string;
  logo: string;
  description: string;
  shortDescription?: string;
  category: string;
  subcategories?: string[];
  
  // Features and details
  features: string[];
  useCases: string[];
  tags?: string[];
  platforms?: string[];
  languagesSupported?: string[];
  
  // Marketing and display
  trending?: boolean;
  featured?: boolean;
  rating?: number;
  reviewCount?: number;
  reviewed?: boolean;
  
  // Target audience
  industryFit?: string[];
  
  // Business info
  pricing?: string;
  pricingModel?: 'free' | 'freemium' | 'subscription' | 'one-time' | string;
  websiteUrl: string;
  
  // Technical details
  apiAvailable?: boolean;
  integratedWith?: string[];
  
  // Related content
  editorVerdict?: string;
  relatedTools?: string[];
  relatedBlogs?: string[];
  
  // Media
  screenshots?: string[];
  testimonials?: Testimonial[];
  
  // Pros and cons
  pros?: string[];
  cons?: string[];
  alternatives?: string[];
  
  // SEO
  seo?: SeoData;
  
  // Analytics
  viewCount?: number;
  clickCount?: number;
  popularityScore?: number;
  conversionRate?: number;
  
  // Dates
  lastUpdated?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  tools?: T[];
  blogs?: T[];
}

export interface ToolsApiResponse extends ApiResponse<Tool> {
  tools: Tool[];
}

export interface Bookmark extends Tool {
  bookmarkedAt: string;
}
