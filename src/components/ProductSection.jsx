import React from "react";
import ProductCard from "./ProductCard";
import { Container } from "./Container";
import useProductStore from "../store/useProductStore";

const ProductSection = () => {
  const { getFilteredProducts } = useProductStore();
  const filteredProducts = getFilteredProducts();

  return (
    <section className="py-12 px-5 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Available Products</h2>
          <p className="text-sm text-orange-500 font-medium">Discover our latest collection</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ProductSection;
