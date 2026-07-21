import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analisis Tren — Perpustakaan Data Indonesia",
  description:
    "Analisis tren data makro Indonesia: PDB, inflasi, suku bunga, perbankan, dan fiskal dari waktu ke waktu.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
