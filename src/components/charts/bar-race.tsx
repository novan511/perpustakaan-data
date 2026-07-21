"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

interface BarRaceProps {
  data: Array<{ name: string; value: number }>;
  title: string;
  color?: string;
  duration?: number;
}

export default function BarRace({
  data,
  title,
  color = "#6366f1",
  duration = 1.5,
}: BarRaceProps) {
  const sorted = useMemo(
    () => [...data].sort((a, b) => b.value - a.value),
    [data]
  );

  const maxValue = useMemo(
    () => (sorted.length > 0 ? Math.max(...sorted.map((d) => d.value)) : 0),
    [sorted]
  );

  return (
    <div
      className="w-full rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900"
      role="img"
      aria-label={title}
    >
      <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      {sorted.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No data available.</p>
      ) : (
        <div className="space-y-3">
          {sorted.map((item, index) => {
            const widthPercent = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
            return (
              <div key={item.name} className="flex items-center gap-3">
                <span className="w-6 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {item.name}
                    </span>
                    <span className="text-sm tabular-nums text-gray-500 dark:text-gray-400">
                      {item.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-7 w-full overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
                    <motion.div
                      className="h-full rounded-md"
                      style={{ backgroundColor: color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${widthPercent}%` }}
                      transition={{
                        duration,
                        delay: index * 0.08,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
