import React from "react";

import serviceImage from "@/assets/service.png";
import Image from "next/image";
import Button from "../Button";

export default function Service() {
  return (
    <div>
      <Image
        src={serviceImage}
        alt="service"
        // fill
        className="w-full h-auto lg:h-lvh "
        height={900}
        width={900}
      />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-0 lg:gap-12 px-5 xl:px-0">
        <div className="flex flex-col lg:flex-row py-8 lg:py-16">
          <h1 className="text-3xl font-normal leading-normal text-primaryColor pr-8">
            Auto Detailing
          </h1>
          <div className="hidden lg:flex items-center px-2">
            <div className="w-[2px] h-20 bg-[#d05353]" />
          </div>
          <div className="">
            <h1 className="text-lg font-normal text-textColor leading-normal ml-3 ">
              An auto spa is where luxury meets precision, transforming your
              vehicle with advanced treatments and a touch of elegance
            </h1>
            <div className=" flex justify-start lg:justify-end ">
              <Button link={"/services"} variant="primary" className="mt-5">
                Reserve Now
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row py-8 lg:py-16">
          <h1 className="text-3xl font-normal leading-normal text-primaryColor pr-8">
            Other Services
          </h1>
          <div className="hidden lg:flex items-center px-2">
            <div className="w-[2px] h-20 bg-[#d05353]" />
          </div>
          <div className="">
            <h1 className="text-lg font-normal text-textColor leading-normal  ml-3 ">
              Discover our other services outside of detailing. From The theft
              recovery to Bio-Hazard Removal.
            </h1>
            <div className=" flex justify-start lg:justify-end ">
              <Button link={"/services"} variant="primary" className="mt-5">
                Reserve Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
