-- Seed data for Perpustakaan Data Indonesia
-- Generated from TypeScript source files

BEGIN;

-- ============================================================
-- CATEGORIES
-- ============================================================

INSERT INTO categories (id, name, slug, description, icon, color, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Ekonomi', 'ekonomi', 'Data ekonomi makro Indonesia: PDB, inflasi, suku bunga, neraca perdagangan', 'TrendingUp', 'from-blue-500 to-blue-600', 1)
ON CONFLICT DO NOTHING;

INSERT INTO categories (id, name, slug, description, icon, color, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000002', 'Geografi', 'geografi', 'Data geografi Indonesia: luas wilayah, provinsi, pulau, dan topografi', 'Map', 'from-emerald-500 to-green-600', 2)
ON CONFLICT DO NOTHING;

INSERT INTO categories (id, name, slug, description, icon, color, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000003', 'Kesehatan', 'kesehatan', 'Data kesehatan masyarakat: angka kematian, harapan hidup, fasilitas kesehatan', 'HeartPulse', 'from-rose-500 to-rose-600', 3)
ON CONFLICT DO NOTHING;

INSERT INTO categories (id, name, slug, description, icon, color, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000004', 'Pendidikan', 'pendidikan', 'Data pendidikan nasional: angka melek huruf, sekolah, siswa, dan tenaga pendidik', 'GraduationCap', 'from-indigo-500 to-indigo-600', 4)
ON CONFLICT DO NOTHING;

INSERT INTO categories (id, name, slug, description, icon, color, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000005', 'Pertanian', 'pertanian', 'Data pertanian pangan: padi, jagung, kedelai, dan produksi pangan nasional', 'Wheat', 'from-amber-500 to-amber-600', 5)
ON CONFLICT DO NOTHING;

INSERT INTO categories (id, name, slug, description, icon, color, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000006', 'Perkebunan', 'perkebunan', 'Data perkebunan: sawit, karet, kopi, teh, dan komoditas ekspor', 'TreePine', 'from-lime-500 to-lime-600', 6)
ON CONFLICT DO NOTHING;

INSERT INTO categories (id, name, slug, description, icon, color, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000007', 'Kelautan', 'kelautan', 'Data kelautan dan perikanan: tangkapan ikan, pelabuhan, ekspor laut', 'Anchor', 'from-cyan-500 to-cyan-600', 7)
ON CONFLICT DO NOTHING;

INSERT INTO categories (id, name, slug, description, icon, color, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000008', 'Penduduk', 'penduduk', 'Data demografi: sensus, pertumbuhan, distribusi, dan migrasi penduduk', 'Users', 'from-violet-500 to-violet-600', 8)
ON CONFLICT DO NOTHING;

INSERT INTO categories (id, name, slug, description, icon, color, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000009', 'Olahraga', 'olahraga', 'Data olahraga nasional: atlet, medali, prestasi, dan infrastruktur olahraga', 'Trophy', 'from-orange-500 to-orange-600', 9)
ON CONFLICT DO NOTHING;

INSERT INTO categories (id, name, slug, description, icon, color, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000010', 'Marketing', 'marketing', 'Data marketing: belanja iklan, digital marketing, dan e-commerce (Sumber: IAB Indonesia, Google-Temasek-Bain, DataReportal)', 'Megaphone', 'from-fuchsia-500 to-fuchsia-600', 10)
ON CONFLICT DO NOTHING;

INSERT INTO categories (id, name, slug, description, icon, color, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000011', 'Perusahaan', 'perusahaan', 'Data perusahaan: startup, BUMN, daftar Forbes, dan revenue korporasi (Sumber: BEHAVA.id, DealStreetAsia)', 'Building2', 'from-slate-500 to-slate-600', 11)
ON CONFLICT DO NOTHING;

INSERT INTO categories (id, name, slug, description, icon, color, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000012', 'Akuntansi', 'akuntansi', 'Data akuntansi: standar akuntansi, audit, laporan keuangan, dan profesional akuntansi', 'Calculator', 'from-teal-500 to-teal-600', 12)
ON CONFLICT DO NOTHING;

INSERT INTO categories (id, name, slug, description, icon, color, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000013', 'HRD', 'hrd', 'Data sumber daya manusia: upah, UMR, workforce, dan keahlian tenaga kerja', 'Briefcase', 'from-sky-500 to-sky-600', 13)
ON CONFLICT DO NOTHING;

INSERT INTO categories (id, name, slug, description, icon, color, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000014', 'Nonprofit', 'nonprofit', 'Data organisasi nirlaba: LSM, filantropi, donasi, dan kegiatan sosial (Sumber: Yayasan Filantropi Indonesia, Filantropi Indonesia)', 'HandHeart', 'from-pink-500 to-pink-600', 14)
ON CONFLICT DO NOTHING;

INSERT INTO categories (id, name, slug, description, icon, color, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000015', 'Karir', 'karir', 'Data karir: lowongan kerja, gaji, tren karir, dan pasar kerja (Sumber: JobStreet Indonesia, BPS)', 'MapPin', 'from-emerald-400 to-emerald-600', 15)
ON CONFLICT DO NOTHING;

INSERT INTO categories (id, name, slug, description, icon, color, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000016', 'Makanan', 'makanan', 'Data makanan: konsumsi pangan, restoran, dan industri makanan (Sumber: Google-Temasek-Bain, BPS, Kemenkes)', 'UtensilsCrossed', 'from-red-400 to-red-600', 16)
ON CONFLICT DO NOTHING;

INSERT INTO categories (id, name, slug, description, icon, color, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000017', 'Kekayaan', 'kekayaan', 'Data kekayaan nasional: miliarder, GINI ratio, kemiskinan, dan disparitas (Sumber: Forbes)', 'Gem', 'from-yellow-500 to-yellow-600', 17)
ON CONFLICT DO NOTHING;

INSERT INTO categories (id, name, slug, description, icon, color, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000018', 'Konten Kreator', 'konten-kreator', 'Data creator economy: YouTube, Instagram, TikTok, dan monetisasi konten (Sumber: Social Blade, DataReportal)', 'Video', 'from-red-500 to-red-600', 18)
ON CONFLICT DO NOTHING;

INSERT INTO categories (id, name, slug, description, icon, color, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000019', 'Keluarga & Anak', 'keluarga-anak', 'Data demografi keluarga: angka kelahiran, child care, dan kesejahteraan anak', 'Baby', 'from-teal-400 to-teal-600', 19)
ON CONFLICT DO NOTHING;

INSERT INTO categories (id, name, slug, description, icon, color, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000020', 'Lingkungan', 'lingkungan', 'Data lingkungan: deforestasi, emisi karbon, energi terbarukan, dan kualitas udara', 'Leaf', 'from-green-500 to-emerald-600', 20)
ON CONFLICT DO NOTHING;

-- ============================================================
-- DATASETS
-- ============================================================

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001', 'Produk Domestik Bruto (PDB)', 'pdb-indonesia', 'BPS', '', 'triliun Rp', 'PDB Indonesia atas dasar berlaku', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000001', 'Inflasi (CPI)', 'inflasi-cpi', 'BPS', '', '%', 'Tingkat inflasi tahunan', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000001', 'Suku Bunga Acuan BI', 'suku-bunga-bi', 'Bank Indonesia', '', '%', 'BI 7-Day Reverse Repo Rate', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000104', '00000000-0000-0000-0000-000000000001', 'Neraca Perdagangan', 'neraca-perdagangan', 'BPS', '', 'miliar USD', 'Selisih ekspor dan impor', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000105', '00000000-0000-0000-0000-000000000001', 'Cadangan Devisa', 'cadangan-devisa', 'Bank Indonesia', '', 'miliar USD', 'Cadangan devisa Bank Indonesia', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000106', '00000000-0000-0000-0000-000000000002', 'Luas Wilayah Indonesia', 'luas-wilayah', 'BPS', '', 'km²', 'Luas wilayah NKRI termasuk perairan', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000107', '00000000-0000-0000-0000-000000000002', 'Luas Daratan dan Perairan', 'luas-daratan-perairan', 'BPS', '', 'km²', 'Rincian luas wilayah menurut kategori', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000108', '00000000-0000-0000-0000-000000000002', 'Jumlah Provinsi', 'jumlah-provinsi', 'Kemendagri', '', 'provinsi', 'Jumlah provinsi di Indonesia', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000109', '00000000-0000-0000-0000-000000000002', 'Lima Pulau Terluas', 'pulau-terluas', 'BPS', '', 'km²', 'Luas area lima pulau terbesar', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000110', '00000000-0000-0000-0000-000000000002', 'Gunung Tertinggi', 'gunung-tertinggi', 'BPS', '', 'mdpl', 'Ketinggian gunung tertinggi di Indonesia', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000111', '00000000-0000-0000-0000-000000000003', 'Harapan Hidup Saat Lahir', 'harapan-hidup', 'BPS', '', 'tahun', 'Rata-rata harapan hidup penduduk saat lahir', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000112', '00000000-0000-0000-0000-000000000003', 'Angka Kematian Bayi (AKB)', 'angka-kematian-bayi', 'Kemenkes', '', 'per 1.000 kelahiran hidup', 'Jumlah kematian bayi per 1.000 kelahiran hidup', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000113', '00000000-0000-0000-0000-000000000003', 'Jumlah Rumah Sakit', 'jumlah-rs', 'Kemenkes', '', 'unit', 'Total rumah sakit di seluruh Indonesia', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000114', '00000000-0000-0000-0000-000000000003', 'Rasio Dokter per 100.000 Penduduk', 'rasio-dokter', 'Kemenkes', '', 'per 100.000', 'Jumlah dokter per 100.000 penduduk', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000115', '00000000-0000-0000-0000-000000000003', 'Prevalensi Stunting', 'stunting-prevalensi', 'Kemenkes', '', '%', 'Persentase balita stunting (pendek)', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000116', '00000000-0000-0000-0000-000000000004', 'Angka Melek Huruf', 'melek-huruf', 'BPS', '', '%', 'Persentase penduduk usia 15+ yang melek huruf', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000117', '00000000-0000-0000-0000-000000000004', 'Angka Partisipasi Sekolah (APS)', 'angka-partisipasi-murni', 'BPS', '', '%', 'Persentase anak usia sekolah yang bersekolah', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000118', '00000000-0000-0000-0000-000000000004', 'Jumlah Siswa SD', 'jumlah-siswa-sd', 'Kemendikbud', '', 'ribu', 'Total siswa SD nasional', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000119', '00000000-0000-0000-0000-000000000004', 'Jumlah Perguruan Tinggi', 'jumlah-perguruan-tinggi', 'Kemendikbud', '', 'institution', 'Jumlah perguruan tinggi di Indonesia', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000120', '00000000-0000-0000-0000-000000000004', 'Skor Literasi Membaca PISA', 'angka-literasi-baca', 'OECD', '', 'skor', 'Skor rata-rata literasi membaca siswa Indonesia dalam PISA', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000121', '00000000-0000-0000-0000-000000000005', 'Produksi Padi', 'produksi-padi', 'BPS', '', 'juta ton', 'Produksi gabah kering panen nasional', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000122', '00000000-0000-0000-0000-000000000005', 'Produksi Jagung', 'produksi-jagung', 'BPS', '', 'juta ton', 'Produksi jagung nasional', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000123', '00000000-0000-0000-0000-000000000005', 'Produksi Kedelai', 'produksi-kedelai', 'BPS', '', 'juta ton', 'Produksi kedelai nasional', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000124', '00000000-0000-0000-0000-000000000005', 'Luas Lahan Pertanian', 'luas-lahan-pertanian', 'BPS', '', 'juta hektar', 'Luas lahan sawah dan non-sawah', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000125', '00000000-0000-0000-0000-000000000005', 'Impor Beras', 'impor-beras', 'Kemendag', '', 'juta ton', 'Volume impor beras Indonesia', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000126', '00000000-0000-0000-0000-000000000006', 'Produksi Crude Palm Oil (CPO)', 'produksi-sawit', 'BPS', '', 'juta ton', 'Produksi CPO Indonesia', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000127', '00000000-0000-0000-0000-000000000006', 'Luas Kebun Sawit', 'luas-sawit', 'BPDPKS', '', 'juta hektar', 'Total luas areal perkebunan kelapa sawit', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000128', '00000000-0000-0000-0000-000000000006', 'Produksi Kopi', 'produksi-kopi', 'BPS', '', 'juta ton', 'Produksi kopi nasional (robusta dan arabika)', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000129', '00000000-0000-0000-0000-000000000006', 'Ekspor Karet', 'ekspor-karet', 'Kemendag', '', 'miliar USD', 'Nilai ekspor karet Indonesia', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000130', '00000000-0000-0000-0000-000000000006', 'Produksi Teh', 'produksi-teh', 'BPS', '', 'ribu ton', 'Produksi teh kering nasional', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000131', '00000000-0000-0000-0000-000000000007', 'Produksi Perikanan Tangkap', 'produksi-perikanan', 'KKP', '', 'juta ton', 'Total hasil tangkapan ikan nasional', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000132', '00000000-0000-0000-0000-000000000007', 'Jumlah Kapal Penangkap Ikan', 'kapal-ikan', 'KKP', '', 'unit', 'Jumlah unit kapal penangkap ikan', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000133', '00000000-0000-0000-0000-000000000007', 'Nilai Ekspor Perikanan', 'ekspor-perikanan', 'KKP', '', 'miliar USD', 'Total nilai ekspor produk perikanan', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000134', '00000000-0000-0000-0000-000000000007', 'Tonase Pelabuhan Utama', 'pelabuhan-utama', 'BPS', '', 'ton', 'Tonase bongkar muat lima pelabuhan terbesar', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000135', '00000000-0000-0000-0000-000000000007', 'Produksi Akuakultur', 'akuakultur-produksi', 'KKP', '', 'juta ton', 'Produksi perikanan budi daya', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000136', '00000000-0000-0000-0000-000000000008', 'Total Populasi', 'total-populasi', 'BPS', '', 'juta', 'Estimasi jumlah penduduk Indonesia', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000137', '00000000-0000-0000-0000-000000000008', 'Tingkat Pertumbuhan Penduduk', 'tingkat-pertumbuhan-populasi', 'BPS', '', '%', 'Persentase pertumbuhan penduduk tahunan', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000138', '00000000-0000-0000-0000-000000000008', 'Angka Fertilitas Total', 'angka-fertilitas', 'BPS', '', 'anak/wanita', 'Rata-rata jumlah anak per wanita usia reproduktif', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000139', '00000000-0000-0000-0000-000000000008', 'Proporsi Penduduk Perkotaan', 'proporsi-urban', 'BPS', '', '%', 'Persentase penduduk yang tinggal di wilayah perkotaan', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000140', '00000000-0000-0000-0000-000000000008', 'Kepadatan Penduduk', 'kepadatan-penduduk', 'BPS', '', 'jiwa/km²', 'Rata-rata kepadatan penduduk per kilometer persegi', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000141', '00000000-0000-0000-0000-000000000009', 'Medali ASEAN Games', 'medali-asean-games', 'KONI', '', 'medali', 'Total medali Indonesia di ASEAN Games (emas+perak+perunggu)', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000142', '00000000-0000-0000-0000-000000000009', 'Medali Emas ASEAN Games', 'medali-emas-asean-games', 'KONI', '', 'medali', 'Jumlah medali emas Indonesia di ASEAN Games', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000143', '00000000-0000-0000-0000-000000000009', 'Atlet Profesional Terdaftar', 'jumlah-atlet-profesional', 'KONI', '', 'orang', 'Jumlah atlet profesional terdaftar di KONI', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000144', '00000000-0000-0000-0000-000000000009', 'Anggaran Kemenpora', 'anggaran-olahraga', 'Kemenkeu', '', 'triliun Rp', 'Alokasi anggaran Kementerian Pemuda dan Olahraga', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000145', '00000000-0000-0000-0000-000000000009', 'Prestasi di Olimpiade', 'prestasi-olahraga-internasional', 'KONI', '', 'medali', 'Jumlah medali emas Indonesia di Olimpiade', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000146', '00000000-0000-0000-0000-000000000010', 'Belanja Iklan Digital', 'belanja-iklan', 'IAB Indonesia', '', 'triliun Rp', 'Total belanja iklan digital nasional', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000147', '00000000-0000-0000-0000-000000000010', 'Ukuran Pasar E-Commerce', 'ecommerce-market-size', 'Google-Temasek-Bain', '', 'miliar USD', 'GMV pasar e-commerce Indonesia', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000148', '00000000-0000-0000-0000-000000000010', 'Pengguna Media Sosial', 'social-media-users', 'DataReportal', '', 'juta', 'Total pengguna aktif media sosial di Indonesia', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000149', '00000000-0000-0000-0000-000000000010', 'Belanja Digital per Kapita', 'spending-per-capita-digital', 'IAB Indonesia', '', 'ribu Rp', 'Belanja iklan digital per kapita penduduk', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000150', '00000000-0000-0000-0000-000000000011', 'Jumlah Startup Unicorn Indonesia', 'jumlah-startup', 'BEHAVA.id', '', 'perusahaan', 'Jumlah startup bernilai >1 miliar USD (unicorn)', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000151', '00000000-0000-0000-0000-000000000011', 'Total Pendapatan BUMN', 'pendapatan-bumn', 'KemenBUMN', '', 'triliun Rp', 'Total pendapatan seluruh BUMN', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000152', '00000000-0000-0000-0000-000000000011', 'Jumlah BUMN', 'jumlah-bumn', 'KemenBUMN', '', 'perusahaan', 'Jumlah BUMN di Indonesia', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000153', '00000000-0000-0000-0000-000000000011', 'Jumlah Deal Venture Capital', 'deals-venture-capital', 'DealStreetAsia', '', 'deal', 'Jumlah transaksi VC di Indonesia', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000154', '00000000-0000-0000-0000-000000000012', 'Jumlah Akuntan Profesional', 'jumlah-akuntan', 'IAI', '', 'orang', 'Jumlah anggota Institut Akuntan Indonesia', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000155', '00000000-0000-0000-0000-000000000012', 'Jumlah Kantor Akuntan Publik', 'jumlah-kap', 'KAP', '', 'kantor', 'Jumlah KAP terdaftar di OJK', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000156', '00000000-0000-0000-0000-000000000012', 'Emiten Lapor Keuangan', 'laporan-keuangan-publik', 'OJK', '', 'emiten', 'Jumlah emiten yang menerbitkan laporan keuangan auditan', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000157', '00000000-0000-0000-0000-000000000012', 'Penerapan IFRS/SPI', 'biaya-penyusunan-standar', 'IAI', '', 'konvergensi', 'Konvergensi standar akuntansi Indonesia dengan IFRS', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000158', '00000000-0000-0000-0000-000000000013', 'UMR Rata-rata Nasional', 'umr-nasional', 'Kemnaker', '', 'juta Rp', 'Upah minimum regional rata-rata nasional per bulan', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000159', '00000000-0000-0000-0000-000000000013', 'Angka Partisipasi Tenaga Kerja', 'angka-partisipasi-tenaga-kerja', 'BPS', '', '%', 'Persentase penduduk usia kerja yang bekerja atau mencari kerja', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000160', '00000000-0000-0000-0000-000000000013', 'Jumlah Angkatan Kerja', 'jumlah-workforce', 'BPS', '', 'juta', 'Total angkatan kerja Indonesia', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000161', '00000000-0000-0000-0000-000000000013', 'Pengangguran Terdidik', 'pengangguran-terdidik', 'BPS', '', '%', 'Persentase pengangguran dengan pendidikan Diploma/S1+', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000162', '00000000-0000-0000-0000-000000000014', 'Jumlah Organisasi Sosial/LSM', 'jumlah-lsm', 'Kemensos', '', 'organisasi', 'Total organisasi sosial dan LSM terdaftar', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000163', '00000000-0000-0000-0000-000000000014', 'Total Donasi Nasional', 'total-donasi', 'Yayasan Filantropi Indonesia', '', 'triliun Rp', 'Perkiraan total donasi filantropi nasional', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000164', '00000000-0000-0000-0000-000000000014', 'Akun Donasi Digital', 'angka-kepemilikan-organisasi', 'Filantropi Indonesia', '', 'ribu', 'Jumlah akun penggalangan dana digital aktif', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000165', '00000000-0000-0000-0000-000000000014', 'Potensi Zakat Nasional', 'zakat-potensi', 'BAZNAS', '', 'miliar Rp', 'Total zakat nasional yang tersalurkan', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000166', '00000000-0000-0000-0000-000000000015', 'Lowongan Kerja Online', 'lowongan-kerja-online', 'JobStreet Indonesia', '', 'lowongan', 'Total lowongan kerja yang diposting secara online', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000167', '00000000-0000-0000-0000-000000000015', 'Gaji Rata-rata Nasional', 'gaji-rata-rata', 'BPS', '', 'juta Rp/bulan', 'Upah rata-rata buruh berdasarkan SAKERNAS', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000168', '00000000-0000-0000-0000-000000000015', 'Jumlah Pencari Kerja', 'job-seekers', 'BPS', '', 'juta', 'Jumlah pencari kerja aktif', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000169', '00000000-0000-0000-0000-000000000015', 'Permintaan Tenaga Kerja Digital', 'permintaan-digital-skill', 'Kominfo', '', 'lowongan', 'Permintaan tenaga kerja di sektor digital TI', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000170', '00000000-0000-0000-0000-000000000016', 'Konsumsi Beras Per Kapita', 'konsumsi-beras', 'BPS', '', 'kg/tahun', 'Rata-rata konsumsi beras per kapita per tahun', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000171', '00000000-0000-0000-0000-000000000016', 'Jumlah Restoran dan Warung', 'jumlah-restoran', 'BPS', '', 'unit', 'Total unit restoran dan warung makan', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000172', '00000000-0000-0000-0000-000000000016', 'Pasar Food Delivery Online', 'food-delivery-market', 'Google-Temasek-Bain', '', 'miliar USD', 'GMV layanan pesan antar makanan daring', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000173', '00000000-0000-0000-0000-000000000016', 'Konsumsi Gula Per Kapita', 'konsumsi-gula', 'Kemenkes', '', 'kg/tahun', 'Rata-rata konsumsi gula pasir per kapita', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000174', '00000000-0000-0000-0000-000000000017', 'Jumlah Miliarder Forbes', 'miliarder-indonesia', 'Forbes', '', 'orang', 'Jumlah orang terkaya Indonesia versi Forbes Billionaires', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000175', '00000000-0000-0000-0000-000000000017', 'Rasio GINI', 'gini-ratio', 'BPS', '', 'indeks', 'Rasio ketimpangan pendapatan nasional', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000176', '00000000-0000-0000-0000-000000000017', 'Tingkat Kemiskinan', 'tingkat-kemiskinan', 'BPS', '', '%', 'Persentase penduduk miskin nasional', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000177', '00000000-0000-0000-0000-000000000017', 'Garis Kemiskinan Nasional', 'garis-kemiskinan', 'BPS', '', 'Rp/kapita/bulan', 'Garis batas pendapatan untuk kategori miskin', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000178', '00000000-0000-0000-0000-000000000018', 'YouTube Subscribers Tertinggi', 'youtube-subscribers', 'Social Blade', '', 'subscribers', 'Jumlah subscriber kanal YouTube Indonesia terbesar', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000179', '00000000-0000-0000-0000-000000000018', 'TikTok Kreator Aktif', 'tiktok-creators', 'Kominfo', '', 'juta', 'Estimasi jumlah kreator aktif di TikTok Indonesia', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000180', '00000000-0000-0000-0000-000000000018', 'Nilai Creator Economy Indonesia', 'creator-economy-value', 'Kominfo', '', 'triliun Rp', 'Estimasi total nilai industri kreator digital Indonesia', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000181', '00000000-0000-0000-0000-000000000018', 'Pengguna Instagram Indonesia', 'instagram-users-indonesia', 'DataReportal', '', 'juta', 'Jumlah pengguna aktif Instagram di Indonesia', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000182', '00000000-0000-0000-0000-000000000019', 'Jumlah Rumah Tangga', 'jumlah-keluarga', 'BPS', '', 'juta', 'Total jumlah rumah tangga di Indonesia', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000183', '00000000-0000-0000-0000-000000000019', 'Jumlah Kelahiran Hidup', 'angka-kelahiran', 'BPS', '', 'ribu', 'Total jumlah kelahiran hidup per tahun', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000184', '00000000-0000-0000-0000-000000000019', 'Fasilitas Kesehatan Ibu dan Anak', 'rumah-sakit-ibu-anak', 'Kemenkes', '', 'fasilitas', 'Total Puskesmas, posyandu, dan klinik ibu-anak', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000185', '00000000-0000-0000-0000-000000000019', 'Persentase Persalinan Sesar', 'persentase-lahir-cesar', 'Kemenkes', '', '%', 'Persentase persalinan dengan metode operasi sesar', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000186', '00000000-0000-0000-0000-000000000020', 'Laju Deforestasi', 'deforestasi', 'KLHK', '', 'hektar/tahun', 'Luas kehilangan tutupan pohon per tahun', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000187', '00000000-0000-0000-0000-000000000020', 'Emisi Gas Rumah Kaca', 'emisi-karbon', 'BAPPENAS', '', 'juta ton CO₂eq', 'Total emisi GRK nasional (tanpa FOLU net sink)', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000188', '00000000-0000-0000-0000-000000000020', 'Pangsa Energi Terbarukan', 'energi-terbarukan', 'ESDM', '', '%', 'Pangsa energi terbarukan dari total bauran energi primer', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000189', '00000000-0000-0000-0000-000000000020', 'Luas Kawasan Hutan', 'kawasan-hutan', 'KLHK', '', 'juta hektar', 'Luas kawasan hutan nasional', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO datasets (id, category_id, name, slug, source, source_url, unit, description, is_published) VALUES
  ('00000000-0000-0000-0000-000000000190', '00000000-0000-0000-0000-000000000020', 'Sampah Plastik Laut', 'pemanfaatan-plastik', 'KLHK', '', 'juta ton/tahun', 'Estimasi jumlah sampah plastik yang masuk ke laut', TRUE)
ON CONFLICT DO NOTHING;

-- ============================================================
-- DATA POINTS
-- ============================================================

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001001', '00000000-0000-0000-0000-000000000101', '2018', 14837.4, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001002', '00000000-0000-0000-0000-000000000101', '2019', 15832.5, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001003', '00000000-0000-0000-0000-000000000101', '2020', 15403.7, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001004', '00000000-0000-0000-0000-000000000101', '2021', 16627.9, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001005', '00000000-0000-0000-0000-000000000101', '2022', 18876.1, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001006', '00000000-0000-0000-0000-000000000101', '2023', 20045.5, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001007', '00000000-0000-0000-0000-000000000101', '2024', 21650.4, '2024')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001008', '00000000-0000-0000-0000-000000000101', '2025', 22137.3, '2025')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001009', '00000000-0000-0000-0000-000000000102', '2018', 3.13, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001010', '00000000-0000-0000-0000-000000000102', '2019', 3.02, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001011', '00000000-0000-0000-0000-000000000102', '2020', 2.05, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001012', '00000000-0000-0000-0000-000000000102', '2021', 1.87, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001013', '00000000-0000-0000-0000-000000000102', '2022', 4.21, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001014', '00000000-0000-0000-0000-000000000102', '2023', 2.61, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001015', '00000000-0000-0000-0000-000000000102', '2024', 1.81, '2024')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001016', '00000000-0000-0000-0000-000000000102', '2025', 1.51, '2025')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001017', '00000000-0000-0000-0000-000000000103', '2018-12', 6, '2018-12')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001018', '00000000-0000-0000-0000-000000000103', '2019-12', 5, '2019-12')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001019', '00000000-0000-0000-0000-000000000103', '2020-12', 3.75, '2020-12')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001020', '00000000-0000-0000-0000-000000000103', '2021-12', 3.5, '2021-12')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001021', '00000000-0000-0000-0000-000000000103', '2022-12', 5.5, '2022-12')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001022', '00000000-0000-0000-0000-000000000103', '2023-12', 6, '2023-12')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001023', '00000000-0000-0000-0000-000000000103', '2024-06', 6.25, '2024-06')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001024', '00000000-0000-0000-0000-000000000103', '2025-03', 5.75, '2025-03')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001025', '00000000-0000-0000-0000-000000000104', '2018', 8.6, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001026', '00000000-0000-0000-0000-000000000104', '2019', 3.1, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001027', '00000000-0000-0000-0000-000000000104', '2020', 21.7, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001028', '00000000-0000-0000-0000-000000000104', '2021', 33.1, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001029', '00000000-0000-0000-0000-000000000104', '2022', 54.5, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001030', '00000000-0000-0000-0000-000000000104', '2023', 35.2, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001031', '00000000-0000-0000-0000-000000000104', '2024', 28.7, '2024')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001032', '00000000-0000-0000-0000-000000000104', '2025', 18.3, '2025')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001033', '00000000-0000-0000-0000-000000000105', '2018-12', 120, '2018-12')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001034', '00000000-0000-0000-0000-000000000105', '2019-12', 129.2, '2019-12')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001035', '00000000-0000-0000-0000-000000000105', '2020-12', 136.9, '2020-12')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001036', '00000000-0000-0000-0000-000000000105', '2021-12', 144.9, '2021-12')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001037', '00000000-0000-0000-0000-000000000105', '2022-12', 137.2, '2022-12')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001038', '00000000-0000-0000-0000-000000000105', '2023-12', 146.4, '2023-12')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001039', '00000000-0000-0000-0000-000000000105', '2024-12', 155.7, '2024-12')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001040', '00000000-0000-0000-0000-000000000105', '2025-03', 152.3, '2025-03')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001041', '00000000-0000-0000-0000-000000000106', '2020', 1910931.2, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001042', '00000000-0000-0000-0000-000000000106', '2021', 1910931.2, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001043', '00000000-0000-0000-0000-000000000106', '2022', 1910931.2, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001044', '00000000-0000-0000-0000-000000000106', '2023', 1910931.2, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001045', '00000000-0000-0000-0000-000000000106', '2024', 1910931.2, '2024')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001046', '00000000-0000-0000-0000-000000000106', '2025', 1910931.2, '2025')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001047', '00000000-0000-0000-0000-000000000107', '2024', 1910931.2, '2024')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001048', '00000000-0000-0000-0000-000000000107', 'daratan', 810000, 'daratan')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001049', '00000000-0000-0000-0000-000000000107', 'perairan-pulau', 327614, 'perairan-pulau')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001050', '00000000-0000-0000-0000-000000000107', 'perairan-zee', 273868.2, 'perairan-zee')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001051', '00000000-0000-0000-0000-000000000107', 'landas-kontinen', 500049, 'landas-kontinen')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001052', '00000000-0000-0000-0000-000000000108', '2000', 26, '2000')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001053', '00000000-0000-0000-0000-000000000108', '2003', 29, '2003')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001054', '00000000-0000-0000-0000-000000000108', '2004', 32, '2004')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001055', '00000000-0000-0000-0000-000000000108', '2012', 33, '2012')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001056', '00000000-0000-0000-0000-000000000108', '2022', 36, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001057', '00000000-0000-0000-0000-000000000108', '2024', 38, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001058', '00000000-0000-0000-0000-000000000109', 'Kalimantan', 539000, 'Kalimantan')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001059', '00000000-0000-0000-0000-000000000109', 'Sumatera', 473606.5, 'Sumatera')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001060', '00000000-0000-0000-0000-000000000109', 'Papua', 421981, 'Papua')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001061', '00000000-0000-0000-0000-000000000109', 'Sulawesi', 189216, 'Sulawesi')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001062', '00000000-0000-0000-0000-000000000109', 'Jawa', 128297, 'Jawa')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001063', '00000000-0000-0000-0000-000000000110', 'Puncak Jaya', 4884, 'Puncak Jaya')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001064', '00000000-0000-0000-0000-000000000110', 'Puncak Trikora', 4750, 'Puncak Trikora')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001065', '00000000-0000-0000-0000-000000000110', 'Puncak Mandala', 4760, 'Puncak Mandala')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001066', '00000000-0000-0000-0000-000000000110', 'Kerinci', 3805, 'Kerinci')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001067', '00000000-0000-0000-0000-000000000110', 'Rinjani', 3726, 'Rinjani')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001068', '00000000-0000-0000-0000-000000000111', '2018', 71.61, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001069', '00000000-0000-0000-0000-000000000111', '2019', 71.72, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001070', '00000000-0000-0000-0000-000000000111', '2020', 71.59, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001071', '00000000-0000-0000-0000-000000000111', '2021', 69.4, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001072', '00000000-0000-0000-0000-000000000111', '2022', 71.28, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001073', '00000000-0000-0000-0000-000000000111', '2023', 71.63, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001074', '00000000-0000-0000-0000-000000000111', '2024', 71.8, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001075', '00000000-0000-0000-0000-000000000112', '2018', 21.4, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001076', '00000000-0000-0000-0000-000000000112', '2019', 19.2, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001077', '00000000-0000-0000-0000-000000000112', '2020', 17.9, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001078', '00000000-0000-0000-0000-000000000112', '2021', 17.4, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001079', '00000000-0000-0000-0000-000000000112', '2022', 16.3, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001080', '00000000-0000-0000-0000-000000000112', '2023', 15.1, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001081', '00000000-0000-0000-0000-000000000112', '2024', 14.2, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001082', '00000000-0000-0000-0000-000000000113', '2018', 2923, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001083', '00000000-0000-0000-0000-000000000113', '2019', 3078, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001084', '00000000-0000-0000-0000-000000000113', '2020', 3322, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001085', '00000000-0000-0000-0000-000000000113', '2021', 3498, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001086', '00000000-0000-0000-0000-000000000113', '2022', 3644, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001087', '00000000-0000-0000-0000-000000000113', '2023', 3791, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001088', '00000000-0000-0000-0000-000000000113', '2024', 3896, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001089', '00000000-0000-0000-0000-000000000114', '2018', 4.2, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001090', '00000000-0000-0000-0000-000000000114', '2019', 4.6, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001091', '00000000-0000-0000-0000-000000000114', '2020', 5, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001092', '00000000-0000-0000-0000-000000000114', '2021', 5.3, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001093', '00000000-0000-0000-0000-000000000114', '2022', 5.7, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001094', '00000000-0000-0000-0000-000000000114', '2023', 6.1, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001095', '00000000-0000-0000-0000-000000000114', '2024', 6.4, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001096', '00000000-0000-0000-0000-000000000115', '2018', 30.8, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001097', '00000000-0000-0000-0000-000000000115', '2019', 27.6, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001098', '00000000-0000-0000-0000-000000000115', '2020', 27.7, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001099', '00000000-0000-0000-0000-000000000115', '2021', 24.4, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001100', '00000000-0000-0000-0000-000000000115', '2022', 21.6, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001101', '00000000-0000-0000-0000-000000000115', '2023', 19.2, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001102', '00000000-0000-0000-0000-000000000115', '2024', 17.8, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001103', '00000000-0000-0000-0000-000000000116', '2018', 95.86, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001104', '00000000-0000-0000-0000-000000000116', '2019', 96.14, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001105', '00000000-0000-0000-0000-000000000116', '2020', 96.36, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001106', '00000000-0000-0000-0000-000000000116', '2021', 96.62, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001107', '00000000-0000-0000-0000-000000000116', '2022', 96.93, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001108', '00000000-0000-0000-0000-000000000116', '2023', 97.14, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001109', '00000000-0000-0000-0000-000000000116', '2024', 97.35, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001110', '00000000-0000-0000-0000-000000000117', '2018', 92.54, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001111', '00000000-0000-0000-0000-000000000117', '2019', 93.16, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001112', '00000000-0000-0000-0000-000000000117', '2020', 89.89, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001113', '00000000-0000-0000-0000-000000000117', '2021', 90.48, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001114', '00000000-0000-0000-0000-000000000117', '2022', 92.78, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001115', '00000000-0000-0000-0000-000000000117', '2023', 93.41, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001116', '00000000-0000-0000-0000-000000000117', '2024', 93.88, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001117', '00000000-0000-0000-0000-000000000118', '2018', 29626, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001118', '00000000-0000-0000-0000-000000000118', '2019', 29509, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001119', '00000000-0000-0000-0000-000000000118', '2020', 29335, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001120', '00000000-0000-0000-0000-000000000118', '2021', 29306, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001121', '00000000-0000-0000-0000-000000000118', '2022', 29256, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001122', '00000000-0000-0000-0000-000000000118', '2023', 29148, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001123', '00000000-0000-0000-0000-000000000118', '2024', 29012, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001124', '00000000-0000-0000-0000-000000000119', '2018', 4674, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001125', '00000000-0000-0000-0000-000000000119', '2019', 4753, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001126', '00000000-0000-0000-0000-000000000119', '2020', 4670, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001127', '00000000-0000-0000-0000-000000000119', '2021', 4654, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001128', '00000000-0000-0000-0000-000000000119', '2022', 4642, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001129', '00000000-0000-0000-0000-000000000119', '2023', 4635, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001130', '00000000-0000-0000-0000-000000000119', '2024', 4628, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001131', '00000000-0000-0000-0000-000000000120', '2015', 395, '2015')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001132', '00000000-0000-0000-0000-000000000120', '2018', 371, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001133', '00000000-0000-0000-0000-000000000120', '2022', 359, '2022')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001134', '00000000-0000-0000-0000-000000000121', '2018', 54.85, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001135', '00000000-0000-0000-0000-000000000121', '2019', 54.6, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001136', '00000000-0000-0000-0000-000000000121', '2020', 54.65, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001137', '00000000-0000-0000-0000-000000000121', '2021', 56.12, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001138', '00000000-0000-0000-0000-000000000121', '2022', 55.37, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001139', '00000000-0000-0000-0000-000000000121', '2023', 57.1, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001140', '00000000-0000-0000-0000-000000000121', '2024', 58.23, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001141', '00000000-0000-0000-0000-000000000122', '2018', 30.27, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001142', '00000000-0000-0000-0000-000000000122', '2019', 31.95, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001143', '00000000-0000-0000-0000-000000000122', '2020', 31.87, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001144', '00000000-0000-0000-0000-000000000122', '2021', 33.22, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001145', '00000000-0000-0000-0000-000000000122', '2022', 30.93, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001146', '00000000-0000-0000-0000-000000000122', '2023', 32.54, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001147', '00000000-0000-0000-0000-000000000122', '2024', 33.81, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001148', '00000000-0000-0000-0000-000000000123', '2018', 0.83, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001149', '00000000-0000-0000-0000-000000000123', '2019', 0.94, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001150', '00000000-0000-0000-0000-000000000123', '2020', 0.97, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001151', '00000000-0000-0000-0000-000000000123', '2021', 1.02, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001152', '00000000-0000-0000-0000-000000000123', '2022', 0.96, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001153', '00000000-0000-0000-0000-000000000123', '2023', 1.05, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001154', '00000000-0000-0000-0000-000000000123', '2024', 1.09, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001155', '00000000-0000-0000-0000-000000000124', '2018', 47.13, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001156', '00000000-0000-0000-0000-000000000124', '2019', 47.03, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001157', '00000000-0000-0000-0000-000000000124', '2020', 46.62, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001158', '00000000-0000-0000-0000-000000000124', '2021', 46.46, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001159', '00000000-0000-0000-0000-000000000124', '2022', 46.24, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001160', '00000000-0000-0000-0000-000000000124', '2023', 46.02, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001161', '00000000-0000-0000-0000-000000000124', '2024', 45.83, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001162', '00000000-0000-0000-0000-000000000125', '2018', 1.53, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001163', '00000000-0000-0000-0000-000000000125', '2019', 0.33, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001164', '00000000-0000-0000-0000-000000000125', '2020', 0.15, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001165', '00000000-0000-0000-0000-000000000125', '2021', 0.11, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001166', '00000000-0000-0000-0000-000000000125', '2022', 1.08, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001167', '00000000-0000-0000-0000-000000000125', '2023', 3.06, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001168', '00000000-0000-0000-0000-000000000125', '2024', 5.23, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001169', '00000000-0000-0000-0000-000000000126', '2018', 43, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001170', '00000000-0000-0000-0000-000000000126', '2019', 48, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001171', '00000000-0000-0000-0000-000000000126', '2020', 51.2, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001172', '00000000-0000-0000-0000-000000000126', '2021', 46.9, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001173', '00000000-0000-0000-0000-000000000126', '2022', 49.8, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001174', '00000000-0000-0000-0000-000000000126', '2023', 52.4, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001175', '00000000-0000-0000-0000-000000000126', '2024', 54.1, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001176', '00000000-0000-0000-0000-000000000127', '2018', 14.6, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001177', '00000000-0000-0000-0000-000000000127', '2019', 15.2, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001178', '00000000-0000-0000-0000-000000000127', '2020', 15.8, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001179', '00000000-0000-0000-0000-000000000127', '2021', 16.3, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001180', '00000000-0000-0000-0000-000000000127', '2022', 16.8, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001181', '00000000-0000-0000-0000-000000000127', '2023', 17.1, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001182', '00000000-0000-0000-0000-000000000127', '2024', 17.4, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001183', '00000000-0000-0000-0000-000000000128', '2018', 0.77, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001184', '00000000-0000-0000-0000-000000000128', '2019', 0.76, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001185', '00000000-0000-0000-0000-000000000128', '2020', 0.72, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001186', '00000000-0000-0000-0000-000000000128', '2021', 0.79, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001187', '00000000-0000-0000-0000-000000000128', '2022', 0.78, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001188', '00000000-0000-0000-0000-000000000128', '2023', 0.81, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001189', '00000000-0000-0000-0000-000000000128', '2024', 0.84, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001190', '00000000-0000-0000-0000-000000000129', '2018', 2.85, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001191', '00000000-0000-0000-0000-000000000129', '2019', 2.73, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001192', '00000000-0000-0000-0000-000000000129', '2020', 2.61, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001193', '00000000-0000-0000-0000-000000000129', '2021', 2.98, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001194', '00000000-0000-0000-0000-000000000129', '2022', 3.12, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001195', '00000000-0000-0000-0000-000000000129', '2023', 2.91, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001196', '00000000-0000-0000-0000-000000000129', '2024', 3.05, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001197', '00000000-0000-0000-0000-000000000130', '2018', 134.5, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001198', '00000000-0000-0000-0000-000000000130', '2019', 129.2, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001199', '00000000-0000-0000-0000-000000000130', '2020', 118.7, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001200', '00000000-0000-0000-0000-000000000130', '2021', 125.3, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001201', '00000000-0000-0000-0000-000000000130', '2022', 121.8, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001202', '00000000-0000-0000-0000-000000000130', '2023', 119.4, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001203', '00000000-0000-0000-0000-000000000130', '2024', 117.6, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001204', '00000000-0000-0000-0000-000000000131', '2018', 7.69, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001205', '00000000-0000-0000-0000-000000000131', '2019', 8.16, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001206', '00000000-0000-0000-0000-000000000131', '2020', 7.72, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001207', '00000000-0000-0000-0000-000000000131', '2021', 8.51, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001208', '00000000-0000-0000-0000-000000000131', '2022', 8.92, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001209', '00000000-0000-0000-0000-000000000131', '2023', 9.15, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001210', '00000000-0000-0000-0000-000000000131', '2024', 9.34, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001211', '00000000-0000-0000-0000-000000000132', '2018', 746651, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001212', '00000000-0000-0000-0000-000000000132', '2019', 778542, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001213', '00000000-0000-0000-0000-000000000132', '2020', 792135, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001214', '00000000-0000-0000-0000-000000000132', '2021', 811078, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001215', '00000000-0000-0000-0000-000000000132', '2022', 829734, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001216', '00000000-0000-0000-0000-000000000132', '2023', 846521, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001217', '00000000-0000-0000-0000-000000000132', '2024', 858143, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001218', '00000000-0000-0000-0000-000000000133', '2018', 5.25, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001219', '00000000-0000-0000-0000-000000000133', '2019', 5.43, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001220', '00000000-0000-0000-0000-000000000133', '2020', 4.92, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001221', '00000000-0000-0000-0000-000000000133', '2021', 5.78, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001222', '00000000-0000-0000-0000-000000000133', '2022', 6.31, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001223', '00000000-0000-0000-0000-000000000133', '2023', 5.94, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001224', '00000000-0000-0000-0000-000000000133', '2024', 6.15, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001225', '00000000-0000-0000-0000-000000000134', 'Tanjung Priok', 83200000, 'Tanjung Priok')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001226', '00000000-0000-0000-0000-000000000134', 'Tanjung Perak', 21500000, 'Tanjung Perak')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001227', '00000000-0000-0000-0000-000000000134', 'Belawan', 12300000, 'Belawan')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001228', '00000000-0000-0000-0000-000000000134', 'Makassar', 8700000, 'Makassar')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001229', '00000000-0000-0000-0000-000000000134', 'Benoa', 5400000, 'Benoa')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001230', '00000000-0000-0000-0000-000000000135', '2018', 16.64, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001231', '00000000-0000-0000-0000-000000000135', '2019', 17.23, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001232', '00000000-0000-0000-0000-000000000135', '2020', 16.91, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001233', '00000000-0000-0000-0000-000000000135', '2021', 18.45, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001234', '00000000-0000-0000-0000-000000000135', '2022', 19.38, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001235', '00000000-0000-0000-0000-000000000135', '2023', 20.12, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001236', '00000000-0000-0000-0000-000000000135', '2024', 20.76, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001237', '00000000-0000-0000-0000-000000000136', '2018', 267.67, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001238', '00000000-0000-0000-0000-000000000136', '2019', 270.2, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001239', '00000000-0000-0000-0000-000000000136', '2020', 271.35, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001240', '00000000-0000-0000-0000-000000000136', '2021', 273.52, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001241', '00000000-0000-0000-0000-000000000136', '2022', 275.5, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001242', '00000000-0000-0000-0000-000000000136', '2023', 277.53, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001243', '00000000-0000-0000-0000-000000000136', '2024', 279.93, '2024')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001244', '00000000-0000-0000-0000-000000000136', '2025', 281.6, '2025')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001245', '00000000-0000-0000-0000-000000000137', '2018', 1.1, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001246', '00000000-0000-0000-0000-000000000137', '2019', 0.98, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001247', '00000000-0000-0000-0000-000000000137', '2020', 0.88, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001248', '00000000-0000-0000-0000-000000000137', '2021', 0.8, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001249', '00000000-0000-0000-0000-000000000137', '2022', 0.72, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001250', '00000000-0000-0000-0000-000000000137', '2023', 0.69, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001251', '00000000-0000-0000-0000-000000000137', '2024', 0.67, '2024')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001252', '00000000-0000-0000-0000-000000000137', '2025', 0.65, '2025')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001253', '00000000-0000-0000-0000-000000000138', '2018', 2.4, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001254', '00000000-0000-0000-0000-000000000138', '2019', 2.35, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001255', '00000000-0000-0000-0000-000000000138', '2020', 2.29, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001256', '00000000-0000-0000-0000-000000000138', '2021', 2.24, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001257', '00000000-0000-0000-0000-000000000138', '2022', 2.18, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001258', '00000000-0000-0000-0000-000000000138', '2023', 2.12, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001259', '00000000-0000-0000-0000-000000000138', '2024', 2.07, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001260', '00000000-0000-0000-0000-000000000139', '2018', 55.31, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001261', '00000000-0000-0000-0000-000000000139', '2019', 56.06, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001262', '00000000-0000-0000-0000-000000000139', '2020', 56.87, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001263', '00000000-0000-0000-0000-000000000139', '2021', 57.35, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001264', '00000000-0000-0000-0000-000000000139', '2022', 57.88, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001265', '00000000-0000-0000-0000-000000000139', '2023', 58.37, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001266', '00000000-0000-0000-0000-000000000139', '2024', 58.9, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001267', '00000000-0000-0000-0000-000000000140', '2018', 146.18, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001268', '00000000-0000-0000-0000-000000000140', '2019', 147.6, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001269', '00000000-0000-0000-0000-000000000140', '2020', 148.21, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001270', '00000000-0000-0000-0000-000000000140', '2021', 149.38, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001271', '00000000-0000-0000-0000-000000000140', '2022', 150.47, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001272', '00000000-0000-0000-0000-000000000140', '2023', 151.56, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001273', '00000000-0000-0000-0000-000000000140', '2024', 152.87, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001274', '00000000-0000-0000-0000-000000000141', '2018', 314, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001275', '00000000-0000-0000-0000-000000000141', '2019', 267, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001276', '00000000-0000-0000-0000-000000000141', '2021', 279, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001277', '00000000-0000-0000-0000-000000000141', '2023', 284, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001278', '00000000-0000-0000-0000-000000000141', '2025', 291, '2025')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001279', '00000000-0000-0000-0000-000000000142', '2018', 98, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001280', '00000000-0000-0000-0000-000000000142', '2019', 84, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001281', '00000000-0000-0000-0000-000000000142', '2021', 91, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001282', '00000000-0000-0000-0000-000000000142', '2023', 95, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001283', '00000000-0000-0000-0000-000000000142', '2025', 99, '2025')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001284', '00000000-0000-0000-0000-000000000143', '2018', 13200, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001285', '00000000-0000-0000-0000-000000000143', '2019', 14500, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001286', '00000000-0000-0000-0000-000000000143', '2020', 13800, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001287', '00000000-0000-0000-0000-000000000143', '2021', 15100, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001288', '00000000-0000-0000-0000-000000000143', '2022', 16200, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001289', '00000000-0000-0000-0000-000000000143', '2023', 17400, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001290', '00000000-0000-0000-0000-000000000143', '2024', 18300, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001291', '00000000-0000-0000-0000-000000000144', '2018', 1.21, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001292', '00000000-0000-0000-0000-000000000144', '2019', 1.35, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001293', '00000000-0000-0000-0000-000000000144', '2020', 1.12, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001294', '00000000-0000-0000-0000-000000000144', '2021', 1.43, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001295', '00000000-0000-0000-0000-000000000144', '2022', 1.67, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001296', '00000000-0000-0000-0000-000000000144', '2023', 1.82, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001297', '00000000-0000-0000-0000-000000000144', '2024', 1.95, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001298', '00000000-0000-0000-0000-000000000145', '2016', 1, '2016')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001299', '00000000-0000-0000-0000-000000000145', '2018', 3, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001300', '00000000-0000-0000-0000-000000000145', '2020', 5, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001301', '00000000-0000-0000-0000-000000000145', '2024', 6, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001302', '00000000-0000-0000-0000-000000000146', '2018', 13.2, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001303', '00000000-0000-0000-0000-000000000146', '2019', 18.4, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001304', '00000000-0000-0000-0000-000000000146', '2020', 23.8, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001305', '00000000-0000-0000-0000-000000000146', '2021', 33.7, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001306', '00000000-0000-0000-0000-000000000146', '2022', 42.5, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001307', '00000000-0000-0000-0000-000000000146', '2023', 50.2, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001308', '00000000-0000-0000-0000-000000000146', '2024', 57.8, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001309', '00000000-0000-0000-0000-000000000147', '2018', 21, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001310', '00000000-0000-0000-0000-000000000147', '2019', 27, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001311', '00000000-0000-0000-0000-000000000147', '2020', 40, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001312', '00000000-0000-0000-0000-000000000147', '2021', 53, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001313', '00000000-0000-0000-0000-000000000147', '2022', 59, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001314', '00000000-0000-0000-0000-000000000147', '2023', 65, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001315', '00000000-0000-0000-0000-000000000147', '2024', 72, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001316', '00000000-0000-0000-0000-000000000148', '2018', 130, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001317', '00000000-0000-0000-0000-000000000148', '2019', 160, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001318', '00000000-0000-0000-0000-000000000148', '2020', 175.3, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001319', '00000000-0000-0000-0000-000000000148', '2021', 191.3, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001320', '00000000-0000-0000-0000-000000000148', '2022', 204.2, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001321', '00000000-0000-0000-0000-000000000148', '2023', 212.8, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001322', '00000000-0000-0000-0000-000000000148', '2024', 219.5, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001323', '00000000-0000-0000-0000-000000000149', '2018', 49.3, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001324', '00000000-0000-0000-0000-000000000149', '2019', 67.5, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001325', '00000000-0000-0000-0000-000000000149', '2020', 87.5, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001326', '00000000-0000-0000-0000-000000000149', '2021', 123, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001327', '00000000-0000-0000-0000-000000000149', '2022', 154, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001328', '00000000-0000-0000-0000-000000000149', '2023', 181, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001329', '00000000-0000-0000-0000-000000000149', '2024', 206.4, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001330', '00000000-0000-0000-0000-000000000150', '2018', 4, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001331', '00000000-0000-0000-0000-000000000150', '2019', 6, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001332', '00000000-0000-0000-0000-000000000150', '2020', 7, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001333', '00000000-0000-0000-0000-000000000150', '2021', 8, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001334', '00000000-0000-0000-0000-000000000150', '2022', 8, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001335', '00000000-0000-0000-0000-000000000150', '2023', 7, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001336', '00000000-0000-0000-0000-000000000150', '2024', 6, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001337', '00000000-0000-0000-0000-000000000151', '2018', 1286, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001338', '00000000-0000-0000-0000-000000000151', '2019', 1401.5, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001339', '00000000-0000-0000-0000-000000000151', '2020', 1243.8, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001340', '00000000-0000-0000-0000-000000000151', '2021', 1459.2, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001341', '00000000-0000-0000-0000-000000000151', '2022', 1786.4, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001342', '00000000-0000-0000-0000-000000000151', '2023', 1923.7, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001343', '00000000-0000-0000-0000-000000000151', '2024', 2058.3, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001344', '00000000-0000-0000-0000-000000000152', '2018', 142, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001345', '00000000-0000-0000-0000-000000000152', '2019', 141, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001346', '00000000-0000-0000-0000-000000000152', '2020', 140, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001347', '00000000-0000-0000-0000-000000000152', '2021', 138, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001348', '00000000-0000-0000-0000-000000000152', '2022', 137, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001349', '00000000-0000-0000-0000-000000000152', '2023', 135, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001350', '00000000-0000-0000-0000-000000000152', '2024', 133, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001351', '00000000-0000-0000-0000-000000000153', '2018', 115, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001352', '00000000-0000-0000-0000-000000000153', '2019', 148, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001353', '00000000-0000-0000-0000-000000000153', '2020', 113, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001354', '00000000-0000-0000-0000-000000000153', '2021', 247, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001355', '00000000-0000-0000-0000-000000000153', '2022', 191, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001356', '00000000-0000-0000-0000-000000000153', '2023', 124, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001357', '00000000-0000-0000-0000-000000000153', '2024', 156, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001358', '00000000-0000-0000-0000-000000000154', '2018', 32400, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001359', '00000000-0000-0000-0000-000000000154', '2019', 34100, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001360', '00000000-0000-0000-0000-000000000154', '2020', 35200, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001361', '00000000-0000-0000-0000-000000000154', '2021', 36800, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001362', '00000000-0000-0000-0000-000000000154', '2022', 38500, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001363', '00000000-0000-0000-0000-000000000154', '2023', 40200, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001364', '00000000-0000-0000-0000-000000000154', '2024', 41800, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001365', '00000000-0000-0000-0000-000000000155', '2018', 1847, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001366', '00000000-0000-0000-0000-000000000155', '2019', 1912, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001367', '00000000-0000-0000-0000-000000000155', '2020', 1876, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001368', '00000000-0000-0000-0000-000000000155', '2021', 1938, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001369', '00000000-0000-0000-0000-000000000155', '2022', 2015, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001370', '00000000-0000-0000-0000-000000000155', '2023', 2087, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001371', '00000000-0000-0000-0000-000000000155', '2024', 2143, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001372', '00000000-0000-0000-0000-000000000156', '2018', 589, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001373', '00000000-0000-0000-0000-000000000156', '2019', 625, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001374', '00000000-0000-0000-0000-000000000156', '2020', 652, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001375', '00000000-0000-0000-0000-000000000156', '2021', 679, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001376', '00000000-0000-0000-0000-000000000156', '2022', 711, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001377', '00000000-0000-0000-0000-000000000156', '2023', 738, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001378', '00000000-0000-0000-0000-000000000156', '2024', 765, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001379', '00000000-0000-0000-0000-000000000157', '2015', 1, '2015')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001380', '00000000-0000-0000-0000-000000000157', '2018', 1, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001381', '00000000-0000-0000-0000-000000000157', '2020', 1, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001382', '00000000-0000-0000-0000-000000000157', '2022', 1, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001383', '00000000-0000-0000-0000-000000000157', '2024', 1, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001384', '00000000-0000-0000-0000-000000000158', '2018', 2.48, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001385', '00000000-0000-0000-0000-000000000158', '2019', 2.63, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001386', '00000000-0000-0000-0000-000000000158', '2020', 2.72, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001387', '00000000-0000-0000-0000-000000000158', '2021', 2.84, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001388', '00000000-0000-0000-0000-000000000158', '2022', 3.05, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001389', '00000000-0000-0000-0000-000000000158', '2023', 3.21, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001390', '00000000-0000-0000-0000-000000000158', '2024', 3.44, '2024')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001391', '00000000-0000-0000-0000-000000000158', '2025', 3.62, '2025')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001392', '00000000-0000-0000-0000-000000000159', '2018', 68.83, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001393', '00000000-0000-0000-0000-000000000159', '2019', 68.93, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001394', '00000000-0000-0000-0000-000000000159', '2020', 67.41, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001395', '00000000-0000-0000-0000-000000000159', '2021', 67.84, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001396', '00000000-0000-0000-0000-000000000159', '2022', 68.51, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001397', '00000000-0000-0000-0000-000000000159', '2023', 69.12, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001398', '00000000-0000-0000-0000-000000000159', '2024', 69.45, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001399', '00000000-0000-0000-0000-000000000160', '2018', 133.55, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001400', '00000000-0000-0000-0000-000000000160', '2019', 135.57, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001401', '00000000-0000-0000-0000-000000000160', '2020', 133.04, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001402', '00000000-0000-0000-0000-000000000160', '2021', 134.66, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001403', '00000000-0000-0000-0000-000000000160', '2022', 137.33, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001404', '00000000-0000-0000-0000-000000000160', '2023', 139.95, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001405', '00000000-0000-0000-0000-000000000160', '2024', 142.03, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001406', '00000000-0000-0000-0000-000000000161', '2018', 4.47, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001407', '00000000-0000-0000-0000-000000000161', '2019', 4.64, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001408', '00000000-0000-0000-0000-000000000161', '2020', 5.23, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001409', '00000000-0000-0000-0000-000000000161', '2021', 5.02, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001410', '00000000-0000-0000-0000-000000000161', '2022', 4.92, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001411', '00000000-0000-0000-0000-000000000161', '2023', 4.71, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001412', '00000000-0000-0000-0000-000000000161', '2024', 4.52, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001413', '00000000-0000-0000-0000-000000000162', '2018', 452000, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001414', '00000000-0000-0000-0000-000000000162', '2019', 468000, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001415', '00000000-0000-0000-0000-000000000162', '2020', 482000, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001416', '00000000-0000-0000-0000-000000000162', '2021', 498000, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001417', '00000000-0000-0000-0000-000000000162', '2022', 513000, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001418', '00000000-0000-0000-0000-000000000162', '2023', 528000, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001419', '00000000-0000-0000-0000-000000000162', '2024', 541000, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001420', '00000000-0000-0000-0000-000000000163', '2018', 2.3, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001421', '00000000-0000-0000-0000-000000000163', '2019', 2.8, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001422', '00000000-0000-0000-0000-000000000163', '2020', 5.6, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001423', '00000000-0000-0000-0000-000000000163', '2021', 4.2, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001424', '00000000-0000-0000-0000-000000000163', '2022', 3.5, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001425', '00000000-0000-0000-0000-000000000163', '2023', 3.8, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001426', '00000000-0000-0000-0000-000000000163', '2024', 4.1, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001427', '00000000-0000-0000-0000-000000000164', '2018', 120, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001428', '00000000-0000-0000-0000-000000000164', '2019', 250, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001429', '00000000-0000-0000-0000-000000000164', '2020', 890, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001430', '00000000-0000-0000-0000-000000000164', '2021', 720, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001431', '00000000-0000-0000-0000-000000000164', '2022', 580, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001432', '00000000-0000-0000-0000-000000000164', '2023', 640, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001433', '00000000-0000-0000-0000-000000000164', '2024', 710, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001434', '00000000-0000-0000-0000-000000000165', '2018', 249, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001435', '00000000-0000-0000-0000-000000000165', '2019', 264, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001436', '00000000-0000-0000-0000-000000000165', '2020', 233.5, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001437', '00000000-0000-0000-0000-000000000165', '2021', 328.2, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001438', '00000000-0000-0000-0000-000000000165', '2022', 368.3, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001439', '00000000-0000-0000-0000-000000000165', '2023', 401.7, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001440', '00000000-0000-0000-0000-000000000165', '2024', 432, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001441', '00000000-0000-0000-0000-000000000166', '2018', 465000, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001442', '00000000-0000-0000-0000-000000000166', '2019', 512000, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001443', '00000000-0000-0000-0000-000000000166', '2020', 328000, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001444', '00000000-0000-0000-0000-000000000166', '2021', 389000, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001445', '00000000-0000-0000-0000-000000000166', '2022', 534000, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001446', '00000000-0000-0000-0000-000000000166', '2023', 598000, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001447', '00000000-0000-0000-0000-000000000166', '2024', 642000, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001448', '00000000-0000-0000-0000-000000000167', '2018', 3.9, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001449', '00000000-0000-0000-0000-000000000167', '2019', 4.1, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001450', '00000000-0000-0000-0000-000000000167', '2020', 4.2, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001451', '00000000-0000-0000-0000-000000000167', '2021', 4.4, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001452', '00000000-0000-0000-0000-000000000167', '2022', 4.7, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001453', '00000000-0000-0000-0000-000000000167', '2023', 5, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001454', '00000000-0000-0000-0000-000000000167', '2024', 5.3, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001455', '00000000-0000-0000-0000-000000000168', '2018', 7.26, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001456', '00000000-0000-0000-0000-000000000168', '2019', 6.93, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001457', '00000000-0000-0000-0000-000000000168', '2020', 8.33, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001458', '00000000-0000-0000-0000-000000000168', '2021', 7.79, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001459', '00000000-0000-0000-0000-000000000168', '2022', 6.72, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001460', '00000000-0000-0000-0000-000000000168', '2023', 5.98, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001461', '00000000-0000-0000-0000-000000000168', '2024', 5.45, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001462', '00000000-0000-0000-0000-000000000169', '2018', 180000, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001463', '00000000-0000-0000-0000-000000000169', '2019', 230000, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001464', '00000000-0000-0000-0000-000000000169', '2020', 310000, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001465', '00000000-0000-0000-0000-000000000169', '2021', 395000, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001466', '00000000-0000-0000-0000-000000000169', '2022', 480000, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001467', '00000000-0000-0000-0000-000000000169', '2023', 550000, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001468', '00000000-0000-0000-0000-000000000169', '2024', 620000, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001469', '00000000-0000-0000-0000-000000000170', '2018', 114.5, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001470', '00000000-0000-0000-0000-000000000170', '2019', 112.8, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001471', '00000000-0000-0000-0000-000000000170', '2020', 116.2, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001472', '00000000-0000-0000-0000-000000000170', '2021', 113.7, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001473', '00000000-0000-0000-0000-000000000170', '2022', 111.4, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001474', '00000000-0000-0000-0000-000000000170', '2023', 109.8, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001475', '00000000-0000-0000-0000-000000000170', '2024', 108.2, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001476', '00000000-0000-0000-0000-000000000171', '2018', 610000, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001477', '00000000-0000-0000-0000-000000000171', '2019', 645000, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001478', '00000000-0000-0000-0000-000000000171', '2020', 582000, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001479', '00000000-0000-0000-0000-000000000171', '2021', 618000, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001480', '00000000-0000-0000-0000-000000000171', '2022', 671000, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001481', '00000000-0000-0000-0000-000000000171', '2023', 698000, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001482', '00000000-0000-0000-0000-000000000171', '2024', 723000, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001483', '00000000-0000-0000-0000-000000000172', '2018', 0.3, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001484', '00000000-0000-0000-0000-000000000172', '2019', 0.5, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001485', '00000000-0000-0000-0000-000000000172', '2020', 1.2, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001486', '00000000-0000-0000-0000-000000000172', '2021', 1.6, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001487', '00000000-0000-0000-0000-000000000172', '2022', 1.4, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001488', '00000000-0000-0000-0000-000000000172', '2023', 1.3, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001489', '00000000-0000-0000-0000-000000000172', '2024', 1.2, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001490', '00000000-0000-0000-0000-000000000173', '2018', 13.5, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001491', '00000000-0000-0000-0000-000000000173', '2019', 14.2, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001492', '00000000-0000-0000-0000-000000000173', '2020', 13.8, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001493', '00000000-0000-0000-0000-000000000173', '2021', 14, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001494', '00000000-0000-0000-0000-000000000173', '2022', 13.6, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001495', '00000000-0000-0000-0000-000000000173', '2023', 13.4, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001496', '00000000-0000-0000-0000-000000000173', '2024', 13.2, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001497', '00000000-0000-0000-0000-000000000174', '2018', 20, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001498', '00000000-0000-0000-0000-000000000174', '2019', 20, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001499', '00000000-0000-0000-0000-000000000174', '2020', 18, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001500', '00000000-0000-0000-0000-000000000174', '2021', 23, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001501', '00000000-0000-0000-0000-000000000174', '2022', 23, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001502', '00000000-0000-0000-0000-000000000174', '2023', 20, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001503', '00000000-0000-0000-0000-000000000174', '2024', 21, '2024')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001504', '00000000-0000-0000-0000-000000000174', '2025', 20, '2025')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001505', '00000000-0000-0000-0000-000000000175', '2018', 0.389, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001506', '00000000-0000-0000-0000-000000000175', '2019', 0.382, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001507', '00000000-0000-0000-0000-000000000175', '2020', 0.381, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001508', '00000000-0000-0000-0000-000000000175', '2021', 0.378, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001509', '00000000-0000-0000-0000-000000000175', '2022', 0.373, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001510', '00000000-0000-0000-0000-000000000175', '2023', 0.369, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001511', '00000000-0000-0000-0000-000000000175', '2024', 0.365, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001512', '00000000-0000-0000-0000-000000000176', '2018', 9.66, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001513', '00000000-0000-0000-0000-000000000176', '2019', 9.41, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001514', '00000000-0000-0000-0000-000000000176', '2020', 10.19, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001515', '00000000-0000-0000-0000-000000000176', '2021', 10.14, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001516', '00000000-0000-0000-0000-000000000176', '2022', 9.57, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001517', '00000000-0000-0000-0000-000000000176', '2023', 9.36, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001518', '00000000-0000-0000-0000-000000000176', '2024', 9.03, '2024')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001519', '00000000-0000-0000-0000-000000000176', '2025', 8.8, '2025')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001520', '00000000-0000-0000-0000-000000000177', '2018', 533509, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001521', '00000000-0000-0000-0000-000000000177', '2019', 556193, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001522', '00000000-0000-0000-0000-000000000177', '2020', 574946, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001523', '00000000-0000-0000-0000-000000000177', '2021', 590362, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001524', '00000000-0000-0000-0000-000000000177', '2022', 636937, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001525', '00000000-0000-0000-0000-000000000177', '2023', 655523, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001526', '00000000-0000-0000-0000-000000000177', '2024', 687456, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001527', '00000000-0000-0000-0000-000000000178', 'Atta Halilintar', 37000000, 'Atta Halilintar')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001528', '00000000-0000-0000-0000-000000000178', 'Ria Ricis', 33000000, 'Ria Ricis')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001529', '00000000-0000-0000-0000-000000000178', 'Deddy Corbuzier', 28000000, 'Deddy Corbuzier')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001530', '00000000-0000-0000-0000-000000000178', 'Chandra Liow', 21000000, 'Chandra Liow')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001531', '00000000-0000-0000-0000-000000000178', 'Ewing HD', 18000000, 'Ewing HD')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001532', '00000000-0000-0000-0000-000000000179', '2019', 2, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001533', '00000000-0000-0000-0000-000000000179', '2020', 12.8, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001534', '00000000-0000-0000-0000-000000000179', '2021', 22.4, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001535', '00000000-0000-0000-0000-000000000179', '2022', 31.7, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001536', '00000000-0000-0000-0000-000000000179', '2023', 38.5, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001537', '00000000-0000-0000-0000-000000000179', '2024', 44.2, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001538', '00000000-0000-0000-0000-000000000180', '2018', 1.2, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001539', '00000000-0000-0000-0000-000000000180', '2019', 2.3, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001540', '00000000-0000-0000-0000-000000000180', '2020', 4.5, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001541', '00000000-0000-0000-0000-000000000180', '2021', 6.8, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001542', '00000000-0000-0000-0000-000000000180', '2022', 8.4, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001543', '00000000-0000-0000-0000-000000000180', '2023', 10.2, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001544', '00000000-0000-0000-0000-000000000180', '2024', 12.5, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001545', '00000000-0000-0000-0000-000000000181', '2018', 56, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001546', '00000000-0000-0000-0000-000000000181', '2019', 65, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001547', '00000000-0000-0000-0000-000000000181', '2020', 78.5, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001548', '00000000-0000-0000-0000-000000000181', '2021', 86, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001549', '00000000-0000-0000-0000-000000000181', '2022', 92.3, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001550', '00000000-0000-0000-0000-000000000181', '2023', 98.1, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001551', '00000000-0000-0000-0000-000000000181', '2024', 103.4, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001552', '00000000-0000-0000-0000-000000000182', '2018', 64.6, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001553', '00000000-0000-0000-0000-000000000182', '2019', 66.2, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001554', '00000000-0000-0000-0000-000000000182', '2020', 67.8, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001555', '00000000-0000-0000-0000-000000000182', '2021', 69.1, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001556', '00000000-0000-0000-0000-000000000182', '2022', 70.7, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001557', '00000000-0000-0000-0000-000000000182', '2023', 72.1, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001558', '00000000-0000-0000-0000-000000000182', '2024', 73.5, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001559', '00000000-0000-0000-0000-000000000183', '2018', 4856, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001560', '00000000-0000-0000-0000-000000000183', '2019', 4732, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001561', '00000000-0000-0000-0000-000000000183', '2020', 4581, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001562', '00000000-0000-0000-0000-000000000183', '2021', 4438, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001563', '00000000-0000-0000-0000-000000000183', '2022', 4283, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001564', '00000000-0000-0000-0000-000000000183', '2023', 4147, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001565', '00000000-0000-0000-0000-000000000183', '2024', 4025, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001566', '00000000-0000-0000-0000-000000000184', '2018', 28400, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001567', '00000000-0000-0000-0000-000000000184', '2019', 29100, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001568', '00000000-0000-0000-0000-000000000184', '2020', 29800, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001569', '00000000-0000-0000-0000-000000000184', '2021', 30200, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001570', '00000000-0000-0000-0000-000000000184', '2022', 31500, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001571', '00000000-0000-0000-0000-000000000184', '2023', 32800, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001572', '00000000-0000-0000-0000-000000000184', '2024', 33400, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001573', '00000000-0000-0000-0000-000000000185', '2018', 19.2, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001574', '00000000-0000-0000-0000-000000000185', '2019', 20.1, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001575', '00000000-0000-0000-0000-000000000185', '2020', 21.4, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001576', '00000000-0000-0000-0000-000000000185', '2021', 22, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001577', '00000000-0000-0000-0000-000000000185', '2022', 22.8, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001578', '00000000-0000-0000-0000-000000000185', '2023', 23.5, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001579', '00000000-0000-0000-0000-000000000185', '2024', 24.1, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001580', '00000000-0000-0000-0000-000000000186', '2018', 480000, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001581', '00000000-0000-0000-0000-000000000186', '2019', 530000, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001582', '00000000-0000-0000-0000-000000000186', '2020', 270000, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001583', '00000000-0000-0000-0000-000000000186', '2021', 203000, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001584', '00000000-0000-0000-0000-000000000186', '2022', 187000, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001585', '00000000-0000-0000-0000-000000000186', '2023', 163000, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001586', '00000000-0000-0000-0000-000000000186', '2024', 145000, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001587', '00000000-0000-0000-0000-000000000187', '2018', 856, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001588', '00000000-0000-0000-0000-000000000187', '2019', 869, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001589', '00000000-0000-0000-0000-000000000187', '2020', 797, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001590', '00000000-0000-0000-0000-000000000187', '2021', 848, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001591', '00000000-0000-0000-0000-000000000187', '2022', 878, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001592', '00000000-0000-0000-0000-000000000187', '2023', 894, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001593', '00000000-0000-0000-0000-000000000187', '2024', 910, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001594', '00000000-0000-0000-0000-000000000188', '2018', 12.6, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001595', '00000000-0000-0000-0000-000000000188', '2019', 13.2, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001596', '00000000-0000-0000-0000-000000000188', '2020', 13.9, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001597', '00000000-0000-0000-0000-000000000188', '2021', 14.5, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001598', '00000000-0000-0000-0000-000000000188', '2022', 15.2, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001599', '00000000-0000-0000-0000-000000000188', '2023', 16.1, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001600', '00000000-0000-0000-0000-000000000188', '2024', 17, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001601', '00000000-0000-0000-0000-000000000189', '2018', 124.6, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001602', '00000000-0000-0000-0000-000000000189', '2019', 124.1, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001603', '00000000-0000-0000-0000-000000000189', '2020', 123.8, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001604', '00000000-0000-0000-0000-000000000189', '2021', 123.4, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001605', '00000000-0000-0000-0000-000000000189', '2022', 123, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001606', '00000000-0000-0000-0000-000000000189', '2023', 122.7, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001607', '00000000-0000-0000-0000-000000000189', '2024', 122.4, '2024')
ON CONFLICT DO NOTHING;

INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001608', '00000000-0000-0000-0000-000000000190', '2018', 6.8, '2018')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001609', '00000000-0000-0000-0000-000000000190', '2019', 6.4, '2019')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001610', '00000000-0000-0000-0000-000000000190', '2020', 5.9, '2020')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001611', '00000000-0000-0000-0000-000000000190', '2021', 5.5, '2021')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001612', '00000000-0000-0000-0000-000000000190', '2022', 5.1, '2022')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001613', '00000000-0000-0000-0000-000000000190', '2023', 4.8, '2023')
ON CONFLICT DO NOTHING;
INSERT INTO data_points (id, dataset_id, period, value, label) VALUES
  ('00000000-0000-0000-0000-000000001614', '00000000-0000-0000-0000-000000000190', '2024', 4.5, '2024')
ON CONFLICT DO NOTHING;

-- ============================================================
-- QA ITEMS
-- ============================================================

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002001', 'ekonomi-01', 'Kenapa harga sembako naik terus?', 'Harga sembako naik terus dipengaruhi oleh inflasi yang terjadi setiap tahun. Menurut BPS, inflasi nasional pada tahun 2024 tercatat sekitar 1,81%, dan pada awal 2025 turun menjadi 1,51%. Meskipun angkanya terlihat kecil, dampaknya terasa signifikan bagi masyarakat berpenghasilan rendah karena harga kebutuhan pokok seperti beras, minyak goreng, dan gula naik lebih cepat dari rata-rata inflasi. World Bank mencatat bahwa Indonesia mengalami tekanan inflasi pangan yang lebih tinggi dibanding inflasi umum, terutama akibat gangguan pasokan dan cuaca ekstrem. Selain itu, biaya transportasi dan energi yang turut naik turut mendorong harga barang di pasaran.', 'Ekonomi', 'BPS & World Bank', 'https://www.bps.go.id/id/3/varmenu/inflasi.html', '[{"label":"Inflasi nasional 2024","value":"1,81%","source":"BPS"},{"label":"Inflasi Januari 2025","value":"1,51% YoY","source":"BPS"},{"label":"Inflasi pangan 2024","value":"sekitar 3,2%","source":"BPS"},{"label":"Pangsa belanja pangan dari pengeluaran rumah tangga miskin","value":"~45%","source":"BPS Susenas"}]', '{"ekonomi-02","ekonomi-04","ekonomi-05"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002002', 'ekonomi-02', 'Berapa pendapatan per kapita Indonesia dibanding negara lain?', 'Pendapatan per kapita Indonesia berdasarkan data BPS tahun 2024 mencapai sekitar Rp 78,2 juta per tahun atau setara sekitar USD 4.900. World Bank mencatat Indonesia berada di kategori negara berpenghasilan menengah atas (upper-middle income). Namun, jika dibandingkan dengan negara tetangga seperti Malaysia (sekitar USD 12.500), Thailand (sekitar USD 7.300), dan Vietnam (sekitar USD 4.300), Indonesia masih tertinggal dari Malaysia dan Thailand. Keunggulan Indonesia terletak pada ukuran ekonomi yang besar (PDB nominal > USD 1,4 triliun), namun penduduk yang sangat besar (280 juta) membuat pendapatan per kapita menjadi relatif rendah.', 'Ekonomi', 'BPS & World Bank', 'https://data.worldbank.org/indicator/NY.GDP.PCAP.CD?locations=ID-MY-TH-VN-PH', '[{"label":"Pendapatan per kapita Indonesia 2024","value":"~USD 4.900","source":"BPS"},{"label":"Malaysia 2024","value":"~USD 12.500","source":"World Bank"},{"label":"Thailand 2024","value":"~USD 7.300","source":"World Bank"},{"label":"Vietnam 2024","value":"~USD 4.300","source":"World Bank"},{"label":"Filipina 2024","value":"~USD 3.600","source":"World Bank"}]', '{"ekonomi-05","ekonomi-03","sosial-01"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002003', 'ekonomi-03', 'Apakah utang Indonesia berbahaya?', 'Rasio utang pemerintah terhadap PDB Indonesia per akhir tahun 2024 tercatat sekitar 39,6% menurut Kementerian Keuangan. Angka ini masih jauh di bawah batas aman yang ditetapkan oleh undang-undang yaitu 60% PDB, dan juga di bawah rata-rata negara ASEAN yang mencapai sekitar 55% PDB menurut IMF. Bahkan, jika dibandingkan secara global, banyak negara maju memiliki rasio utang jauh lebih tinggi: Jepang lebih dari 260%, AS lebih dari 120%, dan Italia sekitar 140% PDB. Yang perlu diperhatikan adalah struktur utang Indonesia didominasi oleh Surat Berharga Negara (SBN) yang sebagian besar dimiliki oleh investor domestik, sehingga risiko capital flight lebih terkendali.', 'Ekonomi', 'Kemenkeu & IMF', 'https://www.kemenkeu.go.id/informasi-publik/data-apa-saja', '[{"label":"Rasio utang terhadap PDB Indonesia 2024","value":"~39,6%","source":"Kemenkeu"},{"label":"Batas aman UU","value":"60% PDB","source":"UU 17/2003"},{"label":"Rata-rata utang ASEAN (IMF)","value":"~55% PDB","source":"IMF WEO"},{"label":"Jepang","value":">260% PDB","source":"IMF"},{"label":"Porsi SBN yang dimilik investor domestik","value":"~60%","source":"Kemenkeu"}]', '{"ekonomi-02","ekonomi-04","ekonomi-05"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002004', 'ekonomi-04', 'Kenapa Rupiah melemah terhadap Dolar?', 'Pelemahan Rupiah terhadap Dolar AS dipengaruhi oleh beberapa faktor utama. Pertama, perbedaan suku bunga antara AS dan Indonesia — ketika The Fed menaikkan suku bunga, modal asing cenderung keluar dari Indonesia menuju aset berdenominasi Dolar. Bank Indonesia mencatat aliran keluar modal portofolio dari pasar SBN mencapai ratusan triliun Rupiah selama periode kenaikan suku bunga The Fed 2022-2023. Kedua, defisit neraca berjalan Indonesia yang melebar akibat harga komoditas yang turun dan kebutuhan impor energi. Ketiga, sentimen global seperti ketidakpastian kebijakan ekonomi AS dan konflik geopolitik turut memberikan tekanan. Bank Indonesia aktif melakukan intervensi di pasar valas menggunakan cadangan devisa untuk menahan pelemahan Rupiah yang terlalu cepat.', 'Ekonomi', 'Bank Indonesia', 'https://www.bi.go.id/id/statistik/informasi-kurs.aspx', '[{"label":"Cadangan devisa Desember 2024","value":"USD 155,7 miliar","source":"BI"},{"label":"Suku bunga acuan BI (2024)","value":"6,00%","source":"BI"},{"label":"Suku bunga The Fed (2024)","value":"5,25-5,50%","source":"Fed"},{"label":"Pelemahan Rupiah 2024","value":"~3-5% YoY","source":"BI JISDOR"}]', '{"ekonomi-01","ekonomi-03","ekonomi-05"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002005', 'ekonomi-05', 'Seberapa kaya Indonesia dibanding negara tetangga?', 'Dalam hal PDB nominal, Indonesia adalah negara terbesar di Asia Tenggara dengan PDB sekitar USD 1,4 triliun pada tahun 2024 menurut World Bank. Ini jauh lebih besar dari Malaysia (~USD 400 miliar), Thailand (~USD 520 miliar), Filipina (~USD 440 miliar), dan Vietnam (~USD 430 miliar). Namun, ketika diukur per kapita, ceritanya berbeda. Malaysia memiliki pendapatan per kapita lebih dari dua kali lipat Indonesia, dan Thailand juga masih lebih tinggi. Keunggulan Indonesia terletak pada sumber daya alam yang melimpah, pasar domestik yang sangat besar, dan posisi strategis di jalur perdagangan internasional.', 'Ekonomi', 'BPS & World Bank', 'https://data.worldbank.org/indicator/NY.GDP.MKTP.CD?locations=ID-MY-TH-VN-PH', '[{"label":"PDB Indonesia 2024","value":"~USD 1,4 triliun","source":"BPS"},{"label":"PDB Malaysia 2024","value":"~USD 400 miliar","source":"World Bank"},{"label":"PDB Thailand 2024","value":"~USD 520 miliar","source":"World Bank"},{"label":"PDB Vietnam 2024","value":"~USD 430 miliar","source":"World Bank"},{"label":"PDB Filipina 2024","value":"~USD 440 miliar","source":"World Bank"}]', '{"ekonomi-02","ekonomi-03","sosial-01"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002006', 'kesehatan-01', 'Berapa lama harapan hidup orang Indonesia?', 'Menurut data BPS tahun 2024, harapan hidup rata-rata penduduk Indonesia saat lahir mencapai sekitar 71,8 tahun. Artinya, bayi yang baru lahir pada tahun tersebut diperkirakan akan hidup rata-rata hingga usia 71-72 tahun jika pola kematian saat itu tetap konstan. Angka ini mengalami penurunan drastis pada tahun 2021 akibat pandemi COVID-19 (turun ke 69,4 tahun), namun telah pulih kembali. WHO mencatat bahwa angka ini masih lebih rendah dari negara ASEAN lain seperti Thailand (78,7 tahun), Malaysia (76,2 tahun), dan Vietnam (75,4 tahun). Faktor utama yang membatasi harapan hidup Indonesia adalah tingginya angka kematian ibu dan bayi, prevalensi penyakit tidak menular, serta akses kesehatan yang belum merata di daerah terpencil.', 'Kesehatan', 'BPS & WHO', 'https://www.bps.go.id/id/3/varmenu/harapan-hidup.html', '[{"label":"Harapan hidup Indonesia 2024","value":"71,8 tahun","source":"BPS"},{"label":"Harapan hidup Thailand","value":"78,7 tahun","source":"WHO"},{"label":"Harapan hidup Malaysia","value":"76,2 tahun","source":"WHO"},{"label":"Harapan hidup Vietnam","value":"75,4 tahun","source":"WHO"},{"label":"Penurunan akibat COVID-19 (2021)","value":"69,4 tahun","source":"BPS"}]', '{"kesehatan-02","kesehatan-04","kesehatan-05"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002007', 'kesehatan-02', 'Apakah Indonesia kekurangan dokter?', 'Indonesia memang mengalami kekurangan dokter jika dibandingkan dengan standar WHO. Rasio dokter Indonesia mencapai sekitar 6,4 per 10.000 penduduk pada tahun 2024 menurut data Kemenkes. WHO merekomendasikan minimal 10 dokter per 10.000 penduduk untuk sistem kesehatan yang memadai. Artinya, Indonesia masih kekurangan sekitar 100.000 dokter. Situasi ini semakin parah di daerah terpencil dan pedalaman, di mana banyak kabupaten yang rasionya bahkan di bawah 3 dokter per 10.000 penduduk. Masalah lainnya adalah distribusi dokter yang tidak merata — sebagian besar dokter praktik di kota-kota besar seperti Jakarta, Surabaya, dan Bandung, sementara daerah di Papua, NTT, dan Maluku kekurangan tenaga medis.', 'Kesehatan', 'Kemenkes & WHO', 'https://www.kemkes.go.id/profil-kesehatan/', '[{"label":"Rasio dokter Indonesia per 10.000 penduduk","value":"6,4","source":"Kemenkes"},{"label":"Rekomendasi WHO per 10.000 penduduk","value":"10","source":"WHO"},{"label":"Kekurangan dokter","value":"~100.000 orang","source":"Kalkulasi dari Kemenkes"},{"label":"Rasio perawat per 10.000 penduduk","value":"~28","source":"Kemenkes"},{"label":"Jumlah rumah sakit 2024","value":"3.896","source":"Kemenkes"}]', '{"kesehatan-01","kesehatan-03","kesehatan-04"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002008', 'kesehatan-03', 'Bagaimana kualitas air minum di Indonesia?', 'Akses terhadap air minum yang layak di Indonesia masih menjadi tantangan besar. Kementerian Kesehatan mencatat bahwa pada tahun 2024, sekitar 67% rumah tangga memiliki akses air minum layak (menggunakan layanan PDAM, bor, atau sumur terlindungi), sementara sisanya masih mengandalkan sumber air yang berisiko tercemar. Badan Pusat Statistik mencatat bahwa kualitas air minum di beberapa daerah masih mengandung kontaminan seperti E. coli dan logam berat. WHO menetapkan bahwa air minum yang aman harus bebas dari bakteri fecal dan bahan kimia berbahaya. Di kota-kota besar, PDAM masih sering mempermasalahkan kualitas air baku yang tercemar limbah industri dan domestik.', 'Kesehatan', 'KLHK & WHO', 'https://www.who.int/data/gho/data/indicators', '[{"label":"Akses air minum layak nasional 2024","value":"~67%","source":"Kemenkes"},{"label":"Akses air minum layak di perkotaan","value":"~82%","source":"BPS"},{"label":"Akses air minum layak di pedesaan","value":"~49%","source":"BPS"},{"label":"Persentase air limbah yang diolah dengan aman","value":"~3%","source":"WHO/UNICEF JMP"}]', '{"kesehatan-01","lingkungan-03","lingkungan-02"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002009', 'kesehatan-04', 'Berapa angka kematian ibu melahirkan di Indonesia?', 'Angka Kematian Ibu (AKI) Indonesia pada tahun 2023 tercatat sekitar 177 per 100.000 kelahiran hidup menurut survei Kemenkes. Angka ini menurun dibandingkan tahun 2018 yang mencapai 289 per 100.000 kelahiran, namun masih jauh dari target Sustainable Development Goals (SDGs) yaitu kurang dari 70 per 100.000 kelahiran. UNICEF mencatat bahwa penyebab utama kematian ibu di Indonesia adalah perdarahan pasca persalinan, hipertensi dalam kehamilan, dan infeksi. Ketimpangan akses layanan kesehatan antara daerah perkotaan dan pedesaan menjadi faktor utama, di mana banyak ibu hamil di daerah terpencil tidak mendapat pemeriksaan kehamilan yang memadai.', 'Kesehatan', 'Kemenkes & UNICEF', 'https://www.unicef.org/indonesia/id/program/kesehatan', '[{"label":"AKI Indonesia 2023","value":"177 per 100.000 kelahiran","source":"Kemenkes"},{"label":"AKI Indonesia 2018","value":"289 per 100.000 kelahiran","source":"Kemenkes"},{"label":"Target SDGs","value":"<70 per 100.000 kelahiran","source":"UN"},{"label":"Persentase persalinan dengan tenaga kesehatan","value":"~93%","source":"Kemenkes"},{"label":"AKI Malaysia","value":"~21 per 100.000 kelahiran","source":"WHO"}]', '{"kesehatan-01","kesehatan-02","kesehatan-05"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002010', 'kesehatan-05', 'Apakah gizi buruk masih jadi masalah di Indonesia?', 'Ya, gizi buruk dan stunting masih menjadi masalah serius di Indonesia meskipun angkanya terus menurun. Menurut data Kemenkes tahun 2024, prevalensi stunting pada balita mencapai 17,8%, turun dari 30,8% pada tahun 2018. Meskipun ini adalah kemajuan yang signifikan, Indonesia masih memiliki beban stunting tertinggi ketiga di dunia menurut WHO setelah India dan Nigeria dalam hal jumlah absolut. Selain stunting, masalah gizi lain yang masih mengkhawatirkan adalah wasting (kurus pendek) yang mencapai sekitar 7,2% pada balita, dan gizi mikro seperti anemia yang menyerang sekitar 32% ibu hamil. Badan Pangan Nasional mencatat bahwa sekitar 21,6% balita di Indonesia masih mengalami stunting berdasarkan data Riskesdas.', 'Kesehatan', 'BPS & WHO', 'https://www.who.int/data/gho/data/indicators', '[{"label":"Prevalensi stunting 2024","value":"17,8%","source":"Kemenkes"},{"label":"Prevalensi stunting 2018","value":"30,8%","source":"Kemenkes"},{"label":"Prevalensi wasting balita","value":"~7,2%","source":"Riskesdas"},{"label":"Anemia pada ibu hamil","value":"~32%","source":"Kemenkes"},{"label":"Target Nasional Stunting 2024","value":"14%","source":"Bappenas"}]', '{"kesehatan-01","kesehatan-04","sosial-01"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002011', 'pendidikan-01', 'Bagaimana peringkat pendidikan Indonesia di dunia?', 'Peringkat pendidikan Indonesia di level internasional masih cukup rendah. Dalam PISA (Programme for International Student Assessment) tahun 2022 yang dirilis oleh OECD, Indonesia menempati posisi ke-68 dari 81 negara partisipan. Skor rata-rata Indonesia dalam membaca adalah 359, matematika 366, dan sains 383 — semuanya jauh di bawah rata-rata OECD yang mencapai sekitar 476. Di tingkat ASEAN, Indonesia berada di bawah Singapura (yang masuk 5 besar dunia), Malaysia, Thailand, dan Brunei. Kemendikbudristek telah meluncurkan berbagai program reformasi seperti Kurikulum Merdeka untuk meningkatkan kualitas pendidikan, namun tantangan utamanya adalah kualitas guru yang belum merata dan fasilitas sekolah yang kurang memadai di daerah terpencil.', 'Pendidikan', 'Kemendikbud & OECD', 'https://www.oecd.org/en/publications/pisa-2022-results-volume-i_85f070f4-en.html', '[{"label":"Peringkat Indonesia PISA 2022","value":"ke-68 dari 81 negara","source":"OECD"},{"label":"Skor membaca PISA 2022","value":"359 (OECD avg: 476)","source":"OECD"},{"label":"Skor matematika PISA 2022","value":"366 (OECD avg: 472)","source":"OECD"},{"label":"Skor sains PISA 2022","value":"383 (OECD avg: 485)","source":"OECD"},{"label":"Angka melek huruf 2024","value":"97,35%","source":"BPS"}]', '{"pendidikan-02","pendidikan-03","pendidikan-04"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002012', 'pendidikan-02', 'Berapa lulusan SMA yang lanjut ke universitas?', 'Angka Partisipasi Murni (APM) jenjang pendidikan tinggi di Indonesia pada tahun 2024 mencapai sekitar 36,5% menurut data BPS. Artinya, dari 100 lulusan SMA/SMK, hanya sekitar 36-37 orang yang melanjutkan ke perguruan tinggi. Angka ini memang naik dibandingkan tahun 2018 yang hanya sekitar 28%, namun masih jauh di bawah negara-negara maju seperti Korea Selatan (~70%) dan Jepang (~64%). Di antara yang melanjutkan, sekitar 60% masuk ke universitas negeri dan sisanya ke universitas swasta. Tantangan utama adalah biaya pendidikan tinggi yang tinggi, terutama bagi keluarga dari kalangan menengah ke bawah. Meskipun ada program Kartu Indonesia Pintar (KIP) Kuliah, daya tampung terbatas.', 'Pendidikan', 'BPS', 'https://www.bps.go.id/id/3/varmenu/partisipasi-pendidikan.html', '[{"label":"APM pendidikan tinggi 2024","value":"~36,5%","source":"BPS"},{"label":"APM pendidikan tinggi 2018","value":"~28%","source":"BPS"},{"label":"APM SMA/SMK 2024","value":"~93,88%","source":"BPS"},{"label":"Jumlah perguruan tinggi 2024","value":"4.628","source":"Kemendikbud"},{"label":"Daya tampung PTN per tahun","value":"~600.000","source":"Kemendikbud"}]', '{"pendidikan-01","pendidikan-03","pendidikan-05"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002013', 'pendidikan-03', 'Apakah siswa Indonesia bisa membaca dengan baik?', 'Berdasarkan hasil PISA 2022 dari OECD, kemampuan membaca siswa Indonesia rata-rata mencapai skor 359, yang jauh di bawah rata-rata OECD sebesar 476. Skor ini menempatkan Indonesia di peringkat yang sangat rendah secara global. Dalam konteks ini, berarti sebagian besar siswa Indonesia SMA hanya mampu membaca teks sederhana namun kesulitan memahami teks yang lebih kompleks, menarik kesimpulan, atau mengidentifikasi argumen. Program Literasi Nasional dan Gerakan Literasi Sekolah telah diluncurkan oleh Kemendikbud, namun kebiasaan membaca di kalangan pelajar masih rendah. Data Perpustakaan Nasional mencatat bahwa rata-rata orang Indonesia hanya membaca 3-5 buku per tahun, jauh di bawah negara seperti Jepang yang mencapai 25-30 buku per tahun.', 'Pendidikan', 'OECD & Kemendikbud', 'https://www.oecd.org/en/publications/pisa-2022-results-volume-i_85f070f4-en.html', '[{"label":"Skor literasi membaca Indonesia PISA 2022","value":"359","source":"OECD"},{"label":"Rata-rata OECD","value":"476","source":"OECD"},{"label":"Rata-rata buku dibaca per tahun (Indonesia)","value":"3-5 buku","source":"Perpusnas"},{"label":"Rata-rata buku dibaca per tahun (Jepang)","value":"25-30 buku","source":"Perpusnas"},{"label":"Rasio buku per penduduk","value":"~0,3 eksemplar","source":"Perpusnas"}]', '{"pendidikan-01","pendidikan-02","pendidikan-04"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002014', 'pendidikan-04', 'Bagaimana kualitas universitas Indonesia di dunia?', 'Berdasarkan QS World University Rankings 2025, Universitas Indonesia (UI) menempati peringkat 237 secara global, menjadikannya universitas terbaik di Indonesia. Universitas Gadjah Mada (UGM) berada di peringkat 257, Institut Teknologi Bandung (ITB) di peringkat 259, dan Universitas Airlangga di peringkat 408. Meskipun ada peningkatan dari tahun-tahun sebelumnya, belum ada universitas Indonesia yang masuk 100 besar dunia. Bandingkan dengan Singapura yang memiliki NUS (peringkat 8) dan NTU (peringkat 15), atau Malaysia yang memiliki Universiti Malaya (peringkat 60). Tantangan utama universitas Indonesia adalah kurangnya pembiayaan penelitian, rendahnya jumlah publikasi internasional, dan masih rendahnya reputasi akademik global.', 'Pendidikan', 'QS & Kemendikbud', 'https://www.topuniversities.com/world-university-rankings', '[{"label":"Peringkat Universitas Indonesia (UI)","value":"237 dunia","source":"QS 2025"},{"label":"Peringkat UGM","value":"257 dunia","source":"QS 2025"},{"label":"Peringkat ITB","value":"259 dunia","source":"QS 2025"},{"label":"Peringkat NUS Singapura","value":"8 dunia","source":"QS 2025"},{"label":"Jumlah perguruan tinggi di Indonesia","value":"4.628","source":"Kemendikbud"}]', '{"pendidikan-01","pendidikan-02","pendidikan-05"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002015', 'pendidikan-05', 'Berapa biaya pendidikan di Indonesia dibanding negara lain?', 'Biaya pendidikan di Indonesia bervariasi sangat jauh tergantung jenjang dan jenis sekolah. Untuk universitas negeri, SPP berkisar antara Rp 500.000 hingga Rp 10 juta per semester tergantung program studi dan universitas. Biaya kuliah S1 rata-rata di universitas negeri sekitar Rp 30-50 juta per tahun. Bandingkan dengan universitas negeri di Amerika Serikat yang rata-rata mencapai USD 10.000-35.000 per tahun (Rp 150-530 juta), atau di Australia sekitar AUD 20.000-45.000 per tahun (Rp 200-450 juta). Namun, World Bank mencatat bahwa biaya pendidikan di Indonesia relatif mahal dibandingkan dengan kemampuan membayar masyarakat. Rasio biaya pendidikan terhadap pengeluaran rumah tangga di Indonesia mencapai sekitar 15-20% untuk keluarga kelas menengah.', 'Pendidikan', 'World Bank & Kemendikbud', 'https://datatopics.worldbank.org/education/', '[{"label":"SPP universitas negeri Indonesia per semester","value":"Rp 500rb - Rp 10 juta","source":"Kemendikbud"},{"label":"Rata-rata biaya kuliah S1 per tahun (Indonesia)","value":"Rp 30-50 juta","source":"Kemendikbud"},{"label":"Biaya kuliah per tahun (AS negeri)","value":"USD 10.000-35.000","source":"College Board"},{"label":"Biaya kuliah per tahun (Australia)","value":"AUD 20.000-45.000","source":"QS"},{"label":"Rasio biaya pendidikan terhadap pengeluaran rumah tangga","value":"15-20%","source":"World Bank"}]', '{"pendidikan-01","pendidikan-02","pendidikan-04"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002016', 'lingkungan-01', 'Seberapa parah deforestasi di Indonesia?', 'Deforestasi di Indonesia masih menjadi masalah serius meskipun angkanya mengalami penurunan dalam beberapa tahun terakhir. Data KLHK mencatat bahwa pada tahun 2023, laju kehilangan tutupan pohon mencapai sekitar 163.000 hektar per tahun, turun drastis dari 480.000 hektar pada tahun 2018. Namun, Global Forest Watch mencatat angka yang sedikit lebih tinggi karena menggunakan metode berbeda. Penyebab utama deforestasi adalah konversi lahan untuk perkebunan kelapa sawit, pertambangan, dan perluasan area pertanian. Indonesia masih memiliki sekitar 92 juta hektar hutan primer, menjadikannya salah satu negara dengan hutan hujan tropis terluas di dunia. Komitmen pemerintah untuk moratorium hutan baru dan program penurunan emisi FOLU Net Sink 2030 diharapkan dapat terus mengurangi laju deforestasi.', 'Lingkungan', 'KLHK & Global Forest Watch', 'https://www.globalforestwatch.org/dashboards/country/IDN/', '[{"label":"Laju deforestasi 2023","value":"163.000 hektar/tahun","source":"KLHK"},{"label":"Laju deforestasi 2018","value":"480.000 hektar/tahun","source":"KLHK"},{"label":"Luas hutan primer tersisa","value":"~92 juta hektar","source":"KLHK"},{"label":"Penurunan laju deforestasi 2018-2023","value":"~66%","source":"KLHK"},{"label":"Target FOLU Net Sink","value":"2030","source":"BAPPENAS"}]', '{"lingkungan-02","lingkungan-04","lingkungan-05"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002017', 'lingkungan-02', 'Apakah Indonesia penyumbang sampah laut terbesar?', 'Indonesia secara konsisten masuk dalam lima besar negara penyumbang sampah plastik ke laut terbesar di dunia bersama China, Filipina, Vietnam, dan India menurut laporan Ocean Conservancy. KLHK memperkirakan Indonesia menghasilkan sekitar 6,8 juta ton sampah plastik per tahun pada tahun 2018, dan sekitar 4,5 juta ton di antaranya berpotensi masuk ke laut. Namun, angka ini terus menurun berkat berbagai kebijakan seperti pelarangan kantong plastik di beberapa daerah, program Daur Ulang, dan kampanye pengurangan plastik sekali pakai. Menurut studi yang diterbitkan di jurnal Science, kontribusi Indonesia terhadap sampah plastik laut global mencapai sekitar 10%, meskipun persentase ini mulai menurun dalam beberapa tahun terakhir.', 'Lingkungan', 'Ocean Conservancy & KLHK', 'https://oceanconservancy.org/trash-free-seas/international-coastal-cleanup/', '[{"label":"Total sampah plastik Indonesia per tahun","value":"~4,5 juta ton","source":"KLHK"},{"label":"Peringkat global sampah laut","value":"Top 5 dunia","source":"Ocean Conservancy"},{"label":"Persentase sampah laut global dari Indonesia","value":"~10%","source":"Science Journal"},{"label":"Sampah plastik yang didaur ulang","value":"~12%","source":"KLHK"}]', '{"lingkungan-01","lingkungan-03","lingkungan-04"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002018', 'lingkungan-03', 'Bagaimana kualitas udara di kota-kota besar Indonesia?', 'Kualitas udara di kota-kota besar Indonesia bervariasi namun umumnya masih dalam kategori tidak sehat untuk kelompok sensitif. IQAir mencatat bahwa Jakarta secara konsisten memiliki indeks kualitas udara (AQI) rata-rata di atas 100, yang berarti kategori tidak sehat bagi kelompok sensitif. Kebakaran hutan dan lahan (karhutla) di Kalimantan dan Sumatera setiap tahun memperburuk kualitas udara di beberapa wilayah. Selain itu, polusi kendaraan bermotor di Jakarta menjadi kontributor utama, dengan emisi dari kendaraan bermotor menyumbang sekitar 30% polusi udara di ibu kota. KLHK telah menetapkan baku mutu udara ambien, namun banyak kota yang masih melampaui batas ambang untuk polutan seperti PM2.5 dan NO2.', 'Lingkungan', 'IQAir & KLHK', 'https://www.iqair.com/indonesia', '[{"label":"AQI rata-rata Jakarta 2024","value":">100 (Tidak Sehat)","source":"IQAir"},{"label":"Kontribusi kendaraan terhadap polusi Jakarta","value":"~30%","source":"KLHK"},{"label":"Kota dengan kualitas udara terburuk","value":"Jakarta, Medan, Palembang","source":"IQAir"},{"label":"PM2.5 rata-rata Jakarta","value":"~30-40 µg/m³","source":"IQAir"},{"label":"Standar WHO PM2.5 tahunan","value":"5 µg/m³","source":"WHO"}]', '{"lingkungan-01","lingkungan-04","lingkungan-05"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002019', 'lingkungan-04', 'Berapa emisi karbon Indonesia dibanding dunia?', 'Indonesia merupakan salah satu negara dengan emisi gas rumah kaca terbesar di dunia. Data BAPPENAS mencatat bahwa total emisi gas rumah kaca Indonesia pada tahun 2023 mencapai sekitar 894 juta ton CO2e (setara CO2). Indonesia menempati peringkat ke-6 atau ke-7 sebagai negara penyumbang emisi terbesar di dunia menurut Our World in Data, di belakang China, AS, India, Rusia, dan Jepang. Namun, jika diukur per kapita, emisi Indonesia jauh lebih rendah yaitu sekitar 3,2 ton CO2 per orang per tahun, dibanding AS yang mencapai 14,9 ton dan China 8,9 ton. Sektor yang paling banyak berkontribusi adalah FOLU (Forestry and Other Land Use) dan energi. Pemerintah Indonesia telah berkomitmen untuk mencapai Net Zero Emissions pada tahun 2060.', 'Lingkungan', 'BAPPENAS & Our World in Data', 'https://ourworldindata.org/co2-emissions', '[{"label":"Total emisi Indonesia 2023","value":"894 juta ton CO2e","source":"BAPPENAS"},{"label":"Peringkat global emisi","value":"Ke-6 atau ke-7","source":"Our World in Data"},{"label":"Emisi per kapita Indonesia","value":"~3,2 ton CO2/orang/tahun","source":"Our World in Data"},{"label":"Emisi per kapita AS","value":"~14,9 ton CO2/orang/tahun","source":"Our World in Data"},{"label":"Target Net Zero Emissions Indonesia","value":"2060","source":"BAPPENAS"}]', '{"lingkungan-01","lingkungan-05","lingkungan-02"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002020', 'lingkungan-05', 'Apakah energi terbarukan sudah banyak digunakan di Indonesia?', 'Pangsa energi terbarukan di Indonesia masih relatif rendah meskipun terus meningkat. Menurut data Kementerian ESDM tahun 2024, pangsa energi terbarukan dari total bauran energi primer mencapai sekitar 17%, naik dari 12,6% pada tahun 2018. Mayoritas bauran energi terbarukan Indonesia masih berasal dari pembangkit listrik tenaga air (hydro) dan biomassa, sementara energi surya dan angin masih sangat kecil kontribusinya. IRENA mencatat bahwa Indonesia memiliki potensi energi terbarukan yang sangat besar, terutama energi surya (rata-rata radiasi matahari tinggi), panas bumi (cadangan terbesar ke-3 dunia), dan energi laut. Namun, tantangannya adalah investasi yang masih rendah, infrastruktur transmisi yang belum memadai, dan masih besarnya subsidi energi fosil.', 'Lingkungan', 'ESDM & IRENA', 'https://www.irena.org/IRENADocuments/Statistical_Profiles/Asia/Indonesia_Asia_RE_SP.pdf', '[{"label":"Pangsa energi terbarukan 2024","value":"17%","source":"ESDM"},{"label":"Pangsa energi terbarukan 2018","value":"12,6%","source":"ESDM"},{"label":"Potensi panas bumi Indonesia","value":"~40% cadangan dunia","source":"ESDM"},{"label":"Target bauran energi terbarukan 2025","value":"23%","source":"ESDM"},{"label":"Investasi energi terbarukan Indonesia 2023","value":"~USD 1,5 miliar","source":"IRENA"}]', '{"lingkungan-04","lingkungan-01","lingkungan-03"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002021', 'digital-01', 'Seberapa canggih internet di Indonesia?', 'Internet di Indonesia sudah sangat meluas namun masih menghadapi tantangan kualitas. Menurut laporan We Are Social & Meltwater tahun 2025, jumlah pengguna internet di Indonesia mencapai sekitar 213 juta jiwa atau sekitar 77% dari total penduduk. Penetrasi media sosial juga sangat tinggi dengan lebih dari 219 juta pengguna aktif media sosial. Namun, Kominfo mencatat bahwa kesenjangan digital antara perkotaan dan pedesaan masih cukup besar — penetrasi internet di perkotaan mencapai 85% sementara di pedesaan baru sekitar 58%. Kecepatan internet rata-rata masih di bawah rata-rata global menurut Speedtest Global Index, meskipun jaringan 5G telah mulai diluncurkan di kota-kota besar seperti Jakarta, Surabaya, dan Bandung.', 'Digital & Teknologi', 'We Are Social & Kominfo', 'https://datareportal.com/reports/digital-2025-indonesia', '[{"label":"Pengguna internet Indonesia 2025","value":"~213 juta","source":"We Are Social"},{"label":"Penetrasi internet","value":"~77%","source":"We Are Social"},{"label":"Pengguna media sosial","value":"~219 juta","source":"DataReportal"},{"label":"Penetrasi internet perkotaan","value":"~85%","source":"Kominfo"},{"label":"Penetrasi internet pedesaan","value":"~58%","source":"Kominfo"}]', '{"digital-02","digital-04","digital-05"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002022', 'digital-02', 'Berapa pengguna e-commerce di Indonesia?', 'Indonesia adalah salah satu pasar e-commerce terbesar di dunia. Laporan Google-Temasek-Bain e-Conomy SEA tahun 2024 mencatat bahwa jumlah pengguna e-commerce aktif di Indonesia mencapai sekitar 210 juta jiwa. Total nilai transaksi e-commerce (GMV) Indonesia mencapai sekitar USD 72 miliar pada tahun 2024, menjadikannya pasar e-commerce terbesar di Asia Tenggara. Platform e-commerce terpopuler termasuk Tokopedia (yang bergabung dengan TikTok Shop), Shopee, Lazada, dan Bukalapak. Penetrasi e-commerce terus meningkat terutama setelah pandemi COVID-19 yang mempercepat transformasi digital. Menariknya, transaksi e-commerce tidak hanya terjadi di kota-kota besar tetapi juga semakin merambah ke daerah tier 2 dan tier 3.', 'Digital & Teknologi', 'Google-Temasek-Bain', 'https://www.bain.com/insights/e-conomy-sea-2024/', '[{"label":"Pengguna e-commerce aktif 2024","value":"~210 juta","source":"Google-Temasek-Bain"},{"label":"GMV e-commerce Indonesia 2024","value":"~USD 72 miliar","source":"Google-Temasek-Bain"},{"label":"Pertumbuhan GMV YoY","value":"~15%","source":"Google-Temasek-Bain"},{"label":"Rata-rata transaksi per pengguna","value":"~USD 340/tahun","source":"Google-Temasek-Bain"}]', '{"digital-01","digital-04","digital-05"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002023', 'digital-03', 'Apakah Indonesia bisa bersaing di bidang AI?', 'Indonesia memiliki potensi besar di bidang AI namun masih tertinggal dari negara-negara maju. Stanford AI Index Report 2024 mencatat bahwa Indonesia belum masuk dalam 20 besar negara dengan investasi AI terbesar. Namun, Kominfo mencatat bahwa jumlah startup AI di Indonesia tumbuh pesat dari sekitar 200 pada tahun 2020 menjadi lebih dari 500 pada tahun 2024. Keunggulan Indonesia adalah pasar yang besar dan kebutuhan spesifik seperti Bahasa Indonesia untuk Natural Language Processing (NLP). Beberapa perusahaan Indonesia seperti GoTo dan Tokopedia telah mengembangkan AI untuk personalisasi dan chatbot. Tantangan utama adalah keterbatasan tenaga ahli AI, infrastruktur komputasi yang belum memadai, dan masih rendahnya anggaran penelitian AI dari pemerintah.', 'Digital & Teknologi', 'Stanford AI Index & Kominfo', 'https://aiindex.stanford.edu/report/', '[{"label":"Jumlah startup AI di Indonesia 2024","value":">500","source":"Kominfo"},{"label":"Investasi global AI 2023","value":"~USD 68 miliar","source":"Stanford AI Index"},{"label":"Porsi investasi AI Indonesia dari ASEAN","value":"~15%","source":"Kominfo"},{"label":"Kebutuhan ahli AI di Indonesia","value":"~10.000","source":"Kominfo"}]', '{"digital-01","digital-04","digital-05"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002024', 'digital-04', 'Bagaimana kecepatan internet Indonesia dibanding ASEAN?', 'Kecepatan internet Indonesia masih tertinggal dibandingkan beberapa negara ASEAN lain. Berdasarkan Speedtest Global Index oleh Ookla tahun 2024, kecepatan internet rata-rata Indonesia (fixed broadband) mencapai sekitar 30-35 Mbps untuk download, sementara Singapura mencapai 250+ Mbps, Thailand sekitar 180 Mbps, dan Malaysia sekitar 100 Mbps. Untuk mobile internet, Indonesia mencapai sekitar 25-30 Mbps, sedangkan Singapura mencapai 50+ Mbps dan Thailand sekitar 40 Mbps. Kominfo terus memperluas jaringan fiber optik dan menara telekomunikasi ke daerah-daerah terpencil melalui program Palapa Ring dan USO (Universal Service Obligation). Peluncuran jaringan 5G di kota-kota besar juga diharapkan meningkatkan kecepatan internet secara signifikan.', 'Digital & Teknologi', 'Speedtest Global Index & Kominfo', 'https://www.speedtest.net/global-index/indonesia', '[{"label":"Kecepatan download fixed broadband Indonesia","value":"~30-35 Mbps","source":"Speedtest"},{"label":"Kecepatan download fixed broadband Singapura","value":"~250+ Mbps","source":"Speedtest"},{"label":"Kecepatan download fixed broadband Thailand","value":"~180 Mbps","source":"Speedtest"},{"label":"Kecepatan download mobile Indonesia","value":"~25-30 Mbps","source":"Speedtest"},{"label":"Cakupan jaringan Palapa Ring","value":"100% kabupaten/kota","source":"Kominfo"}]', '{"digital-01","digital-02","digital-03"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002025', 'digital-05', 'Berapa startup unicorn di Indonesia?', 'Indonesia memiliki jumlah startup unicorn (perusahaan rintisan bernilai lebih dari USD 1 miliar) terbanyak di Asia Tenggara. Menurut data BEHAVA.id dan CB Insights tahun 2024, Indonesia memiliki sekitar 6-7 unicorn aktif, termasuk GoTo (Gojek + Tokopedia), Traveloka, Bukalapak, Dana, Xendit, dan Blu (Bank BCA Digital). Jumlah ini sempat mencapai 8 pada tahun 2021-2022, namun beberapa telah merger atau turun valuasinya. Total valuasi unicorn Indonesia mencapai lebih dari USD 30 miliar. Indonesia juga memiliki beberapa decacorn (startup bernilai >USD 10 miliar) seperti GoTo. Ekosistem startup Indonesia terus berkembang meskipun mengalami masa sulit pada 2022-2023 akibat global tech downturn, dan mulai pulih pada 2024 dengan meningkatnya aktivitas venture capital.', 'Digital & Teknologi', 'CB Insights & BEHAVA.id', 'https://behava.id/research/', '[{"label":"Jumlah unicorn Indonesia 2024","value":"6-7 perusahaan","source":"BEHAVA.id"},{"label":"Total valuasi unicorn Indonesia","value":">USD 30 miliar","source":"CB Insights"},{"label":"Unicorn terbesar berdasarkan valuasi","value":"GoTo","source":"CB Insights"},{"label":"Jumlah deal VC di Indonesia 2024","value":"156 deal","source":"DealStreetAsia"}]', '{"digital-01","digital-02","digital-03"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002026', 'sosial-01', 'Berapa penduduk miskin di Indonesia?', 'Jumlah penduduk miskin di Indonesia terus mengalami penurunan dalam beberapa tahun terakhir. BPS mencatat bahwa pada Maret 2024, tingkat kemiskinan nasional mencapai 9,03% atau sekitar 25,28 juta jiwa dari total 280 juta penduduk. Angka ini turun dibandingkan tahun 2018 yang mencapai 9,66% dan tahun 2020 yang sempat naik ke 10,19% akibat pandemi COVID-19. World Bank mencatat bahwa Indonesia telah berhasil mengeluarkan jutaan orang dari garis kemiskinan dalam dua dekade terakhir berkat program pengentasan kemiskinan seperti Program Keluarga Harapan (PKH) dan Bantuan Pangan Non Tunai (BPNT). Namun, garis kemiskinan nasional yang ditetapkan BPS pada tahun 2024 mencapai Rp 687.456 per kapita per bulan, yang berarti mereka yang berpenghasilan di bawah angka tersebut dikategorikan miskin.', 'Sosial & Demografi', 'BPS & World Bank', 'https://www.bps.go.id/id/3/varmenu/kemiskinan.html', '[{"label":"Tingkat kemiskinan Maret 2024","value":"9,03% (25,28 juta jiwa)","source":"BPS"},{"label":"Tingkat kemiskinan 2018","value":"9,66%","source":"BPS"},{"label":"Tingkat kemiskinan 2020 (COVID)","value":"10,19%","source":"BPS"},{"label":"Garis kemiskinan 2024","value":"Rp 687.456/kapita/bulan","source":"BPS"},{"label":"Penurunan kemiskinan ekstrem 2015-2024","value":"~75%","source":"World Bank"}]', '{"sosial-02","sosial-03","ekonomi-02"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002027', 'sosial-02', 'Bagaimana kesenjangan pendapatan di Indonesia?', 'Kesenjangan pendapatan di Indonesia diukur menggunakan rasio GINI, yang menurut BPS tahun 2024 mencapai 0,365 (turun dari 0,389 pada tahun 2018). Angka ini menunjukkan bahwa kesenjangan pendapatan di Indonesia relatif moderat dibandingkan dengan negara-negara seperti Brazil (0,53) atau Afrika Selatan (0,63), namun masih lebih tinggi dari negara-negara Skandinavia (sekitar 0,25-0,28). World Bank mencatat bahwa 10% penduduk terkaya di Indonesia menguasai sekitar 42% total pendapatan nasional, sementara 40% penduduk terbawah hanya menguasai sekitar 17%. Kesenjangan antara wilayah juga signifikan — pendapatan per kapita di DKI Jakarta hampir tiga kali lipat dari NTT atau Papua. Program redistribusi lahan dan pembangunan infrastruktur di luar Jawa menjadi strategi utama pemerintah untuk mengurangi kesenjangan.', 'Sosial & Demografi', 'BPS & World Bank', 'https://data.worldbank.org/indicator/SI.POV.GINI?locations=ID', '[{"label":"Rasio GINI Indonesia 2024","value":"0,365","source":"BPS"},{"label":"Porsi pendapatan 10% terkaya","value":"~42%","source":"BPS"},{"label":"Porsi pendapatan 40% terbawah","value":"~17%","source":"BPS"},{"label":"GINI Brazil","value":"0,53","source":"World Bank"},{"label":"Rasio GINI Indonesia 2018","value":"0,389","source":"BPS"}]', '{"sosial-01","sosial-03","ekonomi-02"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002028', 'sosial-03', 'Berapa pengangguran lulusan baru?', 'Tingkat pengangguran terbuka di Indonesia pada tahun 2024 mencapai 4,91% menurut data BPS, yang berarti sekitar 7,67 juta orang dari total angkatan kerja. Yang mengkhawatirkan adalah pengangguran terdidik — lulusan diploma dan sarjana menyumbang sekitar 4,52% dari total pengangguran pada tahun 2024. ILO (International Labour Organization) mencatat bahwa youth unemployment (pengangguran usia 15-24 tahun) di Indonesia mencapai sekitar 14-16%, jauh lebih tinggi dari rata-rata nasional. Banyak lulusan baru yang kesulitan mendapatkan pekerjaan karena ketidaksesuaian antara keterampilan yang dimiliki dengan kebutuhan pasar kerja. Program Kartu Prakerja telah melatih jutaan peserta, namun dampaknya terhadap penurunan pengangguran masih perlu dievaluasi lebih lanjut.', 'Sosial & Demografi', 'BPS & ILO', 'https://www.bps.go.id/id/3/varmenu/pengangguran.html', '[{"label":"Tingkat pengangguran terbuka 2024","value":"4,91%","source":"BPS"},{"label":"Total pengangguran 2024","value":"~7,67 juta","source":"BPS"},{"label":"Youth unemployment (15-24 tahun)","value":"~14-16%","source":"ILO"},{"label":"Pengangguran terdidik (D3/S1+)","value":"4,52%","source":"BPS"},{"label":"Peserta Kartu Prakerja yang telah dilatih","value":">20 juta","source":"Manpres"}]', '{"sosial-01","sosial-02","ekonomi-02"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002029', 'sosial-04', 'Bagaimana Status Gender di Indonesia?', 'Gender Inequality Index (GII) Indonesia menurut UNDP tahun 2024 mencapai 0,400, menempatkan Indonesia di peringkat 97 dari 193 negara. Meskipun ini merupakan peningkatan dari tahun 2018 (0,446), kesenjangan gender masih cukup signifikan. Partisipasi tenaga kerja perempuan di Indonesia mencapai sekitar 53%, jauh di bawah laki-laki yang mencapai 82%. Di sektor pendidikan, kesenjangan gender sudah relatif kecil dengan angka melek huruf perempuan mencapai 96,4% dibanding laki-laki 97,7%. Namun, di sektor politik, perempuan baru menguasai sekitar 21% kursi DPR. Kemajuan terlihat dari meningkatnya akses perempuan terhadap pendidikan tinggi — saat ini perempuan bahkan sudah melebihi laki-laki dalam hal partisipasi pendidikan tinggi.', 'Sosial & Demografi', 'UNDP & BPS', 'https://hdr.undp.org/data-center/country-insights#/ranks', '[{"label":"GII Indonesia 2024","value":"0,400 (peringkat 97)","source":"UNDP"},{"label":"Partisipasi tenaga kerja perempuan","value":"~53%","source":"BPS"},{"label":"Partisipasi tenaga kerja laki-laki","value":"~82%","source":"BPS"},{"label":"Kursi perempuan di DPR","value":"~21%","source":"KPU"},{"label":"Kesenjangan angka melek huruf","value":"1,3%","source":"BPS"}]', '{"sosial-01","sosial-02","sosial-03"}', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO qa_items (id, slug, question, answer, category, source, source_url, data_points, related_slugs, is_published) VALUES
  ('00000000-0000-0000-0000-000000002030', 'sosial-05', 'Berapa penduduk Indonesia yang punya akses listrik?', 'Akses listrik di Indonesia telah meningkat signifikan dalam satu dekade terakhir. Kementerian ESDM mencatat bahwa pada tahun 2024, rasio elektrifikasi nasional mencapai 99,4%, artinya hampir seluruh rumah tangga di Indonesia sudah terhubung ke jaringan listrik. Ini merupakan pencapaian luar biasa dibandingkan tahun 2014 yang hanya sekitar 88,3%. World Bank juga mencatat bahwa Indonesia merupakan salah satu negara yang paling berhasil dalam hal ekspansi akses listrik di Asia. Namun, meskipun akses listrik sudah merata, masih ada masalah terkait keandalan pasokan listrik — beberapa daerah masih mengalami pemadaman listrik secara berkala, terutama di luar Jawa. Selain itu, biaya listrik di Indonesia masih relatif murah berkat subsidi pemerintah, namun ini menjadi beban bagi PLN dan APBN.', 'Sosial & Demografi', 'ESDM & World Bank', 'https://data.worldbank.org/indicator/EG.ELC.ACCS.ZS?locations=ID', '[{"label":"Rasio elektrifikasi nasional 2024","value":"99,4%","source":"ESDM"},{"label":"Rasio elektrifikasi 2014","value":"88,3%","source":"ESDM"},{"label":"Rasio desa berlistrik 2024","value":"~100%","source":"ESDM"},{"label":"Kapasitas terpasang PLN 2024","value":"~82 GW","source":"PLN"},{"label":"Porsi energi fosil dalam bauran listrik","value":"~80%","source":"ESDM"}]', '{"lingkungan-05","sosial-01","sosial-02"}', TRUE)
