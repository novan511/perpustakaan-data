import { fetchCategories } from "@/lib/api-adapter";
import JelajahiClient from "./jelajahi-client";

export default async function JelajahiPage() {
  const categories = await fetchCategories();
  const totalDatasets = categories.reduce((acc, c) => acc + c.datasets.length, 0);

  return (
    <JelajahiClient
      categories={categories}
      totalCategories={categories.length}
      totalDatasets={totalDatasets}
    />
  );
}
