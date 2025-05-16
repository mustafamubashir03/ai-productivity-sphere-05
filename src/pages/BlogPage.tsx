
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Clock, Bookmark, BookmarkCheck, Calendar } from "lucide-react";
import SEOHead from "@/components/common/SEOHead";
import PageHeader from "@/components/common/PageHeader";
import { useEffect, useState } from "react";
import BlogCardSkeleton from "@/components/skeletons/BlogCardSkeleton";
import { useBookmarks } from "@/context/BookmarkContext";
import { toast } from "@/components/ui/sonner";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { useBlogs, API_BASE_URL, adaptBlogsResponse } from "@/hooks/use-api";
import { formatBlogData } from "@/utils/formatters";

// Define the Blog type based on the API response
interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  image?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  category?: string;
  tags?: string[];
  author?: {
    name: string;
    bio?: string;
    avatarUrl?: string;
  };
  readTime?: number;
  wordCount?: number;
}

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToolBookmark, removeToolBookmark, isToolBookmarked } = useBookmarks();
  
  // For backward compatibility
  const addBookmark = addToolBookmark;
  const removeBookmark = removeToolBookmark;
  const isBookmarked = isToolBookmarked;
  
  // Get current page from URL query or default to 1
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const postsPerPage = 6;
  
  // Use the blogs API hook
  const { data: blogsData, isLoading, error } = useBlogs();

  // Process blog data
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    if (blogsData) {
      console.log("Blog data:", blogsData);
      const blogsArray = adaptBlogsResponse(blogsData);
      setBlogs(blogsArray);
    }
  }, [blogsData]);
  
  // Calculate pagination values
  const totalPosts = blogs?.length || 0;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  // Ensure current page is valid
  useEffect(() => {
    if (blogs && (currentPage < 1 || currentPage > totalPages)) {
      setSearchParams({ page: "1" });
    }
  }, [currentPage, totalPages, setSearchParams, blogs]);

  // Get current page posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs ? blogs.slice(indexOfFirstPost, indexOfLastPost) : [];

  // Get read time (simple estimation based on content length)
  const getReadTime = (content: string, readTime?: number) => {
    if (readTime) return readTime;
    
    // Average reading speed: 200 words per minute
    const wordCount = content.split(/\s+/).length;
    const calculatedReadTime = Math.ceil(wordCount / 200);
    return calculatedReadTime < 1 ? 1 : calculatedReadTime;
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Change page
  const handlePageChange = (pageNumber: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearchParams({ page: pageNumber.toString() });
  };

  // Toggle bookmark
  const handleToggleBookmark = (blogId: string, title: string) => {
    if (isBookmarked(blogId)) {
      removeBookmark(blogId);
      toast.success(`"${title}" removed from bookmarks`);
    } else {
      addBookmark({_id: blogId, id: blogId, name: title, type: 'blog'});
      toast.success(`"${title}" added to bookmarks`);
    }
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max to show
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page, last page, current page, and some adjacent pages
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('ellipsis');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('ellipsis');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push('ellipsis');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  // Handle error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h2 className="text-xl font-semibold mb-4">Error loading blog posts</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          We're having trouble loading the blog posts. Please try again later.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <SEOHead 
        title="Blog - AI Productivity Hub"
        description="Learn about AI productivity tips, tool comparisons, and industry insights to improve your workflow and efficiency."
      />
      
      <PageHeader 
        title="AI Productivity Blog"
        description="Insights, guides, and tips on using AI tools to enhance productivity and streamline your workflow."
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-end mb-6">
          <Link 
            to="/bookmarks" 
            className="flex items-center text-primary hover:underline"
          >
            <Bookmark className="mr-2 h-4 w-4" /> View Bookmarks
          </Link>
        </div>
        
        <div className="max-w-3xl mx-auto"> {/* Centered container */}
          <div className="grid grid-cols-1 gap-8">
            {isLoading ? (
              // Show skeletons while loading
              Array(6).fill(0).map((_, index) => (
                <BlogCardSkeleton key={`skeleton-${index}`} />
              ))
            ) : blogs && blogs.length > 0 ? (
              // Show actual blog posts when loaded
              currentPosts.map((post: Blog) => (
                <div 
                  key={post._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row"
                >
                  <div className="md:w-2/5 lg:w-1/3 flex-shrink-0">
                    <img 
                      src={post.coverImage || post.image || "/placeholder.svg"} 
                      alt={post.title} 
                      className="w-full h-48 md:h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="md:w-3/5 lg:w-2/3 p-5 flex flex-col">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                      <button 
                        className={`${isBookmarked(post._id) ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
                        onClick={() => handleToggleBookmark(post._id, post.title)}
                        aria-label={isBookmarked(post._id) ? "Remove bookmark" : "Add bookmark"}
                      >
                        {isBookmarked(post._id) ? (
                          <BookmarkCheck className="h-4 w-4" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                      <Link 
                        to={`/blog/${post.slug}`} 
                        className="hover:text-primary transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{getReadTime(post.content, post.readTime)} min read</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <Link 
                      to={`/blog/${post.slug}`} 
                      className="text-primary font-medium flex items-center hover:underline mt-auto"
                    >
                      Read Full Article <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              // No posts found
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">No blog posts found.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="mt-10">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                      className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                    />
                  </PaginationItem>
                  
                  {getPageNumbers().map((pageNumber, index) => (
                    pageNumber === 'ellipsis' ? (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <span className="px-4 py-2">...</span>
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={`page-${pageNumber}`}>
                        <PaginationLink 
                          isActive={currentPage === pageNumber}
                          onClick={() => handlePageChange(pageNumber as number)}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                      className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          {/* Minimal newsletter signup at bottom */}
          <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
            <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-white">
              Get productivity insights delivered
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Join our occasional newsletter for the latest AI productivity tips
            </p>
            <div className="flex max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
              />
              <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-r-lg text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
