import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/queries";

interface ImportPayload {
  datasetName: string;
  datasetSlug: string;
  categoryId: string;
  source: string;
  sourceUrl: string;
  unit: string;
  description: string;
  headers: string[];
  rows: string[][];
  periodColumnIndex: number;
  valueColumnIndices: number[];
  valueColumnNames: string[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseNumber(val: string): number | null {
  if (!val) return null;
  let cleaned = val.replace(/[^0-9,.\-]/g, "");
  if (cleaned.includes(",") && cleaned.includes(".")) {
    cleaned = cleaned.replace(/,/g, "");
  } else if (cleaned.includes(",")) {
    cleaned = cleaned.replace(/,/g, ".");
  }
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = body as ImportPayload;

    if (!payload.datasetName || !payload.headers?.length || !payload.rows?.length) {
      return NextResponse.json(
        { error: "datasetName, headers, dan rows diperlukan" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    const { data: existingCategory } = await supabase
      .from("categories")
      .select("id")
      .eq("id", payload.categoryId)
      .single();

    if (!existingCategory) {
      return NextResponse.json(
        { error: `Category ID ${payload.categoryId} tidak ditemukan` },
        { status: 400 }
      );
    }

    const slug = payload.datasetSlug || slugify(payload.datasetName);

    const { data: existingDataset } = await supabase
      .from("datasets")
      .select("id")
      .eq("slug", slug)
      .single();

    let datasetId: string;

    if (existingDataset) {
      const { error: updateError } = await supabase
        .from("datasets")
        .update({
          name: payload.datasetName,
          source: payload.source,
          source_url: payload.sourceUrl,
          unit: payload.unit,
          description: payload.description,
          is_published: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingDataset.id);

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      datasetId = existingDataset.id;

      await supabase.from("data_points").delete().eq("dataset_id", datasetId);
    } else {
      const { data: newDataset, error: insertError } = await supabase
        .from("datasets")
        .insert({
          name: payload.datasetName,
          slug,
          category_id: payload.categoryId,
          source: payload.source,
          source_url: payload.sourceUrl,
          unit: payload.unit,
          description: payload.description,
          is_published: true,
        })
        .select("id")
        .single();

      if (insertError || !newDataset) {
        return NextResponse.json(
          { error: insertError?.message || "Gagal membuat dataset" },
          { status: 500 }
        );
      }

      datasetId = newDataset.id;
    }

    const dataPoints: {
      dataset_id: string;
      period: string;
      value: number;
      label: string;
    }[] = [];

    for (const row of payload.rows) {
      const period = row[payload.periodColumnIndex]?.trim();
      if (!period) continue;

      for (const valIdx of payload.valueColumnIndices) {
        const val = parseNumber(row[valIdx]);
        if (val === null) continue;

        const colName = payload.valueColumnNames[valIdx] || payload.headers[valIdx] || "";

        dataPoints.push({
          dataset_id: datasetId,
          period,
          value: val,
          label: colName || period,
        });
      }
    }

    if (dataPoints.length === 0) {
      return NextResponse.json(
        { error: "Tidak ada data valid yang bisa diimport. Periksa format angka." },
        { status: 400 }
      );
    }

    const BATCH_SIZE = 500;
    let inserted = 0;
    for (let i = 0; i < dataPoints.length; i += BATCH_SIZE) {
      const batch = dataPoints.slice(i, i + BATCH_SIZE);
      const { error } = await supabase.from("data_points").insert(batch);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      inserted += batch.length;
    }

    return NextResponse.json({
      success: true,
      datasetId,
      datasetName: payload.datasetName,
      dataPointsInserted: inserted,
      slug,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gagal import data" },
      { status: 500 }
    );
  }
}
