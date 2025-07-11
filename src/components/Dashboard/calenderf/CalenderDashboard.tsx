"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarSidebar } from "./CalenderSidebar";
import { BookingCard } from "./BookinCard";
import { CalendarDashboardProps } from "@/Types/Calender";

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

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function CalendarDashboard({
  data,
  setSelectedYearProps,
  setSelectedMonth,
}: CalendarDashboardProps) {
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number | undefined>();
  const [currentYear, setCurrentYear] = useState<number | undefined>(
    data?.data?.filter?.year
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    setCurrentMonth(data?.data?.filter?.month - 1);
    setCurrentYear(data?.data?.filter?.year);
  }, [data]);


  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Convert Sunday (0) to 6, Monday (1) to 0, etc.
  };

  const getBookingsForDate = (date: string) => {
    const dayData = data?.data?.dailyServiceCounts?.find(
      (d) => d.date === date
    );
    return dayData ? dayData.bookings : [];
  };

  const formatDate = (day: number) => {
    const month = ((currentMonth ?? 0) + 1).toString().padStart(2, "0");
    const dayStr = day.toString().padStart(2, "0");
    return `${currentYear}-${month}-${dayStr}`;
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "CONFIRMED":
        return "bg-green-500";
      case "PENDING":
        return "bg-yellow-500";
      case "CANCELLED":
        return "bg-red-500";
      case "COMPLETED":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(
      data?.data?.filter?.month - 1,
      data?.data?.filter?.year
    );
    const firstDay = getFirstDayOfMonth(
      currentMonth ?? 0,
      currentYear ?? new Date().getFullYear()
    );
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-24 border border-gray-200 bg-gray-50"
        ></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(day);
      const bookings = getBookingsForDate(dateStr);
      const isToday =
        new Date().toDateString() ===
        new Date(
          currentYear ?? new Date().getFullYear(),
          currentMonth ?? new Date().getMonth(),
          day
        ).toDateString();

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 bg-white p-1 cursor-pointer hover:bg-gray-50 ${
            isToday ? "bg-blue-50 border-blue-300" : ""
          }`}
          onClick={() => setSelectedDate(dateStr)}
        >
          <div
            className={`text-sm font-medium mb-1 ${
              isToday ? "text-blue-600" : "text-gray-900"
            }`}
          >
            {day}
          </div>
          <div className="space-y-1">
            {bookings?.slice(0, 2).map((booking) => (
              <div
                key={booking.id}
                className={`text-xs px-2 py-1 rounded text-white truncate ${getStatusColor(
                  booking.status
                )}`}
              >
                {booking.service}
              </div>
            ))}
            {bookings.length > 2 && (
              <div className="text-xs text-gray-500 px-2">
                +{bookings.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear((currentYear ?? new Date().getFullYear()) - 1);
      } else {
        setCurrentMonth((currentMonth ?? 0) - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear((currentYear ?? new Date().getFullYear()) + 1);
      } else {
        setCurrentMonth((currentMonth ?? 0) + 1);
      }
    }
  };

  const selectedBookings = selectedDate ? getBookingsForDate(selectedDate) : [];

  // Generate available years (current year - 5 to current year + 5)
  useEffect(() => {
    const currentYear = 2025;
    const years = [];
    for (let i = currentYear; i <= currentYear + 20; i++) {
      years.push(i);
    }
    setAvailableYears(years);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200">
        <CalendarSidebar data={data} />
      </div>

      {/* Main Calendar */}
      <div className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-900">
              {typeof currentMonth === "number" ? months[currentMonth] : ""}
            </h1>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-6">
            <Select
              value={
                typeof currentMonth === "number" ? months[currentMonth] : ""
              }
              onValueChange={(value: any) => {
                const monthIndex = months.indexOf(value);
                setCurrentMonth(monthIndex);
                setSelectedMonth(monthIndex + 1);
              }}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
                {/* {typeof currentMonth === "number" ? months[currentMonth] : ""} */}
              </SelectTrigger>
              <SelectContent>
                {months?.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* selected year  */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(Number(e.target.value));
                  setSelectedYearProps(Number(e.target.value));
                }}
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

        <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
          {/* Week day headers */}
          {weekDays?.map((day) => (
            <div
              key={day}
              className="bg-gray-100 border-b border-gray-200 p-3 text-center text-sm font-medium text-gray-700"
            >
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {renderCalendarDays()}
        </div>

        {/* Selected Date Details */}
        {selectedDate && selectedBookings?.length > 0 && (
          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Bookings for{" "}
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {selectedBookings?.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
