
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/common/SEOHead";
import { getBlogPostBySlug } from "@/data/blog";
import BlogDetailSkeleton from "@/components/skeletons/BlogDetailSkeleton";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      // Simulate data fetching delay
      const timer = setTimeout(() => {
        const foundPost = getBlogPostBySlug(slug);
        setPost(foundPost);
        setLoading(false);
      }, 1200);
      
      return () => clearTimeout(timer);
    }
  }, [slug]);

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

  return (
    <>
      <SEOHead 
        title={`${post.title} - AI Productivity Hub`}
        description={post.excerpt}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/blog" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow"
          />
        </div>

        {/* Post Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-500">{post.date}</p>
        </div>

        {/* Post Content with styled HTML */}
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none prose-a:text-primary prose-img:rounded-lg prose-headings:scroll-mt-20">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Author Section */}
          <div className="mt-10 pt-10 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-lg mb-2">About AI Productivity Hub</h3>
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
