"use client";

import React, { useState } from "react";
import heroImage from "@/assets/hero.png";
import Image from "next/image";
import Button from "../Button";
import GiftCardModal from "../Modal/GiftCard";

export default function Hero() {
  const [isModalOpen, setModalOpen] = useState(true);

  return (
    <div className="bg-white">
      <div className="container mx-auto  px-5 lg:px-0 py-24">
        <div className="flex flex-col lg:flex-row items-center gap-10 justify-between py-20">
          <div className=" w-full lg:w-[800px]">
            <Image
              src={heroImage}
              alt="hero"
              className="w-full h-auto"
              height={900}
              width={900}
            />
          </div>
          <div>
            <h1 className="text-primaryColor text-3xl lg:text-7xl font-bold lg:font-normal leading-normal">
              Take your car <br /> to the spa.
            </h1>
            <p className="text-lg lg:text-[28px] text-textColor font-bold leading-normal mt-2 w-full md:w-96">
              Luxury detailing for families who values calm and clean
            </p>
            <Button link={"/services"} variant="primary" className="mt-4">
              Reserve Now
            </Button>
          </div>
        </div>
        <p className="text-xl lg:text-[28px] text-textColor font-bold leading-normal mt-2 w-full lg:w-[784px] mx-auto">
          We offer a premium service that goes beyond the basics, giving you the
          peace of mind that your car is not only clean but pampered
        </p>
      </div>

      <GiftCardModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
