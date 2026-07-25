"use client";

import { motion } from "motion/react";
import KPICard from "@/components/dashboard/kpi-card";
import ChartWrapper from "@/components/charts/chart-wrapper";
import DataTable from "@/components/dashboard/data-table";
import { InsightBox, KPIInsight } from "@/components/ui/insight-box";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import {
  datasetsToKPIs,
  datasetToDataPoints,
  findDataset,
  createFormatValue,
  type SupabaseCategory,
} from "@/lib/supabase/sector-queries";

export default function FiskalClient({ category }: { category: SupabaseCategory | null }) {
  const datasets = category?.datasets || [];
  const kpis = datasetsToKPIs(datasets);

  const penerimaanDataset = findDataset(datasets, "penerimaan", "revenue");
  const belanjaDataset = findDataset(datasets, "belanja", "spending");
  const defisitDataset = findDataset(datasets, "defisit", "deficit");
  const komposisiDataset = findDataset(datasets, "komposisi", "composition");
  const alokasiDataset = findDataset(datasets, "alokasi", "allocation");

  const penerimaanData = datasetToDataPoints(penerimaanDataset);
  const belanjaData = datasetToDataPoints(belanjaDataset);
  const defisitData = datasetToDataPoints(defisitDataset);
  const komposisiData = datasetToDataPoints(komposisiDataset);
  const alokasiData = datasetToDataPoints(alokasiDataset);

  const penerimaanFormat = createFormatValue(penerimaanDataset?.unit || "Rp T");
  const defisitFormat = createFormatValue(defisitDataset?.unit || "Rp T");

  const latestPenerimaan = penerimaanData[penerimaanData.length - 1];
  const latestDefisit = defisitData[defisitData.length - 1];

  const prevPenerimaan = penerimaanData.length >= 2 ? penerimaanData[penerimaanData.length - 2] : null;
  const prevDefisit = defisitData.length >= 2 ? defisitData[defisitData.length - 2] : null;

  const penerimaanChange = prevPenerimaan ? Math.round(((latestPenerimaan.value - prevPenerimaan.value) / Math.abs(prevPenerimaan.value)) * 10000) / 100 : 0;
  const defisitChange = prevDefisit ? Math.round(((latestDefisit.value - prevDefisit.value) / Math.abs(prevDefisit.value)) * 10000) / 100 : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <Link href="/sektor" className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{category?.name || "Kementerian Keuangan"}</h2>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
            APBN & keuangan negara &middot;{" "}
            <a href={penerimaanDataset?.source_url || "https://www.kemenkeu.go.id"} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">kemenkeu.go.id</a>
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {kpis.map((kpi, i) => <KPICard key={i} {...kpi} />)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <KPIInsight
          kpiName="Penerimaan Negara"
          value={latestPenerimaan ? penerimaanFormat(latestPenerimaan.value) : "-"}
          change={penerimaanChange}
          whyItMatters="Penerimaan negara = uang yang masuk ke kas pemerintah dari pajak, PNBP, dan lainnya. Lebih banyak pemerintah = lebih banyak dana untuk infrastruktur, pendidikan, kesehatan."
          realImpact="Penerimaan naik = APBN sehat = subsidi BBM, pendidikan, dan kesehatan lebih terjamin. Penerimaan turun = pemotongan anggaran, proyek tertunda."
          whatToWatch="Rasio pajak terhadap PDB Indonesia masih 10,2% &mdash; jauh di bawah rata-rata ASEAN (15-20%). Ini artinya potensi penerimaan masih besar."
        />
        <KPIInsight
          kpiName="Defisit APBN"
          value={latestDefisit ? defisitFormat(latestDefisit.value) : "-"}
          change={defisitChange}
          whyItMatters="Defisit = belanja negara lebih besar dari penerimaan. Defisit ditutup dengan pinjaman (utang). Defisit dalam batas wajar (3% PDB) itu normal."
          realImpact="Defisit 359T dari PDB 22.137T = sekitar 1,6% PDB. Masih aman. Tapi jika terus membesar, beban bunga utang naik dan mengurangi anggaran untuk pendidikan/kesehatan."
          whatToWatch="Jika defisit melebihi 3% PDB selama 2 tahun berturut-turut, itu tanda fiskal mulai tidak sehat."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {penerimaanData.length > 0 && belanjaData.length > 0 && (
          <ChartWrapper
            title="Penerimaan vs Belanja Negara"
            description={penerimaanDataset?.unit || "Rp T per tahun"}
            data={penerimaanData}
            color="#3b82f6"
            secondData={belanjaData}
            secondColor="#10b981"
            secondLabel="Belanja"
            sources={[category?.name || "Kemenkeu"]}
            formatValue={penerimaanFormat}
          />
        )}
        {defisitData.length > 0 && (
          <ChartWrapper
            title="Defisit APBN"
            description={defisitDataset?.unit || "Rp T"}
            data={defisitData}
            color="#ef4444"
            type="bar"
            sources={[category?.name || "Kemenkeu"]}
            formatValue={defisitFormat}
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {komposisiData.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Komposisi Penerimaan Negara</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={komposisiData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value" label />
                <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
        {alokasiData.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Alokasi Belanja Negara</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={alokasiData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value" label />
                <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <InsightBox title="Kamu Membayar Pajak, Ke Mana Uangnya?" type="analysis">
        <p>
          Dari Rp 2.486 triliun penerimaan negara, <strong>65% dari pajak</strong> (termasuk PPh, PPN). Artinya setiap kali kamu beli sesuatu dengan PPN 11%, uang itu masuk ke kas negara.
        </p>
        <p>
          <strong>Dibelanjakan untuk:</strong> 31,5% ke transfer daerah (dana desa, pendidikan daerah), 14,9% belanja modal (infrastruktur), 13,5% belanja barang (operasional pemerintah), 12,3% bunga utang.
        </p>
        <p>
          <strong>Buat kamu:</strong> Pajak yang kamu bayar langsung mempengaruhi kualitas jalan, sekolah, rumah sakit, dan subsidi di daerahmu. Pajak tinggi ≠ rugi &mdash; tergantung bagaimana uangnya dikelola.
        </p>
      </InsightBox>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {penerimaanData.length > 0 && <DataTable title="Penerimaan Negara" data={penerimaanData} headers={["Tahun", "Penerimaan (Rp T)"]} sources={[category?.name || "Kemenkeu"]} />}
        {belanjaData.length > 0 && <DataTable title="Belanja Negara" data={belanjaData} headers={["Tahun", "Belanja (Rp T)"]} sources={[category?.name || "Kemenkeu"]} />}
      </div>
    </div>
  );
}
