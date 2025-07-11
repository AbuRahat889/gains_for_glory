"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookingSummary from "./BookingSummary";

export default function DateTimePicker() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date()); // March 2025
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  // Generate days of the month
  const generateDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday, etc.
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Adjust for Monday as first day of week
    const firstDayAdjusted = firstDay === 0 ? 6 : firstDay - 1;

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayAdjusted; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const days = generateDays();

  // Format month and year
  const monthYearFormat = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(currentMonth);

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  // Check if a date is selected
  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  localStorage.setItem("selectedDate", JSON.stringify(selectedDate));
  localStorage.setItem("selectedTime", JSON.stringify(selectedTime));

  function mergeDateAndTime(dateString: string, timeString: string): string {
    if (!dateString || !timeString) {
      throw new Error("Both date and time must be provided");
    }

    const date = new Date(dateString);

    // Ensure timeString has a space between time and am/pm
    const parts = timeString.trim().toLowerCase().split(" ");
    if (parts.length !== 2) {
      throw new Error("Time must be in the format 'HH:MM am/pm'");
    }

    const [time, modifier] = parts;
    const [rawHours, minutes] = time.split(":").map(Number);
    let hours = rawHours;

    if (isNaN(hours) || isNaN(minutes)) {
      throw new Error("Invalid time format");
    }

    if (modifier === "pm" && hours < 12) hours += 12;
    if (modifier === "am" && hours === 12) hours = 0;

    const combinedDate = new Date(date);
    combinedDate.setUTCHours(hours, minutes, 0, 0); // UTC!

    return combinedDate.toISOString(); // "2025-05-22T13:00:00.000Z"
  }

  useEffect(() => {
    if (!selectedDate || !selectedTime) return;

    try {
      const result = mergeDateAndTime(selectedDate.toISOString(), selectedTime);
      localStorage.setItem("timeslot", JSON.stringify(result));
    } catch (error) {
      console.error("Failed to merge date and time:", error);
    }
  }, [selectedDate, selectedTime]);

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-10  py-12">
      <div className="max-w-xl px-5 lg:px-0">
        {/* Calendar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">{monthYearFormat}</h2>
            <div className="flex space-x-2">
              <button
                onClick={prevMonth}
                className="text-blue-500 hover:text-blue-700"
                aria-label="Previous month"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextMonth}
                className="text-blue-500 hover:text-blue-700"
                aria-label="Next month"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="text-center text-sm text-gray-600 py-2">
                {day}
              </div>
            ))}
            {days.map((day, index) => (
              <div key={index} className="text-center py-2">
                {day ? (
                  <button
                    className={`w-8 h-8 rounded-md flex items-center justify-center ${
                      isDateSelected(day)
                        ? "bg-primaryColor text-white"
                        : day.getDate() === today.getDate() &&
                          day.getMonth() === today.getMonth() &&
                          day.getFullYear() === today.getFullYear()
                        ? "bg-yellow-200 text-black font-semibold"
                        : "hover:bg-primaryColor hover:text-white"
                    }`}
                    onClick={() => handleDateSelect(day)}
                  >
                    {day.getDate()}
                  </button>
                ) : (
                  <span></span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Time selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <h3 className="text-lg font-medium mb-4">Select a time</h3>
          <div className="flex justify-between space-x-4">
            {["11:00 am", "1:00 pm", "3:00 pm"].map((time) => (
              <button
                key={time}
                className={`border rounded px-4 py-2 flex-1 transition-all ${
                  selectedTime === time
                    ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </button>
            ))}
          </div>
          {/* Timezone info */}
          <div className="bg-[#fdc700] text-white font-bold rounded-lg p-4 flex justify-between items-center text-base mt-4">
            <span>All times are in (GMT-8:00) Pacific time (US & Canada)</span>
            <button className="text-white underline">Change</button>
          </div>
        </div>
      </div>
      <BookingSummary selectedTime={selectedTime} selectedDate={selectedDate} />
    </div>
  );
}
