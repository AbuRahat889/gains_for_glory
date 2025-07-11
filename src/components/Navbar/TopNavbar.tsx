import Link from "next/link";
import React from "react";

export default function TopNavbar() {
  return (
    <div>
      <div className="bg-[#13A0C6] w-full px-5 lg:px-0">
        <h1 className="text-base font-normal leading-normal text-white text-center py-3">
          Save 15% on all purchases by becoming a member
          <br />{" "}
          <Link href={"/#"} className="underline ">
            Click here to learn more
          </Link>
        </h1>
      </div>
    </div>
  );
}
