import { getSectorByRoute } from "@/lib/supabase/sector-queries";
import PerbankanClient from "./client";

export default async function PerbankanPage() {
  const category = await getSectorByRoute("perbankan");
  return <PerbankanClient category={category} />;
}
