import React from "react";

// react icons
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";
import placeholder from "@/assets/placeholder.webp";

interface SignOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderInfo: {
    country?: string;
    city?: string;
    user?: {
      location?: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
}
const DetailsModal = ({ isOpen, onClose, orderInfo }: SignOutModalProps) => {
  console.log(orderInfo, "asdlfk jaslkdfj laksj ");
  //   const [isOpen, setisOpen] = useState(false);

  return (
    <div
      className={`${
        isOpen ? " visible" : " invisible"
      } w-full h-screen overflow-y-auto fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#0000002a] flex items-center justify-center transition-all duration-300`}
    >
      <div
        className={`${
          isOpen ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
        } w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] dark:bg-slate-800 bg-[#fff] rounded-lg p-4 transition-all duration-300`}
      >
        <div className="w-full flex items-end justify-end">
          <RxCross1
            className="p-2 text-[2.5rem] text-primaryColor dark:hover:bg-slate-900/50 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
            onClick={onClose}
          />
        </div>

        <div className="">
          {/* Product Image Section */}
          <div className="relative bg-gray-100 p-6 rounded-b-lg">
            <div className="flex justify-center">
              <Image
                src={orderInfo?.product?.image?.[0] || placeholder}
                alt={orderInfo?.product?.name || "Product Image"}
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-6">
            {/* Title */}
            <h1 className="text-xl font-semibold text-gray-900">
              {orderInfo?.product?.name || "Product Name"}
            </h1>

            {/* Order Info Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900">Order Info</h2>

              <div className="space-y-4">
                {/* Country */}
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Country</span>
                  <span className="font-medium text-gray-900">
                    {orderInfo?.country}
                  </span>
                </div>

                {/* City */}
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">City</span>
                  <span className="font-medium text-gray-900">
                    {orderInfo?.city}
                  </span>
                </div>

                {/* Address */}
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Address</span>
                  <span className="font-medium text-gray-900">
                    {orderInfo?.user?.location || "N/A"}
                  </span>
                </div>

                {/* Size */}
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Size</span>
                  <span className="font-medium text-gray-900">XL</span>
                </div>

                {/* Quantity */}
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Quantity</span>
                  <span className="font-medium text-gray-900">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
