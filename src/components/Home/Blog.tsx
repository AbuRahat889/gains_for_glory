import React from "react";

import blogImage from "@/assets/dog.svg";
import Image from "next/image";
import Button from "../Button";

export default function Blog() {
  return (
    <div className="bg-[#f7f5f2] py-16 px-5 xl:px-0">
      <div className="max-w-4xl mx-auto p-6 border-2 border-primaryColor rounded-lg">
        <div className="flex flex-col lg:flex-row items-center gap-12 justify-between">
          <Image
            src={blogImage}
            alt="blog"
            className="w-full md:w-72 h-auto md:h-52 object-cover rounded-sm"
            height={900}
            width={900}
          />
          <div>
            <h1 className="text-primaryColor text-4xl font-normal leading-normal">
              Pet Hair Removal
            </h1>
            <h1 className="text-primaryColor text-2xl font-normal leading-normal">
              The Ultimate Pet Hair Removal Experience
            </h1>
            <p className="text-lg font-normal text-textColor leading-normal mt-4">
              As a pet owner, there’s nothing better than hitting the roadwith
              your furry companion by your side. But along with thejoy of those
              adventures comes the inevitable challenge—pethair everywhere.
            </p>
            <div className="flex justify-start lg:justify-end py-3">
              <Button link={"/services"} variant="primary">
                Read More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
