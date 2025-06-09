import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import useCartStore from "../store/useCartStore";
import Swal from 'sweetalert2';

const ProductCard = ({
  product: {
    id,
    title,
    price,
    image,
    rating: { rate },
  },
}) => {
  const { carts, addCart } = useCartStore();
  const isInCart = carts.find((cart) => cart.productId === id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    const newCart = {
      id: Date.now(),
      productId: id,
      quantity: 1,
    };
    addCart(newCart);
    
    Swal.fire({
      title: 'Added to Cart!',
      text: `${title} has been added to your cart.`,
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
    <Link
      to={`/product-detail/${id}`}
      className="group grid grid-rows-[auto_1fr] bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200 h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6">
        <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/5 transition-colors duration-300" />
        <img
          src={image}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
          alt={title}
        />
        {isInCart && (
          <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-orange-500 text-white text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-md font-medium flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            In Cart
          </span>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-col p-4 sm:p-5">
        <div className="flex-grow">
          <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-orange-500 transition-colors duration-200 text-sm sm:text-base">
            {title}
          </h3>
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Rating rate={rate} />
            <span className="text-xs text-gray-400">({rate})</span>
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-2 mt-auto">
          <div className="flex-grow min-w-[100px]">
            <span className="text-xs sm:text-sm text-gray-500 block">Price</span>
            <p className="text-lg sm:text-xl font-bold text-orange-500">${price}</p>
          </div>
          {isInCart ? (
            <button
              className="text-xs sm:text-sm bg-orange-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg cursor-not-allowed opacity-80 font-medium flex items-center gap-1 sm:gap-2 whitespace-nowrap"
              disabled
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Added
            </button>
          ) : (
            <button
              className="text-xs sm:text-sm bg-orange-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium shadow-sm hover:shadow-md flex items-center gap-1 sm:gap-2 group-hover:scale-105 transform transition-transform whitespace-nowrap"
              onClick={handleAddToCart}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
