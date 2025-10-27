import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const Pagination = ({
  links: { prev, next },
  meta: { total, to, from, links },
  updateFetchUrl,
}) => {
  const handleNextBtn = async () => {
    updateFetchUrl(next);
  };

  const handlePrevBtn = async () => {
    updateFetchUrl(prev);
  };

  return (
    <div className="flex justify-between items-center px-6">
      {/* Help text */}
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing <b>{from}</b> to <b>{to}</b> of <b>{total}</b> Entries
      </span>
      {/* Buttons */}
      <div className="inline-flex mt-2 xs:mt-0">
        {links.map((link) => {
          const isActive = link.active === true || link.active === "true"; // ensure boolean check

          return (
            <button
              key={link.label}
              disabled={!link.url}
              onClick={() => updateFetchUrl(link.url)}
              className={`flex items-center justify-center px-4 py-2 text-sm font-medium border border-gray-200 rounded-none first:rounded-l last:rounded-r
        ${
          isActive
            ? "bg-blue-500 text-white"
            : "bg-white text-stone-900 hover:bg-gray-100 hover:text-blue-700"
        }
        dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
        disabled:opacity-50 disabled:pointer-events-none
      `}
            >
              {link.label.includes("&laquo;") ? (
                <HiChevronLeft className="text-lg" />
              ) : link.label.includes("&raquo;") ? (
                <HiChevronRight className="text-lg" />
              ) : (
                link.label
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;
