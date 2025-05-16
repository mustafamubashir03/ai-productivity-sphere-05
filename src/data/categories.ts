
import { Video, Image, Pencil, Code, Bot, Workflow } from "lucide-react";
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
    icon: "/icons/video-editing.svg", // Keep static icon path for backward compatibility
    description: "AI-powered tools to enhance and streamline your video editing workflow.",
    LucideIcon: Video
  },
  {
    id: "2",
    name: "Photo Editing Tools",
    slug: "photo-editing-tools",
    icon: "/icons/photo-editing.svg", // Keep static icon path for backward compatibility
    description: "Transform your images with intelligent AI photo enhancement tools.",
    LucideIcon: Image
  },
  {
    id: "3",
    name: "Copywriting & Blogging",
    slug: "copywriting-blogging-tools",
    icon: "/icons/copywriting.svg", // Keep static icon path for backward compatibility
    description: "Create high-quality written content with AI assistance.",
    LucideIcon: Pencil
  },
  {
    id: "4",
    name: "Coding Assistants",
    slug: "coding-assistants",
    icon: "/icons/coding.svg", // Keep static icon path for backward compatibility
    description: "Boost your programming productivity with AI coding partners.",
    LucideIcon: Code
  },
  {
    id: "5",
    name: "No-code AI Agents",
    slug: "no-code-ai-agents",
    icon: "/icons/no-code.svg", // Keep static icon path for backward compatibility
    description: "Build powerful automations without writing a single line of code.",
    LucideIcon: Bot
  },
  {
    id: "6",
    name: "Automation & Workflow",
    slug: "automation-workflow-tools",
    icon: "/icons/automation.svg", // Keep static icon path for backward compatibility
    description: "Streamline your processes and eliminate repetitive tasks.",
    LucideIcon: Workflow
  }
];