ON CONFLICT DO NOTHING;

-- ============================================================
-- FUN FACTS
-- ============================================================

INSERT INTO fun_facts (id, headline, summary, detail, source, source_url, category, icon, is_published, sort_order) VALUES
  ('00000000-0000-0000-0000-000000003001', 'Indonesia punya 17.000 pulau, tapi cuma 6.000 yang berpenghuni', 'Lebih dari 10.000 pulau di Indonesia tidak ada yang menetap di sana.', 'Dari 17.508 pulau yang tercatat, hanya sekitar 6.000 pulau yang berpenghuni. Sisanya masih alami tanpa penduduk tetap. Kalau kamu mengunjungi 1 pulau setiap hari, butuh 48 tahun untuk mengunjungi semuanya.', 'BPS & Kementerian Kelautan', '', 'Geografi', 'Island', TRUE, 1)
ON CONFLICT DO NOTHING;

INSERT INTO fun_facts (id, headline, summary, detail, source, source_url, category, icon, is_published, sort_order) VALUES
  ('00000000-0000-0000-0000-000000003002', 'Jumlah penduduk Indonesia lebih banyak dari seluruh Amerika Serikat Barat', '280 juta orang Indonesia melebihi populasi 25 negara bagian AS digabung.', 'Indonesia dengan 280 juta penduduk adalah negara terbesar ke-4 di dunia. Jumlah ini lebih banyak dari seluruh populasi Amerika Serikat Barat (termasuk California, Texas, dan negara bagian lainnya) yang sekitar 130 juta. Indonesia hanya kalah dari India, China, dan AS.', 'BPS & World Population Review', '', 'Demografi', 'Users', TRUE, 2)
