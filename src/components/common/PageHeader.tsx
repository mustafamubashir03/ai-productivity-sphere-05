
interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3 animate-fade-in">
          {title}
        </h1>
        {description && (
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl animate-fade-in" style={{animationDelay: "0.2s"}}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
