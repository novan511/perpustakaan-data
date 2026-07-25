import { NextRequest, NextResponse } from "next/server";
import Papa from "papaparse";

const AI_BASE_URL = "https://token-plan-sgp.xiaomimimo.com/v1";
const AI_MODEL = "MiMo-7B-RL";

interface ParsedTable {
  title: string;
  headers: string[];
  rows: string[][];
  suggestedDatasetName?: string;
  suggestedUnit?: string;
  suggestedSource?: string;
}

interface ParseResult {
  tables: ParsedTable[];
  fileName: string;
  fileSize: number;
  pageCount?: number;
  extractedChars: number;
  format: string;
}

function inferUnitFromHeaders(headers: string[]): string {
  const joined = headers.join(" ").toLowerCase();
  if (/%|persen/.test(joined)) return "%";
  if (/rp|idr|rupiah/.test(joined)) return "Rp";
  if (/usd|dollar|\$/.test(joined)) return "USD";
  if (/ton|jt\.? ton/.test(joined)) return "ton";
  if (/hektar|ha/.test(joined)) return "hektar";
  if (/juta|million|miliar|billion|triliun|trillion/.test(joined)) return "";
  if (/unit|buah|orang|jiwa|kasus/.test(joined)) return "";
  return "";
}

async function parseCSV(buffer: Buffer, fileName: string): Promise<ParseResult> {
  const text = buffer.toString("utf-8");
  const result = Papa.parse(text, { header: false, skipEmptyLines: true });

  if (result.errors.length > 0 && result.data.length === 0) {
    throw new Error(`CSV parse error: ${result.errors[0].message}`);
  }

  const allRows = result.data as string[][];
  if (allRows.length < 2) {
    throw new Error("CSV harus minimal 2 baris (header + data)");
  }

  const headers = allRows[0].map((h) => h.trim());
  const dataRows = allRows.slice(1).filter((row) => row.some((cell) => cell.trim() !== ""));

  const unit = inferUnitFromHeaders(headers);

  const datasetName = fileName.replace(/\.(csv|tsv|txt)$/i, "").replace(/[-_]/g, " ");

  return {
    tables: [
      {
        title: datasetName,
        headers,
        rows: dataRows,
        suggestedDatasetName: datasetName,
        suggestedUnit: unit,
        suggestedSource: "",
      },
    ],
    fileName,
    fileSize: buffer.length,
    extractedChars: text.length,
    format: "csv",
  };
}

async function parseExcel(buffer: Buffer, fileName: string): Promise<ParseResult> {
  const XLSX = await import("xlsx");
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const tables: ParsedTable[] = [];

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 });

    if (jsonData.length < 2) continue;

    const headers = jsonData[0].map((h) => String(h ?? "").trim());
    const dataRows = jsonData
      .slice(1)
      .map((row) => row.map((cell) => String(cell ?? "").trim()))
      .filter((row) => row.some((cell) => cell !== ""));

    if (dataRows.length === 0) continue;

    const unit = inferUnitFromHeaders(headers);

    const name = workbook.SheetNames.length > 1 ? sheetName : fileName.replace(/\.(xlsx?|xls)$/i, "").replace(/[-_]/g, " ");

    tables.push({
      title: name,
      headers,
      rows: dataRows,
      suggestedDatasetName: name,
      suggestedUnit: unit,
      suggestedSource: "",
    });
  }

  if (tables.length === 0) {
    throw new Error("Tidak ditemukan tabel data di file Excel");
  }

  return {
    tables,
    fileName,
    fileSize: buffer.length,
    extractedChars: JSON.stringify(tables).length,
    format: "excel",
  };
}

async function parseGoogleSheets(url: string): Promise<ParseResult> {
  let csvUrl = url;
  if (url.includes("docs.google.com/spreadsheets")) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
      csvUrl = `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv`;
    }
  }

  const response = await fetch(csvUrl);
  if (!response.ok) {
    throw new Error(`Gagal mengambil data dari URL: ${response.status}`);
  }
  const csvText = await response.text();
  const buffer = Buffer.from(csvText, "utf-8");

  const result = await parseCSV(buffer, "Google Sheets");
  result.format = "google-sheets";
  return result;
}

