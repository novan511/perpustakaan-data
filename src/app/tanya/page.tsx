"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, Search, HelpCircle, TrendingUp, Heart, BookOpen, Leaf, Smartphone, Users } from "lucide-react";
import { qaData, qaCategories, searchQA } from "@/lib/data/qa-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Ekonomi: TrendingUp,
  Kesehatan: Heart,
  Pendidikan: BookOpen,
  Lingkungan: Leaf,
  "Digital & Teknologi": Smartphone,
  "Sosial & Demografi": Users,
};

const colorMap: Record<string, string> = {
  Ekonomi: "from-blue-500 to-blue-600",
  Kesehatan: "from-red-500 to-red-600",
  Pendidikan: "from-amber-500 to-amber-600",
  Lingkungan: "from-emerald-500 to-emerald-600",
  "Digital & Teknologi": "from-violet-500 to-violet-600",
  "Sosial & Demografi": "from-cyan-500 to-cyan-600",
};

export default function TanyaPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let items = search ? searchQA(search) : qaData;
    if (activeCategory) {
      items = items.filter((q) => q.category === activeCategory);
    }
    return items;
  }, [search, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Tanya Data</h2>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
            Pertanyaan tentang Indonesia yang dijawab berdasarkan data
          </p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-5 sm:p-8 text-white">
        <div className="flex items-center gap-3 mb-3">
          <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
          <h3 className="text-lg sm:text-xl font-bold">Pertanyaan yang Ingin Kamu Ketahui Jawabannya</h3>
        </div>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Bukan opini, bukan hoaxes &mdash; tapi jawaban berbasis data dari BPS, World Bank, WHO, OECD, dan sumber terpercaya lainnya. Setiap jawaban dilengkapi dengan angka-angka konkret dan sumber yang bisa diverifikasi.
        </p>
      </motion.div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Contoh: berapa penduduk miskin, apakah internet Indonesia lambat..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setActiveCategory(null); }}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setActiveCategory(null); setSearch(""); }}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${!activeCategory ? "bg-red-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}
        >
          Semua ({qaData.length})
        </button>
        {qaCategories.map((cat) => {
          const Icon = iconMap[cat.name] || HelpCircle;
          return (
            <button
              key={cat.name}
              onClick={() => { setActiveCategory(activeCategory === cat.name ? null : cat.name); setSearch(""); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${activeCategory === cat.name ? "bg-red-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}
            >
              <Icon className="w-3 h-3" />
              {cat.name} ({cat.count})
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {filtered.map((qa, i) => {
          const Icon = iconMap[qa.category] || HelpCircle;
          const color = colorMap[qa.category] || "from-slate-500 to-slate-600";
          return (
            <motion.div
              key={qa.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                href={`/tanya/${qa.id}`}
                className="block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-red-500 transition-colors">
                      {qa.question}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {qa.answer.substring(0, 150)}...
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">{qa.source}</span>
                      <span className="text-[10px] bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded text-blue-600 dark:text-blue-400">{qa.dataPoints.length} data points</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Search className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-sm text-slate-400">Tidak ditemukan pertanyaan yang sesuai.</p>
          <button onClick={() => { setSearch(""); setActiveCategory(null); }} className="mt-3 text-xs text-red-500 hover:text-red-600">Reset pencarian</button>
        </div>
      )}
    </div>
  );
}
