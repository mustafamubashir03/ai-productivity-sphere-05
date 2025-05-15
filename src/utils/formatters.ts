
/**
 * Utility functions for formatting data
 */

/**
 * Format blog data from API response for display
 */
export const formatBlogData = (blogs: any[]) => {
  if (!blogs || !blogs.length) return [];
  
  return blogs.map(blog => ({
    id: blog._id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt || "Read more about this topic...",
    image: blog.image || "/placeholder.svg",
    date: new Date(blog.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    readTime: blog.readTime || `${Math.ceil((blog.content?.length || 0) / 1500)} min read`,
    category: blog.category || "General"
  }));
};

/**
 * Format date string to human-readable format
 */
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Calculate reading time based on content length
 */
export const calculateReadingTime = (content: string) => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min read`;
};
