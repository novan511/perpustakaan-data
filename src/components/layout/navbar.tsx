"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Database, Menu, X, ChevronDown } from "lucide-react";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const navGroups = [
  {
    label: "Beranda",
    items: [{ href: "/", label: "Dashboard" }],
  },
  {
    label: "Alat Keputusan",
    items: [
      { href: "/alat/inflasi", label: "Kalkulator Inflasi" },
      { href: "/alat/gaji", label: "Pengecek Gaji" },
      { href: "/alat/cicilan", label: "Simulator Cicilan" },
      { href: "/alat/tabungan", label: "Kalkulator Tabungan" },
      { href: "/alat/biaya-hidup", label: "Biaya Hidup" },
      { href: "/alat/budget", label: "Pengecek Budget" },
    ],
  },
  {
    label: "Tanya Data",
    items: [{ href: "/tanya", label: "Pertanyaan & Jawaban" }],
  },
  {
    label: "Data",
    items: [
      { href: "/jelajahi", label: "Jelajahi Semua Data" },
      { href: "/visualisasi", label: "Grafik Interaktif" },
      { href: "/korelasi", label: "Analisis Korelasi" },
    ],
  },
  {
    label: "Lainnya",
    items: [
      { href: "/glossarium", label: "Glossarium" },
      { href: "/tentang", label: "Tentang" },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const closeMenu = useCallback(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, []);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/20">
              <Database className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                Perpustakaan Data
              </span>
              <span className="hidden sm:inline text-[10px] text-slate-400 ml-2 font-medium">
                Indonesia
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Navigasi utama">
            {navGroups.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(group.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-lg transition-colors",
                    group.items.some((item) => isActive(item.href))
                      ? "text-red-500 bg-red-50 dark:bg-red-900/20"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  {group.label}
                  {group.items.length > 1 && <ChevronDown className="w-3 h-3" />}
                </button>

                {group.items.length > 1 && activeDropdown === group.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full pt-2 w-52 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 py-1 z-50"
                  >
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "block px-3 py-2 text-xs transition-colors",
                          isActive(item.href)
                            ? "text-red-500 bg-red-50 dark:bg-red-900/20 font-semibold"
                            : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-slate-100 dark:border-slate-800"
          >
            <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
              {navGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 py-1.5">
                    {group.label}
                  </p>
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className={cn(
                        "block px-3 py-2.5 text-sm rounded-lg transition-colors",
                        isActive(item.href)
                          ? "text-red-500 bg-red-50 dark:bg-red-900/20 font-semibold"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
              {mounted && (
                <div className="px-3 pt-2">
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg w-full"
                  >
                    {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    {theme === "dark" ? "Mode Terang" : "Mode Gelap"}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
