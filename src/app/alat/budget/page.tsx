"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowLeft, Wallet, CheckCircle, Info } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

function formatRupiah(n: number): string {
  return `Rp ${Math.round(n).toLocaleString("id-ID")}`;
}

interface TooltipPayloadItem {
  name: string;
  value: number;
  payload: { name: string; value: number; fill: string };
}

function CustomPieTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayloadItem[] }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg">
      <p className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</p>
      <p className="text-xs text-slate-600 dark:text-slate-300">{formatRupiah(item.value)}</p>
    </div>
  );
}

function CustomBarTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg">
      <p className="text-xs font-bold text-slate-900 dark:text-white">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs text-slate-600 dark:text-slate-300">
          {p.name}: {p.name.includes("%") ? `${p.value.toFixed(1)}%` : formatRupiah(p.value)}
        </p>
      ))}
    </div>
  );
}

function hitungSkor(actNeeds: number, actWants: number, actSaves: number, total: number) {
  const pctNeeds = (actNeeds / total) * 100;
  const pctWants = (actWants / total) * 100;
  const pctSaves = (actSaves / total) * 100;

  const devNeeds = Math.abs(pctNeeds - 50);
  const devWants = Math.abs(pctWants - 30);
  const devSaves = Math.abs(pctSaves - 20);

  const totalDev = devNeeds + devWants + devSaves;
  const skor = Math.max(0, Math.min(100, 100 - totalDev * 1.5));

  return { pctNeeds, pctWants, pctSaves, skor, devNeeds, devWants, devSaves };
}

function getTips(actNeeds: number, actWants: number, actSaves: number, total: number): string[] {
  const tips: string[] = [];
  const pctNeeds = (actNeeds / total) * 100;
  const pctWants = (actWants / total) * 100;
  const pctSaves = (actSaves / total) * 100;

  if (pctNeeds > 55) {
    tips.push("Kebutuhanmu terlalu tinggi. Cek apakah ada pengeluaran yang sebenarnya bisa dikurangi (langganan tidak terpakai, dll).");
  }
  if (pctNeeds < 40) {
    tips.push("Kebutuhanmu terlihat rendah — pastikan semua kebutuhan pokok sudah tercakup (makan, transport, sewa, listrik).");
  }
  if (pctWants > 35) {
    tips.push("Hiburan/gaya hidup terlalu besar. Coba kurangi 5-10% dan alokasikan ke tabungan.");
  }
  if (pctSaves < 15) {
    tips.push("Tabunganmu di bawah 15%. Idealnya minimal 20%. Coba mulai dengan auto-debit tabungan di awal bulan.");
  }
  if (pctSaves >= 25) {
    tips.push("Tabunganmu bagus! Pertimbangkan untuk menginvestasikan sebagian agar return lebih tinggi dari inflasi.");
  }
  if (pctWants < 20) {
    tips.push("Kamu sangat disiplin! Tapi jangan lupa nikmati hidup juga — budget hiburan yang wajar membantu kesehatan mental.");
  }

  return tips;
}

