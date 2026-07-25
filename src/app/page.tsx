import { Suspense } from "react";
import {
  fetchCategories,
  fetchFunFacts,
  fetchQAItems,
} from "@/lib/api-adapter";
import { createServiceClient } from "@/lib/supabase/queries";
import type { DataPoint } from "@/types";
import HomepageClient from "./homepage-client";

export const dynamic = "force-dynamic";

async function getTickerData(): Promise<
  { label: string; value: string; change: string; positive: boolean }[]
> {
  const supabase = createServiceClient();
  const tickerSlugs = [
    "inflasi-cpi",
    "kurs-jisdor",
    "bi-rate",
    "pdb-indonesia",
    "pengangguran",
    "kemiskinan",
    "cadangan-devisa",
    "neraca-perdagangan",
  ];

  try {
    const { data: datasets } = await supabase
      .from("datasets")
      .select(`
        name, slug, unit,
        data_points ( period, value, label )
      `)
      .in("slug", tickerSlugs)
      .eq("is_published", true);

    if (!datasets) return getDefaultTicker();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (datasets as any[]).map((ds: any) => {
      const points = (ds.data_points as { period: string; value: number }[]) ?? [];
      const latest = points[points.length - 1];
      const previous = points[points.length - 2];
      const change = previous
        ? ((latest.value - previous.value) / Math.abs(previous.value)) * 100
        : 0;

      return {
        label: ds.name as string,
        value: latest
          ? `${latest.value.toLocaleString("id-ID")} ${ds.unit ?? ""}`
          : "-",
        change: `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`,
        positive: change >= 0,
      };
    });
  } catch {
    return getDefaultTicker();
  }
}

function getDefaultTicker() {
  return [
    { label: "Inflasi CPI", value: "1.51%", change: "+0.1%", positive: false },
    { label: "Kurs JISDOR", value: "Rp 16.250", change: "-0.3%", positive: true },
    { label: "BI-Rate", value: "5.75%", change: "0.0%", positive: true },
    { label: "PDB Q4-2024", value: "5.03%", change: "+0.1%", positive: true },
  ];
}

async function getKPIData() {
  const supabase = createServiceClient();
  try {
    const { data } = await supabase
      .from("datasets")
      .select(`
        id, name, slug, source, unit,
        categories ( name ),
        data_points ( period, value, label )
      `)
      .eq("is_published", true)
      .limit(20);

    if (!data) return [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data as any[]).slice(0, 8).map((ds: any) => {
      const points = (ds.data_points as { period: string; value: number }[]) ?? [];
      const latest = points[points.length - 1];
      const previous = points[points.length - 2];
      const change = previous
        ? ((latest.value - previous.value) / Math.abs(previous.value)) * 100
        : 0;
      const categoryName =
        (ds.categories as Record<string, unknown> | null)?.name ?? "Umum";
      const colorMap: Record<string, string> = {
        Ekonomi: "from-blue-500 to-blue-600",
        Moneter: "from-amber-500 to-amber-600",
        Perdagangan: "from-emerald-500 to-emerald-600",
        Perbankan: "from-violet-500 to-violet-600",
        Fiskal: "from-rose-500 to-rose-600",
      };

      return {
        title: ds.name as string,
        value: latest
          ? `${latest.value.toLocaleString("id-ID")} ${ds.unit ?? ""}`
          : "-",
        change,
        changeLabel: latest?.period ?? "",
        icon: "TrendingUp",
        color: colorMap[categoryName as string] ?? "from-slate-500 to-slate-600",
        source: ds.source ?? "N/A",
        description: ds.name as string,
      };
    });
  } catch {
    return [];
  }
}

async function getChartData(slug: string): Promise<DataPoint[]> {
  const supabase = createServiceClient();
  try {
    const { data: dataset } = await supabase
      .from("datasets")
      .select("id")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (!dataset) return [];

    const { data: points } = await supabase
      .from("data_points")
      .select("period, value, label")
      .eq("dataset_id", dataset.id)
      .order("period");

    return (points ?? []).map((p) => ({
      period: p.period,
      value: p.value,
      label: p.label ?? undefined,
    }));
  } catch {
    return [];
  }
}

export default async function DashboardPage() {
  const [categories, funFacts, qaItems, tickerData, kpiData, inflasiData, jisdorData] =
    await Promise.all([
      fetchCategories().catch(() => []),
      fetchFunFacts().catch(() => []),
      fetchQAItems().catch(() => []),
      getTickerData(),
      getKPIData(),
      getChartData("inflasi-cpi"),
      getChartData("kurs-jisdor"),
    ]);

  const totalDatasets = categories.reduce((acc, c) => acc + c.datasets.length, 0);

  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl"
                />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <HomepageClient
        tickerData={tickerData}
        funFacts={funFacts}
        qaItems={qaItems}
        kpiData={kpiData}
        inflasiData={inflasiData}
        jisdorData={jisdorData}
        stats={{
          sources: "20+",
          datasets: `${totalDatasets}+`,
          tools: "6",
          questions: `${qaItems.length}+`,
        }}
      />
    </Suspense>
  );
}
