import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grafik Interaktif — Perpustakaan Data Indonesia",
  description:
    "Visualisasi data interaktif Indonesia: bar race, treemap, sankey, piramida populasi, dan donut chart.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
