"use client";

import React, { useState } from "react";
import MerchandiseProduct from "./MerchandiseProduct";
import SupplementsProduct from "./SupplementsProduct";

export default function ProductUploadForm() {
  const [selectedType, setSelectedType] = useState<
    "merchandise" | "supplements"
  >("merchandise");

  return (
    <div className="max-w-6xl p-6 bg-white min-h-screen">
      <h1 className="text-xl font-semibold mb-6 text-gray-900">
        Upload New Product
      </h1>

      {/* Selector Buttons */}
      <div className="flex gap-40">
        {/* Merchandise Button */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="">
            <button
              onClick={() => setSelectedType("merchandise")}
              className={`w-8 h-8 rounded-[2px] border-2 transition-all duration-200 border-orange-500 flex justify-center items-center`}
              aria-label="Supplements"
            >
              <div
                className={` h-6 w-6   ${
                  selectedType === "merchandise" ? "bg-orange-500" : "bg-white"
                }
              `}
              ></div>
            </button>
          </div>
          <span className="text-base font-medium text-primaryColor leading-normal">
            Merchandise Product
          </span>
        </div>
        {/* Supplements Button */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="">
            <button
              onClick={() => setSelectedType("supplements")}
              className={`w-8 h-8 rounded-[2px] border-2 transition-all duration-200 border-orange-500 flex justify-center items-center`}
              aria-label="Supplements"
            >
              <div
                className={` h-6 w-6   ${
                  selectedType === "supplements" ? "bg-orange-500" : "bg-white"
                }
              `}
              ></div>
            </button>
          </div>
          <span className="text-base font-medium text-primaryColor leading-normal">
            Supplements Product
          </span>
        </div>
      </div>

      {/* Conditionally render sections */}
      {selectedType === "merchandise" && <MerchandiseProduct />}
      {selectedType === "supplements" && <SupplementsProduct />}
    </div>
  );
}
