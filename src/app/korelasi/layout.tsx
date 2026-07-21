import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analisis Korelasi — Perpustakaan Data Indonesia",
  description:
    "Analisis korelasi antar indikator ekonomi Indonesia: PDB, inflasi, suku bunga, dan neraca perdagangan.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
