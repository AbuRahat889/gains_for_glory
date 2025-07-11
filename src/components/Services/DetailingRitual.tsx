// pages/interior-detailing.js
"use client";
import { serviceDetails } from "@/constants/coupeInfo";
import Image from "next/image";
import placeholder from "@/assets/placeholder.webp";
import { useSearchParams } from "next/navigation";

export default function DetailingRitual() {
  const params = useSearchParams();
  const type = params.get("type");

  const interiorOnlyService = serviceDetails?.find(
    (service) => service.id === type
  );
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl text-primaryColor font-normal leading-normal text-center py-8 container mx-auto">
        {interiorOnlyService?.stepsTitle}
      </h1>
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0">
        <div className="flex-1">
          {/* Left side: Service Details */}
          <Image
            src={interiorOnlyService?.images[1]?.url || placeholder}
            alt="Interior Detailing"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
        {/* Right side: Image */}
        <div className="flex-1">
          <ol className="mt-4 space-y-4">
            {interiorOnlyService?.steps
              ?.slice(2, 5)
              .map((step, index: number) => (
                <li key={index} className="">
                  <h4 className="text-xl font-bold text-secondaryColor ">
                    {step.title}
                  </h4>
                  <p className="text-textColor text-lg">{step.description}</p>
                </li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
