"use client";

import { motion } from "motion/react";
import KPICard from "@/components/dashboard/kpi-card";
import ChartWrapper from "@/components/charts/chart-wrapper";
import DataTable from "@/components/dashboard/data-table";
import { InsightBox, KPIInsight } from "@/components/ui/insight-box";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  datasetsToKPIs,
  datasetToDataPoints,
  findDataset,
  createFormatValue,
  getChartTypeForDataset,
  type SupabaseCategory,
} from "@/lib/supabase/sector-queries";

export default function MoneterClient({ category }: { category: SupabaseCategory | null }) {
  const datasets = category?.datasets || [];
  const kpis = datasetsToKPIs(datasets);

  const biRateDataset = findDataset(datasets, "bi-rate", "suku-bunga");
  const jisdorDataset = findDataset(datasets, "jisdor", "kurs");
  const cadanganDevisaDataset = findDataset(datasets, "cadangan-devisa");

  const biRateData = datasetToDataPoints(biRateDataset);
  const jisdorData = datasetToDataPoints(jisdorDataset);
  const cadanganDevisaData = datasetToDataPoints(cadanganDevisaDataset);

  const biRateFormat = createFormatValue(biRateDataset?.unit || "%");
  const jisdorFormat = createFormatValue(jisdorDataset?.unit || "Rp");
  const cadanganFormat = createFormatValue(cadanganDevisaDataset?.unit || "US$ Miliar");

  const latestBiRate = biRateData[biRateData.length - 1];
  const latestJisdor = jisdorData[jisdorData.length - 1];

  const prevBiRate = biRateData.length >= 2 ? biRateData[biRateData.length - 2] : null;
  const prevJisdor = jisdorData.length >= 2 ? jisdorData[jisdorData.length - 2] : null;

  const biRateChange = prevBiRate ? Math.round(((latestBiRate.value - prevBiRate.value) / Math.abs(prevBiRate.value)) * 10000) / 100 : 0;
  const jisdorChange = prevJisdor ? Math.round(((latestJisdor.value - prevJisdor.value) / Math.abs(prevJisdor.value)) * 10000) / 100 : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <Link href="/sektor" className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{category?.name || "Bank Indonesia"}</h2>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
            Kebijakan moneter &middot;{" "}
            <a href={biRateDataset?.source_url || "https://www.bi.go.id/id/statistik/"} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">bi.go.id</a>
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {kpis.map((kpi, i) => <KPICard key={i} {...kpi} />)}
      </div>

      <InsightBox title="Tentang Bank Indonesia" type="info">
        <p>
          Bank Indonesia adalah bank sentral yang mengatur <strong>kebijakan moneter</strong> Indonesia. Tugas utamanya: menjaga stabilitas nilai tukar Rupiah dan mengendalikan inflasi melalui suku bunga acuan.
        </p>
      </InsightBox>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <KPIInsight
          kpiName="BI-Rate (Suku Bunga Acuan)"
          value={latestBiRate ? biRateFormat(latestBiRate.value) : "-"}
          change={biRateChange}
          whyItMatters="BI-Rate adalah &quot;thermostat&quot; ekonomi Indonesia. BI menaikkan suku bunga untuk mendinginkan ekonomi (mengendalikan inflasi), dan menurunkannya untuk memanaskan ekonomi (mendorong pertumbuhan)."
          realImpact="KPR kamu, cicilan mobil, bunga kartu kredit &mdash; semuanya dipengaruhi BI-Rate. BI-Rate naik 0,25% = cicilan KPR naik sekitar Rp 150-300 ribu/bulan untuk pinjaman Rp 500 juta."
          whatToWatch="Jika BI-Rate naik tajam (lebih dari 1% dalam setahun), artinya BI sedang &quot;rem mendadak&quot; karena inflasi tinggi. Siap-siap biaya pinjaman melonjak."
        />
        <KPIInsight
          kpiName="Kurs JISDOR (USD/IDR)"
          value={latestJisdor ? jisdorFormat(latestJisdor.value) : "-"}
          change={jisdorChange}
          whyItMatters="JISDOR adalah kurs referensi transaksi valas harian. Kurs ini menentukan berapa Rupiah yang kamu butuhkan untuk beli dolar. Kurs naik = Rupiah lemah = barang impor mahal."
          realImpact="Beli iPhone 15 Pro Max: di harga USD 1.199, kalau kurs Rp 15.500 = Rp 18,6 juta. Kalau kurs Rp 16.000 = Rp 19,2 juta. Beda Rp 600 ribu cuma gara-gara kurs."
          whatToWatch="Kurs di atas Rp 16.500 sudah masuk zona waspada. BI akan jual cadangan devisa untuk stabilkan kurs."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {biRateData.length > 0 && (
          <ChartWrapper
            title="Riwayat BI-Rate"
            description={biRateDataset?.unit || "Suku bunga acuan (%)"}
            data={biRateData}
            color="#ef4444"
            type={getChartTypeForDataset(biRateDataset?.slug || "")}
            sources={[category?.name || "Bank Indonesia"]}
            formatValue={biRateFormat}
          />
        )}
        {jisdorData.length > 0 && (
          <ChartWrapper
            title="Kurs JISDOR (USD/IDR)"
            description={jisdorDataset?.unit || "Referensi nilai tukar"}
            data={jisdorData}
            color="#f59e0b"
            sources={[category?.name || "Bank Indonesia"]}
            formatValue={jisdorFormat}
          />
        )}
        {cadanganDevisaData.length > 0 && (
          <ChartWrapper
            title="Cadangan Devisa"
            description={cadanganDevisaDataset?.unit || "US$ Miliar"}
            data={cadanganDevisaData}
            color="#10b981"
            sources={[category?.name || "Bank Indonesia"]}
            formatValue={cadanganFormat}
          />
        )}
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
        {biRateData.length > 0 && <DataTable title="Riwayat BI-Rate" data={biRateData} sources={[category?.name || "Bank Indonesia"]} />}
        {jisdorData.length > 0 && <DataTable title="Kurs JISDOR" data={jisdorData} sources={[category?.name || "Bank Indonesia"]} />}
      </div>
    </div>
  );
}
