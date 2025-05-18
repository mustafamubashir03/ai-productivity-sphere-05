
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { industries } from "@/data/industries";
import { useCases } from "@/data/useCases";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";

type FilterSidebarProps = {
  onSelectIndustry: (industry: string | null) => void;
  onSelectUseCase: (useCase: string | null) => void;
  onSelectPricingModel: (pricingModel: string | null) => void;
  onSelectPlatform: (platform: string | null) => void;
  onSelectSubcategory: (subcategory: string | null) => void;
  activeIndustry: string | null;
  activeUseCase: string | null;
  activePricingModel: string | null;
  activePlatform: string | null;
  activeSubcategory: string | null;
  subcategories: string[];
  pricingModels: string[];
  platforms: string[];
  isMobile: boolean;
};

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
  subcategories,
  pricingModels,
  platforms,
  isMobile
}: FilterSidebarProps) => {
  // Set all sections collapsed by default
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const [isUseCaseOpen, setIsUseCaseOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false);
  
  // For mobile view
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const toggleSection = (section: string) => {
    switch (section) {
      case 'industry':
        setIsIndustryOpen(!isIndustryOpen);
        break;
      case 'useCase':
        setIsUseCaseOpen(!isUseCaseOpen);
        break;
      case 'pricing':
        setIsPricingOpen(!isPricingOpen);
        break;
      case 'platform':
        setIsPlatformOpen(!isPlatformOpen);
        break;
      case 'subcategory':
        setIsSubcategoryOpen(!isSubcategoryOpen);
        break;
      default:
        break;
    }
  };
  
  // Filter counts
  const activeFilters = [
    activeIndustry, 
    activeUseCase, 
    activePricingModel, 
    activePlatform, 
    activeSubcategory
  ].filter(Boolean).length;
  
  const clearAllFilters = () => {
    onSelectIndustry(null);
    onSelectUseCase(null);
    onSelectPricingModel(null);
    onSelectPlatform(null);
    onSelectSubcategory(null);
  };

  const renderMobileFilters = () => (
    <div className="mb-6">
      <Button
        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        variant="outline"
        size="sm"
        className="w-full flex justify-between items-center"
      >
        <span className="flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filters {activeFilters > 0 && `(${activeFilters})`}
        </span>
        {isMobileFilterOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>
      
      {isMobileFilterOpen && renderFilters()}
    </div>
  );

  const renderFilters = () => (
    <div className="space-y-6">
      {activeFilters > 0 && (
        <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm font-medium">{activeFilters} active filters</span>
          <Button
            onClick={clearAllFilters}
            variant="link"
            size="sm"
            className="text-primary h-auto p-0"
          >
            Clear all
          </Button>
        </div>
      )}
      
      {/* Industries Section */}
      {industries.length > 0 && (
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <button 
            onClick={() => toggleSection('industry')}
            className="flex justify-between items-center w-full text-left font-medium py-1"
          >
            <span>Industries</span>
            {isIndustryOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>
          
          {isIndustryOpen && (
            <div className="mt-2 space-y-1">
              {industries.map(industry => (
                <label 
                  key={industry.id}
                  className="flex items-center space-x-2 cursor-pointer text-sm py-1 hover:text-primary transition-colors"
                >
                  <Checkbox 
                    id={`industry-${industry.id}`}
                    checked={industry.slug === activeIndustry}
                    onCheckedChange={() => {
                      onSelectIndustry(
                        industry.slug === activeIndustry ? null : industry.slug
                      );
                    }}
                  />
                  <span>{industry.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Use Cases Section */}
      {useCases.length > 0 && (
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <button 
            onClick={() => toggleSection('useCase')}
            className="flex justify-between items-center w-full text-left font-medium py-1"
          >
            <span>Use Cases</span>
            {isUseCaseOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>
          
          {isUseCaseOpen && (
            <div className="mt-2 space-y-1">
              {useCases.map(useCase => (
                <label 
                  key={useCase.id}
                  className="flex items-center space-x-2 cursor-pointer text-sm py-1 hover:text-primary transition-colors"
                >
                  <Checkbox 
                    id={`useCase-${useCase.id}`}
                    checked={useCase.slug === activeUseCase}
                    onCheckedChange={() => {
                      onSelectUseCase(
                        useCase.slug === activeUseCase ? null : useCase.slug
                      );
                    }}
                  />
                  <span>{useCase.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Subcategories Section */}
      {subcategories.length > 0 && (
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <button 
            onClick={() => toggleSection('subcategory')}
            className="flex justify-between items-center w-full text-left font-medium py-1"
          >
            <span>Subcategories</span>
            {isSubcategoryOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>
          
          {isSubcategoryOpen && (
            <div className="mt-2 space-y-1">
              {subcategories.map((subcat, index) => (
                <label 
                  key={index}
                  className="flex items-center space-x-2 cursor-pointer text-sm py-1 hover:text-primary transition-colors"
                >
                  <Checkbox 
                    id={`subcategory-${index}`}
                    checked={subcat === activeSubcategory}
                    onCheckedChange={() => {
                      onSelectSubcategory(subcat === activeSubcategory ? null : subcat);
                    }}
                  />
                  <span>{subcat}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Pricing Models Section */}
      {pricingModels.length > 0 && (
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <button 
            onClick={() => toggleSection('pricing')}
            className="flex justify-between items-center w-full text-left font-medium py-1"
          >
            <span>Pricing</span>
            {isPricingOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>
          
          {isPricingOpen && (
            <div className="mt-2 space-y-1">
              {pricingModels.map((pricing, index) => (
                <label 
                  key={index}
                  className="flex items-center space-x-2 cursor-pointer text-sm py-1 hover:text-primary transition-colors"
                >
                  <Checkbox 
                    id={`pricing-${index}`}
                    checked={pricing === activePricingModel}
                    onCheckedChange={() => {
                      onSelectPricingModel(pricing === activePricingModel ? null : pricing);
                    }}
                  />
                  <span>{pricing}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Platforms Section */}
      {platforms.length > 0 && (
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <button 
            onClick={() => toggleSection('platform')}
            className="flex justify-between items-center w-full text-left font-medium py-1"
          >
            <span>Platforms</span>
            {isPlatformOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>
          
          {isPlatformOpen && (
            <div className="mt-2 space-y-1">
              {platforms.map((platform, index) => (
                <label 
                  key={index}
                  className="flex items-center space-x-2 cursor-pointer text-sm py-1 hover:text-primary transition-colors"
                >
                  <Checkbox 
                    id={`platform-${index}`}
                    checked={platform === activePlatform}
                    onCheckedChange={() => {
                      onSelectPlatform(platform === activePlatform ? null : platform);
                    }}
                  />
                  <span>{platform}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      {isMobile ? (
        renderMobileFilters()
      ) : (
        <div className="w-64 flex-shrink-0 pr-6">
          <div className="sticky top-20">
            <h3 className="text-lg font-medium mb-4 flex items-center border-b pb-2 border-gray-200 dark:border-gray-700">
              <Filter className="mr-2 h-5 w-5" /> 
              Filters
              {activeFilters > 0 && <span className="ml-2 text-primary text-sm">({activeFilters})</span>}
            </h3>
            
            {renderFilters()}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
