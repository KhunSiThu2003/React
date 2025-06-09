import CategoryButton from "./CategoryButton";
import { Container } from "./Container";
import useCategoryStore from "../store/useCategoryStore";

const CategorySection = () => {
  const { categories } = useCategoryStore();

  return (
    <section className="py-10 bg-white/50 backdrop-blur-sm">
      <Container>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Product Categories</h2>
            <p className="text-sm text-gray-500">Browse our wide range of products</p>
          </div>
        </div>
        <div className="relative">
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-transparent">
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                categoryId={category.id}
                categoryName={category.name}
                current={category.isActive}
              />
            ))}
          </div>
          {/* Gradient fade effect for scroll */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/50 to-transparent pointer-events-none"></div>
        </div>
      </Container>
    </section>
  );
};

export default CategorySection;
