import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Perpustakaan Data Indonesia";
  const subtitle = searchParams.get("subtitle") || "Dashboard Data Indonesia";
  
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0f172a"/>
        <stop offset="100%" style="stop-color:#1e293b"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <circle cx="1100" cy="80" r="200" fill="#dc2626" opacity="0.1"/>
    <circle cx="100" cy="550" r="150" fill="#3b82f6" opacity="0.08"/>
    <text x="80" y="280" font-family="system-ui, sans-serif" font-size="56" font-weight="bold" fill="white">${escapeXml(title)}</text>
    <text x="80" y="340" font-family="system-ui, sans-serif" font-size="24" fill="#94a3b8">${escapeXml(subtitle)}</text>
    <rect x="80" y="380" width="60" height="4" rx="2" fill="#dc2626"/>
    <text x="80" y="560" font-family="system-ui, sans-serif" font-size="18" fill="#64748b">Perpustakaan Data Indonesia &mdash; perpustakaan-data.vercel.app</text>
  </svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

function escapeXml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
