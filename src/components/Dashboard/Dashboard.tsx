"use client";
import { useState, useEffect } from "react";
import StatCards from "./StatCards";
import Chart from "./Charts";
import { useGetAllDashboardInfoQuery } from "@/redux/api/dashboard";

function getTodayDate() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const dayOfMonth = today.getDate();
  const month = months[today.getMonth()];
  const dayOfWeek = days[today.getDay()];

  return `${dayOfMonth} ${month}, ${dayOfWeek}`;
}

function Dashboard() {
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [availableYears, setAvailableYears] = useState<number[]>([]);

  // Generate available years (current year - 5 to current year + 5)
  useEffect(() => {
    const currentYear = 2025;
    const years = [];
    for (let i = currentYear; i <= currentYear + 20; i++) {
      years.push(i);
    }
    setAvailableYears(years);
  }, []);

  const { data: dashboardInfo } = useGetAllDashboardInfoQuery({
    year: selectedYear,
  });

  return (
    <div className=" bg-white border-none md:border my-6 px-5 rounded-sm">
      <div className="">
        {/* Header */}
        <header className="flex justify-between items-center relative">
          <h1 className="text-xl md:text-2xl font-bold">
            Today {getTodayDate()}
          </h1>
        </header>

        {/* Stats Cards */}
        <StatCards
          totalUser={dashboardInfo?.data?.totalUser}
          totalEarning={dashboardInfo?.data?.total}
          // totalUser={dashboardInfo?.data?.overview?.totalUsers}
        />

        {/* Month/Year Selector */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border border-[#b9b9b9]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-lg font-semibold text-[#7b61ff]">
              Total Earning
            </h2>
            {/* filtering  */}
            <div className="flex gap-3">
              {/* selected year  */}
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="appearance-none bg-white pl-3 pr-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                >
                  {availableYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="mt-4 ">
            <Chart data={dashboardInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
