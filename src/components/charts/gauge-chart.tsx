"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

interface GaugeProps {
  value: number;
  max: number;
  label: string;
  title: string;
  color?: string;
}

export default function Gauge({
  value,
  max,
  label,
  title,
  color,
}: GaugeProps) {
  const ratio = useMemo(() => (max === 0 ? 0 : Math.min(Math.max(value / max, 0), 1)), [value, max]);

  const getGaugeColor = (r: number): string => {
    if (color) return color;
    if (r < 0.4) return "#10b981";
    if (r < 0.7) return "#f59e0b";
    return "#ef4444";
  };

  const strokeColor = getGaugeColor(ratio);

  const size = 200;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;

  const startAngle = -210;
  const endAngle = 30;
  const totalAngle = endAngle - startAngle;

  const polarToCartesian = (angleDeg: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  };

  const describeArc = (start: number, end: number) => {
    const s = polarToCartesian(start);
    const e = polarToCartesian(end);
    const largeArc = end - start > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${largeArc} 1 ${e.x} ${e.y}`;
  };

  const bgPath = describeArc(startAngle, endAngle);
  const fillEnd = startAngle + totalAngle * ratio;
  const fillPath = ratio > 0.01 ? describeArc(startAngle, fillEnd) : "";

  const tickCount = 5;
  const ticks = (() => {
    const arr = [];
    for (let i = 0; i <= tickCount; i++) {
      const angle = startAngle + (totalAngle * i) / tickCount;
      const inner = polarToCartesian(angle);
      const outerRadius = radius + strokeWidth / 2 + 4;
      const rad = ((angle - 90) * Math.PI) / 180;
      const outer = {
        x: cx + outerRadius * Math.cos(rad),
        y: cy + outerRadius * Math.sin(rad),
      };
      const labelRadius = radius + strokeWidth / 2 + 16;
      const labelPos = {
        x: cx + labelRadius * Math.cos(rad),
        y: cy + labelRadius * Math.sin(rad),
      };
      arr.push({
        inner,
        outer,
        label: labelPos,
        text: Math.round((max * i) / tickCount),
      });
    }
    return arr;
  })();

  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900" role="img" aria-label={`${title}: ${value} of ${max}`}>
      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="flex flex-col items-center">
        <svg
          width={size + 40}
          height={size / 2 + 50}
          viewBox={`-20 -10 ${size + 40} ${size / 2 + 50}`}
          className="overflow-visible"
        >
          <path
            d={bgPath}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="text-gray-100 dark:text-gray-800"
          />

          {fillPath && (
            <motion.path
              d={fillPath}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          )}

          {ticks.map((tick, i) => (
            <g key={i}>
              <line
                x1={tick.inner.x}
                y1={tick.inner.y}
                x2={tick.outer.x}
                y2={tick.outer.y}
                stroke="currentColor"
                strokeWidth={1.5}
                className="text-gray-300 dark:text-gray-600"
              />
              <text
                x={tick.label.x}
                y={tick.label.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={9}
                className="fill-gray-400 dark:fill-gray-500"
              >
                {tick.text}
              </text>
            </g>
          ))}

          <text
            x={cx}
            y={cy - 4}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={28}
            fontWeight={700}
            fill="currentColor"
            className="fill-gray-900 dark:fill-white"
          >
            {value.toLocaleString()}
          </text>
          <text
            x={cx}
            y={cy + 20}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={12}
            fill="currentColor"
            className="fill-gray-500 dark:fill-gray-400"
          >
            {label}
          </text>
        </svg>
      </div>
    </div>
  );
}
