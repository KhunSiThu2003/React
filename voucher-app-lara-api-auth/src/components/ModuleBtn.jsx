import React from "react";
import { Link } from "react-router-dom";

const ModuleBtn = ({ name, icon, url, description }) => {
  return (
    <Link
      to={url}
      className="group flex flex-col gap-4 items-center bg-white text-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="p-4 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors duration-300">
        {icon}
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
          {name}
        </h3>
        {description && (
          <p className="text-sm text-gray-600 mt-1 group-hover:text-blue-600 transition-colors duration-300">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
};

export default ModuleBtn;
