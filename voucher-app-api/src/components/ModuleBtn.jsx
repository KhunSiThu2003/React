import React from "react";
import { Link } from "react-router-dom";

const ModuleBtn = ({ name, icon, url }) => {
  return (
    <Link
      to={url}
      className="group relative flex h-full flex-col gap-4 items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 hover:from-blue-100 hover:to-indigo-200 text-gray-800 p-6 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50 hover:-translate-y-1"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Icon container with enhanced styling */}
      <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-110">
        <div className="text-white group-hover:text-blue-50 transition-colors duration-300">
          {icon}
        </div>
      </div>
      
      {/* Module name with enhanced typography */}
      <div className="relative z-10 text-center">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
          {name}
        </h3>
        <p className="text-sm text-gray-600 group-hover:text-blue-600 mt-1 transition-colors duration-300">
          Click to access
        </p>
      </div>
      
      {/* Hover indicator */}
      <div className="absolute bottom-2 right-2 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </Link>
  );
};

export default ModuleBtn;
