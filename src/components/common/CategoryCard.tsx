
import { Link } from "react-router-dom";
import { Folder } from "lucide-react"; // Import Lucide icon for fallback

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link 
      to={`/tools/category/${category.slug}`} 
      className="group bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 flex flex-col items-center text-center gap-3 card-hover"
    >
      <div className="w-16 h-16 rounded-full bg-accent dark:bg-gray-700 flex items-center justify-center mb-2 transition-transform group-hover:scale-110 duration-300">
        {category.icon ? (
          <img
            src={category.icon}
            alt={category.name}
            className="w-8 h-8 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              // If the icon fails to load, show a Lucide icon instead
              const iconElement = document.createElement('div');
              iconElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-gray-600 dark:text-gray-300"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path></svg>';
              const parent = target.parentNode;
              if (parent) {
                parent.replaceChild(iconElement.firstChild!, target);
              }
            }}
          />
        ) : (
          <Folder className="w-8 h-8 text-gray-600 dark:text-gray-300" />
        )}
      </div>
      <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors">
        {category.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{category.description}</p>
    </Link>
  );
};

export default CategoryCard;
