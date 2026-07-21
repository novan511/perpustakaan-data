"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Calculator, TrendingUp, Wallet, PiggyBank, Map, BarChart3, Zap, Globe, Users, Wheat, Gem, TreePine, Smartphone, Coffee, MapPin, GraduationCap } from "lucide-react";
import { EASE_OUT } from "@/lib/constants";
import { funFacts, tickerItems } from "@/lib/data/homepage";
import { bpsKPIs, biKPIs, kemendagKPIs, ojkKPIs } from "@/lib/data";
import { inflasiData } from "@/lib/data/bps";
import { jisdorData } from "@/lib/data/bi";
import ChartWrapper from "@/components/charts/chart-wrapper";
import { useEffect, useState } from "react";

const featuredKPIs = [...bpsKPIs.slice(0, 2), ...biKPIs.slice(0, 2), ...kemendagKPIs.slice(0, 2), ...ojkKPIs.slice(0, 2)];

const tools = [
  { href: "/alat/inflasi", icon: Calculator, title: "Kalkulator Inflasi", desc: "Berapa nilai uang kamu sebenarnya?", color: "from-blue-500 to-blue-600" },
  { href: "/alat/gaji", icon: TrendingUp, title: "Pengecek Gaji", desc: "Gaji kamu di atas/bawah rata-rata?", color: "from-emerald-500 to-emerald-600" },
  { href: "/alat/cicilan", icon: Wallet, title: "Simulator Cicilan", desc: "Cicilan kamu wajar atau keberatan?", color: "from-amber-500 to-amber-600" },
  { href: "/alat/tabungan", icon: PiggyBank, title: "Kalkulator Tabungan", desc: "Berapa lama nabung untuk beli X?", color: "from-violet-500 to-violet-600" },
  { href: "/alat/biaya-hidup", icon: Map, title: "Biaya Hidup", desc: "Bandingkan biaya hidup antar kota", color: "from-rose-500 to-rose-600" },
  { href: "/alat/budget", icon: BarChart3, title: "Pengecek Budget", desc: "Pengeluaran kamu sehat atau boros?", color: "from-cyan-500 to-cyan-600" },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Island: Globe, Users, Wheat, Smartphone, Gem, TreePine, TrendingUp, Coffee, MapPin, GraduationCap,
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
};

function TickerBar() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setOffset((p) => p - 1), 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-900 dark:bg-black border-b border-slate-800 overflow-hidden">
      <div className="flex whitespace-nowrap" style={{ transform: `translateX(${offset}px)` }}>
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-4 py-1.5 text-[10px] border-r border-slate-800">
            <span className="text-slate-400 font-medium">{item.label}</span>
            <span className="text-white font-bold">{item.value}</span>
            <span className={item.positive ? "text-emerald-400" : "text-red-400"}>
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturedStory() {
  const featured = funFacts[0];
  return (
    <Link href="/tanya" className="group block">
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/15 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded">FEATURED</span>
            <span className="text-slate-400 text-[10px]">{featured.category}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold leading-tight mb-3 group-hover:text-red-400 transition-colors">
            {featured.headline}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl mb-4">
            {featured.detail}
          </p>
          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            <span>Sumber: {featured.source}</span>
            <span>•</span>
            <span className="text-red-400 group-hover:underline">Lihat semua Tanya Data →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function FunFactCard({ fact, index }: { fact: typeof funFacts[0]; index: number }) {
  const Icon = iconMap[fact.icon] || Globe;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href="/tanya" className="group block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 hover:shadow-lg transition-all">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400">{fact.category}</span>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-red-500 transition-colors leading-tight mt-0.5">
              {fact.headline}
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">
              {fact.summary}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <TickerBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
        <FeaturedStory />

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-red-500" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Yang Perlu Kamu Tahu Hari Ini</h3>
            </div>
            <Link href="/tanya" className="text-[10px] sm:text-xs text-red-500 hover:underline">Lihat semua →</Link>
          </div>
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {funFacts.slice(1, 7).map((fact, i) => (
              <motion.div key={fact.id} variants={fadeUp}>
                <FunFactCard fact={fact} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Indikator Ekonomi</h3>
            <Link href="/jelajahi" className="text-[10px] sm:text-xs text-red-500 hover:underline">Data lengkap →</Link>
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {featuredKPIs.map((kpi, i) => (
              <motion.div key={i} variants={fadeUp}>
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[10px] text-slate-400">{kpi.source}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-0.5">{kpi.title}</p>
                  <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">{kpi.value}</p>
                  <p className={`text-[10px] mt-1 ${kpi.change >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                    {kpi.change >= 0 ? "↑" : "↓"} {Math.abs(kpi.change).toFixed(1)}% {kpi.changeLabel}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <ChartWrapper
              title="Inflasi (CPI) Bulanan"
              description="YoY % — sumber: BPS"
              data={inflasiData}
              color="#10b981"
              sources={["BPS"]}
              formatValue={(v) => `${v.toFixed(2)}%`}
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <ChartWrapper
              title="Kurs JISDOR (USD/IDR)"
              description="Referensi nilai tukar — sumber: Bank Indonesia"
              data={jisdorData}
              color="#f59e0b"
              sources={["Bank Indonesia"]}
              formatValue={(v) => `Rp ${v.toLocaleString("id-ID")}`}
            />
          </motion.div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-4 h-4 text-red-500" />
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Alat Keputusan Keuangan</h3>
          </div>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mb-4">
            Masukkan situasi kamu, dapatkan jawaban yang bisa langsung dipakai untuk mengambil keputusan.
          </p>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {tools.map((tool) => (
              <motion.div key={tool.href} variants={fadeUp}>
                <Link href={tool.href} className="group block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 hover:shadow-lg transition-all">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-2`}>
                    <tool.icon className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-red-500 transition-colors">{tool.title}</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{tool.desc}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Sumber Data", value: "20+", icon: Globe },
            { label: "Dataset", value: "93+", icon: BarChart3 },
            { label: "Alat Keputusan", value: "6", icon: Calculator },
            { label: "Pertanyaan", value: "30+", icon: Users },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center"
            >
              <stat.icon className="w-5 h-5 text-red-500 mx-auto mb-1" />
              <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              <p className="text-[10px] text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
