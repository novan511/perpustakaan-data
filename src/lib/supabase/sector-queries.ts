import { createServiceClient } from "./queries";
import type { KPIData, DataPoint } from "@/types";

export interface SupabaseDataPoint {
  period: string;
  value: number;
  label?: string;
}

export interface SupabaseDataset {
  id: string;
  name: string;
  slug: string;
  source: string;
  source_url: string;
  unit: string;
  description: string;
  is_published: boolean;
  data_points: SupabaseDataPoint[];
}

export interface SupabaseCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  sort_order: number;
  datasets: SupabaseDataset[];
}

export const SECTOR_MAP: Record<string, { slugPatterns: string[]; namePatterns: string[] }> = {
  statistik: { slugPatterns: ["bps"], namePatterns: ["BPS", "Statistik"] },
  moneter: { slugPatterns: ["bi-"], namePatterns: ["Moneter", "Bank Indonesia"] },
  perbankan: { slugPatterns: ["ojk"], namePatterns: ["Perbankan", "OJK"] },
  perdagangan: { slugPatterns: ["kemendag"], namePatterns: ["Perdagangan", "Kemendag"] },
  simpanan: { slugPatterns: ["lps"], namePatterns: ["Simpanan", "LPS"] },
  fiskal: { slugPatterns: ["kemenkeu"], namePatterns: ["Fiskal", "Kemenkeu"] },
};

function matchesSector(category: SupabaseCategory, route: string): boolean {
  const config = SECTOR_MAP[route];
  if (!config) return false;
  const slug = category.slug.toLowerCase();
  const name = category.name.toLowerCase();
  return (
    config.slugPatterns.some((p) => slug.includes(p.toLowerCase())) ||
    config.namePatterns.some((p) => name.includes(p.toLowerCase()))
  );
}

export async function getSectorByRoute(route: string): Promise<SupabaseCategory | null> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*, datasets(*, data_points(period, value, label))")
    .order("sort_order", { ascending: true })
    .order("sort_order", { foreignTable: "datasets", ascending: true });

  if (error || !data) return null;
  const categories = data as SupabaseCategory[];
  return categories.find((c) => matchesSector(c, route)) || null;
}

export async function getAllSectorsForOverview(): Promise<{ route: string; category: SupabaseCategory }[]> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*, datasets(*, data_points(period, value, label))")
    .order("sort_order", { ascending: true })
    .order("sort_order", { foreignTable: "datasets", ascending: true });

  if (error || !data) return [];
  const categories = data as SupabaseCategory[];
  const results: { route: string; category: SupabaseCategory }[] = [];
  for (const route of Object.keys(SECTOR_MAP)) {
    const category = categories.find((c) => matchesSector(c, route));
    if (category) results.push({ route, category });
  }
  return results;
}

export function datasetsToKPIs(datasets: SupabaseDataset[]): KPIData[] {
  return datasets.map((ds) => {
    const points = [...(ds.data_points || [])].sort((a, b) => a.period.localeCompare(b.period));
    const latest = points[points.length - 1];
    const previous = points.length >= 2 ? points[points.length - 2] : null;
    const change =
      previous && previous.value !== 0
        ? Math.round(((latest.value - previous.value) / Math.abs(previous.value)) * 10000) / 100
        : 0;

    return {
      title: ds.name,
      value: formatKPIValue(latest?.value ?? 0, ds.unit),
      change,
      changeLabel: latest?.period || "",
      icon: getIconForDataset(ds.slug),
      color: getColorForDataset(ds.slug),
      source: ds.source || "",
      description: ds.description || "",
    };
  });
}

export function datasetToDataPoints(dataset: SupabaseDataset | undefined): DataPoint[] {
  if (!dataset) return [];
  return [...(dataset.data_points || [])]
    .sort((a, b) => a.period.localeCompare(b.period))
    .map((dp) => ({
      period: dp.period,
      value: dp.value,
      ...(dp.label ? { label: dp.label } : {}),
    }));
}

export function findDataset(datasets: SupabaseDataset[], ...patterns: string[]): SupabaseDataset | undefined {
  return datasets.find((d) => {
    const slug = d.slug.toLowerCase();
    const name = d.name.toLowerCase();
    return patterns.some((p) => slug.includes(p.toLowerCase()) || name.includes(p.toLowerCase()));
  });
}

export function createFormatValue(unit: string): (v: number) => string {
  const u = (unit || "").toLowerCase();
  if (u.includes("rp") || u.includes("idr")) {
    if (u.includes("triliun") || u.includes(" t")) return (v) => `Rp ${v.toLocaleString("id-ID")} T`;
    if (u.includes("miliar") || u.includes(" b")) return (v) => `Rp ${v.toLocaleString("id-ID")} Miliar`;
    return (v) => `Rp ${v.toLocaleString("id-ID")}`;
  }
  if (u.includes("usd") || u.includes("$")) {
    if (u.includes("miliar") || u.includes(" b")) return (v) => `US$ ${v.toFixed(1)} Miliar`;
    return (v) => `US$ ${v.toLocaleString("id-ID")}`;
  }
  if (u.includes("%")) return (v) => `${v.toFixed(2)}%`;
  if (u.includes("juta") || u.includes("million")) return (v) => `${v.toLocaleString("id-ID")} Juta`;
  return (v) => v.toLocaleString("id-ID");
}

