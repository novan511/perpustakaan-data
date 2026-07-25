"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createClient } from "@/lib/supabase/client";
import { FadeIn } from "@/components/ui/motion";
import QAForm from "./form";
import {
  Plus,
  Search,
  Loader2,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  X,
  HelpCircle,
  ChevronDown,
  Sparkles,
} from "lucide-react";

interface QAItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  source: string;
  source_url: string;
  data_points: Array<{ label: string; value: string; source?: string }>;
  related_slugs: string[];
  is_published: boolean;
  slug: string;
  created_at: string;
}

interface Dataset {
  id: string;
  name: string;
  category_id: string;
  categories: { name: string }[] | { name: string };
}

const categories = [
  "Ekonomi",
  "Kesehatan",
  "Pendidikan",
  "Lingkungan",
  "Digital & Teknologi",
  "Sosial & Demografi",
];

export default function QAManagerPage() {
  const [supabase] = useState(() => createClient());
  const [items, setItems] = useState<QAItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<QAItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [showAIGenerate, setShowAIGenerate] = useState(false);
  const [aiDatasets, setAiDatasets] = useState<Dataset[]>([]);
  const [selectedDatasetIds, setSelectedDatasetIds] = useState<string[]>([]);
  const [aiApiKey, setAiApiKey] = useState("");
  const [aiModel, setAiModel] = useState("MiMo-7B-RL");
  const [aiModels, setAiModels] = useState<string[]>([]);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<string>("");
  const [aiPreview, setAiPreview] = useState<QAItem[]>([]);

  async function fetchItems() {
    setLoading(true);
    const { data } = await supabase
      .from("qa_items")
      .select("*")
      .order("created_at", { ascending: false });
    setItems((data as QAItem[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const { data } = await supabase
        .from("qa_items")
        .select("*")
        .order("created_at", { ascending: false });
      if (!cancelled) {
        setItems((data as QAItem[]) ?? []);
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  async function togglePublish(item: QAItem) {
    await supabase
      .from("qa_items")
      .update({ is_published: !item.is_published })
      .eq("id", item.id);
    setItems(
      items.map((i) =>
        i.id === item.id ? { ...i, is_published: !i.is_published } : i
      )
    );
  }

  async function handleDelete(id: string) {
    setDeleting(true);
    await supabase.from("qa_items").delete().eq("id", id);
    setItems(items.filter((i) => i.id !== id));
    setDeleteConfirm(null);
    setDeleting(false);
  }

  const filtered = items.filter((item) => {
    const matchSearch =
      !search ||
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      filterCategory === "all" || item.category === filterCategory;
    return matchSearch && matchCategory;
  });

  async function loadDatasets() {
    const { data } = await supabase
      .from("datasets")
      .select("id, name, category_id, categories(name)")
      .eq("is_published", true);
    setAiDatasets((data as Dataset[]) ?? []);
  }

  async function loadModels() {
    if (!aiApiKey) return;
    try {
      const res = await fetch("/api/ai/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: aiApiKey }),
      });
      const data = await res.json();
      if (data.models?.length) {
        setAiModels(data.models);
        if (!data.models.includes(aiModel)) {
          setAiModel(data.models[0]);
        }
      }
    } catch {}
  }

  async function handleAIGenerate() {
    if (!aiApiKey || selectedDatasetIds.length === 0) return;
    setAiGenerating(true);
    setAiResult("");
    setAiPreview([]);

    try {
      const res = await fetch("/api/ai/generate-qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          datasetIds: selectedDatasetIds,
          apiKey: aiApiKey,
          model: aiModel,
        }),
      });

      const data = await res.json();
      if (data.error) {
        setAiResult(`Error: ${data.error}`);
      } else {
        setAiPreview(data.items || []);
        setAiResult(`Berhasil generate ${(data.items || []).length} Q&A`);
      }
    } catch (err) {
      setAiResult(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
    setAiGenerating(false);
  }

  async function handleSaveAIGenerated() {
    for (const item of aiPreview) {
      const slug = item.question
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .slice(0, 80);
      await supabase.from("qa_items").insert({
        slug,
        question: item.question,
        answer: item.answer,
        category: item.category,
        source: item.source || "AI Generated",
        source_url: "",
        data_points: item.data_points || [],
        related_slugs: [],
        is_published: false,
      });
    }
    setAiPreview([]);
    setShowAIGenerate(false);
    fetchItems();
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Q&A Manager
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Kelola pertanyaan dan jawaban
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                loadDatasets();
                setShowAIGenerate(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Generate AI
            </button>
            <button
              onClick={() => {
                setEditItem(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Tambah Q&A
            </button>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari pertanyaan..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
            />
          </div>
          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="appearance-none w-full sm:w-48 px-4 py-2.5 pr-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
            >
              <option value="all">Semua Kategori</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 text-red-500 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <HelpCircle className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-3" />
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {search || filterCategory !== "all"
                  ? "Tidak ada hasil yang cocok"
                  : "Belum ada item Q&A"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
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
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                        {item.question}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 line-clamp-1">
                        {item.answer}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditItem(item);
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
                          Hapus item ini?
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
                    {editItem ? "Edit Q&A" : "Tambah Q&A Baru"}
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <QAForm
                  initialData={editItem ?? undefined}
                  onSuccess={() => {
                    setShowForm(false);
                    fetchItems();
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAIGenerate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 pt-[5vh] overflow-y-auto"
            onClick={() => setShowAIGenerate(false)}
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
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-violet-500" />
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      Generate Q&A dengan AI
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowAIGenerate(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      API Key <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        value={aiApiKey}
                        onChange={(e) => setAiApiKey(e.target.value)}
                        onBlur={loadModels}
                        className="flex-1 px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-colors"
                        placeholder="Masukkan API key AI kamu"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Model
                    </label>
                    {aiModels.length > 0 ? (
                      <select
                        value={aiModel}
                        onChange={(e) => setAiModel(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-colors"
                      >
                        {aiModels.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={aiModel}
                        onChange={(e) => setAiModel(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-colors"
                        placeholder="Nama model (contoh: MiMo-7B-RL)"
                      />
                    )}
                    <p className="text-[10px] text-slate-400 mt-1">Masukkan API key lalu klik ke luar field untuk load daftar model</p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Pilih Dataset <span className="text-red-500">*</span>
                    </label>
                    <p className="text-[10px] text-slate-400 mb-2">AI akan membaca data dari dataset yang dipilih untuk generate Q&A</p>
                    <div className="max-h-48 overflow-y-auto border border-slate-200 dark:border-slate-700 rounded-lg divide-y divide-slate-100 dark:divide-slate-800">
                      {aiDatasets.map((ds) => (
                        <label
                          key={ds.id}
                          className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedDatasetIds.includes(ds.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedDatasetIds([...selectedDatasetIds, ds.id]);
                              } else {
                                setSelectedDatasetIds(selectedDatasetIds.filter((id) => id !== ds.id));
                              }
                            }}
                            className="w-4 h-4 text-violet-500 rounded border-slate-300 focus:ring-violet-500"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-slate-900 dark:text-white truncate">{ds.name}</p>
                            <p className="text-[10px] text-slate-400">{Array.isArray(ds.categories) ? ds.categories[0]?.name : ds.categories?.name}</p>
                          </div>
                        </label>
                      ))}
                      {aiDatasets.length === 0 && (
                        <p className="p-4 text-xs text-slate-400 text-center">Belum ada dataset. Buat dataset dulu di halaman Data.</p>
                      )}
                    </div>
                  </div>

                  {aiResult && (
                    <div className={`p-3 rounded-lg text-xs ${aiResult.startsWith("Error") ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400" : "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"}`}>
                      {aiResult}
                    </div>
                  )}

                  {aiPreview.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-xs font-medium text-slate-700 dark:text-slate-300">Preview ({aiPreview.length} Q&A generated):</p>
                      <div className="max-h-64 overflow-y-auto space-y-2">
                        {aiPreview.map((item, i) => (
                          <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <p className="text-xs font-semibold text-slate-900 dark:text-white">{item.question}</p>
                            <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{item.answer}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <span className="text-[10px] bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 px-1.5 py-0.5 rounded">{item.category}</span>
                              <span className="text-[10px] text-slate-400">{item.source}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={handleSaveAIGenerated}
                        className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        Simpan Semua ke Database
                      </button>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowAIGenerate(false)}
                      className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleAIGenerate}
                      disabled={aiGenerating || !aiApiKey || selectedDatasetIds.length === 0}
                      className="flex-1 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      {aiGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Generate dengan AI
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
