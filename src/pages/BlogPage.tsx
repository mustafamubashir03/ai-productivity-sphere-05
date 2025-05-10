import { Link } from "react-router-dom";
import { ArrowRight, Clock, Bookmark } from "lucide-react";
import SEOHead from "@/components/common/SEOHead";
import PageHeader from "@/components/common/PageHeader";
import { blogPosts } from "@/data/blog";

const BlogPage = () => {
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
        <div className="max-w-3xl mx-auto"> {/* Centered container */}
          <div className="grid grid-cols-1 gap-8">
            {blogPosts.map((post) => (
              <div 
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row"
              >
                <div className="md:w-2/5 lg:w-1/3 flex-shrink-0">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 lg:w-2/3 p-5 flex flex-col">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{post.date}</span>
                    <button className="text-gray-400 hover:text-primary">
                      <Bookmark className="h-4 w-4" />
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
                    <span>{ '5'} min read</span>
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