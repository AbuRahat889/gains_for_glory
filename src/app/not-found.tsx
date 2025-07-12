import React from "react";
import { PiEnvelopeSimpleOpenBold } from "react-icons/pi";

import image from "@/assets/error.svg";
import image2 from "@/assets/icon404.svg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-24">
      <div className="bg-[#F5F5F5] py-9 px-5 lg:px-0">
        <div className="container mx-auto px-5 lg:px-0">
          <h1 className="text-2xl text-[#242424] font-bold leading-9">
            Oops! The page you&apos;re looking for doesn&apos;t exist or a link
            is broken.
          </h1>
          <h1 className="text-2xl text-[#474747] font-normal leading-7">
            If the error persists, contact us below.
          </h1>
        </div>
      </div>

      <div className="container mx-auto text-center relative">
        <Image
          src={image}
          alt="error"
          height={100}
          width={100}
          className="absolute w-full h-72 top-28 z-[-1] "
        />
        <div className="flex items-center justify-center mt-12">
          <Image
            src={image2}
            alt="error"
            height={100}
            width={100}
            className="h-44 w-44 text-center"
          />
        </div>

        <div>
          <h1 className="text-[54px] text-[#152536] font-bold">
            4<span className="text-[#FF9500]">0</span>4 - Page not found
          </h1>
          <h1 className="text-xl text-[#6C757D] font-normal leading-7 my-6">
            We looked everywhere for this page. Are you sure the website URL is
            correct?
          </h1>
          <h1 className="text-xl text-[#152536] font-bold">
            This page is unknown or does not exist
          </h1>
        </div>

        <div className="flex justify-center items-center">
          <Button
            variant="default"
            className="my-8 flex items-center gap-3 justify-center w-48"
          >
            <MoveLeft className="" />
            <Link href={"/"}>Go Back Home </Link>
          </Button>
        </div>

        <div className="text-xl font-bold text-[#152536] flex justify-center flex-col items-center">
          <h1>Get in touch with the site owner</h1>
          <h1 className="text-base font-normal text-[#1565D8] leading-6 flex gap-5 items-center mt-4">
            <PiEnvelopeSimpleOpenBold className="h-5 w-5 text-black font-bold " />
            info@gmail.com
          </h1>
        </div>
      </div>
    </div>
  );
}
