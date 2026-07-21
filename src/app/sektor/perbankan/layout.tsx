import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OJK — Perpustakaan Data Indonesia",
  description:
    "Data Otoritas Jasa Keuangan (OJK): aset perbankan, NPL, dan pertumbuhan kredit.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
