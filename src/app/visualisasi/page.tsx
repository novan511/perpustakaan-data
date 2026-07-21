"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import BarRace from "@/components/charts/bar-race";
import TreemapChart from "@/components/charts/treemap-chart";
import SankeyDiagram from "@/components/charts/sankey-diagram";
import PopulationPyramid from "@/components/charts/population-pyramid";
import DonutChart from "@/components/charts/donut-chart";
import WordCloud from "@/components/charts/word-cloud";
import GaugeChart from "@/components/charts/gauge-chart";
import TimelineChart from "@/components/charts/timeline-chart";
import { InsightBox } from "@/components/ui/insight-box";

const pdrbBySector = [
  { name: "Jasa Keuangan", value: 3850 },
  { name: "Industri Pengolahan", value: 3200 },
  { name: "Pertanian", value: 2100 },
  { name: "Perdagangan", value: 1950 },
  { name: "Konstruksi", value: 1400 },
  { name: "Pertambangan", value: 1200 },
  { name: "Transportasi", value: 950 },
  { name: "Info & Komunikasi", value: 850 },
  { name: "Real Estate", value: 750 },
  { name: "Lainnya", value: 2887 },
];

const pendudukByProvinsi = [
  { name: "Jawa Barat", value: 49930 },
  { name: "Jawa Timur", value: 40665 },
  { name: "Jawa Tengah", value: 37032 },
  { name: "DKI Jakarta", value: 11250 },
  { name: "Banten", value: 12689 },
  { name: "Sumatera Utara", value: 14799 },
  { name: "Sulawesi Selatan", value: 9073 },
  { name: "NTB", value: 5320 },
  { name: "Bali", value: 4363 },
  { name: "Papua", value: 4303 },
];

const konsumsiEnergi = [
  { name: "BBM Transportasi", value: 35 },
  { name: "Listrik Rumah Tangga", value: 22 },
  { name: "Industri", value: 20 },
  { name: "LPG Memasak", value: 12 },
  { name: "Biomassa", value: 8 },
  { name: "Lainnya", value: 3 },
];

const pyramidData = [
  { ageGroup: "0-4", male: 13500, female: 12800 },
  { ageGroup: "5-9", male: 14200, female: 13500 },
  { ageGroup: "10-14", male: 14800, female: 14100 },
  { ageGroup: "15-19", male: 14500, female: 13900 },
  { ageGroup: "20-24", male: 14000, female: 13600 },
  { ageGroup: "25-29", male: 13800, female: 13500 },
  { ageGroup: "30-34", male: 13200, female: 13000 },
  { ageGroup: "35-39", male: 12500, female: 12300 },
  { ageGroup: "40-44", male: 11200, female: 11000 },
  { ageGroup: "45-49", male: 9800, female: 9600 },
  { ageGroup: "50-54", male: 8200, female: 8100 },
  { ageGroup: "55-59", male: 6500, female: 6700 },
  { ageGroup: "60-64", male: 4800, female: 5200 },
  { ageGroup: "65+", male: 5200, female: 6100 },
];

const wordCloudData = [
  { text: "Indonesia", value: 100 },
  { text: "PDB", value: 85 },
  { text: "Ekspor", value: 72 },
  { text: "Inflasi", value: 68 },
  { text: "Rupiah", value: 65 },
  { text: "Pertumbuhan", value: 60 },
  { text: "Nikel", value: 55 },
  { text: "Sawit", value: 52 },
  { text: "Batubara", value: 48 },
  { text: "Kemiskinan", value: 45 },
  { text: "Pendidikan", value: 42 },
  { text: "Kesehatan", value: 40 },
  { text: "Digital", value: 38 },
  { text: "Startup", value: 35 },
  { text: "E-commerce", value: 33 },
  { text: "Pariwisata", value: 30 },
  { text: "Pertanian", value: 28 },
  { text: "Perikanan", value: 25 },
  { text: "Energi", value: 22 },
  { text: "Infrastruktur", value: 20 },
];

const timelineEvents = [
  { date: "2020-03", title: "Pandemi COVID-19", description: "PSBB pertama diberlakukan, PDB kontraksi -2,07%" },
  { date: "2020-10", title: "RUU Cipta Kerja", description: "Omnibus Law disahkan, dampak besar ke dunia usaha" },
  { date: "2021-01", title: "Vaksinasi Nasional", description: "Program vaksinasi massal dimulai" },
  { date: "2022-03", title: "Perang Rusia-Ukraina", description: "Harga komoditas global melonjak, inflasi naik" },
  { date: "2022-09", title: "BI-Rate Naik ke 5,5%", description: "Kenaikan suku bunga agresif untuk kendalikan inflasi" },
  { date: "2023-01", title: "IKN Dimulai", description: "Pembangunan ibu kota baru di Kalimantan Timur" },
  { date: "2024-10", title: "Pemerintahan Baru", description: "Presiden Prabowo dilantik, target pertumbuhan 8%" },
  { date: "2025-01", title: "Makan Siang Gratis", description: "Program makan siang gratis untuk sekolah dimulai" },
];

