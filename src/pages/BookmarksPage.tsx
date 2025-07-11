
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Bookmark, Calendar } from "lucide-react";
import SEOHead from "@/components/common/SEOHead";
import PageHeader from "@/components/common/PageHeader";
import { useBookmarks } from "@/context/BookmarkContext";
import { toast } from "@/components/ui/sonner";
import { API_BASE_URL } from "@/hooks/use-api";

const BookmarksPage = () => {
  const { blogBookmarks, removeBlogBookmark } = useBookmarks();

  const handleRemoveBookmark = (id: string, title: string) => {
    if (removeBlogBookmark(id)) {
      toast.success(`"${title}" has been removed from bookmarks`);
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

  // For debugging
  console.log("Blog bookmarks:", blogBookmarks);

  return (
    <>
      <SEOHead 
        title="Bookmarks - Top AI Tools"
        description="Your saved articles and blog posts from Top AI Tools. Access your bookmarked content about AI productivity tools in one place."
      />
      
      <PageHeader 
        title="Your Bookmarks"
        description="Access your saved articles and blog posts in one place."
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto">
          {blogBookmarks.length === 0 ? (
            <div className="text-center py-10">
              <div className="mb-4">
                <Bookmark className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No bookmarks yet</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start saving your favorite articles by clicking the bookmark icon on any blog post.
              </p>
              <Link 
                to="/blog" 
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg"
              >
                Browse Blog
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {blogBookmarks.map((post) => (
                <div 
                  key={post._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row"
                >
                  <div className="md:w-2/5 lg:w-1/3 flex-shrink-0">
                    <img 
                      src={getImageUrl(post.image)}
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
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                      <button 
                        className="text-primary hover:text-primary-dark" 
                        onClick={() => handleRemoveBookmark(post._id, post.title)}
                        aria-label="Remove bookmark"
                      >
                        <Bookmark className="h-4 w-4 fill-current" />
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
                      <span>5 min read</span>
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
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookmarksPage;
