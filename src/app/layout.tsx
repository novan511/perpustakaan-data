import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Perpustakaan Data Indonesia",
  description:
    "Dashboard data Indonesia terkini dari BPS, Bank Indonesia, Kemendag, LPS, OJK, dan Kemenkeu. Mudah dipahami untuk semua kalangan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-white focus:text-red-500">
            Langkah ke Konten
          </a>
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 sm:px-6 py-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Perpustakaan Data Indonesia &mdash; Data dari berbagai sumber terpercaya
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">
                Update terakhir: {new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