ON CONFLICT DO NOTHING;

INSERT INTO fun_facts (id, headline, summary, detail, source, source_url, category, icon, is_published, sort_order) VALUES
  ('00000000-0000-0000-0000-000000003003', 'Beras Indonesia cukup makan untuk 1,5 miliar orang', 'Produksi beras Indonesia mencapai 54 juta ton per tahun.', 'Indonesia adalah produsen beras terbesar ke-3 di dunia setelah China dan India. Dengan produksi 54 juta ton per tahun, beras Indonesia cukup untuk memberi makan 1,5 miliar orang. Tapi ironisnya, masih ada 27 juta penduduk Indonesia yang kekurangan gizi.', 'Kementan & FAO', '', 'Pertanian', 'Wheat', TRUE, 3)
ON CONFLICT DO NOTHING;

INSERT INTO fun_facts (id, headline, summary, detail, source, source_url, category, icon, is_published, sort_order) VALUES
  ('00000000-0000-0000-0000-000000003004', 'Orang Indonesia menghabiskan 8 jam sehari di internet', 'Rata-rata waktu online masyarakat Indonesia melebihi rata-rata global.', 'Berdasarkan data We Are Social 2025, rata-rata orang Indonesia menghabiskan 8 jam 17 menit per hari di internet — lebih lama dari rata-rata global (6 jam 40 menit). Indonesia masuk dalam 5 negara dengan waktu online terlama di dunia.', 'We Are Social & DataReportal', '', 'Digital', 'Smartphone', TRUE, 4)
