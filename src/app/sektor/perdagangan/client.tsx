"use client";

import { motion } from "motion/react";
import KPICard from "@/components/dashboard/kpi-card";
import ChartWrapper from "@/components/charts/chart-wrapper";
import DataTable from "@/components/dashboard/data-table";
import { InsightBox, KPIInsight } from "@/components/ui/insight-box";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import {
  datasetsToKPIs,
  datasetToDataPoints,
  findDataset,
  createFormatValue,
  getChartTypeForDataset,
  type SupabaseCategory,
} from "@/lib/supabase/sector-queries";

export default function PerdaganganClient({ category }: { category: SupabaseCategory | null }) {
  const datasets = category?.datasets || [];
  const kpis = datasetsToKPIs(datasets);

  const eksporDataset = findDataset(datasets, "ekspor", "export");
  const imporDataset = findDataset(datasets, "impor", "import");
  const neracaDataset = findDataset(datasets, "neraca", "balance");
  const mitraDataset = findDataset(datasets, "mitra", "partner");

  const eksporData = datasetToDataPoints(eksporDataset);
  const imporData = datasetToDataPoints(imporDataset);
  const neracaData = datasetToDataPoints(neracaDataset);

  const eksporFormat = createFormatValue(eksporDataset?.unit || "US$ Miliar");
  const neracaFormat = createFormatValue(neracaDataset?.unit || "US$ Miliar");

  const latestNeraca = neracaData[neracaData.length - 1];
  const prevNeraca = neracaData.length >= 2 ? neracaData[neracaData.length - 2] : null;
  const neracaChange = prevNeraca ? Math.round(((latestNeraca.value - prevNeraca.value) / Math.abs(prevNeraca.value)) * 10000) / 100 : 0;

  const latestEkspor = eksporData[eksporData.length - 1];
  const prevEkspor = eksporData.length >= 2 ? eksporData[eksporData.length - 2] : null;
  const eksporChange = prevEkspor ? Math.round(((latestEkspor.value - prevEkspor.value) / Math.abs(prevEkspor.value)) * 10000) / 100 : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <Link href="/sektor" className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{category?.name || "Kementerian Perdagangan"}</h2>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
            Perdagangan internasional &middot;{" "}
            <a href={eksporDataset?.source_url || "https://satudata.kemendag.go.id"} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">satudata.kemendag.go.id</a>
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {kpis.map((kpi, i) => <KPICard key={i} {...kpi} />)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <KPIInsight
          kpiName="Neraca Perdagangan"
          value={latestNeraca ? neracaFormat(latestNeraca.value) : "-"}
          change={neracaChange}
          whyItMatters="Neraca perdagangan = ekspor dikurangi impor. Surplus (positif) artinya Indonesia menghasilkan lebih banyak uang dari luar negeri. Defisit (negatif) artinya uang keluar lebih banyak."
          realImpact="Surplus = Rupiah lebih stabil, harga barang impor tidak melonjak. Defisit terus-menerus = Rupiah melemah, harga BBM dan bahan bakar naik."
          whatToWatch="Perhatikan tren 3-6 bulan. Surplus sekali tidak cukup &mdash; yang penting konsistensi."
        />
        <KPIInsight
          kpiName="Komoditas Ekspor Utama"
          value={latestEkspor ? eksporFormat(latestEkspor.value) : "-"}
          change={eksporChange}
          whyItMatters="Indonesia adalah produsen terbesar CPO (minyak sawit) dan nikel dunia. Harga komoditas ini langsung mempengaruhi penerimaan negara dan nilai tukar Rupiah."
          realImpact="Harga CPO naik = penerimaan negara naik = RPAK stabil. Harga nikel naik = investasi smelter meningkat = lapangan kerja di Sulawesi dan Maluku bertambah."
          whatToWatch="Waspadai fluktuasi harga komoditas global. Harga CPO bisa turun 30% dalam sebulan jika permintaan China menurun."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {eksporData.length > 0 && imporData.length > 0 && (
          <ChartWrapper
            title="Ekspor vs Impor"
            description={eksporDataset?.unit || "US$ Miliar"}
            data={eksporData}
            color="#10b981"
            secondData={imporData}
            secondColor="#f59e0b"
            secondLabel="Impor"
            sources={[category?.name || "Kemendag"]}
            formatValue={eksporFormat}
          />
        )}
        {neracaData.length > 0 && (
          <ChartWrapper
            title="Neraca Perdagangan"
            description={neracaDataset?.unit || "US$ Miliar"}
            data={neracaData}
            color="#8b5cf6"
            type={getChartTypeForDataset(neracaDataset?.slug || "")}
            sources={[category?.name || "Kemendag"]}
            formatValue={neracaFormat}
          />
        )}
      </div>

      {mitraDataset && mitraDataset.data_points.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Mitra Dagang Utama (US$ Miliar)</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={mitraDataset.data_points.map((dp) => ({ negara: dp.period, ekspor: dp.value, impor: dp.label ? Number(dp.label) : 0 }))} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
              <XAxis dataKey="negara" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} width={40} />
              <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px", fontSize: "12px" }} />
              <Legend />
              <Bar dataKey="ekspor" name="Ekspor" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="impor" name="Impor" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <InsightBox title="Membaca Mitra Dagang" type="analysis">
        <p>
          China adalah mitra dagang terbesar Indonesia dengan ekspor US$ 52,5 miliar. Tapi Indonesia juga <strong>impor lebih banyak dari China</strong> (US$ 68,2 miliar) &mdash; artinya ada defisit perdagangan bilateral.
        </p>
        <p>
          <strong>Buat kamu:</strong> Defisit dengan China artinya Rupiah lebih tertekan terhadap Yuan. Tapi surplus dengan AS dan India membantu menyeimbangkan. Keragaman mitra dagang = ekonomi lebih resilien.
        </p>
      </InsightBox>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {eksporData.length > 0 && <DataTable title="Data Ekspor Bulanan" data={eksporData} headers={["Periode", "Ekspor (US$ Miliar)"]} sources={[category?.name || "Kemendag"]} />}
        {neracaData.length > 0 && <DataTable title="Neraca Perdagangan" data={neracaData} headers={["Periode", "Neraca (US$ Miliar)"]} sources={[category?.name || "Kemendag"]} />}
      </div>
    </div>
  );
}
