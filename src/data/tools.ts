
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
    websiteUrl: "https://example.com/videogpt"
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
    websiteUrl: "https://example.com/pixelmind"
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
    websiteUrl: "https://example.com/copygenius"
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
    websiteUrl: "https://example.com/codecompanion"
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
    websiteUrl: "https://example.com/workflowwizard"
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
    websiteUrl: "https://example.com/autotask"
  }
];

export const getTrendingTools = () => {
  return tools.slice(0, 3);
};

export const getToolsByCategory = (categorySlug: string) => {
  return tools.filter(tool => tool.category === categorySlug);
};

export const getToolBySlug = (slug: string) => {
  return tools.find(tool => tool.slug === slug);
};
