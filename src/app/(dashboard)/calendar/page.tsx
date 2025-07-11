"use client";

import React, { useState } from "react";
import { useGetAllDashboardInfoQuery } from "@/redux/api/dashboard";
import { CalendarDashboard } from "@/components/Dashboard/calenderf/CalenderDashboard";

export default function Page() {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const { data: dashboardInfo } = useGetAllDashboardInfoQuery({
    month: selectedMonth,
    year: selectedYear,
  });

  return (
    <div className=" bg-[#f9f7f3]">
      {/* <h1 className="text-primaryColor text-3xl font-normal leading-normal text-center py-12">
        Book Your Service
      </h1> */}
      <CalendarDashboard
        data={dashboardInfo}
        setSelectedMonth={setSelectedMonth}
        setSelectedYearProps={setSelectedYear}
      />
    </div>
  );
}
