import React from "react";
import team1 from "@/assets/team1.jpg";
import team2 from "@/assets/team2.jpg";
import team3 from "@/assets/team3.jpg";
import Image from "next/image";

export default function TeamMembers() {
  return (
    <div className=" bg-[#c54e4f] px-5 lg:px-28 py-12 mb-12 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-md px-5 py-10 h-[500px] flex  flex-col justify-between">
          <h1 className="text-xl font-medium text-textColor leading-normal ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia,
            deleniti.consectetur adipisicing elit. Mollitia.
          </h1>
          <Image
            src={team1}
            alt="team1"
            className="w-32 h-32 object-cover rounded-full my-5"
            width={900}
            height={900}
          />
          <h1 className="text-base font-bold text-primaryColor leading-normal ">
            Jonwright
          </h1>
          <p>Developer</p>
        </div>

        <div className="bg-white rounded-md px-5 py-10 h-[500px] flex  flex-col justify-between">
          <h1 className="text-lg font-medium text-textColor leading-normal ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia,
            deleniti.
          </h1>
          <Image
            src={team2}
            alt="team1"
            className="w-32 h-32 rounded-full my-5 object-cover"
            width={900}
            height={900}
          />
          <h1 className="text-base font-bold text-primaryColor leading-normal ">
            Jonwright
          </h1>
          <p>Developer</p>
        </div>
        <div className="bg-white rounded-md px-5 py-10 h-[500px] flex  flex-col justify-between">
          <h1 className="text-lg font-medium text-textColor leading-normal ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia,
            deleniti.
          </h1>
          <Image
            src={team3}
            alt="team1"
            className="w-32 h-32 object-cover rounded-full my-5"
            width={900}
            height={900}
          />
          <h1 className="text-base font-bold text-primaryColor leading-normal ">
            Jonwright
          </h1>
          <p>Developer</p>
        </div>
      </div>
    </div>
  );
}
