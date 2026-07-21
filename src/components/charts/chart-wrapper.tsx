"use client";

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import type { DataPoint } from "@/types";

interface ChartWrapperProps {
  title: string;
  description?: string;
  data: DataPoint[];
  type?: "line" | "area" | "bar";
  color?: string;
  secondData?: DataPoint[];
  secondColor?: string;
  secondLabel?: string;
  showGrid?: boolean;
  height?: number;
  formatValue?: (value: number) => string;
  sources?: string[];
}

const CustomTooltip = ({
  active,
  payload,
  label,
  formatValue,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
  formatValue?: (value: number) => string;
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl p-3">
      <p className="text-xs font-semibold text-slate-900 dark:text-white mb-1">
        {label}
      </p>
      {payload.map((item, index) => (
        <div key={index} className="flex items-center gap-2 text-xs">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-slate-500 dark:text-slate-400">{item.name}:</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            {formatValue ? formatValue(item.value) : item.value.toLocaleString("id-ID")}
          </span>
        </div>
      ))}
    </div>
  );
};

function mergeData(primary: DataPoint[], secondary?: DataPoint[]) {
  if (!secondary) return primary.map((d) => ({ ...d, valueA: d.value }));
  const secondaryMap = new Map(secondary.map((d) => [d.period, d.value]));
  return primary.map((d) => ({
    ...d,
    valueA: d.value,
    valueB: secondaryMap.get(d.period) ?? 0,
  }));
}

export default function ChartWrapper({
  title,
  description,
  data,
  type = "area",
  color = "#3b82f6",
  secondData,
  secondColor = "#10b981",
  secondLabel = "Sekunder",
  showGrid = true,
  height = 300,
  formatValue,
  sources,
}: ChartWrapperProps) {
  const [chartType, setChartType] = useState(type);
  const merged = useMemo(() => mergeData(data, secondData), [data, secondData]);

  const chartTypes = [
    { key: "area", label: "Area" },
    { key: "line", label: "Line" },
    { key: "bar", label: "Bar" },
  ];

  const axisProps = {
    xAxis: {
      dataKey: "period",
      tick: { fontSize: 10, fill: "#94a3b8" },
      tickLine: false,
      axisLine: false,
    },
    yAxis: {
      tick: { fontSize: 10, fill: "#94a3b8" },
      tickLine: false,
      axisLine: false,
      width: 50,
    },
  };

  const gridProps = showGrid
    ? { strokeDasharray: "3 3", stroke: "#e2e8f0", className: "dark:stroke-slate-700" }
    : undefined;

  const renderChart = () => {
    const tooltip = <Tooltip content={<CustomTooltip formatValue={formatValue} />} />;

    if (chartType === "area") {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={merged} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
            {showGrid && <CartesianGrid {...gridProps} />}
            <XAxis {...axisProps.xAxis} />
            <YAxis {...axisProps.yAxis} />
            {tooltip}
            <Legend />
            <Area
              type="monotone"
              dataKey="valueA"
              name={data[0]?.label || "Utama"}
              stroke={color}
              fill={color}
              fillOpacity={secondData ? 0.15 : 0.1}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2 }}
            />
            {secondData && (
              <Area
                type="monotone"
                dataKey="valueB"
                name={secondLabel}
                stroke={secondColor}
                fill={secondColor}
                fillOpacity={0.1}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2 }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "line") {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={merged} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
            {showGrid && <CartesianGrid {...gridProps} />}
            <XAxis {...axisProps.xAxis} />
            <YAxis {...axisProps.yAxis} />
            {tooltip}
            <Legend />
            <Line
              type="monotone"
              dataKey="valueA"
              name={data[0]?.label || "Utama"}
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2 }}
            />
            {secondData && (
              <Line
                type="monotone"
                dataKey="valueB"
                name={secondLabel}
                stroke={secondColor}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={merged} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
          {showGrid && <CartesianGrid {...gridProps} />}
          <XAxis {...axisProps.xAxis} />
          <YAxis {...axisProps.yAxis} />
          {tooltip}
          <Legend />
          <Bar dataKey="valueA" name={data[0]?.label || "Utama"} fill={color} radius={[4, 4, 0, 0]} />
          {secondData && (
            <Bar dataKey="valueB" name={secondLabel} fill={secondColor} radius={[4, 4, 0, 0]} />
          )}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5" role="img" aria-label={title}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h3>
          {description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
          {chartTypes.map((ct) => (
            <button
              key={ct.key}
              onClick={() => setChartType(ct.key as typeof chartType)}
              className={cn(
                "px-2.5 py-1 text-[10px] font-medium rounded-md transition-colors",
                chartType === ct.key
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              {ct.label}
            </button>
          ))}
        </div>
      </div>

      {renderChart()}

      {sources && sources.length > 0 && (
        <div className="mt-3 flex items-center gap-1.5">
          <span className="text-[10px] text-slate-400 dark:text-slate-500">Sumber:</span>
          {sources.map((source, i) => (
            <span
              key={i}
              className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded"
            >
              {source}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
