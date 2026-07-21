"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import { Lightbulb, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightProps {
  title: string;
  children: ReactNode;
  type?: "info" | "warning" | "tip" | "analysis";
  className?: string;
}

const typeStyles = {
  info: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    icon: Lightbulb,
    iconColor: "text-blue-500",
    titleColor: "text-blue-700 dark:text-blue-400",
  },
  warning: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    icon: AlertCircle,
    iconColor: "text-amber-500",
    titleColor: "text-amber-700 dark:text-amber-400",
  },
  tip: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    icon: TrendingUp,
    iconColor: "text-emerald-500",
    titleColor: "text-emerald-700 dark:text-emerald-400",
  },
  analysis: {
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200 dark:border-violet-800",
    icon: TrendingDown,
    iconColor: "text-violet-500",
    titleColor: "text-violet-700 dark:text-violet-400",
  },
};

export function InsightBox({ title, children, type = "info", className }: InsightProps) {
  const style = typeStyles[type];
  const Icon = style.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "rounded-2xl border p-4 sm:p-5",
        style.bg,
        style.border,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn("mt-0.5 flex-shrink-0", style.iconColor)}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={cn("text-xs font-bold mb-1.5", style.titleColor)}>
            {title}
          </h4>
          <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed space-y-2">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function KPIInsight({
  kpiName,
  value,
  change,
  whyItMatters,
  whatToWatch,
  realImpact,
}: {
  kpiName: string;
  value: string;
  change: number;
  whyItMatters: string;
  whatToWatch: string;
  realImpact: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className={cn(
          "w-2 h-2 rounded-full",
          change > 0 ? "bg-emerald-500" : change < 0 ? "bg-red-500" : "bg-slate-400"
        )} />
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
          {kpiName}
        </h4>
        <span className="text-[10px] font-medium text-slate-400 ml-auto">{value}</span>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Kenapa Ini Penting?
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {whyItMatters}
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
          <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Dampak Nyata untuk Kamu
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {realImpact}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Yang Perlu Diperhatikan
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {whatToWatch}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
