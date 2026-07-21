"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

interface DonutProps {
  data: Array<{ name: string; value: number; color?: string }>;
  title: string;
  centerLabel?: string;
  centerValue?: string;
  height?: number;
}

const PALETTE = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#ef4444",
  "#14b8a6",
  "#f97316",
  "#a855f7",
];

export default function Donut({
  data,
  title,
  centerLabel,
  centerValue,
}: DonutProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const coloredData = useMemo(
    () =>
      data.map((d, i) => ({
        ...d,
        color: d.color || PALETTE[i % PALETTE.length],
      })),
    [data]
  );

  const total = useMemo(
    () => coloredData.reduce((s, d) => s + d.value, 0),
    [coloredData]
  );

  const radius = 90;
  const strokeWidth = 32;
  const circumference = 2 * Math.PI * radius;

  const segments = useMemo(() => {
    const cumulatives = coloredData.reduce<number[]>((acc, d) => {
      const prev = acc.length > 0 ? acc[acc.length - 1] : 0;
      acc.push(prev + d.value);
      return acc;
    }, []);

    return coloredData.map((d, i) => {
      const fraction = total > 0 ? d.value / total : 0;
      const dashLen = fraction * circumference;
      const prev = i > 0 ? cumulatives[i - 1] : 0;
      const dashOffset = -(prev / total) * circumference;
      return { ...d, dashLen, dashOffset, fraction };
    });
  }, [coloredData, total, circumference]);

  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900" role="img" aria-label={title}>
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-8">
        <div
          className="relative flex-shrink-0"
          style={{ width: radius * 2 + strokeWidth, height: radius * 2 + strokeWidth }}
        >
          <svg
            width={radius * 2 + strokeWidth}
            height={radius * 2 + strokeWidth}
            viewBox={`0 0 ${radius * 2 + strokeWidth} ${radius * 2 + strokeWidth}`}
          >
            {segments.map((seg, i) => {
              const isHovered = hoveredIdx === i;
              return (
                <motion.circle
                  key={i}
                  cx={radius + strokeWidth / 2}
                  cy={radius + strokeWidth / 2}
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={isHovered ? strokeWidth + 6 : strokeWidth}
                  strokeDasharray={`${seg.dashLen} ${circumference - seg.dashLen}`}
                  strokeDashoffset={seg.dashOffset}
                  strokeLinecap="round"
                  opacity={
                    hoveredIdx !== null && !isHovered ? 0.4 : 1
                  }
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${seg.name}: ${(seg.fraction * 100).toFixed(1)}%`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setHoveredIdx(hoveredIdx === i ? null : i);
                    }
                  }}
                  className="cursor-pointer transition-all"
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={{
                    strokeDasharray: `${seg.dashLen} ${circumference - seg.dashLen}`,
                    strokeDashoffset: seg.dashOffset,
                    opacity: hoveredIdx !== null && !isHovered ? 0.4 : 1,
                    strokeWidth: isHovered ? strokeWidth + 6 : strokeWidth,
                  }}
                  transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                  style={{
                    transformOrigin: "center",
                    transform: "rotate(-90deg)",
                  }}
                />
              );
            })}
          </svg>
          {(centerLabel || centerValue) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {centerValue && (
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {centerValue}
                </span>
              )}
              {centerLabel && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {centerLabel}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 sm:flex-col">
          {segments.map((seg, i) => (
            <div
              key={i}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <span
                className="h-3 w-3 flex-shrink-0 rounded-full"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-sm text-gray-700 dark:text-gray-200">
                {seg.name}
              </span>
              <span className="text-sm text-gray-400 dark:text-gray-500">
                {(seg.fraction * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
