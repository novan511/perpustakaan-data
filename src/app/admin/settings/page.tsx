"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { FadeIn } from "@/components/ui/motion";
import {
  User,
  Mail,
  Shield,
  LogOut,
  Loader2,
  Settings,
  Calendar,
} from "lucide-react";

interface UserInfo {
  email: string;
  full_name: string;
  created_at: string;
  role: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      if (authUser) {
        setUser({
          email: authUser.email ?? "",
          full_name:
            (authUser.user_metadata?.full_name as string) ?? "",
          created_at: authUser.created_at ?? "",
          role: (authUser.user_metadata?.role as string) ?? "admin",
        });
      }
      setLoading(false);
    }
    fetchUser();
  }, [supabase]);

  async function handleLogout() {
    setLoggingOut(true);
    await supabase.auth.signOut();
    router.push("/admin");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-red-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <FadeIn>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Settings
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Kelola akun dan pengaturan admin
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Account Information
              </h2>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                Informasi akun admin Anda
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  Email
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                  {user?.email || "-"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="w-8 h-8 bg-violet-50 dark:bg-violet-900/20 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-violet-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  Nama Lengkap
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {user?.full_name || "-"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="w-8 h-8 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  Role
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-white capitalize">
                  {user?.role || "admin"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="w-8 h-8 bg-amber-50 dark:bg-amber-900/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-amber-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  Terdaftar Sejak
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
            Account Actions
          </h2>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg transition-colors w-full justify-center"
          >
            {loggingOut ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
            Keluar dari Akun
          </button>
        </div>
      </FadeIn>
    </div>
  );
}
