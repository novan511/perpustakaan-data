import { DataPoint, KPIData } from "@/types";

export const lpsKPIs: KPIData[] = [
  {
    title: "Suku Bunga Penjaminan (Rupiah)",
    value: "4,25%",
    change: 0,
    changeLabel: "Sejak Jan 2025",
    icon: "Percent",
    color: "from-blue-500 to-blue-600",
    source: "LPS",
    description: "Batas atas suku bunga penjaminan simpanan Rupiah",
  },
  {
    title: "Suku Bunga Penjaminan (Valas)",
    value: "1,25%",
    change: 0,
    changeLabel: "Sejak Jan 2025",
    icon: "Percent",
    color: "from-emerald-500 to-emerald-600",
    source: "LPS",
    description: "Batas atas suku bunga penjaminan simpanan valas",
  },
  {
    title: "Simpanan Terjamin",
    value: "Rp 3.928 T",
    change: 2.3,
    changeLabel: "vs Kuartal Sebelumnya",
    icon: "Shield",
    color: "from-violet-500 to-violet-600",
    source: "LPS",
    description: "Total simpanan yang dijamin oleh LPS",
  },
  {
    title: "Jumlah Simpanan Terjamin",
    value: "224,1 Juta",
    change: 1.1,
    changeLabel: "vs Kuartal Sebelumnya",
    icon: "Users",
    color: "from-amber-500 to-amber-600",
    source: "LPS",
    description: "Jumlah rekening simpanan terjamin",
  },
];

export const bungaPenjaminanRupiah: DataPoint[] = [
  { period: "Jan-2022", value: 3.50 },
  { period: "Apr-2022", value: 3.50 },
  { period: "Jul-2022", value: 3.75 },
  { period: "Okt-2022", value: 4.50 },
  { period: "Jan-2023", value: 5.25 },
  { period: "Apr-2023", value: 5.50 },
  { period: "Jul-2023", value: 5.75 },
  { period: "Okt-2023", value: 6.00 },
  { period: "Jan-2024", value: 6.25 },
  { period: "Apr-2024", value: 6.50 },
  { period: "Jul-2024", value: 6.75 },
  { period: "Okt-2024", value: 7.00 },
  { period: "Jan-2025", value: 7.25 },
  { period: "Apr-2025", value: 7.50 },
];

export const distribusiSimpanan: DataPoint[] = [
  { period: "< Rp 2 Juta", value: 152.5, label: "67,4%" },
  { period: "Rp 2-5 Juta", value: 33.2, label: "14,6%" },
  { period: "Rp 5-10 Juta", value: 16.8, label: "7,4%" },
  { period: "Rp 10-50 Juta", value: 14.2, label: "6,2%" },
  { period: "Rp 50-100 Juta", value: 3.5, label: "1,5%" },
  { period: "> Rp 100 Juta", value: 7.2, label: "2,9%" },
];

export const indeksKepercayaan: DataPoint[] = [
  { period: "Jan-2024", value: 103.2 },
  { period: "Feb-2024", value: 104.5 },
  { period: "Mar-2024", value: 105.1 },
  { period: "Apr-2024", value: 106.0 },
  { period: "Mei-2024", value: 105.8 },
  { period: "Jun-2024", value: 104.9 },
  { period: "Jul-2024", value: 103.5 },
  { period: "Agu-2024", value: 102.8 },
  { period: "Sep-2024", value: 103.5 },
  { period: "Okt-2024", value: 104.2 },
  { period: "Nov-2024", value: 105.0 },
  { period: "Des-2024", value: 105.5 },
  { period: "Jan-2025", value: 106.0 },
  { period: "Feb-2025", value: 105.8 },
  { period: "Mar-2025", value: 106.2 },
];
