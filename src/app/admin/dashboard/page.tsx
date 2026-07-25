"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import {
  Database,
  HelpCircle,
  Sparkles,
  FileText,
  Folder,
  Plus,
  ArrowRight,
  Loader2,
  Activity,
} from "lucide-react";

interface Stats {
  categories: number;
  datasets: number;
  qaItems: number;
  funFacts: number;
  documents: number;
}

interface ActivityItem {
  id: string;
  type: string;
  title: string;
  time: string;
}

export default function AdminDashboardPage() {
  const [supabase] = useState(() => createClient());
  const [stats, setStats] = useState<Stats>({
    categories: 0,
    datasets: 0,
    qaItems: 0,
    funFacts: 0,
    documents: 0,
  });
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchStats() {
      const [catRes, dsRes, qaRes, ffRes, docRes] = await Promise.allSettled([
        supabase.from("categories").select("id", { count: "exact", head: true }),
        supabase.from("datasets").select("id", { count: "exact", head: true }),
        supabase.from("qa_items").select("id", { count: "exact", head: true }),
        supabase.from("fun_facts").select("id", { count: "exact", head: true }),
        supabase.from("documents").select("id", { count: "exact", head: true }),
      ]);

      if (cancelled) return;

      setStats({
        categories:
          catRes.status === "fulfilled" ? (catRes.value.count ?? 0) : 0,
        datasets:
          dsRes.status === "fulfilled" ? (dsRes.value.count ?? 0) : 0,
        qaItems:
          qaRes.status === "fulfilled" ? (qaRes.value.count ?? 0) : 0,
        funFacts:
          ffRes.status === "fulfilled" ? (ffRes.value.count ?? 0) : 0,
        documents:
          docRes.status === "fulfilled" ? (docRes.value.count ?? 0) : 0,
      });

      const activity: ActivityItem[] = [];
      const { data: recentQA } = await supabase
        .from("qa_items")
        .select("id, question, created_at")
        .order("created_at", { ascending: false })
        .limit(3);
      if (recentQA) {
        recentQA.forEach((item) =>
          activity.push({
            id: item.id,
            type: "qa",
            title: item.question,
            time: item.created_at,
          })
        );
      }

      const { data: recentDocs } = await supabase
        .from("documents")
        .select("id, title, created_at")
        .order("created_at", { ascending: false })
        .limit(3);
      if (recentDocs) {
        recentDocs.forEach((item) =>
          activity.push({
            id: item.id,
            type: "document",
            title: item.title,
            time: item.created_at,
          })
        );
      }

      activity.sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
      );
      if (!cancelled) {
        setRecentActivity(activity.slice(0, 5));
        setLoading(false);
      }
    }

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  const statCards = [
    {
      label: "Categories",
      value: stats.categories,
      icon: Folder,
      color: "from-blue-500 to-blue-600",
      href: "/admin/data",
    },
    {
      label: "Datasets",
      value: stats.datasets,
      icon: Database,
      color: "from-emerald-500 to-emerald-600",
      href: "/admin/data",
    },
    {
      label: "Q&A Items",
      value: stats.qaItems,
      icon: HelpCircle,
      color: "from-violet-500 to-violet-600",
      href: "/admin/qa",
    },
    {
      label: "Fun Facts",
      value: stats.funFacts,
      icon: Sparkles,
      color: "from-amber-500 to-amber-600",
      href: "/admin/fun-facts",
    },
    {
      label: "Documents",
      value: stats.documents,
      icon: FileText,
      color: "from-rose-500 to-rose-600",
      href: "/admin/documents",
    },
  ];

  const quickActions = [
    { label: "Add Dataset", href: "/admin/data", icon: Database },
    { label: "Add Q&A", href: "/admin/qa", icon: HelpCircle },
    { label: "Upload Document", href: "/admin/documents", icon: FileText },
    { label: "Add Fun Fact", href: "/admin/fun-facts", icon: Sparkles },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-red-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <FadeIn>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Ringkasan data dan aktivitas admin
          </p>
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {statCards.map((card) => (
          <StaggerItem key={card.label}>
            <Link
              href={card.href}
              className="block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 hover:shadow-lg transition-all group"
            >
              <div
                className={`w-8 h-8 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center mb-3`}
              >
                <card.icon className="w-4 h-4 text-white" />
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {card.value}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {card.label}
              </p>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FadeIn delay={0.2} className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-slate-400" />
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Quick Actions
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-2.5 px-3 py-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 transition-colors group"
                >
                  <div className="w-7 h-7 bg-red-50 dark:bg-red-900/20 rounded-md flex items-center justify-center group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
                    <action.icon className="w-3.5 h-3.5 text-red-500" />
                  </div>
                  <span className="font-medium">{action.label}</span>
                  <Plus className="w-3 h-3 ml-auto text-slate-400 group-hover:text-red-500 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 h-full">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            {recentActivity.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-slate-500 py-8 text-center">
                Belum ada aktivitas
              </p>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((item) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="flex items-start gap-2.5"
                  >
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        item.type === "qa"
                          ? "bg-violet-50 dark:bg-violet-900/20"
                          : "bg-rose-50 dark:bg-rose-900/20"
                      }`}
                    >
                      {item.type === "qa" ? (
                        <HelpCircle className="w-3 h-3 text-violet-500" />
                      ) : (
                        <FileText className="w-3 h-3 text-rose-500" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-700 dark:text-slate-300 truncate">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">
                        {item.type === "qa" ? "Q&A" : "Document"} &middot;{" "}
                        {new Date(item.time).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                    <ArrowRight className="w-3 h-3 text-slate-300 dark:text-slate-600 flex-shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
