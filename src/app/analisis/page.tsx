"use client";

import { motion } from "motion/react";
import ChartWrapper from "@/components/charts/chart-wrapper";
import { InsightBox } from "@/components/ui/insight-box";
import { pdrbData, inflasiData } from "@/lib/data/bps";
import { biRateHistory } from "@/lib/data/bi";
import { asetPerbankan, nplData } from "@/lib/data/ojk";
import { penerimaanNegara } from "@/lib/data/kemenkeu";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const comparisonData = [
  { period: "2019", pdrb: 16067, inflasi: 2.72, biRate: 5.0 },
  { period: "2020", pdrb: 15438, inflasi: 2.05, biRate: 4.0 },
  { period: "2021", pdrb: 16034, inflasi: 1.87, biRate: 3.5 },
  { period: "2022", pdrb: 17870, inflasi: 4.21, biRate: 5.5 },
  { period: "2023", pdrb: 19535, inflasi: 2.61, biRate: 5.75 },
  { period: "2024", pdrb: 21015, inflasi: 2.12, biRate: 5.75 },
  { period: "2025", pdrb: 22137, inflasi: 1.51, biRate: 5.75 },
];

export default function AnalisisPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Analisis Tren</h2>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">Perbandingan indikator lintas waktu</p>
        </div>
      </div>

      <InsightBox title="Cara Membaca Analisis Tren" type="info">
        <p>
          Grafik perbandingan menunjukkan bagaimana beberapa indikator bergerak bersamaan. Misalnya: saat BI-Rate naik, biasanya pertumbuhan kredit melambat &mdash; ini hubungan normal.
        </p>
        <p>
          <strong>Tips:</strong> Perhatikan saat garis bergerak berlawanan arah. Itu bisa tanda kebijakan tertentu sedang bekerja atau ada shock luar biasa (seperti pandemi 2020).
        </p>
      </InsightBox>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">PDB vs Inflasi vs BI-Rate (2019-2025)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={comparisonData} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
            <XAxis dataKey="period" tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
            <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} width={60} tickFormatter={(v) => `${(v / 1000).toFixed(0)}T`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} width={40} tickFormatter={(v) => `${v}%`} />
            <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px", fontSize: "12px" }} />
            <Legend />
            <Bar yAxisId="left" dataKey="pdrb" name="PDB (Rp T)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="inflasi" name="Inflasi (%)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="biRate" name="BI-Rate (%)" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <InsightBox title="Apa yang Terjadi 2019-2025?" type="analysis">
        <p>
          <strong>2020:</strong> PDB anjlok (pandemi), inflasi turun (permintaan lesu), BI-Rate dipangkas agresif untuk stimulus. <strong>2022:</strong> PDB pulih tajam, tapi inflasi melonjak (perang Rusia-Ukraina, harga BBM global). <strong>2025:</strong> PDB stabil, inflasi terkendali, BI-Rate ditahan.
        </p>
        <p>
          <strong>Pelajaran:</strong> Ekonomi tidak linier. Saat krisis, pemerintah perlu belanja besar (defisit naik). Saat pulih, kebijakan harus hati-hati agar inflasi tidak melonjak.
        </p>
      </InsightBox>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <ChartWrapper title="Inflasi vs BI-Rate" description="Perbandingan 12 bulan terakhir" data={inflasiData.slice(-12)} color="#10b981" secondData={biRateHistory.slice(-12)} secondColor="#ef4444" secondLabel="BI-Rate" sources={["BPS", "Bank Indonesia"]} formatValue={(v) => `${v.toFixed(1)}%`} />
        <ChartWrapper title="PDB vs Penerimaan Negara" data={pdrbData.filter((_, i) => i % 4 === 3)} color="#3b82f6" secondData={penerimaanNegara} secondColor="#8b5cf6" secondLabel="Penerimaan" sources={["BPS", "Kemenkeu"]} formatValue={(v) => `Rp ${v.toLocaleString("id-ID")} T`} />
        <ChartWrapper title="Aset Perbankan vs NPL" data={asetPerbankan.slice(-12)} color="#06b6d4" secondData={nplData.slice(-12)} secondColor="#ef4444" secondLabel="NPL" sources={["OJK"]} formatValue={(v) => v.toLocaleString("id-ID")} />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 overflow-x-auto">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Tabel Perbandingan Makro</h3>
        <table className="w-full min-w-[400px]">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50">
              <th className="text-left text-[10px] font-semibold text-slate-500 px-3 py-2">Tahun</th>
              <th className="text-right text-[10px] font-semibold text-slate-500 px-3 py-2">PDB (Rp T)</th>
              <th className="text-right text-[10px] font-semibold text-slate-500 px-3 py-2">Inflasi</th>
              <th className="text-right text-[10px] font-semibold text-slate-500 px-3 py-2">BI-Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {comparisonData.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                <td className="px-3 py-2 text-xs font-medium text-slate-900 dark:text-white">{row.period}</td>
                <td className="px-3 py-2 text-xs text-right font-semibold text-slate-900 dark:text-white">{row.pdrb.toLocaleString("id-ID")}</td>
                <td className="px-3 py-2 text-xs text-right text-slate-600 dark:text-slate-300">{row.inflasi.toFixed(2)}%</td>
                <td className="px-3 py-2 text-xs text-right text-slate-600 dark:text-slate-300">{row.biRate.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
