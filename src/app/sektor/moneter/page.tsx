"use client";

import { motion } from "motion/react";
import KPICard from "@/components/dashboard/kpi-card";
import ChartWrapper from "@/components/charts/chart-wrapper";
import DataTable from "@/components/dashboard/data-table";
import { InsightBox, KPIInsight } from "@/components/ui/insight-box";
import { biKPIs } from "@/lib/data";
import { biRateHistory, jisdorData, cadanganDevisaData } from "@/lib/data/bi";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MoneterPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <Link href="/sektor" className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Bank Indonesia</h2>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
            Kebijakan moneter &middot;{" "}
            <a href="https://www.bi.go.id/id/statistik/" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">bi.go.id</a>
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {biKPIs.map((kpi, i) => <KPICard key={i} {...kpi} />)}
      </div>

      <InsightBox title="Tentang Bank Indonesia" type="info">
        <p>
          Bank Indonesia adalah bank sentral yang mengatur <strong>kebijakan moneter</strong> Indonesia. Tugas utamanya: menjaga stabilitas nilai tukar Rupiah dan mengendalikan inflasi melalui suku bunga acuan.
        </p>
      </InsightBox>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <KPIInsight
          kpiName="BI-Rate (Suku Bunga Acuan)"
          value="5,75%"
          change={0}
          whyItMatters="BI-Rate adalah &quot;thermostat&quot; ekonomi Indonesia. BI menaikkan suku bunga untuk mendinginkan ekonomi (mengendalikan inflasi), dan menurunkannya untuk memanaskan ekonomi (mendorong pertumbuhan)."
          realImpact="KPR kamu, cicilan mobil, bunga kartu kredit &mdash; semuanya dipengaruhi BI-Rate. BI-Rate naik 0,25% = cicilan KPR naik sekitar Rp 150-300 ribu/bulan untuk pinjaman Rp 500 juta."
          whatToWatch="Jika BI-Rate naik tajam (lebih dari 1% dalam setahun), artinya BI sedang &quot;rem mendadak&quot; karena inflasi tinggi. Siap-siap biaya pinjaman melonjak."
        />
        <KPIInsight
          kpiName="Kurs JISDOR (USD/IDR)"
          value="Rp 15.850"
          change={1.2}
          whyItMatters="JISDOR adalah kurs referensi transaksi valas harian. Kurs ini menentukan berapa Rupiah yang kamu butuhkan untuk beli dolar. Kurs naik = Rupiah lemah = barang impor mahal."
          realImpact="Beli iPhone 15 Pro Max: di harga USD 1.199, kalau kurs Rp 15.500 = Rp 18,6 juta. Kalau kurs Rp 16.000 = Rp 19,2 juta. Beda Rp 600 ribu cuma gara-gara kurs."
          whatToWatch="Kurs di atas Rp 16.500 sudah masuk zona waspada. BI akan jual cadangan devisa untuk stabilkan kurs."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <ChartWrapper title="Riwayat BI-Rate" description="Suku bunga acuan (%)" data={biRateHistory} color="#ef4444" sources={["Bank Indonesia"]} formatValue={(v) => `${v.toFixed(2)}%`} />
        <ChartWrapper title="Kurs JISDOR (USD/IDR)" description="Referensi nilai tukar" data={jisdorData} color="#f59e0b" sources={["Bank Indonesia"]} formatValue={(v) => `Rp ${v.toLocaleString("id-ID")}`} />
        <ChartWrapper title="Cadangan Devisa" description="US$ Miliar" data={cadanganDevisaData} color="#10b981" sources={["Bank Indonesia"]} formatValue={(v) => `US$ ${v.toFixed(1)} Miliar`} />
      </div>

      <InsightBox title="Membaca Cadangan Devisa" type="analysis">
        <p>
          Cadangan devisa adalah &quot;tabungan&quot; Indonesia dalam mata uang asing. Cadangan devisa tinggi = Indonesia punya bantalan kuat jika terjadi krisis ekonomi global.
        </p>
        <p>
          <strong>Buat kamu:</strong> Cadangan devisa US$ 155,6 miliar cukup kuat untuk menjamin stabilitas Rupiah dalam jangka pendek. Tapi jika terus turun selama 3-6 bulan berturut-turut, itu tanda BI sedang intens intervensi pasar.
        </p>
      </InsightBox>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <DataTable title="Riwayat BI-Rate" data={biRateHistory} sources={["Bank Indonesia"]} />
        <DataTable title="Kurs JISDOR" data={jisdorData} sources={["Bank Indonesia"]} />
      </div>
    </div>
  );
}
