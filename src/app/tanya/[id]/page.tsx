"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, HelpCircle, TrendingUp, Heart, BookOpen, Leaf, Smartphone, Users } from "lucide-react";
import { qaData, type QAItem } from "@/lib/data/qa-data";
import { useParams } from "next/navigation";

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

export default function TanyaDetailPage() {
  const { id } = useParams();
  const qa = qaData.find((q) => q.id === id);

  if (!qa) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 text-center">
        <p className="text-sm text-slate-500">Pertanyaan tidak ditemukan.</p>
        <Link href="/tanya" className="mt-3 inline-block text-xs text-red-500 hover:underline">Kembali ke Tanya Data</Link>
      </div>
    );
  }

  const Icon = iconMap[qa.category] || HelpCircle;
  const color = colorMap[qa.category] || "from-slate-500 to-slate-600";

  const relatedQAs = qa.relatedQuestions
    ?.map((rid) => qaData.find((q) => q.id === rid))
    .filter(Boolean) as QAItem[] | undefined;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/tanya" className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">{qa.category}</span>
          <span className="text-[10px] bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded text-blue-600 dark:text-blue-400">{qa.source}</span>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              {qa.question}
            </h1>
          </div>
        </div>

        <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
          {qa.answer.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-xs sm:text-sm">{paragraph}</p>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2">
          <a
            href={qa.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ExternalLink className="w-3 h-3" />
            Lihat sumber data
          </a>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Data Pendukung</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {qa.dataPoints.map((dp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl"
            >
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">{dp.label}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">{dp.source}</p>
              </div>
              <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white ml-3 flex-shrink-0">
                {dp.value}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {relatedQAs && relatedQAs.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Pertanyaan Terkait</h3>
          <div className="space-y-2">
            {relatedQAs.map((rqa) => {
              const RIcon = iconMap[rqa.category] || HelpCircle;
              const rColor = colorMap[rqa.category] || "from-slate-500 to-slate-600";
              return (
                <Link
                  key={rqa.id}
                  href={`/tanya/${rqa.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${rColor} flex items-center justify-center flex-shrink-0`}>
                    <RIcon className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white group-hover:text-red-500 transition-colors truncate">
                      {rqa.question}
                    </p>
                    <p className="text-[10px] text-slate-400">{rqa.source}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
