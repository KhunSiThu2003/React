import React from "react";
import useCartStore from "../store/useCartStore";
import Swal from 'sweetalert2';

const Cart = ({ cart }) => {
  const handleIncrease = () => {
    useCartStore.getState().increaseQuantity(cart.id);
  };

  const handleDecrease = () => {
    if (cart.quantity > 1) {
      useCartStore.getState().decreaseQuantity(cart.id);
    } else if (cart.quantity === 1) {
      showRemoveConfirmation();
    }
  };

  const handleRemove = () => {
    useCartStore.getState().removeCart(cart.id);
    Swal.fire({
      title: 'Removed!',
      text: 'Item has been removed from your cart.',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
      position: 'top-end',
      toast: true
    });
  };

  const showRemoveConfirmation = () => {
    Swal.fire({
      title: 'Remove Item?',
      text: "Are you sure you want to remove this item from your cart?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f97316',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        handleRemove();
      }
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl shadow-xl p-8 mb-8 border border-orange-200 hover:shadow-2xl transition-shadow duration-200">
      <div className="flex items-center gap-6 flex-1 w-full md:w-auto mb-6 md:mb-0">
        <img
          src={cart.product.image}
          className="h-20 w-20 p-1 object-contain rounded-xl border border-orange-100 shadow"
          alt={cart.product.title}
        />
        <div>
          <p className="font-bold text-lg mb-1 text-gray-900">{cart.product.title}</p>
          <p className="text-orange-500 font-semibold text-base">Price: ${cart.product.price}</p>
        </div>
      </div>
      <div className="flex flex-col items-center mx-6">
        <span className="text-gray-400 text-xs mb-1 tracking-wider">Qty</span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrease}
            className="bg-orange-100 text-orange-500 rounded-full w-8 h-8 flex items-center justify-center hover:bg-orange-200 transition-colors text-lg font-bold shadow-sm"
          >
            -
          </button>
          <span className="text-lg font-semibold px-2">{cart.quantity}</span>
          <button
            onClick={handleIncrease}
            className="bg-orange-100 text-orange-500 rounded-full w-8 h-8 flex items-center justify-center hover:bg-orange-200 transition-colors text-lg font-bold shadow-sm"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end min-w-[100px]">
        <span className="text-gray-300 text-xs uppercase tracking-wider">Total</span>
        <span className="text-xl font-bold text-orange-600">
          ${cart.product.price * cart.quantity}
        </span>
      </div>
    </div>
  );
};

export default Cart;
