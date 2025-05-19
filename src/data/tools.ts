import { Tool } from "@/types/tools";
import { adaptToolsToInternal } from "@/utils/dataAdapters";
import { categories } from "./categories";

const rawTools = [
  {
    id: "1",
    name: "VideoGPT",
    slug: "videogpt",
    logo: "/placeholder.svg",
    category: "video-editing-tools",
    description: "AI-powered video editing with automatic scene detection, transitions, and content enhancement.",
    features: [
      "Auto scene detection and smart cuts",
      "Content-aware transitions",
      "AI-driven color grading",
      "Natural language editing commands",
      "Background noise reduction"
    ],
    useCases: [
      "Social media content creation",
      "Professional video production",
      "Quick highlight reel generation",
      "Educational content creation"
    ],
    pricing: "Freemium, starting at $19/month for Pro plan",
    websiteUrl: "https://example.com/videogpt",
    trending: true,
    rating: 4.8,
    reviewed: true,
    industryFit: ["marketers", "freelancers", "educators"],
    useCase: ["video-creation"],
    editorVerdict: "VideoGPT stands out for its intuitive natural language commands and impressive automated scene detection. The AI-driven color grading produces professional results even for beginners. While it lacks some advanced customization options, it's an excellent choice for content creators who need high-quality videos quickly.",
    relatedTools: ["2", "5"],
    relatedBlogs: ["2"],
    tags: ["AI", "Video Editing", "Content Creation"],
    lastUpdated: "2025-04-28",
    systemRequirements: "Windows 10/11, macOS 11+, 8GB RAM minimum",
    apiAvailable: true,
    integratedWith: ["Adobe Premiere", "Final Cut Pro", "DaVinci Resolve"],
    testimonials: [
      {
        name: "Sarah Johnson",
        company: "CreativeTech Media",
        comment: "VideoGPT cut our editing time in half while improving overall quality."
      }
    ],
    screenshots: [
      "/placeholder.svg",
      "/placeholder.svg"
    ]
  },
  {
    id: "2",
    name: "PixelMind",
    slug: "pixelmind",
    logo: "/placeholder.svg",
    category: "photo-editing-tools",
    description: "Revolutionary AI photo editor that enhances images with smart object recognition and professional-grade adjustments.",
    features: [
      "Smart object removal",
      "One-click sky replacement",
      "Intelligent portrait enhancement",
      "Batch processing with consistent styles",
      "Custom AI filters"
    ],
    useCases: [
      "Professional photography enhancement",
      "E-commerce product photos",
      "Real estate image processing",
      "Social media content creation"
    ],
    pricing: "$12.99/month, $99/year",
    websiteUrl: "https://example.com/pixelmind",
    rating: 4.6,
    reviewed: true,
    industryFit: ["freelancers", "marketers"],
    useCase: ["image-generation"],
    editorVerdict: "PixelMind delivers exceptional results for portrait enhancement and background manipulation. Its batch processing feature saves hours of repetitive work while maintaining consistency. The interface is intuitive enough for beginners but offers depth for professionals. The pricing is competitive given the time-saving automation features.",
    relatedTools: ["1", "3"],
    relatedBlogs: ["1"],
    tags: ["Photo Editing", "AI", "Design"],
    lastUpdated: "2025-05-01",
    systemRequirements: "Windows 10/11, macOS 12+, 16GB RAM recommended",
    apiAvailable: true,
    integratedWith: ["Adobe Photoshop", "Lightroom", "Capture One"],
    testimonials: [
      {
        name: "Mark Reynolds",
        company: "Studio45 Photography",
        comment: "The portrait enhancement tools are extraordinary. I've never seen such natural results from an AI."
      }
    ],
    screenshots: [
      "/placeholder.svg",
      "/placeholder.svg"
    ]
  },
  {
    id: "3",
    name: "CopyGenius",
    slug: "copygenius",
    logo: "/placeholder.svg",
    category: "copywriting-blogging-tools",
    description: "Advanced AI writing assistant that helps create engaging blog posts, marketing copy, and social media content.",
    features: [
      "Blog post generation and enhancement",
      "SEO-optimized content creation",
      "Brand voice customization",
      "Multilingual content support",
      "Plagiarism prevention"
    ],
    useCases: [
      "Content marketing",
      "Social media management",
      "Email marketing campaigns",
      "Product descriptions"
    ],
    pricing: "Free tier with 5,000 words/month, Pro plan $29/month",
    websiteUrl: "https://example.com/copygenius",
    trending: true,
    rating: 4.7,
    reviewed: true,
    industryFit: ["marketers", "freelancers", "writers"],
    useCase: ["content-writing", "seo-optimization"],
    editorVerdict: "CopyGenius excels at maintaining brand voice consistency across different types of content. Its SEO optimization features are particularly valuable, with smart keyword integration that feels natural. The plagiarism prevention tool saves time and potential legal headaches. The free tier is generous enough for small businesses to get started.",
    relatedTools: ["4", "6"],
    relatedBlogs: ["1", "2"],
    tags: ["AI Writing", "Content Marketing", "SEO"],
    lastUpdated: "2025-05-10",
    systemRequirements: "Web-based, modern browser required",
    apiAvailable: true,
    integratedWith: ["WordPress", "Shopify", "MailChimp", "HubSpot"],
    testimonials: [
      {
        name: "David Chen",
        company: "Growth Marketing Inc.",
        comment: "We've seen a 32% increase in organic traffic since implementing CopyGenius for our SEO content."
      }
    ],
    screenshots: [
      "/placeholder.svg",
      "/placeholder.svg"
    ]
  },
  {
    id: "4",
    name: "CodeCompanion",
    slug: "codecompanion",
    logo: "/placeholder.svg",
    category: "coding-assistants",
    description: "The ultimate AI coding assistant that helps with code completion, debugging, and optimization across multiple languages.",
    features: [
      "Intelligent code completion",
      "Bug detection and fixing",
      "Performance optimization suggestions",
      "Code explanations and documentation",
      "Multi-language support"
    ],
    useCases: [
      "Software development",
      "Code maintenance and refactoring",
      "Learning programming languages",
      "Technical documentation"
    ],
    pricing: "$20/month for individual developers, team plans available",
    websiteUrl: "https://example.com/codecompanion",
    trending: true,
    rating: 4.9,
    industryFit: ["developers", "students"],
    useCase: ["business-automation"],
    editorVerdict: "CodeCompanion is a game-changer for developers of all skill levels. The code suggestions are remarkably accurate, especially for complex algorithms. Where it truly shines is in debugging and performance optimization - identifying potential issues before they become problems. The documentation generator saves hours of tedious work and improves team collaboration.",
    relatedTools: ["5", "6"],
    relatedBlogs: ["2"],
    tags: ["Development", "Coding", "AI Assistant"],
    lastUpdated: "2025-05-05",
    systemRequirements: "VS Code, JetBrains IDEs, or web-based interface",
    apiAvailable: true,
    integratedWith: ["GitHub", "GitLab", "VS Code", "JetBrains IDEs"],
    testimonials: [
      {
        name: "Julia Novak",
        company: "TechFusion Labs",
        comment: "Our junior developers are performing like seniors thanks to CodeCompanion's guidance."
      }
    ],
    screenshots: [
      "/placeholder.svg",
      "/placeholder.svg"
    ]
  },
  {
    id: "5",
    name: "ChatMaster",
    slug: "chatmaster",
    logo: "/placeholder.svg",
    category: "ai-chatbots",
    description: "Enterprise-grade conversational AI platform for building sophisticated customer service and sales chatbots.",
    features: [
      "Natural language understanding",
      "Multi-channel deployment",
      "Intent recognition",
      "Seamless human handoff",
      "Conversation analytics"
    ],
    useCases: [
      "Customer support automation",
      "Lead qualification",
      "Internal knowledge base",
      "Appointment scheduling"
    ],
    pricing: "$79/month for business plan, enterprise pricing available",
    websiteUrl: "https://example.com/chatmaster",
    rating: 4.7,
    industryFit: ["marketers", "customer-support"],
    useCase: ["customer-service"],
    editorVerdict: "ChatMaster strikes an excellent balance between sophisticated AI capabilities and ease of implementation. The natural language understanding is among the best we've tested, recognizing complex queries and maintaining context throughout conversations. The analytics dashboard provides actionable insights for continuous improvement.",
    relatedTools: ["1", "6"],
    relatedBlogs: ["1"],
    tags: ["Chatbots", "Customer Service", "AI"],
    lastUpdated: "2025-05-03",
    systemRequirements: "Web-based with API access",
    apiAvailable: true,
    integratedWith: ["Salesforce", "Zendesk", "Slack", "Microsoft Teams"],
    testimonials: [
      {
        name: "Michael Roberts",
        company: "Global Solutions Inc.",
        comment: "ChatMaster has reduced our customer wait times by 87% while maintaining a 92% satisfaction rate."
      }
    ],
    screenshots: [
      "/placeholder.svg", 
      "/placeholder.svg"
    ]
  },
  {
    id: "6",
    name: "WorkflowWizard",
    slug: "workflowwizard",
    logo: "/placeholder.svg",
    category: "no-code-ai-agents",
    description: "Create sophisticated business automations without coding using an intuitive drag-and-drop interface powered by AI.",
    features: [
      "Visual automation builder",
      "AI-suggested workflow improvements",
      "Integration with 300+ apps and services",
      "Custom trigger conditions",
      "Detailed analytics and reporting"
    ],
    useCases: [
      "Business process automation",
      "Customer onboarding sequences",
      "Data synchronization between systems",
      "Marketing campaign automation"
    ],
    pricing: "Starts at $49/month for businesses, enterprise plans available",
    websiteUrl: "https://example.com/workflowwizard",
    rating: 4.5,
    reviewed: true,
    industryFit: ["marketers", "freelancers"],
    useCase: ["business-automation"],
    editorVerdict: "WorkflowWizard bridges the gap between complex enterprise automation tools and simple task automators. The AI-suggested workflow improvements are genuinely helpful, often identifying bottlenecks that would otherwise go unnoticed. While the learning curve is steeper than some competitors, the power and flexibility it offers makes it worthwhile for businesses serious about automation.",
    relatedTools: ["3", "6"],
    relatedBlogs: ["2"],
    tags: ["Automation", "Workflow", "No-code"],
    lastUpdated: "2025-04-15",
    systemRequirements: "Web-based, Chrome or Firefox browser recommended",
    apiAvailable: true,
    integratedWith: ["Zapier", "Make", "Slack", "Google Workspace", "Microsoft 365"],
    testimonials: [
      {
        name: "Alex Thompson",
        company: "Agile Business Solutions",
        comment: "We've automated over 40 business processes, saving approximately 120 work hours per week."
      }
    ],
    screenshots: [
      "/placeholder.svg",
      "/placeholder.svg"
    ]
  },
  {
    id: "7",
    name: "AutoTask",
    slug: "autotask",
    logo: "/placeholder.svg",
    category: "automation-workflow-tools",
    description: "Personal AI assistant that monitors your work patterns and automates repetitive tasks to save hours every week.",
    features: [
      "Work pattern recognition",
      "Automatic email categorization and responses",
      "Smart calendar management",
      "Document organization",
      "Customizable automation rules"
    ],
    useCases: [
      "Personal productivity enhancement",
      "Administrative task automation",
      "Email management",
      "Meeting scheduling and preparation"
    ],
    pricing: "$9.99/month per user, 14-day free trial",
    websiteUrl: "https://example.com/autotask",
    rating: 4.4,
    industryFit: ["freelancers", "writers", "marketers"],
    useCase: ["business-automation"],
    editorVerdict: "AutoTask is the closest thing to having a personal assistant at a fraction of the cost. Its pattern recognition becomes impressively accurate after just a week of use. The email response suggestions are contextually appropriate and time-saving. While it lacks some of the deeper integrations of enterprise tools, it's perfect for individuals and small teams looking to reclaim hours from their week.",
    relatedTools: ["3", "5"],
    relatedBlogs: [],
    tags: ["Productivity", "AI Assistant", "Email Management"],
    lastUpdated: "2025-04-20",
    systemRequirements: "Works with Gmail, Outlook, Google Calendar, and Microsoft Calendar",
    apiAvailable: false,
    integratedWith: ["Gmail", "Outlook", "Google Calendar", "Microsoft To Do"],
    testimonials: [
      {
        name: "Rebecca Liu",
        company: "Independent Consultant",
        comment: "I was skeptical at first, but now I can't imagine working without AutoTask. It's like having a mind-reading assistant."
      }
    ],
    screenshots: [
      "/placeholder.svg",
      "/placeholder.svg"
    ]
  }
];

