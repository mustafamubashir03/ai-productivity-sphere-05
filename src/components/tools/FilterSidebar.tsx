
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
import { cn, getFilterLayoutClasses } from "@/lib/utils";

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
  const classes = getFilterLayoutClasses(isMobile);
  
  // Handle button clicks - ensure they're type="button" to prevent form submission
  const handleIndustryClick = (industrySlug: string | null) => {
    onSelectIndustry(industrySlug);
  };
  
  const handleUseCaseClick = (useCaseSlug: string | null) => {
    onSelectUseCase(useCaseSlug);
  };
  
  return (
    <div className={cn(
      "mb-6",
      isMobile ? "w-full" : "w-full lg:w-64 lg:flex-shrink-0"
    )}>
      {isMobile ? (
        <Accordion type="single" collapsible className={classes.container}>
          <AccordionItem value="filters" className="border-none">
            <AccordionTrigger className={classes.header}>
              <span className="flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </span>
            </AccordionTrigger>
            <AccordionContent className={classes.content}>
              <div className="space-y-6">
                {/* Industry Filter */}
                <div className="filter-section">
                  <h3 className={classes.sectionTitle}>Industries</h3>
                  <div className={classes.buttonGroup}>
                    <Button
                      key="all-industries"
                      variant={activeIndustry === null ? "default" : "outline"}
                      onClick={() => handleIndustryClick(null)}
                      size="sm"
                      className={classes.button}
                      type="button"
                    >
                      All Industries
                    </Button>
                    {industries.map((industry) => (
                      <Button
                        key={industry.id}
                        variant={activeIndustry === industry.slug ? "default" : "outline"}
                        onClick={() => handleIndustryClick(industry.slug)}
                        size="sm"
                        className={classes.button}
                        type="button"
                      >
                        {industry.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Use Case Filter */}
                <div className="filter-section">
                  <h3 className={classes.sectionTitle}>Use Cases</h3>
                  <div className={classes.buttonGroup}>
                    <Button
                      key="all-usecases"
                      variant={activeUseCase === null ? "default" : "outline"}
                      onClick={() => handleUseCaseClick(null)}
                      size="sm"
                      className={classes.button}
                      type="button"
                    >
                      All Use Cases
                    </Button>
                    {useCases.map((useCase) => (
                      <Button
                        key={useCase.id}
                        variant={activeUseCase === useCase.slug ? "default" : "outline"}
                        onClick={() => handleUseCaseClick(useCase.slug)}
                        size="sm"
                        className={classes.button}
                        type="button"
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
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className={classes.container}>
          <div className={classes.header}>
            <div className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              <h3 className="font-medium">Filters</h3>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1" type="button">
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                <span className="sr-only">Toggle filters</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className={classes.content}>
            {/* Industry Filter */}
            <div className="filter-section">
              <h3 className={classes.sectionTitle}>Industries</h3>
              <div className={classes.buttonGroup}>
                <Button
                  key="all-industries-desktop"
                  variant={activeIndustry === null ? "default" : "outline"}
                  onClick={() => handleIndustryClick(null)}
                  size="sm"
                  className={classes.button}
                  type="button"
                >
                  All Industries
                </Button>
                {industries.map((industry) => (
                  <Button
                    key={industry.id}
                    variant={activeIndustry === industry.slug ? "default" : "outline"}
                    onClick={() => handleIndustryClick(industry.slug)}
                    size="sm"
                    className={classes.button}
                    type="button"
                  >
                    {industry.name}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Use Case Filter */}
            <div className="filter-section">
              <h3 className={classes.sectionTitle}>Use Cases</h3>
              <div className={classes.buttonGroup}>
                <Button
                  key="all-usecases-desktop"
                  variant={activeUseCase === null ? "default" : "outline"}
                  onClick={() => handleUseCaseClick(null)}
                  size="sm"
                  className={classes.button}
                  type="button"
                >
                  All Use Cases
                </Button>
                {useCases.map((useCase) => (
                  <Button
                    key={useCase.id}
                    variant={activeUseCase === useCase.slug ? "default" : "outline"}
                    onClick={() => handleUseCaseClick(useCase.slug)}
                    size="sm"
                    className={classes.button}
                    type="button"
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
