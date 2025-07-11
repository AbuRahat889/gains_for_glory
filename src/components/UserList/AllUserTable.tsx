"use client";
import { useGetAllBookingQuery } from "@/redux/api/booking";
import React, { useState } from "react";
import Pagination from "../ui/Pagination";
import { ChevronDownIcon } from "lucide-react";

const options = ["Active", "Block"];

const AllUserTable = () => {
  // const itemsPerPage = 15; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetAllBookingQuery({
    page: currentPage,
    limit: 10,
  });

  const totalPages = data?.data?.meta?.totalPage || 1;
  const currentItems = data?.data?.data || [];

  const [dropdownStates, setDropdownStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [statusMap, setStatusMap] = useState<{ [key: string]: string }>({});

  const toggleDropdown = (id: string) => {
    setDropdownStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelect = (id: string, value: string) => {
    setStatusMap((prev) => ({
      ...prev,
      [id]: value,
    }));
    setDropdownStates((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  return (
    <div className=" bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className=" text-secondaryColor text-left text-base font-medium ">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Location</th>
              <th className="py-2 px-4 ">Subscription</th>
              <th className="py-2 px-4 ">Point</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="border-t border-[#D1D5DB] text-sm text-[#4B5563] text-center animate-pulse">
                <td className="py-2 px-4">
                  <div className="h-4 w-4 bg-gray-300 rounded"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 w-28 bg-gray-300 rounded"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 w-8 bg-gray-300 rounded mx-auto"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-6 w-24 bg-gray-300 rounded mx-auto"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 w-16 bg-gray-300 rounded mx-auto"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-5 w-5 bg-gray-300 rounded-full mx-auto"></div>
                </td>
              </tr>
            ) : (
              currentItems?.map((info: any, index: number) => (
                <tr
                  key={info?.id}
                  className="border-t border-[#D1D5DB] text-base text-textColor font-medium"
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{info?.service}</td>
                  <td className="py-2 px-4">
                    {info?.user?.firstName} {info?.user?.lastName}
                  </td>
                  <td className="py-2 px-4">{info?.user?.phoneNumber}</td>

                  <td className="py-2 px-4">{info?.totalAmount}</td>
                  <td className="py-2 px-4 ">10</td>

                  <td className="py-2 px-4">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() => toggleDropdown(info.id)}
                        className={`flex items-center gap-1 px-4 py-1.5 rounded-full ${
                          (statusMap[info.id] || info.status) === "Active"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        } font-medium text-sm focus:outline-none`}
                      >
                        {statusMap[info.id] || info.status || "Active"}
                        <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                      </button>

                      {dropdownStates[info.id] && (
                        <div className="absolute mt-2 w-28 rounded-md bg-white shadow-lg z-50">
                          <div className="py-1">
                            {options.map((option) => (
                              <button
                                key={option}
                                onClick={() => handleSelect(info.id, option)}
                                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AllUserTable;
