"use client";

import { serviceDetails } from "@/constants/coupeInfo";
import { useSearchParams } from "next/navigation";

export default function ExteriorDetailing() {
  const params = useSearchParams();
  const type = params.get("type");

  const interiorOnlyService = serviceDetails?.find(
    (service) => service.id === type
  );

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl text-primaryColor font-normal leading-normal text-center py-8 container mx-auto">
        {interiorOnlyService?.communityMessage}
      </h1>
      {interiorOnlyService ? (
        <div className="mb-12 flex flex-col lg:flex-row gap-10">
          {/* Video Section */}
          <div className="flex-1 w-full">
            {interiorOnlyService.video && (
              <div className="w-full h-64 md:h-80 lg:h-full relative overflow-hidden rounded-lg">
                <iframe
                  src={interiorOnlyService.video?.url}
                  title="Interior Detailing Video"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className=" top-0 left-0 w-full h-full rounded-lg"
                ></iframe>
              </div>
            )}
          </div>

          {/* Text Content */}
          <div className="flex-1">
            <ol className="mt-4 space-y-4">
              {interiorOnlyService?.steps
                ?.slice(5)
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
      ) : (
        <p>No InteriorOnly service found.</p>
      )}
    </div>
  );
}
