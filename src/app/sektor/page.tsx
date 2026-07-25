import { getAllSectorsForOverview, datasetsToKPIs } from "@/lib/supabase/sector-queries";
import SectorListClient from "./client";

export default async function SektorPage() {
  const sectors = await getAllSectorsForOverview();

  const sectorData = sectors.map(({ route, category }) => ({
    id: route,
    name: category.name,
    description: category.description,
    href: `/sektor/${route}`,
    kpis: datasetsToKPIs(category.datasets.slice(0, 2)),
  }));

  return <SectorListClient sectors={sectorData} />;
}
