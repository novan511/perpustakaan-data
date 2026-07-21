"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowLeft, Briefcase, TrendingUp, Info } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const UMR_2025: Record<string, number> = {
  "DKI Jakarta": 5395780,
  "Jawa Barat (Bandung)": 3741235,
  "Jawa Timur (Surabaya)": 4900407,
  "Jawa Tengah (Semarang)": 3400000,
  "Sumatera Utara (Medan)": 3500000,
  "Sulawesi Selatan (Makassar)": 3500000,
  "Banten (Tangerang)": 3300000,
  "DI Yogyakarta": 2100000,
  "Bali (Denpasar)": 3200000,
  "Kalimantan Timur": 3200000,
  "Sumatera Barat (Padang)": 2800000,
  "NTB (Mataram)": 2600000,
  "Jambi": 2700000,
  "Riau (Pekanbaru)": 2900000,
  "Aceh (Banda Aceh)": 2800000,
};

const GAJI_RATA_RATA: Record<string, { min: number; max: number; label: string }> = {
  "SD/SMP": { min: 1800000, max: 3000000, label: "Lulusan SD/SMP" },
  "SMA/SMK": { min: 2500000, max: 4500000, label: "Lulusan SMA/SMK" },
  "D3": { min: 3500000, max: 6000000, label: "Lulusan D3" },
  "S1": { min: 4500000, max: 10000000, label: "Lulusan S1" },
  "S2": { min: 7000000, max: 15000000, label: "Lulusan S2" },
  "S3": { min: 10000000, max: 25000000, label: "Lulusan S3" },
};

const PEKERJAAN_BERDASARAN_GAJI = [
  { max: 3000000, jobs: "Kasir, SPG, Office Boy, Pramuniaga, Cleaning Service" },
  { max: 5000000, jobs: "Admin, Staff Gudang, Customer Service, Resepsionis" },
  { max: 8000000, jobs: "Account Executive, Software Junior, Marketing, Supervisor" },
  { max: 12000000, jobs: "Project Manager, Software Engineer, Account Manager" },
  { max: 20000000, jobs: "Senior Engineer, Product Manager, Sales Manager" },
  { max: 50000000, jobs: "Director, VP, Senior Consultant, Specialist" },
  { max: Infinity, jobs: "C-Level, Direktur Utama, Entrepreneur" },
];

