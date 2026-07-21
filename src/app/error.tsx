"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Terjadi Kesalahan</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{error.message}</p>
        <button onClick={reset} className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg">Coba Lagi</button>
      </div>
    </div>
  );
}
