"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createClient } from "@/lib/supabase/client";
import { FadeIn } from "@/components/ui/motion";
import {
  Plus,
  Loader2,
  ChevronDown,
  ChevronRight,
  Edit2,
  Trash2,
  Database,
  X,
  Eye,
  EyeOff,
  Folder,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

interface Dataset {
  id: string;
  name: string;
  category_id: string;
  source: string;
  source_url: string;
  data_points: unknown[];
  is_published: boolean;
  created_at: string;
}

export default function DataManagerPage() {
  const [supabase] = useState(() => createClient());
  const [categories, setCategories] = useState<Category[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [showCatForm, setShowCatForm] = useState(false);
  const [showDsForm, setShowDsForm] = useState(false);
  const [editCat, setEditCat] = useState<Category | null>(null);
  const [editDs, setEditDs] = useState<Dataset | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: "category" | "dataset";
    id: string;
  } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catError, setCatError] = useState("");

  const [dsName, setDsName] = useState("");
  const [dsCategoryId, setDsCategoryId] = useState("");
  const [dsSource, setDsSource] = useState("");
  const [dsSourceUrl, setDsSourceUrl] = useState("");
  const [dsPublished, setDsPublished] = useState(false);
  const [dsError, setDsError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [catRes, dsRes] = await Promise.all([
        supabase.from("categories").select("*").order("name"),
        supabase.from("datasets").select("*").order("name"),
      ]);
      if (!cancelled) {
        setCategories((catRes.data as Category[]) ?? []);
        setDatasets((dsRes.data as Dataset[]) ?? []);
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  function generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  async function refreshData() {
    const [catRes, dsRes] = await Promise.all([
      supabase.from("categories").select("*").order("name"),
      supabase.from("datasets").select("*").order("name"),
    ]);
    setCategories((catRes.data as Category[]) ?? []);
    setDatasets((dsRes.data as Dataset[]) ?? []);
  }

  function resetCatForm() {
    setCatName("");
    setCatSlug("");
    setCatError("");
    setEditCat(null);
  }

  function resetDsForm() {
    setDsName("");
    setDsCategoryId(categories[0]?.id ?? "");
    setDsSource("");
    setDsSourceUrl("");
    setDsPublished(false);
    setDsError("");
    setEditDs(null);
  }

  async function handleCatSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCatError("");
    if (!catName.trim()) {
      setCatError("Nama kategori wajib diisi.");
      return;
    }
    const slug = catSlug || generateSlug(catName);

    if (editCat) {
      const { error } = await supabase
        .from("categories")
        .update({ name: catName.trim(), slug })
        .eq("id", editCat.id);
      if (error) {
        setCatError(error.message);
        return;
      }
    } else {
      const { error } = await supabase
        .from("categories")
        .insert({ name: catName.trim(), slug });
      if (error) {
        setCatError(error.message);
        return;
      }
    }
    setShowCatForm(false);
    resetCatForm();
    refreshData();
  }

  async function handleDsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDsError("");
    if (!dsName.trim()) {
      setDsError("Nama dataset wajib diisi.");
      return;
    }

    const payload = {
      name: dsName.trim(),
      category_id: dsCategoryId,
      source: dsSource.trim(),
      source_url: dsSourceUrl.trim(),
      is_published: dsPublished,
    };

    if (editDs) {
      const { error } = await supabase
        .from("datasets")
        .update(payload)
        .eq("id", editDs.id);
      if (error) {
        setDsError(error.message);
        return;
      }
    } else {
      const { error } = await supabase.from("datasets").insert(payload);
      if (error) {
        setDsError(error.message);
        return;
      }
    }
    setShowDsForm(false);
    resetDsForm();
    refreshData();
  }

  async function handleDelete(type: "category" | "dataset", id: string) {
    setDeleting(true);
    if (type === "category") {
      await supabase.from("datasets").delete().eq("category_id", id);
      await supabase.from("categories").delete().eq("id", id);
    } else {
      await supabase.from("datasets").delete().eq("id", id);
    }
    setDeleteConfirm(null);
    setDeleting(false);
    refreshData();
  }

  async function toggleDsPublish(ds: Dataset) {
    await supabase
      .from("datasets")
      .update({ is_published: !ds.is_published })
      .eq("id", ds.id);
    setDatasets(
      datasets.map((d) =>
        d.id === ds.id ? { ...d, is_published: !d.is_published } : d
      )
    );
  }

  function getDatasetsForCategory(catId: string): Dataset[] {
    return datasets.filter((ds) => ds.category_id === catId);
  }

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Data Manager
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Kelola kategori dan dataset
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                resetCatForm();
                setShowCatForm(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors"
            >
              <Folder className="w-4 h-4" />
              Kategori
            </button>
            <button
              onClick={() => {
                resetDsForm();
                setDsCategoryId(categories[0]?.id ?? "");
                setShowDsForm(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Dataset
            </button>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="space-y-3">
          {categories.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center">
              <Folder className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Belum ada kategori
              </p>
            </div>
          ) : (
            categories.map((cat) => {
              const catDatasets = getDatasetsForCategory(cat.id);
              const isExpanded = expandedCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedCategory(isExpanded ? null : cat.id)
                    }
                    className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left"
                  >
                    <div className="w-8 h-8 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                      <Folder className="w-4 h-4 text-red-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {cat.name}
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">
                        {catDatasets.length} dataset{catDatasets.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditCat(cat);
                          setCatName(cat.name);
                          setCatSlug(cat.slug);
                          setShowCatForm(true);
                        }}
                        className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirm({ type: "category", id: cat.id });
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-slate-100 dark:border-slate-800 px-4 pb-4">
                          {catDatasets.length === 0 ? (
                            <p className="text-xs text-slate-400 py-4 text-center">
                              Belum ada dataset
                            </p>
                          ) : (
                            <div className="divide-y divide-slate-50 dark:divide-slate-800">
                              {catDatasets.map((ds) => (
                                <div
                                  key={ds.id}
                                  className="flex items-center gap-3 py-3"
                                >
                                  <Database className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                      {ds.name}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      {ds.source && (
                                        <span className="text-[10px] text-slate-400">
                                          {ds.source}
                                        </span>
                                      )}
                                      {Array.isArray(ds.data_points) && (
                                        <span className="text-[10px] text-slate-400">
                                          {ds.data_points.length} data points
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => toggleDsPublish(ds)}
                                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors ${
                                      ds.is_published
                                        ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                                    }`}
                                  >
                                    {ds.is_published ? (
                                      <Eye className="w-2.5 h-2.5" />
                                    ) : (
                                      <EyeOff className="w-2.5 h-2.5" />
                                    )}
                                    {ds.is_published ? "Published" : "Draft"}
                                  </button>
                                  <div className="flex gap-0.5">
                                    <button
                                      onClick={() => {
                                        setEditDs(ds);
                                        setDsName(ds.name);
                                        setDsCategoryId(ds.category_id);
                                        setDsSource(ds.source);
                                        setDsSourceUrl(ds.source_url);
                                        setDsPublished(ds.is_published);
                                        setShowDsForm(true);
                                      }}
                                      className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                                    >
                                      <Edit2 className="w-3 h-3" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        setDeleteConfirm({
                                          type: "dataset",
                                          id: ds.id,
                                        })
                                      }
                                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </FadeIn>

      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                Konfirmasi Hapus
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                {deleteConfirm.type === "category"
                  ? "Semua dataset dalam kategori ini juga akan dihapus. Lanjutkan?"
                  : "Dataset ini akan dihapus permanen. Lanjutkan?"}
              </p>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={() =>
                    handleDelete(deleteConfirm.type, deleteConfirm.id)
                  }
                  disabled={deleting}
                  className="px-3 py-1.5 text-xs bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-1"
                >
                  {deleting && <Loader2 className="w-3 h-3 animate-spin" />}
                  Hapus
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCatForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCatForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {editCat ? "Edit Kategori" : "Tambah Kategori"}
                </h2>
                <button
                  onClick={() => setShowCatForm(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleCatSubmit} className="space-y-4">
                {catError && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-600 dark:text-red-400">
                    {catError}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Nama Kategori <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
                    placeholder="Ekonomi"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={catSlug}
                    onChange={(e) => setCatSlug(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
                    placeholder="otomatis dari nama"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  {editCat ? "Simpan" : "Tambah"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDsForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowDsForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {editDs ? "Edit Dataset" : "Tambah Dataset"}
                </h2>
                <button
                  onClick={() => setShowDsForm(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleDsSubmit} className="space-y-4">
                {dsError && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-600 dark:text-red-400">
                    {dsError}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Nama Dataset <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={dsName}
                    onChange={(e) => setDsName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
                    placeholder="PDB Indonesia"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Kategori
                  </label>
                  <select
                    value={dsCategoryId}
                    onChange={(e) => setDsCategoryId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Sumber
                    </label>
                    <input
                      type="text"
                      value={dsSource}
                      onChange={(e) => setDsSource(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
                      placeholder="BPS"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      URL Sumber
                    </label>
                    <input
                      type="url"
                      value={dsSourceUrl}
                      onChange={(e) => setDsSourceUrl(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setDsPublished(!dsPublished)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      dsPublished
                        ? "bg-red-500"
                        : "bg-slate-300 dark:bg-slate-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        dsPublished
                          ? "translate-x-[18px]"
                          : "translate-x-[3px]"
                      }`}
                    />
                  </button>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {dsPublished ? "Published" : "Draft"}
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  {editDs ? "Simpan" : "Tambah"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