export function getChartTypeForDataset(slug: string): "line" | "area" | "bar" {
  const s = slug.toLowerCase();
  if (s.includes("pertumbuhan-kredit") || s.includes("defisit")) return "bar";
  return "area";
}

export function getChartColor(index: number): string {
  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4"];
  return colors[index % colors.length];
}

function formatKPIValue(value: number, unit: string): string {
  return createFormatValue(unit)(value);
}

function getIconForDataset(slug: string): string {
  const s = slug.toLowerCase();
  if (s.includes("pdb") || s.includes("gdp")) return "TrendingUp";
  if (s.includes("inflasi") || s.includes("cpi")) return "Percent";
  if (s.includes("kemiskinan") || s.includes("poverty")) return "Users";
  if (s.includes("pengangguran") || s.includes("unemploy")) return "UserX";
  if (s.includes("populasi") || s.includes("population")) return "Globe";
  if (s.includes("bi-rate") || s.includes("suku-bunga")) return "Percent";
  if (s.includes("jisdor") || s.includes("kurs")) return "DollarSign";
  if (s.includes("cadangan-devisa")) return "Landmark";
  if (s.includes("uang-beredar")) return "Banknote";
  if (s.includes("aset")) return "Building2";
  if (s.includes("npl")) return "AlertTriangle";
  if (s.includes("kredit")) return "TrendingUp";
  if (s.includes("modal")) return "Shield";
  if (s.includes("neraca")) return "Scale";
  if (s.includes("ekspor")) return "ArrowUpRight";
  if (s.includes("impor")) return "ArrowDownRight";
  if (s.includes("komoditas")) return "Package";
  if (s.includes("bunga")) return "Percent";
  if (s.includes("distribusi")) return "Users";
  if (s.includes("indeks")) return "Users";
  if (s.includes("penerimaan")) return "Wallet";
  if (s.includes("belanja")) return "Receipt";
  if (s.includes("defisit")) return "TrendingDown";
  if (s.includes("komposisi")) return "PieChart";
  if (s.includes("alokasi")) return "PieChart";
  return "BarChart3";
}

function getColorForDataset(slug: string): string {
  const s = slug.toLowerCase();
  if (s.includes("pdb") || s.includes("gdp")) return "from-blue-500 to-blue-600";
  if (s.includes("inflasi") || s.includes("cpi")) return "from-emerald-500 to-emerald-600";
  if (s.includes("kemiskinan") || s.includes("poverty")) return "from-amber-500 to-amber-600";
  if (s.includes("pengangguran") || s.includes("unemploy")) return "from-red-500 to-red-600";
  if (s.includes("populasi") || s.includes("population")) return "from-violet-500 to-violet-600";
  if (s.includes("bi-rate") || s.includes("suku-bunga")) return "from-red-500 to-red-600";
  if (s.includes("jisdor") || s.includes("kurs")) return "from-blue-500 to-blue-600";
  if (s.includes("cadangan-devisa")) return "from-emerald-500 to-emerald-600";
  if (s.includes("uang-beredar")) return "from-violet-500 to-violet-600";
  if (s.includes("aset")) return "from-blue-500 to-blue-600";
  if (s.includes("npl")) return "from-amber-500 to-amber-600";
  if (s.includes("kredit")) return "from-emerald-500 to-emerald-600";
  if (s.includes("modal")) return "from-violet-500 to-violet-600";
  if (s.includes("neraca")) return "from-blue-500 to-blue-600";
  if (s.includes("ekspor")) return "from-emerald-500 to-emerald-600";
  if (s.includes("impor")) return "from-amber-500 to-amber-600";
  if (s.includes("komoditas")) return "from-violet-500 to-violet-600";
  if (s.includes("bunga-penjaminan")) return "from-pink-500 to-pink-600";
  if (s.includes("bunga")) return "from-blue-500 to-blue-600";
  if (s.includes("distribusi")) return "from-emerald-500 to-emerald-600";
  if (s.includes("indeks")) return "from-cyan-500 to-cyan-600";
  if (s.includes("penerimaan")) return "from-blue-500 to-blue-600";
  if (s.includes("belanja")) return "from-emerald-500 to-emerald-600";
  if (s.includes("defisit")) return "from-red-500 to-red-600";
  if (s.includes("komposisi")) return "from-violet-500 to-violet-600";
  if (s.includes("alokasi")) return "from-violet-500 to-violet-600";
  return "from-slate-500 to-slate-600";
}
