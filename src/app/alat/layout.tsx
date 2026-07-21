import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alat Keputusan Keuangan",
  description: "Kalkulator inflasi, pengecek gaji, simulator cicilan, dan alat bantu keuangan lainnya untuk masyarakat Indonesia.",
};

export default function AlatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
