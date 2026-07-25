import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { title, data } = await request.json();
    
    // Generate HTML content for PDF
    const html = generatePDFHtml(title, data);
    
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": `attachment; filename="${title.replace(/[^a-z0-9]/gi, '_')}.html"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Export failed" },
      { status: 500 }
    );
  }
}

function generatePDFHtml(title: string, data: unknown): string {
  // Generate a printable HTML document
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>${title} - Perpustakaan Data Indonesia</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #333; }
    h1 { color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 8px; }
    h2 { color: #475569; margin-top: 24px; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; }
    th, td { border: 1px solid #e2e8f0; padding: 8px 12px; text-align: left; font-size: 13px; }
    th { background: #f8fafc; font-weight: 600; }
    .footer { margin-top: 32px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <p style="color: #64748b; font-size: 13px;">Diekspor dari Perpustakaan Data Indonesia &mdash; ${new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
  ${typeof data === "string" ? data : `<pre style="font-size: 12px; background: #f8fafc; padding: 12px; border-radius: 8px; overflow-x: auto;">${JSON.stringify(data, null, 2)}</pre>`}
  <div class="footer">
    <p>Sumber: Perpustakaan Data Indonesia | perpustakaan-data.vercel.app</p>
    <p>Dokumen ini di-generate secara otomatis. Data dapat berubah sewaktu-waktu.</p>
  </div>
</body>
</html>`;
}
