import {
  getCategoriesWithDatasets,
  getPublishedQAItems,
  getPublishedFunFacts,
  getStats,
} from "@/lib/supabase/queries";
import type { DataPoint } from "@/types";

export interface APIResponse<T> {
  data: T;
  timestamp: string;
}

export interface CategoryWithDatasets {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  sort_order: number;
  datasets: APIDataset[];
}

export interface APIDataset {
  id: string;
  name: string;
  slug: string;
  source: string | null;
  source_url: string | null;
  unit: string | null;
  description: string | null;
  is_published: boolean;
  data_points: DataPoint[];
}

export interface QAItemRow {
  id: string;
  slug: string;
  question: string;
  answer: string;
  category: string;
  source: string | null;
  source_url: string | null;
  data_points: { label: string; value: string; source?: string }[];
  related_slugs: string[];
  is_published: boolean;
}

export interface FunFactRow {
  id: string;
  headline: string;
  summary: string;
  detail: string;
  source: string | null;
  source_url: string | null;
  category: string | null;
  icon: string | null;
  sort_order: number;
}

export interface DashboardStats {
  categories: number;
  datasets: number;
  qaItems: number;
  funFacts: number;
  documents: number;
}

function transformDataPoints(
  raw: { period: string; value: number; label: string | null }[]
): DataPoint[] {
  return raw.map((dp) => ({
    period: dp.period,
    value: dp.value,
    label: dp.label ?? undefined,
  }));
}

function safeArray(val: unknown): unknown[] {
  return Array.isArray(val) ? val : [];
}

interface SupabaseRow {
  [key: string]: unknown;
}

export async function fetchCategories(): Promise<CategoryWithDatasets[]> {
  const raw = await getCategoriesWithDatasets();
  return safeArray(raw).map((cat) => {
    const c = cat as SupabaseRow;
    const dsList = safeArray(c.datasets).map((dsItem) => {
      const ds = dsItem as SupabaseRow;
      return {
        id: String(ds.id ?? ""),
        name: String(ds.name ?? ""),
        slug: String(ds.slug ?? ""),
        source: (ds.source as string) ?? null,
        source_url: (ds.source_url as string) ?? null,
        unit: (ds.unit as string) ?? null,
        description: (ds.description as string) ?? null,
        is_published: Boolean(ds.is_published),
        data_points: transformDataPoints(
          safeArray(ds.data_points) as { period: string; value: number; label: string | null }[]
        ),
      };
    });
    return {
      id: String(c.id ?? ""),
      name: String(c.name ?? ""),
      slug: String(c.slug ?? ""),
      description: (c.description as string) ?? null,
      icon: (c.icon as string) ?? null,
      color: (c.color as string) ?? null,
      sort_order: (c.sort_order as number) ?? 0,
      datasets: dsList.filter((ds) => ds.is_published),
    };
  });
}

export async function fetchQAItems(): Promise<QAItemRow[]> {
  const raw = await getPublishedQAItems();
  return safeArray(raw).map((item) => {
    const i = item as SupabaseRow;
    return {
      id: String(i.id ?? ""),
      slug: String(i.slug ?? ""),
      question: String(i.question ?? ""),
      answer: String(i.answer ?? ""),
      category: String(i.category ?? ""),
      source: (i.source as string) ?? null,
      source_url: (i.source_url as string) ?? null,
      data_points: safeArray(i.data_points) as { label: string; value: string; source?: string }[],
      related_slugs: safeArray(i.related_slugs) as string[],
      is_published: Boolean(i.is_published),
    };
  });
}

export async function fetchFunFacts(): Promise<FunFactRow[]> {
  const raw = await getPublishedFunFacts();
  return safeArray(raw).map((item) => {
    const i = item as SupabaseRow;
    return {
      id: String(i.id ?? ""),
      headline: String(i.headline ?? ""),
      summary: String(i.summary ?? ""),
      detail: String(i.detail ?? ""),
      source: (i.source as string) ?? null,
      source_url: (i.source_url as string) ?? null,
      category: (i.category as string) ?? null,
      icon: (i.icon as string) ?? null,
      sort_order: (i.sort_order as number) ?? 0,
    };
  });
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  return getStats();
}
