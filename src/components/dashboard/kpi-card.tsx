"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  BarChart3,
  Percent,
  Users,
  UserX,
  Globe,
  DollarSign,
  Landmark,
  Banknote,
  Shield,
  AlertTriangle,
  Building2,
  Wallet,
  Receipt,
  TrendingDown as TrendingDownIcon,
  PieChart,
  Scale,
  ArrowUpRight,
  ArrowDownRight,
  Package,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  Percent,
  Users,
  UserX,
  Globe,
  DollarSign,
  Landmark,
  Banknote,
  Shield,
  AlertTriangle,
  Building2,
  Wallet,
  Receipt,
  TrendingDown: TrendingDownIcon,
  PieChart,
  Scale,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  BarChart3,
};

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  color: string;
  source: string;
  description: string;
}

export default function KPICard({
  title,
  value,
  change,
  changeLabel,
  icon,
  color,
  source,
  description,
}: KPICardProps) {
  const Icon = iconMap[icon] || BarChart3;
  const isPositive = change > 0;
  const isNeutral = change === 0;

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
      <div
        className={cn(
          "absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-10 rounded-bl-[60px] transition-opacity group-hover:opacity-20",
          color
        )}
      />

      <div className="flex items-start justify-between mb-3">
        <div
          className={cn(
            "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg",
            color
          )}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
          {source}
        </span>
      </div>

      <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
        {title}
      </h3>
      <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
        {value}
      </p>

      <div className="flex items-center gap-1.5">
        {!isNeutral ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-md",
              isPositive
                ? "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30"
                : "text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-900/30"
            )}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {Math.abs(change).toFixed(1)}%
          </span>
        ) : (
          <span className="inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-md text-slate-500 bg-slate-100 dark:text-slate-400 dark:bg-slate-800">
            <Minus className="w-3 h-3" />
            Stabil
          </span>
        )}
        <span className="text-[10px] text-slate-400 dark:text-slate-500">
          {changeLabel}
        </span>
      </div>

      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