export default function BudgetPage() {
  const [gaji, setGaji] = useState<string>("");
  const [kebutuhan, setKebutuhan] = useState<string>("");
  const [keinginan, setKeinginan] = useState<string>("");
  const [tabungan, setTabungan] = useState<string>("");
  const [cek, setCek] = useState(false);

  const hasil = useMemo(() => {
    const g = parseFloat(gaji.replace(/\./g, "").replace(",", "."));
    const k = parseFloat(kebutuhan.replace(/\./g, "").replace(",", "."));
    const i = parseFloat(keinginan.replace(/\./g, "").replace(",", "."));
    const t = parseFloat(tabungan.replace(/\./g, "").replace(",", "."));
    if (isNaN(g) || g <= 0 || isNaN(k) || isNaN(i) || isNaN(t)) return null;

    const total = k + i + t;
    const selisih = g - total;

    const { pctNeeds, pctWants, pctSaves, skor, devNeeds, devWants, devSaves } = hitungSkor(k, i, t, g);

    const idealData = [
      { name: "Kebutuhan (50%)", value: Math.round(g * 0.5), fill: "#3b82f6" },
      { name: "Keinginan (30%)", value: Math.round(g * 0.3), fill: "#f59e0b" },
      { name: "Tabungan (20%)", value: Math.round(g * 0.2), fill: "#10b981" },
    ];

    const actualData = [
      { name: "Kebutuhan", value: Math.round(k), fill: "#3b82f6" },
      { name: "Keinginan", value: Math.round(i), fill: "#f59e0b" },
      { name: "Tabungan", value: Math.round(t), fill: "#10b981" },
    ];

    const barData = [
      { kategori: "Kebutuhan", Aktual: Math.round(k), Ideal: Math.round(g * 0.5) },
      { kategori: "Keinginan", Aktual: Math.round(i), Ideal: Math.round(g * 0.3) },
      { kategori: "Tabungan", Aktual: Math.round(t), Ideal: Math.round(g * 0.2) },
    ];

    const tips = getTips(k, i, t, g);

    return {
      gaji: g,
      total,
      selisih,
      pctNeeds,
      pctWants,
      pctSaves,
      skor,
      devNeeds,
      devWants,
      devSaves,
      idealData,
      actualData,
      barData,
      tips,
    };
  }, [gaji, kebutuhan, keinginan, tabungan]);

  const getSkorColor = (skor: number) => {
    if (skor >= 80) return { text: "text-emerald-500", label: "Sangat Baik", ring: "#10b981" };
    if (skor >= 60) return { text: "text-blue-500", label: "Cukup Baik", ring: "#3b82f6" };
    if (skor >= 40) return { text: "text-amber-500", label: "Perlu Perbaikan", ring: "#f59e0b" };
    return { text: "text-red-500", label: "Perlu Perhatian", ring: "#ef4444" };
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
            Pengecek Budget
          </h2>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
            Pengeluaran kamu sehat? Cek dengan aturan 50/30/20.
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-5 sm:p-8 text-white"
      >
        <div className="flex items-center gap-3 mb-3">
          <Wallet className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg sm:text-xl font-bold">Pengeluaran Saya Sehat?</h3>
        </div>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Aturan <strong>50/30/20</strong>: 50% untuk kebutuhan, 30% untuk keinginan, 20% untuk tabungan.
          Masukkan data keuanganmu dan lihat apakah budgetmu sudah sehat.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6"
      >
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Masukkan Data Keuangan</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Pengeluaran Kebutuhan (Rp)
            </label>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-1">Makan, transport, sewa, listrik, dll</p>
            <input
              type="text"
              value={kebutuhan}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                setKebutuhan(raw ? parseInt(raw).toLocaleString("id-ID") : "");
              }}
              placeholder="contoh: 5.000.000"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Pengeluaran Keinginan (Rp)
            </label>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-1">Hiburan, jajan, fashion, gadget, dll</p>
            <input
              type="text"
              value={keinginan}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                setKeinginan(raw ? parseInt(raw).toLocaleString("id-ID") : "");
              }}
              placeholder="contoh: 3.000.000"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Tabungan/Investasi (Rp)
            </label>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-1">Tabungan, deposito, reksadana, saham, dll</p>
            <input
              type="text"
              value={tabungan}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                setTabungan(raw ? parseInt(raw).toLocaleString("id-ID") : "");
              }}
              placeholder="contoh: 2.000.000"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
            />
          </div>
        </div>
        <button
          onClick={() => setCek(true)}
          disabled={!gaji || !kebutuhan || !keinginan || !tabungan}
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
                <CheckCircle className="w-4 h-4 text-red-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Hasil Analisis Budget</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-3">
                  <p className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    Kebutuhan
                  </p>
                  <p className="text-sm font-bold text-blue-700 dark:text-blue-300 mt-1">
                    {hasil.pctNeeds.toFixed(1)}%
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Ideal: 50%</p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-3">
                  <p className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    Keinginan
                  </p>
                  <p className="text-sm font-bold text-amber-700 dark:text-amber-300 mt-1">
                    {hasil.pctWants.toFixed(1)}%
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Ideal: 30%</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-3">
                  <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    Tabungan
                  </p>
                  <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300 mt-1">
                    {hasil.pctSaves.toFixed(1)}%
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Ideal: 20%</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                  <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Skor
                  </p>
                  <p className={`text-sm font-bold mt-1 ${getSkorColor(hasil.skor).text}`}>
                    {Math.round(hasil.skor)}/100
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{getSkorColor(hasil.skor).label}</p>
                </div>
              </div>

              {hasil.selisih !== 0 && (
                <div className={`mt-3 text-xs rounded-xl p-3 ${hasil.selisih > 0 ? "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300" : "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300"}`}>
                  {hasil.selisih > 0
                    ? `Sisa ${formatRupiah(hasil.selisih)} dari penghasilan yang belum dialokasikan.`
                    : `Pengeluaranmu melebihi penghasilan sebesar ${formatRupiah(Math.abs(hasil.selisih))}!`}
                </div>
              )}

              <div className="mt-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  💡 Kamu menghabiskan <strong>{hasil.pctNeeds.toFixed(1)}%</strong> untuk kebutuhan.{" "}
                  {Math.abs(hasil.pctNeeds - 50) < 5
                    ? "Ini sudah dekat dengan ideal (50%). "
                    : hasil.pctNeeds > 50
                    ? `Idealnya 50%. Kelebihan ${Math.abs(hasil.pctNeeds - 50).toFixed(1)}% bisa dialihkan ke tabungan. `
                    : `Kebutuhanmu di bawah 50% — bagus, tapi pastikan semua kebutuhan pokok sudah tercakup. `}
                  Tabunganmu <strong>{hasil.pctSaves.toFixed(1)}%</strong> —{" "}
                  {hasil.pctSaves >= 20
                    ? "sudah sesuai atau di atas ideal!"
                    : `idealnya minimal 20%. Coba tambah ${formatRupiah(hasil.gaji * 0.2 - hasil.total * (hasil.pctSaves / 100))}/bulan.`}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Perbandingan Aktual vs Ideal</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-center text-slate-500 dark:text-slate-400 mb-2 font-semibold">Distribusi Aktual</p>
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={hasil.actualData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {hasil.actualData.map((entry, index) => (
                            <Cell key={index} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomPieTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 text-[10px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Kebutuhan</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Keinginan</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Tabungan</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-center text-slate-500 dark:text-slate-400 mb-2 font-semibold">Distribusi Ideal (50/30/20)</p>
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={hasil.idealData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {hasil.idealData.map((entry, index) => (
                            <Cell key={index} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomPieTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 text-[10px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Kebutuhan</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Keinginan</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Tabungan</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs text-center text-slate-500 dark:text-slate-400 mb-2 font-semibold">Perbandingan per Kategori</p>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hasil.barData} margin={{ left: 10, right: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="kategori" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                      <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}jt`} />
                      <Tooltip content={<CustomBarTooltip />} />
                      <Legend wrapperStyle={{ fontSize: 10 }} />
                      <Bar dataKey="Aktual" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={24} />
                      <Bar dataKey="Ideal" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {hasil.tips.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Tips Perbaikan</h3>
                <div className="space-y-2">
                  {hasil.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <span className="text-red-500 font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">{tip}</span>
                    </div>
                  ))}
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
                Aturan <strong>50/30/20</strong> adalah framework budgeting populer yang
                direkomendasikan banyak pakar keuangan. Sederhana tapi efektif untuk menjaga
                keseimbangan antara hidup hari ini dan masa depan.
              </p>
              <p>
                <strong>50% Kebutuhan:</strong> Makan, transport, sewa/kpr, listrik, internet,
                asuransi kesehatan. Ini yang TIDAK bisa ditunda.
              </p>
              <p>
                <strong>30% Keinginan:</strong> Nongkrong, streaming, jajan kopi, fashion,
                gadget. Ini yang BISA dikurangi kalau perlu.
              </p>
              <p>
                <strong>20% Tabungan:</strong> Dana darurat, investasi, bayar hutang. Ini yang
                MEMASTIKAN keuanganmu aman jangka panjang.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