async function parsePDFWithAI(buffer: Buffer, apiKey: string, fileName: string): Promise<ParseResult> {
  const pdf2json = await import("pdf2json");
  const PDFParser = pdf2json.default;

  const pdfData = await new Promise<{ text: string; pageCount: number }>((resolve, reject) => {
    const parser = new PDFParser();
    parser.on("pdfParser_dataError", (err: Error | { parserError: Error }) => {
      reject(new Error(err instanceof Error ? err.message : String(err.parserError)));
    });
    parser.on("pdfParser_dataReady", (data: { Pages?: Array<{ Texts?: Array<{ R?: Array<{ T?: string }> }> }> }) => {
      let fullText = "";
      let pageCount = 0;
      if (data.Pages) {
        pageCount = data.Pages.length;
        for (const page of data.Pages) {
          if (page.Texts) {
            for (const textItem of page.Texts) {
              if (textItem.R) {
                for (const r of textItem.R) {
                  if (r.T) fullText += decodeURIComponent(r.T) + " ";
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
  });

  if (!pdfData.text || pdfData.text.trim().length < 50) {
    throw new Error("Tidak bisa mengekstrak teks dari PDF. Pastikan PDF berisi teks.");
  }

  const truncatedText = pdfData.text.substring(0, 12000);

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
        { role: "user", content: `Teks dari PDF:\n\n${truncatedText}\n\nTemukan semua tabel data dan ekstrak dalam format JSON.` },
      ],
      temperature: 0.1,
      max_tokens: 8000,
    }),
  });

  if (!aiResponse.ok) {
    const errText = await aiResponse.text();
    throw new Error(`AI error (${aiResponse.status}): ${errText}`);
  }

  const aiData = await aiResponse.json();
  const content = aiData.choices?.[0]?.message?.content;
  if (!content) throw new Error("AI tidak mengembalikan respons");

  let cleaned = content.trim();
  if (cleaned.startsWith("```json")) cleaned = cleaned.slice(7);
  else if (cleaned.startsWith("```")) cleaned = cleaned.slice(3);
  if (cleaned.endsWith("```")) cleaned = cleaned.slice(0, -3);

  let tables: ParsedTable[];
  try {
    tables = JSON.parse(cleaned.trim());
  } catch {
    throw new Error("Response AI bukan JSON valid");
  }

  if (!Array.isArray(tables)) throw new Error("Response bukan array");

  return {
    tables,
    fileName,
    fileSize: buffer.length,
    pageCount: pdfData.pageCount,
    extractedChars: pdfData.text.length,
    format: "pdf",
  };
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await request.json();
      const { url, apiKey } = body as { url?: string; apiKey?: string };

      if (url) {
        if (!apiKey) {
          return NextResponse.json({ error: "API key diperlukan untuk Google Sheets" }, { status: 400 });
        }
        const result = await parseGoogleSheets(url);
        return NextResponse.json(result);
      }
      return NextResponse.json({ error: "URL atau file diperlukan" }, { status: 400 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const apiKey = formData.get("apiKey") as string | null;

    if (!file) {
      return NextResponse.json({ error: "File diperlukan" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = file.name;
    const ext = fileName.split(".").pop()?.toLowerCase() || "";

    let result: ParseResult;

    switch (ext) {
      case "csv":
      case "tsv":
      case "txt":
        result = await parseCSV(buffer, fileName);
        break;

      case "xlsx":
      case "xls":
      case "xlsm":
      case "xlsb":
        result = await parseExcel(buffer, fileName);
        break;

      case "pdf":
        if (!apiKey) {
          return NextResponse.json({ error: "API key MiMo diperlukan untuk parse PDF" }, { status: 400 });
        }
        result = await parsePDFWithAI(buffer, apiKey, fileName);
        break;

      default:
        return NextResponse.json(
          { error: `Format .${ext} belum didukung. Gunakan: PDF, CSV, TSV, XLSX, XLS` },
          { status: 400 }
        );
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gagal memproses file" },
      { status: 500 }
    );
  }
}