ON CONFLICT DO NOTHING;

INSERT INTO fun_facts (id, headline, summary, detail, source, source_url, category, icon, is_published, sort_order) VALUES
  ('00000000-0000-0000-0000-000000003005', 'Indonesia punya 54% cadangan nikel dunia', 'Lebih dari setengah cadangan nikel planet ini ada di Indonesia.', 'Indonesia menguasai 54% cadangan nikel global (sekitar 21 juta ton dari 39 juta ton dunia). Nikel adalah bahan baku utama baterai listrik. Dengan dominasi ini, Indonesia berpotensi menjadi pemain utama dalam revolusi kendaraan listrik global.', 'USGS & Kementerian ESDM', '', 'Sumber Daya', 'Gem', TRUE, 5)
ON CONFLICT DO NOTHING;

INSERT INTO fun_facts (id, headline, summary, detail, source, source_url, category, icon, is_published, sort_order) VALUES
  ('00000000-0000-0000-0000-000000003006', 'Hutan Indonesia menyerap 600 juta ton CO2 per tahun', 'Hutan hujan tropis Indonesia adalah paru-paru dunia kedua setelah Amazon.', 'Hutan hujan tropis Indonesia menyerap sekitar 600 juta ton karbon dioksida per tahun. Ini setara dengan menyerap emisi dari 130 juta mobil. Indonesia memiliki 10% hutan hujan tropis dunia, menjadikannya salah satu penyimpan karbon terbesar di planet ini.', 'KLHK & Global Forest Watch', '', 'Lingkungan', 'TreePine', TRUE, 6)
