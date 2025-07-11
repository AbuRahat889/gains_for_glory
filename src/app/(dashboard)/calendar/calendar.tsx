"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { CalendarSidebar } from "./CalenderSidebar"

interface Booking {
  id: string
  user: {
    firstName: string
    lastName: string
    email?: string
    phoneNumber?: string
  }
  service: string
  status: string
  timeslot: string
  totalAmount?: number
  model?: string
  category?: string
}

interface DailyServiceCount {
  date: string
  count: number
  bookings: Booking[]
}

interface CalendarData {
  filter: {
    month: number
    year: number
    monthName: string
  }
  overview: {
    totalBookings: number
    totalUsers: number
    totalRevenue: number
    avgRevenuePerBooking: number
  }
  dailyServiceCounts: DailyServiceCount[]
}

interface CalendarDashboardProps {
  data: CalendarData
}

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
]

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export function Calendar({ data }: CalendarDashboardProps) {
  const [currentMonth, setCurrentMonth] = useState(data?.filter?.month - 1)
  const [currentYear, setCurrentYear] = useState(data?.filter?.year)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay()
    return firstDay === 0 ? 6 : firstDay - 1 // Convert Sunday (0) to 6, Monday (1) to 0, etc.
  }

  const getBookingsForDate = (date: string) => {
    const dayData = data.dailyServiceCounts.find((d) => d.date === date)
    return dayData ? dayData.bookings : []
  }

  const formatDate = (day: number) => {
    const month = (currentMonth + 1).toString().padStart(2, "0")
    const dayStr = day.toString().padStart(2, "0")
    return `${currentYear}-${month}-${dayStr}`
  }

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "CONFIRMED":
        return "bg-green-500"
      case "PENDING":
        return "bg-yellow-500"
      case "CANCELLED":
        return "bg-red-500"
      case "COMPLETED":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 bg-gray-50"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(day)
      const bookings = getBookingsForDate(dateStr)
      const isToday = new Date().toDateString() === new Date(currentYear, currentMonth, day).toDateString()

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 bg-white p-1 cursor-pointer hover:bg-gray-50 ${
            isToday ? "bg-blue-50 border-blue-300" : ""
          }`}
          onClick={() => setSelectedDate(dateStr)}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? "text-blue-600" : "text-gray-900"}`}>{day}</div>
          <div className="space-y-1">
            {bookings.slice(0, 2).map((booking) => (
              <div
                key={booking.id}
                className={`text-xs px-2 py-1 rounded text-white truncate ${getStatusColor(booking.status)}`}
              >
                {booking.service}
              </div>
            ))}
            {bookings.length > 2 && <div className="text-xs text-gray-500 px-2">+{bookings.length - 2} more</div>}
          </div>
        </div>,
      )
    }

    return days
  }

  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    }
  }

  const selectedBookings = selectedDate ? getBookingsForDate(selectedDate) : []

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200">
        {/* <CalendarSidebar data={data} /> */}
      </div>

      {/* Main Calendar */}
      <div className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-900">
              {months[currentMonth]} {currentYear}
            </h1>
            <Button variant="outline" size="icon" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Select
            value={months[currentMonth]}
            onValueChange={(value:any) => {
              const monthIndex = months.indexOf(value)
              setCurrentMonth(monthIndex)
            }}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
          {/* Week day headers */}
          {weekDays.map((day) => (
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
        {selectedDate && selectedBookings.length > 0 && (
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
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
