import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glossarium Ekonomi — Perpustakaan Data Indonesia",
  description:
    "Glossarium istilah ekonomi, keuangan, dan statistik Indonesia beserta definisinya.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
