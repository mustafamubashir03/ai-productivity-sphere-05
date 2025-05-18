
import { tools, getToolBySlug, getSimilarTools, getToolsByCategory, getToolsByIndustry } from '@/data/tools';
import { blogPosts, getBlogPostBySlug } from '@/data/blog';
import { categories, getCategoryBySlug } from '@/data/categories';
import { useCases } from '@/data/useCases';
import { Tool } from '@/types/tools';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Knowledge extraction helper functions
const extractToolsData = (): string => {
  return tools.map(tool => 
    `Tool: ${tool.name}
     Slug: ${tool.slug}
     Category: ${tool.category}
     Description: ${tool.description}
     Features: ${(tool.features || []).join(', ')}
     Use Cases: ${(tool.useCases || []).join(', ')}
     Pricing: ${tool.pricing || 'Not specified'}
     Rating: ${tool.rating || 'Not rated'}
     Industry Fit: ${(tool.industryFit || []).join(', ')}
     Tags: ${(tool.tags || []).join(', ')}
    `
  ).join('\n\n');
};

const extractBlogsData = (): string => {
  return blogPosts.map(blog => 
    `Blog: ${blog.title}
     Slug: ${blog.slug}
     Excerpt: ${blog.excerpt}
     Category: ${blog.category}
     Related Tools: ${(blog.relatedTools || []).join(', ')}
     Date: ${blog.date}
    `
  ).join('\n\n');
};

const extractCategoriesData = (): string => {
  return categories.map(category => 
    `Category: ${category.name}
     Slug: ${category.slug}
     Description: ${category.description}
    `
  ).join('\n\n');
};

const extractUseCasesData = (): string => {
  return useCases.map(useCase => 
    `Use Case: ${useCase.name}
     Slug: ${useCase.slug}
     Description: ${useCase.description}
    `
  ).join('\n\n');
};

// Main query intent detection
enum QueryIntent {
  ToolDiscovery = "tool_discovery",
  ToolComparison = "tool_comparison",
  BlogSearch = "blog_search",
  General = "general"
}

const detectQueryIntent = (query: string): QueryIntent => {
  const lowercaseQuery = query.toLowerCase();
  
  // Check for tool comparison intent
  if (
    lowercaseQuery.includes("compare") || 
    lowercaseQuery.includes("vs") || 
    lowercaseQuery.includes("versus") ||
    lowercaseQuery.includes("better") ||
    lowercaseQuery.includes("difference between")
  ) {
    return QueryIntent.ToolComparison;
  }
  
  // Check for blog search intent
  if (
    (lowercaseQuery.includes("blog") || 
    lowercaseQuery.includes("article") ||
    lowercaseQuery.includes("post") ||
    lowercaseQuery.includes("read")) &&
    (lowercaseQuery.includes("about") || 
    lowercaseQuery.includes("on") ||
    lowercaseQuery.includes("related to"))
  ) {
    return QueryIntent.BlogSearch;
  }
  
  // Check for tool discovery intent (most common case)
  if (
    lowercaseQuery.includes("tool") ||
    lowercaseQuery.includes("app") ||
    lowercaseQuery.includes("software") ||
    lowercaseQuery.includes("recommend") ||
    lowercaseQuery.includes("suggest") ||
    lowercaseQuery.includes("find") ||
    lowercaseQuery.includes("best for") ||
    lowercaseQuery.includes("help with")
  ) {
    return QueryIntent.ToolDiscovery;
  }
  
  return QueryIntent.General;
};

// Function to find tools mentioned in a query
const findToolsInQuery = (query: string): Tool[] => {
  const lowercaseQuery = query.toLowerCase();
  return tools.filter(tool => {
    const toolNameLower = tool.name.toLowerCase();
    // Consider partial matches and common variants
    return lowercaseQuery.includes(toolNameLower) || 
           lowercaseQuery.includes(tool.slug.toLowerCase()) ||
           // Handle cases like "jasper ai" vs "jasper.ai"
           lowercaseQuery.includes(toolNameLower.replace('.ai', ' ai')) ||
           lowercaseQuery.includes(toolNameLower.replace(' ai', '.ai'));
  });
};

