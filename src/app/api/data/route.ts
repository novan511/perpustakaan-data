import { NextResponse } from "next/server";
import {
  fetchCategories,
  fetchQAItems,
  fetchFunFacts,
  fetchDashboardStats,
} from "@/lib/api-adapter";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const resource = searchParams.get("resource");

    switch (resource) {
      case "categories": {
        const data = await fetchCategories();
        return NextResponse.json({ data, timestamp: new Date().toISOString() });
      }
      case "qa": {
        const data = await fetchQAItems();
        return NextResponse.json({ data, timestamp: new Date().toISOString() });
      }
      case "fun-facts": {
        const data = await fetchFunFacts();
        return NextResponse.json({ data, timestamp: new Date().toISOString() });
      }
      case "stats": {
        const data = await fetchDashboardStats();
        return NextResponse.json({ data, timestamp: new Date().toISOString() });
      }
      case "all": {
        const [categories, qa, funFacts, stats] = await Promise.all([
          fetchCategories(),
          fetchQAItems(),
          fetchFunFacts(),
          fetchDashboardStats(),
        ]);
        return NextResponse.json({
          data: { categories, qa, funFacts, stats },
          timestamp: new Date().toISOString(),
        });
      }
      default:
        return NextResponse.json(
          { error: "resource parameter required: categories, qa, fun-facts, stats, all" },
          { status: 400 }
        );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
