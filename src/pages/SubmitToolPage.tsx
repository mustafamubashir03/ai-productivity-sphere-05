
import { useState } from "react";
import SEOHead from "@/components/common/SEOHead";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { categories } from "@/data/categories";
import { useCases } from "@/data/useCases";
import { industries } from "@/data/industries";

interface ToolSubmission {
  name: string;
  description: string;
  websiteUrl: string;
  category: string;
  useCase: string;
  industry: string;
  pricing: string;
  email: string;
}

const SubmitToolPage = () => {
  const [formData, setFormData] = useState<ToolSubmission>({
    name: "",
    description: "",
    websiteUrl: "",
    category: "",
    useCase: "",
    industry: "",
    pricing: "",
    email: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form data
    if (!formData.name || !formData.description || !formData.websiteUrl || !formData.category) {
      toast.error("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Store in localStorage for now (could be replaced with API call later)
      const storedTools = localStorage.getItem('userSubmittedTools');
      const userSubmittedTools = storedTools ? JSON.parse(storedTools) : [];
      
      // Add new submission with timestamp and ID
      userSubmittedTools.push({
        ...formData,
        id: `user-${Date.now()}`,
        submittedAt: new Date().toISOString()
      });
      
      localStorage.setItem('userSubmittedTools', JSON.stringify(userSubmittedTools));
      
      // Show success message
      toast.success("Your tool was submitted successfully! Our team will review it soon.");
      
      // Reset form
      setFormData({
        name: "",
        description: "",
        websiteUrl: "",
        category: "",
        useCase: "",
        industry: "",
        pricing: "",
        email: ""
      });
      
      // In a real app, you would send this data to your backend API
      console.log("Tool submission:", formData);
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <SEOHead 
        title="Submit an AI Tool - AI Productivity Hub"
        description="Submit your AI productivity tool to be featured in our directory. Share your innovative solution with our community."
      />
      
      <PageHeader 
        title="Submit a Tool"
        description="Have an amazing AI tool that should be featured in our directory? Submit it here for review."
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tool Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tool Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. AI Copilot"
                className="w-full"
                required
              />
            </div>
            
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Briefly describe what your tool does and its key features..."
                className="w-full min-h-[120px]"
                required
              />
            </div>
            
            {/* Website URL */}
            <div>
              <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Website URL <span className="text-red-500">*</span>
              </label>
              <Input
                id="websiteUrl"
                name="websiteUrl"
                type="url"
                value={formData.websiteUrl}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full"
                required
              />
            </div>
            
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleSelectChange("category", value)}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.slug}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Use Case */}
            <div>
              <label htmlFor="useCase" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Primary Use Case
              </label>
              <Select 
                value={formData.useCase} 
                onValueChange={(value) => handleSelectChange("useCase", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a use case" />
                </SelectTrigger>
                <SelectContent>
                  {useCases.map(useCase => (
                    <SelectItem key={useCase.id} value={useCase.slug}>{useCase.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Industry */}
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Target Industry
              </label>
              <Select 
                value={formData.industry} 
                onValueChange={(value) => handleSelectChange("industry", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map(industry => (
                    <SelectItem key={industry.id} value={industry.slug}>{industry.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Pricing */}
            <div>
              <label htmlFor="pricing" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pricing Model
              </label>
              <Input
                id="pricing"
                name="pricing"
                value={formData.pricing}
                onChange={handleChange}
                placeholder="e.g. Free, Freemium, $10/month"
                className="w-full"
              />
            </div>
            
            {/* Contact Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contact Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full"
                required
              />
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Tool"}
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              By submitting, you agree that the information provided is accurate and that you have the right to submit this tool.
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SubmitToolPage;
