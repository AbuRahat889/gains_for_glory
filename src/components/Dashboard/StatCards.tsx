"use client";
import React from "react";
import wallet from "@/assets/icon/wallet.svg";
import user from "@/assets/icon/star.svg";
import Image from "next/image";
import { HiOutlineArrowNarrowUp } from "react-icons/hi";
// Stat Card Component
interface StatCardProps {
  icon: string;
  title: string;
  value: string;
}

function StatCard({ icon, title, value }: StatCardProps) {
  console.log(value);
  return (
    <div className="p-2 lg:p-8 bg-white border rounded-sm border-[#b9b9b9]">
      <div className="flex flex-col gap-4">
        <div
          className={`border rounded-full h-20 w-20 border-[#b9b9b9] flex items-center justify-center`}
        >
          <Image src={icon} alt="image" className="size-12" />
        </div>

        <div>
          <p className="text-textColor text-base font-medium">{title}</p>
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
            <p className="text-2xl md:text-4xl font-semibold text-secondaryColor mt-2">
              12,540
            </p>

            <div className="bg-[#f8f7ff] w-24 h-10 flex gap-2 items-center justify-center border-2 border-[#7b61ff] rounded-3xl">
              <HiOutlineArrowNarrowUp className="text-[#7b61ff] h-24" />
              <p className="text-[#7b61ff] text-sm font-medium leading-normal">
                100%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardsProps {
  totalBooking: number | string | null;
  totalRevenue: number | string | null;
  totalUser: number | string | null;
}

const StatCards = ({
  totalBooking,

  totalUser,
}: StatCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      <StatCard
        icon={wallet}
        title="Total Users"
        value={totalUser?.toString() || "N/A"}
      />
      <StatCard
        icon={user}
        title="Total Bookings"
        value={totalBooking?.toString() || "N/A"}
      />
    </div>
  );
};

export default StatCards;
