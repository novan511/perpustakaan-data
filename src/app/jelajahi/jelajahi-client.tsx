"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Search, ArrowLeft, Database, BarChart3 } from "lucide-react";
import Link from "next/link";
import type { CategoryWithDatasets, APIDataset } from "@/lib/api-adapter";
import ChartWrapper from "@/components/charts/chart-wrapper";
import { InsightBox } from "@/components/ui/insight-box";

const iconMap: Record<string, string> = {
  TrendingUp: "📈", Globe: "🌍", Heart: "🏥", GraduationCap: "🎓",
  Wheat: "🌾", Trees: "🌴", Fish: "🐟", Users: "👥",
  Trophy: "🏅", Megaphone: "📢", Building2: "🏢", Calculator: "🧮",
  Briefcase: "💼", HeartHandshake: "🤝", Compass: "🧭", Utensils: "🍽️",
  Gem: "💎", Video: "🎬", Baby: "👶", Leaf: "🌿",
  Map: "🗺️", HeartPulse: "❤️", TreePine: "🌲", Anchor: "⚓",
  MapPin: "📍", UtensilsCrossed: "🍴", HandHeart: "🤝",
};

interface JelajahiClientProps {
  categories: CategoryWithDatasets[];
  totalCategories: number;
  totalDatasets: number;
}

export default function JelajahiClient({ categories, totalCategories, totalDatasets }: JelajahiClientProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDataset, setSelectedDataset] = useState<APIDataset | null>(null);

  const filteredCategories = useMemo(() => {
    if (!search && !selectedCategory) return categories;
    if (selectedCategory) {
      const cat = categories.find((c) => c.id === selectedCategory);
      if (!cat) return [];
      if (!search) return [cat];
      return [{
        ...cat,
        datasets: cat.datasets.filter(
          (d) =>
            d.name.toLowerCase().includes(search.toLowerCase()) ||
            (d.description ?? "").toLowerCase().includes(search.toLowerCase())
        ),
      }];
    }
    const q = search.toLowerCase();
    return categories
      .map((c) => ({
        ...c,
        datasets: c.datasets.filter(
          (d) =>
            d.name.toLowerCase().includes(q) ||
            (d.description ?? "").toLowerCase().includes(q)
        ),
      }))
      .filter((c) => c.datasets.length > 0);
  }, [search, selectedCategory, categories]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Jelajahi Semua Data</h2>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
            {totalCategories} kategori &middot; {totalDatasets} dataset &middot; Tanpa batas
          </p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-5 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-red-500/15 to-transparent rounded-bl-full" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <Database className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
            <h3 className="text-lg sm:text-xl font-bold">Perpustakaan Data Tanpa Batas</h3>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed mb-4">
            Jelajahi data dari berbagai bidang: ekonomi, kesehatan, pendidikan, pertanian, olahraga, marketing, karir, dan masih banyak lagi. Setiap dataset bisa divisualisasikan dan dianalisis korelasinya.
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              {totalCategories} kategori
            </div>
            <span className="text-slate-600">|</span>
            <div className="text-[10px] sm:text-xs text-slate-400">{totalDatasets} dataset</div>
            <span className="text-slate-600">|</span>
            <div className="text-[10px] sm:text-xs text-slate-400">Update berkala</div>
          </div>
        </div>
      </motion.div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Cari dataset apa saja... (contoh: padi, COVID, YouTube, gaji)"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setSelectedCategory(null); }}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setSelectedCategory(null); setSearch(""); }}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            !selectedCategory && !search ? "bg-red-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          Semua ({totalDatasets})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setSelectedCategory(selectedCategory === cat.id ? null : cat.id); setSearch(""); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              selectedCategory === cat.id ? "bg-red-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {iconMap[cat.icon ?? ""] || "📊"} {cat.name} ({cat.datasets.length})
          </button>
        ))}
      </div>

      {selectedDataset && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">{selectedDataset.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{selectedDataset.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">{selectedDataset.source ?? ""}</span>
                <span className="text-[10px] bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded text-blue-600 dark:text-blue-400">{selectedDataset.unit ?? ""}</span>
              </div>
            </div>
            <button onClick={() => setSelectedDataset(null)} className="text-slate-400 hover:text-slate-600 text-xs">Tutup</button>
          </div>
          <ChartWrapper
            title={selectedDataset.name}
            description={selectedDataset.description ?? ""}
            data={selectedDataset.data_points}
            color="#3b82f6"
            sources={[selectedDataset.source ?? ""]}
            formatValue={(v) => `${v.toLocaleString("id-ID")} ${selectedDataset.unit ?? ""}`}
          />
        </motion.div>
      )}

      <div className="space-y-4">
        {filteredCategories.map((cat) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-2xl">{iconMap[cat.icon ?? ""] || "📊"}</span>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">{cat.name}</h3>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">{cat.description}</p>
              </div>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full text-slate-500 flex-shrink-0">
                {cat.datasets.length} data
              </span>
            </div>
            <div className="p-4 sm:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                {cat.datasets.map((ds) => (
                  <button
                    key={ds.id}
                    onClick={() => setSelectedDataset(selectedDataset?.id === ds.id ? null : ds)}
                    className={`text-left p-3 rounded-xl border transition-all ${
                      selectedDataset?.id === ds.id
                        ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"
                        : "border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">{ds.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{ds.source ?? ""} &middot; {ds.unit ?? ""}</p>
                      </div>
                      <BarChart3 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">{ds.description}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {ds.data_points.slice(-3).map((d, i) => (
                        <span key={i} className="text-[9px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">
                          {d.period}: {d.value.toLocaleString("id-ID")}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-16">
          <Search className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-sm text-slate-400">Tidak ditemukan dataset untuk pencarian ini.</p>
          <button onClick={() => { setSearch(""); setSelectedCategory(null); }} className="mt-3 text-xs text-red-500 hover:text-red-600">Reset pencarian</button>
        </div>
      )}

      <InsightBox title="Tentang Halaman Ini" type="info">
        <p>
          Halaman ini adalah <strong>pusat eksplorasi</strong> seluruh data di Perpustakaan Data Indonesia. Klik dataset apapun untuk melihat visualisasinya secara instan. Gunakan pencarian atau filter kategori untuk menemukan data spesifik.
        </p>
        <p>
          Semua dataset bisa dikombinasikan menggunakan <Link href="/korelasi" className="text-blue-600 dark:text-blue-400 underline">Alat Analisis Korelasi</Link> untuk menemukan hubungan antar variabel.
        </p>
      </InsightBox>
    </div>
  );
}
