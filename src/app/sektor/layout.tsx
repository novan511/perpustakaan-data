import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sektor Ekonomi — Perpustakaan Data Indonesia",
  description:
    "Dashboard sektor ekonomi Indonesia: statistik BPS, moneter BI, perdagangan, perbankan, dan fiskal.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
