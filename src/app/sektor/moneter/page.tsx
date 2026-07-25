import { getSectorByRoute } from "@/lib/supabase/sector-queries";
import MoneterClient from "./client";

export default async function MoneterPage() {
  const category = await getSectorByRoute("moneter");
  return <MoneterClient category={category} />;
}
