
import { Link } from "react-router-dom";
import { Folder } from "lucide-react"; // Import Lucide icon for fallback
import { CategoryWithIcon, matchCategory } from "@/data/categories";

interface CategoryCardProps {
  category: CategoryWithIcon;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  // Get the icon component from the category or fallback to Folder
  const IconComponent = category.LucideIcon || Folder;
  
  return (
    <Link 
      to={`/tools/category/${category.slug}`} 
      className="group bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 flex flex-col items-center text-center gap-3 card-hover"
    >
      <div className="w-16 h-16 rounded-full bg-accent dark:bg-gray-700 flex items-center justify-center mb-2 transition-transform group-hover:scale-110 duration-300">
        <IconComponent className="w-8 h-8 text-primary" />
      </div>
      <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors">
        {category.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{category.description}</p>
    </Link>
  );
};

export default CategoryCard;
