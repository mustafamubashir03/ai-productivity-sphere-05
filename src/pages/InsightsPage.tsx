
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/common/SEOHead";
import PageHeader from "@/components/common/PageHeader";
import { Clock, ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Mock data for insights/guides
const insightsData = [
  {
    id: "1",
    title: "Top 10 Free AI Tools for Students in 2025",
    slug: "free-ai-tools-students-2025",
    excerpt: "Discover the best free AI tools that can help students with research, writing, and learning.",
    coverImage: "/placeholder.svg",
    date: "May 10, 2025",
    readTime: "5 min read",
    category: "Guides"
  },
  {
    id: "2",
    title: "How to Choose the Right AI Writing Assistant",
    slug: "choose-right-ai-writing-assistant",
    excerpt: "A comprehensive comparison of popular AI writing tools and how to select the one that fits your needs.",
    coverImage: "/placeholder.svg",
    date: "May 5, 2025",
    readTime: "8 min read",
    category: "Comparisons"
  },
  {
    id: "3",
    title: "The Future of AI in Content Creation",
    slug: "future-ai-content-creation",
    excerpt: "Exploring how AI is transforming the content creation landscape and what to expect in the coming years.",
    coverImage: "/placeholder.svg",
    date: "April 28, 2025",
    readTime: "6 min read",
    category: "Trends"
  },
  {
    id: "4",
    title: "Best AI Tools Using GPT-4 Technology",
    slug: "best-gpt4-ai-tools",
    excerpt: "A curated selection of the most powerful AI tools powered by OpenAI's GPT-4 language model.",
    coverImage: "/placeholder.svg",
    date: "April 20, 2025",
    readTime: "7 min read",
    category: "Guides"
  },
  {
    id: "5",
    title: "AI Productivity Tools for Remote Teams",
    slug: "ai-productivity-tools-remote-teams",
    excerpt: "How to leverage AI tools to boost productivity and collaboration in distributed teams.",
    coverImage: "/placeholder.svg",
    date: "April 15, 2025",
    readTime: "9 min read", 
    category: "Guides"
  },
  {
    id: "6",
    title: "Ethical Considerations When Using AI Tools",
    slug: "ethical-considerations-ai-tools",
    excerpt: "Understanding the ethical implications of AI and how to use these tools responsibly.",
    coverImage: "/placeholder.svg",
    date: "April 8, 2025",
    readTime: "10 min read",
    category: "Insights"
  }
];

const CATEGORIES = ["All", "Guides", "Comparisons", "Trends", "Insights"];

const InsightsPage = () => {
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  
  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setInsights(insightsData);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const filteredInsights = activeCategory === "All" 
    ? insights 
    : insights.filter(insight => insight.category === activeCategory);
  
  return (
    <>
      <SEOHead 
        title="AI Tools Insights & Guides - AI Productivity Hub"
        description="Expert guides, comparisons, and insights on how to leverage AI tools for productivity and workflow optimization."
      />
      
      <PageHeader 
        title="Insights & Guides"
        description="Expert guides, comparisons, and insights to help you make the most out of AI productivity tools."
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm ${
                activeCategory === category
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <div className="w-full h-full rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                </div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : filteredInsights.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInsights.map((insight) => (
              <article key={insight.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <Link to={`/insights/${insight.slug}`}>
                  <div className="w-full h-48">
                    <AspectRatio ratio={16 / 9}>
                      <img 
                        src={insight.coverImage} 
                        alt={insight.title} 
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                </Link>
                
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-primary font-semibold px-2 py-1 rounded-full bg-primary/10">
                      {insight.category}
                    </span>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{insight.readTime}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                    <Link to={`/insights/${insight.slug}`} className="hover:text-primary transition-colors">
                      {insight.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {insight.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{insight.date}</span>
                    <Link 
                      to={`/insights/${insight.slug}`} 
                      className="inline-flex items-center text-primary text-sm font-medium hover:underline"
                    >
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">No insights found</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try selecting a different category.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default InsightsPage;
