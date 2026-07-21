import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BPS Statistik — Perpustakaan Data Indonesia",
  description:
    "Data statistik dari Badan Pusat Statistik (BPS): PDB, inflasi, pengangguran, dan kemiskinan.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
