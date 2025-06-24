import useCategoryStore from "../store/useCategoryStore";
import useProductStore from "../store/useProductStore";

const CategoryButton = ({ categoryName, current, categoryId }) => {
  const { setActiveCategory: setCategoryStoreActive } = useCategoryStore();
  const { setActiveCategory: setProductStoreActive } = useProductStore();

  const handleClick = () => {
    setCategoryStoreActive(categoryId);
    setProductStoreActive(categoryName);
  };

  return (
    <button
      onClick={handleClick}
      className={`${
        current
          ? "bg-orange-500 text-white shadow-md ring-2 ring-orange-300"
          : "bg-white text-orange-500 border border-orange-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300"
      } rounded-lg px-5 py-2.5 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300/50 whitespace-nowrap`}
    >
      {categoryName}
    </button>
  );
};

export default CategoryButton;
