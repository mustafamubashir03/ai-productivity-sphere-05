
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
  onSelectPricingModel?: (pricingModel: string | null) => void;
  onSelectPlatform?: (platform: string | null) => void;
  onSelectSubcategory?: (subcategory: string | null) => void;
  activeIndustry: string | null;
  activeUseCase: string | null;
  activePricingModel?: string | null;
  activePlatform?: string | null;
  activeSubcategory?: string | null;
  subcategories?: string[];
  pricingModels?: string[];
  platforms?: string[];
  isMobile: boolean;
}

const FilterSidebar = ({
  onSelectIndustry,
  onSelectUseCase,
  onSelectPricingModel,
  onSelectPlatform,
  onSelectSubcategory,
  activeIndustry,
  activeUseCase,
  activePricingModel,
  activePlatform,
  activeSubcategory,
  subcategories = [],
  pricingModels = [],
  platforms = [],
  isMobile
}: FilterSidebarProps) => {
  // Initialize as closed for both mobile and desktop for better UX
  const [isOpen, setIsOpen] = useState(false);
  const classes = getFilterLayoutClasses(isMobile);
  
  // Format display names for raw values
  const formatDisplayName = (value: string) => {
    if (value === 'one-time') return 'One-time Payment';
    
    return value
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
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
                {/* Subcategories Filter */}
                {subcategories && subcategories.length > 0 && onSelectSubcategory && (
                  <div className="filter-section">
                    <h3 className={classes.sectionTitle}>Subcategories</h3>
                    <div className={classes.buttonGroup}>
                      <Button
                        key="all-subcategories"
                        variant={activeSubcategory === null ? "default" : "outline"}
                        onClick={() => onSelectSubcategory(null)}
                        size="sm"
                        className={classes.button}
                        type="button"
                      >
                        All Subcategories
                      </Button>
                      {subcategories.map((subcategory) => (
                        <Button
                          key={subcategory}
                          variant={activeSubcategory === subcategory ? "default" : "outline"}
                          onClick={() => onSelectSubcategory(subcategory)}
                          size="sm"
                          className={classes.button}
                          type="button"
                        >
                          {formatDisplayName(subcategory)}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Industry Filter */}
                <div className="filter-section">
                  <h3 className={classes.sectionTitle}>Industries</h3>
                  <div className={classes.buttonGroup}>
                    <Button
                      key="all-industries"
                      variant={activeIndustry === null ? "default" : "outline"}
                      onClick={() => onSelectIndustry(null)}
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
                        onClick={() => onSelectIndustry(industry.slug)}
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
                      onClick={() => onSelectUseCase(null)}
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
                        onClick={() => onSelectUseCase(useCase.slug)}
                        size="sm"
                        className={classes.button}
                        type="button"
                      >
                        {useCase.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Pricing Model Filter */}
                {pricingModels && pricingModels.length > 0 && onSelectPricingModel && (
                  <div className="filter-section">
                    <h3 className={classes.sectionTitle}>Pricing</h3>
                    <div className={classes.buttonGroup}>
                      <Button
                        key="all-pricing-models"
                        variant={activePricingModel === null ? "default" : "outline"}
                        onClick={() => onSelectPricingModel(null)}
                        size="sm"
                        className={classes.button}
                        type="button"
                      >
                        All Pricing Models
                      </Button>
                      {pricingModels.map((model) => (
                        <Button
                          key={model}
                          variant={activePricingModel === model ? "default" : "outline"}
                          onClick={() => onSelectPricingModel(model)}
                          size="sm"
                          className={classes.button}
                          type="button"
                        >
                          {formatDisplayName(model)}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Platform Filter */}
                {platforms && platforms.length > 0 && onSelectPlatform && (
                  <div className="filter-section">
                    <h3 className={classes.sectionTitle}>Platforms</h3>
                    <div className={classes.buttonGroup}>
                      <Button
                        key="all-platforms"
                        variant={activePlatform === null ? "default" : "outline"}
                        onClick={() => onSelectPlatform(null)}
                        size="sm"
                        className={classes.button}
                        type="button"
                      >
                        All Platforms
                      </Button>
                      {platforms.map((platform) => (
                        <Button
                          key={platform}
                          variant={activePlatform === platform ? "default" : "outline"}
                          onClick={() => onSelectPlatform(platform)}
                          size="sm"
                          className={classes.button}
                          type="button"
                        >
                          {formatDisplayName(platform)}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
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
            {/* Subcategories Filter */}
            {subcategories && subcategories.length > 0 && onSelectSubcategory && (
              <div className="filter-section">
                <h3 className={classes.sectionTitle}>Subcategories</h3>
                <div className={classes.buttonGroup}>
                  <Button
                    key="all-subcategories-desktop"
                    variant={activeSubcategory === null ? "default" : "outline"}
                    onClick={() => onSelectSubcategory(null)}
                    size="sm"
                    className={classes.button}
                    type="button"
                  >
                    All Subcategories
                  </Button>
                  {subcategories.map((subcategory) => (
                    <Button
                      key={subcategory}
                      variant={activeSubcategory === subcategory ? "default" : "outline"}
                      onClick={() => onSelectSubcategory(subcategory)}
                      size="sm"
                      className={classes.button}
                      type="button"
                    >
                      {formatDisplayName(subcategory)}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Industry Filter */}
            <div className="filter-section">
              <h3 className={classes.sectionTitle}>Industries</h3>
              <div className={classes.buttonGroup}>
                <Button
                  key="all-industries-desktop"
                  variant={activeIndustry === null ? "default" : "outline"}
                  onClick={() => onSelectIndustry(null)}
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
                    onClick={() => onSelectIndustry(industry.slug)}
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
                  onClick={() => onSelectUseCase(null)}
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
                    onClick={() => onSelectUseCase(useCase.slug)}
                    size="sm"
                    className={classes.button}
                    type="button"
                  >
                    {useCase.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Pricing Model Filter */}
            {pricingModels && pricingModels.length > 0 && onSelectPricingModel && (
              <div className="filter-section">
                <h3 className={classes.sectionTitle}>Pricing</h3>
                <div className={classes.buttonGroup}>
                  <Button
                    key="all-pricing-models-desktop"
                    variant={activePricingModel === null ? "default" : "outline"}
                    onClick={() => onSelectPricingModel(null)}
                    size="sm"
                    className={classes.button}
                    type="button"
                  >
                    All Pricing Models
                  </Button>
                  {pricingModels.map((model) => (
                    <Button
                      key={model}
                      variant={activePricingModel === model ? "default" : "outline"}
                      onClick={() => onSelectPricingModel(model)}
                      size="sm"
                      className={classes.button}
                      type="button"
                    >
                      {formatDisplayName(model)}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Platform Filter */}
            {platforms && platforms.length > 0 && onSelectPlatform && (
              <div className="filter-section">
                <h3 className={classes.sectionTitle}>Platforms</h3>
                <div className={classes.buttonGroup}>
                  <Button
                    key="all-platforms-desktop"
                    variant={activePlatform === null ? "default" : "outline"}
                    onClick={() => onSelectPlatform(null)}
                    size="sm"
                    className={classes.button}
                    type="button"
                  >
                    All Platforms
                  </Button>
                  {platforms.map((platform) => (
                    <Button
                      key={platform}
                      variant={activePlatform === platform ? "default" : "outline"}
                      onClick={() => onSelectPlatform(platform)}
                      size="sm"
                      className={classes.button}
                      type="button"
                    >
                      {formatDisplayName(platform)}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

export default FilterSidebar;
