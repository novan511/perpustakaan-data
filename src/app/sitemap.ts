import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://perpustakaan-data.vercel.app";
  const routes = [
    "",
    "/alat/inflasi",
    "/alat/gaji",
    "/alat/cicilan",
    "/alat/tabungan",
    "/alat/biaya-hidup",
    "/alat/budget",
    "/tanya",
    "/jelajahi",
    "/visualisasi",
    "/korelasi",
    "/analisis",
    "/glossarium",
    "/tentang",
    "/sektor",
    "/sektor/statistik",
    "/sektor/moneter",
    "/sektor/perdagangan",
    "/sektor/simpanan",
    "/sektor/perbankan",
    "/sektor/fiskal",
  ];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : route.startsWith("/alat") ? 0.9 : 0.7,
  }));
}
