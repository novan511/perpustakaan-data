import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Proyek — Perpustakaan Data Indonesia",
  description:
    "Tentang Perpustakaan Data Indonesia: visi, misi, sumber data, dan cara penggunaan dashboard data.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
