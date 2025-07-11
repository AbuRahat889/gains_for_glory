"use client";

import Button from "@/components/Button";
import CustomerTable from "@/components/Dashboard/CustomerInfo";
import { useGetAllUsersQuery } from "@/redux/api/auth";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { BsJournalText } from "react-icons/bs";
const AllCustomer = () => {
  const itemsPerPage = 10; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 10;

  const { data, isLoading } = useGetAllUsersQuery("");

  const totalPages = Math.ceil(data?.data?.result?.length / itemsPerPage);
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.data?.result?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  return (
    <>
      {/* Header */}
      <div className="p-8 bg-white flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className={`bg-secondary p-4 rounded-full`}>
            <div className={` h-10 w-10 flex items-center justify-center`}>
              <BsJournalText className="h-10 w-10 text-black" />
            </div>
          </div>
          <div>
            <p className="text-[#020202]">All Customer</p>
            <div className="text-2xl font-bold mt-2">
              {isLoading ? (
                <p className="text-2xl h-6 bg-gray-200 rounded w-full"></p>
              ) : (
                `${data?.data?.meta?.total}`
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex justify-between items-center p-6 mt-6 bg-white">
        <h2 className="text-2xl leading-normal font-bold">All Customer</h2>
      </div>

      <CustomerTable currentItems={currentItems} />

      {/* Pagination */}
      <div className="flex justify-end items-center p-6 border-t bg-white">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
            )
            .map((page, index, array) => (
              <div key={index}>
                {index > 0 && array[index - 1] !== page - 1 && (
                  <span key={index} className="px-2">
                    ...
                  </span>
                )}
                <Button
                  key={index}
                  variant={currentPage === page ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => goToPage(page)}
                  className={`h-8 w-8 ${
                    currentPage === page ? "bg-primary text-white" : ""
                  }`}
                >
                  {page}
                </Button>
              </div>
            ))}

          <Button
            variant="ghost"
            size="sm"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default AllCustomer;
