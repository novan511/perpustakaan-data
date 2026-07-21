"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

interface SankeyProps {
  nodes: Array<{ name: string }>;
  links: Array<{ source: number; target: number; value: number }>;
  title: string;
  height?: number;
}

interface LayoutNode {
  x: number;
  y: number;
  h: number;
  name: string;
  index: number;
}

interface LayoutLink {
  sourceIdx: number;
  targetIdx: number;
  value: number;
  sy: number;
  ty: number;
  sh: number;
  th: number;
}

export default function Sankey({
  nodes,
  links,
  title,
  height = 400,
}: SankeyProps) {
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);

  const width = 800;
  const nodeWidth = 18;
  const padding = 40;
  const nodePadding = 16;

  const layout = useMemo(() => {
    if (!nodes.length || !links.length) {
      return { nodes: [] as LayoutNode[], links: [] as LayoutLink[] };
    }

    const nodeCols = new Map<number, number>();
    const visited = new Set<number>();

    function assignCol(idx: number, col: number) {
      if (visited.has(idx)) return;
      visited.add(idx);
      nodeCols.set(idx, col);
      for (const l of links) {
        if (l.source === idx && !nodeCols.has(l.target)) {
          assignCol(l.target, col + 1);
        }
        if (l.target === idx && !nodeCols.has(l.source)) {
          assignCol(l.source, col - 1);
        }
      }
    }

    nodes.forEach((_, i) => {
      if (!visited.has(i)) assignCol(i, 0);
    });

    const minCol = Math.min(...Array.from(nodeCols.values()));
    const maxCol = Math.max(...Array.from(nodeCols.values()));
    const cols = maxCol - minCol + 1;

    const colX: Record<number, number> = {};
    const colWidth = (width - 2 * padding - nodeWidth) / Math.max(cols - 1, 1);
    for (let c = minCol; c <= maxCol; c++) {
      colX[c] = padding + (c - minCol) * colWidth;
    }

    const colGroups = new Map<number, number[]>();
    nodeCols.forEach((col, idx) => {
      if (!colGroups.has(col)) colGroups.set(col, []);
      colGroups.get(col)!.push(idx);
    });

    const nodeValues = new Map<number, number>();
    nodes.forEach((_, i) => {
      const outVal = links
        .filter((l) => l.source === i)
        .reduce((s, l) => s + l.value, 0);
      const inVal = links
        .filter((l) => l.target === i)
        .reduce((s, l) => s + l.value, 0);
      nodeValues.set(i, Math.max(outVal, inVal, 1));
    });

    const layoutNodes: LayoutNode[] = [];
    colGroups.forEach((nodeIndices, col) => {
      const totalVal = nodeIndices.reduce((s, i) => s + nodeValues.get(i)!, 0);
      const totalH =
        height - 2 * padding - (nodeIndices.length - 1) * nodePadding;
      const scale = totalH / totalVal;

      let cy = padding;
      for (const idx of nodeIndices) {
        const h = nodeValues.get(idx)! * scale;
        layoutNodes.push({
          x: colX[col],
          y: cy,
          h,
          name: nodes[idx].name,
          index: idx,
        });
        cy += h + nodePadding;
      }
    });

    const nodeYOffset = new Map<number, number>();
    const nodeInOffset = new Map<number, number>();
    layoutNodes.forEach((n) => {
      nodeYOffset.set(n.index, n.y);
      nodeInOffset.set(n.index, n.y);
    });

    const layoutLinks: LayoutLink[] = [];
    for (const l of links) {
      const srcNode = layoutNodes.find((n) => n.index === l.source);
      const tgtNode = layoutNodes.find((n) => n.index === l.target);
      if (!srcNode || !tgtNode) continue;

      const srcScale = srcNode.h / (nodeValues.get(l.source) || 1);
      const tgtScale = tgtNode.h / (nodeValues.get(l.target) || 1);

      const sy = nodeYOffset.get(l.source)!;
      const ty = nodeInOffset.get(l.target)!;

      nodeYOffset.set(l.source, sy + l.value * srcScale);
      nodeInOffset.set(l.target, ty + l.value * tgtScale);

      layoutLinks.push({
        sourceIdx: l.source,
        targetIdx: l.target,
        value: l.value,
        sy,
        ty,
        sh: l.value * srcScale,
        th: l.value * tgtScale,
      });
    }

    return { nodes: layoutNodes, links: layoutLinks };
  }, [nodes, links, height]);

  if (!layout.nodes.length || !layout.links.length) {
    return (
      <div
        className="w-full rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900"
        role="img"
        aria-label={title}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">No data available.</p>
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900"
      role="img"
      aria-label={title}
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full"
          style={{ minWidth: 500 }}
        >
          {layout.links.map((link, i) => {
            const srcNode = layout.nodes.find((n) => n.index === link.sourceIdx);
            const tgtNode = layout.nodes.find((n) => n.index === link.targetIdx);
            if (!srcNode || !tgtNode) return null;

            const sx = srcNode.x + nodeWidth;
            const tx = tgtNode.x;

            const sy0 = link.sy;
            const sy1 = link.sy + link.sh;
            const ty0 = link.ty;
            const ty1 = link.ty + link.th;
            const mx = (sx + tx) / 2;

            const path = [
              `M${sx},${sy0}`,
              `C${mx},${sy0} ${mx},${ty0} ${tx},${ty0}`,
              `L${tx},${ty1}`,
              `C${mx},${ty1} ${mx},${sy1} ${sx},${sy1}`,
              "Z",
            ].join(" ");

            const opacity = hoveredLink !== null && hoveredLink !== i ? 0.15 : 0.35;

            return (
              <motion.path
                key={i}
                d={path}
                fill="#6366f1"
                fillOpacity={opacity}
                stroke="none"
                onMouseEnter={() => setHoveredLink(i)}
                onMouseLeave={() => setHoveredLink(null)}
                animate={{ fillOpacity: opacity }}
                transition={{ duration: 0.2 }}
                className="cursor-pointer"
                tabIndex={0}
                role="button"
                aria-label={`${layout.nodes.find((n) => n.index === link.sourceIdx)?.name} to ${layout.nodes.find((n) => n.index === link.targetIdx)?.name}: ${link.value.toLocaleString()}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setHoveredLink(hoveredLink === i ? null : i);
                  }
                }}
              />
            );
          })}
          {layout.nodes.map((node) => (
            <g key={node.index}>
              <rect
                x={node.x}
                y={node.y}
                width={nodeWidth}
                height={node.h}
                rx={3}
                fill="#4f46e5"
              />
              <text
                x={node.x < width / 2 ? node.x - 6 : node.x + nodeWidth + 6}
                y={node.y + node.h / 2}
                dominantBaseline="middle"
                textAnchor={node.x < width / 2 ? "end" : "start"}
                fontSize={12}
                fontWeight={500}
                fill="currentColor"
                className="fill-gray-700 dark:fill-gray-200"
              >
                {node.name}
              </text>
            </g>
          ))}
          {hoveredLink !== null && layout.links[hoveredLink] && (
            <text
              x={width / 2}
              y={20}
              textAnchor="middle"
              fontSize={13}
              fontWeight={600}
              className="fill-gray-700 dark:fill-gray-200"
            >
              {layout.links[hoveredLink].value.toLocaleString()}
            </text>
          )}
        </svg>
      </div>
    </div>
  );
}
