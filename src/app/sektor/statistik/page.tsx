import { getSectorByRoute } from "@/lib/supabase/sector-queries";
import StatistikClient from "./client";

export default async function StatistikPage() {
  const category = await getSectorByRoute("statistik");
  return <StatistikClient category={category} />;
}
