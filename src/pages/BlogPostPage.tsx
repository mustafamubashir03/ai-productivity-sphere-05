
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Bookmark, BookmarkCheck, Calendar, Clock, Share, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import EnhancedSEO from "@/components/common/EnhancedSEO";
import { useBookmarks } from "@/context/BookmarkContext";
import { toast } from "@/components/ui/sonner";
import BlogDetailSkeleton from "@/components/skeletons/BlogDetailSkeleton";
import { useBlog, useTool, API_BASE_URL } from "@/hooks/use-api";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addBlogBookmark, removeBlogBookmark, isBlogBookmarked } = useBookmarks();
  
  // For backward compatibility
  const addBookmark = addBlogBookmark;
  const removeBookmark = removeBlogBookmark;
  const isBookmarked = isBlogBookmarked;
  
  // Fetch blog post from API
  const { data: post, isLoading: isPostLoading, error } = useBlog(slug || '');
  
  // State for related tools (would need API endpoint for this)
  const [relatedTools, setRelatedTools] = useState<any[]>([]);
  const [isRelatedToolsLoading, setIsRelatedToolsLoading] = useState(false);

  // Calculate read time
  const getReadTime = (content: string) => {
    // Average reading speed: 200 words per minute
    const wordCount = content?.split(/\s+/).length || 0;
    const readTime = Math.ceil(wordCount / 200);
    return readTime < 1 ? 1 : readTime;
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleToggleBookmark = () => {
    if (!post) return;
    
    if (isBookmarked(post._id)) {
      removeBookmark(post._id);
      toast.success(`"${post.title}" removed from bookmarks`);
    } else {
      addBookmark({
        _id: post._id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        date: post.publishedAt || post.createdAt || new Date().toISOString(),
        image: post.coverImage || post.image || '',
      });
      toast.success(`"${post.title}" added to bookmarks`);
    }
  };
  
  const handleSharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      })
      .catch(() => {
        // Fallback for when sharing fails or is cancelled
        copyToClipboard(window.location.href);
        toast.success("Link copied to clipboard");
      });
    } else {
      copyToClipboard(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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

  // For debugging
  useEffect(() => {
    if (post) {
      console.log("Blog post data:", post);
      console.log("Image URL:", post.coverImage || post.image);
      console.log("Formatted image URL:", getImageUrl(post.coverImage || post.image || ''));
    }
  }, [post]);

  if (isPostLoading) {
    return <BlogDetailSkeleton />;
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-10 text-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
        <p className="mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Link to="/blog">
          <Button>Back to Blog</Button>
        </Link>
      </div>
    );
  }

  // Generate breadcrumb items for structured data
  const generateBreadcrumbItems = () => {
    return [
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
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: window.location.href
      }
    ];
  };

  // Prepare FAQ data if available
  const generateFaqData = () => {
    // This is a placeholder. In a real app, you might have FAQs stored with each blog post
    // Or generate them dynamically based on content
    return [
      {
        "@type": "Question",
        name: `What are the key points covered in this article about ${post.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: post.excerpt || "This article covers important insights about AI tools and productivity enhancements. Read the full article for detailed information."
        }
      },
      {
        "@type": "Question",
        name: "Where can I find more articles like this?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can browse our blog section for more articles on AI tools, productivity tips, and industry insights."
        }
      }
    ];
  };
  
  // Prepare structured data for SEO
  const structuredData = [
    {
      type: "Article" as const,
      data: {
        headline: post.title,
        description: post.excerpt,
        image: getImageUrl(post.coverImage || post.image || ''),
        author: {
          "@type": "Person",
          name: post.author?.name || "AI Productivity Hub Team"
        },
        publisher: {
          "@type": "Organization",
          name: post.seo?.siteName || "AI Productivity Hub",
          logo: {
            "@type": "ImageObject",
            url: window.location.origin + "/favicon.svg"
          }
        },
        datePublished: post.publishedAt || post.createdAt,
        dateModified: post.updatedAt || post.createdAt,
        articleSection: post.category || "Technology",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": window.location.href
        }
      }
    },
    {
      type: "BreadcrumbList" as const,
      data: {
        itemListElement: generateBreadcrumbItems()
      }
    },
    {
      type: "FAQPage" as const,
      data: {
        mainEntity: generateFaqData()
      }
    }
  ];

  return (
    <>
      <EnhancedSEO 
        title={post.title}
        description={post.excerpt}
        image={getImageUrl(post.coverImage || post.image || '')}
        canonicalUrl={post.seo?.canonicalUrl || `/blog/${post.slug}`}
        structuredData={structuredData}
        ogType="article"
        twitterCardType="summary_large_image"
        author={post.author?.name || "AI Productivity Hub Team"}
        publishedDate={post.publishedAt || post.createdAt}
        modifiedDate={post.updatedAt || post.createdAt}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumbs navigation */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Home className="h-4 w-4 mr-1" aria-hidden="true" />
                  <span>Home</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{post.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      
        {/* Back Button and Actions */}
        <div className="mb-6 flex justify-between items-center">
          <Link to="/blog" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" /> Back to Blog
          </Link>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSharePost}
              className="flex items-center text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              aria-label="Share article"
            >
              <Share className="h-5 w-5 mr-1" aria-hidden="true" />
              <span className="text-sm">Share</span>
            </button>
            
            <button
              onClick={handleToggleBookmark}
              className={`flex items-center ${isBookmarked(post._id) ? 'text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary'} transition-colors`}
              aria-label={isBookmarked(post._id) ? "Remove from bookmarks" : "Add to bookmarks"}
            >
              {isBookmarked(post._id) ? (
                <>
                  <BookmarkCheck className="h-5 w-5 mr-1" aria-hidden="true" /> Bookmarked
                </>
              ) : (
                <>
                  <Bookmark className="h-5 w-5 mr-1" aria-hidden="true" /> Bookmark
                </>
              )}
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8 relative">
          <img
            src={getImageUrl(post.coverImage || post.image || '')}
            alt={`Featured image for article: ${post.title}`}
            className="w-[100%] max-w-[958px]  h-auto  object-cover rounded-lg shadow-md"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
            loading="eager"
          />
          
          {post.category && (
            <div className="absolute top-4 left-4">
              <span className="inline-block px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                {post.category}
              </span>
            </div>
          )}
          
          {post.editorPick && (
            <div className="absolute top-4 right-4">
              <span className="inline-block px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-full">
                Editor's Pick
              </span>
            </div>
          )}
        </div>

        {/* Post Header */}
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">{post.title}</h1>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" aria-hidden="true" />
              <time dateTime={post.publishedAt || post.createdAt}>{formatDate(post.publishedAt || post.createdAt)}</time>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" aria-hidden="true" />
              <span>{post.readTime || getReadTime(post.content)} min read</span>
            </div>
          </div>
        </div>

        {/* Post Content with styled HTML */}
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none prose-a:text-primary prose-img:rounded-lg prose-headings:scroll-mt-20">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Tags for better SEO and internal linking */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link 
                  key={tag} 
                  to={`/tools?tag=${encodeURIComponent(tag)}`}
                  className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded text-gray-600 dark:text-gray-300 hover:bg-primary/10"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Social Sharing */}
          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-4 sm:mb-0">
                <h3 className="font-semibold text-lg mb-2 dark:text-white">Found this useful?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Share this article with your network
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center dark:border-gray-700"
                  onClick={() => {
                    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank');
                  }}
                  aria-label="Share on Twitter"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center dark:border-gray-700"
                  onClick={() => {
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
                  }}
                  aria-label="Share on LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center dark:border-gray-700"
                  onClick={handleSharePost}
                  aria-label="Copy link"
                >
                  <Share className="mr-2 h-4 w-4" aria-hidden="true" />
                  Copy Link
                </Button>
              </div>
            </div>
          </div>

          {/* FAQ Section - For better SEO */}
          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">What are the key points covered in this article?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  This article covers {post.excerpt || "important insights about AI tools and productivity enhancements. Read through for detailed information tailored to your needs."}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Where can I find more articles like this?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  You can browse our <Link to="/blog" className="text-primary hover:underline">blog section</Link> for more articles on AI tools, productivity tips, and industry insights.
                </p>
              </div>
              {post.category && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Where can I find more articles about {post.category}?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Visit our <Link to={`/blog?category=${encodeURIComponent(post.category)}`} className="text-primary hover:underline">{post.category} category page</Link> for more related articles.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Related Articles - For better SEO and internal linking */}
          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Placeholder for related articles - In a real app, you would fetch related articles from the API */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <Link to="/blog" className="text-lg font-semibold hover:text-primary dark:text-gray-100">
                  Explore More AI Productivity Tips
                </Link>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                  Discover more articles about AI tools and productivity enhancements.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <Link to="/tools" className="text-lg font-semibold hover:text-primary dark:text-gray-100">
                  Browse AI Tools Collection
                </Link>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                  Find the perfect AI tools to enhance your productivity and workflow.
                </p>
              </div>
            </div>
          </div>

          {/* Author Section */}
          <div className="mt-10 pt-10 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-lg mb-2 dark:text-white">About AI Productivity Hub</h3>
            <p className="text-gray-600 dark:text-gray-300">
              AI Productivity Hub curates the best AI tools to help professionals enhance their workflow and productivity.
              Our team of experts reviews and tests hundreds of AI solutions to bring you reliable recommendations.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;
