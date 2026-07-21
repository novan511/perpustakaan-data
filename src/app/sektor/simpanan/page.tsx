"use client";

import { motion } from "motion/react";
import KPICard from "@/components/dashboard/kpi-card";
import ChartWrapper from "@/components/charts/chart-wrapper";
import DataTable from "@/components/dashboard/data-table";
import { InsightBox, KPIInsight } from "@/components/ui/insight-box";
import { lpsKPIs } from "@/lib/data";
import { bungaPenjaminanRupiah, distribusiSimpanan, indeksKepercayaan } from "@/lib/data/lps";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4"];

export default function SimpananPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <Link href="/sektor" className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">LPS - Lembaga Penjamin Simpanan</h2>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
            Penjaminan simpanan &middot;{" "}
            <a href="https://lps.go.id" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">lps.go.id</a>
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {lpsKPIs.map((kpi, i) => <KPICard key={i} {...kpi} />)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <KPIInsight
          kpiName="Suku Bunga Penjaminan LPS"
          value="4,25%"
          change={0}
          whyItMatters="LPS menjamin simpanan di bank hingga Rp 2 miliar per bank per nasabah. Tapi hanya jika suku bunga yang kamu dapat tidak melebihi batas ini."
          realImpact="Kalau bank menawarkan deposito bunga 6% tapi batas LPS cuma 4,25%, dan bank tutup &mdash; dana kamu TIDAK dijamin LPS. Jangan tergiur bunga tinggi!"
          whatToWatch="Selalu cek batas bunga penjaminan terbaru di lps.go.id sebelum menaruh dana di bank."
        />
        <KPIInsight
          kpiName="Indeks Kepercayaan Konsumen"
          value="106,0"
          change={0.5}
          whyItMatters="Indeks di atas 100 = konsumen optimis terhadap ekonomi. Di bawah 100 = pesimis. Indeks 106 artinya mayoritas masyarakat cukup percaya diri dengan kondisi ekonomi."
          realImpact="Konsumen optimis = belanja lebih banyak = ekonomi tumbuh. Konsumen pesimis = menahan belanja = ekonomi melambat. Ini siklus yang saling mempengaruhi."
          whatToWatch="Jika indeks turun drastis (di bawah 95), itu tanda konsumen mulai khawatir. Siap-siap pengeluaran hemat."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <ChartWrapper title="Suku Bunga Penjaminan (Rupiah)" description="Batas atas bunga (%)" data={bungaPenjaminanRupiah} color="#ec4899" sources={["LPS"]} formatValue={(v) => `${v.toFixed(2)}%`} />
        <ChartWrapper title="Indeks Kepercayaan Konsumen" data={indeksKepercayaan} color="#06b6d4" sources={["LPS"]} formatValue={(v) => v.toFixed(1)} />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Distribusi Simpanan Nasabah</h3>
        <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mb-4">Jumlah juta rekening per kelompok saldo</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={distribusiSimpanan} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
            <XAxis dataKey="period" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} width={40} />
            <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px", fontSize: "12px" }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {distribusiSimpanan.map((_, index) => (<Cell key={index} fill={COLORS[index % COLORS.length]} />))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <InsightBox title="Apa Artinya Ini untuk Kamu?" type="tip">
        <p>
          67,4% rekening simpanan di Indonesia memiliki saldo di bawah Rp 2 juta. Ini menunjukkan mayoritas masyarakat Indonesia masih menabung dalam jumlah kecil.
        </p>
        <p>
          <strong>Untuk kamu yang baru mulai menabung:</strong> Tidak perlu malu dengan saldo kecil. Yang penting rutin menabung dan memahami batas penjaminan LPS agar dana tetap aman.
        </p>
      </InsightBox>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <DataTable title="Suku Bunga Penjaminan" data={bungaPenjaminanRupiah} headers={["Periode", "Bunga (%)"]} sources={["LPS"]} />
        <DataTable title="Indeks Kepercayaan" data={indeksKepercayaan} headers={["Periode", "Indeks"]} sources={["LPS"]} />
      </div>
    </div>
  );
}
