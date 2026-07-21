import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LPS — Perpustakaan Data Indonesia",
  description:
    "Data Lembaga Penjamin Simpanan (LPS): bunga penjaminan, distribusi simpanan, dan indeks kepercayaan.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
