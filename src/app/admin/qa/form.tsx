"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Plus, X } from "lucide-react";

interface DataPoint {
  label: string;
  value: string;
  source?: string;
}

interface QAFormData {
  id?: string;
  question: string;
  answer: string;
  category: string;
  source: string;
  source_url: string;
  data_points: DataPoint[];
  related_slugs: string[];
  is_published: boolean;
}

const categories = [
  "Ekonomi",
  "Kesehatan",
  "Pendidikan",
  "Lingkungan",
  "Digital & Teknologi",
  "Sosial & Demografi",
];

function generateSlug(question: string): string {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export default function QAForm({
  initialData,
  onSuccess,
}: {
  initialData?: QAFormData;
  onSuccess: () => void;
}) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<QAFormData>({
    question: initialData?.question ?? "",
    answer: initialData?.answer ?? "",
    category: initialData?.category ?? categories[0],
    source: initialData?.source ?? "",
    source_url: initialData?.source_url ?? "",
    data_points: initialData?.data_points ?? [{ label: "", value: "" }],
    related_slugs: initialData?.related_slugs ?? [],
    is_published: initialData?.is_published ?? false,
  });

  function addDataPoint() {
    setForm({
      ...form,
      data_points: [...form.data_points, { label: "", value: "" }],
    });
  }

  function removeDataPoint(index: number) {
    setForm({
      ...form,
      data_points: form.data_points.filter((_, i) => i !== index),
    });
  }

  function updateDataPoint(
    index: number,
    field: keyof DataPoint,
    value: string
  ) {
    const updated = [...form.data_points];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, data_points: updated });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.question.trim() || !form.answer.trim()) {
      setError("Pertanyaan dan jawaban wajib diisi.");
      return;
    }

    setLoading(true);
    const slug = initialData?.id
      ? initialData.question
        ? generateSlug(form.question)
        : ""
      : generateSlug(form.question);

    const payload = {
      question: form.question.trim(),
      answer: form.answer.trim(),
      category: form.category,
      source: form.source.trim(),
      source_url: form.source_url.trim(),
      data_points: form.data_points.filter(
        (dp) => dp.label.trim() && dp.value.trim()
      ),
      related_slugs: form.related_slugs,
      is_published: form.is_published,
      slug,
    };

    if (initialData?.id) {
      const { error: err } = await supabase
        .from("qa_items")
        .update(payload)
        .eq("id", initialData.id);
      if (err) {
        setError(err.message);
        setLoading(false);
        return;
      }
    } else {
      const { error: err } = await supabase.from("qa_items").insert(payload);
      if (err) {
        setError(err.message);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-600 dark:text-red-400"
        >
          {error}
        </motion.div>
      )}

      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          Pertanyaan <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
          className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
          placeholder="Contoh: Berapa jumlah penduduk Indonesia?"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          Jawaban <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={form.answer}
          onChange={(e) => setForm({ ...form, answer: e.target.value })}
          className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors resize-y"
          placeholder="Tulis jawaban lengkap di sini..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Kategori
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
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
            Sumber
          </label>
          <input
            type="text"
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
            className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
            placeholder="BPS, World Bank, dll"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          URL Sumber
        </label>
        <input
          type="url"
          value={form.source_url}
          onChange={(e) => setForm({ ...form, source_url: e.target.value })}
          className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
          placeholder="https://..."
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
            Data Points
          </label>
          <button
            type="button"
            onClick={addDataPoint}
            className="flex items-center gap-1 text-[11px] text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            <Plus className="w-3 h-3" />
            Tambah
          </button>
        </div>
        <div className="space-y-2">
          {form.data_points.map((dp, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={dp.label}
                onChange={(e) =>
                  updateDataPoint(index, "label", e.target.value)
                }
                className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
                placeholder="Label"
              />
              <input
                type="text"
                value={dp.value}
                onChange={(e) =>
                  updateDataPoint(index, "value", e.target.value)
                }
                className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
                placeholder="Nilai"
              />
              {form.data_points.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDataPoint(index)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
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
              form.is_published ? "translate-x-[18px]" : "translate-x-[3px]"
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
          disabled={loading}
          className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {initialData ? "Simpan Perubahan" : "Tambah Q&A"}
        </button>
      </div>
    </form>
  );
}
