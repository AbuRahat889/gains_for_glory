"use client";

import Image from "next/image";
import logo from "@/assets/logo.svg";
import profileImage from "@/assets/team1.jpg";

export default function Navbar() {
  return (
    <nav
      className={` mx-auto border-b border-[#b9b9b9] h-24 flex px-28`}
    >
      <div className="flex justify-between w-full">
        <div className="relative  flex-1">
          <Image
            src={logo}
            alt="Logo"
            className="object-contain h-full"
            priority
          />
        </div>
        <div className=" flex items-center gap-3">
          <Image
            src={profileImage}
            alt="Logo"
            className="h-11 w-11 rounded-full"
            priority
          />
          <div>
            <h1 className="text-[#171717] text-base font-semibold leading-normal">
              Aj Breslin
            </h1>
            <h1 className="text-[#747474] text-base font-normal leading-normal">
              Admin
            </h1>
          </div>
        </div>
      </div>
    </nav>
  );
}
