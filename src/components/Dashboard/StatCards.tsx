"use client";
import React from "react";
import { FaUsers } from "react-icons/fa";

import { BsJournalText } from "react-icons/bs";
import { TbCoins } from "react-icons/tb";
// Stat Card Component
interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  iconBg: string;
}

function StatCard({ icon, title, value, iconBg }: StatCardProps) {
  return (
    <div className="p-8 bg-white">
      <div className="flex items-center gap-4">
        <div className={`${iconBg} p-4 rounded-xl`}>
          <div className={` h-10 w-10 flex items-center justify-center`}>
            {icon}
          </div>
        </div>
        <div>
          <p className="text-[#020202]">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
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

const StatCards = ({ totalBooking, totalRevenue, totalUser }: StatCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      <StatCard
        icon={<FaUsers className="h-10 w-10 text-black" />}
        title="Total Users"
        value={totalUser?.toString() || "N/A"}
        iconBg="bg-[#f7e9e9]"
      />
      <StatCard
        icon={<BsJournalText className="h-10 w-10 text-black" />}
        title="Total Bookings"
        value={totalBooking?.toString() || "N/A"}
        iconBg="bg-[#f7e9e9]"
      />
      <StatCard
        icon={<TbCoins className="h-10 w-10 text-black" />}
        title="Total Revenue"
        value={totalRevenue?.toString() || "N/A"}
        iconBg="bg-[#f7e9e9]"
      />
    </div>
  );
};

export default StatCards;
