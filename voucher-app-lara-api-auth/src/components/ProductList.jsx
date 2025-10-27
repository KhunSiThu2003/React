import React, { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { HiPlus, HiChevronUp, HiChevronDown } from "react-icons/hi2";
import useSWR from "swr";
import ProductListSkeletonLoader from "./ProductListSkeletonLoader";
import ProductListEmptyStage from "./ProductListEmptyStage";
import ProductRow from "./ProductRow";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import Pagination from "./Pagination";
import useCookie from "react-use-cookie";

const ProductList = () => {
  const location = useLocation();
  const [params, setParams] = useSearchParams();

  const [token] = useCookie("my_token");

  const [fetchUrl, setFetchUrl] = useState(
    import.meta.env.VITE_API_URL + "/products" + location.search
  );

  const fetcher = (url) =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

  const { data, isLoading, error } = useSWR(fetchUrl, fetcher);

  const handleSearchInput = debounce((e) => {
    if (e.target.value) {
      setParams({ q: e.target.value });
      setFetchUrl(
        `${import.meta.env.VITE_API_URL}/products?q=${e.target.value}`
      );
    } else {
      setParams({});
      setFetchUrl(`${import.meta.env.VITE_API_URL}/products`);
    }
  }, 500);

  const handleSort = (sort, direction) => {
    updateFetchUrl(
      `${
        import.meta.env.VITE_API_URL
      }/products?sort_by=${sort}&sort_direction=${direction}&limit=5&page=1`
    );
  };

  const updateFetchUrl = (url) => {
    const currentURL = new URL(url);
    const searchURL = new URLSearchParams(currentURL.search);

    const paramObject = Object.fromEntries(searchURL);
    setParams(paramObject);

    // Force HTTPS (to avoid CORS redirect)
    let secureUrl = url.replace("http://", "https://");

    setFetchUrl(secureUrl);
  };

  return (
    <div>
      <div className=" flex justify-between mb-3">
        <div className="">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <HiSearch className="w-4 h-4 text-stone-500 dark:text-stone-400" />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-stone-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Product"
              onChange={handleSearchInput}
            />
          </div>
        </div>
        <div className="">
          <Link
            to="/dashboard/product/create"
            className="text-white flex justify-center items-center gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add new Product
            <HiPlus />
          </Link>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
        <table className="w-full text-sm text-left rtl:text-right text-stone-500 dark:text-stone-400">
          <thead className="text-xs text-stone-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-stone-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                <div className="flex items-center space-y-1">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => handleSort("id", "desc")}
                      className="hover:text-blue-600 transition"
                    >
                      <HiChevronUp className="w-4 h-4 text-gray-400 hover:text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleSort("id", "asc")}
                      className="hover:text-blue-600 transition"
                    >
                      <HiChevronDown className="w-4 h-4 text-gray-400 hover:text-blue-600" />
                    </button>
                  </div>
                  <span className="text-gray-900 ml-2 dark:text-gray-200 font-medium">
                    #
                  </span>
                </div>
              </th>

              <th scope="col" className="px-6 py-3">
                Product name
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                <div className="flex items-center space-y-1">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => handleSort("price", "desc")}
                      className="hover:text-blue-600 transition"
                    >
                      <HiChevronUp className="w-4 h-4 text-gray-400 hover:text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleSort("price", "asc")}
                      className="hover:text-blue-600 transition"
                    >
                      <HiChevronDown className="w-4 h-4 text-gray-400 hover:text-blue-600" />
                    </button>
                  </div>
                  <span className="text-gray-900 ml-2 dark:text-gray-200 font-medium">
                    Price
                  </span>
                </div>
              </th>

              <th scope="col" className="px-6 py-3 text-end">
                Created At
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Updated At
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <ProductListSkeletonLoader />
            ) : data?.data?.length === 0 ? (
              <ProductListEmptyStage />
            ) : (
              data?.data?.map((product) => (
                <ProductRow product={product} key={product.id} />
              ))
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && (
        <Pagination
          links={data?.links}
          meta={data?.meta}
          updateFetchUrl={updateFetchUrl}
        />
      )}
    </div>
  );
};

export default ProductList;
