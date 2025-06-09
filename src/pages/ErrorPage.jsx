import React from "react";
import { Container } from "../components/Container";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center">
      <Container>
        <div className="text-center">
          <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
          <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
          <Link
            to="/"
            className="inline-block border border-orange-500 text-orange-500 px-6 py-2 hover:bg-orange-500 hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default ErrorPage;
