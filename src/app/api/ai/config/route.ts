import { NextRequest, NextResponse } from "next/server";

const AI_BASE_URL = "https://token-plan-sgp.xiaomimimo.com/v1";
const AI_MODEL = "gpt-4o-mini";

function maskKey(key: string): string {
  if (key.length <= 8) {
    return "****";
  }
  return key.slice(0, 4) + "****" + key.slice(-4);
}

export async function GET(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");

  if (!apiKey) {
    return NextResponse.json(
      { error: "Tidak ada API key yang dikirim", configured: false },
      { status: 400 }
    );
  }

  return NextResponse.json({
    configured: true,
    maskedKey: maskKey(apiKey),
    baseUrl: AI_BASE_URL,
    model: AI_MODEL,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { apiKey } = body as { apiKey: string };

    if (!apiKey) {
      return NextResponse.json(
        { error: "apiKey diperlukan untuk validasi" },
        { status: 400 }
      );
    }

    const aiResponse = await fetch(`${AI_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          {
            role: "user",
            content: "Ketik 'oke' saja sebagai respons.",
          },
        ],
        max_tokens: 10,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      return NextResponse.json(
        {
          valid: false,
          error: `API key tidak valid (${aiResponse.status}): ${errorText}`,
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      valid: true,
      maskedKey: maskKey(apiKey),
      model: AI_MODEL,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Terjadi kesalahan tidak diketahui";
    return NextResponse.json(
      { valid: false, error: message },
      { status: 500 }
    );
  }
}