// Ensure all category slugs in tools match our defined categories
const validateAndUpdateTools = () => {
  const validCategorySlugs = categories.map(cat => cat.slug);
  
  return rawTools.map(tool => {
    // Check if the tool's category exists in our categories
    if (!validCategorySlugs.includes(tool.category)) {
      console.warn(`Tool ${tool.name} has invalid category: ${tool.category}`);
      // Assign a default category
      return { ...tool, category: 'ai-chatbots' };
    }
    return tool;
  });
};

// Apply validation to ensure tools have valid categories
const validatedRawTools = validateAndUpdateTools();
export const tools: Tool[] = adaptToolsToInternal(validatedRawTools);

export const getTrendingTools = () => {
  return tools.filter(tool => tool.trending === true);
};

export const getToolsByCategory = (categorySlug: string) => {
  return tools.filter(tool => tool.category === categorySlug);
};

export const getToolBySlug = (slug: string) => {
  return tools.find(tool => tool.slug === slug);
};

export const getToolsByIndustry = (industrySlug: string) => {
  return tools.filter(tool => tool.industryFit && tool.industryFit.includes(industrySlug));
};

export const getToolsByUseCase = (useCaseSlug: string) => {
  return tools.filter(tool => tool.useCases && 
    (Array.isArray(tool.useCases) ? 
      tool.useCases.includes(useCaseSlug) : 
      false)
  );
};

