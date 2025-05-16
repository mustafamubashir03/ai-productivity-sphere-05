
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
    _id: blog._id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt || "Read more about this topic...",
    image: blog.coverImage || blog.image || "/placeholder.svg",
    date: blog.publishedAt || blog.createdAt,
    formattedDate: formatDate(blog.publishedAt || blog.createdAt),
    readTime: blog.readTime || `${Math.ceil((blog.content?.length || 0) / 1500)} min read`,
    category: blog.category || "General"
  }));
};

/**
 * Format date string to human-readable format
 */
export const formatDate = (dateString: string) => {
  if (!dateString) return '';
  
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

/**
 * Format a tool for display
 */
export const formatToolData = (tool: any) => {
  if (!tool) return null;
  
  return {
    ...tool,
    _id: tool._id || tool.id,
    id: tool.id || tool._id
  };
};
