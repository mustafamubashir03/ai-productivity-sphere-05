
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Clock, Bookmark, BookmarkCheck } from "lucide-react";
import SEOHead from "@/components/common/SEOHead";
import PageHeader from "@/components/common/PageHeader";
import { useEffect, useState } from "react";
import BlogCardSkeleton from "@/components/skeletons/BlogCardSkeleton";
import { useBookmarks } from "@/context/BookmarkContext";
import { toast } from "@/components/ui/sonner";
import { PaginationControls } from "@/components/ui/pagination";
import { useBlogs, API_BASE_URL, adaptBlogsResponse } from "@/hooks/use-api";
import { formatBlogData } from "@/utils/formatters";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import EnhancedSEO from "@/components/common/EnhancedSEO";
import { Home } from "lucide-react";

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
  const { addBlogBookmark, removeBlogBookmark, isBlogBookmarked } = useBookmarks();
  
  // For backward compatibility
  const addBookmark = addBlogBookmark;
  const removeBookmark = removeBlogBookmark;
  const isBookmarked = isBlogBookmarked;
  
  // Get current page from URL query or default to 1
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const postsPerPage = 8; // Show 8 posts per page
  
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
  const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));
  
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
  const handleToggleBookmark = (blogId: string, title: string, slug: string, excerpt: string, date: string, image: string) => {
    if (isBookmarked(blogId)) {
      removeBookmark(blogId);
      toast.success(`"${title}" removed from bookmarks`);
    } else {
      addBookmark({
        _id: blogId,
        title: title,
        slug: slug,
        excerpt: excerpt,
        date: date,
        image: image,
      });
      toast.success(`"${title}" added to bookmarks`);
    }
  };

  // Format image URL
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '/placeholder.svg';
    
    if (imagePath.startsWith('http')) {
      return imagePath; // Already a full URL (e.g., Cloudinary)
    } else if (imagePath.startsWith('/')) {
      return `${API_BASE_URL}${imagePath}`; // Relative path to API
    }
    
    return imagePath; // Return as is if none of the above
  };

  // Generate structured data for blogs page
  const structuredData = [
    {
      type: "WebSite" as const,
      data: {
        name: "Top AI Tools - Blog",
        description: "Insights, guides, and tips on using top AI tools to enhance productivity and streamline your workflow.",
        url: "https://alltopaitools.com/blog",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://alltopaitools.com/blog?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    },
    {
      type: "BreadcrumbList" as const,
      data: {
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://alltopaitools.com"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://alltopaitools.com/blog"
          }
        ]
      }
    },
    {
      type: "FAQPage" as const,
      data: {
        mainEntity: [
          {
            "@type": "Question",
            name: "What kind of AI productivity tips can I find on the Top AI Tools blog?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our blog covers a wide range of AI productivity topics including tool comparisons, step-by-step guides, industry insights, and tips for maximizing efficiency with AI tools across various industries and use cases."
            }
          },
          {
            "@type": "Question",
            name: "How often is the Top AI Tools blog updated?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We regularly update our blog with fresh content about the latest AI tools and productivity strategies. We aim to publish new articles weekly to keep you informed about the rapidly evolving AI landscape."
            }
          }
        ]
      }
    }
  ];

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
      <EnhancedSEO 
        title="Blog - Top AI Tools"
        description="Learn about AI productivity tips, top AI tools comparisons, and industry insights to improve your workflow and efficiency."
        canonicalUrl="/blog"
        structuredData={structuredData}
      />
      
      <PageHeader 
        title="AI Productivity Blog - Top AI Tools"
        description="Insights, guides, and tips on using top AI tools to enhance productivity and streamline your workflow."
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4 mr-1" />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Blog</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="flex justify-between items-center mb-6">
          <Link 
            to="/bookmarks" 
            className="flex items-center text-primary hover:underline"
          >
            <Bookmark className="mr-2 h-4 w-4" /> View Bookmarks
          </Link>
        </div>

        {/* Pagination Controls at Top - Make sure it's always visible */}
        {!isLoading && blogs && blogs.length > 0 && (
          <div className="mb-8 flex justify-center">
            <PaginationControls 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              siblingCount={1}
            />
          </div>
        )}
        
        <div className="max-w-3xl mx-auto"> {/* Centered container */}
          <div className="grid grid-cols-1 gap-8">
            {isLoading ? (
              // Show skeletons while loading
              Array(postsPerPage).fill(0).map((_, index) => (
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
                      src={getImageUrl(post.coverImage || post.image || '')} 
                      alt={post.title} 
                      className="w-full h-48 md:h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                      loading="lazy"
                    />
                  </div>
                  <div className="md:w-3/5 lg:w-2/3 p-5 flex flex-col">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                      <button 
                        className={`${isBookmarked(post._id) ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
                        onClick={() => handleToggleBookmark(
                          post._id, 
                          post.title,
                          post.slug,
                          post.excerpt,
                          post.publishedAt || post.createdAt,
                          post.coverImage || post.image || ''
                        )}
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
                      <span>{post.readTime || getReadTime(post.content)} min read</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    {/* Tags/Categories for internal linking */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 3).map(tag => (
                          <Link 
                            key={tag} 
                            to={`/tools?tag=${encodeURIComponent(tag)}`}
                            className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300 hover:bg-primary/10"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    )}
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

          {/* Pagination Controls at Bottom */}
          {!isLoading && blogs && blogs.length > 0 && (
            <div className="mt-8 flex justify-center">
              <PaginationControls 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                siblingCount={1}
              />
            </div>
          )}

          {/* FAQ Section */}
          <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">What kind of AI productivity tips can I find on the Top AI Tools blog?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our blog covers a wide range of AI productivity topics including tool comparisons, step-by-step guides, 
                  industry insights, and tips for maximizing efficiency with AI tools across various industries and use cases.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">How often is the Top AI Tools blog updated?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We regularly update our blog with fresh content about the latest AI tools and productivity strategies. 
                  We aim to publish new articles weekly to keep you informed about the rapidly evolving AI landscape.
                </p>
              </div>
            </div>
          </div>

          {/* Minimal newsletter signup at bottom */}
          <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
            <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-white">
              Get productivity insights on top AI tools delivered
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Join our occasional newsletter for the latest top AI productivity tips
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
