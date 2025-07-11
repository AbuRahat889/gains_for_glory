import React from "react";
import Button from "../Button";

export default function TopFooter() {
  return (
    <div className="py-12 px-5 lg:px-0 bg-backgroundColor">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-9 justify-between ">
        <div>
          <h1
            className="text-2xl font-normal leading-normal text-primaryColor
          "
          >
            Save 20% by joining <br /> ournewsletter!
          </h1>
          <p className="text-sm font-normal leading-normal text-textColor mt-2">
            Unlock the ultimate car care experience.Stay connected with expert
            tips, exclusiveupdates, and insights to keep your car inpristine
            condition.{" "}
          </p>
          <p className="text-sm font-normal leading-normal text-textColor mt-2">
            {" "}
            It’s everything you need to elevate your carcare
            experience—delivered straight toyour inbox
          </p>
        </div>
        <div className="flex items-center  justify-between w-full gap-5">
          <input
            type="email"
            placeholder="email"
            className="py-2 px-2 border-2 border-primaryColor outline-none w-full"
          />
          <Button variant="primary">Submit</Button>
        </div>
      </div>
    </div>
  );
}
