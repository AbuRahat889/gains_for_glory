"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
} from "recharts";
import { useMemo } from "react";

interface ChartProps {
  chatInfo?: {
    date: string;
    count: number;
    bookings?: {
      status: string;
      totalAmount: number;
    }[];
  }[];
  isLoading?: boolean;
}

const Chart: React.FC<ChartProps> = ({ chatInfo, isLoading }) => {
  const chartData = useMemo(() => {
    if (!chatInfo) return [];

    return chatInfo.map((day) => {
      const bookings = day.bookings || [];

      // Initialize counters
      let completed = 0;
      let pending = 0;
      let cancelled = 0;

      // Count statuses from the actual bookings array
      bookings.forEach((booking) => {
        switch (booking.status) {
          case "COMPLETED":
            completed++;
            break;
          case "PENDING":
            pending++;
            break;
          case "CANCELLED":
            cancelled++;
            break;
        }
      });

      return {
        date: new Date(day.date).getDate(),
        fullDate: day.date,
        count: day.count,
        COMPLETED: completed,
        PENDING: pending,
        CANCELLED: cancelled,
      };
    });
  }, [chatInfo]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!chatInfo || !chatInfo?.length) {
    return (
      <div className="w-full h-72 bg-white rounded-xl flex items-center justify-center">
        <p className="text-gray-500">No booking data available</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Bookings Count Chart */}
      <div className="h-72 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Daily Bookings
        </h3>
        <ResponsiveContainer width="100%" height="80%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
                      <p className="font-medium text-gray-900">
                        {new Date(data.fullDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-indigo-600">
                        Total Bookings: {data.count > 0 ? data.count : "0"}
                      </p>
                      {data.COMPLETED ? (
                        <p className="text-green-500">
                          Completed: {data.COMPLETED}
                        </p>
                      ) : (
                        ""
                      )}
                      {data.PENDING ? (
                        <p className="text-yellow-500">
                          Pending: {data.PENDING}
                        </p>
                      ) : (
                        ""
                      )}
                      {data.CANCELLED ? (
                        <p className="text-red-500">
                          Cancelled: {data.CANCELLED}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#6366F1"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 8,
                fill: "#6366F1",
                stroke: "white",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Booking Status Distribution */}
    </div>
  );
};

export default Chart;
