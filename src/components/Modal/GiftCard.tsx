"use client";
import React from "react";
import giftImage from "@/assets/modalCar.svg";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";

interface GiftCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GiftCardModal({ isOpen, onClose }: GiftCardModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-5">
      <div className="bg-white max-w-2xl w-full rounded-2xl p-6 relative shadow-xl">
        <div className="flex justify-end">
          <RxCross2
            className="size-6 text-secondaryColor cursor-pointer "
            onClick={onClose}
          />
        </div>
        <h1 className="text-3xl font-normal leading-normal text-primaryColor text-center mb-4">
          We offer mobile detailing
        </h1>
        <Image
          src={giftImage}
          alt="gift"
          className="w-full h-auto md:h-72 object-cover rounded-lg"
          height={600}
          width={600}
        />
        <div className="text-center space-y-3 mt-6">
          <h2 className="text-2xl font-normal text-primaryColor">
            Bring the spa to you!
          </h2>
          <p className="text-base font-normal leading-normal text-gray-600 px-0 lg:px-10 pb-5">
            Want your car to look spotless without driving to the shop? Bring
            high-quality cleaning straight to wherever your car is parked.
          </p>
          <Link
            href={"https://squareup.com/glft/MLQBB1CRC58JT/order"}
            target="_blank"
            className="bg-[#d05353] text-white px-4 py-2 rounded-md hover:bg-[#b84545] transition-colors"
          >
            Reserve Now
          </Link>
        </div>
      </div>
    </div>
  );
}
