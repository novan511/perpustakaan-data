"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Search, BookOpen } from "lucide-react";
import Link from "next/link";
import type { GlossaryItem } from "@/types";

const glossaryData: GlossaryItem[] = [
  {
    term: "PDB (Produk Domestik Bruto)",
    definition: "Total nilai barang dan jasa yang diproduksi di suatu negara dalam satu tahun. PDB tinggi biasanya menandakan ekonomi yang kuat.",
    example: "Jika PDB Indonesia tumbuh 5%, berarti ekonomi Indonesia membesar 5% dari tahun sebelumnya.",
    category: "Makroekonomi",
  },
  {
    term: "Inflasi",
    definition: "Kenaikan harga barang dan jasa secara umum dan terus-menerus. Inflasi tinggi artinya harga barang naik terus, daya beli masyarakat menurun.",
    example: "Jika inflasi 3%, maka harga yang biasanya Rp 100.000 menjadi sekitar Rp 103.000.",
    category: "Makroekonomi",
  },
  {
    term: "BI-Rate (Suku Bunga Acuan)",
    definition: "Suku bunga yang ditetapkan Bank Indonesia sebagai patokan suku bunga di pasar. BI-Rate naik = kredit lebih mahal, BI-Rate turun = kredit lebih murah.",
    example: "Jika BI-Rate naik dari 5,5% ke 5,75%, maka bunga kredit rumah Anda juga kemungkinan naik.",
    category: "Moneter",
  },
  {
    term: "JISDOR (Jakarta Interbank Spot Dollar Rate)",
    definition: "Kurs referensi nilai tukar Rupiah terhadap Dolar AS di pasar spot. Digunakan sebagai acuan transaksi valuta asing.",
    example: "Jika JISDOR Rp 15.850/USD, maka untuk menukar US$ 100 Anda butuh Rp 1.585.000.",
    category: "Moneter",
  },
  {
    term: "Cadangan Devisa",
    definition: "Aset keuangan dalam mata uang asing yang dimiliki Bank Indonesia. Digunakan untuk menjaga stabilitas nilai tukar Rupiah.",
    example: "Cadangan devisa US$ 155 miliar artinya BI punya tabungan dalam dolar senilai itu untuk intervensi pasar.",
    category: "Moneter",
  },
  {
    term: "Neraca Perdagangan",
    definition: "Selisih antara nilai ekspor dan impor. Jika ekspor lebih besar dari impor, neraca perdagangan surplus (positif).",
    example: "Jika Indonesia ekspor US$ 24 miliar dan impor US$ 19 miliar, neraca perdagangan surplus US$ 5 miliar.",
    category: "Perdagangan",
  },
  {
    term: "Ekspor",
    definition: "Penjualan barang dan jasa ke negara lain. Ekspor besar biasanya baik untuk ekonomi karena mendatangkan mata uang asing.",
    example: "Indonesia mengekspor batu bara ke China, CPO ke India, dan nikel ke berbagai negara.",
    category: "Perdagangan",
  },
  {
    term: "Impor",
    definition: "Pembelian barang dan jasa dari negara lain. Impor diperlukan untuk barang yang tidak diproduksi di dalam negeri.",
    example: "Indonesia mengimpor mesin dari Jepang dan elektronik dari China.",
    category: "Perdagangan",
  },
  {
    term: "Suku Bunga Penjaminan (LPS)",
    definition: "Batas atas suku bunga yang dijamin oleh LPS. Jika bank memberikan bunga di atas batas ini dan bank tutup, simpanan tidak dijamin.",
    example: "Jika suku bunga penjaminan 4,25% dan bank Anda memberi bunga 5%, dana Anda tidak dijamin LPS jika bank bangkrut.",
    category: "Perbankan",
  },
  {
    term: "NPL (Non-Performing Loan)",
    definition: "Persentase kredit yang macet atau tidak dibayar. NPL tinggi berarti banyak peminjam yang tidak dapat mengembalikan uang.",
    example: "NPL 2% artinya dari Rp 100 triliun kredit yang disalurkan, Rp 2 triliun bermasalah.",
    category: "Perbankan",
  },
  {
    term: "Modal Bank",
    definition: "Dana yang dimiliki bank untuk menjalankan operasional dan sebagai jaring pengaman jika terjadi kerugian.",
    example: "Modal bank Rp 1.000 miliar artinya bank itu punya cadangan uang sendiri sebesar itu.",
    category: "Perbankan",
  },
  {
    term: "APBN (Anggaran Pendapatan dan Belanja Negara)",
    definition: "Rencana keuangan pemerintah Indonesia untuk satu tahun. Menunjukkan dari mana pemerintah dapat uang dan ke mana uangnya dibelanjakan.",
    example: "APBN 2025 sekitar Rp 3.200 triliun, artinya pemerintah merencanakan penerimaan dan belanja sebesar itu.",
    category: "Fiskal",
  },
  {
    term: "Defisit APBN",
    definition: "Ketika belanja negara lebih besar dari penerimaan negara. Defisit ditutup dengan pinjaman.",
    example: "Jika penerimaan Rp 2.400 triliun tapi belanja Rp 2.800 triliun, defisitnya Rp 400 triliun.",
    category: "Fiskal",
  },
  {
    term: "Pajak",
    definition: "Iuran wajib dari masyarakat dan perusahaan kepada pemerintah. Pajak adalah sumber pendapatan negara terbesar.",
    example: "Pajak penghasilan (PPh) dipotong dari gaji Anda setiap bulan.",
    category: "Fiskal",
  },
  {
    term: "PNBP (Pendapatan Negara Bukan Pajak)",
    definition: "Pendapatan negara yang bukan berasal dari pajak, seperti hasil BUMN, iuran, dan royalti.",
    example: "Royalti dari tambang nikel dan dividen dari Pertamina termasuk PNBP.",
    category: "Fiskal",
  },
  {
    term: "Rasio Pajak terhadap PDB",
    definition: "Porsi pajak yang berhasil dikumpulkan pemerintah dibandingkan dengan total PDB. Rasio tinggi berarti pemerintah efisien mengumpulkan pajak.",
    example: "Rasio pajak 10% artinya dari Rp 100 PDB, Rp 10 berhasil dikumpulkan sebagai pajak.",
    category: "Fiskal",
  },
  {
    term: "Simpanan Terjamin (LPS)",
    definition: "Simpanan nasabah di bank yang dijamin oleh LPS hingga Rp 2 miliar per bank. Jika bank tutup, LPS akan mengembalikan uang hingga batas ini.",
    example: "Anda menabung Rp 500 juta di Bank X. Jika Bank X tutup, LPS menjamin Rp 500 juta Anda kembali.",
    category: "Perbankan",
  },
  {
    term: "Indeks Kepercayaan Konsumen",
    definition: "Angka yang menunjukkan seberapa percaya diri masyarakat terhadap kondisi ekonomi. Angka di atas 100 berarti optimis.",
    example: "Indeks 106 artinya masyarakat lebih optimis terhadap ekonomi dibandingkan posisi netral (100).",
    category: "Makroekonomi",
  },
];

