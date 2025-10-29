// ModuleButton.jsx
import { Link } from "react-router-dom";

const ModuleButton = ({ name, description, icon, url, color = "from-blue-500 to-blue-600" }) => {
  return (
    <Link
      to={url}
      className={`group relative flex flex-col gap-4 items-center text-white p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br ${color} overflow-hidden`}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300"></div>
      
      {/* Icon container */}
      <div className="relative z-10 p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
        {icon}
      </div>
      
      {/* Text content */}
      <div className="relative z-10 text-center">
        <h3 className="font-bold text-lg mb-1">{name}</h3>
        <p className="text-white/90 text-sm font-medium">{description}</p>
      </div>
      
      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </Link>
  );
};

export default ModuleButton;