import { create } from "zustand";

const useCategoryStore = create((set) => ({
    categories: [
        { id: 1, name: "All", isActive: true },
        { id: 2, name: "Electronics", isActive: false },
        { id: 3, name: "Jewelery", isActive: false },
        { id: 4, name: "Men's clothing", isActive: false },
        { id: 5, name: "Women's clothing", isActive: false }
    ],

    setActiveCategory: (categoryId) => set((state) => ({
        categories: state.categories.map((category) =>
            category.id === categoryId
                ? { ...category, isActive: true }
                : { ...category, isActive: false }
        )
    }  )),
}));

export default useCategoryStore;