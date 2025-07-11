import { Calendar, Clock, Users, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CalendarData {
  data: {
    filter: {
      month: number;
      year: number;
      monthName: string;
    };
    overview: {
      totalBookings: number;
      totalUsers: number;
      totalRevenue: number;
      avgRevenuePerBooking: number;
    };
    dailyServiceCounts: any[];
  };
}

interface CalendarSidebarProps {
  data: CalendarData;
}

export function CalendarSidebar({ data }: CalendarSidebarProps) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const getBookingsForPeriod = (
    period: "today" | "tomorrow" | "week" | "month"
  ) => {
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    switch (period) {
      case "today":
        return (
          data?.data?.dailyServiceCounts?.find((d) => d.date === todayStr)
            ?.bookings || []
        );
      case "tomorrow":
        return (
          data?.data?.dailyServiceCounts?.find((d) => d.date === tomorrowStr)
            ?.bookings || []
        );
      case "week":
        // Get bookings for the next 7 days
        const weekBookings = [];
        for (let i = 0; i < 7; i++) {
          const date = new Date(now);
          date.setDate(date.getDate() + i);
          const dateStr = date.toISOString().split("T")[0];
          const dayBookings =
            data?.data?.dailyServiceCounts?.find((d) => d.date === dateStr)
              ?.bookings || [];
          weekBookings.push(...dayBookings);
        }
        return weekBookings;
      case "month":
        return data?.data?.dailyServiceCounts?.flatMap((d) => d.bookings);
      default:
        return [];
    }
  };

  const todayBookings = getBookingsForPeriod("today");
  const tomorrowBookings = getBookingsForPeriod("tomorrow");
  const weekBookings = getBookingsForPeriod("week");
  const monthBookings = getBookingsForPeriod("month");

  return (
    <div className="p-6 space-y-6">
      <div>
        {/* <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {data?.data?.filter?.monthName}
        </h2> */}

        {/* Overview Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Bookings</p>
                  <p className="text-lg font-semibold">
                    {data?.data?.overview?.totalBookings}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-xs text-gray-500">Users</p>
                  <p className="text-lg font-semibold">
                    {data?.data?.overview?.totalUsers}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-yellow-600" />
                <div>
                  <p className="text-xs text-gray-500">Revenue</p>
                  <p className="text-lg font-semibold">
                    ${data?.data?.overview?.totalRevenue}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-500">Avg/Booking</p>
                  <p className="text-lg font-semibold">
                    ${Math.round(data?.data?.overview?.avgRevenuePerBooking)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Time Period Sections */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
            <h3 className="font-medium text-gray-900">Today</h3>
          </div>
          <div className="ml-5 space-y-1">
            {todayBookings?.length > 0 ? (
              todayBookings?.slice(0, 3).map((booking: any, index: any) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-600">{booking?.service}</span>
                  <span className="text-gray-500">
                    {new Date(booking.timeslot).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No events</p>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
            <h3 className="font-medium text-gray-900">Tomorrow</h3>
          </div>
          <div className="ml-5 space-y-1">
            {tomorrowBookings.length > 0 ? (
              tomorrowBookings.slice(0, 3).map((booking: any, index: any) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-600">{booking.service}</span>
                  <span className="text-gray-500">
                    {new Date(booking.timeslot).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No events</p>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
            <h3 className="font-medium text-gray-900">This week</h3>
          </div>
          <div className="ml-5">
            <p className="text-sm text-gray-600">
              {weekBookings?.length} events
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
            <h3 className="font-medium text-gray-900">This month</h3>
          </div>
          <div className="ml-5">
            <p className="text-sm text-gray-600">
              {monthBookings?.length} events
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
