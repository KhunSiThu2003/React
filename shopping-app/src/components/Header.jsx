import React from "react";
import { Container } from "./Container";
import { Link } from "react-router-dom";
import useCartStore from "../store/useCartStore";

const Header = () => {
  const { carts } = useCartStore();
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg backdrop-blur-sm">
      <Container>
        <div className="flex justify-between items-center py-5">
          <Link 
            to={"/"} 
            className="flex items-center gap-2 group"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-white group-hover:text-orange-100 transition-colors duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
              />
            </svg>
            <span className="text-2xl font-bold text-white group-hover:text-orange-100 transition-colors duration-300">
              Online Shop
            </span>
          </Link>
          <Link 
            to={"/my-cart"} 
            className="group relative flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            <span className="font-medium">My Cart</span>
            <span className="absolute -top-2 -right-2 bg-white text-orange-500 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm transform group-hover:scale-110 transition-transform duration-300">
              {carts.length}
            </span>
          </Link>
        </div>
      </Container>
    </header>
  );
};

export default Header;
