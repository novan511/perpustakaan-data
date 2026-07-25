"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createClient } from "@/lib/supabase/client";
import { FadeIn } from "@/components/ui/motion";
import {
  Plus,
  Loader2,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  X,
  Sparkles,
  GripVertical,
} from "lucide-react";

interface FunFact {
  id: string;
  headline: string;
  summary: string;
  detail: string;
  source: string;
  source_url: string;
  category: string;
  icon: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

const categories = [
  "Ekonomi",
  "Demografi",
  "Teknologi",
  "Lingkungan",
  "Budaya",
  "Lainnya",
];

const iconOptions = [
  "TrendingUp",
  "Users",
  "Globe",
  "Leaf",
  "Heart",
  "Lightbulb",
  "Star",
  "Zap",
];

export default function FunFactsManagerPage() {
  const [supabase] = useState(() => createClient());
  const [facts, setFacts] = useState<FunFact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<FunFact | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [form, setForm] = useState({
    headline: "",
    summary: "",
    detail: "",
    source: "",
    source_url: "",
    category: "Lainnya",
    icon: "Star",
    sort_order: 0,
    is_published: false,
  });
  const [formError, setFormError] = useState("");

  async function fetchFacts() {
    setLoading(true);
    const { data } = await supabase
      .from("fun_facts")
      .select("*")
      .order("sort_order", { ascending: true });
    setFacts((data as FunFact[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const { data } = await supabase
        .from("fun_facts")
        .select("*")
        .order("sort_order", { ascending: true });
      if (!cancelled) {
        setFacts((data as FunFact[]) ?? []);
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  function resetForm() {
    setForm({
      headline: "",
      summary: "",
      detail: "",
      source: "",
      source_url: "",
      category: "Lainnya",
      icon: "Star",
      sort_order: facts.length,
      is_published: false,
    });
    setFormError("");
    setEditItem(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    if (!form.headline.trim() || !form.summary.trim()) {
      setFormError("Headline dan summary wajib diisi.");
      return;
    }

    const payload = {
      headline: form.headline.trim(),
      summary: form.summary.trim(),
      detail: form.detail.trim(),
      source: form.source.trim(),
      source_url: form.source_url.trim(),
      category: form.category,
      icon: form.icon,
      sort_order: form.sort_order,
      is_published: form.is_published,
    };

    if (editItem) {
      const { error } = await supabase
        .from("fun_facts")
        .update(payload)
        .eq("id", editItem.id);
      if (error) {
        setFormError(error.message);
        return;
      }
    } else {
      const { error } = await supabase.from("fun_facts").insert(payload);
      if (error) {
        setFormError(error.message);
        return;
      }
    }
    setShowForm(false);
    resetForm();
    fetchFacts();
  }

  async function handleDelete(id: string) {
    setDeleting(true);
    await supabase.from("fun_facts").delete().eq("id", id);
    setFacts(facts.filter((f) => f.id !== id));
    setDeleteConfirm(null);
    setDeleting(false);
  }

  async function togglePublish(item: FunFact) {
    await supabase
      .from("fun_facts")
      .update({ is_published: !item.is_published })
      .eq("id", item.id);
    setFacts(
      facts.map((f) =>
        f.id === item.id ? { ...f, is_published: !f.is_published } : f
      )
    );
  }

  async function moveOrder(item: FunFact, direction: "up" | "down") {
    const currentIndex = facts.findIndex((f) => f.id === item.id);
    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= facts.length) return;

    const target = facts[targetIndex];
    const newFacts = [...facts];
    newFacts[currentIndex] = target;
    newFacts[targetIndex] = item;
    setFacts(newFacts);

    await Promise.all([
      supabase
        .from("fun_facts")
        .update({ sort_order: targetIndex })
        .eq("id", item.id),
      supabase
        .from("fun_facts")
        .update({ sort_order: currentIndex })
        .eq("id", target.id),
    ]);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Fun Facts Manager
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Kelola fakta menarik tentang Indonesia
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah Fun Fact
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 text-red-500 animate-spin" />
            </div>
          ) : facts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Sparkles className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-3" />
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Belum ada fun facts
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {facts.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <button
                        onClick={() => moveOrder(item, "up")}
                        disabled={index === 0}
                        className="text-slate-300 dark:text-slate-600 hover:text-slate-500 disabled:opacity-30 transition-colors"
                      >
                        <GripVertical className="w-4 h-4 rotate-180" />
                      </button>
                      <button
                        onClick={() => moveOrder(item, "down")}
                        disabled={index === facts.length - 1}
                        className="text-slate-300 dark:text-slate-600 hover:text-slate-500 disabled:opacity-30 transition-colors"
                      >
                        <GripVertical className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-400 rounded-full">
                          {item.category}
                        </span>
                        <button
                          onClick={() => togglePublish(item)}
                          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors ${
                            item.is_published
                              ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                          }`}
                        >
                          {item.is_published ? (
                            <Eye className="w-2.5 h-2.5" />
                          ) : (
                            <EyeOff className="w-2.5 h-2.5" />
                          )}
                          {item.is_published ? "Published" : "Draft"}
                        </button>
                      </div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {item.headline}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-1">
                        {item.summary}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditItem(item);
                          setForm({
                            headline: item.headline,
                            summary: item.summary,
                            detail: item.detail,
                            source: item.source,
                            source_url: item.source_url,
                            category: item.category,
                            icon: item.icon,
                            sort_order: item.sort_order,
                            is_published: item.is_published,
                          });
                          setShowForm(true);
                        }}
                        className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(item.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {deleteConfirm === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-between"
                      >
                        <p className="text-xs text-red-600 dark:text-red-400">
                          Hapus fun fact ini?
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-3 py-1 text-xs text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 rounded-md transition-colors"
                          >
                            Batal
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            disabled={deleting}
                            className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors flex items-center gap-1"
                          >
                            {deleting && (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            )}
                            Hapus
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </FadeIn>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 pt-[5vh] overflow-y-auto"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {editItem ? "Edit Fun Fact" : "Tambah Fun Fact"}
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-600 dark:text-red-400">
                      {formError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Headline <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.headline}
                      onChange={(e) =>
                        setForm({ ...form, headline: e.target.value })
                      }
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
                      placeholder="Judul fakta menarik"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Summary <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={form.summary}
                      onChange={(e) =>
                        setForm({ ...form, summary: e.target.value })
                      }
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors resize-none"
                      placeholder="Ringkasan singkat"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Detail
                    </label>
                    <textarea
                      rows={4}
                      value={form.detail}
                      onChange={(e) =>
                        setForm({ ...form, detail: e.target.value })
                      }
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors resize-y"
                      placeholder="Penjelasan lengkap (opsional)"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Kategori
                      </label>
                      <select
                        value={form.category}
                        onChange={(e) =>
                          setForm({ ...form, category: e.target.value })
                        }
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Icon
                      </label>
                      <select
                        value={form.icon}
                        onChange={(e) =>
                          setForm({ ...form, icon: e.target.value })
                        }
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
                      >
                        {iconOptions.map((icon) => (
                          <option key={icon} value={icon}>
                            {icon}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Sumber
                      </label>
                      <input
                        type="text"
                        value={form.source}
                        onChange={(e) =>
                          setForm({ ...form, source: e.target.value })
                        }
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
                        placeholder="BPS, dll"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        URL Sumber
                      </label>
                      <input
                        type="url"
                        value={form.source_url}
                        onChange={(e) =>
                          setForm({ ...form, source_url: e.target.value })
                        }
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setForm({ ...form, is_published: !form.is_published })
                      }
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        form.is_published
                          ? "bg-red-500"
                          : "bg-slate-300 dark:bg-slate-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                          form.is_published
                            ? "translate-x-[18px]"
                            : "translate-x-[3px]"
                        }`}
                      />
                    </button>
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {form.is_published ? "Published" : "Draft"}
                    </label>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      {editItem ? "Simpan Perubahan" : "Tambah Fun Fact"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