// Function to find blogs relevant to a query
const findRelevantBlogs = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  const queryTerms = lowercaseQuery.split(' ');
  
  return blogPosts
    .map(blog => {
      // Calculate relevance score based on title, excerpt and content match
      let score = 0;
      const lowerTitle = blog.title.toLowerCase();
      const lowerExcerpt = blog.excerpt.toLowerCase();
      const lowerContent = (blog.content || '').toLowerCase();
      
      // Check for direct title matches (highest weight)
      if (lowerTitle.includes(lowercaseQuery)) {
        score += 10;
      }
      
      // Check for individual term matches in title
      queryTerms.forEach(term => {
        if (term.length > 3 && lowerTitle.includes(term)) {
          score += 3;
        }
      });
      
      // Check excerpt for relevance
      if (lowerExcerpt.includes(lowercaseQuery)) {
        score += 5;
      }
      
      queryTerms.forEach(term => {
        if (term.length > 3 && lowerExcerpt.includes(term)) {
          score += 2;
        }
      });
      
      // Check content if available
      if (lowerContent.includes(lowercaseQuery)) {
        score += 3;
      }
      
      queryTerms.forEach(term => {
        if (term.length > 3 && lowerContent.includes(term)) {
          score += 1;
        }
      });
      
      return { blog, score };
    })
    .filter(item => item.score > 0)  // Only return blogs with some relevance
    .sort((a, b) => b.score - a.score) // Sort by highest score first
    .map(item => item.blog); // Return just the blog objects
};

// Find tools by different filtering criteria
const findToolsByFilter = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  let matchedTools: Tool[] = [];
  
  // Try to identify category matches
  categories.forEach(category => {
    if (
      lowercaseQuery.includes(category.name.toLowerCase()) || 
      lowercaseQuery.includes(category.slug.replace('-', ' '))
    ) {
      const categoryTools = getToolsByCategory(category.slug);
      if (categoryTools.length > 0) {
        matchedTools = [...matchedTools, ...categoryTools];
      }
    }
  });
  
  // Try to identify use case matches
  useCases.forEach(useCase => {
    if (
      lowercaseQuery.includes(useCase.name.toLowerCase()) || 
      lowercaseQuery.includes(useCase.slug.replace('-', ' '))
    ) {
      const useCaseTools = tools.filter(tool => 
        tool.useCases && tool.useCases.some(uc => 
          uc.toLowerCase().includes(useCase.name.toLowerCase())
        )
      );
      if (useCaseTools.length > 0) {
        matchedTools = [...matchedTools, ...useCaseTools];
      }
    }
  });
  
  // Check for feature-based matches
  const commonFeatures = [
    "free", "open source", "affordable", "cheap", "premium", 
    "enterprise", "professional", "beginner", "advanced",
    "video", "image", "text", "audio", "chat", "code", "writing",
    "editing", "generating", "analyzing", "automating"
  ];
  
  commonFeatures.forEach(feature => {
    if (lowercaseQuery.includes(feature)) {
      const featureTools = tools.filter(tool => {
        // Check features list
        const hasFeature = tool.features && tool.features.some(f => 
          f.toLowerCase().includes(feature)
        );
        
        // Check pricing for free/affordable terms
        const pricingMatch = 
          (feature === "free" && tool.pricing && 
           (tool.pricing.toLowerCase().includes("free") || 
            tool.pricing.toLowerCase().includes("freemium"))) ||
          (feature === "affordable" && tool.pricing &&
           (tool.pricing.toLowerCase().includes("affordable") || 
            tool.pricing.toLowerCase().includes("cheap")));
            
        // Check description
        const descriptionMatch = tool.description &&
          tool.description.toLowerCase().includes(feature);
            
        return hasFeature || pricingMatch || descriptionMatch;
      });
      
      if (featureTools.length > 0) {
        matchedTools = [...matchedTools, ...featureTools];
      }
    }
  });
  
  // Add industry filter
  if (lowercaseQuery.includes("for ")) {
    const industries = ["marketers", "freelancers", "writers", "developers", "students", "educators"];
    industries.forEach(industry => {
      if (lowercaseQuery.includes(industry) || 
          lowercaseQuery.includes(industry.slice(0, -1))) { // Handle singular form
        const industryTools = getToolsByIndustry(industry);
        if (industryTools.length > 0) {
          matchedTools = [...matchedTools, ...industryTools];
        }
      }
    });
  }
  
  // Rating-based filtering
  if (lowercaseQuery.includes("best") || 
      lowercaseQuery.includes("top") || 
      lowercaseQuery.includes("highest rated")) {
    // Add high-rated tools to results and prioritize them
    const highRatedTools = tools
      .filter(tool => (tool.rating || 0) >= 4.5)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
      
    matchedTools = [...highRatedTools, ...matchedTools];
  }
  
  // Remove duplicates
  const uniqueTools = Array.from(new Set(matchedTools.map(t => t._id)))
    .map(id => matchedTools.find(t => t._id === id))
    .filter(Boolean) as Tool[];
    
  return uniqueTools;
};

