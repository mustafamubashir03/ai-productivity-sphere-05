
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Pencil, Film, Image, Terminal, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/common/SEOHead";
import CategoryCard from "@/components/common/CategoryCard";
import ToolCard from "@/components/common/ToolCard";
import { categories } from "@/data/categories";
import NewsletterSignup from "@/components/layout/NewsletterSignup";
import CategoryCardSkeleton from "@/components/skeletons/CategoryCardSkeleton";
import ToolCardSkeleton from "@/components/skeletons/ToolCardSkeleton";
import BlogCardSkeleton from "@/components/skeletons/BlogCardSkeleton";
import Logo from "@/components/common/Logo";
import { useTools, useBlogs, adaptToolsResponse, adaptBlogsResponse } from "@/hooks/use-api";
import { formatToolsData } from "@/utils/formatters";
import { Tool } from "@/types/tools";

const HomePage = () => {
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  
  // Fetch trending tools from the API
  const { 
    data: toolsData, 
    isLoading: loadingTools, 
    error: toolsError 
  } = useTools({ trending: "true", limit: "3" });
  
  // Fetch blog posts from the API
  const { 
    data: blogData, 
    isLoading: loadingPosts, 
    error: blogError 
  } = useBlogs({ limit: "2", featured: "true" });
  
  useEffect(() => {
    // Simulate data fetching delay for categories
    const categoriesTimer = setTimeout(() => {
      setDisplayedCategories(categories);
      setLoadingCategories(false);
    }, 800);
    
    return () => {
      clearTimeout(categoriesTimer);
    };
  }, []);

  // Extract and format tools data
  const trendingTools = toolsData ? formatToolsData(adaptToolsResponse(toolsData)) : [];

  // Extract and format blog data
  const blogPosts = blogData ? adaptBlogsResponse(blogData) : [];

  const scrollToTools = () => {
    document.getElementById('tools-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Format blog data for display
  const formatBlogData = (blogs) => {
    if (!blogs || !blogs.length) return [];
    
    return blogs.map(blog => ({
      id: blog._id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      image: blog.coverImage || blog.image || "/placeholder.svg",
      date: new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }));
  };

  const featuredPosts = formatBlogData(blogPosts);

  // Log data for debugging
  useEffect(() => {
    if (toolsData) {
      console.log("HomePage - Tools data:", toolsData);
      console.log("HomePage - Processed tools:", trendingTools);
    }
    if (blogData) {
      console.log("HomePage - Blog data:", blogData);
      console.log("HomePage - Processed blogs:", featuredPosts);
    }
  }, [toolsData, blogData]);

  return (
    <>
      <SEOHead
        title="Top AI Tools - Best AI Tools for Productivity"
        description="Curated tools for creators, developers, and entrepreneurs – all in one place. Discover top AI tools for productivity."
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
                Boost Your Productivity with the <span className="text-primary">Best AI Tools</span>
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 animate-fade-in" style={{animationDelay: "0.2s"}}>
                Curated tools for creators, developers, and entrepreneurs – all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: "0.4s"}}>
                <Button size="lg" className="w-full sm:w-auto" onClick={scrollToTools}>
                  Explore Top AI Tools
                </Button>
                <Link to="/blog">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto dark:border-gray-700 dark:text-gray-200">
                    Read Our Blogs
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end animate-scale-in">
              <div className="relative w-full max-w-md h-80 perspective-1000">
                {/* 3D Dashboard Visualization */}
                <div className="relative w-full h-full">
                  {/* Central figure - Now with our logo */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <Logo size="large" className="animate-float" />
                  </div>
                  
                  {/* Orbital Tool Cards */}
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 transform -translate-y-5 animate-float" style={{animationDelay: "0s"}}>
                    <div className="w-24 h-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg flex flex-col items-center justify-center p-3 border border-white/20 dark:border-gray-700/30">
                      <Pencil className="w-8 h-8 text-purple-500 mb-2" />
                      <span className="text-xs font-medium text-gray-800 dark:text-gray-200">Writing</span>
                    </div>
                  </div>
                  
                  <div className="absolute right-5 top-1/4 transform animate-float" style={{animationDelay: "0.5s"}}>
                    <div className="w-24 h-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg flex flex-col items-center justify-center p-3 border border-white/20 dark:border-gray-700/30">
                      <Film className="w-8 h-8 text-blue-500 mb-2" />
                      <span className="text-xs font-medium text-gray-800 dark:text-gray-200">Video</span>
                    </div>
                  </div>
                  
                  <div className="absolute left-5 top-1/4 transform animate-float" style={{animationDelay: "1s"}}>
                    <div className="w-24 h-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg flex flex-col items-center justify-center p-3 border border-white/20 dark:border-gray-700/30">
                      <Image className="w-8 h-8 text-green-500 mb-2" />
                      <span className="text-xs font-medium text-gray-800 dark:text-gray-200">Design</span>
                    </div>
                  </div>
                  
                  <div className="absolute right-10 bottom-10 transform animate-float" style={{animationDelay: "1.5s"}}>
                    <div className="w-24 h-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg flex flex-col items-center justify-center p-3 border border-white/20 dark:border-gray-700/30">
                      <Terminal className="w-8 h-8 text-amber-500 mb-2" />
                      <span className="text-xs font-medium text-gray-800 dark:text-gray-200">Coding</span>
                    </div>
                  </div>
                  
                  <div className="absolute left-10 bottom-10 transform animate-float" style={{animationDelay: "2s"}}>
                    <div className="w-24 h-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg flex flex-col items-center justify-center p-3 border border-white/20 dark:border-gray-700/30">
                      <Bot className="w-8 h-8 text-red-500 mb-2" />
                      <span className="text-xs font-medium text-gray-800 dark:text-gray-200">Automation</span>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 dark:from-indigo-500/5 dark:to-blue-500/5 rounded-full blur-3xl transform scale-75 animate-pulse-subtle"></div>
                  <div className="absolute inset-0 border border-blue-200/30 dark:border-blue-500/10 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title mb-3">Explore AI Tool Categories</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Browse our curated collection of AI tools organized by functional category to find the perfect solution for your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingCategories ? (
              Array(6).fill(0).map((_, index) => (
                <CategoryCardSkeleton key={`cat-skeleton-${index}`} />
              ))
            ) : (
              displayedCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Trending Tools Section */}
      <section id="tools-section" className="py-16 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="section-title mb-0">Top Trending AI Tools</h2>
            <Link 
              to="/tools" 
              className="text-primary font-medium flex items-center hover:underline"
            >
              View All Tools <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingTools ? (
              Array(3).fill(0).map((_, index) => (
                <ToolCardSkeleton key={`tool-skeleton-${index}`} />
              ))
            ) : trendingTools.length > 0 ? (
              trendingTools.filter(tool => tool.trending).slice(0,3).map((tool) => (
                <ToolCard key={tool._id} tool={tool} />
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500 dark:text-gray-400">No trending tools found</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="section-title mb-0">Latest from Our Blog</h2>
            <Link 
              to="/blog" 
              className="text-primary font-medium flex items-center hover:underline"
            >
              Read All Articles <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loadingPosts ? (
              Array(2).fill(0).map((_, index) => (
                <BlogCardSkeleton key={`blog-skeleton-${index}`} />
              ))
            ) : featuredPosts.length > 0 ? (
              featuredPosts.slice(0,2).map((post) => (
                <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden card-hover border border-gray-100 dark:border-gray-700">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 dark:text-white">
                      <Link 
                        to={`/blog/${post.slug}`} 
                        className="hover:text-primary transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{post.date}</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                    <Link 
                      to={`/blog/${post.slug}`} 
                      className="text-primary font-medium flex items-center hover:underline"
                    >
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-10">
                <p className="text-gray-500 dark:text-gray-400">No blog posts found</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="section-title">Stay Ahead with the Latest AI Tools</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Subscribe to receive top tool updates, guides, and productivity insights delivered to your inbox.
              </p>
            </div>
            <NewsletterSignup />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Supercharge Your Productivity?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Start exploring our collection of AI productivity tools today and find the perfect solutions for your workflow.
          </p>
          <Link to="/tools">
            <Button variant="secondary" size="lg">
              Explore All AI Tools
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
