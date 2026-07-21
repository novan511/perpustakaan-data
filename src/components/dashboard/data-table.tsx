"use client";

import { DataPoint } from "@/types";
import { Download } from "lucide-react";
import { useState } from "react";

interface DataTableProps {
  title: string;
  description?: string;
  data: DataPoint[];
  headers?: string[];
  sources?: string[];
}

export default function DataTable({
  title,
  description,
  data,
  headers = ["Periode", "Nilai"],
  sources,
}: DataTableProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedData = showAll ? data : data.slice(-10);

  const handleExportCSV = () => {
    const csv = [headers.join(",")];
    data.forEach((row) => {
      csv.push(`"${row.period}",${row.value}${row.label ? `,"${row.label}"` : ""}`);
    });
    const blob = new Blob([csv.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "_").toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "_").toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="flex items-start justify-between p-5 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {title}
          </h3>
          {description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Download className="w-3 h-3" />
            CSV
          </button>
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Download className="w-3 h-3" />
            JSON
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full" aria-label={title}>
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50">
              <th className="text-left text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-2.5">
                {headers[0]}
              </th>
              <th className="text-right text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-2.5">
                {headers[1]}
              </th>
              {data[0]?.label && (
                <th className="text-right text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-2.5">
                  Detail
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {displayedData.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
              >
                <td className="px-5 py-2.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                  {row.period}
                </td>
                <td className="px-5 py-2.5 text-xs text-right font-semibold text-slate-900 dark:text-white">
                  {row.value.toLocaleString("id-ID")}
                </td>
                {row.label && (
                  <td className="px-5 py-2.5 text-xs text-right text-slate-500 dark:text-slate-400">
                    {row.label}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length > 10 && (
        <div className="border-t border-slate-100 dark:border-slate-800 px-5 py-2.5">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-medium text-red-500 hover:text-red-600 transition-colors"
          >
            {showAll ? "Tampilkan lebih sedikit" : `Tampilkan semua (${data.length} data)`}
          </button>
        </div>
      )}

      {sources && sources.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-800/30 px-5 py-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400 dark:text-slate-500">Sumber:</span>
            {sources.map((source, i) => (
              <span
                key={i}
                className="text-[10px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700"
              >
                {source}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
