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
  File,
  ArrowRight,
  Check,
  AlertTriangle,
  Database,
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

interface ParsedTable {
  title: string;
  headers: string[];
  rows: string[][];
  suggestedDatasetName?: string;
  suggestedUnit?: string;
  suggestedSource?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const docCategories = ["Laporan", "Statistik", "Penelitian", "Regulasi", "Lainnya"];

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

type ViewMode = "documents" | "import";

export default function DocumentsManagerPage() {
  const [supabase] = useState(() => createClient());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("documents");

  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formCategory, setFormCategory] = useState("Lainnya");
  const [formSource, setFormSource] = useState("");
  const [formSourceUrl, setFormSourceUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formError, setFormError] = useState("");

  const [apiKey, setApiKey] = useState("");
  const [sheetsUrl, setSheetsUrl] = useState("");
  const [parsing, setParsing] = useState(false);
  const [parseError, setParseError] = useState("");
  const [parsedTables, setParsedTables] = useState<ParsedTable[]>([]);
  const [parseInfo, setParseInfo] = useState<{ fileName: string; pageCount: number; chars: number } | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ success: boolean; datasetName: string; dataPointsInserted: number } | null>(null);

  const [tableConfigs, setTableConfigs] = useState<
    Record<
      number,
      {
        datasetName: string;
        datasetSlug: string;
        categoryId: string;
        source: string;
        sourceUrl: string;
        unit: string;
        description: string;
        periodCol: number;
        valueCols: number[];
        import: boolean;
      }
    >
  >({});

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const [docsRes, catRes] = await Promise.all([
        supabase.from("documents").select("*").order("created_at", { ascending: false }),
        supabase.from("categories").select("id, name, slug").order("sort_order"),
      ]);
      if (!cancelled) {
        setDocuments((docsRes.data as Document[]) ?? []);
        setCategories((catRes.data as Category[]) ?? []);
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [supabase]);

  async function fetchDocuments() {
    const { data } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false });
    setDocuments((data as Document[]) ?? []);
  }

  async function handleUploadDocument(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFile) { setFormError("Pilih file terlebih dahulu."); return; }
    setUploading(true);
    const filePath = `${Date.now()}-${selectedFile.name}`;
    const { error: uploadError } = await supabase.storage.from("documents").upload(filePath, selectedFile);
    if (uploadError) { setFormError(uploadError.message); setUploading(false); return; }
    const { error: dbError } = await supabase.from("documents").insert({
      title: formTitle.trim(), description: formDescription.trim(),
      category: formCategory, source: formSource.trim(), source_url: formSourceUrl.trim(),
      file_name: selectedFile.name, file_size: selectedFile.size, file_path: filePath,
    });
    if (dbError) { setFormError(dbError.message); }
    else { setShowUploadForm(false); resetForm(); fetchDocuments(); }
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
    const { data } = supabase.storage.from("documents").getPublicUrl(doc.file_path);
    return data.publicUrl;
  }

  function resetForm() {
    setFormTitle(""); setFormDescription(""); setFormCategory("Lainnya");
    setFormSource(""); setFormSourceUrl(""); setSelectedFile(null); setFormError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleParseFile(file: File) {
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (["csv", "tsv", "txt", "xlsx", "xls", "xlsm", "xlsb", "pdf"].indexOf(ext) === -1) {
      setParseError(`Format .${ext} belum didukung. Gunakan: PDF, CSV, TSV, XLSX, XLS`);
      return;
    }
    if (ext === "pdf" && !apiKey) {
      setParseError("Masukkan API key MiMo untuk parse PDF.");
      return;
    }
    setParsing(true); setParseError(""); setParsedTables([]); setImportResult(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("apiKey", apiKey);
      const res = await fetch("/api/parse-file", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) { setParseError(data.error || "Gagal parse file"); return; }
      setParsedTables(data.tables || []);
      setParseInfo({ fileName: data.fileName, pageCount: data.pageCount, chars: data.extractedChars });
      const configs: typeof tableConfigs = {};
      (data.tables as ParsedTable[]).forEach((t, i) => {
        const periodIdx = t.headers.findIndex((h) =>
          /periode|tahun|bulan|period|date|year|month|waktu/i.test(h)
        );
        const valueIdxs = t.headers
          .map((h, idx) => (idx !== periodIdx && /[0-9]/.test(h) ? idx : -1))
          .filter((i) => i >= 0);
        configs[i] = {
          datasetName: t.suggestedDatasetName || t.title || `Dataset ${i + 1}`,
          datasetSlug: "",
          categoryId: categories[0]?.id || "",
          source: t.suggestedSource || "",
          sourceUrl: "",
          unit: t.suggestedUnit || "",
          description: `Data dari ${file.name} - ${t.title}`,
          periodCol: periodIdx >= 0 ? periodIdx : 0,
          valueCols: valueIdxs.length > 0 ? valueIdxs : t.headers.slice(1).map((_, idx) => idx + 1),
          import: true,
        };
      });
      setTableConfigs(configs);
    } catch (err) {
      setParseError(err instanceof Error ? err.message : "Gagal parse PDF");
    }
    setParsing(false);
  }

  async function handleParseGoogleSheets() {
    if (!sheetsUrl.trim()) { setParseError("Masukkan URL Google Sheets"); return; }
    setParsing(true); setParseError(""); setParsedTables([]); setImportResult(null);
    try {
      const res = await fetch("/api/parse-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: sheetsUrl, apiKey }),
      });
      const data = await res.json();
      if (!res.ok) { setParseError(data.error || "Gagal parse Google Sheets"); return; }
      setParsedTables(data.tables || []);
      setParseInfo({ fileName: "Google Sheets", pageCount: 1, chars: data.extractedChars });
      const configs: typeof tableConfigs = {};
      (data.tables as ParsedTable[]).forEach((t, i) => {
        const periodIdx = t.headers.findIndex((h) =>
          /periode|tahun|bulan|period|date|year|month|waktu/i.test(h)
        );
        const valueIdxs = t.headers
          .map((h, idx) => (idx !== periodIdx && /[0-9]/.test(h) ? idx : -1))
          .filter((idx) => idx >= 0);
        configs[i] = {
          datasetName: t.suggestedDatasetName || t.title || `Dataset ${i + 1}`,
          datasetSlug: "",
          categoryId: categories[0]?.id || "",
          source: t.suggestedSource || "Google Sheets",
          sourceUrl: sheetsUrl,
          unit: t.suggestedUnit || "",
          description: `Data dari Google Sheets - ${t.title}`,
          periodCol: periodIdx >= 0 ? periodIdx : 0,
          valueCols: valueIdxs.length > 0 ? valueIdxs : t.headers.slice(1).map((_, idx) => idx + 1),
          import: true,
        };
      });
      setTableConfigs(configs);
    } catch (err) {
      setParseError(err instanceof Error ? err.message : "Gagal parse Google Sheets");
    }
    setParsing(false);
  }

  async function handleImportAll() {
    setImporting(true); setImportResult(null);
    let totalInserted = 0;
    const importedNames: string[] = [];
    for (const [idx, config] of Object.entries(tableConfigs)) {
      if (!config.import) continue;
      const table = parsedTables[parseInt(idx)];
      if (!table) continue;
      try {
        const res = await fetch("/api/import-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            datasetName: config.datasetName,
            datasetSlug: config.datasetSlug,
            categoryId: config.categoryId,
            source: config.source,
            sourceUrl: config.sourceUrl,
            unit: config.unit,
            description: config.description,
            headers: table.headers,
            rows: table.rows,
            periodColumnIndex: config.periodCol,
            valueColumnIndices: config.valueCols,
            valueColumnNames: config.valueCols.map((vi) => table.headers[vi] || ""),
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          totalInserted += data.dataPointsInserted;
          importedNames.push(data.datasetName);
        }
      } catch {
        // skip failed
      }
    }
    setImportResult({ success: true, datasetName: importedNames.join(", "), dataPointsInserted: totalInserted });
    setImporting(false);
  }

  const filtered = documents.filter(
    (doc) => !search || doc.title.toLowerCase().includes(search.toLowerCase()) || doc.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Document & Data Manager
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Upload PDF, ekstrak data, dan import ke database
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === "documents" ? "import" : "documents")}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                viewMode === "import"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              Import Data
            </button>
            <button
              onClick={() => { setShowUploadForm(true); setViewMode("documents"); }}
              className="px-3 py-2 text-xs font-medium bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              Upload Dokumen
            </button>
          </div>
        </div>
      </FadeIn>

      {viewMode === "import" && (
        <FadeIn>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Import Data</h2>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Upload file atau tempel URL Google Sheets &rarr; parse &rarr; import ke database
                </p>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-3">
              <p className="text-[11px] text-blue-700 dark:text-blue-300 leading-relaxed">
                <strong>Format didukung:</strong> PDF, CSV, TSV, XLSX, XLS, Google Sheets URL
              </p>
              <p className="text-[11px] text-blue-700 dark:text-blue-300 leading-relaxed mt-1">
                <strong>Langkah:</strong> 1) Upload file / tempel URL &rarr; 2) Review tabel &rarr; 3) Mapping kolom &rarr; 4) Import
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                MiMo API Key <span className="text-slate-400">(wajib untuk PDF)</span>
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="API key MiMo (hanya perlu untuk PDF)"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Upload File
                </label>
                <input
                  type="file"
                  accept=".pdf,.csv,.tsv,.txt,.xlsx,.xls,.xlsm,.xlsb"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleParseFile(file);
                  }}
                  disabled={parsing}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-blue-500 file:text-white file:cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Atau URL Google Sheets
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="url"
                    value={sheetsUrl}
                    onChange={(e) => setSheetsUrl(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                  />
                  <button
                    onClick={handleParseGoogleSheets}
                    disabled={parsing || !sheetsUrl.trim()}
                    className="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 text-white text-xs font-medium rounded-lg transition-colors flex-shrink-0"
                  >
                    {parsing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {parsing && (
              <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                <span className="text-xs text-blue-700 dark:text-blue-300">Memproses file dan mengekstrak tabel data...</span>
              </div>
            )}

            {parseError && (
              <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/30 rounded-xl">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-red-700 dark:text-red-300">{parseError}</span>
              </div>
            )}

            {parseInfo && (
              <div className="flex flex-wrap gap-3 text-[10px] text-slate-500">
                <span>File: {parseInfo.fileName}</span>
                <span>Halaman: {parseInfo.pageCount}</span>
                <span>Karakter: {parseInfo.chars.toLocaleString()}</span>
                <span>Tabel ditemukan: {parsedTables.length}</span>
              </div>
            )}

            {parsedTables.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    {parsedTables.length} Tabel Ditemukan
                  </h3>
                  <button
                    onClick={handleImportAll}
                    disabled={importing}
                    className="px-4 py-2 text-xs font-medium bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 text-white rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    {importing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    Import Semua yang Dipilih
                  </button>
                </div>

                {importResult && (
                  <div className="flex items-start gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                        Import berhasil! {importResult.dataPointsInserted} data points dimasukkan ke: {importResult.datasetName}
                      </p>
                    </div>
                  </div>
                )}

                {parsedTables.map((table, i) => {
                  const config = tableConfigs[i];
                  if (!config) return null;
                  return (
                    <div
                      key={i}
                      className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-3 border border-slate-200 dark:border-slate-700"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={config.import}
                            onChange={(e) =>
                              setTableConfigs((prev) => ({
                                ...prev,
                                [i]: { ...prev[i], import: e.target.checked },
                              }))
                            }
                            className="rounded border-slate-300"
                          />
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            Tabel {i + 1}: {table.title}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {table.rows.length} baris &middot; {table.headers.length} kolom
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div>
                          <label className="block text-[10px] font-medium text-slate-500 mb-1">Nama Dataset</label>
                          <input
                            value={config.datasetName}
                            onChange={(e) => setTableConfigs((prev) => ({ ...prev, [i]: { ...prev[i], datasetName: e.target.value } }))}
                            className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-medium text-slate-500 mb-1">Kategori</label>
                          <select
                            value={config.categoryId}
                            onChange={(e) => setTableConfigs((prev) => ({ ...prev, [i]: { ...prev[i], categoryId: e.target.value } }))}
                            className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            {categories.map((c) => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-medium text-slate-500 mb-1">Sumber</label>
                          <input
                            value={config.source}
                            onChange={(e) => setTableConfigs((prev) => ({ ...prev, [i]: { ...prev[i], source: e.target.value } }))}
                            className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-medium text-slate-500 mb-1">Satuan</label>
                          <input
                            value={config.unit}
                            onChange={(e) => setTableConfigs((prev) => ({ ...prev, [i]: { ...prev[i], unit: e.target.value } }))}
                            className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-medium text-slate-500 mb-1">Kolom Periode</label>
                          <select
                            value={config.periodCol}
                            onChange={(e) => setTableConfigs((prev) => ({ ...prev, [i]: { ...prev[i], periodCol: parseInt(e.target.value) } }))}
                            className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            {table.headers.map((h, hi) => (
                              <option key={hi} value={hi}>{h}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-medium text-slate-500 mb-1">Kolom Value (multi)</label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {table.headers.map((h, hi) => (
                              <button
                                key={hi}
                                onClick={() => {
                                  setTableConfigs((prev) => {
                                    const current = prev[i].valueCols;
                                    const next = current.includes(hi) ? current.filter((c) => c !== hi) : [...current, hi];
                                    return { ...prev, [i]: { ...prev[i], valueCols: next } };
                                  });
                                }}
                                className={`px-2 py-0.5 text-[10px] rounded-lg border transition-colors ${
                                  config.valueCols.includes(hi)
                                    ? "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300"
                                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500"
                                }`}
                              >
                                {h}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-[10px]">
                          <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                              {table.headers.map((h, hi) => (
                                <th
                                  key={hi}
                                  className={`px-2 py-1 text-left font-semibold ${
                                    hi === config.periodCol
                                      ? "text-emerald-600 dark:text-emerald-400"
                                      : config.valueCols.includes(hi)
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "text-slate-500"
                                  }`}
                                >
                                  {h}
                                  {hi === config.periodCol && " (Periode)"}
                                  {config.valueCols.includes(hi) && " (Value)"}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {table.rows.slice(0, 5).map((row, ri) => (
                              <tr key={ri} className="border-t border-slate-200 dark:border-slate-700">
                                {row.map((cell, ci) => (
                                  <td key={ci} className="px-2 py-1 text-slate-600 dark:text-slate-400">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {table.rows.length > 5 && (
                          <p className="text-[10px] text-slate-400 mt-1 text-center">
                            ...dan {table.rows.length - 5} baris lagi
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </FadeIn>
      )}

      {viewMode === "documents" && (
        <>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari dokumen..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 text-red-500 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-sm text-slate-400">Belum ada dokumen</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                        <File className="w-4 h-4 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{doc.title}</p>
                        <p className="text-[10px] text-slate-400">{doc.category}</p>
                      </div>
                    </div>
                  </div>
                  {doc.description && (
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">{doc.description}</p>
                  )}
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-3">
                    <span>{formatFileSize(doc.file_size)}</span>
                    <span>&middot;</span>
                    <span>{doc.file_name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={getPreviewUrl(doc)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" /> Lihat
                    </a>
                    <button
                      onClick={() => setDeleteConfirm(doc.id)}
                      className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" /> Hapus
                    </button>
                  </div>

                  <AnimatePresence>
                    {deleteConfirm === doc.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl"
                      >
                        <p className="text-[10px] text-red-600 dark:text-red-400 mb-2">Hapus dokumen ini?</p>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleDelete(doc)}
                            disabled={deleting}
                            className="px-2 py-1 text-[10px] font-medium bg-red-500 text-white rounded-lg"
                          >
                            {deleting ? "..." : "Ya, Hapus"}
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-2 py-1 text-[10px] font-medium bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg"
                          >
                            Batal
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <AnimatePresence>
        {showUploadForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => { setShowUploadForm(false); resetForm(); }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-50 p-5 sm:p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Upload Dokumen</h2>
                <button onClick={() => { setShowUploadForm(false); resetForm(); }} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {formError && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-xs text-red-600 dark:text-red-400">{formError}</div>
              )}

              <form onSubmit={handleUploadDocument} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Judul *</label>
                  <input type="text" required value={formTitle} onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    placeholder="Contoh: Laporan Inflasi BPS 2024" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Deskripsi</label>
                  <textarea value={formDescription} onChange={(e) => setFormDescription(e.target.value)} rows={2}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    placeholder="Deskripsi singkat dokumen" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Kategori</label>
                    <select value={formCategory} onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50">
                      {docCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Sumber</label>
                    <input type="text" value={formSource} onChange={(e) => setFormSource(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                      placeholder="BPS, BI, dll" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">File *</label>
                  <input type="file" required accept=".pdf,.csv,.tsv,.txt,.xlsx,.xls,.xlsm,.xlsb" ref={fileInputRef}
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-red-500 file:text-white file:cursor-pointer" />
                </div>
                <button type="submit" disabled={uploading}
                  className="w-full py-2.5 bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                  {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Upload
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
