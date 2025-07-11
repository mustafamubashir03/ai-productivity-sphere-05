
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Pencil, Film, Image, Terminal, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import EnhancedSEO from "@/components/common/EnhancedSEO";
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

  // Update the structuredData array in the HomePage component
  const structuredData = [
    {
      type: "WebSite" as const,
      data: {
        name: "Top AI Tools - Best AI Tools for Productivity",
        description: "Curated AI tools for creators, developers, and entrepreneurs – all in one place. Discover top AI tools for productivity at Top AI Tools.",
        url: "https://alltopaitools.com",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://alltopaitools.com/tools?search={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        sameAs: [
          "https://twitter.com/topaitools",
          "https://www.linkedin.com/company/topaitools",
          "https://www.facebook.com/topaitools"
        ]
      }
    },
    {
      type: "FAQPage" as const,
      data: {
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Top AI Tools?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Top AI Tools is a curated collection of the best AI tools for productivity. We help creators, developers, and entrepreneurs find the perfect tools to enhance their workflow and boost efficiency."
            }
          },
          {
            "@type": "Question",
            name: "How do I find the right AI tool for my needs?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can browse our categorized collection, use our search feature to find specific tools, or apply filters based on pricing, platform, or use case. We also provide detailed reviews and comparisons to help you make informed decisions."
            }
          },
          {
            "@type": "Question",
            name: "Are all the AI tools free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We feature a mix of free, freemium, and premium tools. Each tool listing clearly indicates its pricing model, so you can easily find options that fit your budget."
            }
          }
        ]
      }
    }
  ];

  return (
    <div itemScope itemType="http://schema.org/WebSite">
      <EnhancedSEO
        title="Top AI Tools - Best AI Tools for Productivity"
        description="Curated AI tools for creators, developers, and entrepreneurs – all in one place. Discover top AI tools for productivity at Top AI Tools."
        canonicalUrl="/"
        image="https://alltopaitools.com/favicon.svg"
        structuredData={structuredData}
      />
      
      {/* HTML5 Microdata for Website */}
      <meta itemProp="name" content="Top AI Tools - Best AI Tools for Productivity" />
      <meta itemProp="description" content="Curated AI tools for creators, developers, and entrepreneurs – all in one place. Discover top AI tools for productivity at Top AI Tools." />
      <meta itemProp="url" content="https://alltopaitools.com" />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 overflow-hidden relative" itemScope itemType="http://schema.org/Organization">
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in" itemProp="name">
                Boost Your Productivity with the <span className="text-primary">Best AI Tools</span>
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 animate-fade-in" style={{animationDelay: "0.2s"}} itemProp="description">
                Curated tools for creators, developers, and entrepreneurs – all in one place.
              </p>
              <meta itemProp="url" content="https://alltopaitools.com" />
              <meta itemProp="logo" content="https://alltopaitools.com/favicon.svg" />
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: "0.4s"}}>
                <Button size="lg" className="w-full sm:w-auto" onClick={scrollToTools} aria-label="Browse our collection of top AI tools">
                  Explore Top AI Tools
                </Button>
                <Link to="/blog">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto dark:border-gray-700 dark:text-gray-200" aria-label="Read our AI tools blog articles">
                    Read Our Blogs
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end animate-scale-in">
              {/* 3D Dashboard Visualization */}
              <div className="relative w-full max-w-md h-80 perspective-1000">
                <div className="relative w-full h-full">
                  {/* Central figure - Now with our logo */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <Logo size="large" className="animate-float" />
                  </div>
                  
                  {/* Orbital Tool Cards */}
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 transform -translate-y-5 animate-float" style={{animationDelay: "0s"}}>
                    <div className="w-24 h-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg flex flex-col items-center justify-center p-3 border border-white/20 dark:border-gray-700/30">
                      <Pencil className="w-8 h-8 text-purple-500 mb-2" aria-hidden="true" />
                      <span className="text-xs font-medium text-gray-800 dark:text-gray-200">Writing</span>
                    </div>
                  </div>
                  
                  <div className="absolute right-5 top-1/4 transform animate-float" style={{animationDelay: "0.5s"}}>
                    <div className="w-24 h-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg flex flex-col items-center justify-center p-3 border border-white/20 dark:border-gray-700/30">
                      <Film className="w-8 h-8 text-blue-500 mb-2" aria-hidden="true" />
                      <span className="text-xs font-medium text-gray-800 dark:text-gray-200">Video</span>
                    </div>
                  </div>
                  
                  <div className="absolute left-5 top-1/4 transform animate-float" style={{animationDelay: "1s"}}>
                    <div className="w-24 h-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg flex flex-col items-center justify-center p-3 border border-white/20 dark:border-gray-700/30">
                      <Image className="w-8 h-8 text-green-500 mb-2" aria-hidden="true" />
                      <span className="text-xs font-medium text-gray-800 dark:text-gray-200">Design</span>
                    </div>
                  </div>
                  
                  <div className="absolute right-10 bottom-10 transform animate-float" style={{animationDelay: "1.5s"}}>
                    <div className="w-24 h-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg flex flex-col items-center justify-center p-3 border border-white/20 dark:border-gray-700/30">
                      <Terminal className="w-8 h-8 text-amber-500 mb-2" aria-hidden="true" />
                      <span className="text-xs font-medium text-gray-800 dark:text-gray-200">Coding</span>
                    </div>
                  </div>
                  
                  <div className="absolute left-10 bottom-10 transform animate-float" style={{animationDelay: "2s"}}>
                    <div className="w-24 h-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg flex flex-col items-center justify-center p-3 border border-white/20 dark:border-gray-700/30">
                      <Bot className="w-8 h-8 text-red-500 mb-2" aria-hidden="true" />
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
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300" itemScope itemType="http://schema.org/ItemList">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title mb-3" itemProp="name">Explore AI Tool Categories</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto" itemProp="description">
              Browse our curated collection of AI tools organized by functional category to find the perfect solution for your needs.
            </p>
            <meta itemProp="numberOfItems" content={categories.length.toString()} />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingCategories ? (
              Array(6).fill(0).map((_, index) => (
                <CategoryCardSkeleton key={`cat-skeleton-${index}`} />
              ))
            ) : (
              displayedCategories.map((category, index) => (
                <div key={category.id} itemScope itemType="http://schema.org/ListItem" itemProp="itemListElement">
                  <meta itemProp="position" content={(index + 1).toString()} />
                  <CategoryCard category={category} />
                </div>
              ))
            )}
          </div>
          
          {/* Subtle anchor link at bottom of categories */}
          <div className="text-center mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Looking for more resources? <a href="https://otieu.com/4/9475701" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 underline transition-colors">Check this out</a>
            </p>
          </div>
        </div>
      </section>

      {/* Trending Tools Section */}
      <section id="tools-section" className="py-16 dark:bg-gray-800 transition-colors duration-300" itemScope itemType="http://schema.org/ItemList">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="section-title mb-0" itemProp="name">Top Trending AI Tools</h2>
            <Link 
              to="/tools" 
              className="text-primary font-medium flex items-center hover:underline"
              aria-label="View all AI tools"
            >
              View All Tools <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingTools ? (
              Array(3).fill(0).map((_, index) => (
                <ToolCardSkeleton key={`tool-skeleton-${index}`} />
              ))
            ) : trendingTools.length > 0 ? (
              trendingTools.filter(tool => tool.trending).slice(0,3).map((tool, index) => (
                <div key={tool._id} itemScope itemType="http://schema.org/SoftwareApplication" itemProp="itemListElement">
                  <meta itemProp="position" content={(index + 1).toString()} />
                  <meta itemProp="name" content={tool.name} />
                  <meta itemProp="description" content={tool.shortDescription || tool.description} />
                  <meta itemProp="url" content={`https://alltopaitools.com/tools/${tool.slug}`} />
                  <ToolCard tool={tool} />
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500 dark:text-gray-400">No trending tools found</p>
              </div>
            )}
          </div>
          <meta itemProp="numberOfItems" content={trendingTools.filter(tool => tool.trending).slice(0,3).length.toString()} />
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300" itemScope itemType="http://schema.org/Blog">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="section-title mb-0" itemProp="name">Latest from Our Blog</h2>
            <Link 
              to="/blog" 
              className="text-primary font-medium flex items-center hover:underline"
              aria-label="View all blog articles"
            >
              Read All Articles <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loadingPosts ? (
              Array(2).fill(0).map((_, index) => (
                <BlogCardSkeleton key={`blog-skeleton-${index}`} />
              ))
            ) : featuredPosts.length > 0 ? (
              featuredPosts.slice(0,2).map((post) => (
                <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden card-hover border border-gray-100 dark:border-gray-700" itemScope itemType="http://schema.org/BlogPosting" itemProp="blogPost">
                  <img 
                    src={post.image} 
                    alt={`Cover image for article: ${post.title}`}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                    loading="lazy"
                    itemProp="image"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 dark:text-white" itemProp="headline">
                      <Link 
                        to={`/blog/${post.slug}`} 
                        className="hover:text-primary transition-colors"
                        itemProp="url"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <time itemProp="datePublished">{post.date}</time>
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4" itemProp="description">{post.excerpt}</p>
                    <Link 
                      to={`/blog/${post.slug}`} 
                      className="text-primary font-medium flex items-center hover:underline"
                      aria-label={`Read more about ${post.title}`}
                    >
                      Read More <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-2 text-center py-10">
                <p className="text-gray-500 dark:text-gray-400">No blog posts found</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300" itemScope itemType="http://schema.org/FAQPage">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg" itemScope itemType="http://schema.org/Question" itemProp="mainEntity">
                <h3 className="text-lg font-semibold mb-2 dark:text-white" itemProp="name">What is Top AI Tools?</h3>
                <div itemScope itemType="http://schema.org/Answer" itemProp="acceptedAnswer">
                  <p className="text-gray-600 dark:text-gray-300" itemProp="text">
                    Top AI Tools is a curated collection of the best AI tools for productivity. We help creators, developers, and entrepreneurs find the perfect tools to enhance their workflow and boost efficiency.
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg" itemScope itemType="http://schema.org/Question" itemProp="mainEntity">
                <h3 className="text-lg font-semibold mb-2 dark:text-white" itemProp="name">How do I find the right AI tool for my needs?</h3>
                <div itemScope itemType="http://schema.org/Answer" itemProp="acceptedAnswer">
                  <p className="text-gray-600 dark:text-gray-300" itemProp="text">
                    You can browse our <Link to="/tools" className="text-primary hover:underline">categorized collection</Link>, use our search feature to find specific tools, or apply filters based on pricing, platform, or use case. We also provide detailed reviews and comparisons to help you make informed decisions.
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg" itemScope itemType="http://schema.org/Question" itemProp="mainEntity">
                <h3 className="text-lg font-semibold mb-2 dark:text-white" itemProp="name">Are all the AI tools free?</h3>
                <div itemScope itemType="http://schema.org/Answer" itemProp="acceptedAnswer">
                  <p className="text-gray-600 dark:text-gray-300" itemProp="text">
                    We feature a mix of free, freemium, and premium tools. Each tool listing clearly indicates its pricing model, so you can easily find options that fit your budget.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Subtle anchor link at bottom of FAQ */}
            <div className="text-center mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Need additional help? <a href="https://otieu.com/4/9475701" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 underline transition-colors">Explore more</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300" itemScope itemType="http://schema.org/Organization">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="section-title" itemProp="name">Stay Ahead with the Latest AI Tools</h2>
              <p className="text-gray-600 dark:text-gray-300" itemProp="description">
                Subscribe to receive top AI tool updates, guides, and productivity insights delivered to your inbox.
              </p>
            </div>
            <NewsletterSignup />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white" itemScope itemType="http://schema.org/Organization">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4" itemProp="name">Ready to Supercharge Your Productivity?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8" itemProp="description">
            Start exploring our collection of top AI productivity tools today and find the perfect solutions for your workflow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/tools">
              <Button variant="secondary" size="lg" aria-label="Browse all AI tools in our collection">
                Explore All AI Tools
              </Button>
            </Link>
            
            {/* Subtle footer link in CTA */}
            <div className="text-center mt-4 sm:mt-0 sm:ml-4">
              <p className="text-xs text-white/70">
                <a href="https://otieu.com/4/9475701" className="text-white/70 hover:text-white/90 underline transition-colors">Additional resources</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
