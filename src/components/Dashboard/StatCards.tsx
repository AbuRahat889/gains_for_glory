"use client";
import React from "react";
import wallet from "@/assets/icon/wallet.svg";
import user from "@/assets/icon/star.svg";
import Image from "next/image";
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
      <div className="flex flex-row md:flex-col gap-4">
        <div
          className={`border rounded-full h-14 md:h-20 w-14 md:w-20 border-[#b9b9b9] flex items-center justify-center`}
        >
          <Image src={icon} alt="image" className="size-8 md:size-12" />
        </div>

        <div>
          <p className="text-textColor text-base font-medium">{title}</p>
          <div className="flex flex-row items-center lg:items-start xl:items-center gap-3">
            <p className="text-2xl md:text-4xl font-semibold text-secondaryColor mt-2">
             {value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardsProps {
  totalEarning: number | string | null;
  totalUser: number | string | null;
}

const StatCards = ({
  totalEarning,

  totalUser,
}: StatCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      <StatCard
        icon={wallet}
        title="Total User"
        value={totalUser?.toString() || "N/A"}
      />
      <StatCard
        icon={user}
        title="Total Earning"
        value={totalEarning?.toString() || "N/A"}
      />
    </div>
  );
};

export default StatCards;
