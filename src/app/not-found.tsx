import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-200 dark:text-slate-700 mb-4">404</h1>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Halaman Tidak Ditemukan</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Halaman yang kamu cari tidak ada atau sudah dipindahkan.</p>
        <Link href="/" className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors">Kembali ke Beranda</Link>
      </div>
    </div>
  );
}
