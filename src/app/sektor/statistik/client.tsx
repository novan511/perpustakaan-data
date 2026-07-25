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

export default function StatistikClient({ category }: { category: SupabaseCategory | null }) {
  const datasets = category?.datasets || [];
  const kpis = datasetsToKPIs(datasets);

  const pdbDataset = findDataset(datasets, "pdb", "gdp");
  const inflasiDataset = findDataset(datasets, "inflasi", "cpi");
  const pengangguranDataset = findDataset(datasets, "pengangguran", "unemploy");
  const kemiskinanDataset = findDataset(datasets, "kemiskinan", "poverty");

  const pdbData = datasetToDataPoints(pdbDataset);
  const inflasiData = datasetToDataPoints(inflasiDataset);
  const pengangguranData = datasetToDataPoints(pengangguranDataset);
  const kemiskinanData = datasetToDataPoints(kemiskinanDataset);

  const pdbFormat = createFormatValue(pdbDataset?.unit || "Rp T");
  const inflasiFormat = createFormatValue(inflasiDataset?.unit || "%");
  const pengangguranFormat = createFormatValue(pengangguranDataset?.unit || "%");
  const kemiskinanFormat = createFormatValue(kemiskinanDataset?.unit || "%");

  const latestPDB = pdbData[pdbData.length - 1];
  const latestInflasi = inflasiData[inflasiData.length - 1];
  const latestPengangguran = pengangguranData[pengangguranData.length - 1];
  const latestKemiskinan = kemiskinanData[kemiskinanData.length - 1];

  const prevPDB = pdbData.length >= 2 ? pdbData[pdbData.length - 2] : null;
  const prevInflasi = inflasiData.length >= 2 ? inflasiData[inflasiData.length - 2] : null;
  const prevPengangguran = pengangguranData.length >= 2 ? pengangguranData[pengangguranData.length - 2] : null;
  const prevKemiskinan = kemiskinanData.length >= 2 ? kemiskinanData[kemiskinanData.length - 2] : null;

  const pdbChange = prevPDB ? Math.round(((latestPDB.value - prevPDB.value) / Math.abs(prevPDB.value)) * 10000) / 100 : 0;
  const inflasiChange = prevInflasi ? Math.round(((latestInflasi.value - prevInflasi.value) / Math.abs(prevInflasi.value)) * 10000) / 100 : 0;
  const pengangguranChange = prevPengangguran ? Math.round(((latestPengangguran.value - prevPengangguran.value) / Math.abs(prevPengangguran.value)) * 10000) / 100 : 0;
  const kemiskinanChange = prevKemiskinan ? Math.round(((latestKemiskinan.value - prevKemiskinan.value) / Math.abs(prevKemiskinan.value)) * 10000) / 100 : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <Link href="/sektor" className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{category?.name || "BPS - Badan Pusat Statistik"}</h2>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
            Data statistik makroekonomi &middot;{" "}
            <a href={category?.datasets?.[0]?.source_url || "https://webapi.bps.go.id"} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">webapi.bps.go.id</a>
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {kpis.map((kpi, i) => <KPICard key={i} {...kpi} />)}
      </div>

      <InsightBox title="Tentang BPS" type="info">
        <p>
          BPS (Badan Pusat Statistik) adalah lembaga pemerintah yang bertanggung jawab mengumpulkan dan menerbitkan data statistik Indonesia. Data BPS menjadi <strong>fondasi hampir semua kebijakan ekonomi</strong> di Indonesia.
        </p>
      </InsightBox>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <KPIInsight
          kpiName="PDB Indonesia (Triwulanan)"
          value={latestPDB ? pdbFormat(latestPDB.value) : "-"}
          change={pdbChange}
          whyItMatters="PDB adalah &quot;ukuran berat&quot; ekonomi Indonesia. Jika PDB tumbuh 5%, itu artinya total barang dan jasa yang diproduksi Indonesia naik 5% dari tahun sebelumnya."
          realImpact="PDB tumbuh = lebih banyak perusahaan buka, lowongan kerja bertambah, dan gaji cenderung naik. PDB turun = PHK meningkat, sulit cari kerja."
          whatToWatch="Fokus pada PDB per kapita (PDB dibagi jumlah penduduk). Ini yang menunjukkan kesejahteraan rata-rata, bukan hanya total."
        />
        <KPIInsight
          kpiName="Inflasi (CPI)"
          value={latestInflasi ? inflasiFormat(latestInflasi.value) : "-"}
          change={inflasiChange}
          whyItMatters="Inflasi rendah = harga stabil. Tapi inflasi terlalu rendah (deflasi) bisa pertanda ekonomi lesu karena orang tidak mau belanja."
          realImpact="Beli gorengan Rp 2.000 sekarang, tahun depan masih Rp 2.000-2.050. Tapi kalau inflasi 10%, gorengan jadi Rp 2.200. Beda tipis tapi terasa untuk berapa ribu transaksi per bulan."
          whatToWatch="Perhatikan inflasi pangan (bukan inflasi umum). Harga beras dan cabai lebih sensitif bagi masyarakat berpenghasilan rendah."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {pdbData.length > 0 && (
          <ChartWrapper
            title="PDB Indonesia (Triwulanan)"
            description={pdbDataset?.unit || "Dalam triliun Rupiah"}
            data={pdbData}
            color="#3b82f6"
            type={getChartTypeForDataset(pdbDataset?.slug || "")}
            sources={[category?.name || "BPS"]}
            formatValue={pdbFormat}
          />
        )}
        {inflasiData.length > 0 && (
          <ChartWrapper
            title="Inflasi (CPI) Bulanan"
            description={inflasiDataset?.unit || "YoY %"}
            data={inflasiData}
            color="#10b981"
            sources={[category?.name || "BPS"]}
            formatValue={inflasiFormat}
          />
        )}
        {pengangguranData.length > 0 && (
          <ChartWrapper
            title="Pengangguran Terbuka"
            description={pengangguranDataset?.unit || "Persentase usia kerja (%)"}
            data={pengangguranData}
            color="#f59e0b"
            sources={[category?.name || "BPS"]}
            formatValue={pengangguranFormat}
          />
        )}
        {kemiskinanData.length > 0 && (
          <ChartWrapper
            title="Tingkat Kemiskinan"
            description={kemiskinanDataset?.unit || "Persentase penduduk miskin (%)"}
            data={kemiskinanData}
            color="#ef4444"
            sources={[category?.name || "BPS"]}
            formatValue={kemiskinanFormat}
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <KPIInsight
          kpiName="Pengangguran Terbuka"
          value={latestPengangguran ? pengangguranFormat(latestPengangguran.value) : "-"}
          change={pengangguranChange}
          whyItMatters="Pengangguran terbuka = persentase orang yang <strong>mau kerja tapi belum dapat kerja</strong>. Ini berbeda dengan pengangguran total karena tidak termasuk yang sudah berhenti mencari."
          realImpact="Untuk fresh graduate: angka 4,91% artinya dari 100 pencari kerja, sekitar 5 belum dapat pekerjaan. Tapi ini rata-rata nasional &mdash; di kota besar bisa lebih tinggi."
          whatToWatch="Perhatikan pengangguran lulusan SMA/SMK. Mereka yang paling terdampak karena kompetisi dengan lulusan S1."
        />
        <KPIInsight
          kpiName="Tingkat Kemiskinan"
          value={latestKemiskinan ? kemiskinanFormat(latestKemiskinan.value) : "-"}
          change={kemiskinanChange}
          whyItMatters="Kemiskinan diukur dari pengeluaran per kapita per bulan. Masyarakat miskin = pengeluaran di bawah garis kemiskinan (sekitar Rp 550.000/bulan per orang)."
          realImpact="9% artinya sekitar 27 juta penduduk Indonesia hidup dengan pengeluaran sangat terbatas. Ini mempengaruhi pasar kerja, konsumsi, dan stabilitas sosial."
          whatToWatch="Perhatikan kemiskinan perkotaan vs pedesaan. Kemiskinan perkotaan biasanya lebih sulit diturunkan karena biaya hidup tinggi."
        />
      </div>

      <InsightBox title="Cara Membaca Data BPS" type="analysis">
        <p>
          Data BPS dirilis secara berkala: inflasi tiap bulan, PDB tiap kuartal, pengangguran dan kemiskinan tiap 6 bulan. <strong>Jangan hanya lihat angka mentah</strong> &mdash; perhatikan trennya. PDB naik dari 4,9% ke 5,03% berarti ada perbaikan, meski tipis.
        </p>
        <p>
          <strong>Tips:</strong> Selalu bandingkan data terakhir dengan periode sebelumnya. Inflasi turun dari 2,5% ke 1,51% itu bagus, tapi kalau terus turun ke 0%, bisa tanda deflasi yang berbahaya.
        </p>
      </InsightBox>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {pdbData.length > 0 && <DataTable title="Data PDB Triwulanan" data={pdbData} sources={[category?.name || "BPS"]} />}
        {inflasiData.length > 0 && <DataTable title="Data Inflasi Bulanan" data={inflasiData} sources={[category?.name || "BPS"]} />}
      </div>
    </div>
  );
}
