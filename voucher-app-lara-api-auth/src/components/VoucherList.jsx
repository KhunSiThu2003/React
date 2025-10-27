import React, { useRef, useState } from "react";
import { HiChevronUp, HiSearch } from "react-icons/hi";
import { HiComputerDesktop, HiChevronDown } from "react-icons/hi2";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import VoucherListRow from "./VoucherListRow";
import useSWR from "swr";
import { debounce, throttle } from "lodash";
import Pagination from "./Pagination";
import useCookie from "react-use-cookie";

const VoucherList = () => {
  const location = useLocation();
  const [params, setParams] = useSearchParams();

  const [fetchUrl, setFetchUrl] = useState(
    import.meta.env.VITE_API_URL + "/vouchers" + location.search
  );

  const [sortDirectionByTotal, setSortDirectionByTotal] = useState("desc");
  const [sortDirectionById, setSortDirectionById] = useState("desc");

  const [token] = useCookie("my_token");

  const fetcher = (url) =>
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

  const { data, isLoading, error } = useSWR(fetchUrl, fetcher);

  const handleSearch = debounce((e) => {
    if (e.target.value) {
      setParams({ q: e.target.value });
      setFetchUrl(
        `${import.meta.env.VITE_API_URL}/vouchers?q=${e.target.value}`
      );
    } else {
      setParams({});
      setFetchUrl(`${import.meta.env.VITE_API_URL}/vouchers`);
    }
  }, 500);

  const handleSortById = () => {
    const newDirection = sortDirectionById === "asc" ? "desc" : "asc";
    setSortDirectionById(newDirection);

    // example: updateFetchUrl or API call
    updateFetchUrl(
      `https://invoice-app-api.mms-it.com/api/v1/vouchers?sort_by=id&sort_direction=${newDirection}&limit=5&page=1`
    );
  };

    const handleSortByTotal = () => {
    const newDirection = sortDirectionByTotal === "asc" ? "desc" : "asc";
    setSortDirectionByTotal(newDirection);

    // example: updateFetchUrl or API call
    updateFetchUrl(
      `https://invoice-app-api.mms-it.com/api/v1/vouchers?sort_by=total&sort_direction=${newDirection}&limit=5&page=1`
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
              onChange={handleSearch}
              className="bg-gray-50 border border-gray-300 text-stone-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Voucher"
            />
          </div>
        </div>
        <div className="">
          <Link
            to={"/dashboard/sale"}
            className="text-white flex justify-center items-center gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Sale
            <HiComputerDesktop />
          </Link>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-stone-500 dark:text-stone-400">
          <thead className="text-xs text-stone-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-stone-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer select-none"
                onClick={() => handleSortById()}

              >
                <div className="flex items-center gap-1">
                  <span>#</span>
                  {sortDirectionById === "asc" ? (
                    <HiChevronUp className="text-gray-500" />
                  ) : (
                    <HiChevronDown className="text-gray-500" />
                  )}
                </div>
              </th>

              <th scope="col" className="px-6 py-3">
                Voucher ID
              </th>

              <th scope="col" className="px-6 py-3">
                Customer
              </th>

                          <th
                scope="col"
                className="px-6 py-3 cursor-pointer select-none"
                onClick={() => handleSortByTotal()}

              >
                <div className="flex items-center gap-1">
                  <span>Total</span>
                  {sortDirectionByTotal === "asc" ? (
                    <HiChevronUp className="text-gray-500" />
                  ) : (
                    <HiChevronDown className="text-gray-500" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Created At
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hidden last:table-row">
              <td colSpan={5} className="px-6 py-4 text-center">
                There is no Voucher
              </td>
            </tr>
            {isLoading ? (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hidden last:table-row">
                <td colSpan={5} className="px-6 py-4 text-center">
                  Loading ...
                </td>
              </tr>
            ) : (
              data?.data?.map((voucher, index) => (
                <VoucherListRow key={voucher.id} voucher={voucher} />
              ))
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && data?.links && data?.meta && (
        <Pagination
          links={data.links}
          meta={data.meta}
          updateFetchUrl={updateFetchUrl}
        />
      )}
    </div>
  );
};

export default VoucherList;
