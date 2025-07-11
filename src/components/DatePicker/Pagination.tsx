// components/Pagination.tsx
import React from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";

import { Button } from "../ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const goToPreviousPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center items-center p-6 border-t">
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          onClick={goToPreviousPage}
          // disabled={currentPage === totalPages}
          className="h-11 w-8 "
        >
          <MdOutlineArrowBackIosNew className="size-10 text-[#7B61FF]" />
        </Button>
        {/* <Button
          variant="ghost"
          onClick={goToPreviousPage}
          // disabled={currentPage === 1}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button> */}

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (page) =>
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
          )
          .map((page, index, array) => (
            <React.Fragment key={page}>
              {index > 0 && array[index - 1] !== page - 1 && (
                <span className="px-2">...</span>
              )}
              <Button
                variant={currentPage === page ? "default" : "ghost"}
                onClick={() => onPageChange(page)}
                className={`h-11 w-8 flex items-center ${
                  currentPage === page
                    ? "border-2 border-[#7B61FF] bg-white text-black"
                    : "border-2 border-[#D9D9D9] bg-white text-black"
                }`}
              >
                {page}
              </Button>
            </React.Fragment>
          ))}

        <Button
          variant="ghost"
          onClick={goToNextPage}
          // disabled={currentPage === totalPages}
          className="h-11 w-8 "
        >
          <MdOutlineArrowForwardIos className="size-10 text-[#7B61FF]" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
