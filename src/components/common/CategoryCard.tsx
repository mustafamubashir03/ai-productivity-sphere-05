
import { Link } from "react-router-dom";

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
      className="group bg-white rounded-lg shadow-md p-5 flex flex-col items-center text-center gap-3 card-hover"
    >
      <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-2">
        <img
          src={category.icon}
          alt={category.name}
          className="w-8 h-8 object-contain"
        />
      </div>
      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
        {category.name}
      </h3>
      <p className="text-gray-600 text-sm">{category.description}</p>
    </Link>
  );
};

export default CategoryCard;
