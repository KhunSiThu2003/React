import React from 'react';
import CategorySection from "./components/CategorySection";
import Header from "./components/Header";
import ProductSection from "./components/ProductSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <CategorySection />
        <ProductSection />
      </main>
      <Footer />
    </div>
  );
}
