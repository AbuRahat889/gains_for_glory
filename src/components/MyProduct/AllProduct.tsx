import React from "react";
import ProductCard from "./ProductCard";

export default function AllProduct() {
  return (
    <div className="min-h-screen mt-5">
      <ProductCard />
    </div>
  );
}

// {isMerchandiseSelected && (
//           <div className="space-y-3 border-t pt-4">
//             <div className="flex items-center justify-between">
//               <h1 className="text-sm font-medium text-gray-700">Size</h1>
//               <button
//                 type="button"
//                 className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
//               >
//                 <Link className="w-4 h-4 mr-1" />
//                 Size Guide
//               </button>
//             </div>

//             <div className="flex gap-2 flex-wrap">
//               {sizes.map((size) => (
//                 <button
//                   key={size}
//                   type="button"
//                   onClick={() => handleSizeToggle(size)}
//                   className={`px-4 py-2 text-sm font-medium rounded-md border transition-all duration-200 ${
//                     selectedSizes.includes(size)
//                       ? "bg-orange-500 text-white border-orange-500 shadow-sm"
//                       : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>

//             {selectedSizes.length > 0 && (
//               <p className="text-xs text-gray-500">
//                 Selected sizes: {selectedSizes.join(", ")}
//               </p>
//             )}
//           </div>
//         )}
