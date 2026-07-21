import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bank Indonesia — Perpustakaan Data Indonesia",
  description:
    "Data moneter dari Bank Indonesia: suku bunga acuan, nilai tukar JISDOR, dan cadangan devisa.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
