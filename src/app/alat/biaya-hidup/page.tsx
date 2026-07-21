"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowLeft, MapPin, TrendingDown, Info } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface KotaData {
  nama: string;
  makanan: number;
  transportasi: number;
  sewa: number;
  utilitas: number;
}

const KOTA_DATA: KotaData[] = [
  { nama: "DKI Jakarta", makanan: 2500000, transportasi: 800000, sewa: 3500000, utilitas: 600000 },
  { nama: "Surabaya", makanan: 2000000, transportasi: 600000, sewa: 2000000, utilitas: 500000 },
  { nama: "Bandung", makanan: 1800000, transportasi: 500000, sewa: 1800000, utilitas: 450000 },
  { nama: "Semarang", makanan: 1600000, transportasi: 450000, sewa: 1500000, utilitas: 400000 },
  { nama: "Medan", makanan: 1700000, transportasi: 500000, sewa: 1600000, utilitas: 420000 },
  { nama: "Makassar", makanan: 1700000, transportasi: 500000, sewa: 1500000, utilitas: 400000 },
  { nama: "Yogyakarta", makanan: 1400000, transportasi: 400000, sewa: 1200000, utilitas: 350000 },
  { nama: "Denpasar", makanan: 1900000, transportasi: 550000, sewa: 2200000, utilitas: 450000 },
  { nama: "Palembang", makanan: 1500000, transportasi: 400000, sewa: 1300000, utilitas: 380000 },
  { nama: "Manado", makanan: 1600000, transportasi: 450000, sewa: 1400000, utilitas: 380000 },
];

function formatRupiah(n: number): string {
  return `Rp ${Math.round(n).toLocaleString("id-ID")}`;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg">
      <p className="text-xs font-bold text-slate-900 dark:text-white">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs text-slate-600 dark:text-slate-300">
          {p.name}: {formatRupiah(p.value)}
        </p>
      ))}
    </div>
  );
}

