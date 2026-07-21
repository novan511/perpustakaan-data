"use client";

import { glossaryData, glossaryCategories } from "@/lib/data/glossary";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Search, BookOpen } from "lucide-react";
import Link from "next/link";

export default function GlossariumPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = glossaryData.filter((item) => {
    const matchesSearch = !search || item.term.toLowerCase().includes(search.toLowerCase()) || item.definition.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !activeCategory || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Glossarium Ekonomi</h2>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">Istilah ekonomi dalam bahasa sederhana</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-5 sm:p-8 text-white">
        <div className="flex items-center gap-3 mb-3">
          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
          <h3 className="text-base sm:text-lg font-bold">Kenali Istilah Ekonomi</h3>
        </div>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Glossarium ini menjelaskan istilah ekonomi dengan bahasa yang mudah dipahami. Cocok untuk pelajar, mahasiswa, atau siapa saja yang ingin memahami data ekonomi.
        </p>
      </motion.div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" placeholder="Cari istilah..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50" />
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActiveCategory(null)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${!activeCategory ? "bg-red-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}>Semua</button>
        {glossaryCategories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${activeCategory === cat ? "bg-red-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}>{cat}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {filtered.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
            <div className="flex items-start justify-between mb-2 gap-2">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{item.term}</h4>
              <span className="text-[10px] font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full whitespace-nowrap">{item.category}</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">{item.definition}</p>
            {item.example && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <p className="text-[10px] font-semibold text-blue-700 dark:text-blue-400 mb-1">Contoh:</p>
                <p className="text-[11px] sm:text-xs text-blue-600 dark:text-blue-300 leading-relaxed">{item.example}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xs sm:text-sm text-slate-400">Tidak ditemukan istilah yang sesuai.</p>
        </div>
      )}
    </div>
  );
}
