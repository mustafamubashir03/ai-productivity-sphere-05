import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BarChart2, Bookmark, BookmarkCheck, ExternalLink, ThumbsUp, ThumbsDown, Star, Calendar, Users, Globe, Code, CheckCircle, XCircle, Quote, Eye, MousePointer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import EnhancedSEO from "@/components/common/EnhancedSEO";
import { getToolBySlug, getRelatedTools } from "@/data/tools";
import { getBlogPosts } from "@/data/blog";
import { useBookmarks } from "@/context/BookmarkContext";
import { useCompare } from "@/context/CompareContext";
import ToolDetailSkeleton from "@/components/skeletons/ToolDetailSkeleton";
import ToolCard from "@/components/common/ToolCard";
import { Tool } from "@/types/tools";
import CompareBar from "@/components/tools/CompareBar";
import { toast } from "@/components/ui/sonner";
import { useTool } from "@/hooks/use-api";
import ScreenshotCarousel from "@/components/tools/ScreenshotCarousel";
import RelatedTools from "@/components/tools/RelatedTools";

const ToolDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [tool, setTool] = useState<Tool | null>(null);
  const [relatedTools, setRelatedTools] = useState<Tool[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [upvotes, setUpvotes] = useState<number>(0);
  const [downvotes, setDownvotes] = useState<number>(0);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);
  const [showMoreUseCases, setShowMoreUseCases] = useState(false);
  
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
          
          // Get random blog posts instead of empty relatedPosts
          const allBlogPosts = getBlogPosts();
          const shuffledPosts = [...allBlogPosts].sort(() => 0.5 - Math.random());
          setRelatedPosts(shuffledPosts.slice(0, 3));
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
          const toolId = localTool._id || localTool.id || '';
          const related = getRelatedTools(toolId);
          setRelatedTools(related);
          
          // Get random blog posts instead of empty relatedPosts
          const allBlogPosts = getBlogPosts();
          const shuffledPosts = [...allBlogPosts].sort(() => 0.5 - Math.random());
          setRelatedPosts(shuffledPosts.slice(0, 3));
          
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
              _id: tool._id || tool.id,
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
    
    const toolId = tool._id || tool.id || '';
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
    
    const toolId = tool._id || tool.id || '';
    if (isInCompare(toolId)) {
      removeFromCompare(toolId);
    } else {
      addToCompare(tool);
    }
  };
  
  const handleVote = (voteType: 'up' | 'down') => {
    if (!tool) return;
    
    const toolId = tool._id || tool.id || '';
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
        image: tool?.logo || "/favicon.svg",
        brand: {
          "@type": "Brand",
          name: "Top AI Tools"
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
          name: "Top AI Tools"
        },
        reviewBody: tool?.editorVerdict || tool?.description
      }
    }
  ];
  
  return (
    <>
      <EnhancedSEO 
        title={`${tool.name} Review - Top AI Tools`}
        description={tool.description}
        image={tool.logo || "/favicon.svg"}
        canonicalUrl={window.location.href}
        structuredData={structuredData}
      />
      
      <div className="min-w-0 overflow-x-hidden">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8 lg:py-10">
          {/* Back Button */}
          <div className="mb-4 sm:mb-6">
            <Link to="/tools" className="inline-flex items-center text-primary hover:underline text-sm sm:text-base">
              <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Back to All Tools
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 min-w-0">
              {/* Header Section */}
              <div className="flex items-start gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
                <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <img
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain rounded-lg"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold dark:text-white break-words">{tool.name}</h1>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {tool.featured && <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">Featured</Badge>}
                      {tool.trending && <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">Trending</Badge>}
                      {tool.reviewed && <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">Reviewed</Badge>}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
                    {tool.rating && (
                      <div className="flex items-center text-yellow-500">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star 
                            key={index} 
                            className={`h-3 w-3 sm:h-4 sm:w-4 ${index < Math.floor(tool.rating!) ? 'fill-yellow-500' : ''}`}
                            fill={index < Math.floor(tool.rating!) ? 'currentColor' : 'none'}
                          />
                        ))}
                        <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                          {tool.rating} ({tool.reviewCount || upvotes + downvotes} reviews)
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Metrics */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{tool.viewCount || Math.floor(Math.random() * 1000) + 100} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MousePointer className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{tool.clickCount || Math.floor(Math.random() * 100) + 20} clicks</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{upvotes} helpful</span>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  {tool.tags && tool.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
                      {tool.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-xs break-words">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Description */}
              <div className="prose max-w-none dark:prose-invert mb-6 sm:mb-8">
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed break-words">
                  {tool.shortDescription || tool.description}
                </p>
                {tool.shortDescription && tool.description !== tool.shortDescription && (
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-3 sm:mt-4 break-words">
                    {tool.description}
                  </p>
                )}
              </div>
              
              {/* Platform and System Info */}
              {(tool.platforms || tool.languagesSupported || tool.systemRequirements) && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-white">Platform Information</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {tool.platforms && tool.platforms.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-2">Platforms</h4>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {tool.platforms.map((platform: string) => (
                            <Badge key={platform} variant="secondary" className="text-xs">
                              <Globe className="w-3 h-3 mr-1" />
                              <span className="break-words">{platform}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {tool.languagesSupported && tool.languagesSupported.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-2">Languages</h4>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {tool.languagesSupported.map((lang: string) => (
                            <Badge key={lang} variant="outline" className="text-xs break-words">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {tool.systemRequirements && (
                    <div className="mt-4">
                      <h4 className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-2">System Requirements</h4>
                      <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 break-words">{tool.systemRequirements}</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Editor's Verdict */}
              {tool.editorVerdict && (
                <div className="bg-primary/5 dark:bg-primary/10 border-l-4 border-primary p-4 sm:p-6 rounded-r-lg mb-6 sm:mb-8">
                  <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800 dark:text-white flex items-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
                    Editor's Verdict
                  </h2>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 italic leading-relaxed break-words">{tool.editorVerdict}</p>
                </div>
              )}
              
              {/* Key Features */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-white">Key Features</h2>
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                  {tool.features && tool.features.slice(0, showMoreFeatures ? tool.features.length : 6).map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm break-words">{feature}</span>
                    </div>
                  ))}
                </div>
                {tool.features && tool.features.length > 6 && (
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowMoreFeatures(!showMoreFeatures)}
                    className="mt-3 sm:mt-4 text-xs sm:text-sm"
                  >
                    {showMoreFeatures ? 'Show Less' : `Show ${tool.features.length - 6} More Features`}
                  </Button>
                )}
              </div>
              
              {/* Use Cases */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-white">Use Cases</h2>
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                  {tool.useCases && tool.useCases.slice(0, showMoreUseCases ? tool.useCases.length : 4).map((useCase: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm break-words">{useCase}</span>
                    </div>
                  ))}
                </div>
                {tool.useCases && tool.useCases.length > 4 && (
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowMoreUseCases(!showMoreUseCases)}
                    className="mt-3 sm:mt-4 text-xs sm:text-sm"
                  >
                    {showMoreUseCases ? 'Show Less' : `Show ${tool.useCases.length - 4} More Use Cases`}
                  </Button>
                )}
              </div>
              
              {/* Pros and Cons */}
              {(tool.pros || tool.cons) && (
                <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  {tool.pros && tool.pros.length > 0 && (
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 sm:p-6 rounded-lg">
                      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-green-800 dark:text-green-300 flex items-center">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Pros
                      </h3>
                      <ul className="space-y-2">
                        {tool.pros.map((pro: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-green-700 dark:text-green-300">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
                            <span className="break-words">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {tool.cons && tool.cons.length > 0 && (
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 sm:p-6 rounded-lg">
                      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-red-800 dark:text-red-300 flex items-center">
                        <XCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Cons
                      </h3>
                      <ul className="space-y-2">
                        {tool.cons.map((con: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-red-700 dark:text-red-300">
                            <XCircle className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
                            <span className="break-words">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
              {/* Screenshots with Auto-Scroll Carousel */}
              <ScreenshotCarousel screenshots={tool.screenshots} toolName={tool.name} />
              
              {/* Testimonials */}
              {tool.testimonials && tool.testimonials.length > 0 && (
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-800 dark:text-white">What Users Say</h2>
                  <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    {tool.testimonials.map((testimonial, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-3 sm:mb-4 opacity-50" />
                        <p className="text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 italic text-xs sm:text-sm break-words">"{testimonial.comment}"</p>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-sm sm:text-base text-gray-800 dark:text-white break-words">{testimonial.name}</p>
                            {testimonial.company && (
                              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 break-words">{testimonial.company}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* User Voting */}
              <div className="flex items-center justify-center space-x-6 sm:space-x-8 py-4 sm:py-6 border-t border-b border-gray-200 dark:border-gray-700 mb-6 sm:mb-8">
                <button 
                  onClick={() => handleVote('up')}
                  className={`flex flex-col items-center transition-colors ${userVote === 'up' ? 'text-green-600 dark:text-green-500' : 'text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500'}`}
                >
                  <ThumbsUp className="h-5 w-5 sm:h-6 sm:w-6 mb-1" />
                  <span className="text-xs sm:text-sm font-medium">Helpful ({upvotes})</span>
                </button>
                
                <button 
                  onClick={() => handleVote('down')}
                  className={`flex flex-col items-center transition-colors ${userVote === 'down' ? 'text-red-600 dark:text-red-500' : 'text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500'}`}
                >
                  <ThumbsDown className="h-5 w-5 sm:h-6 sm:w-6 mb-1" />
                  <span className="text-xs sm:text-sm font-medium">Not Helpful ({downvotes})</span>
                </button>
              </div>
              
              {/* Related Tools from Backend */}
              <RelatedTools 
                currentToolId={tool._id || tool.id || ''}
                category={tool.category}
                currentToolName={tool.name}
              />
              
              {/* Related Blog Posts */}
              {relatedPosts && relatedPosts.length > 0 ? (
                <div className="mt-8 sm:mt-12">
                  <h2 className="text-lg sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800 dark:text-white">Read More About {tool.name}</h2>
                  <div className="space-y-3 sm:space-y-4">
                    {relatedPosts.map(post => (
                      <Link 
                        key={post.id} 
                        to={`/blog/${post.slug}`}
                        className="block p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <h3 className="font-medium text-base sm:text-lg text-gray-800 dark:text-white mb-1 break-words">{post.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2 break-words">{post.excerpt}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-8 sm:mt-12">
                  <h2 className="text-lg sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800 dark:text-white">Related Resources</h2>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-lg text-center">
                    <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base break-words">Check out our blog for more information about AI tools like {tool.name}</p>
                    <Link to="/blog">
                      <Button variant="outline" size="sm">Browse Blog Posts</Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-6 sticky top-20">
                {/* Action Buttons */}
                <div className="flex flex-col space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <a
                    href={`${tool.websiteUrl}?ref=alltopaitools.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button className="w-full text-sm sm:text-base">
                      Try Tool <ExternalLink className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </a>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 dark:border-gray-700 text-xs sm:text-sm"
                      onClick={handleBookmark}
                    >
                      {isBookmarked(tool._id || tool.id || '') ? (
                        <>
                          <BookmarkCheck className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
                          <span className="hidden xs:inline">Saved</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
                          <span className="hidden xs:inline">Save</span>
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="flex-1 dark:border-gray-700 text-xs sm:text-sm"
                      onClick={handleCompare}
                    >
                      <BarChart2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
                      <span className="hidden xs:inline">
                        {isInCompare(tool._id || tool.id || '') ? 'Remove' : 'Compare'}
                      </span>
                    </Button>
                  </div>
                </div>
                
                {/* Pricing Information */}
                {tool.pricing && (
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-800 dark:text-white">Pricing</h3>
                    <div className="space-y-2">
                      <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed break-words">{tool.pricing}</p>
                      {tool.pricingModel && (
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                          <Badge variant="outline" className="text-xs">
                            {tool.pricingModel.charAt(0).toUpperCase() + tool.pricingModel.slice(1)}
                          </Badge>
                          {tool.apiAvailable && (
                            <Badge variant="outline" className="text-xs">
                              <Code className="w-3 h-3 mr-1" />
                              API Available
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Category and Subcategories */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-800 dark:text-white">Category</h3>
                  <Link
                    to={`/tools/category/${tool.category}`}
                    className="text-primary hover:underline font-medium text-sm sm:text-base break-words"
                  >
                    {tool.category.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </Link>
                  
                  {tool.subcategories && tool.subcategories.length > 0 && (
                    <div className="mt-2 sm:mt-3">
                      <h4 className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Subcategories</h4>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {tool.subcategories.map((subcat: string) => (
                          <Badge key={subcat} variant="outline" className="text-xs break-words">
                            {subcat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Industry Fit */}
                {tool.industryFit && tool.industryFit.length > 0 && (
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-800 dark:text-white">Best For</h3>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {tool.industryFit.map((industry: string) => (
                        <Link
                          key={industry}
                          to={`/tools?industry=${industry}`}
                          className="inline-block px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors break-words"
                        >
                          {industry.charAt(0).toUpperCase() + industry.slice(1)}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Integrations */}
                {tool.integratedWith && tool.integratedWith.length > 0 && (
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-800 dark:text-white">Integrations</h3>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {tool.integratedWith.map((integration: string) => (
                        <Badge key={integration} variant="outline" className="text-xs break-words">
                          {integration}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Last Updated */}
                {tool.lastUpdated && (
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800 dark:text-white">Last Updated</h3>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {new Date(tool.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                )}
                
                {/* Sponsor Section */}
                <div className="pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800 dark:text-white">Premium Listing</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 break-words">
                    Want your tool to be featured prominently?
                  </p>
                  <a 
                    href="/contact?subject=Premium%20Listing"
                    className="text-xs sm:text-sm text-primary hover:underline break-words"
                  >
                    Contact us about Premium Listings
                  </a>
                </div>
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
