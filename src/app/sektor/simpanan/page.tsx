import { getSectorByRoute } from "@/lib/supabase/sector-queries";
import SimpananClient from "./client";

export default async function SimpananPage() {
  const category = await getSectorByRoute("simpanan");
  return <SimpananClient category={category} />;
}
