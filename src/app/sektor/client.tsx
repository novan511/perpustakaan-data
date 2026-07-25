"use client";

import { motion } from "motion/react";
import KPICard from "@/components/dashboard/kpi-card";
import { InsightBox } from "@/components/ui/insight-box";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { KPIData } from "@/types";

interface SectorItem {
  id: string;
  name: string;
  description: string;
  href: string;
  kpis: KPIData[];
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function SectorListClient({ sectors }: { sectors: SectorItem[] }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Sektor Ekonomi Indonesia</h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Data ekonomi berdasarkan sektor dan lembaga sumber
        </p>
      </motion.div>

      <InsightBox title="Cara Membaca Dashboard Ini" type="info">
        <p>
          Setiap sektor memiliki <strong>KPI cards</strong> (kartu indikator utama), <strong>grafik tren</strong>, dan <strong>tabel data</strong>. Klik &quot;Lihat Detail&quot; untuk analisis lebih dalam dengan penjelasan kenapa data tersebut penting untuk kehidupan sehari-hari.
        </p>
      </InsightBox>

      <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
        {sectors.map((sector) => (
          <motion.div key={sector.id} variants={fadeUp} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800">
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">{sector.name}</h3>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sector.description}</p>
              </div>
              <Link href={sector.href} className="flex items-center gap-1 px-3 py-2 text-[10px] sm:text-xs font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl hover:opacity-90 transition-opacity shadow-lg flex-shrink-0 ml-3">
                Detail <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="p-4 sm:p-5">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {sector.kpis.map((kpi, i) => <KPICard key={i} {...kpi} />)}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
