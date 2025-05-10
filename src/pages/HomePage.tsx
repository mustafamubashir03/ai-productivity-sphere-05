
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/common/SEOHead";
import CategoryCard from "@/components/common/CategoryCard";
import ToolCard, { Tool } from "@/components/common/ToolCard";
import { categories } from "@/data/categories";
import { getTrendingTools } from "@/data/tools";
import { blogPosts } from "@/data/blog";
import NewsletterSignup from "@/components/layout/NewsletterSignup";

const HomePage = () => {
  const [trendingTools, setTrendingTools] = useState<Tool[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState(blogPosts.slice(0, 2));
  
  useEffect(() => {
    setTrendingTools(getTrendingTools());
  }, []);

  return (
    <>
      <SEOHead
        title="AI Productivity Hub - Best AI Tools for Productivity"
        description="Discover top AI tools for productivity, video editing, photo editing, copywriting, coding, and automation. Find the perfect AI solution for your workflow."
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
                Find the Right AI Tools <span className="text-primary">for Your Workflow</span>
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 animate-fade-in" style={{animationDelay: "0.2s"}}>
                Discover, compare, and choose from hundreds of AI productivity tools to enhance your work and creativity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: "0.4s"}}>
                <Link to="/tools">
                  <Button size="lg" className="w-full sm:w-auto">
                    Explore All Tools
                  </Button>
                </Link>
                <Link to="/blog">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto dark:border-gray-700 dark:text-gray-200">
                    Read Our Blog
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end animate-scale-in">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&auto=format&fit=crop" 
                alt="AI Productivity visualization showing digital workflow enhancement" 
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
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
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Tools Section */}
      <section className="py-16 dark:bg-gray-800 transition-colors duration-300">
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
            {trendingTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
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
            {featuredPosts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden card-hover border border-gray-100 dark:border-gray-700">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
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
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="section-title">Stay Updated</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Get the latest AI tools and productivity insights delivered to your inbox.
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
