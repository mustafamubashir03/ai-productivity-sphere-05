
import { Button } from "@/components/ui/button";
import { useCases } from "@/data/useCases";

interface UseCaseFilterProps {
  onSelectUseCase: (useCaseSlug: string | null) => void;
  activeUseCase: string | null;
}

const UseCaseFilter = ({ onSelectUseCase, activeUseCase }: UseCaseFilterProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-3 text-center dark:text-white">Filter by Use Case</h3>
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          key="all-use-cases"
          variant={activeUseCase === null ? "default" : "outline"}
          onClick={() => onSelectUseCase(null)}
          size="sm"
          className="mb-2 dark:border-gray-700 dark:text-gray-200"
        >
          All Use Cases
        </Button>
        {useCases.map((useCase) => (
          <Button
            key={useCase.id}
            variant={activeUseCase === useCase.slug ? "default" : "outline"}
            onClick={() => onSelectUseCase(useCase.slug)}
            size="sm"
            className="mb-2 dark:border-gray-700 dark:text-gray-200"
          >
            {useCase.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default UseCaseFilter;
