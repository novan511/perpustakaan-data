"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { CorrelationResult } from "@/lib/correlation";

interface ScatterPlotProps {
  result: CorrelationResult;
  labelX: string;
  labelY: string;
  height?: number;
}

export default function ScatterPlot({
  result,
  labelX,
  labelY,
  height = 350,
}: ScatterPlotProps) {
  const { regressionLine, scatterData } = result;

  const xValues = scatterData.map((d) => d.x);
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);

  const y1 = regressionLine.slope * xMin + regressionLine.intercept;
  const y2 = regressionLine.slope * xMax + regressionLine.intercept;

  const regressionData = [
    { x: xMin, y: y1, regression: true },
    { x: xMax, y: y2, regression: true },
  ];

  return (
    <div
      role="img"
      aria-label={`${labelX} vs ${labelY} scatter plot with regression line`}
    >
      <ResponsiveContainer width="100%" height={height}>
        <ScatterChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
            className="dark:stroke-slate-700"
          />
          <XAxis
            type="number"
            dataKey="x"
            tick={{ fontSize: 10, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
            name={labelX}
          >
            <Label
              value={labelX}
              position="bottom"
              offset={-5}
              style={{ fontSize: 11, fill: "#64748b" }}
            />
          </XAxis>
          <YAxis
            type="number"
            dataKey="y"
            tick={{ fontSize: 10, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
            name={labelY}
          >
            <Label
              value={labelY}
              angle={-90}
              position="insideLeft"
              offset={10}
              style={{ fontSize: 11, fill: "#64748b" }}
            />
          </YAxis>
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const data = payload[0]?.payload;
              if (data?.regression) return null;
              return (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl p-3">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white mb-1">
                    {data?.periodX}
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-slate-500">{labelX}:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {data?.x?.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-slate-500">{labelY}:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {data?.y?.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }}
          />
          <Scatter
            name="Data"
            data={result.scatterData}
            fill="#3b82f6"
            fillOpacity={0.7}
            strokeWidth={0}
          />
          <Scatter
            name="Regression"
            data={regressionData}
            fill="none"
            line={{ stroke: "#ef4444", strokeWidth: 2, strokeDasharray: "6 3" }}
            shape={() => null}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
