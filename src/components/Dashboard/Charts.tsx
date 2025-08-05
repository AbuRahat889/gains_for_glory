"use client";

import { HiOutlineArrowNarrowUp } from "react-icons/hi";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "../ui/chart";
import { ResponsiveContainer } from "recharts";

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

const Chart: React.FC<ChartProps> = ({ chatInfo }) => {
  console.log(chatInfo);
  const chartData = [
    { day: 1, value: 2000 },
    { day: 2, value: 2200 },
    { day: 3, value: 2800 },
    { day: 4, value: 3200 },
    { day: 5, value: 4200 },
    { day: 6, value: 5800 },
    { day: 7, value: 6200 },
    { day: 8, value: 5400 },
    { day: 9, value: 4800 },
    { day: 10, value: 4200 },
    { day: 11, value: 4400 },
    { day: 12, value: 4600 },
    { day: 13, value: 500 },
    { day: 14, value: 5800 },
    { day: 15, value: 6400 },
    { day: 16, value: 6800 },
    { day: 17, value: 7200 },
    { day: 18, value: 7800 },
    { day: 19, value: 3000 },
    { day: 20, value: 8800 },
    { day: 21, value: 9200 },
    { day: 22, value: 9600 },
    { day: 23, value: 9400 },
    { day: 24, value: 8800 },
    { day: 25, value: 8600 },
    { day: 26, value: 8200 },
    { day: 27, value: 7800 },
    { day: 28, value: 7600 },
    { day: 29, value: 8200 },
    { day: 30, value: 8800 },
    { day: 31, value: 10000 },
  ];

  const chartConfig = {
    value: {
      label: "Value",
      color: "#7b61ff",
    },
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <ChartTooltipContent
          active={active}
          payload={payload}
          label={label}
          labelFormatter={(value) => `Day ${value}`}
          formatter={(value) => [value.toLocaleString(), "Value"]}
        />
      );
    }
    return null;
  };

  return (
    <div className="w-full space-y-6 ">
      {/* Bookings Count Chart */}
      <div className=" bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="text-base font-normal text-textColor mb-4">
          Total earnings
        </h3>
        <div className="flex flex-row md:flex-col lg:flex-row items-center md:items-start lg:items-center gap-3">
          <p className="text-2xl md:text-4xl font-semibold text-secondaryColor mt-2">
            $ 12,540
          </p>

          <div className="bg-[#f8f7ff] w-16 md:w-24 h-8 md:h-10 flex  gap-2 items-center justify-center border-2 border-[#7b61ff] rounded-3xl">
            <HiOutlineArrowNarrowUp className="text-[#7b61ff] h-16 md:h-24" />
            <p className="text-[#7b61ff] text-xs md:text-sm font-medium leading-normal">
              100%
            </p>
          </div>
        </div>

        <div className="w-full">
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  left: 0,
                  right: 20,
                  top: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="" stroke="#e0e0e0" />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={[1, 31]}
                  type="number"
                  scale="linear"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={[2000, 20000]}
                  tickFormatter={(value) => value.toLocaleString()}
                  ticks={[
                    2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000,
                    20000,
                  ]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  dataKey="value"
                  type="monotone"
                  stroke="var(--color-value)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 9,
                    stroke: "var(--color-value)",
                    strokeWidth: 2,
                    fill: "white",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>

      {/* Booking Status Distribution */}
    </div>
  );
};

export default Chart;
