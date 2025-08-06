"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";

interface MonthlyIncome {
  month: string;
  income: number;
}

interface IncomeData {
  total: number;
  monthly: MonthlyIncome[];
  totalUser: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: IncomeData;
}

interface IncomeChartProps {
  data?: ApiResponse;
}

export default function IncomeChart({ data }: IncomeChartProps) {
  const chartData = data?.data;

  const formatCurrency = (value: number) => `$${value?.toLocaleString()}`;
  const formatYAxis = (value: number) => {
    if (value >= 1000) return `${value / 1000}k`;
    return value?.toString();
  };

  const maxIncome = Math.max(
    ...(chartData?.monthly?.map((item: any) => item.income) ?? [0])
  );

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: any;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const value = payload[0]?.value as number;
      const isHighlighted = value === maxIncome && value > 0;
      return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div
              className={`w-3 h-3 rounded-full ${
                isHighlighted ? "bg-orange-500" : "bg-purple-500"
              }`}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mb-2 font-medium">
            Month: {label}, 2025
          </p>
          <p className="text-sm text-gray-600 mb-2">
            Total sale: {formatCurrency(value > 0 ? value * 51 : 0)}
          </p>
          <p className="text-sm text-gray-600">
            Revenue: {formatCurrency(value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white shadow-sm border border-gray-100">
      <div className="p-4 sm:p-8">
        <div className="mb-6 sm:mb-8">
          <p className="text-sm text-gray-500 mb-2">Total</p>
          <h2 className="text-2xl md:text-5xl font-bold text-gray-900">
            {formatCurrency(chartData?.total ?? 0)}
          </h2>
        </div>

        {/* Scrollable container for mobile */}
        <div className="overflow-x-auto">
          <div className="min-w-[600px] h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData?.monthly}
                margin={{
                  top: 20,
                  right: 10,
                  left: 10,
                  bottom: 20,
                }}
                barCategoryGap="25%"
              >
                <CartesianGrid
                  strokeDasharray="none"
                  stroke="#e2e8f0"
                  horizontal
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 13,
                    fill: "#64748b",
                    fontWeight: 500,
                  }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 13,
                    fill: "#64748b",
                    fontWeight: 500,
                  }}
                  tickFormatter={formatYAxis}
                  domain={[0, Math.max(2500, maxIncome * 1.2)]}
                  dx={-10}
                  ticks={[0, 500, 1000, 1500, 2000, 2500]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="income" radius={[6, 6, 0, 0]}>
                  {chartData?.monthly?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.income === maxIncome && entry.income > 0
                          ? "#f97316"
                          : "#8b5cf6"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
