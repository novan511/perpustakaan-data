"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createClient } from "@/lib/supabase/client";
import { FadeIn } from "@/components/ui/motion";
import {
  Upload,
  FileText,
  Trash2,
  ExternalLink,
  Loader2,
  X,
  Search,
  ChevronDown,
  File,
} from "lucide-react";

interface Document {
  id: string;
  title: string;
  description: string;
  category: string;
  source: string;
  source_url: string;
  file_name: string;
  file_size: number;
  file_path: string;
  created_at: string;
}

const categories = [
  "Laporan",
  "Statistik",
  "Penelitian",
  "Regulasi",
  "Lainnya",
];

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export default function DocumentsManagerPage() {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formCategory, setFormCategory] = useState("Lainnya");
  const [formSource, setFormSource] = useState("");
  const [formSourceUrl, setFormSourceUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formError, setFormError] = useState("");

  async function fetchDocuments() {
    setLoading(true);
    const { data } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false });
    setDocuments((data as Document[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const { data } = await supabase
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false });
      if (!cancelled) {
        setDocuments((data as Document[]) ?? []);
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    if (!selectedFile) {
      setFormError("Pilih file terlebih dahulu.");
      return;
    }

    setUploading(true);
    const filePath = `${Date.now()}-${selectedFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(filePath, selectedFile);

    if (uploadError) {
      setFormError(uploadError.message);
      setUploading(false);
      return;
    }

    const { error: dbError } = await supabase.from("documents").insert({
      title: formTitle.trim(),
      description: formDescription.trim(),
      category: formCategory,
      source: formSource.trim(),
      source_url: formSourceUrl.trim(),
      file_name: selectedFile.name,
      file_size: selectedFile.size,
      file_path: filePath,
    });

    if (dbError) {
      setFormError(dbError.message);
    } else {
      setShowForm(false);
      resetForm();
      fetchDocuments();
    }
    setUploading(false);
  }

  async function handleDelete(doc: Document) {
    setDeleting(true);
    await supabase.storage.from("documents").remove([doc.file_path]);
    await supabase.from("documents").delete().eq("id", doc.id);
    setDocuments(documents.filter((d) => d.id !== doc.id));
    setDeleteConfirm(null);
    setDeleting(false);
  }

  function getPreviewUrl(doc: Document): string {
    const { data } = supabase.storage
      .from("documents")
      .getPublicUrl(doc.file_path);
    return data.publicUrl;
  }

  function resetForm() {
    setFormTitle("");
    setFormDescription("");
    setFormCategory("Lainnya");
    setFormSource("");
    setFormSourceUrl("");
    setSelectedFile(null);
    setFormError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const filtered = documents.filter(
    (doc) =>
      !search ||
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Document Manager
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Kelola dokumen yang diunggah
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Upload className="w-4 h-4" />
            Upload Dokumen
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari dokumen..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
          />
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
              <File className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-3" />
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {search ? "Tidak ada dokumen yang cocok" : "Belum ada dokumen"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-400 rounded-full">
                          {doc.category}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {doc.title}
                      </p>
                      {doc.description && (
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-1">
                          {doc.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-400 dark:text-slate-500">
                        <span>{formatFileSize(doc.file_size)}</span>
                        <span>{doc.file_name}</span>
                        {doc.source && <span>Sumber: {doc.source}</span>}
                        <span>
                          {new Date(doc.created_at).toLocaleDateString("id-ID")}
                        </span>
                      </div>
                      {doc.source_url && (
                        <a
                          href={doc.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] text-blue-500 hover:text-blue-600 mt-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Lihat sumber data asli
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <a
                        href={getPreviewUrl(doc)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => setDeleteConfirm(doc.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <AnimatePresence>
                    {deleteConfirm === doc.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-between"
                      >
                        <p className="text-xs text-red-600 dark:text-red-400">
                          Hapus dokumen ini dan file terkait?
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-3 py-1 text-xs text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 rounded-md transition-colors"
                          >
                            Batal
                          </button>
                          <button
                            onClick={() => handleDelete(doc)}
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
                </div>
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
              className="w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Upload Dokumen
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleUpload} className="space-y-4">
                  {formError && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-600 dark:text-red-400">
                      {formError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      File <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      required
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx,.txt"
                      onChange={(e) =>
                        setSelectedFile(e.target.files?.[0] ?? null)
                      }
                      className="w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-500 hover:file:bg-red-100 dark:file:bg-red-900/20 dark:file:text-red-400 dark:hover:file:bg-red-900/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Judul <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
                      placeholder="Judul dokumen"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Deskripsi
                    </label>
                    <textarea
                      rows={2}
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors resize-none"
                      placeholder="Deskripsi singkat"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Kategori
                      </label>
                      <div className="relative">
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value)}
                          className="appearance-none w-full px-3 py-2.5 pr-8 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Sumber
                      </label>
                      <input
                        type="text"
                        value={formSource}
                        onChange={(e) => setFormSource(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
                        placeholder="BPS, BI, dll"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Link Sumber Data
                    </label>
                    <input
                      type="url"
                      value={formSourceUrl}
                      onChange={(e) => setFormSourceUrl(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
                      placeholder="https://www.bps.go.id/..."
                    />
                    <p className="text-[10px] text-slate-400 mt-1">URL ke sumber data asli untuk diakses langsung</p>
                  </div>

                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full py-2.5 bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
                    Upload
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
