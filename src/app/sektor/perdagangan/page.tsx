import { getSectorByRoute } from "@/lib/supabase/sector-queries";
import PerdaganganClient from "./client";

export default async function PerdaganganPage() {
  const category = await getSectorByRoute("perdagangan");
  return <PerdaganganClient category={category} />;
}
