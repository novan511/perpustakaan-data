"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowLeft, PiggyBank, Clock, Info } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

function formatRupiah(n: number): string {
  return `Rp ${Math.round(n).toLocaleString("id-ID")}`;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg">
      <p className="text-xs font-bold text-slate-900 dark:text-white">Bulan {label}</p>
      <p className="text-xs text-slate-600 dark:text-slate-300">{formatRupiah(payload[0].value)}</p>
    </div>
  );
}

export default function TabunganPage() {
  const [target, setTarget] = useState<string>("");
  const [tabunganAwal, setTabunganAwal] = useState<string>("0");
  const [simpanBulan, setSimpanBulan] = useState<string>("");
  const [returnRate, setReturnRate] = useState<string>("4");
  const [hitung, setHitung] = useState(false);

  const hasil = useMemo(() => {
    const t = parseFloat(target.replace(/\./g, "").replace(",", "."));
    const a = parseFloat(tabunganAwal.replace(/\./g, "").replace(",", "."));
    const s = parseFloat(simpanBulan.replace(/\./g, "").replace(",", "."));
    const r = parseFloat(returnRate) / 100 / 12;
    if (isNaN(t) || t <= 0 || isNaN(a) || isNaN(s) || s <= 0) return null;

    const chartData: { bulan: number; total: number }[] = [];
    let total = a;
    let bulan = 0;
    const maxBulan = 600;

    while (total < t && bulan < maxBulan) {
      bulan++;
      total = total * (1 + r) + s;
      if (bulan % 3 === 0 || total >= t) {
        chartData.push({ bulan, total: Math.round(total) });
      }
    }

    if (bulan >= maxBulan) return null;

    const tahun = Math.floor(bulan / 12);
    const sisaBulan = bulan % 12;

    const skenarios = [];
    for (let tambahan = 100000; tambahan <= 2000000; tambahan += 100000) {
      let tTotal = a;
      let tBulan = 0;
      while (tTotal < t && tBulan < maxBulan) {
        tBulan++;
        tTotal = tTotal * (1 + r) + (s + tambahan);
      }
      if (tBulan < bulan) {
        skenarios.push({
          tambahan,
          bulanHemat: bulan - tBulan,
          bulanBaru: tBulan,
          totalSimpanan: s + tambahan,
        });
      }
    }

    return {
      bulan,
      tahun,
      sisaBulan,
      chartData,
      target: t,
      awal: a,
      monthly: s,
      rate: r * 12 * 100,
      skenarios: skenarios.slice(0, 5),
    };
  }, [target, tabunganAwal, simpanBulan, returnRate]);

  const getMotivasi = (bulan: number) => {
    if (bulan <= 6) return "Kamu bisa capai goal ini dalam waktu dekat! Pertahankan disiplinmu.";
    if (bulan <= 12) return "Kurang dari setahun — konsistensi adalah kunci. Kamu pasti bisa!";
    if (bulan <= 24) return "Dua tahun itu realistis. Mulai sekarang dan jangan berhenti di tengah jalan.";
    if (bulan <= 60) return "Butuh kesabaran, tapi setiap langkah kecil mendekatmu ke goal. Kamu bisa!";
    return "Goal ini cukup besar. Pertimbangkan untuk menambah penghasilan atau menurunkan target.";
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
            Kalkulator Tabungan
          </h2>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
            Berapa lama nabung untuk goal kamu?
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-5 sm:p-8 text-white"
      >
        <div className="flex items-center gap-3 mb-3">
          <PiggyBank className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg sm:text-xl font-bold">Berapa Lama Nabung untuk X?</h3>
        </div>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Punya goal keuangan? Masukkan targetmu dan temukan berapa lama waktu yang dibutuhkan
          untuk mencapainya. Kalkulator ini juga memperhitungkan <strong>return investasi</strong>.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6"
      >
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Masukkan Data</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Target Nabung (Rp)
            </label>
            <input
              type="text"
              value={target}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                setTarget(raw ? parseInt(raw).toLocaleString("id-ID") : "");
              }}
              placeholder="contoh: 50.000.000"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Tabungan Sudah Ada (Rp)
            </label>
            <input
              type="text"
              value={tabunganAwal}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                setTabunganAwal(raw ? parseInt(raw).toLocaleString("id-ID") : "0");
              }}
              placeholder="contoh: 5.000.000"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Kemampuan Nabung/Bulan (Rp)
            </label>
            <input
              type="text"
              value={simpanBulan}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                setSimpanBulan(raw ? parseInt(raw).toLocaleString("id-ID") : "");
              }}
              placeholder="contoh: 2.000.000"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Return per Tahun (%)
            </label>
            <input
              type="number"
              value={returnRate}
              onChange={(e) => setReturnRate(e.target.value)}
              step="0.5"
              min="0"
              max="30"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
            />
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Default 4% = deposito</p>
          </div>
        </div>
        <button
          onClick={() => setHitung(true)}
          disabled={!target || !simpanBulan}
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
                <Clock className="w-4 h-4 text-red-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Hasil Perhitungan</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4">
                  <p className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    Waktu Nabung
                  </p>
                  <p className="text-lg font-bold text-blue-700 dark:text-blue-300 mt-1">
                    {hasil.tahun > 0 && `${hasil.tahun} Tahun `}
                    {hasil.sisaBulan > 0 && `${hasil.sisaBulan} Bulan`}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    {hasil.bulan} bulan total
                  </p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-4">
                  <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    Total Simpanan
                  </p>
                  <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300 mt-1">
                    {formatRupiah(hasil.target)}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    Dari tabungan awal + setoran bulanan + return
                  </p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-4">
                  <p className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    Total Setoran
                  </p>
                  <p className="text-lg font-bold text-amber-700 dark:text-amber-300 mt-1">
                    {formatRupiah(hasil.awal + hasil.monthly * hasil.bulan)}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    Tanpa bunga: {formatRupiah(hasil.awal + hasil.monthly * hasil.bulan)}
                  </p>
                </div>
              </div>

              <div className="mt-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  💡 {getMotivasi(hasil.bulan)} Dengan setoran {formatRupiah(hasil.monthly)}/bulan
                  dan return {hasil.rate.toFixed(1)}% per tahun, kamu mencapai target
                  {" "}{formatRupiah(hasil.target)} dalam {hasil.tahun > 0 && `${hasil.tahun} tahun `}
                  {hasil.sisaBulan > 0 && `${hasil.sisaBulan} bulan`}.
                </p>
              </div>
            </div>

            {hasil.skenarios.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Simulasi &quot;What If&quot;</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  Apa yang terjadi kalau kamu nabung lebih banyak tiap bulan?
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left py-2 text-slate-500 dark:text-slate-400 font-semibold">Nabung/Bulan</th>
                        <th className="text-right py-2 text-slate-500 dark:text-slate-400 font-semibold">Waktu</th>
                        <th className="text-right py-2 text-slate-500 dark:text-slate-400 font-semibold">Hemat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hasil.skenarios.map((sk, i) => (
                        <tr key={i} className="border-b border-slate-100 dark:border-slate-800">
                          <td className="py-2 text-slate-900 dark:text-white font-medium">
                            {formatRupiah(sk.totalSimpanan)}/bulan
                          </td>
                          <td className="py-2 text-right text-slate-600 dark:text-slate-300">
                            {Math.floor(sk.bulanBaru / 12) > 0 && `${Math.floor(sk.bulanBaru / 12)} T `}
                            {sk.bulanBaru % 12 > 0 && `${sk.bulanBaru % 12} Bl`}
                          </td>
                          <td className="py-2 text-right text-emerald-600 dark:text-emerald-400 font-medium">
                            {sk.bulanHemat} bulan lebih cepat
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Proyeksi Tabungan</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hasil.chartData} margin={{ left: 10, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="bulan" tick={{ fontSize: 10, fill: "#94a3b8" }} label={{ value: "Bulan", position: "insideBottomRight", offset: -5, fontSize: 10, fill: "#94a3b8" }} />
                    <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}jt`} />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine y={hasil.target} stroke="#ef4444" strokeDasharray="3 3" label={{ value: "Target", position: "right", fontSize: 10, fill: "#ef4444" }} />
                    <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  </LineChart>
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
                Banyak orang menunda nabung karena merasa &quot;nanti juga lama&quot;. Kalkulator ini
                membantu kamu melihat <strong>timeline nyata</strong> — sehingga bisa merencanakan
                dengan lebih baik.
              </p>
              <p>
                <strong>Dampak bunga majemuk:</strong> Jika kamu nabung Rp 2 juta/bulan dengan
                return 4%/tahun, setelah 5 tahun kamu punya Rp 132 juta — bukan cuma Rp 120 juta.
                Bunga menghasilkan Rp 12 juta tambahan tanpa usaha!
              </p>
              <p>
                <strong>Tips:</strong> Mulai dari yang kecil. Rp 500.000/bulan yang konsisten
                lebih baik daripada Rp 5 juta/bulan yang berhenti setelah 3 bulan.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
