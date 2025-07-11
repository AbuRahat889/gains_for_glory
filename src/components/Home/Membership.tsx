import React from "react";
import membership1 from "@/assets/Membership1.png";
import membership2 from "@/assets/Membership2.png";
import Image from "next/image";
import Button from "../Button";

export default function Membership() {
  return (
    <div className="container mx-auto px-5 xl:px-0 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-between">
        <div className="">
          <Image
            src={membership1}
            alt="Membership"
            className="w-full h-auto"
            height={900}
            width={900}
          />
        </div>

        <div className=" ml-0 lg:ml-10 py-8 lg:py-0">
          <h1 className="text-primaryColor text-2xl lg:text-6xl font-bold lg:font-normal leading-normal">
            Give the Gift of Luxury
          </h1>
          <p className="text-xl lg:text-2xl text-textColor font-bold leading-normal mt-4">
            A car detailing gift card is a unique, practical,and luxurious
            present that works for just aboutanyone. Whether you&apos;re
            celebrating a specialoccasion or simply showing appreciation, thisis
            a gift that won’t sit unused in a drawer
          </p>
          <p className="text-xl lg:text-2xl text-textColor font-bold leading-normal mt-4">
            Our spa-inspired detailing services offer morethan just a clean
            car—they deliver a full rejuve-nation experience. From deep interior
            cleaningthat removes every crumb and pet hair to exte-rior
            decontamination and protection thatbrings back showroom shine, our
            detailing giftcards allow your loved ones to enjoy the feelingof a
            freshly pampered vehicle
          </p>

          <div className="flex justify-start lg:justify-end mt-6">
            <Button link={"/services"} variant="primary">
              learn more
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-between ">
        <div className="py-8 lg:py-0">
          <h1 className="text-primaryColor text-2xl lg:text-5xl font-bold lg:font-normal leading-normal">
            Seattle’s First Luxury Car Spa
          </h1>
          <p className="text-xl lg:text-2xl text-textColor font-bold leading-normal mt-4">
            We’ve redefined the art of auto detailing, draw ing inspiration from
            the world’s most opulent spas to create an experience unlike any
            other. As Seattle’s pioneering luxury car spa, we blend cutting-edge
            techniques with an unwavering commitment to craftsmanship.
          </p>
          <p className="text-xl lg:text-2xl text-textColor font-bold leading-normal mt-4">
            Where luxury meets artistry, Seattle drivers have found a
            destination that elevates car care into an unforgettable experience.
          </p>

          <div className=" mt-6">
            <Button link={"/services"} variant="primary">
              learn more
            </Button>
          </div>
        </div>
        <div className="">
          <Image
            src={membership2}
            alt="Membership"
            className="w-full h-auto"
            height={900}
            width={900}
          />
        </div>
      </div>
    </div>
  );
}
