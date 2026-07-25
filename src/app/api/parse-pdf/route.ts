import { NextRequest, NextResponse } from "next/server";

const AI_BASE_URL = "https://token-plan-sgp.xiaomimimo.com/v1";
const AI_MODEL = "MiMo-7B-RL";

async function extractTextFromPDF(buffer: Buffer): Promise<{ text: string; pageCount: number }> {
  return new Promise((resolve, reject) => {
    import("pdf2json").then((pdf2jsonModule) => {
      const PDFParser = pdf2jsonModule.default;
      const parser = new PDFParser();

      parser.on("pdfParser_dataError", (errData: Error | { parserError: Error }) => {
        const msg = errData instanceof Error ? errData.message : String(errData.parserError);
        reject(new Error(msg));
      });

      parser.on("pdfParser_dataReady", (pdfData: { Pages?: Array<{ Texts?: Array<{ R?: Array<{ T?: string }> }> }> }) => {
        let fullText = "";
        let pageCount = 0;

        if (pdfData.Pages) {
          pageCount = pdfData.Pages.length;
          for (const page of pdfData.Pages) {
            if (page.Texts) {
              for (const textItem of page.Texts) {
                if (textItem.R) {
                  for (const r of textItem.R) {
                    if (r.T) {
                      fullText += decodeURIComponent(r.T) + " ";
                    }
                  }
                }
              }
            }
            fullText += "\n";
          }
        }

        resolve({ text: fullText, pageCount });
      });

      parser.parseBuffer(buffer);
    }).catch(reject);
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const apiKey = formData.get("apiKey") as string | null;

    if (!file) {
      return NextResponse.json({ error: "File PDF diperlukan" }, { status: 400 });
    }
    if (!apiKey) {
      return NextResponse.json({ error: "API key MiMo diperlukan" }, { status: 400 });
    }
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "File harus berformat PDF" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { text: rawText, pageCount } = await extractTextFromPDF(buffer);

    if (!rawText || rawText.trim().length < 50) {
      return NextResponse.json(
        { error: "Tidak bisa mengekstrak teks dari PDF. Pastikan PDF berisi teks, bukan hanya gambar." },
        { status: 422 }
      );
    }

    const truncatedText = rawText.substring(0, 12000);

    const systemPrompt = `Kamu adalah ahli ekstraksi data dari dokumen PDF Indonesia. Tugas kamu:
1. Temukan SEMUA tabel data di dalam teks PDF
2. Ekstrak tabel menjadi format JSON yang terstruktur
3. Setiap tabel harus punya: headers, rows, dan title/judul tabel

PENTING: 
- Hanya ekstrak tabel yang BERISI DATA ANGKA (bukan teks biasa)
- Pastikan kolom period (tahun/bulan) teridentifikasi
- Pastikan kolom value (angka) teridentifikasi
- Bersihkan angka dari separator (titik/koma ribuan)
- Format period yang konsisten: "2024", "2024-01", "Q1-2024", dst.

Response HARUS dalam format JSON array. Contoh:
[
  {
    "title": "Judul Tabel",
    "headers": ["Periode", "Nilai 1", "Nilai 2"],
    "rows": [
      ["2020", "100", "200"],
      ["2021", "150", "250"]
    ],
    "suggestedDatasetName": "Nama Dataset",
    "suggestedUnit": "satuan",
    "suggestedSource": "Sumber"
  }
]

Jika tidak ada tabel data yang ditemukan, return array kosong [].`;

    const aiResponse = await fetch(`${AI_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Berikut adalah teks yang diekstrak dari PDF:\n\n${truncatedText}\n\nTemukan semua tabel data dan ekstrak dalam format JSON.`,
          },
        ],
        temperature: 0.1,
        max_tokens: 8000,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      return NextResponse.json(
        { error: `AI error (${aiResponse.status}): ${errorText}` },
        { status: 502 }
      );
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: "AI tidak mengembalikan respons" }, { status: 500 });
    }

    let cleaned = content.trim();
    if (cleaned.startsWith("```json")) cleaned = cleaned.slice(7);
    else if (cleaned.startsWith("```")) cleaned = cleaned.slice(3);
    if (cleaned.endsWith("```")) cleaned = cleaned.slice(0, -3);
    cleaned = cleaned.trim();

    let tables: unknown[];
    try {
      tables = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: "Response AI bukan JSON valid. Coba lagi.", raw: cleaned.substring(0, 500) },
        { status: 500 }
      );
    }

    if (!Array.isArray(tables)) {
      return NextResponse.json({ error: "Response bukan array" }, { status: 500 });
    }

    return NextResponse.json({
      tables,
      fileName: file.name,
      fileSize: file.size,
      pageCount,
      extractedChars: rawText.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gagal memproses PDF" },
      { status: 500 }
    );
  }
}