const GAJI_ALL = [
  2000000, 2500000, 3000000, 3500000, 4000000, 4500000, 5000000,
  5500000, 6000000, 7000000, 8000000, 9000000, 10000000, 12000000,
  15000000, 20000000, 25000000, 30000000, 40000000, 50000000,
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

export default function GajiPage() {
  const [gaji, setGaji] = useState<string>("");
  const [kota, setKota] = useState<string>("DKI Jakarta");
  const [pendidikan, setPendidikan] = useState<string>("S1");
  const [cek, setCek] = useState(false);

  const hasil = useMemo(() => {
    if (!gaji) return null;
    const jumlah = parseFloat(gaji.replace(/\./g, "").replace(",", "."));
    if (isNaN(jumlah) || jumlah <= 0) return null;

    const umr = UMR_2025[kota] || 3500000;
    const diAtasUMR = jumlah >= umr;
    const selisihUMR = jumlah - umr;

    const rangePendidikan = GAJI_RATA_RATA[pendidikan];
    const diAtasRataRata = jumlah >= rangePendidikan.max;
    const diBawahRataRata = jumlah <= rangePendidikan.min;

    let persentil = 0;
    for (let i = 0; i < GAJI_ALL.length; i++) {
      if (jumlah <= GAJI_ALL[i]) {
        persentil = ((i + 1) / GAJI_ALL.length) * 100;
        break;
      }
    }
    if (jumlah > GAJI_ALL[GAJI_ALL.length - 1]) persentil = 95;

    const pekerjaan = PEKERJAAN_BERDASARAN_GAJI.find((p) => jumlah <= p.max);

    const chartData = Object.entries(UMR_2025)
      .slice(0, 8)
      .map(([name, umrVal]) => ({
        name: name.split(" ")[0],
        umr: umrVal,
        gaji: jumlah,
      }));

    return {
      jumlah,
      umr,
      diAtasUMR,
      selisihUMR,
      rangePendidikan,
      diAtasRataRata,
      diBawahRataRata,
      persentil,
      pekerjaan,
      chartData,
    };
  }, [gaji, kota, pendidikan]);

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
            Pengecek Gaji
          </h2>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
            Gaji kamu di atas atau di bawah rata-rata?
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-5 sm:p-8 text-white"
      >
        <div className="flex items-center gap-3 mb-3">
          <Briefcase className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg sm:text-xl font-bold">Gaji Saya di Atas/Bawah Rata-rata?</h3>
        </div>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Cek posisi gaji kamu dibanding UMR kota tempat tinggal, rata-rata berdasarkan jenjang
          pendidikan, dan temukan persentil gaji kamu di Indonesia.
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
              Gaji per Bulan (Rp)
            </label>
            <input
              type="text"
              value={gaji}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                if (raw) {
                  setGaji(parseInt(raw).toLocaleString("id-ID"));
                } else {
                  setGaji("");
                }
              }}
              placeholder="contoh: 5.000.000"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Kota / Provinsi
            </label>
            <select
              value={kota}
              onChange={(e) => setKota(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
            >
              {Object.keys(UMR_2025).map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Jenjang Pendidikan
            </label>
            <select
              value={pendidikan}
              onChange={(e) => setPendidikan(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
            >
              {Object.keys(GAJI_RATA_RATA).map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={() => setCek(true)}
          disabled={!gaji}
          className="mt-4 w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white text-sm font-semibold transition-colors"
        >
          Cek Sekarang
        </button>
      </motion.div>

      <AnimatePresence>
        {cek && hasil && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-red-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Hasil Pengecekan</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className={`rounded-xl p-4 ${hasil.diAtasUMR ? "bg-emerald-50 dark:bg-emerald-950/30" : "bg-red-50 dark:bg-red-950/30"}`}>
                  <p className={`text-[10px] font-semibold uppercase tracking-wider ${hasil.diAtasUMR ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                    vs UMR {kota.split(" ")[0]}
                  </p>
                  <p className={`text-lg font-bold mt-1 ${hasil.diAtasUMR ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>
                    {hasil.diAtasUMR ? "Di Atas UMR" : "Di Bawah UMR"}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    UMR: {formatRupiah(hasil.umr)}
                    {hasil.selisihUMR !== 0 && (
                      <> | Selisih: {formatRupiah(Math.abs(hasil.selisihUMR))}</>
                    )}
                  </p>
                </div>
                <div className={`rounded-xl p-4 ${hasil.diAtasRataRata ? "bg-emerald-50 dark:bg-emerald-950/30" : hasil.diBawahRataRata ? "bg-red-50 dark:bg-red-950/30" : "bg-blue-50 dark:bg-blue-950/30"}`}>
                  <p className={`text-[10px] font-semibold uppercase tracking-wider ${hasil.diAtasRataRata ? "text-emerald-600 dark:text-emerald-400" : hasil.diBawahRataRata ? "text-red-600 dark:text-red-400" : "text-blue-600 dark:text-blue-400"}`}>
                    vs {hasil.rangePendidikan.label}
                  </p>
                  <p className={`text-lg font-bold mt-1 ${hasil.diAtasRataRata ? "text-emerald-700 dark:text-emerald-300" : hasil.diBawahRataRata ? "text-red-700 dark:text-red-300" : "text-blue-700 dark:text-blue-300"}`}>
                    {hasil.diAtasRataRata ? "Di Atas Rata-rata" : hasil.diBawahRataRata ? "Di Bawah Rata-rata" : "Dalam Range Normal"}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    Range: {formatRupiah(hasil.rangePendidikan.min)} - {formatRupiah(hasil.rangePendidikan.max)}
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-4">
                  <p className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                    Persentil Nasional
                  </p>
                  <p className="text-lg font-bold text-purple-700 dark:text-purple-300 mt-1">
                    Top {Math.round(100 - hasil.persentil)}%
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    Gaji kamu lebih tinggi dari {Math.round(hasil.persentil)}% populasi
                  </p>
                </div>
              </div>

              <div className="mt-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  💡 Gaji kamu <strong>{formatRupiah(hasil.jumlah)}</strong>/bulan.{" "}
                  {hasil.diAtasUMR
                    ? `Di atas UMR ${kota} sebesar ${formatRupiah(hasil.umr)}. `
                    : `Di bawah UMR ${kota} sebesar ${formatRupiah(hasil.umr)}. `}
                  Untuk lulusan <strong>{pendidikan}</strong>, range normalnya{" "}
                  <strong>{formatRupiah(hasil.rangePendidikan.min)}-{formatRupiah(hasil.rangePendidikan.max)}</strong>.{" "}
                  {hasil.pekerjaan && (
                    <>Pekerjaan di range gaji ini: <strong>{hasil.pekerjaan.jobs}</strong>.</>
                  )}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Perbandingan dengan UMR Kota Lain</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hasil.chartData} margin={{ left: 10, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                    <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}jt`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="umr" name="UMR" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={20} />
                    <Bar dataKey="gaji" name="Gaji Kamu" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
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
                Mengetahui posisi gaji kamu membantu membuat keputusan karir yang lebih baik.
                Jika gaji kamu jauh di bawah rata-rata untuk jenjang pendidikanmu, mungkin
                waktunya untuk negosiasi gaji atau mencari peluang baru.
              </p>
              <p>
                <strong>UMR/UMK</strong> adalah Upah Minimum Regional/Kota — gaji terendah yang
                harus dibayarkan perusahaan. Jika gaji kamu di bawah UMR, itu melanggar peraturan.
              </p>
              <p>
                <strong>Catatan:</strong> Data UMR 2025 bersumber dari Kementerian Ketenagakerjaan.
                Data rata-rata gaji berdasarkan survei BPS danJobStreet. Angka ini bersifat estimasi
                dan bisa berbeda tergantung sektor industri.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