// Find similar tools based on category and tags
export const getSimilarTools = (currentTool: Tool, limit = 3): Tool[] => {
  // Filter out the current tool and get tools with the same category or common tags
  const similarTools = tools.filter(tool => {
    // Skip the current tool
    if (tool.id === currentTool.id) return false;
    
    // Same category is a strong indicator of similarity
    if (tool.category === currentTool.category) return true;
    
    // Check for tag overlap if the tool has tags
    if (currentTool.tags?.length && tool.tags?.length) {
      const commonTags = tool.tags.filter(tag => 
        currentTool.tags?.includes(tag)
      );
      if (commonTags.length > 0) return true;
    }
    
    // Check for use case overlap
    if (currentTool.useCases?.length && tool.useCases?.length) {
      const commonUseCases = tool.useCases.filter(useCase => 
        currentTool.useCases?.includes(useCase)
      );
      if (commonUseCases.length > 0) return true;
    }
    
    return false;
  });
  
  // Sort by similarity and return the top N
  return similarTools.slice(0, limit);
};

export const getRelatedTools = (toolId: string) => {
  const tool = tools.find(t => t._id === toolId || t.id === toolId);
  if (!tool || !tool.relatedTools || tool.relatedTools.length === 0) return [];
  
  return tools.filter(t => tool.relatedTools?.includes(t._id || t.id || ''));
};

export const getTopRatedTools = () => {
  return [...tools].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 3);
};
