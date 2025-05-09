
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
        <div className="grid grid-cols-1 gap-8">
          {blogPosts.map((post) => (
            <div 
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden card-hover flex flex-col md:flex-row"
            >
              <div className="md:w-1/3">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <h2 className="text-2xl font-semibold mb-2">
                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-gray-500 mb-3">{post.date}</p>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
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
      </div>
    </>
  );
};

export default BlogPage;
