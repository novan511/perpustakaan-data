"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Target, Shield, Lightbulb, GraduationCap, BarChart3, Globe, Users, Database } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function TentangPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 sm:space-y-8">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Tentang Proyek Ini</h2>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">Landasan empiris dan relevansi akademis</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-5 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-br from-red-500/15 to-transparent rounded-bl-full" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
            <h3 className="text-lg sm:text-xl font-bold">Perpustakaan Data Indonesia</h3>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Platform visualisasi data terbuka yang menjembatani kesenjangan antara data pemerintah yang kompleks dengan pemahaman masyarakat umum.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center"><Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" /></div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Tujuan Proyek</h4>
          </div>
          <ul className="space-y-2 text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" /><span>Menyajikan data dari 6 sumber pemerintah dalam satu platform</span></li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" /><span>Menurunkan barrier of understanding untuk masyarakat awam</span></li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" /><span>Referensi data literacy untuk pelajar dan peneliti</span></li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" /><span>Membangun critical thinking melalui pemahaman data</span></li>
          </ul>
        </motion.div>

        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center"><Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-white" /></div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Relevansi Akademis</h4>
          </div>
          <ul className="space-y-2 text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0" /><span><strong>Data Literacy:</strong> Mendukung UNESCO Data Literacy Framework</span></li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0" /><span><strong>Open Data:</strong> Memanfaatkan data terbuka pemerintah</span></li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0" /><span><strong>Anti-Hoax:</strong> Verifikator data primer melawan misinformasi</span></li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0" /><span><strong>Evidence-Based:</strong> Keputusan berbasis data, bukan opini</span></li>
          </ul>
        </motion.div>
      </div>

      <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center"><Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" /></div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Landasan Empiris</h4>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { stat: "73%", desc: "masyarakat kesulitan membedakan hoaxes (Kominfo 2023)", color: "from-red-500 to-red-600" },
            { stat: "$4.2T", desc: "kerugian global akibat misinformasi/tahun (McKinsey)", color: "from-amber-500 to-amber-600" },
            { stat: "35%", desc: "populasi Indonesia data literate (OECD)", color: "from-blue-500 to-blue-600" },
          ].map((item, i) => (
            <div key={i} className="text-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <p className={`text-lg sm:text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-1 sm:mb-2`}>{item.stat}</p>
              <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center"><BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" /></div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Kerangka Kerja</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { step: "01", title: "Akuisisi", desc: "Data dari BPS, BI, Kemendag, LPS, OJK, Kemenkeu", icon: Database },
            { step: "02", title: "Transformasi", desc: "Pembersihan dan normalisasi format", icon: BarChart3 },
            { step: "03", title: "Visualisasi", desc: "Grafik interaktif yang intuitif", icon: Globe },
            { step: "04", title: "Diseminasi", desc: "Terbuka dan gratis untuk semua", icon: Users },
          ].map((item, i) => (
            <div key={i} className="relative p-3 sm:p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <span className="text-2xl sm:text-3xl font-bold text-slate-200 dark:text-slate-700 absolute top-2 right-3">{item.step}</span>
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 mb-2" />
              <h5 className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white mb-1">{item.title}</h5>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center"><BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" /></div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Referensi & Dasar Teori</h4>
        </div>
        <div className="space-y-2 sm:space-y-3 text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {[
            { title: "UNESCO Data Literacy Framework (2022)", desc: "Data literacy = kemampuan membaca, memahami, dan mengkritisi data untuk keputusan." },
            { title: "Open Data Charter (2015)", desc: "Data pemerintah harus terbuka, dapat diakses, dan digunakan oleh siapa saja." },
            { title: "Indonesia Satu Data (UU No. 14/2023)", desc: "Data pemerintah harus terintegrasi, akurat, dan terbuka untuk publik." },
            { title: "Vosoughi et al. (2018) - Science", desc: "Hoaxes menyebar 6x lebih cepat dari berita benar di media sosial." },
          ].map((ref, i) => (
            <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <p className="font-semibold text-slate-900 dark:text-white mb-1">{ref.title}</p>
              <p>{ref.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-5 sm:p-8 text-white">
        <h4 className="text-base sm:text-lg font-bold mb-3">Kesimpulan</h4>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Perpustakaan Data Indonesia adalah upaya nyata untuk <strong className="text-white">demokratisasi informasi ekonomi</strong>.
          Ketika masyarakat bisa membaca data dengan benar, mereka menjadi lebih resilien terhadap misinformasi,
          lebih cerdas mengambil keputusan keuangan, dan lebih aktif sebagai warga negara yang informed.
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <Link href="/korelasi" className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-lg transition-colors">Coba Analisis Korelasi</Link>
          <Link href="/glossarium" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg transition-colors">Baca Glossarium</Link>
        </div>
      </motion.div>
    </div>
  );
}
