"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function InteriorAndExteriorDetails() {
  const router = useRouter();
  const params = useSearchParams();
  const vehicle = params.get("vehicle");
  const category = params.get("name");
  const price = params.get("price");

  localStorage.setItem("category", JSON.stringify(category));
  localStorage.setItem("serviceAmount", JSON.stringify(price));
  localStorage.setItem("service", JSON.stringify(vehicle));
  return (
    <div className="bg-backgroundColor px-4 py-8 md:px-6 lg:px-8 pt-36">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-12 text-center text-2xl font-light text-primaryColor md:text-3xl pt-20 pb-20">
          What should we work on?
        </h1>

        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center text-secondaryColor"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span>Back</span>
          </button>
          <div className="text-base text-gray-500">
            Auto Detailing &gt;{" "}
            <span className="text-primaryColor">{vehicle}</span>
          </div>
        </div>

        <div className="mb-10 rounded-lg border border-cyan-500 p-4 flex justify-between items-center">
          <span className="text-primaryColor text-lg">{category}</span>
          <span className="text-secondaryColor">${price}</span>
        </div>

        <div className="mb-8">
          <p className="mb-4 text-gray-600 text-lg">Service includes:</p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-secondaryColor text-xl font-semibold">
                Interior
              </h3>
              <ul className="space-y-2 text-gray-600 text-lg">
                <li>- Vacuum</li>
                <li>- Carpet & upholstery</li>
                <li>- Door jambs</li>
                <li>- Car dash & panels</li>
                <li>- Floor mats & pedals</li>
                <li>- Seats</li>
                <li>- Headliner</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-secondaryColor text-xl font-semibold">
                Exterior
              </h3>
              <ul className="space-y-2 text-gray-600 text-lg">
                <li>- Hand wash</li>
                <li>- Pressure wash</li>
                <li>- Tires & wheels</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-8 space-y-4 text-gray-600 max-w-[362px]">
          <h3 className="text-gray-700 text-lg">Restoring harmony</h3>
          <p className="text-lg leading-relaxed ">
            Craft a sanctuary within your car, blending meticulous artistry to
            restore every surface inside your car
          </p>

          <p className="text-lg leading-relaxed">
            The exterior undergoes multi-stage decontamination. Every wheel,
            brake caliper, and exterior trim is carefully detailed.
          </p>
        </div>
        <h1 className="mb-3 text-secondaryColor text-lg font-semibold hover:underline cursor-pointer">
          <Link href={"/other-services/service-details?type=bio-hazard"}>
            Learn More
          </Link>
        </h1>

        <div className="mt-12 border-t border-black pt-4 "></div>
      </div>
    </div>
  );
}
