import { createServiceClient } from "@/lib/supabase/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, HelpCircle, TrendingUp, Heart, BookOpen, Leaf, Smartphone, Users } from "lucide-react";
import type { QAItemRow } from "@/lib/api-adapter";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Ekonomi: TrendingUp,
  Kesehatan: Heart,
  Pendidikan: BookOpen,
  Lingkungan: Leaf,
  "Digital & Teknologi": Smartphone,
  "Sosial & Demografi": Users,
};

const colorMap: Record<string, string> = {
  Ekonomi: "from-blue-500 to-blue-600",
  Kesehatan: "from-red-500 to-red-600",
  Pendidikan: "from-amber-500 to-amber-600",
  Lingkungan: "from-emerald-500 to-emerald-600",
  "Digital & Teknologi": "from-violet-500 to-violet-600",
  "Sosial & Demografi": "from-cyan-500 to-cyan-600",
};

export default async function TanyaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceClient();

  const { data: qa } = await supabase
    .from("qa_items")
    .select("*")
    .eq("slug", id)
    .single();

  if (!qa) notFound();

  const typedQa = qa as QAItemRow;

  let relatedItems: QAItemRow[] = [];
  if (typedQa.related_slugs && typedQa.related_slugs.length > 0) {
    const { data } = await supabase
      .from("qa_items")
      .select("*")
      .in("slug", typedQa.related_slugs)
      .eq("is_published", true);
    relatedItems = (data as QAItemRow[]) || [];
  }

  const Icon = iconMap[typedQa.category] || HelpCircle;
  const color = colorMap[typedQa.category] || "from-slate-500 to-slate-600";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/tanya" className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">{typedQa.category}</span>
          <span className="text-[10px] bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded text-blue-600 dark:text-blue-400">{typedQa.source ?? ""}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              {typedQa.question}
            </h1>
          </div>
        </div>

        <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
          {typedQa.answer.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-xs sm:text-sm">{paragraph}</p>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2">
          <a
            href={typedQa.source_url ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ExternalLink className="w-3 h-3" />
            Lihat sumber data
          </a>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Data Pendukung</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {typedQa.data_points.map((dp, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl"
            >
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">{dp.label}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">{dp.source ?? ""}</p>
              </div>
              <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white ml-3 flex-shrink-0">
                {dp.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {relatedItems.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Pertanyaan Terkait</h3>
          <div className="space-y-2">
            {relatedItems.map((rqa) => {
              const RIcon = iconMap[rqa.category] || HelpCircle;
              const rColor = colorMap[rqa.category] || "from-slate-500 to-slate-600";
              return (
                <Link
                  key={rqa.id}
                  href={`/tanya/${rqa.slug}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${rColor} flex items-center justify-center flex-shrink-0`}>
                    <RIcon className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white group-hover:text-red-500 transition-colors truncate">
                      {rqa.question}
                    </p>
                    <p className="text-[10px] text-slate-400">{rqa.source ?? ""}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
