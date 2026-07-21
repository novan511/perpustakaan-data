"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

interface WordCloudProps {
  data: Array<{ text: string; value: number }>;
  title: string;
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
  "#0ea5e9",
  "#d946ef",
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

interface PlacedWord {
  text: string;
  value: number;
  fontSize: number;
  color: string;
  x: number;
  y: number;
  rotation: number;
}

function estimateBBox(
  word: PlacedWord
): { x: number; y: number; w: number; h: number } {
  const rotationRad = (word.rotation * Math.PI) / 180;
  const textWidth = word.text.length * word.fontSize * 0.6;
  const textHeight = word.fontSize * 1.2;

  const cos = Math.abs(Math.cos(rotationRad));
  const sin = Math.abs(Math.sin(rotationRad));
  const w = textWidth * cos + textHeight * sin;
  const h = textWidth * sin + textHeight * cos;

  return {
    x: word.x - w / 2,
    y: word.y - h / 2,
    w,
    h,
  };
}

function bboxesOverlap(
  a: { x: number; y: number; w: number; h: number },
  b: { x: number; y: number; w: number; h: number }
): boolean {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function spiralPlace(
  sorted: Array<{ text: string; value: number }>,
  maxValue: number,
  svgWidth: number,
  svgHeight: number
): PlacedWord[] {
  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2;
  const rand = seededRandom(42);
  const placed: PlacedWord[] = [];
  const placedBBoxes: Array<{ x: number; y: number; w: number; h: number }> = [];

  for (const item of sorted) {
    const ratio = item.value / maxValue;
    const fontSize = 12 + ratio * 32;
    const color = PALETTE[hashString(item.text) % PALETTE.length];

    const angleRange = 30;
    const angle = (rand() - 0.5) * angleRange * (Math.PI / 180);

    const word: PlacedWord = {
      text: item.text,
      value: item.value,
      fontSize,
      color,
      x: centerX,
      y: centerY,
      rotation: (angle * 180) / Math.PI,
    };

    let placed_ok = false;
    const maxAttempts = 100;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const t = attempt * 0.5;
      const spiralAngle = t;
      const radius = t * 2.5;
      const px = centerX + radius * Math.cos(spiralAngle);
      const py = centerY + radius * Math.sin(spiralAngle) * 0.6;

      const candidate = { ...word, x: px, y: py };
      const bbox = estimateBBox(candidate);

      if (
        bbox.x < 0 ||
        bbox.y < 0 ||
        bbox.x + bbox.w > svgWidth ||
        bbox.y + bbox.h > svgHeight
      ) {
        continue;
      }

      let collision = false;
      for (const existingBBox of placedBBoxes) {
        if (bboxesOverlap(bbox, existingBBox)) {
          collision = true;
          break;
        }
      }

      if (!collision) {
        word.x = px;
        word.y = py;
        placed.push(word);
        placedBBoxes.push(bbox);
        placed_ok = true;
        break;
      }
    }

    if (!placed_ok) {
      continue;
    }
  }

  return placed;
}

export default function WordCloud({
  data,
  title,
  height = 300,
}: WordCloudProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const sorted = useMemo(
    () => [...data].sort((a, b) => b.value - a.value),
    [data]
  );

  const maxValue = useMemo(
    () => Math.max(...sorted.map((d) => d.value), 1),
    [sorted]
  );

  const words = useMemo(
    () => spiralPlace(sorted, maxValue, 800, height),
    [sorted, maxValue, height]
  );

  return (
    <div
      className="w-full rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900"
      role="img"
      aria-label={title}
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="w-full overflow-hidden rounded-lg" style={{ height }}>
        <svg viewBox={`0 0 800 ${height}`} className="h-full w-full">
          {words.map((word, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <motion.text
                key={`${word.text}-${i}`}
                x={word.x}
                y={word.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={word.fontSize}
                fontWeight={word.fontSize > 28 ? 700 : word.fontSize > 20 ? 600 : 500}
                fill={word.color}
                className="cursor-pointer select-none"
                tabIndex={0}
                role="button"
                aria-label={`${word.text}: ${word.value.toLocaleString()}`}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setHoveredIdx(hoveredIdx === i ? null : i);
                  }
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: hoveredIdx !== null && !isHovered ? 0.3 : 1,
                  scale: isHovered ? 1.15 : 1,
                }}
                transition={{
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                }}
                style={{
                  transformOrigin: `${word.x}px ${word.y}px`,
                  transform: `rotate(${word.rotation}deg)`,
                }}
              >
                {word.text}
              </motion.text>
            );
          })}
        </svg>
      </div>
      {hoveredIdx !== null && words[hoveredIdx] && (
        <div className="mt-3 rounded-lg bg-gray-50 px-4 py-2 text-sm dark:bg-gray-800">
          <span className="font-medium text-gray-900 dark:text-white">
            {words[hoveredIdx].text}
          </span>
          <span className="ml-2 text-gray-500 dark:text-gray-400">
            {words[hoveredIdx].value.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}