// Handle tool comparison function
const handleToolComparison = (query: string): string => {
  const mentionedTools = findToolsInQuery(query);
  
  if (mentionedTools.length < 2) {
    // Not enough tools explicitly mentioned, see if we can infer the comparison
    const lowercaseQuery = query.toLowerCase();
    if (lowercaseQuery.includes("for") || lowercaseQuery.includes("best")) {
      // Try to extract the purpose or category
      const purposeMatch = 
        lowercaseQuery.match(/(?:for|best for|better for)\s+([a-z\s]+)(?:$|\?)/i) || 
        lowercaseQuery.match(/(?:best|better)\s+([a-z\s]+)\s+tool/i);
        
      if (purposeMatch && purposeMatch[1]) {
        const purpose = purposeMatch[1].trim();
        // Find tools matching this purpose
        const purposeTools = findToolsByFilter(purpose);
        
        if (purposeTools.length >= 2) {
          // Limit to top 3 tools
          const toolsToCompare = purposeTools.slice(0, 3);
          return createComparisonResponse(toolsToCompare, purpose);
        } else {
          return `I couldn't find enough tools to compare for "${purpose}". Would you like me to suggest some top AI tools in this category instead?`;
        }
      }
    }
    
    if (mentionedTools.length === 1) {
      // User mentioned one tool, find similar tools to compare
      const similarTools = getSimilarTools(mentionedTools[0], 2);
      const toolsToCompare = [mentionedTools[0], ...similarTools];
      
      return createComparisonResponse(
        toolsToCompare,
        `similar to ${mentionedTools[0].name}`
      );
    }
    
    return "I couldn't identify which specific tools you'd like me to compare. Could you mention the names of the tools you're interested in comparing?";
  }
  
  // Limit comparison to max 4 tools for readability
  const toolsToCompare = mentionedTools.slice(0, 4);
  return createComparisonResponse(toolsToCompare);
};

// Create a formatted comparison response
const createComparisonResponse = (tools: Tool[], context?: string): string => {
  const toolCount = tools.length;
  const contextPhrase = context ? ` for ${context}` : '';
  
  let response = `Here's a comparison of ${toolCount} AI tools${contextPhrase}:\n\n`;
  
  // Create comparison table header
  tools.forEach((tool, index) => {
    response += `**${tool.name}** ${index < toolCount - 1 ? ' vs ' : ''}`;
  });
  response += '\n\n';
  
  // Add links to each tool
  response += "🔗 **Quick links:**\n";
  tools.forEach(tool => {
    response += `- [${tool.name}](/tools/${tool.slug})\n`;
  });
  response += '\n';
  
  // Basic details
  response += "📊 **Quick comparison:**\n\n";
  
  // Ratings
  response += "**Ratings:**\n";
  tools.forEach(tool => {
    response += `- ${tool.name}: ${tool.rating || 'Not rated'}/5\n`;
  });
  response += '\n';
  
  // Pricing
  response += "**Pricing:**\n";
  tools.forEach(tool => {
    response += `- ${tool.name}: ${tool.pricing || 'Not specified'}\n`;
  });
  response += '\n';
  
  // Key Features
  response += "**Key Features:**\n";
  tools.forEach(tool => {
    response += `- ${tool.name}: ${(tool.features || []).slice(0, 3).join(', ')}\n`;
  });
  response += '\n';
  
  // Use Cases
  response += "**Best For:**\n";
  tools.forEach(tool => {
    response += `- ${tool.name}: ${(tool.useCases || []).slice(0, 2).join(', ')}\n`;
  });
  response += '\n';
  
  // Full comparison link
  if (toolCount === 2) {
    const slugs = tools.map(tool => tool.slug).join(',');
    response += `For a complete side-by-side comparison, check out our [detailed comparison page](/compare/${slugs}).\n\n`;
  }
  
  response += "Is there anything specific about these tools you'd like to know more about?";
  
  return response;
};

