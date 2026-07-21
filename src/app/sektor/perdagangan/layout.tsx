import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kemendag — Perpustakaan Data Indonesia",
  description:
    "Data perdagangan dari Kementerian Perdagangan: ekspor, impor, neraca perdagangan, dan mitra dagang utama.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
