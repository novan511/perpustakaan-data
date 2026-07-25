import { getSectorByRoute } from "@/lib/supabase/sector-queries";
import FiskalClient from "./client";

export default async function FiskalPage() {
  const category = await getSectorByRoute("fiskal");
  return <FiskalClient category={category} />;
}
