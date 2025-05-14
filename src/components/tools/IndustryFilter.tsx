
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { industries } from "@/data/industries";

interface IndustryFilterProps {
  onSelectIndustry: (industrySlug: string | null) => void;
  activeIndustry: string | null;
}

const IndustryFilter = ({ onSelectIndustry, activeIndustry }: IndustryFilterProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-3 text-center dark:text-white">Filter by Industry</h3>
      <Tabs defaultValue="all" className="w-full" onValueChange={(value) => onSelectIndustry(value === "all" ? null : value)}>
        <TabsList className="w-full overflow-x-auto flex whitespace-nowrap scrollbar-hide py-2">
          <TabsTrigger 
            value="all"
            className="flex-shrink-0"
            data-state={activeIndustry === null ? "active" : "inactive"}
          >
            All Industries
          </TabsTrigger>
          {industries.map((industry) => (
            <TabsTrigger 
              key={industry.id} 
              value={industry.slug}
              className="flex-shrink-0"
              data-state={activeIndustry === industry.slug ? "active" : "inactive"}
            >
              {industry.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default IndustryFilter;
