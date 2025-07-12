import Image from "next/image";
import { Button } from "@/components/ui/button";
import deleteIcon from "@/assets/icon/delete.svg";
import shirt from "@/assets/lemon.png";

export default function ProductCard() {
  return (
    <div className="w-full md:w-80 rounded-2xl  overflow-hidden">
      {/* Product Image Container */}
      <div className="relative bg-gray-100">
        {/* Heart Icon */}
        <button className="absolute top-4 right-4">
          <Image
            src={deleteIcon}
            alt="Green Hoodie Mockup"
            width={20}
            height={20}
            className="object-contain"
          />
        </button>

        {/* Product Image */}
        <div className="flex justify-center w-full">
          <Image
            src={shirt}
            alt="Green Hoodie Mockup"
            width={800}
            height={800}
            className="object-cover"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="py-6">
        {/* Product Title and Price */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-4">
          <h3 className="text-sm md:text-lg font-bold text-primaryColor">
            Fitness T- Shirt
          </h3>
          <span className="text-xl font-semibold text-[#7B61FF]">$6.00</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-3 mt-6">
          <Button
            variant="outline"
            className="flex-1 text-primaryColor border-2 border-primaryColor py-2 md:py-5 text-base font-semibold rounded-2xl"
          >
            Edit
          </Button>
          <Button className="flex-1 bg-orange-500 border-2 border-primaryColor py-2 md:py-5 text-base font-semibold rounded-2xl">
            Order list
          </Button>
        </div>
      </div>
    </div>
  );
}
