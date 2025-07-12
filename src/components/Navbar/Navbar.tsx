"use client";

import Image from "next/image";
import logo from "@/assets/logo.svg";
import profileImage from "@/assets/team1.jpg";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className={` mx-auto border-b border-[#b9b9b9] h-24 flex px-5 md:px-28 fixed bg-white z-[9] w-full`}
    >
      <div className="flex justify-between w-full">
        <div className="relative  flex-1">
          <Link href={"/"}>
            <Image
              src={logo}
              alt="Logo"
              className="object-contain h-full"
              priority
            />
          </Link>
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
