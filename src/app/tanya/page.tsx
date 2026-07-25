import { fetchQAItems } from "@/lib/api-adapter";
import TanyaClient from "./tanya-client";

export default async function TanyaPage() {
  const qaItems = await fetchQAItems();

  const categoryMap = new Map<string, number>();
  for (const item of qaItems) {
    categoryMap.set(item.category, (categoryMap.get(item.category) || 0) + 1);
  }
  const categories = Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <TanyaClient
      qaItems={qaItems}
      categories={categories}
      totalItems={qaItems.length}
    />
  );
}
