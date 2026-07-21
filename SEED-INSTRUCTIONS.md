# Cara Seed Database Supabase

## Langkah 1: Jalankan Schema Migration

1. Buka **Supabase Dashboard** → https://supabase.com/dashboard
2. Pilih project kamu
3. Klik **SQL Editor** di sidebar
4. Klik **New Query**
5. Buka file `supabase/migrations/001_initial_schema.sql`
6. Copy seluruh isi file, paste ke SQL Editor
7. Klik **Run** (atau tekan Ctrl+Enter)
8. Tunggu sampai selesai (harusnya beberapa detik)

## Langkah 2: Seed Data

1. Masih di SQL Editor, klik **New Query** lagi
2. Buka file `supabase/seed.sql`
3. Copy seluruh isi file, paste ke SQL Editor
4. Klik **Run**
5. Tunggu sampai selesai (mungkin 10-30 detik karena ada 2000+ baris)

## Langkah 3: Set Role Admin

1. Klik **Table Editor** di sidebar
2. Buka tabel **profiles**
3. Kamu harusnya melihat 1 baris (akun kamu yang baru daftar)
4. Klik baris tersebut, ubah kolom **role** dari `user` menjadi `admin`
5. Klik **Save**

## Langkah 4: Cek Data

1. Buka http://localhost:3000/admin
2. Login dengan email dan password kamu
3. Buka http://localhost:3000/admin/data — seharusnya sudah ada 20 kategori
4. Buka http://localhost:3000/admin/qa — seharusnya sudah ada 30 Q&A
5. Buka http://localhost:3000/admin/fun-facts — seharusnya sudah ada 12 fun facts

## Langkah 5: Upload PDF (Opsional)

1. Buka http://localhost:3000/admin/documents
2. Klik **Upload Document**
3. Pilih file PDF, beri judul dan deskripsi
4. File akan tersimpan di Supabase Storage

## Troubleshooting

### Error "relation does not exist"
Pastikan schema migration (Langkah 1) sudah dijalankan SEBELUM seed data.

### Error "duplicate key value"
Itu normal — seed.sql menggunakan `ON CONFLICT DO NOTHING` sehingga aman dijalankan berulang kali.

### Data tidak muncul di website
Pastikan dataset di tabel `datasets` memiliki `is_published = true`. Secara default seed data sudah di-set true.

### Upload PDF gagal
Pastikan bucket `documents` sudah ada di Supabase Storage. Kalau belum, buat manual di Dashboard → Storage → New Bucket → nama: `documents`, Public: true.
