
export const tools = [
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
    relatedBlogs: ["2"]
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
    relatedBlogs: ["1"]
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
    relatedBlogs: ["1", "2"]
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
    relatedBlogs: ["2"]
  },
  {
    id: "5",
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
    relatedBlogs: ["2"]
  },
  {
    id: "6",
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
    relatedBlogs: []
  }
];

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
  return tools.filter(tool => tool.useCase && tool.useCase.includes(useCaseSlug));
};

export const getRelatedTools = (toolId: string) => {
  const tool = tools.find(t => t.id === toolId);
  if (!tool || !tool.relatedTools || tool.relatedTools.length === 0) return [];
  
  return tools.filter(t => tool.relatedTools.includes(t.id));
};

export const getTopRatedTools = () => {
  return [...tools].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 3);
};
