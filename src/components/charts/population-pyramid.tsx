"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

interface PyramidProps {
  data: Array<{ ageGroup: string; male: number; female: number }>;
  title: string;
  height?: number;
}

export default function Pyramid({
  data,
  title,
}: PyramidProps) {
  const maxValue = useMemo(
    () => Math.max(...data.map((d) => Math.max(Math.abs(d.male), Math.abs(d.female))), 1),
    [data]
  );

  const barHeight = 28;
  const gap = 6;
  const svgHeight = data.length * (barHeight + gap) + 40;
  const centerX = 200;
  const maxBarWidth = 160;

  return (
    <div
      className="w-full rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900"
      role="img"
      aria-label={title}
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>

      <div className="mb-3 flex justify-center gap-6 text-sm">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-blue-500" />
          <span className="text-gray-600 dark:text-gray-300">Male</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-pink-500" />
          <span className="text-gray-600 dark:text-gray-300">Female</span>
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${centerX * 2} ${svgHeight}`}
          className="h-auto w-full"
          style={{ minWidth: 400 }}
        >
          {data.map((item, i) => {
            const y = i * (barHeight + gap) + 20;
            const maleWidth = (Math.abs(item.male) / maxValue) * maxBarWidth;
            const femaleWidth = (Math.abs(item.female) / maxValue) * maxBarWidth;

            return (
              <g key={item.ageGroup}>
                <text
                  x={centerX}
                  y={y + barHeight / 2}
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={500}
                  className="fill-gray-600 dark:fill-gray-300"
                >
                  {item.ageGroup}
                </text>

                <motion.rect
                  x={centerX - maleWidth - 2}
                  y={y}
                  width={maleWidth}
                  height={barHeight}
                  rx={4}
                  fill="#3b82f6"
                  initial={{ width: 0, x: centerX - 2 }}
                  animate={{ width: maleWidth, x: centerX - maleWidth - 2 }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.06,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                />
                {maleWidth > 30 && (
                  <text
                    x={centerX - maleWidth - 2 + 6}
                    y={y + barHeight / 2}
                    dominantBaseline="middle"
                    fontSize={10}
                    fill="white"
                    fontWeight={500}
                  >
                    {item.male.toLocaleString()}
                  </text>
                )}

                <motion.rect
                  x={centerX + 2}
                  y={y}
                  width={femaleWidth}
                  height={barHeight}
                  rx={4}
                  fill="#ec4899"
                  initial={{ width: 0 }}
                  animate={{ width: femaleWidth }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.06,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                />
                {femaleWidth > 30 && (
                  <text
                    x={centerX + 2 + femaleWidth - 6}
                    y={y + barHeight / 2}
                    dominantBaseline="middle"
                    textAnchor="end"
                    fontSize={10}
                    fill="white"
                    fontWeight={500}
                  >
                    {item.female.toLocaleString()}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
