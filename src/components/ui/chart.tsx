"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Chart Container Component
interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: Record<string, { label: string; color: string }>;
  children: React.ReactNode;
}

export function ChartContainer({
  config,
  className,
  children,
  ...props
}: ChartContainerProps) {
  const id = React.useId();

  return (
    <div
      data-chart={id}
      className={cn("flex aspect-video justify-center text-xs", className)}
      {...props}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: Object.entries(config)
            .map(
              ([key, value]) =>
                `[data-chart="${id}"] { --color-${key}: ${value.color}; }`
            )
            .join("\n"),
        }}
      />
      {children}
    </div>
  );
}

// Chart Tooltip Content Component
interface ChartTooltipContentProps {
  active?: boolean;
  payload?: Array<{
    value: any;
    name: string;
    color: string;
    dataKey: string;
  }>;
  label?: string;
  hideLabel?: boolean;
  labelFormatter?: (value: any) => string;
  formatter?: (value: any, name: string) => [string, string];
  className?: string;
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  hideLabel = false,
  labelFormatter,
  formatter,
  className,
}: ChartTooltipContentProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div
      className={cn("rounded-lg border bg-background p-2 shadow-md", className)}
    >
      {!hideLabel && label && (
        <div className="mb-1 font-medium">
          {labelFormatter ? labelFormatter(label) : label}
        </div>
      )}
      <div className="space-y-1">
        {payload.map((entry, index) => {
          const [formattedValue, formattedName] = formatter
            ? formatter(entry.value, entry.name)
            : [entry.value, entry.name];

          return (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm">
                {formattedName}: {formattedValue}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
