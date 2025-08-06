import Image from "next/image";
import { Button } from "@/components/ui/button";
import shirt from "@/assets/lemon.png";
import { useDeleteProductMutation } from "@/redux/api/productApi";
import Swal from "sweetalert2";
import Link from "next/link";

type Product = {
  id: string;
  image?: string[];
  name?: string;
  price?: number | string;
  category: string;
  // Add other fields as needed
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  console.log(product);
  const [deleteFN] = useDeleteProductMutation();
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteFN(id);
        if (res?.data?.success) {
          Swal.fire({
            title: "Deleted!",
            text:
              res?.data?.message || "Product has been deleted successfully.",
            icon: "success",
          });
        }
      }
    });
  };
  return (
    <div className="w-full  rounded-2xl  overflow-hidden">
      {/* Product Image Container */}
      <div className="relative bg-gray-100">
        {/* Heart Icon */}

        {/* Product Image */}
        <div className="flex justify-center w-full h-80 rounded-xl ">
          <Image
            src={product.image?.[0] || shirt}
            alt="Green Hoodie Mockup"
            width={800}
            height={800}
            objectFit="cover"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="py-6">
        {/* Product Title and Price */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-4">
          <h3 className="text-sm md:text-lg font-bold text-primaryColor">
            {product.name || "Product Name"}
          </h3>
          <span className="text-xl font-semibold text-[#7B61FF]">
            ${product.price || "0.00"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-3 mt-6">
          <Link
            href={`/edit-product/${product.category}?id=${product.id}`}
            className="flex-1 text-primaryColor border-2 border-primaryColor py-2 text-base text-center font-semibold rounded-2xl hover:text-primaryColor"
          >
            Edit
          </Link>
          <Button
            onClick={() => handleDelete(product.id)}
            className="flex-1 bg-orange-500 border-2 border-primaryColor py-2 md:py-5 text-base font-semibold rounded-2xl"
          >
            Delete
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <g transform="scale(1.28)">
                <path
                  d="M19.75 5.5L19.1303 15.5251C18.9719 18.0864 18.8928 19.3671 18.2508 20.2879C17.9333 20.7431 17.5247 21.1273 17.0507 21.416C16.0921 22 14.809 22 12.2427 22C9.67312 22 8.3883 22 7.42905 21.4149C6.9548 21.1257 6.546 20.7408 6.22868 20.2848C5.58688 19.3626 5.50945 18.0801 5.35461 15.5152L4.75 5.5"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M3.25 5.5H21.25M16.3057 5.5L15.6231 4.09173C15.1696 3.15626 14.9428 2.68852 14.5517 2.39681C14.465 2.3321 14.3731 2.27454 14.277 2.2247C13.8439 2 13.3241 2 12.2845 2C11.2188 2 10.686 2 10.2457 2.23412C10.1481 2.28601 10.055 2.3459 9.96729 2.41317C9.57164 2.7167 9.35063 3.20155 8.90861 4.17126L8.30292 5.5"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M9.75 16.5V10.5"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M14.75 16.5V10.5"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </g>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
