import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const AI_BASE_URL = "https://token-plan-sgp.xiaomimimo.com/v1";
const AI_MODEL = "MiMo-7B-RL";

interface DatasetRow {
  id: string;
  name: string;
  slug: string;
  source: string | null;
  source_url: string | null;
  unit: string | null;
  description: string | null;
  categories: { name: string }[] | null;
  data_points: { period: string; value: number; label: string | null }[];
}

function createSupabaseClient() {
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

function parseAIResponse<T>(raw: string): T {
  let cleaned = raw.trim();

  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.slice(3);
  }

  if (cleaned.endsWith("```")) {
    cleaned = cleaned.slice(0, -3);
  }

  cleaned = cleaned.trim();

  return JSON.parse(cleaned);
}

function formatDatasetData(datasets: DatasetRow[]): string {
  return datasets
    .map((ds) => {
      const categoryName = ds.categories?.[0]?.name ?? "Umum";
      const points = ds.data_points
        .map((dp) => {
          const label = dp.label ?? dp.period;
          return `  - ${label}: ${dp.value} ${ds.unit ?? ""}`;
        })
        .join("\n");

      return `[${categoryName}] ${ds.name}\nSumber: ${ds.source ?? "Tidak diketahui"}\nDeskripsi: ${ds.description ?? "-"}\nData:\n${points}`;
    })
    .join("\n\n");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { datasetIds, apiKey, customPrompt, model } = body as {
      datasetIds: string[];
      apiKey: string;
      customPrompt?: string;
      model?: string;
    };

    if (!datasetIds?.length) {
      return NextResponse.json(
        { error: "datasetIds harus berisi minimal 1 ID dataset" },
        { status: 400 }
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: "apiKey diperlukan untuk mengakses AI endpoint" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseClient();

    const { data: datasets, error: fetchError } = await supabase
      .from("datasets")
      .select(
        `
        id, name, slug, source, source_url, unit, description,
        categories ( name ),
        data_points ( period, value, label )
      `
      )
      .in("id", datasetIds);

    if (fetchError) {
      return NextResponse.json(
        { error: `Gagal mengambil data: ${fetchError.message}` },
        { status: 500 }
      );
    }

    if (!datasets?.length) {
      return NextResponse.json(
        { error: "Tidak ditemukan dataset dengan ID yang diberikan" },
        { status: 404 }
      );
    }

    const formattedData = formatDatasetData(datasets as DatasetRow[]);

    const systemPrompt = customPrompt
      ? `${customPrompt}\n\n${formattedData}`
      : `Kamu adalah jurnalis data Indonesia. Berikut adalah data dari berbagai sumber:\n\n${formattedData}\n\nBerdasarkan data di atas, buatlah 5 fakta menarik (fun facts) yang jarang diketahui masyarakat Indonesia. Fakta harus:\n1. Berbasis data (ada angka spesifik)\n2. Mengejutkan atau kontra-intuitif\n3. Mudah dipahami orang awam\n4. Bisa dibagikan di media sosial\n\nUntuk setiap fakta, buatkan:\n- headline: judul yang menarik perhatian (maks 15 kata)\n- summary: ringkasan 1 kalimat\n- detail: penjelasan 2-3 paragraf dengan data spesifik\n- source: sumber data\n- category: kategori (Geografi/Demografi/Pertanian/Lingkungan/Digital/Ekonomi/Industri/Budaya)\n- icon: nama icon (Island/Users/Wheat/Smartphone/Gem/TreePine/TrendingUp/Coffee/MapPin/Globe/GraduationCap)\n\nFormat response sebagai JSON array. Jangan tambahkan markdown atau code blocks.`;

    const aiResponse = await fetch(`${AI_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || AI_MODEL,
        messages: [
          {
            role: "system",
            content:
              "Kamu adalah jurnalis data Indonesia yang ahli menemukan fakta menarik dari data. Selalu respon dalam format JSON yang valid tanpa markdown.",
          },
          {
            role: "user",
            content: systemPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI API Error:", aiResponse.status, errorText);
      return NextResponse.json(
        {
          error: `AI endpoint error (${aiResponse.status}): ${errorText}`,
        },
        { status: 502 }
      );
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "AI tidak mengembalikan konten yang valid" },
        { status: 500 }
      );
    }

    const insights = parseAIResponse<unknown[]>(content);

    if (!Array.isArray(insights)) {
      return NextResponse.json(
        { error: "Response AI bukan array yang valid" },
        { status: 500 }
      );
    }

    return NextResponse.json({ items: insights });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Terjadi kesalahan tidak diketahui";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
