"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, Search, ArrowRightLeft, Info, Zap } from "lucide-react";
import { useState, useMemo } from "react";
import { calculateCorrelation, type CorrelationResult } from "@/lib/correlation";
import ScatterPlot from "@/components/charts/scatter-plot";

interface Dataset {
  id: string;
  name: string;
  category: string;
  source: string;
  data: Array<{ period: string; value: number }>;
}

interface KorelasiClientProps {
  datasets: Dataset[];
  categoryNames: string[];
}

function DatasetSelector({ label, value, search, setSearch, showDropdown, setShowDropdown, filtered, onSelect, excludeId, allDatasets, categories }: {
  label: string; value: string; search: string; setSearch: (s: string) => void; showDropdown: boolean; setShowDropdown: (b: boolean) => void; filtered: Dataset[]; onSelect: (id: string) => void; excludeId?: string; allDatasets: Dataset[]; categories: string[];
}) {
  const selected = allDatasets.find((d) => d.id === value);
  return (
    <div className="relative">
      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">{label}</label>
      <button onClick={() => setShowDropdown(!showDropdown)} className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-left hover:border-red-300 dark:hover:border-red-700 transition-colors">
        {selected ? (<div><span className="font-medium text-slate-900 dark:text-white">{selected.name}</span><span className="text-[10px] text-slate-400 ml-2">{selected.source}</span></div>) : (<span className="text-slate-400">Pilih dataset...</span>)}
        <Search className="w-4 h-4 text-slate-400" />
      </button>
      {showDropdown && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
          <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="p-2 border-b border-slate-100 dark:border-slate-800">
              <input type="text" placeholder="Cari..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-slate-900 dark:text-white" autoFocus />
            </div>
            <div className="max-h-64 overflow-y-auto">
              {categories.map((cat) => {
                const items = filtered.filter((d) => d.category === cat && d.id !== excludeId);
                if (!items.length) return null;
                return (<div key={cat}><div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-800/50">{cat}</div>
                  {items.map((d) => (<button key={d.id} onClick={() => { onSelect(d.id); setShowDropdown(false); setSearch(""); }} className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${value === d.id ? "bg-red-50 dark:bg-red-900/20" : ""}`}>
                    <span className="font-medium text-slate-900 dark:text-white">{d.name}</span><span className="text-slate-400 ml-2">{d.source}</span>
                  </button>))}</div>);
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function getStrengthColor(r: number) {
  const a = Math.abs(r);
  if (a >= 0.8) return "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30";
  if (a >= 0.6) return "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30";
  if (a >= 0.4) return "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/30";
  return "text-slate-600 bg-slate-100 dark:text-slate-400 dark:bg-slate-800";
}

export default function KorelasiClient({ datasets, categoryNames }: KorelasiClientProps) {
  const [selectedX, setSelectedX] = useState("");
  const [selectedY, setSelectedY] = useState("");
  const [searchX, setSearchX] = useState("");
  const [searchY, setSearchY] = useState("");
  const [showDropdownX, setShowDropdownX] = useState(false);
  const [showDropdownY, setShowDropdownY] = useState(false);

  const datasetX = datasets.find((d) => d.id === selectedX);
  const datasetY = datasets.find((d) => d.id === selectedY);

  const result: CorrelationResult | null = useMemo(() => {
    if (!datasetX || !datasetY) return null;
    return calculateCorrelation(datasetX.data, datasetY.data);
  }, [datasetX, datasetY]);

  const filteredX = datasets.filter((d) => d.name.toLowerCase().includes(searchX.toLowerCase()) || d.category.toLowerCase().includes(searchX.toLowerCase()));
  const filteredY = datasets.filter((d) => d.name.toLowerCase().includes(searchY.toLowerCase()) || d.category.toLowerCase().includes(searchY.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Alat Analisis Korelasi</h2>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">Gabung dua dataset, lihat hubungannya</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-5 sm:p-8 text-white">
        <div className="flex items-center gap-3 mb-3">
          <Zap className="w-5 h-5 text-amber-400" />
          <h3 className="text-base sm:text-lg font-bold">Korelasi Pearson</h3>
        </div>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Menghitung hubungan antara dua variabel ekonomi. <strong>r</strong> berkisar -1 hingga +1. Mendekati ±1 = hubungan kuat, mendekati 0 = lemah. Rumus: <code className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">r = Σ[(xi-x̄)(yi-ȳ)] / √[Σ(xi-x̄)² × Σ(yi-ȳ)²]</code>
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DatasetSelector label="Variabel X" value={selectedX} search={searchX} setSearch={setSearchX} showDropdown={showDropdownX} setShowDropdown={setShowDropdownX} filtered={filteredX} onSelect={setSelectedX} excludeId={selectedY} allDatasets={datasets} categories={categoryNames} />
        <DatasetSelector label="Variabel Y" value={selectedY} search={searchY} setSearch={setSearchY} showDropdown={showDropdownY} setShowDropdown={setShowDropdownY} filtered={filteredY} onSelect={setSelectedY} excludeId={selectedX} allDatasets={datasets} categories={categoryNames} />
      </motion.div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-1">Koefisien r</p>
              <p className={`text-xl sm:text-2xl font-bold ${getStrengthColor(result.r)}`}>{result.r.toFixed(4)}</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-1">R-Squared</p>
              <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{result.rSquared.toFixed(4)}</p>
              <p className="text-[10px] text-slate-400">{(result.rSquared * 100).toFixed(1)}% variasi</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-1">Kekuatan</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white capitalize">{result.strength}</p>
              <p className="text-[10px] text-slate-400 capitalize">{result.direction}</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-1">Sampel</p>
              <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{result.sampleSize}</p>
              <p className="text-[10px] text-slate-400">periode</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Apa Artinya Ini?</h3>

            <div className="p-4 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/30 dark:to-violet-950/30 rounded-xl mb-4">
              <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
                {result.simpleSummary}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Penjelasan Sederhana</p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {result.whatItMeans}
                </p>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl">
                <p className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1.5">Analogi</p>
                <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 leading-relaxed italic">
                  {result.analogy}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Seberapa Bisa Diandalkan?</p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {result.confidence}
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-[10px] sm:text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                  <strong>Penting:</strong> Korelasi ≠ sebab-akibat. Fakta bahwa dua variabel berkorelasi tidak berarti satu <em>menyebabkan</em> yang lain. Bisa jadi ada variabel ketiga yang mempengaruhi keduanya.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Scatter Plot: {datasetX?.name} vs {datasetY?.name}</h3>
            <ScatterPlot result={result} labelX={datasetX?.name || "X"} labelY={datasetY?.name || "Y"} />
          </div>
        </motion.div>
      )}

      {!result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center py-12 sm:py-16">
          <ArrowRightLeft className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500">Pilih dua dataset untuk melihat korelasi</p>
        </motion.div>
      )}
    </div>
  );
}
