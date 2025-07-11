// pages/interior-detailing.js
"use client";
import { serviceDetails } from "@/constants/coupeInfo";
import Image from "next/image";
import placeholder from "@/assets/placeholder.webp";
import { useSearchParams } from "next/navigation";

export default function ServiceArea() {
  const params = useSearchParams();
  const type = params.get("type");

  const interiorOnlyService = serviceDetails.find(
    (service) => service.id === type
  );

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col gap-5 md:flex-row items-center space-y-6 md:space-y-0">
        {/* Right side: Image */}
        <div className="flex-1">
          <h2 className="text-xl text-primaryColor mt-2">
            {interiorOnlyService?.serviceArea?.heading}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {interiorOnlyService?.serviceArea?.description}
          </p>
        </div>
        <div className="flex-1">
          {/* Left side: Service Details */}
          <Image
            src={interiorOnlyService?.images[2]?.url || placeholder}
            alt="Interior Detailing"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
