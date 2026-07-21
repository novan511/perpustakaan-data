"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowLeft, CreditCard, AlertTriangle, Info } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

function formatRupiah(n: number): string {
  return `Rp ${Math.round(n).toLocaleString("id-ID")}`;
}

function hitungCicilan(principal: number, rate: number, years: number) {
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  if (monthlyRate === 0) {
    const monthly = principal / months;
    return { monthly, totalPaid: principal, totalInterest: 0, months };
  }
  const monthly = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalPaid = monthly * months;
  const totalInterest = totalPaid - principal;
  return { monthly, totalPaid, totalInterest, months };
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

export default function CicilanPage() {
  const [pinjaman, setPinjaman] = useState<string>("");
  const [bunga, setBunga] = useState<string>("8");
  const [tenor, setTenor] = useState<string>("5");
  const [gaji, setGaji] = useState<string>("");
  const [hitung, setHitung] = useState(false);

  const hasil = useMemo(() => {
    const p = parseFloat(pinjaman.replace(/\./g, "").replace(",", "."));
    const b = parseFloat(bunga);
    const t = parseInt(tenor);
    const g = parseFloat(gaji.replace(/\./g, "").replace(",", "."));
    if (isNaN(p) || p <= 0 || isNaN(b) || isNaN(t) || t <= 0 || isNaN(g) || g <= 0) return null;

    const utama = hitungCicilan(p, b, t);
    const dti = (utama.monthly / g) * 100;

    const skenario1 = hitungCicilan(p, b, Math.max(1, t - 1));
    const skenario2 = hitungCicilan(p, Math.max(0.5, b - 0.5), t);

    return {
      ...utama,
      dti,
      gaji: g,
      principal: p,
      rate: b,
      years: t,
      skenario1,
      skenario2,
    };
  }, [pinjaman, bunga, tenor, gaji]);

  const getDtiColor = (dti: number) => {
    if (dti < 30) return { bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-300", label: "Sehat", bar: "#10b981" };
    if (dti <= 40) return { bg: "bg-amber-50 dark:bg-amber-950/30", text: "text-amber-700 dark:text-amber-300", label: "Waspada", bar: "#f59e0b" };
    return { bg: "bg-red-50 dark:bg-red-950/30", text: "text-red-700 dark:text-red-300", label: "Berisiko", bar: "#ef4444" };
  };

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
            Simulator Cicilan
          </h2>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
            Cicilan saya wajar?
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-5 sm:p-8 text-white"
      >
        <div className="flex items-center gap-3 mb-3">
          <CreditCard className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg sm:text-xl font-bold">Cicilan Saya Wajar?</h3>
        </div>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Masukkan detail pinjaman kamu untuk mengetahui apakah cicilan masih dalam batas aman.
          Aturan umum: cicilan bulanan tidak boleh melebihi <strong>30%</strong> dari gaji.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6"
      >
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Masukkan Data Pinjaman</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Jumlah Pinjaman (Rp)
            </label>
            <input
              type="text"
              value={pinjaman}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                setPinjaman(raw ? parseInt(raw).toLocaleString("id-ID") : "");
              }}
              placeholder="contoh: 200.000.000"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Bunga per Tahun (%)
            </label>
            <input
              type="number"
              value={bunga}
              onChange={(e) => setBunga(e.target.value)}
              step="0.1"
              min="0"
              max="30"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Tenor (Tahun)
            </label>
            <input
              type="number"
              value={tenor}
              onChange={(e) => setTenor(e.target.value)}
              min="1"
              max="30"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Penghasilan Bulanan (Rp)
            </label>
            <input
              type="text"
              value={gaji}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                setGaji(raw ? parseInt(raw).toLocaleString("id-ID") : "");
              }}
              placeholder="contoh: 10.000.000"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
            />
          </div>
        </div>
        <button
          onClick={() => setHitung(true)}
          disabled={!pinjaman || !gaji}
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
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Hasil Analisis</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-3">
                  <p className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    Cicilan/Bulan
                  </p>
                  <p className="text-sm font-bold text-blue-700 dark:text-blue-300 mt-1">
                    {formatRupiah(hasil.monthly)}
                  </p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-3">
                  <p className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    Total Bunga
                  </p>
                  <p className="text-sm font-bold text-amber-700 dark:text-amber-300 mt-1">
                    {formatRupiah(hasil.totalInterest)}
                  </p>
                </div>
                <div className="bg-violet-50 dark:bg-violet-950/30 rounded-xl p-3">
                  <p className="text-[10px] font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
                    Total Bayar
                  </p>
                  <p className="text-sm font-bold text-violet-700 dark:text-violet-300 mt-1">
                    {formatRupiah(hasil.totalPaid)}
                  </p>
                </div>
                <div className={`${getDtiColor(hasil.dti).bg} rounded-xl p-3`}>
                  <p className={`text-[10px] font-semibold uppercase tracking-wider ${getDtiColor(hasil.dti).text.replace("700", "600").replace("300", "400")}`}>
                    DTI Ratio
                  </p>
                  <p className={`text-sm font-bold mt-1 ${getDtiColor(hasil.dti).text}`}>
                    {hasil.dti.toFixed(1)}%
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{getDtiColor(hasil.dti).label}</p>
                </div>
              </div>

              <div className="mt-4 relative">
                <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mb-1">
                  <span>0%</span>
                  <span>30% (Batas Aman)</span>
                  <span>100%</span>
                </div>
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(hasil.dti, 100)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: getDtiColor(hasil.dti).bar }}
                  />
                </div>
                <div className="absolute top-6 left-[30%] w-px h-4 bg-slate-400 dark:bg-slate-500" />
              </div>

              <div className="mt-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  💡 Cicilan kamu <strong>{formatRupiah(hasil.monthly)}/bulan</strong> ({hasil.dti.toFixed(1)}% dari gaji).{" "}
                  {hasil.dti < 30
                    ? "Masih dalam batas aman! Kamu punya sisa ~" + formatRupiah(hasil.gaji - hasil.monthly) + " untuk kebutuhan lain."
                    : hasil.dti <= 40
                    ? "Sudah mulai mepet. Batas aman adalah 30%. Pertimbangkan untuk memperpanjang tenor atau mencari bunga lebih rendah."
                    : "Melebihi batas aman! Kamu berisiko kesulitan bayar. Segera pertimbangkan restrukturisasi atau opsi lain."}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Skenario Alternatif</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4">
                  <p className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                    Tenor {Math.max(1, hasil.years - 1)} Tahun (-1 thn)
                  </p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Cicilan/bulan</span>
                      <span className="font-medium text-slate-900 dark:text-white">{formatRupiah(hasil.skenario1.monthly)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Total bunga</span>
                      <span className="font-medium text-slate-900 dark:text-white">{formatRupiah(hasil.skenario1.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">DTI</span>
                      <span className="font-medium text-slate-900 dark:text-white">{((hasil.skenario1.monthly / hasil.gaji) * 100).toFixed(1)}%</span>
                    </div>
                    <p className="text-[10px] text-blue-600 dark:text-blue-400 mt-1">
                      Cicilan naik {formatRupiah(hasil.skenario1.monthly - hasil.monthly)}/bulan, tapi bunga hemat {formatRupiah(hasil.totalInterest - hasil.skenario1.totalInterest)}
                    </p>
                  </div>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-4">
                  <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
                    Bunga {(hasil.rate - 0.5).toFixed(1)}% (-0,5%)
                  </p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Cicilan/bulan</span>
                      <span className="font-medium text-slate-900 dark:text-white">{formatRupiah(hasil.skenario2.monthly)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Total bunga</span>
                      <span className="font-medium text-slate-900 dark:text-white">{formatRupiah(hasil.skenario2.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">DTI</span>
                      <span className="font-medium text-slate-900 dark:text-white">{((hasil.skenario2.monthly / hasil.gaji) * 100).toFixed(1)}%</span>
                    </div>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1">
                      Cicilan turun {formatRupiah(hasil.monthly - hasil.skenario2.monthly)}/bulan dan bunga hemat {formatRupiah(hasil.totalInterest - hasil.skenario2.totalInterest)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Pembagian Cicilan vs Sisa Gaji</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: "Cicilan", value: Math.round(hasil.monthly), fill: "#ef4444" },
                    { name: "Sisa Gaji", value: Math.round(hasil.gaji - hasil.monthly), fill: "#10b981" },
                  ]} layout="vertical" margin={{ left: 20, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}jt`} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: "#94a3b8" }} width={70} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={36}>
                      <Cell fill="#ef4444" />
                      <Cell fill="#10b981" />
                    </Bar>
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
                <strong>Debt-to-Income Ratio (DTI)</strong> adalah perbandingan cicilan bulanan
                dengan penghasilan. DTI &lt; 30% = aman, 30-40% = waspada, &gt; 40% = berisiko tinggi.
              </p>
              <p>
                <strong>Dampak nyata:</strong> Jika DTI terlalu tinggi, kamu akan kesulitan
                menghadapi pengeluaran tak terduga (kesehatan, perbaikan rumah, dll). Bank
                biasanya membatasi KPR max 30-40% dari gaji untuk alasan ini.
              </p>
              <p>
                <strong>Tips:</strong> Sebelum ambil pinjaman besar, hitung DTI kamu dulu.
                Jika melebihi 30%, pertimbangkan menabung dulu untuk DP lebih besar agar
                cicilan bulanan lebih ringan.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
