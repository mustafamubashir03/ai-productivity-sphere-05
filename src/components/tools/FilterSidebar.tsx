
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { industries } from "@/data/industries";
import { useCases } from "@/data/useCases";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type FilterSidebarProps = {
  onSelectPricingModel: (pricingModel: string | null) => void;
  onSelectPlatform: (platform: string | null) => void;
  onSelectSubcategory: (subcategory: string | null) => void;
  activePricingModel: string | null;
  activePlatform: string | null;
  activeSubcategory: string | null;
  subcategories: string[];
  pricingModels: string[];
  platforms: string[];
  isMobile: boolean;
};

const FilterSidebar = ({
  onSelectPricingModel,
  onSelectPlatform,
  onSelectSubcategory,
  activePricingModel,
  activePlatform,
  activeSubcategory,
  subcategories,
  pricingModels,
  platforms,
  isMobile
}: FilterSidebarProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Filter counts
  const activeFilters = [
    activePricingModel, 
    activePlatform, 
    activeSubcategory
  ].filter(Boolean).length;
  
  const clearAllFilters = () => {
    onSelectPricingModel(null);
    onSelectPlatform(null);
    onSelectSubcategory(null);
  };

  return (
    <div className="w-full mb-6">
      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto flex justify-between items-center gap-2 mb-4"
          >
            <span className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Advanced Filters
              {activeFilters > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                  {activeFilters}
                </span>
              )}
            </span>
            {isFiltersOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-6">
            {/* Clear all filters */}
            {activeFilters > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{activeFilters} active filters</span>
                <Button
                  onClick={clearAllFilters}
                  variant="ghost"
                  size="sm"
                  className="text-primary h-auto p-0 hover:bg-transparent"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear all
                </Button>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {/* Subcategories */}
              {subcategories.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3 text-sm">Subcategories</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {subcategories.map((subcat, index) => (
                      <label 
                        key={index}
                        className="flex items-center space-x-2 cursor-pointer text-sm hover:text-primary transition-colors"
                      >
                        <Checkbox 
                          id={`subcategory-${index}`}
                          checked={subcat === activeSubcategory}
                          onCheckedChange={() => {
                            onSelectSubcategory(subcat === activeSubcategory ? null : subcat);
                          }}
                        />
                        <span className="text-xs">{subcat}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Pricing Models */}
              {pricingModels.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3 text-sm">Pricing</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {pricingModels.map((pricing, index) => (
                      <label 
                        key={index}
                        className="flex items-center space-x-2 cursor-pointer text-sm hover:text-primary transition-colors"
                      >
                        <Checkbox 
                          id={`pricing-${index}`}
                          checked={pricing === activePricingModel}
                          onCheckedChange={() => {
                            onSelectPricingModel(pricing === activePricingModel ? null : pricing);
                          }}
                        />
                        <span className="text-xs">{pricing}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Platforms */}
              {platforms.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3 text-sm">Platforms</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {platforms.map((platform, index) => (
                      <label 
                        key={index}
                        className="flex items-center space-x-2 cursor-pointer text-sm hover:text-primary transition-colors"
                      >
                        <Checkbox 
                          id={`platform-${index}`}
                          checked={platform === activePlatform}
                          onCheckedChange={() => {
                            onSelectPlatform(platform === activePlatform ? null : platform);
                          }}
                        />
                        <span className="text-xs">{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default FilterSidebar;
