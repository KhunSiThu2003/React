import React from "react";
import { Container } from "./Container";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 border-t-4 border-orange-500">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold mb-4">Online Shop</h3>
            <p className="text-sm leading-relaxed">
              Your one-stop destination for all your shopping needs. Quality products, great prices, and excellent service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-orange-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm hover:text-orange-400 transition-colors duration-200">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/my-cart" className="text-sm hover:text-orange-400 transition-colors duration-200">
                  My Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-sm hover:text-orange-400 transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm hover:text-orange-400 transition-colors duration-200">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm hover:text-orange-400 transition-colors duration-200">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to get special offers and updates</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-orange-500 focus:outline-none text-sm"
              />
              <button
                type="submit"
                className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-center md:text-left">
              © {new Date().getFullYear()} Online Shop. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm hover:text-orange-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-sm hover:text-orange-400 transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 