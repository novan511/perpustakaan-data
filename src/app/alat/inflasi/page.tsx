"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowLeft, Calculator, TrendingDown, Info } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const INFLASI_TAHUNAN: Record<number, number> = {
  2018: 3.13,
  2019: 3.02,
  2020: 2.05,
  2021: 1.87,
  2022: 4.21,
  2023: 2.61,
  2024: 1.81,
  2025: 1.51,
};

const AVAILABLE_YEARS = Object.keys(INFLASI_TAHUNAN).map(Number).sort((a, b) => a - b);

function hitungNilaiUang(uangAwal: number, tahunAwal: number, tahunAkhir: number): number {
  let nilai = uangAwal;
  if (tahunAwal < tahunAkhir) {
    for (let t = tahunAwal; t < tahunAkhir; t++) {
      const inflasi = INFLASI_TAHUNAN[t];
      if (inflasi !== undefined) {
        nilai = nilai / (1 + inflasi / 100);
      }
    }
  }
  return nilai;
}

function formatRupiah(n: number): string {
  return `Rp ${Math.round(n).toLocaleString("id-ID")}`;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg">
      <p className="text-xs font-bold text-slate-900 dark:text-white">{label}</p>
      <p className="text-xs text-slate-600 dark:text-slate-300">{formatRupiah(payload[0].value)}</p>
    </div>
  );
}

