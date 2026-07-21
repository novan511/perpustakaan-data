import { NextRequest, NextResponse } from "next/server";

const AI_BASE_URL = "https://token-plan-sgp.xiaomimimo.com/v1";

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json({ error: "apiKey diperlukan" }, { status: 400 });
    }

    const res = await fetch(`${AI_BASE_URL}/models`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: `Gagal mengambil model: ${res.status} ${err}` }, { status: 502 });
    }

    const data = await res.json();
    const models = data.data?.map((m: { id: string }) => m.id) || [];
    return NextResponse.json({ models });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
