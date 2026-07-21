import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1e12) return `${(num / 1e12).toFixed(1)} T`;
  if (num >= 1e9) return `${(num / 1e9).toFixed(1)} Miliar`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)} Juta`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)} Ribu`;
  return num.toFixed(1);
}

export function formatCurrency(num: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatPercent(num: number): string {
  return `${num >= 0 ? "+" : ""}${num.toFixed(1)}%`;
}

export function formatCompact(num: number): string {
  return new Intl.NumberFormat("id-ID", {
    notation: "compact",
    compactDisplay: "short",
  }).format(num);
}