export default function BiayaHidupPage() {
  const [kotaA, setKotaA] = useState<string>("DKI Jakarta");
  const [kotaB, setKotaB] = useState<string>("Yogyakarta");
  const [bandingkan, setBandingkan] = useState(false);

  const hasil = useMemo(() => {
    const dataA = KOTA_DATA.find((k) => k.nama === kotaA);
    const dataB = KOTA_DATA.find((k) => k.nama === kotaB);
    if (!dataA || !dataB || kotaA === kotaB) return null;

    const totalA = dataA.makanan + dataA.transportasi + dataA.sewa + dataA.utilitas;
    const totalB = dataB.makanan + dataB.transportasi + dataB.sewa + dataB.utilitas;
    const selisih = totalA - totalB;
    const kotaMurah = totalA < totalB ? kotaA : kotaB;
    const kotaMahal = totalA < totalB ? kotaB : kotaA;
    const selisihAbs = Math.abs(selisih);

    const chartData = [
      { kategori: "Makanan", [kotaA]: dataA.makanan, [kotaB]: dataB.makanan },
      { kategori: "Transportasi", [kotaA]: dataA.transportasi, [kotaB]: dataB.transportasi },
      { kategori: "Sewa Tempat", [kotaA]: dataA.sewa, [kotaB]: dataB.sewa },
      { kategori: "Utilitas", [kotaA]: dataA.utilitas, [kotaB]: dataB.utilitas },
    ];

    return {
      dataA,
      dataB,
      totalA,
      totalB,
      selisih,
      selisihAbs,
      kotaMurah,
      kotaMahal,
      chartData,
    };
  }, [kotaA, kotaB]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Perbandingan Biaya Hidup
          </h2>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
            Kota mana yang lebih murah untuk hidup?
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-5 sm:p-8 text-white"
      >
        <div className="flex items-center gap-3 mb-3">
          <MapPin className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg sm:text-xl font-bold">Biaya Hidup di Kota X vs Y?</h3>
        </div>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Mau pindah kota atau cuma penasaran? Bandingkan biaya hidup 10 kota besar
          Indonesia — dari makanan, transportasi, sewa, hingga utilitas.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6"
      >
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Pilih 2 Kota</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Kota A
            </label>
            <select
              value={kotaA}
              onChange={(e) => setKotaA(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
            >
              {KOTA_DATA.map((k) => (
                <option key={k.nama} value={k.nama}>{k.nama}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Kota B
            </label>
            <select
              value={kotaB}
              onChange={(e) => setKotaB(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
            >
              {KOTA_DATA.filter((k) => k.nama !== kotaA).map((k) => (
                <option key={k.nama} value={k.nama}>{k.nama}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={() => setBandingkan(true)}
          className="mt-4 w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
        >
          Bandingkan
        </button>
      </motion.div>

      <AnimatePresence>
        {bandingkan && hasil && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="w-4 h-4 text-red-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Hasil Perbandingan</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4">
                  <p className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {kotaA}
                  </p>
                  <p className="text-lg font-bold text-blue-700 dark:text-blue-300 mt-1">
                    {formatRupiah(hasil.totalA)}/bulan
                  </p>
                  <div className="mt-2 space-y-1 text-[10px] text-slate-500 dark:text-slate-400">
                    <div className="flex justify-between"><span>Makanan</span><span>{formatRupiah(hasil.dataA.makanan)}</span></div>
                    <div className="flex justify-between"><span>Transportasi</span><span>{formatRupiah(hasil.dataA.transportasi)}</span></div>
                    <div className="flex justify-between"><span>Sewa</span><span>{formatRupiah(hasil.dataA.sewa)}</span></div>
                    <div className="flex justify-between"><span>Utilitas</span><span>{formatRupiah(hasil.dataA.utilitas)}</span></div>
                  </div>
                </div>
                <div className="bg-violet-50 dark:bg-violet-950/30 rounded-xl p-4">
                  <p className="text-[10px] font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
                    {kotaB}
                  </p>
                  <p className="text-lg font-bold text-violet-700 dark:text-violet-300 mt-1">
                    {formatRupiah(hasil.totalB)}/bulan
                  </p>
                  <div className="mt-2 space-y-1 text-[10px] text-slate-500 dark:text-slate-400">
                    <div className="flex justify-between"><span>Makanan</span><span>{formatRupiah(hasil.dataB.makanan)}</span></div>
                    <div className="flex justify-between"><span>Transportasi</span><span>{formatRupiah(hasil.dataB.transportasi)}</span></div>
                    <div className="flex justify-between"><span>Sewa</span><span>{formatRupiah(hasil.dataB.sewa)}</span></div>
                    <div className="flex justify-between"><span>Utilitas</span><span>{formatRupiah(hasil.dataB.utilitas)}</span></div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  💡 <strong>{hasil.kotaMurah}</strong> lebih murah dari <strong>{hasil.kotaMahal}</strong> sebesar{" "}
                  <strong>{formatRupiah(hasil.selisihAbs)}/bulan</strong> (
                  {formatRupiah(hasil.selisihAbs * 12)}/tahun).{" "}
                  {hasil.selisihAbs > 2000000
                    ? "Selisih ini signifikan — bisa jadi pertimbangan kuat untuk pindah kota."
                    : hasil.selisihAbs > 1000000
                    ? "Selisih ini cukup terasa untuk budget bulanan."
                    : "Selisih ini relatif kecil — faktor lain seperti gaji dan kualitas hidup mungkin lebih menentukan."}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Perbandingan per Kategori</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hasil.chartData} margin={{ left: 10, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="kategori" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                    <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}jt`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey={kotaA} fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={28} />
                    <Bar dataKey={kotaB} fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 sm:p-5"
      >
        <div className="flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-1.5">
              Kenapa Ini Penting?
            </h4>
            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed space-y-2">
              <p>
                Biaya hidup bervariasi sangat signifikan antar kota di Indonesia. Jakarta bisa
                2-3 kali lebih mahal dari kota kecil. Memahami perbedaan ini membantu
                <strong> merencanakan pindah kerja, kuliah, atau investasi</strong>.
              </p>
              <p>
                <strong>Yang perlu diperhatikan:</strong> Biaya hidup hanya satu sisi. Gaji
                di Jakarta memang lebih tinggi, tapi perlu dibandingkan dengan rasio
                gaji/biaya hidup (purchasing power).
              </p>
              <p>
                <strong>Data:</strong> Estimasi biaya hidup berdasarkan survei BPS dan kalkulator
                cost of living dari Numbeo/BLS. Angka ini untuk satu orang tinggal di area
                perkotaan standar (tidak mewah, tidak extremely budget).
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
