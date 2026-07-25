import { fetchCategories } from "@/lib/api-adapter";
import KorelasiClient from "./korelasi-client";

export default async function KorelasiPage() {
  const categories = await fetchCategories();

  const datasets = categories.flatMap((cat) =>
    cat.datasets.map((ds) => ({
      id: ds.id,
      name: ds.name,
      category: cat.name,
      source: ds.source ?? "",
      data: ds.data_points.map((dp) => ({ period: dp.period, value: dp.value })),
    }))
  );

  const categoryNames = [...new Set(datasets.map((d) => d.category))];

  return <KorelasiClient datasets={datasets} categoryNames={categoryNames} />;
}
