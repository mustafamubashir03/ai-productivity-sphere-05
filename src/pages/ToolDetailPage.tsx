import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BarChart2, Bookmark, BookmarkCheck, ExternalLink, ThumbsUp, ThumbsDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import EnhancedSEO from "@/components/common/EnhancedSEO";
import { getToolBySlug, getRelatedTools } from "@/data/tools";
import { getBlogPostsRelatedToTool } from "@/data/blog";
import { useBookmarks } from "@/context/BookmarkContext";
import { useCompare } from "@/context/CompareContext";
import ToolDetailSkeleton from "@/components/skeletons/ToolDetailSkeleton";
import ToolCard from "@/components/common/ToolCard";
import { Tool } from "@/types/tools"; // Import Tool type from our types file
import CompareBar from "@/components/tools/CompareBar";
import { toast } from "@/components/ui/sonner";
import { useTool } from "@/hooks/use-api";

const ToolDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [tool, setTool] = useState<Tool | null>(null);
  const [relatedTools, setRelatedTools] = useState<Tool[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [upvotes, setUpvotes] = useState<number>(0);
  const [downvotes, setDownvotes] = useState<number>(0);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  
  // Use the API hook to fetch tool data
  const { data: apiToolData, isLoading: apiLoading } = slug ? useTool(slug) : { data: null, isLoading: false };
  
  useEffect(() => {
    if (slug) {
      // First try to get data from API, then fallback to local data
      if (apiToolData) {
        setTool(apiToolData);
        setLoading(false);
        
        // Get related tools and blog posts
        if (apiToolData._id) {
          const related = getRelatedTools(apiToolData._id);
          setRelatedTools(related);
          
          const relatedBlogPosts = getBlogPostsRelatedToTool(apiToolData._id);
          setRelatedPosts(relatedBlogPosts);
        }
        
        // Get votes from localStorage
        const toolId = apiToolData._id;
        const savedUpvotes = localStorage.getItem(`tool-${toolId}-upvotes`);
        const savedDownvotes = localStorage.getItem(`tool-${toolId}-downvotes`);
        const savedUserVote = localStorage.getItem(`tool-${toolId}-user-vote`);
        
        setUpvotes(savedUpvotes ? parseInt(savedUpvotes) : Math.floor(Math.random() * 50) + 20);
        setDownvotes(savedDownvotes ? parseInt(savedDownvotes) : Math.floor(Math.random() * 10) + 1);
        setUserVote(savedUserVote as 'up' | 'down' | null);
      } else if (!apiLoading) {
        // If API didn't return data and is not loading, try local data
        const localTool = getToolBySlug(slug);
        
        if (localTool) {
          setTool(localTool);
          
          // Get related data
          const toolId = localTool._id;
          const related = getRelatedTools(toolId);
          setRelatedTools(related);
          
          const relatedBlogPosts = getBlogPostsRelatedToTool(toolId);
          setRelatedPosts(relatedBlogPosts);
          
          // Get votes from localStorage
          const savedUpvotes = localStorage.getItem(`tool-${toolId}-upvotes`);
          const savedDownvotes = localStorage.getItem(`tool-${toolId}-downvotes`);
          const savedUserVote = localStorage.getItem(`tool-${toolId}-user-vote`);
          
          setUpvotes(savedUpvotes ? parseInt(savedUpvotes) : Math.floor(Math.random() * 50) + 20);
          setDownvotes(savedDownvotes ? parseInt(savedDownvotes) : Math.floor(Math.random() * 10) + 1);
          setUserVote(savedUserVote as 'up' | 'down' | null);
        }
        
        setLoading(false);
      }
    }
  }, [slug, apiToolData, apiLoading]);
  
  // Store recently viewed tools in localStorage
  useEffect(() => {
    if (tool) {
      try {
        // Get existing recently viewed tools
        const recentlyViewedJSON = localStorage.getItem('recentlyViewedTools');
        const recentlyViewed = recentlyViewedJSON ? JSON.parse(recentlyViewedJSON) : [];
        
        // Add current tool if not already in the list
        const exists = recentlyViewed.some((t: any) => t._id === tool._id);
        
        if (!exists) {
          // Add to front of array and keep only last 10
          const updatedRecentlyViewed = [
            {
              _id: tool._id,
              name: tool.name,
              slug: tool.slug,
              logo: tool.logo,
              category: tool.category,
              description: tool.description.substring(0, 100) + '...',
              timestamp: new Date().toISOString(),
            },
            ...recentlyViewed
          ].slice(0, 10);
          
          localStorage.setItem('recentlyViewedTools', JSON.stringify(updatedRecentlyViewed));
        }
      } catch (error) {
        console.error("Error updating recently viewed tools:", error);
      }
    }
  }, [tool]);
  
  const handleBookmark = () => {
    if (!tool) return;
    
    const toolId = tool._id;
    if (isBookmarked(toolId)) {
      removeBookmark(toolId);
      toast.success("Tool removed from bookmarks");
    } else {
      addBookmark(toolId);
      toast.success("Tool added to bookmarks");
    }
  };
  
  const handleCompare = () => {
    if (!tool) return;
    
    const toolId = tool._id;
    if (isInCompare(toolId)) {
      removeFromCompare(toolId);
    } else {
      addToCompare(tool);
    }
  };
  
  const handleVote = (voteType: 'up' | 'down') => {
    if (!tool) return;
    
    const toolId = tool._id;
    if (userVote === voteType) {
      // User is un-voting
      if (voteType === 'up') {
        setUpvotes(prev => prev - 1);
      } else {
        setDownvotes(prev => prev - 1);
      }
      setUserVote(null);
      localStorage.removeItem(`tool-${toolId}-user-vote`);
    } else {
      // User is voting or changing vote
      if (userVote === 'up' && voteType === 'down') {
        setUpvotes(prev => prev - 1);
        setDownvotes(prev => prev + 1);
      } else if (userVote === 'down' && voteType === 'up') {
        setDownvotes(prev => prev - 1);
        setUpvotes(prev => prev + 1);
      } else if (voteType === 'up') {
        setUpvotes(prev => prev + 1);
      } else {
        setDownvotes(prev => prev + 1);
      }
      setUserVote(voteType);
      localStorage.setItem(`tool-${toolId}-user-vote`, voteType);
    }
    
    // Save votes to localStorage
    localStorage.setItem(`tool-${toolId}-upvotes`, String(voteType === 'up' ? upvotes + 1 : upvotes));
    localStorage.setItem(`tool-${toolId}-downvotes`, String(voteType === 'down' ? downvotes + 1 : downvotes));
  };
  
  if (loading || apiLoading) {
    return <ToolDetailSkeleton />;
  }
  
  if (!tool) {
    return (
      <div className="container mx-auto px-4 py-10 text-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Tool Not Found</h2>
        <p className="mb-6 dark:text-gray-300">The tool you're looking for doesn't exist or has been removed.</p>
        <Link to="/tools">
          <Button>Back to All Tools</Button>
        </Link>
      </div>
    );
  }
  
  // Prepare structured data for SEO
  const structuredData = [
    {
      type: "Product" as const,
      data: {
        name: tool?.name,
        description: tool?.description,
        image: tool?.logo || "/placeholder.svg",
        brand: {
          "@type": "Brand",
          name: "AI Productivity Hub"
        },
        offers: {
          "@type": "Offer",
          price: tool?.pricing || "Various pricing options available",
          url: window.location.href
        },
        aggregateRating: tool?.rating ? {
          "@type": "AggregateRating",
          ratingValue: tool.rating,
          reviewCount: upvotes + downvotes,
          bestRating: "5",
          worstRating: "1"
        } : undefined
      }
    },
    {
      type: "Review" as const,
      data: {
        itemReviewed: {
          "@type": "SoftwareApplication",
          name: tool?.name,
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: tool?.rating || "4.5",
          bestRating: "5"
        },
        author: {
          "@type": "Organization",
          name: "AI Productivity Hub"
        },
        reviewBody: tool?.editorVerdict || tool?.description
      }
    }
  ];
  
  return (
    <>
      <EnhancedSEO 
        title={`${tool.name} Review - AI Productivity Hub`}
        description={tool.description}
        image={tool.logo || "/placeholder.svg"}
        canonicalUrl={window.location.href}
        structuredData={structuredData}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/tools" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Tools
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
                <img
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  className="w-12 h-12 object-contain"
                  loading="lazy"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold dark:text-white">{tool.name}</h1>
                <div className="flex items-center mt-1">
                  {tool.rating && (
                    <div className="flex items-center text-yellow-500 mr-3">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star 
                          key={index} 
                          className={`h-4 w-4 ${index < Math.floor(tool.rating) ? 'fill-yellow-500' : (index < tool.rating ? 'fill-yellow-500' : '')}`}
                          fill={index < Math.floor(tool.rating) ? 'currentColor' : 'none'}
                        />
                      ))}
                      <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">{tool.rating}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                    <span>{upvotes} upvotes</span>
                    <span>•</span>
                    <span>{tool.trending ? 'Trending' : 'Active'}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="prose max-w-none dark:prose-invert">
              <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">{tool.description}</p>
              
              {/* Editor's Verdict */}
              {tool.editorVerdict && (
                <div className="bg-primary/5 dark:bg-primary/10 border-l-4 border-primary p-4 rounded-r-lg mb-8">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Editor's Verdict</h2>
                  <p className="text-gray-700 dark:text-gray-300 italic">{tool.editorVerdict}</p>
                </div>
              )}
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Key Features</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {tool.features && tool.features.map((feature: string, index: number) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Use Cases</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {tool.useCases && tool.useCases.map((useCase: string, index: number) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">{useCase}</li>
                  ))}
                </ul>
              </div>
              
              {tool.screenshots && tool.screenshots.length > 0 ? (
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-8">
                  <img
                    src={tool.screenshots[0]}
                    alt={`${tool.name} screenshot`}
                    className="w-full h-auto rounded-md shadow-sm mb-4"
                    loading="lazy"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    {tool.name} interface screenshot
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-8">
                  <img
                    src="/placeholder.svg"
                    alt={`${tool.name} screenshot placeholder`}
                    className="w-full h-auto rounded-md shadow-sm mb-4"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    {tool.name} interface screenshot
                  </p>
                </div>
              )}
              
              {/* User Voting */}
              <div className="flex items-center justify-center space-x-8 py-6 border-t border-b border-gray-200 dark:border-gray-700 mb-8">
                <button 
                  onClick={() => handleVote('up')}
                  className={`flex flex-col items-center ${userVote === 'up' ? 'text-green-600 dark:text-green-500' : 'text-gray-500 dark:text-gray-400'}`}
                >
                  <ThumbsUp className="h-6 w-6 mb-1" />
                  <span className="text-sm font-medium">Helpful ({upvotes})</span>
                </button>
                
                <button 
                  onClick={() => handleVote('down')}
                  className={`flex flex-col items-center ${userVote === 'down' ? 'text-red-600 dark:text-red-500' : 'text-gray-500 dark:text-gray-400'}`}
                >
                  <ThumbsDown className="h-6 w-6 mb-1" />
                  <span className="text-sm font-medium">Not Helpful ({downvotes})</span>
                </button>
              </div>
            </div>
            
            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Similar Tools You Might Like</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedTools.map(relatedTool => (
                    <ToolCard key={relatedTool._id} tool={relatedTool} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Related Blog Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Read More About {tool.name}</h2>
                <div className="space-y-4">
                  {relatedPosts.map(post => (
                    <Link 
                      key={post.id} 
                      to={`/blog/${post.slug}`}
                      className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <h3 className="font-medium text-lg text-gray-800 dark:text-white mb-1">{post.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{post.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 sticky top-20">
              {/* Action Buttons */}
              <div className="flex flex-col space-y-3 mb-6">
                <a
                  href={tool.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button className="w-full">
                    Try Tool <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 dark:border-gray-700"
                    onClick={handleBookmark}
                  >
                    {isBookmarked(tool._id) ? (
                      <>
                        <BookmarkCheck className="mr-2 h-4 w-4" /> Saved
                      </>
                    ) : (
                      <>
                        <Bookmark className="mr-2 h-4 w-4" /> Save
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex-1 dark:border-gray-700"
                    onClick={handleCompare}
                  >
                    <BarChart2 className="mr-2 h-4 w-4" /> 
                    {isInCompare(tool._id) ? 'Remove Compare' : 'Compare'}
                  </Button>
                </div>
              </div>
              
              {tool.pricing && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Pricing</h3>
                  <p className="text-gray-700 dark:text-gray-300">{tool.pricing}</p>
                </div>
              )}
              
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Category</h3>
                <Link
                  to={`/tools/category/${tool.category}`}
                  className="text-primary hover:underline"
                >
                  {tool.category.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Link>
              </div>
              
              {tool.industryFit && tool.industryFit.length > 0 && (
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Best For</h3>
                  <div className="flex flex-wrap gap-2">
                    {tool.industryFit.map((industry: string) => (
                      <Link
                        key={industry}
                        to={`/tools?industry=${industry}`}
                        className="inline-block px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        {industry.charAt(0).toUpperCase() + industry.slice(1)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Sponsor Section */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Premium Listing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Want your tool to be featured prominently?
                </p>
                <a 
                  href="/contact?subject=Premium%20Listing"
                  className="text-sm text-primary hover:underline"
                >
                  Contact us about Premium Listings
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Compare Bar */}
      <CompareBar />
    </>
  );
};

export default ToolDetailPage;
