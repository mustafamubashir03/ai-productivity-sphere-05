
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EnhancedSEO from "@/components/common/EnhancedSEO";
import PageHeader from "@/components/common/PageHeader";
import ToolCard from "@/components/common/ToolCard";
import { toast } from "@/components/ui/sonner";
import { useBookmarks } from "@/context/BookmarkContext";

const SavedToolsPage = () => {
  const { toolBookmarks } = useBookmarks();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Short timeout to simulate loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter saved tools by search query
  const filteredTools = searchQuery
    ? toolBookmarks.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : toolBookmarks;

  // SEO data
  const structuredData = [
    {
      type: "FAQPage" as const,
      data: {
        mainEntity: [
          {
            "@type": "Question",
            name: "How do I save an AI tool to my collection?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can save any AI tool to your collection by clicking the bookmark icon on the tool card or detail page. Your saved tools will be available in this section for easy access."
            }
          },
          {
            "@type": "Question",
            name: "Can I organize my saved tools?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Currently, you can search through your saved tools. We're working on adding features to create custom collections and tags for better organization."
            }
          }
        ]
      }
    }
  ];
  
  return (
    <>
      <EnhancedSEO 
        title="Saved AI Tools - Your Personal Collection"
        description="Access your saved AI tools and productivity solutions in one place. Organize and revisit your favorite AI tools anytime."
        structuredData={structuredData}
      />
      
      <PageHeader 
        title="Your Saved AI Tools" 
        description="Access all your bookmarked AI tools in one place. Organize your collection and find your favorite productivity solutions quickly."
      />
      
      <div className="container mx-auto px-4 py-10">
        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search your saved tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg h-64"></div>
            ))}
          </div>
        ) : filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool._id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="mb-4">
              <Bookmark className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No saved tools yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start saving your favorite AI tools by clicking the bookmark icon on any tool card.
            </p>
            <Link to="/tools">
              <Button>
                Explore AI Tools <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default SavedToolsPage;
