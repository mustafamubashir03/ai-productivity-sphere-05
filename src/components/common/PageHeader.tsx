
interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          {title}
        </h1>
        {description && (
          <p className="text-gray-600 max-w-3xl">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
