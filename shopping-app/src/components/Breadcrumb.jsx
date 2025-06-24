import { Link } from "react-router-dom";

const BreadCrumb = ({ currentPageTitle }) => {
  return (
    <nav className="w-full flex items-center my-8" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-orange-500 transition-colors font-medium"
          >
            Home
          </Link>
        </li>
        <li>
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </li>
        <li>
          <span className="text-orange-600 font-semibold">{currentPageTitle}</span>
        </li>
      </ol>
    </nav>
  );
};

export default BreadCrumb;
