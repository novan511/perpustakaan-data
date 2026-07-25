-- Fix broken source_url values in qa_items
-- Generated from URL verification audit

BEGIN;

-- 1. ekonomi-04: BI kurs URL broken (404)
UPDATE qa_items SET source_url = 'https://www.bi.go.id/id/statistik/informasi-kurs.aspx'
WHERE slug = 'ekonomi-04';

-- 2. kesehatan-02: Kemkes PDF broken (404)
UPDATE qa_items SET source_url = 'https://www.kemkes.go.id/profil-kesehatan/'
WHERE slug = 'kesehatan-02';

-- 3. kesehatan-03: WHO drinking water broken (404)
UPDATE qa_items SET source_url = 'https://www.who.int/data/gho/data/indicators'
WHERE slug = 'kesehatan-03';

-- 4. kesehatan-05: WHO stunting broken (404)
UPDATE qa_items SET source_url = 'https://www.who.int/data/gho/data/indicators'
WHERE slug = 'kesehatan-05';

-- 5. pendidikan-01: OECD PISA broken (404)
UPDATE qa_items SET source_url = 'https://www.oecd.org/en/publications/pisa-2022-results-volume-i_85f070f4-en.html'
WHERE slug = 'pendidikan-01';

-- 6. pendidikan-03: OECD PISA broken (same URL as pendidikan-01)
UPDATE qa_items SET source_url = 'https://www.oecd.org/en/publications/pisa-2022-results-volume-i_85f070f4-en.html'
WHERE slug = 'pendidikan-03';

-- 7. kesehatan-04: UNICEF broken (403)
UPDATE qa_items SET source_url = 'https://www.unicef.org/indonesia/id/program/kesehatan'
WHERE slug = 'kesehatan-04';

-- 8. ekonomi-01: BPS inflasi table mismatch → use BPS search
UPDATE qa_items SET source_url = 'https://www.bps.go.id/id/3/varmenu/inflasi.html'
WHERE slug = 'ekonomi-01';

-- 9. kesehatan-01: BPS harapan hidup table unavailable
UPDATE qa_items SET source_url = 'https://www.bps.go.id/id/3/varmenu/harapan-hidup.html'
WHERE slug = 'kesehatan-01';

-- 10. pendidikan-02: BPS APM table mismatch
UPDATE qa_items SET source_url = 'https://www.bps.go.id/id/3/varmenu/partisipasi-pendidikan.html'
WHERE slug = 'pendidikan-02';

-- Now check and fix remaining Q&A items from seed data
-- Read all slugs and fix any other broken BPS URLs

-- kesehatan-01 already fixed above

-- Fix any remaining WHO/OECD/UNICEF broken links
UPDATE qa_items SET source_url = 'https://www.who.int/data/gho/data/indicators'
WHERE source_url LIKE '%who.int/data/gho/data/themes%';

UPDATE qa_items SET source_url = 'https://www.oecd.org/en/publications/pisa-2022-results-volume-i_85f070f4-en.html'
WHERE source_url LIKE '%oecd.org%pisa-2022%' AND source_url NOT LIKE '%85f070f4%';

UPDATE qa_items SET source_url = 'https://www.unicef.org/indonesia/id/program/kesehatan'
WHERE source_url LIKE '%unicef.org/indonesia/id/tema%';

-- Fix BPS table URLs that show "Tabel Tidak Tersedia"
UPDATE qa_items SET source_url = 'https://www.bps.go.id/id/3/varmenu/inflasi.html'
WHERE source_url LIKE '%MTczNiMy%inflasi%';

UPDATE qa_items SET source_url = 'https://www.bps.go.id/id/3/varmenu/harapan-hidup.html'
WHERE source_url LIKE '%MTY4NiMy%harapan-hidup%';

UPDATE qa_items SET source_url = 'https://www.bps.go.id/id/3/varmenu/partisipasi-pendidikan.html'
WHERE source_url LIKE '%MTQ4MiMy%angka-partisipasi%';

UPDATE qa_items SET source_url = 'https://www.bps.go.id/id/3/varmenu/kemiskinan.html'
WHERE source_url LIKE '%MjIzIzE=/tingkat-kemiskinan%';

UPDATE qa_items SET source_url = 'https://www.bps.go.id/id/3/varmenu/pengangguran.html'
WHERE source_url LIKE '%MTEwNyMy%tingkat-pengangguran%';

-- Fix BI broken URLs
UPDATE qa_items SET source_url = 'https://www.bi.go.id/id/statistik/informasi-kurs.aspx'
WHERE source_url LIKE '%bi.go.id%kurs%value-default%';

-- Fix Kemkes broken URLs
UPDATE qa_items SET source_url = 'https://www.kemkes.go.id/profil-kesehatan/'
WHERE source_url LIKE '%kemkes.go.id%resources%download%statistik%';

COMMIT;