const glossaryCategories = [
  "Makroekonomi",
  "Moneter",
  "Perdagangan",
  "Perbankan",
  "Fiskal",
];

export default function GlossariumPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = glossaryData.filter((item) => {
    const matchesSearch = !search || item.term.toLowerCase().includes(search.toLowerCase()) || item.definition.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !activeCategory || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Glossarium Ekonomi</h2>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">Istilah ekonomi dalam bahasa sederhana</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-5 sm:p-8 text-white">
        <div className="flex items-center gap-3 mb-3">
          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
          <h3 className="text-base sm:text-lg font-bold">Kenali Istilah Ekonomi</h3>
        </div>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Glossarium ini menjelaskan istilah ekonomi dengan bahasa yang mudah dipahami. Cocok untuk pelajar, mahasiswa, atau siapa saja yang ingin memahami data ekonomi.
        </p>
      </motion.div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" placeholder="Cari istilah..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50" />
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActiveCategory(null)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${!activeCategory ? "bg-red-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}>Semua</button>
        {glossaryCategories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${activeCategory === cat ? "bg-red-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}>{cat}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {filtered.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
            <div className="flex items-start justify-between mb-2 gap-2">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{item.term}</h4>
              <span className="text-[10px] font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full whitespace-nowrap">{item.category}</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">{item.definition}</p>
            {item.example && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <p className="text-[10px] font-semibold text-blue-700 dark:text-blue-400 mb-1">Contoh:</p>
                <p className="text-[11px] sm:text-xs text-blue-600 dark:text-blue-300 leading-relaxed">{item.example}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xs sm:text-sm text-slate-400">Tidak ditemukan istilah yang sesuai.</p>
        </div>
      )}
    </div>
  );
}
