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

export default function PerbankanClient({ category }: { category: SupabaseCategory | null }) {
  const datasets = category?.datasets || [];
  const kpis = datasetsToKPIs(datasets);

  const asetDataset = findDataset(datasets, "aset", "asset");
  const nplDataset = findDataset(datasets, "npl", "bermasalah");
  const kreditDataset = findDataset(datasets, "kredit", "credit", "pertumbuhan");

  const asetData = datasetToDataPoints(asetDataset);
  const nplData = datasetToDataPoints(nplDataset);
  const kreditData = datasetToDataPoints(kreditDataset);

  const asetFormat = createFormatValue(asetDataset?.unit || "Rp T");
  const nplFormat = createFormatValue(nplDataset?.unit || "%");
  const kreditFormat = createFormatValue(kreditDataset?.unit || "%");

  const latestAset = asetData[asetData.length - 1];
  const latestNpl = nplData[nplData.length - 1];

  const prevAset = asetData.length >= 2 ? asetData[asetData.length - 2] : null;
  const prevNpl = nplData.length >= 2 ? nplData[nplData.length - 2] : null;

  const asetChange = prevAset ? Math.round(((latestAset.value - prevAset.value) / Math.abs(prevAset.value)) * 10000) / 100 : 0;
  const nplChange = prevNpl ? Math.round(((latestNpl.value - prevNpl.value) / Math.abs(prevNpl.value)) * 10000) / 100 : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <Link href="/sektor" className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{category?.name || "OJK - Otoritas Jasa Keuangan"}</h2>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
            Statistik perbankan &middot;{" "}
            <a href={asetDataset?.source_url || "https://www.ojk.go.id"} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">ojk.go.id</a>
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {kpis.map((kpi, i) => <KPICard key={i} {...kpi} />)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <KPIInsight
          kpiName="Total Aset Perbankan"
          value={latestAset ? asetFormat(latestAset.value) : "-"}
          change={asetChange}
          whyItMatters="Aset perbankan = total uang yang dikelola seluruh bank di Indonesia. Pertumbuhan aset = ekonomi moneter membesar, lebih banyak uang beredar di sistem."
          realImpact="Aset naik 8% artinya bank lebih percaya diri menyalurkan kredit. Untuk kamu: peluang disetujui KPR, kredit usaha, atau pinjaman lain lebih terbuka."
          whatToWatch="Jika aset tumbuh tapi kredit macet juga naik, bank mungkin terlalu agresif memberi pinjaman."
        />
        <KPIInsight
          kpiName="NPL (Kredit Bermasalah)"
          value={latestNpl ? nplFormat(latestNpl.value) : "-"}
          change={nplChange}
          whyItMatters="NPL = persentase kredit yang tidak dibayar tepat waktu. NPL turun = kualitas pinjaman membaik, bank sehat. NPL naik = banyak peminjam gagal bayar."
          realImpact="NPL 2,24% artinya dari Rp 100 triliun kredit yang disalurkan bank, Rp 2,24 triliun bermasalah. Masih dalam batas aman (threshold OJK: 5%)."
          whatToWatch="Jika NPL naik di atas 3%, mulai waspada. Di atas 5% = bank mulai hati-hati memberi kredit baru."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {asetData.length > 0 && (
          <ChartWrapper
            title="Total Aset Perbankan"
            description={asetDataset?.unit || "Rp T"}
            data={asetData}
            color="#06b6d4"
            type={getChartTypeForDataset(asetDataset?.slug || "")}
            sources={[category?.name || "OJK"]}
            formatValue={asetFormat}
          />
        )}
        {nplData.length > 0 && (
          <ChartWrapper
            title="NPL (Kredit Bermasalah)"
            description={nplDataset?.unit || "%"}
            data={nplData}
            color="#f59e0b"
            sources={[category?.name || "OJK"]}
            formatValue={nplFormat}
          />
        )}
        {kreditData.length > 0 && (
          <ChartWrapper
            title="Pertumbuhan Kredit"
            description={kreditDataset?.unit || "YoY %"}
            data={kreditData}
            color="#10b981"
            type="bar"
            sources={[category?.name || "OJK"]}
            formatValue={kreditFormat}
          />
        )}
      </div>

      <InsightBox title="Memahami Pertumbuhan Kredit" type="analysis">
        <p>
          Pertumbuhan kredit 10,5% artinya total pinjaman dari bank ke masyarakat dan bisnis naik 10,5% dari tahun lalu. Ini tanda ekonomi aktif &mdash; bisnis pinjam untuk ekspansi, masyarakat pinjam untuk beli rumah/kendaraan.
        </p>
        <p>
          <strong>Buat kamu:</strong> Pertumbuhan kredit tinggi = bank mau kasih pinjaman. Tapi juga berarti persaingan dapat kredit lebih ketat. Siapkan dokumen dan skor kredit yang baik.
        </p>
      </InsightBox>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {asetData.length > 0 && <DataTable title="Total Aset Perbankan" data={asetData} headers={["Periode", "Aset (Rp T)"]} sources={[category?.name || "OJK"]} />}
        {nplData.length > 0 && <DataTable title="Rasio NPL" data={nplData} headers={["Periode", "NPL (%)"]} sources={[category?.name || "OJK"]} />}
      </div>
    </div>
  );
}
