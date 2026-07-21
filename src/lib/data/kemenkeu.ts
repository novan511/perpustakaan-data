import { DataPoint, KPIData } from "@/types";

export const kemenkeuKPIs: KPIData[] = [
  {
    title: "Realisasi Penerimaan Negara",
    value: "Rp 2.486 T",
    change: 6.8,
    changeLabel: "vs APBN 2025",
    icon: "Wallet",
    color: "from-blue-500 to-blue-600",
    source: "Kemenkeu",
    description: "Total penerimaan negara (pajak + PNBP)",
  },
  {
    title: "Realisasi Belanja Negara",
    value: "Rp 2.845 T",
    change: 5.2,
    changeLabel: "vs APBN 2025",
    icon: "Receipt",
    color: "from-emerald-500 to-emerald-600",
    source: "Kemenkeu",
    description: "Total belanja negara termasuk transfer daerah",
  },
  {
    title: "Defisit APBN",
    value: "Rp -359 T",
    change: -2.1,
    changeLabel: "vs APBN 2025",
    icon: "TrendingDown",
    color: "from-red-500 to-red-600",
    source: "Kemenkeu",
    description: "Selisih penerimaan dan belanja negara",
  },
  {
    title: "Rasio Pajak terhadap PDB",
    value: "10,2%",
    change: 0.3,
    changeLabel: "vs Tahun Sebelumnya",
    icon: "PieChart",
    color: "from-violet-500 to-violet-600",
    source: "Kemenkeu",
    description: "Porsi pajak terhadap Produk Domestik Bruto",
  },
];

export const penerimaanNegara: DataPoint[] = [
  { period: "2019", value: 1656 },
  { period: "2020", value: 1285 },
  { period: "2021", value: 1465 },
  { period: "2022", value: 2054 },
  { period: "2023", value: 2125 },
  { period: "2024", value: 2340 },
  { period: "2025", value: 2486 },
];

export const belanjaNegara: DataPoint[] = [
  { period: "2019", value: 1785 },
  { period: "2020", value: 2071 },
  { period: "2021", value: 2189 },
  { period: "2022", value: 2512 },
  { period: "2023", value: 2621 },
  { period: "2024", value: 2785 },
  { period: "2025", value: 2845 },
];

export const defisitData: DataPoint[] = [
  { period: "2019", value: -129 },
  { period: "2020", value: -786 },
  { period: "2021", value: -724 },
  { period: "2022", value: -458 },
  { period: "2023", value: -496 },
  { period: "2024", value: -445 },
  { period: "2025", value: -359 },
];

export const komposisiAPBN: DataPoint[] = [
  { period: "Pajak", value: 1620, label: "65,2%" },
  { period: "PNBP", value: 580, label: "23,3%" },
  { period: "Hibah", value: 16, label: "0,6%" },
  { period: "Penerimaan Bersih Pinjaman", value: 270, label: "10,9%" },
];

export const alokasiBelanja: DataPoint[] = [
  { period: "Belanja Modal", value: 425, label: "14,9%" },
  { period: "Transfer ke Daerah", value: 895, label: "31,5%" },
  { period: "Belanja Barang", value: 385, label: "13,5%" },
  { period: "Belanja Bunga Utang", value: 350, label: "12,3%" },
  { period: "Belanja Subsidi", value: 285, label: "10,0%" },
  { period: "Belanja lainnya", value: 505, label: "17,8%" },
];
