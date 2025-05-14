import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Bookmark, BookmarkCheck, Calendar, Clock, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import EnhancedSEO from "@/components/common/EnhancedSEO";
import { getBlogPostBySlug } from "@/data/blog";
import { tools } from "@/data/tools";
import { useBookmarks } from "@/context/BookmarkContext";
import { toast } from "@/components/ui/sonner";
import BlogDetailSkeleton from "@/components/skeletons/BlogDetailSkeleton";
import ToolCard, { Tool } from "@/components/common/ToolCard";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [relatedTools, setRelatedTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  useEffect(() => {
    if (slug) {
      // Simulate data fetching delay
      const timer = setTimeout(() => {
        const foundPost = getBlogPostBySlug(slug);
        setPost(foundPost);
        
        if (foundPost && foundPost.relatedTools) {
          const related = foundPost.relatedTools
            .map(toolId => tools.find(t => t.id === toolId))
            .filter(Boolean) as Tool[];
          
          setRelatedTools(related);
        }
        
        setLoading(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [slug]);

  const handleToggleBookmark = () => {
    if (!post) return;
    
    if (isBookmarked(post.id)) {
      removeBookmark(post.id);
      toast.success(`"${post.title}" removed from bookmarks`);
    } else {
      addBookmark(post.id);
      toast.success(`"${post.title}" added to bookmarks`);
    }
  };
  
  const handleSharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
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

  if (loading) {
    return <BlogDetailSkeleton />;
  }

  if (!post) {
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
  
  // Prepare structured data for SEO
  const structuredData = [
    {
      type: "Article" as const,
      data: {
        headline: post.title,
        description: post.excerpt,
        image: post.image || "/placeholder.svg",
        author: {
          "@type": "Person",
          name: post.author
        },
        publisher: {
          "@type": "Organization",
          name: "AI Productivity Hub",
          logo: {
            "@type": "ImageObject",
            url: window.location.origin + "/favicon.svg"
          }
        },
        datePublished: post.date,
        articleSection: post.category,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": window.location.href
        }
      }
    }
  ];

  return (
    <>
      <EnhancedSEO 
        title={`${post.title} - AI Productivity Hub`}
        description={post.excerpt}
        image={post.image}
        canonicalUrl={window.location.href}
        structuredData={structuredData}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back Button and Actions */}
        <div className="mb-6 flex justify-between items-center">
          <Link to="/blog" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSharePost}
              className="flex items-center text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              aria-label="Share article"
            >
              <Share className="h-5 w-5 mr-1" />
              <span className="text-sm">Share</span>
            </button>
            
            <button
              onClick={handleToggleBookmark}
              className={`flex items-center ${isBookmarked(post.id) ? 'text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary'} transition-colors`}
              aria-label={isBookmarked(post.id) ? "Remove from bookmarks" : "Add to bookmarks"}
            >
              {isBookmarked(post.id) ? (
                <>
                  <BookmarkCheck className="h-5 w-5 mr-1" /> Bookmarked
                </>
              ) : (
                <>
                  <Bookmark className="h-5 w-5 mr-1" /> Bookmark
                </>
              )}
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8 relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
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
              <Calendar className="h-4 w-4 mr-1" />
              <time dateTime={post.date}>{post.date}</time>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readTime} min read</span>
            </div>
            
            {post.author && (
              <div className="flex items-center">
                <img 
                  src={post.authorAvatar || "/placeholder.svg"} 
                  alt={post.author}
                  className="h-6 w-6 rounded-full mr-2 object-cover"
                />
                <span>{post.author}</span>
              </div>
            )}
          </div>
        </div>

        {/* Post Content with styled HTML */}
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none prose-a:text-primary prose-img:rounded-lg prose-headings:scroll-mt-20">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Related Tools Section */}
          {relatedTools.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Tools Mentioned in This Article</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
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
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
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
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878 1.216 0 1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center dark:border-gray-700"
                  onClick={handleSharePost}
                >
                  <Share className="mr-2 h-4 w-4" />
                  Copy Link
                </Button>
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
