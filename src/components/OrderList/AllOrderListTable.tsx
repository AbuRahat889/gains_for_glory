"use client";
import React, { useState } from "react";
import Pagination from "../ui/Pagination";
import { ChevronDownIcon } from "lucide-react";
import {
  useGetAllorderQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/api/orderApi";
import DetailsModal from "./DetailsModal";

const options = [
  { value: "Pending", key: "PENDING" },
  { value: "Completed", key: "COMPLETED" },
];

const AllOrderListTable = ({ status }: { status: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  // const itemsPerPage = 15; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setId] = useState<string | null>(null);

  const { data, isLoading } = useGetAllorderQuery({
    status: status,
    page: currentPage,
    limit: 10,
  });

  const totalPages = data?.data?.meta?.totalPages || 1;
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

  const [updateOrderStatus] = useUpdateOrderStatusMutation({});
  const handleSelect = async (id: string, value: string) => {
    console.log(id, value);
    setStatusMap((prev) => ({
      ...prev,
      [id]: value,
    }));
    setDropdownStates((prev) => ({
      ...prev,
      [id]: false,
    }));

    try {
      const response = await updateOrderStatus({ id, orderStatus: value });
      console.log("User status updated:", response);
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleModal = (id: string) => {
    setIsOpen(true);
    setId(id);
    console.log(id);
  };

  return (
    <div className=" bg-white">
      <div className="overflow-x-auto ">
        <table className="w-full min-w-[640px] ">
          <thead>
            <tr className=" text-secondaryColor text-left text-sm md:text-base font-medium ">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Location</th>
              <th className="py-2 px-4 ">Phone Number</th>
              <th className="py-2 px-4">View</th>
              <th className="py-2 px-4 ">Status</th>
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
                  className="border-t border-[#D1D5DB] text-sm md:text-base text-textColor font-medium "
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{info?.user?.name}</td>
                  <td className="py-2 px-4">{info?.user?.email || "N/A"}</td>
                  <td className="py-2 px-4">{info?.user?.location || "N/A"}</td>
                  <td className="py-2 px-4">{info?.number}</td>
                  <td className="py-2 px-4 ">
                    <h1
                      onClick={() => handleModal(info?.id)}
                      className={`py-1 rounded font-semibold text-white text-center cursor-pointer w-16 md:w-32 text-sm md:text-base  bg-[#7b61ff] `}
                    >
                      View Details
                    </h1>
                  </td>

                  <td className="py-2 px-4">
                    <div className="relative inline-block text-left ">
                      {(() => {
                        const currentStatus =
                          statusMap[info.id] ?? info.orderStatus;

                        return (
                          <>
                            <button
                              onClick={() => toggleDropdown(info.id)}
                              className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm md:text-base font-medium focus:outline-none ${
                                currentStatus === "COMPLETED"
                                  ? "bg-green-50 text-green-600"
                                  : "bg-red-50 text-red-600"
                              }`}
                            >
                              {currentStatus === "COMPLETED"
                                ? "Completed"
                                : "Pending"}
                              <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                            </button>

                            {dropdownStates[info.id] && (
                              <div className="absolute mt-2 w-28 rounded-md bg-white shadow-lg z-[999]">
                                <div className="py-1">
                                  {options.map((option) => (
                                    <button
                                      key={option.key}
                                      onClick={() =>
                                        handleSelect(info.id, option.key)
                                      }
                                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                    >
                                      {option.value}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </td>
                  <DetailsModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    orderInfo={currentItems.find((item: any) => item.id === id)}
                  />
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

export default AllOrderListTable;
