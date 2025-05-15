
// Type definitions for tool-related data structures

// Tool interface that supports both id and _id to handle different data formats
export interface Tool {
  // Both _id and id are required to handle all scenarios
  _id: string;
  id?: string;
  name: string;
  slug: string;
  logo: string;
  category: string;
  description: string;
  features: string[];
  useCases: string[];
  pricing: string;
  websiteUrl: string;
  trending?: boolean;
  rating?: number;
  reviewed?: boolean;
  industryFit?: string[];
  useCase?: string[];
  editorVerdict?: string;
  relatedTools?: string[];
  relatedBlogs?: string[];
  tags?: string[];
  lastUpdated?: string;
  systemRequirements?: string;
  apiAvailable?: boolean;
  integratedWith?: string[];
  testimonials?: Testimonial[];
  screenshots?: string[];
}

export interface Testimonial {
  name: string;
  company?: string;
  comment: string;
}

export interface Bookmark extends Tool {
  date: string;
  excerpt: string;
  image: string;
}
