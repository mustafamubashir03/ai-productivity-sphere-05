
import { Video, Image, Pencil, Code, Bot, Workflow, MessageSquare, PlayCircle, Clock, DollarSign, Brush, Cuboid, BookOpen, ShieldCheck, Film, Cpu, Mic, Stethoscope, Sparkles, Feather, PenTool, FileText, Palette, BadgeDollarSign, Megaphone, ShoppingCart } from "lucide-react";
import { type LucideIcon } from "lucide-react";

export interface CategoryWithIcon {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  LucideIcon: LucideIcon;
}

export const categories: CategoryWithIcon[] = [
  {
    id: "1",
    name: "Video Editing Tools",
    slug: "video-editing-tools",
    icon: "/icons/video-editing.svg",
    description: "AI-powered tools to enhance and streamline your video editing workflow.",
    LucideIcon: Video
  },
  {
    id: "2",
    name: "Photo Editing Tools",
    slug: "photo-editing-tools",
    icon: "/icons/photo-editing.svg",
    description: "Transform your images with intelligent AI photo enhancement tools.",
    LucideIcon: Image
  },
  {
    id: "3",
    name: "Copywriting & Blogging",
    slug: "copywriting-blogging-tools",
    icon: "/icons/copywriting.svg",
    description: "Create high-quality written content with AI assistance.",
    LucideIcon: Pencil
  },
  {
    id: "4",
    name: "Coding Assistants",
    slug: "coding-assistants",
    icon: "/icons/coding.svg",
    description: "Boost your programming productivity with AI coding partners.",
    LucideIcon: Code
  },
  {
    id: "5",
    name: "AI Chatbots",
    slug: "ai-chatbots",
    icon: "/icons/chatbots.svg",
    description: "Intelligent conversational agents powered by large language models.",
    LucideIcon: MessageSquare
  },
  {
    id: "6",
    name: "No-code AI Agents",
    slug: "no-code-ai-agents",
    icon: "/icons/no-code.svg",
    description: "Build powerful automations without writing a single line of code.",
    LucideIcon: Bot
  },
  {
    id: "7",
    name: "Automation & Workflow",
    slug: "automation-workflow-tools",
    icon: "/icons/automation.svg",
    description: "Streamline your processes and eliminate repetitive tasks.",
    LucideIcon: Workflow
  },
  {
    id: "8",
    name: "E-commerce AI",
    slug: "e-commerce",
    icon: "/icons/ecommerce.svg",
    description: "AI tools for personalized shopping, recommendations, and smart inventory.",
    LucideIcon: ShoppingCart
  },
  {
    id: "9",
    name: "Marketing AI",
    slug: "marketing",
    icon: "/icons/marketing.svg",
    description: "Drive growth with AI-powered marketing, targeting, and analytics tools.",
    LucideIcon: Megaphone
  },
  {
    id: "10",
    name: "AI Advertising",
    slug: "ai-advertising",
    icon: "/icons/advertising.svg",
    description: "Automate and optimize your ad campaigns with intelligent ad tools.",
    LucideIcon: BadgeDollarSign
  },
  {
    id: "11",
    name: "AI Art Generators",
    slug: "ai-art-generator",
    icon: "/icons/ai-art.svg",
    description: "Create stunning artworks and illustrations using AI creativity.",
    LucideIcon: Palette
  },
  {
    id: "12",
    name: "Content Generation",
    slug: "ai-content-generator",
    icon: "/icons/content-generator.svg",
    description: "Automate article, script, and content creation using generative AI.",
    LucideIcon: FileText
  },
  {
    id: "13",
    name: "Design Assistants",
    slug: "ai-for-designing",
    icon: "/icons/design.svg",
    description: "Get help with UI, branding, and creative visuals using AI design tools.",
    LucideIcon: PenTool
  },
  {
    id: "14",
    name: "Writing Tools",
    slug: "writing-tools",
    icon: "/icons/writing.svg",
    description: "Improve writing quality, grammar, and structure with AI assistance.",
    LucideIcon: Feather
  },
  {
    id: "15",
    name: "Beauty & Style AI",
    slug: "beauty",
    icon: "/icons/beauty.svg",
    description: "AI tools for virtual makeup, skin analysis, and beauty personalization.",
    LucideIcon: Sparkles
  },
  {
    id: "16",
    name: "Medical AI",
    slug: "medical",
    icon: "/icons/medical.svg",
    description: "Diagnostic and assistant tools helping doctors, clinics, and researchers.",
    LucideIcon: Stethoscope
  },
  {
    id: "17",
    name: "AI Voice Generation",
    slug: "ai-voice-generation",
    icon: "/icons/voice.svg",
    description: "Convert text into realistic human-like speech using AI voice models.",
    LucideIcon: Mic
  },
  {
    id: "18",
    name: "AI for Tech",
    slug: "ai-for-tech",
    icon: "/icons/ai-tech.svg",
    description: "Smart tools for developers, IT teams, and tech companies.",
    LucideIcon: Cpu
  },
  {
    id: "19",
    name: "AI Video Generation",
    slug: "ai-video-generation",
    icon: "/icons/ai-video.svg",
    description: "Create and animate videos from scripts, images, or voice using AI.",
    LucideIcon: Film
  },
  {
    id: "20",
    name: "AI Detection Tools",
    slug: "ai-detection",
    icon: "/icons/ai-detection.svg",
    description: "Detect AI-generated content, plagiarism, and deepfakes.",
    LucideIcon: ShieldCheck
  },
  {
    id: "21",
    name: "AI Research Tools",
    slug: "research",
    icon: "/icons/research.svg",
    description: "Search engines, paper summarizers, and research co-pilots.",
    LucideIcon: BookOpen
  },
  {
    id: "22",
    name: "3D Modeling AI",
    slug: "3d-modeling",
    icon: "/icons/3d-modeling.svg",
    description: "Design, animate, and enhance 3D models using AI assistance.",
    LucideIcon: Cuboid
  },
  {
    id: "23",
    name: "AI Image Generation",
    slug: "ai-image-generation",
    icon: "/icons/image-generation.svg",
    description: "Generate photos, illustrations, or logos using AI prompts.",
    LucideIcon: Brush
  },
  {
    id: "24",
    name: "Finance AI",
    slug: "finance",
    icon: "/icons/finance.svg",
    description: "AI tools for investing, forecasting, and financial planning.",
    LucideIcon: DollarSign
  },
  {
    id: "25",
    name: "Productivity Tools",
    slug: "productivity-tools",
    icon: "/icons/productivity.svg",
    description: "Boost your productivity with task managers, calendars, and planners powered by AI.",
    LucideIcon: Clock
  },
  {
    id: "26",
    name: "Entertainment AI",
    slug: "entertainment",
    icon: "/icons/entertainment.svg",
    description: "Games, storytelling, music, and AI fun for creators and users.",
    LucideIcon: PlayCircle
  }
];

// Helper function to get a category by slug
export const getCategoryBySlug = (slug: string): CategoryWithIcon | undefined => {
  return categories.find(category => 
    category.slug === slug || 
    category.slug === slug.toLowerCase() || 
    category.name === slug
  );
};

// Helper function to match category from API to our local categories
export const matchCategory = (categoryValue: string): CategoryWithIcon | undefined => {
  // Direct match
  const directMatch = getCategoryBySlug(categoryValue);
  if (directMatch) return directMatch;
  
  // Try to normalize the string
  const normalized = categoryValue
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/&/g, 'and');
  
  return categories.find(category => 
    category.slug.includes(normalized) || 
    normalized.includes(category.slug)
  );
};
