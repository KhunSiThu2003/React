import React from "react";
import CartSection from "../components/CartSection";
import { Container } from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";

const MyCart = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
      <Container>
        <div className="mb-8">
          <BreadCrumb currentPageTitle="My Cart" />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Shopping Cart</h1>
          <p className="text-gray-500 mt-2">Review your items and proceed to checkout</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100">
          <CartSection />
        </div>
      </Container>
    </div>
  );
};

export default MyCart;
