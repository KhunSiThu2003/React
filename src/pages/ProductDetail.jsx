import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "../components/Container";
import Rating from "../components/Rating";
import BreadCrumb from "../components/BreadCrumb";
import useProductStore from "../store/useProductStore";
import useCartStore from "../store/useCartStore";
import Swal from 'sweetalert2';

const ProductDetail = () => {
  const { productId } = useParams();
  const { products } = useProductStore();
  const { carts, addCart } = useCartStore();
  const currentProduct = products.find((product) => product.id == productId);
  const isInCart = carts.find((cart) => cart.productId == productId);

  const handleAddToCart = () => {
    const newCart = {
      id: Date.now(),
      productId: currentProduct.id,
      quantity: 1,
    };
    addCart(newCart);
    
    Swal.fire({
      title: 'Added to Cart!',
      text: `${currentProduct.title} has been added to your cart.`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
      customClass: {
        popup: 'colored-toast'
      }
    });
  };

  return (
    <div className="min-h-screen">
      <Container>
        <BreadCrumb currentPageTitle="Product Detail" />
        <div className="border border-orange-200 rounded-2xl p-6 sm:p-10 hover:border-orange-500 transition-colors bg-white shadow-lg mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            <div className="flex flex-col items-center justify-center">
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-4 sm:p-6 shadow-inner w-full flex justify-center">
                <img
                  src={currentProduct.image}
                  className="w-2/3 h-64 sm:h-80 object-contain transition-transform duration-300 hover:scale-105"
                  alt={currentProduct.title}
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 sm:gap-6">
              <h3 className="text-2xl sm:text-4xl font-extrabold text-gray-900">
                {currentProduct.title}
              </h3>
              <p className="bg-orange-100 text-orange-700 font-medium px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm shadow">
                {currentProduct.category}
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                {currentProduct.description}
              </p>
              <div className="flex items-center gap-4">
                <Rating rate={currentProduct.rating.rate} />
                <span className="text-gray-500 text-sm">
                  ({currentProduct.rating.count} reviews)
                </span>
              </div>
              <div className="flex flex-wrap justify-between w-full items-center gap-4 mt-4">
                <div>
                  <span className="text-sm text-gray-500 block">Price</span>
                  <p className="text-2xl sm:text-3xl text-orange-500 font-bold">
                    ${currentProduct.price}
                  </p>
                </div>
                {isInCart ? (
                  <button
                    className="text-sm sm:text-base bg-orange-500 text-white px-6 py-2 rounded-lg cursor-not-allowed opacity-80 font-medium flex items-center gap-2"
                    disabled
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Added to Cart
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="text-sm sm:text-base bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm hover:shadow-md flex items-center gap-2 group-hover:scale-105 transform transition-transform"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetail;