ON CONFLICT DO NOTHING;

INSERT INTO fun_facts (id, headline, summary, detail, source, source_url, category, icon, is_published, sort_order) VALUES
  ('00000000-0000-0000-0000-000000003007', 'Gaji UMR Jakarta bisa beli 3x lebih banyak nasi goreng di Yogyakarta', 'Selisih biaya hidup antar kota di Indonesia sangat besar.', 'UMR Jakarta 2025 sekitar Rp 5,4 juta. Di Jakarta, uang itu mungkin cukup untuk 1 bulan. Tapi di Yogyakarta dengan UMR Rp 2,1 juta, biaya hidup jauh lebih rendah. Satu porsi nasi goreng di Jakarta Rp 25.000, di Yogya Rp 10.000. Beda daya beli sangat signifikan.', 'Kemnaker & BPS', '', 'Ekonomi', 'TrendingUp', TRUE, 7)
ON CONFLICT DO NOTHING;

INSERT INTO fun_facts (id, headline, summary, detail, source, source_url, category, icon, is_published, sort_order) VALUES
  ('00000000-0000-0000-0000-000000003008', 'Indonesia menghasilkan kopi terbaik dunia, tapi orang Indonesia minum kopi instan', 'Kopi specialty Indonesia dinilai 90+ poin oleh SCA, tapi konsumsi lokal didominai kopi sachet.', 'Kopi Gayo, Toraja, dan Flores dinilai sebagai kopi specialty terbaik dunia dengan skor SCA di atas 85-90. Harga kopi Gayo bisa mencapai Rp 500.000/kg di pasar internasional. Tapi ironisnya, 70% kopi yang dikonsumsi orang Indonesia adalah kopi instan berharga Rp 2.000 per sachet.', 'SCA & AIKI', '', 'Industri', 'Coffee', TRUE, 8)
