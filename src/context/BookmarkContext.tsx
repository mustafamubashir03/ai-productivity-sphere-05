
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { blogPosts } from '@/data/blog';

// Define the type for a bookmark
export interface Bookmark {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  image: string;
}

interface BookmarkContextType {
  bookmarks: Bookmark[];
  addBookmark: (postId: string) => void;
  removeBookmark: (postId: string) => void;
  isBookmarked: (postId: string) => boolean;
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
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // Load bookmarks from localStorage on initial mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('blogBookmarks');
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error('Failed to parse bookmarks from localStorage', error);
        localStorage.removeItem('blogBookmarks');
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('blogBookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (postId: string) => {
    const post = blogPosts.find(post => post.id === postId);
    if (post && !isBookmarked(postId)) {
      const newBookmark: Bookmark = {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        date: post.date,
        image: post.image,
      };
      setBookmarks(prev => [...prev, newBookmark]);
    }
  };

  const removeBookmark = (postId: string) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== postId));
  };

  const isBookmarked = (postId: string) => {
    return bookmarks.some(bookmark => bookmark.id === postId);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};