// Handle tool discovery
const handleToolDiscovery = (query: string): string => {
  const matchedTools = findToolsByFilter(query);
  
  if (matchedTools.length === 0) {
    return "I couldn't find any tools matching your criteria. Could you try describing what you're looking for differently, or tell me what task you need help with?";
  }
  
  // Limit to top 5 tools max for readability
  const topTools = matchedTools.slice(0, 5);
  
  let response = `Here are some AI tools that might help with your request:\n\n`;
  
  topTools.forEach(tool => {
    response += `**[${tool.name}](/tools/${tool.slug})**\n`;
    response += `${tool.description}\n`;
    response += `💰 Pricing: ${tool.pricing || 'Not specified'}\n`;
    if (tool.rating) {
      response += `⭐ Rating: ${tool.rating}/5\n`;
    }
    response += '\n';
  });
  
  if (matchedTools.length > 5) {
    response += `I found ${matchedTools.length - 5} more tools that match your criteria. Would you like me to show you more options?\n\n`;
  }
  
  response += `You can also browse all our tools by category at [alltopaitools.com/tools](/tools)`;
  
  return response;
};

// Handle blog search
const handleBlogSearch = (query: string): string => {
  const relevantBlogs = findRelevantBlogs(query);
  
  if (relevantBlogs.length === 0) {
    return "I couldn't find any blog posts matching your query. Would you like me to suggest some of our most popular blog posts instead?";
  }
  
  // Limit to top 3 blogs for readability
  const topBlogs = relevantBlogs.slice(0, 3);
  
  let response = `Here are some relevant blog posts from Top AI Tools:\n\n`;
  
  topBlogs.forEach(blog => {
    response += `**[${blog.title}](/blog/${blog.slug})**\n`;
    response += `${blog.excerpt}\n`;
    if (blog.date) {
      response += `📅 Published: ${new Date(blog.date).toLocaleDateString()}\n`;
    }
    response += '\n';
  });
  
  if (relevantBlogs.length > 3) {
    response += `I found ${relevantBlogs.length - 3} more blog posts that might interest you. Would you like to see more?\n\n`;
  }
  
  response += `You can browse all our articles at [alltopaitools.com/blog](/blog)`;
  
  return response;
};

// Generic system response for general queries
const handleGeneralQuery = (query: string): string => {
  const lowercaseQuery = query.toLowerCase();
  
  // Check for common general questions
  if (lowercaseQuery.includes("about") && 
      (lowercaseQuery.includes("site") || 
       lowercaseQuery.includes("website") || 
       lowercaseQuery.includes("top ai tools"))) {
    return `Top AI Tools is a comprehensive resource for finding, comparing, and learning about the best AI tools available. We curate detailed information on AI tools across various categories including video editing, photo editing, copywriting, coding assistants, and automation tools.\n\nOur site features tool ratings, comparisons, detailed reviews, and helpful blogs to guide you in choosing the right AI tools for your needs. You can browse tools by category or use case at [alltopaitools.com/tools](/tools).`;
  }
  
  if (lowercaseQuery.includes("help") || lowercaseQuery.includes("what can you do")) {
    return `I can help you with the following:\n\n- Discover AI tools based on your needs, budget, or use case\n- Compare different AI tools side-by-side\n- Find relevant blog posts and articles about AI tools\n- Answer questions about specific tools in our database\n\nJust let me know what you're looking for, and I'll do my best to assist you!`;
  }
  
  // Default fallback for unrecognized queries
  return `I'm the Top AI Tools assistant, here to help you find and compare the best AI tools for your needs. You can ask me questions like:\n\n- "Suggest AI tools for video editing"\n- "Compare Jasper AI and Copy.ai"\n- "What are the best free AI tools for students?"\n- "Do you have any blogs about AI tools for marketers?"\n\nHow can I help you today?`;
};

// Main query processing function
export const processChatQuery = async (
  query: string, 
  previousMessages: ChatMessage[]
): Promise<{ content: string }> => {
  // Detect the primary intent of the query
  const intent = detectQueryIntent(query);
  
  let responseContent = "";
  
  switch (intent) {
    case QueryIntent.ToolComparison:
      responseContent = handleToolComparison(query);
      break;
    case QueryIntent.ToolDiscovery:
      responseContent = handleToolDiscovery(query);
      break;
    case QueryIntent.BlogSearch:
      responseContent = handleBlogSearch(query);
      break;
    case QueryIntent.General:
    default:
      responseContent = handleGeneralQuery(query);
      break;
  }
  
  return { content: responseContent };
};