const sankeyData = {
  nodes: [
    { name: "Pajak Penghasilan" },
    { name: "PPN" },
    { name: "Pajak Lainnya" },
    { name: "Pendidikan" },
    { name: "Kesehatan" },
    { name: "Infrastruktur" },
    { name: "Pertahanan" },
    { name: "Subsidi" },
  ],
  links: [
    { source: 0, target: 3, value: 320 },
    { source: 0, target: 4, value: 180 },
    { source: 0, target: 5, value: 150 },
    { source: 1, target: 3, value: 280 },
    { source: 1, target: 6, value: 200 },
    { source: 1, target: 7, value: 150 },
    { source: 2, target: 4, value: 120 },
    { source: 2, target: 5, value: 100 },
    { source: 2, target: 7, value: 80 },
  ],
};

export default function VisualisasiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Grafik Interaktif</h2>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">Visualisasi data terinspirasi Flourish Studio</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-5 sm:p-8 text-white">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg sm:text-xl font-bold">Visualisasi Hidup & Interaktif</h3>
        </div>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Koleksi grafik interaktif yang terinspirasi dari <a href="https://flourish.studio" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">Flourish Studio</a>.
          Setiap grafik memiliki animasi, interaksi, dan desain yang dirancang agar data mudah dipahami oleh semua kalangan.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Bar Chart Race</h3>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-4">Animasi bar bergerak menunjukkan perubahan peringkat</p>
          <BarRace data={pdrbBySector} title="PDB per Sektor (Triliun Rp)" color="#3b82f6" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Treemap</h3>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-4">Hierografi nested rectangles berdasarkan nilai</p>
          <TreemapChart data={pendudukByProvinsi} title="Populasi per Provinsi (Ribu Jiwa)" height={300} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Sankey Diagram</h3>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-4">Alur distribusi penerimaan pajak ke belanja negara</p>
          <SankeyDiagram nodes={sankeyData.nodes} links={sankeyData.links} title="Alur APBN: Pajak → Belanja" height={300} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Population Pyramid</h3>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-4">Piramida usia penduduk Indonesia (ribu jiwa)</p>
          <PopulationPyramid data={pyramidData} title="Piramida Penduduk Indonesia" height={350} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Donut Chart</h3>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-4">Komposisi konsumsi energi nasional</p>
          <DonutChart data={konsumsiEnergi} title="Konsumsi Energi Indonesia" centerLabel="Total" centerValue="100%" height={300} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Word Cloud</h3>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-4">Kata kunci ekonomi Indonesia berdasarkan frekuensi</p>
          <WordCloud data={wordCloudData} title="Istilah Ekonomi Populer" height={300} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Gauge Chart</h3>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-4">Indikator kecepatan/meter</p>
          <div className="grid grid-cols-2 gap-4">
            <GaugeChart value={5.03} max={10} label="PDB Growth %" title="Pertumbuhan PDB" color="#3b82f6" />
            <GaugeChart value={1.51} max={10} label="Inflasi %" title="Tingkat Inflasi" color="#10b981" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Timeline</h3>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-4">Peristiwa penting ekonomi Indonesia</p>
          <TimelineChart events={timelineEvents} title="Timeline Ekonomi 2020-2025" />
        </motion.div>
      </div>

      <InsightBox title="Tentang Visualisasi Ini" type="info">
        <p>
          Semua grafik di atas dibangun dengan <strong>Recharts</strong> dan <strong>Motion</strong> (framer-motion). Tidak ada library eksternal berat &mdash; semuanya ringan dan responsif. Terinspirasi dari Flourish Studio yang mempopulerkan data storytelling interaktif.
        </p>
        <p>
          Fitur Flourish yang diadopsi: <strong>Bar Race</strong> (animasi bar bergerak), <strong>Treemap</strong> (hierografi visual), <strong>Sankey</strong> (alur distribusi), <strong>Population Pyramid</strong> (demografi), <strong>Word Cloud</strong> (teks visual), dan <strong>Gauge</strong> (indikator kecepatan).
        </p>
      </InsightBox>
    </div>
  );
}
