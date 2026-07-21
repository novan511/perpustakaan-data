import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kemenkeu — Perpustakaan Data Indonesia",
  description:
    "Data Kementerian Keuangan: penerimaan negara, belanja negara, defisit APBN, dan alokasi belanja.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
