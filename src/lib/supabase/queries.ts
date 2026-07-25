import { createServerClient } from "@supabase/ssr";

export function createServiceClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {},
      },
    }
  );
}

export async function getCategories() {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getCategoriesWithDatasets() {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("categories")
    .select(`
      *,
      datasets (
        id, name, slug, source, source_url, unit, description, is_published,
        data_points ( id, period, value, label )
      )
    `)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getPublishedDatasets() {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("datasets")
    .select(`
      id, name, slug, source, source_url, unit, description,
      categories ( id, name, slug ),
      data_points ( period, value, label )
    `)
    .eq("is_published", true)
    .order("name");
  if (error) throw error;
  return data;
}

export async function getDatasetById(id: string) {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("datasets")
    .select(`
      *,
      categories ( id, name, slug ),
      data_points ( id, period, value, label )
    `)
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function getPublishedQAItems() {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("qa_items")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getQAItemBySlug(slug: string) {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("qa_items")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) throw error;
  return data;
}

export async function getPublishedFunFacts() {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("fun_facts")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getPublishedDocuments() {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getDatasetDataPoints(datasetId: string) {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("data_points")
    .select("period, value, label")
    .eq("dataset_id", datasetId)
    .order("period");
  if (error) throw error;
  return data;
}

export async function getStats() {
  const supabase = createServiceClient();
  const [categories, datasets, qaItems, funFacts, documents] = await Promise.all([
    supabase.from("categories").select("id", { count: "exact", head: true }),
    supabase.from("datasets").select("id", { count: "exact", head: true }),
    supabase.from("qa_items").select("id", { count: "exact", head: true }),
    supabase.from("fun_facts").select("id", { count: "exact", head: true }),
    supabase.from("documents").select("id", { count: "exact", head: true }),
  ]);
  return {
    categories: categories.count ?? 0,
    datasets: datasets.count ?? 0,
    qaItems: qaItems.count ?? 0,
    funFacts: funFacts.count ?? 0,
    documents: documents.count ?? 0,
  };
}