ON CONFLICT DO NOTHING;

INSERT INTO fun_facts (id, headline, summary, detail, source, source_url, category, icon, is_published, sort_order) VALUES
  ('00000000-0000-0000-0000-000000003009', 'Pulau Jawa hanya 7% luas Indonesia, tapi menampung 56% penduduk', 'Kepadatan penduduk Pulau Jawa 11x lipat dari rata-rata nasional.', 'Pulau Jawa seluas 128.000 km² (7% dari total wilayah Indonesia) menampung 156 juta orang atau 56% penduduk nasional. Kepadatannya mencapai 1.218 orang/km², dibandingkan rata-rata nasional yang hanya 110 orang/km². Ini menjadikan Jawa salah satu pulau terpadat di dunia.', 'BPS', '', 'Demografi', 'MapPin', TRUE, 9)
ON CONFLICT DO NOTHING;

INSERT INTO fun_facts (id, headline, summary, detail, source, source_url, category, icon, is_published, sort_order) VALUES
  ('00000000-0000-0000-0000-000000003010', 'Indonesia adalah produsen kelapa sawit terbesar dunia dengan 47 juta hektar', 'Luas perkebunan sawit Indonesia setara dengan seluruh wilayah Jepang.', 'Indonesia menguasai 58% produksi minyak sawit dunia dengan 47 juta hektar perkebunan. Luas ini setara dengan seluruh wilayah Jepang (378.000 km²). Industri sawit menyumbang 4,5% PDB dan menyerap 16 juta tenaga kerja.', 'Kementan & USDA', '', 'Pertanian', 'TreePine', TRUE, 10)
