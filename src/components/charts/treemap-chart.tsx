"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

interface TreemapProps {
  data: Array<{ name: string; value: number; color?: string }>;
  title: string;
  height?: number;
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
  name: string;
  value: number;
  color: string;
}

const PALETTE = [
  "#6366f1",
  "#8b5cf6",
  "#a78bfa",
  "#c4b5fd",
  "#818cf8",
  "#4f46e5",
  "#7c3aed",
  "#6d28d9",
];

function squarify(
  items: Array<{ name: string; value: number; color: string }>,
  x: number,
  y: number,
  w: number,
  h: number
): Rect[] {
  if (items.length === 0) return [];
  if (items.length === 1) {
    return [{ x, y, w, h, ...items[0] }];
  }

  const total = items.reduce((s, i) => s + i.value, 0);
  const isWide = w >= h;

  let acc = 0;
  let splitIdx = 0;
  let bestRatio = Infinity;

  for (let i = 0; i < items.length; i++) {
    acc += items[i].value;
    const ratio = acc / total;
    const sliceSize = isWide ? w * ratio : h * ratio;
    const remaining = isWide ? h : w;
    const maxItemH = Math.max(
      ...items.slice(0, i + 1).map((it) => {
        const itemW = (it.value / acc) * (isWide ? remaining : sliceSize);
        return isWide
          ? itemW / sliceSize
          : sliceSize / itemW;
      })
    );
    if (maxItemH < bestRatio) {
      bestRatio = maxItemH;
      splitIdx = i;
    }
  }

  const splitFraction = items
    .slice(0, splitIdx + 1)
    .reduce((s, i) => s + i.value, 0) / total;

  let results: Rect[] = [];

  if (isWide) {
    const sliceW = w * splitFraction;
    let cy = y;
    const sliceItems = items.slice(0, splitIdx + 1);
    const sliceTotal = sliceItems.reduce((s, i) => s + i.value, 0);
    for (const item of sliceItems) {
      const itemH = h * (item.value / sliceTotal);
      results.push({ x, y: cy, w: sliceW, h: itemH, ...item });
      cy += itemH;
    }
    results = results.concat(
      squarify(items.slice(splitIdx + 1), x + sliceW, y, w - sliceW, h)
    );
  } else {
    const sliceH = h * splitFraction;
    let cx = x;
    const sliceItems = items.slice(0, splitIdx + 1);
    const sliceTotal = sliceItems.reduce((s, i) => s + i.value, 0);
    for (const item of sliceItems) {
      const itemW = w * (item.value / sliceTotal);
      results.push({ x: cx, y, w: itemW, h: sliceH, ...item });
      cx += itemW;
    }
    results = results.concat(
      squarify(items.slice(splitIdx + 1), x, y + sliceH, w, h - sliceH)
    );
  }

  return results;
}

export default function Treemap({
  data,
  title,
  height = 400,
}: TreemapProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const coloredData = useMemo(
    () =>
      data.map((d, i) => ({
        ...d,
        color: d.color || PALETTE[i % PALETTE.length],
      })),
    [data]
  );

  const rects = useMemo(() => {
    const total = coloredData.reduce((s, d) => s + d.value, 0);
    if (total === 0) return [];
    return squarify(coloredData, 0, 0, 600, height);
  }, [coloredData, height]);

  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900" role="img" aria-label={title}>
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="relative w-full overflow-hidden rounded-lg" style={{ height }}>
        <svg viewBox={`0 0 600 ${height}`} className="h-full w-full">
          {rects.map((rect, i) => {
            const showLabel = rect.w > 60 && rect.h > 30;
            const showValue = rect.w > 60 && rect.h > 45;
            const isHovered = hoveredIdx === i;
            return (
              <g
                key={`${rect.name}-${i}`}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                tabIndex={0}
                role="button"
                aria-label={`${rect.name}: ${rect.value.toLocaleString()}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setHoveredIdx(hoveredIdx === i ? null : i);
                  }
                }}
              >
                <motion.rect
                  x={rect.x}
                  y={rect.y}
                  width={rect.w}
                  height={rect.h}
                  rx={4}
                  fill={rect.color}
                  opacity={hoveredIdx !== null && !isHovered ? 0.5 : 0.85}
                  animate={{
                    opacity: isHovered ? 1 : hoveredIdx !== null ? 0.5 : 0.85,
                    scale: isHovered ? 1.01 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  style={{ transformOrigin: `${rect.x + rect.w / 2}px ${rect.y + rect.h / 2}px` }}
                />
                {showLabel && (
                  <text
                    x={rect.x + 8}
                    y={rect.y + 20}
                    className="pointer-events-none select-none"
                    fill="white"
                    fontSize={13}
                    fontWeight={600}
                  >
                    {rect.name.length > Math.floor(rect.w / 8)
                      ? rect.name.slice(0, Math.floor(rect.w / 8)) + "…"
                      : rect.name}
                  </text>
                )}
                {showValue && (
                  <text
                    x={rect.x + 8}
                    y={rect.y + 38}
                    className="pointer-events-none select-none"
                    fill="rgba(255,255,255,0.8)"
                    fontSize={11}
                  >
                    {rect.value.toLocaleString()}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      {hoveredIdx !== null && rects[hoveredIdx] && (
        <div className="mt-3 rounded-lg bg-gray-50 px-4 py-2 text-sm dark:bg-gray-800">
          <span
            className="mr-2 inline-block h-3 w-3 rounded-full"
            style={{ backgroundColor: rects[hoveredIdx].color }}
          />
          <span className="font-medium text-gray-900 dark:text-white">
            {rects[hoveredIdx].name}
          </span>
          <span className="ml-2 text-gray-500 dark:text-gray-400">
            {rects[hoveredIdx].value.toLocaleString()}
          </span>
          <span className="ml-2 text-gray-400 dark:text-gray-500">
            ({((rects[hoveredIdx].value / maxValue) * 100).toFixed(1)}%)
          </span>
        </div>
      )}
    </div>
  );
}
