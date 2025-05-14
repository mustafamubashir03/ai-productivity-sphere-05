
import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { industries } from "@/data/industries";
import { useCases } from "@/data/useCases";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  onSelectIndustry: (industrySlug: string | null) => void;
  onSelectUseCase: (useCaseSlug: string | null) => void;
  activeIndustry: string | null;
  activeUseCase: string | null;
  isMobile: boolean;
}

const FilterSidebar = ({
  onSelectIndustry,
  onSelectUseCase,
  activeIndustry,
  activeUseCase,
  isMobile
}: FilterSidebarProps) => {
  const [isOpen, setIsOpen] = useState(!isMobile);
  
  // Handle button clicks without page reload
  const handleIndustryClick = (industrySlug: string | null) => {
    onSelectIndustry(industrySlug);
  };
  
  const handleUseCaseClick = (useCaseSlug: string | null) => {
    onSelectUseCase(useCaseSlug);
  };
  
  return (
    <div className={cn(
      "mb-8",
      isMobile ? "w-full" : "w-full lg:w-64 lg:mr-6 lg:flex-shrink-0"
    )}>
      {isMobile ? (
        <Accordion type="single" collapsible className="w-full border rounded-lg mb-6">
          <AccordionItem value="filters">
            <AccordionTrigger className="px-4 py-3 font-medium">
              <span className="flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-6">
                {/* Industry Filter */}
                <div className="filter-section">
                  <h3 className="text-lg font-medium mb-3">Industries</h3>
                  <div className="space-y-2">
                    <Button
                      variant={activeIndustry === null ? "default" : "outline"}
                      onClick={(e) => {
                        e.preventDefault();
                        handleIndustryClick(null);
                      }}
                      size="sm"
                      className="w-full justify-start"
                    >
                      All Industries
                    </Button>
                    {industries.map((industry) => (
                      <Button
                        key={industry.id}
                        variant={activeIndustry === industry.slug ? "default" : "outline"}
                        onClick={(e) => {
                          e.preventDefault();
                          handleIndustryClick(industry.slug);
                        }}
                        size="sm"
                        className="w-full justify-start"
                      >
                        {industry.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Use Case Filter */}
                <div className="filter-section">
                  <h3 className="text-lg font-medium mb-3">Use Cases</h3>
                  <div className="space-y-2">
                    <Button
                      variant={activeUseCase === null ? "default" : "outline"}
                      onClick={(e) => {
                        e.preventDefault();
                        handleUseCaseClick(null);
                      }}
                      size="sm"
                      className="w-full justify-start"
                    >
                      All Use Cases
                    </Button>
                    {useCases.map((useCase) => (
                      <Button
                        key={useCase.id}
                        variant={activeUseCase === useCase.slug ? "default" : "outline"}
                        onClick={(e) => {
                          e.preventDefault();
                          handleUseCaseClick(useCase.slug);
                        }}
                        size="sm"
                        className="w-full justify-start"
                      >
                        {useCase.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-lg mb-6">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              <h3 className="font-medium">Filters</h3>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1">
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                <span className="sr-only">Toggle filters</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className="px-4 py-4 space-y-6">
            {/* Industry Filter */}
            <div className="filter-section">
              <h3 className="text-lg font-medium mb-3">Industries</h3>
              <div className="space-y-2">
                <Button
                  variant={activeIndustry === null ? "default" : "outline"}
                  onClick={(e) => {
                    e.preventDefault();
                    handleIndustryClick(null);
                  }}
                  size="sm"
                  className="w-full justify-start"
                >
                  All Industries
                </Button>
                {industries.map((industry) => (
                  <Button
                    key={industry.id}
                    variant={activeIndustry === industry.slug ? "default" : "outline"}
                    onClick={(e) => {
                      e.preventDefault();
                      handleIndustryClick(industry.slug);
                    }}
                    size="sm"
                    className="w-full justify-start"
                  >
                    {industry.name}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Use Case Filter */}
            <div className="filter-section">
              <h3 className="text-lg font-medium mb-3">Use Cases</h3>
              <div className="space-y-2">
                <Button
                  variant={activeUseCase === null ? "default" : "outline"}
                  onClick={(e) => {
                    e.preventDefault();
                    handleUseCaseClick(null);
                  }}
                  size="sm"
                  className="w-full justify-start"
                >
                  All Use Cases
                </Button>
                {useCases.map((useCase) => (
                  <Button
                    key={useCase.id}
                    variant={activeUseCase === useCase.slug ? "default" : "outline"}
                    onClick={(e) => {
                      e.preventDefault();
                      handleUseCaseClick(useCase.slug);
                    }}
                    size="sm"
                    className="w-full justify-start"
                  >
                    {useCase.name}
                  </Button>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

export default FilterSidebar;