ON CONFLICT DO NOTHING;

INSERT INTO fun_facts (id, headline, summary, detail, source, source_url, category, icon, is_published, sort_order) VALUES
  ('00000000-0000-0000-0000-000000003011', 'Biaya kuliah S1 di Indonesia 20x lebih murah dari MIT', 'Universitas negeri terbaik Indonesia hanya Rp 5-15 juta/tahun.', 'Biaya kuliah S1 di UI atau ITB sekitar Rp 5-15 juta per tahun (termasuk UKT). Di MIT, biaya kuliahnya mencapai US$ 60.000/tahun (sekitar Rp 960 juta). Artinya, kuliah di ITB 64x lebih murah dari MIT — meski kualitas riset Indonesia terus meningkat.', 'Kemendikbud & MIT', '', 'Pendidikan', 'GraduationCap', TRUE, 11)
ON CONFLICT DO NOTHING;

INSERT INTO fun_facts (id, headline, summary, detail, source, source_url, category, icon, is_published, sort_order) VALUES
  ('00000000-0000-0000-0000-000000003012', 'Indonesia punya 1.340 suku bangsa — lebih banyak dari negara manapun', 'Budaya Indonesia lebih beragam dari seluruh Eropa digabung.', 'Indonesia memiliki 1.340 suku bangsa yang tersebar di 17.000 pulau. Eropa yang memiliki 44 negara hanya sekitar 87 suku bangsa. Indonesia juga memiliki 718 bahasa daerah — menjadikannya salah satu negara paling linguistik beragam di dunia.', 'Kemendikbud & Ethnologue', '', 'Budaya', 'Globe', TRUE, 12)
ON CONFLICT DO NOTHING;

COMMIT;
