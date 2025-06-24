import React from "react";
import Cart from "./Cart";
import { Container } from "./Container";
import { Link } from "react-router-dom";
import useCartStore from "../store/useCartStore";
import useProductStore from "../store/useProductStore";

const CartSection = () => {
  const { carts } = useCartStore();
  const { products } = useProductStore();

  const cartProducts = carts.map((cart) => {
    const product = products.find((p) => p.id === cart.productId);
    return {
      ...cart,
      product: product ? { ...product, quantity: cart.quantity } : null,
    };
  });

  // Calculate totals
  const total = cartProducts.reduce(
    (sum, cart) =>
      cart.product ? sum + cart.product.price * cart.product.quantity : sum,
    0
  );
  const tax = total * 0.1;
  const netTotal = total + tax;

  return (
    <div className="flex flex-col min-h-[60vh]">
      <div className="flex-grow p-6">
        {cartProducts.length > 0 ? (
          <div className="space-y-6">
            {cartProducts.map((cart) => (
              <Cart key={cart.id} cart={cart} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-6 py-12">
            <div className="w-48 h-48 relative">
              <img 
                className="w-full h-full object-contain animate-bounce" 
                src="https://static.vecteezy.com/system/resources/previews/009/339/337/non_2x/red-shopping-cart-free-png.png" 
                alt="Empty cart" 
              />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors shadow-sm hover:shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>

      {cartProducts.length > 0 && (
        <div className="border-t border-orange-100 bg-gray-50/50 backdrop-blur-sm">
          <Container>
            <div className="p-6">
              <div className="flex flex-wrap justify-end gap-8 mb-6">
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                  <p className="text-lg font-semibold text-gray-800">${total.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Tax (10%)</p>
                  <p className="text-lg font-semibold text-gray-800">${tax.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Total</p>
                  <p className="text-2xl font-bold text-orange-500">${netTotal.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Continue Shopping
                </Link>
                <Link
                  to="/checkout"
                  className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors shadow-sm hover:shadow-md"
                >
                  Proceed to Checkout
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};

export default CartSection;