export default function InflasiPage() {
  const [uang, setUang] = useState<string>("");
  const [tahunAwal, setTahunAwal] = useState<string>("2020");
  const [tahunAkhir, setTahunAkhir] = useState<string>("2025");
  const [hitung, setHitung] = useState(false);

  const hasil = useMemo(() => {
    if (!uang) return null;
    const jumlah = parseFloat(uang.replace(/\./g, "").replace(",", "."));
    if (isNaN(jumlah) || jumlah <= 0) return null;
    const awal = parseInt(tahunAwal);
    const akhir = parseInt(tahunAkhir);
    if (isNaN(awal) || isNaN(akhir) || awal >= akhir) return null;

    const nilaiSekarang = hitungNilaiUang(jumlah, awal, akhir);
    const kehilangan = jumlah - nilaiSekarang;
    const persenKehilangan = (kehilangan / jumlah) * 100;

    const chartData = [
      { name: `${awal}`, nilai: Math.round(jumlah), fill: "#3b82f6" },
      { name: `${akhir}`, nilai: Math.round(nilaiSekarang), fill: "#ef4444" },
    ];

    const inflasiTahunan = [];
    for (let t = awal; t < akhir; t++) {
      if (INFLASI_TAHUNAN[t]) {
        inflasiTahunan.push({ tahun: t.toString(), inflasi: INFLASI_TAHUNAN[t] });
      }
    }

    return {
      nilaiSekarang,
      kehilangan,
      persenKehilangan,
      chartData,
      inflasiTahunan,
      jumlah,
      awal,
      akhir,
    };
  }, [uang, tahunAwal, tahunAkhir]);

  const handleHitung = () => setHitung(true);

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
            Kalkulator Inflasi
          </h2>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
            Berapa nilai uang kamu sebenarnya?
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-5 sm:p-8 text-white"
      >
        <div className="flex items-center gap-3 mb-3">
          <Calculator className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg sm:text-xl font-bold">Berapa Nilai Uang Saya Sebenarnya?</h3>
        </div>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Uang Rp 100.000 di tahun 2020 tidak sama nilainya dengan Rp 100.000 di tahun 2025.
          Inflasi menggerus daya beli uangmu secara perlahan. Kalkulator ini menghitung berapa
          nilai uang kamu <strong>sebenarnya</strong> berdasarkan data inflasi resmi BPS.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6"
      >
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Masukkan Data</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Jumlah Uang (Rp)
            </label>
            <input
              type="text"
              value={uang}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                if (raw) {
                  setUang(parseInt(raw).toLocaleString("id-ID"));
                } else {
                  setUang("");
                }
              }}
              placeholder="contoh: 1.000.000"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Dari Tahun
            </label>
            <select
              value={tahunAwal}
              onChange={(e) => setTahunAwal(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
            >
              {AVAILABLE_YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Sampai Tahun
            </label>
            <select
              value={tahunAkhir}
              onChange={(e) => setTahunAkhir(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
            >
              {AVAILABLE_YEARS.filter((y) => y > parseInt(tahunAwal)).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleHitung}
          disabled={!uang || parseInt(tahunAkhir) <= parseInt(tahunAwal)}
          className="mt-4 w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white text-sm font-semibold transition-colors"
        >
          Hitung Sekarang
        </button>
      </motion.div>

      <AnimatePresence>
        {hitung && hasil && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="w-4 h-4 text-red-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Hasil Perhitungan</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4">
                  <p className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    Nilai di {hasil.awal}
                  </p>
                  <p className="text-lg font-bold text-blue-700 dark:text-blue-300 mt-1">
                    {formatRupiah(hasil.jumlah)}
                  </p>
                </div>
                <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-4">
                  <p className="text-[10px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
                    Nilai di {hasil.akhir}
                  </p>
                  <p className="text-lg font-bold text-red-700 dark:text-red-300 mt-1">
                    {formatRupiah(hasil.nilaiSekarang)}
                  </p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-4">
                  <p className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    Daya Beli Hilang
                  </p>
                  <p className="text-lg font-bold text-amber-700 dark:text-amber-300 mt-1">
                    {formatRupiah(hasil.kehilangan)} ({hasil.persenKehilangan.toFixed(1)}%)
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                  💡 <strong>{formatRupiah(hasil.jumlah)}</strong> di tahun <strong>{hasil.awal}</strong> bernilai{" "}
                  <strong>{formatRupiah(hasil.nilaiSekarang)}</strong> di tahun <strong>{hasil.akhir}</strong>.
                  Kamu kehilangan <strong>{hasil.persenKehilangan.toFixed(1)}%</strong> daya beli karena inflasi.
                  {hasil.persenKehilangan > 15
                    ? " Kerugian ini cukup signifikan — pertimbangkan untuk menginvestasikan uangmu agar nilainya tidak terus menyusut."
                    : hasil.persenKehilangan > 8
                    ? " Kerugian ini lumayan terasa. Menyimpan uang di tabungan biasa saja tidak cukup — pertimbangkan instrumen investasi."
                    : " Kerugian ini masih wajar. Tapi tetap bijak untuk menyimpan uang di instrumen yang bisa mengalahkan inflasi."}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Perbandingan Visual</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hasil.chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 11, fill: "#94a3b8" }}
                      tickFormatter={(v) => `${(v / 1000000).toFixed(1)}jt`}
                    />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: "#94a3b8" }} width={50} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="nilai" radius={[0, 8, 8, 0]} barSize={40}>
                      {hasil.chartData.map((entry, index) => (
                        <Cell key={index} fill={index === 0 ? "#3b82f6" : "#ef4444"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {hasil.inflasiTahunan.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Data Inflasi per Tahun</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left py-2 text-slate-500 dark:text-slate-400 font-semibold">Tahun</th>
                        <th className="text-right py-2 text-slate-500 dark:text-slate-400 font-semibold">Inflasi</th>
                        <th className="text-right py-2 text-slate-500 dark:text-slate-400 font-semibold">Nilai Uang</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        let nilai = hasil.jumlah;
                        const rows: { tahun: string; inflasi: string; nilai: number }[] = [{ tahun: String(hasil.awal), inflasi: "-", nilai }];
                        for (let t = hasil.awal; t < hasil.akhir; t++) {
                          const inf = INFLASI_TAHUNAN[t];
                          if (inf !== undefined) {
                            nilai = nilai / (1 + inf / 100);
                            rows.push({ tahun: String(t + 1), inflasi: `${inf.toFixed(2)}%`, nilai });
                          }
                        }
                        return rows.map((r, i) => (
                          <tr key={i} className="border-b border-slate-100 dark:border-slate-800">
                            <td className="py-2 text-slate-900 dark:text-white font-medium">{r.tahun}</td>
                            <td className="py-2 text-right text-slate-600 dark:text-slate-300">{r.inflasi}</td>
                            <td className="py-2 text-right text-slate-900 dark:text-white font-medium">{formatRupiah(r.nilai)}</td>
                          </tr>
                        ));
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
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
                Inflasi adalah kenaikan harga barang secara umum. Saat inflasi terjadi, uang yang
                kamu miliki <strong>bisa membeli lebih sedikit</strong> dibanding sebelumnya.
              </p>
              <p>
                <strong>Dampak nyata:</strong> Jika kamu menyimpan Rp 10 juta di bawah kasur selama
                5 tahun, uang itu tetap Rp 10 juta — tapi daya belinya bisa turun Rp 1-2 juta.
                Inilah mengapa menyimpan uang saja tidak cukup, kamu perlu menginvestasikannya.
              </p>
              <p>
                <strong>Data inflasi</strong> ini bersumber dari BPS (Badan Pusat Statistik) dan
                digunakan oleh Bank Indonesia sebagai dasar kebijakan moneter.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
