import { createServiceClient } from "@/lib/supabase/queries";
import type { DataPoint } from "@/types";
import AnalisisClient from "./analisis-client";

export const dynamic = "force-dynamic";

async function getDatasetBySlug(slug: string): Promise<DataPoint[]> {
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

export default async function AnalisisPage() {
  const [inflasiData, biRateHistory, asetPerbankan, nplData, penerimaanNegara, pdrbData] =
    await Promise.all([
      getDatasetBySlug("inflasi-cpi"),
      getDatasetBySlug("bi-rate"),
      getDatasetBySlug("aset-perbankan"),
      getDatasetBySlug("npl"),
      getDatasetBySlug("penerimaan-negara"),
      getDatasetBySlug("pdb-indonesia"),
    ]);

  return (
    <AnalisisClient
      inflasiData={inflasiData}
      biRateHistory={biRateHistory}
      asetPerbankan={asetPerbankan}
      nplData={nplData}
      penerimaanNegara={penerimaanNegara}
      pdrbData={pdrbData}
    />
  );
}
