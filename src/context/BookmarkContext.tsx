
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Tool } from '@/types/tools';
import { toast } from '@/components/ui/sonner';

// Define types for bookmarks
export interface ToolBookmark extends Tool {
  bookmarkedAt: string;
}

export interface BlogBookmark {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  image: string;
  bookmarkedAt: string;
}

interface BookmarkContextType {
  toolBookmarks: ToolBookmark[];
  blogBookmarks: BlogBookmark[];
  addToolBookmark: (tool: Tool) => void;
  removeToolBookmark: (toolId: string) => void;
  isToolBookmarked: (toolId: string) => boolean;
  addBlogBookmark: (blog: any) => void;
  removeBlogBookmark: (blogId: string) => boolean;
  isBlogBookmarked: (blogId: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};

interface BookmarkProviderProps {
  children: ReactNode;
}

export const BookmarkProvider = ({ children }: BookmarkProviderProps) => {
  const [toolBookmarks, setToolBookmarks] = useState<ToolBookmark[]>([]);
  const [blogBookmarks, setBlogBookmarks] = useState<BlogBookmark[]>([]);

  // Load bookmarks from localStorage on initial mount
  useEffect(() => {
    try {
      const savedToolBookmarks = localStorage.getItem('toolBookmarks');
      if (savedToolBookmarks) {
        setToolBookmarks(JSON.parse(savedToolBookmarks));
      }
      
      const savedBlogBookmarks = localStorage.getItem('blogBookmarks');
      if (savedBlogBookmarks) {
        setBlogBookmarks(JSON.parse(savedBlogBookmarks));
      }
    } catch (error) {
      console.error('Failed to parse bookmarks from localStorage', error);
      // Clear corrupted data
      localStorage.removeItem('toolBookmarks');
      localStorage.removeItem('blogBookmarks');
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('toolBookmarks', JSON.stringify(toolBookmarks));
  }, [toolBookmarks]);
  
  useEffect(() => {
    localStorage.setItem('blogBookmarks', JSON.stringify(blogBookmarks));
  }, [blogBookmarks]);

  // Tool bookmark methods
  const addToolBookmark = (tool: Tool) => {
    if (isToolBookmarked(tool._id)) return;
    
    const newBookmark: ToolBookmark = {
      ...tool,
      bookmarkedAt: new Date().toISOString()
    };
    
    setToolBookmarks(prev => [...prev, newBookmark]);
  };

  const removeToolBookmark = (toolId: string) => {
    setToolBookmarks(prev => prev.filter(bookmark => bookmark._id !== toolId));
  };

  const isToolBookmarked = (toolId: string) => {
    return toolBookmarks.some(bookmark => bookmark._id === toolId);
  };
  
  // Blog bookmark methods
  const addBlogBookmark = (blog: any) => {
    if (!blog || !blog._id || isBlogBookmarked(blog._id)) return;
    
    const newBookmark: BlogBookmark = {
      _id: blog._id,
      id: blog.id || blog._id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || '',
      date: blog.publishedAt || blog.createdAt || new Date().toISOString(),
      image: blog.coverImage || blog.image || '',
      bookmarkedAt: new Date().toISOString()
    };
    
    setBlogBookmarks(prev => [...prev, newBookmark]);
  };

  const removeBlogBookmark = (blogId: string) => {
    const wasRemoved = blogBookmarks.some(bookmark => bookmark._id === blogId);
    setBlogBookmarks(prev => prev.filter(bookmark => bookmark._id !== blogId));
    return wasRemoved;
  };

  const isBlogBookmarked = (blogId: string) => {
    return blogBookmarks.some(bookmark => bookmark._id === blogId);
  };

  return (
    <BookmarkContext.Provider value={{ 
      toolBookmarks, 
      blogBookmarks, 
      addToolBookmark, 
      removeToolBookmark, 
      isToolBookmarked,
      addBlogBookmark,
      removeBlogBookmark,
      isBlogBookmarked
    }}>
      {children}
    </BookmarkContext.Provider>
  );
};
