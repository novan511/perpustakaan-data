import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jelajahi Semua Data — Perpustakaan Data Indonesia",
  description:
    "Jelajahi seluruh dataset Indonesia yang tersedia: ekonomi, geografi, kesehatan, pendidikan, dan lainnya.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
