import SupplementsProduct from "@/components/MyProduct/SupplementsProduct";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen bg-white mt-32">
      <div className="bg-white border my-6 px-5 rounded-sm">
        <div className="max-w-6xl p-0 md:p-6 bg-white min-h-screen">
          <h1 className="text-xl font-semibold mb-6 text-gray-900">
            Edit Product
          </h1>

          {/* Selector Buttons */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="">
              <button
                className={`w-5 md:w-8  h-5 md:h-8 rounded-[2px] border-2 transition-all duration-200 border-orange-500 flex justify-center items-center`}
                aria-label="Supplements"
              >
                <div className={` h-3 w-3 md:h-6 md:w-6  bg-orange-500 `}></div>
              </button>
            </div>
            <span className="text-base font-medium text-primaryColor leading-normal">
              Supplements Product
            </span>
          </div>

          <SupplementsProduct />
        </div>
      </div>
    </div>
  );
}
