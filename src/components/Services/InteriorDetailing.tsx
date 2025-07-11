// pages/interior-detailing.js
"use client";
import { serviceDetails } from "@/constants/coupeInfo";
import Image from "next/image";
import placeholder from "@/assets/placeholder.webp";
import { useSearchParams } from "next/navigation";

export default function InteriorDetailing() {
  const params = useSearchParams();
  const type = params.get("type");

  const interiorOnlyService = serviceDetails?.find(
    (service) => service.id === type
  );

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col gap-5 md:flex-row items-center space-y-6 md:space-y-0">
        {/* Right side: Image */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-primaryColor">
            {interiorOnlyService?.title}
          </h1>
          <h2 className="text-xl text-primaryColor mt-2">
            {interiorOnlyService?.subtitle}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {interiorOnlyService?.description}
          </p>
          <ol className="mt-4 space-y-4">
            {interiorOnlyService?.steps
              ?.slice(0, 2)
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
        <div className="flex-1">
          {/* Left side: Service Details */}
          <Image
            src={interiorOnlyService?.images[0]?.url || placeholder}
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
