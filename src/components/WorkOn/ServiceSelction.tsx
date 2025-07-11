"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

// Define the service options directly in the component file
interface ServiceOption {
  name: string;
  price: number;
  id: string;
}

export default function ServiceSelection() {
  const searchParams = useSearchParams();
  const vehicle = searchParams.get("vehicle");


  // Data defined directly in the component
  const title = "What should we work on?";
  const breadcrumb = {
    parent: "Auto Detailing",
    // current: {vehicle},
  };

  const serviceOptions: ServiceOption[] = [
    { name: "Interior & Exterior", price: 1000, id: "interior-exterior" },
    { name: "Interior Spa", price: 1000, id: "interior-spa" },
    { name: "Exterior Spa", price: 1000, id: "exterior-spa" },
    { name: "Premium Plus", price: 1000, id: "premium-plus" },
  ];

  const router = useRouter();

  const handleSelectService = (option: ServiceOption) => {
    router.push(
      `/work-details?vehicle=${vehicle}&name=${option.name}&price=${option.price}`
    );
  };

  return (
    <div className="bg-backgroundColor">
      <div className="max-w-4xl mx-auto px-4 pt-20 ">
        <h1 className="text-center text-2xl md:text-3xl font-medium text-cyan-500 mb-12 md:mb-16">
          {title}
        </h1>

        <div className="mb-8 text-gray-600 text-sm">
          <span onClick={() => router.back()} className="cursor-pointer">
            {breadcrumb.parent}
          </span>
          <span className="mx-1">&gt;</span>
          <Link href="#" className="text-primaryColor">
            {vehicle}
          </Link>
        </div>

        <div className="space-y-4">
          {serviceOptions.map((option) => (
            <button
              key={option.id}
              className="w-full border border-cyan-200 rounded-md px-6 py-4 flex justify-between items-center hover:border-cyan-400 transition-colors"
              onClick={() => handleSelectService(option)}
            >
              <span className="text-primaryColor text-lg">{option.name}</span>
              <span className="text-secondaryColor">${option.price}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
