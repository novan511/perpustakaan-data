export interface QAItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  source: string;
  sourceUrl: string;
  dataPoints: Array<{ label: string; value: string; source: string }>;
  relatedQuestions?: string[];
}

export const qaData: QAItem[] = [
  // ─────────────────────────────────────────────
  // EKONOMI
  // ─────────────────────────────────────────────
  {
    id: "ekonomi-01",
    category: "Ekonomi",
    question: "Kenapa harga sembako naik terus?",
    answer:
      "Harga sembako naik terus dipengaruhi oleh inflasi yang terjadi setiap tahun. Menurut BPS, inflasi nasional pada tahun 2024 tercatat sekitar 1,81%, dan pada awal 2025 turun menjadi 1,51%. Meskipun angkanya terlihat kecil, dampaknya terasa signifikan bagi masyarakat berpenghasilan rendah karena harga kebutuhan pokok seperti beras, minyak goreng, dan gula naik lebih cepat dari rata-rata inflasi. World Bank mencatat bahwa Indonesia mengalami tekanan inflasi pangan yang lebih tinggi dibanding inflasi umum, terutama akibat gangguan pasokan dan cuaca ekstrem. Selain itu, biaya transportasi dan energi yang turut naik turut mendorong harga barang di pasaran.",
    source: "BPS & World Bank",
    sourceUrl: "https://www.bps.go.id/id/statistics-table/2/MTczNiMy/inflasi-bulanan--persen-.html",
    dataPoints: [
      { label: "Inflasi nasional 2024", value: "1,81%", source: "BPS" },
      { label: "Inflasi Januari 2025", value: "1,51% YoY", source: "BPS" },
      { label: "Inflasi pangan 2024", value: "sekitar 3,2%", source: "BPS" },
      { label: "Pangsa belanja pangan dari pengeluaran rumah tangga miskin", value: "~45%", source: "BPS Susenas" },
    ],
    relatedQuestions: ["ekonomi-02", "ekonomi-04", "ekonomi-05"],
  },
  {
    id: "ekonomi-02",
    category: "Ekonomi",
    question: "Berapa pendapatan per kapita Indonesia dibanding negara lain?",
    answer:
      "Pendapatan per kapita Indonesia berdasarkan data BPS tahun 2024 mencapai sekitar Rp 78,2 juta per tahun atau setara sekitar USD 4.900. World Bank mencatat Indonesia berada di kategori negara berpenghasilan menengah atas (upper-middle income). Namun, jika dibandingkan dengan negara tetangga seperti Malaysia (sekitar USD 12.500), Thailand (sekitar USD 7.300), dan Vietnam (sekitar USD 4.300), Indonesia masih tertinggal dari Malaysia dan Thailand. Keunggulan Indonesia terletak pada ukuran ekonomi yang besar (PDB nominal > USD 1,4 triliun), namun penduduk yang sangat besar (280 juta) membuat pendapatan per kapita menjadi relatif rendah.",
    source: "BPS & World Bank",
    sourceUrl: "https://data.worldbank.org/indicator/NY.GDP.PCAP.CD?locations=ID-MY-TH-VN-PH",
    dataPoints: [
      { label: "Pendapatan per kapita Indonesia 2024", value: "~USD 4.900", source: "BPS" },
      { label: "Malaysia 2024", value: "~USD 12.500", source: "World Bank" },
      { label: "Thailand 2024", value: "~USD 7.300", source: "World Bank" },
      { label: "Vietnam 2024", value: "~USD 4.300", source: "World Bank" },
      { label: "Filipina 2024", value: "~USD 3.600", source: "World Bank" },
    ],
    relatedQuestions: ["ekonomi-05", "ekonomi-03", "sosial-01"],
  },
  {
    id: "ekonomi-03",
    category: "Ekonomi",
    question: "Apakah utang Indonesia berbahaya?",
    answer:
      "Rasio utang pemerintah terhadap PDB Indonesia per akhir tahun 2024 tercatat sekitar 39,6% menurut Kementerian Keuangan. Angka ini masih jauh di bawah batas aman yang ditetapkan oleh undang-undang yaitu 60% PDB, dan juga di bawah rata-rata negara ASEAN yang mencapai sekitar 55% PDB menurut IMF. Bahkan, jika dibandingkan secara global, banyak negara maju memiliki rasio utang jauh lebih tinggi: Jepang lebih dari 260%, AS lebih dari 120%, dan Italia sekitar 140% PDB. Yang perlu diperhatikan adalah struktur utang Indonesia didominasi oleh Surat Berharga Negara (SBN) yang sebagian besar dimiliki oleh investor domestik, sehingga risiko capital flight lebih terkendali.",
    source: "Kemenkeu & IMF",
    sourceUrl: "https://www.kemenkeu.go.id/informasi-publik/data-apa-saja",
    dataPoints: [
      { label: "Rasio utang terhadap PDB Indonesia 2024", value: "~39,6%", source: "Kemenkeu" },
      { label: "Batas aman UU", value: "60% PDB", source: "UU 17/2003" },
      { label: "Rata-rata utang ASEAN (IMF)", value: "~55% PDB", source: "IMF WEO" },
      { label: "Jepang", value: ">260% PDB", source: "IMF" },
      { label: "Porsi SBN yang dimilik investor domestik", value: "~60%", source: "Kemenkeu" },
    ],
    relatedQuestions: ["ekonomi-02", "ekonomi-04", "ekonomi-05"],
  },
  {
    id: "ekonomi-04",
    category: "Ekonomi",
    question: "Kenapa Rupiah melemah terhadap Dolar?",
    answer:
      "Pelemahan Rupiah terhadap Dolar AS dipengaruhi oleh beberapa faktor utama. Pertama, perbedaan suku bunga antara AS dan Indonesia — ketika The Fed menaikkan suku bunga, modal asing cenderung keluar dari Indonesia menuju aset berdenominasi Dolar. Bank Indonesia mencatat aliran keluar modal portofolio dari pasar SBN mencapai ratusan triliun Rupiah selama periode kenaikan suku bunga The Fed 2022-2023. Kedua, defisit neraca berjalan Indonesia yang melebar akibat harga komoditas yang turun dan kebutuhan impor energi. Ketiga, sentimen global seperti ketidakpastian kebijakan ekonomi AS dan konflik geopolitik turut memberikan tekanan. Bank Indonesia aktif melakukan intervensi di pasar valas menggunakan cadangan devisa untuk menahan pelemahan Rupiah yang terlalu cepat.",
    source: "Bank Indonesia",
    sourceUrl: "https://www.bi.go.id/id/moneter/kurs/value-default.aspx",
    dataPoints: [
      { label: "Cadangan devisa Desember 2024", value: "USD 155,7 miliar", source: "BI" },
      { label: "Suku bunga acuan BI (2024)", value: "6,00%", source: "BI" },
      { label: "Suku bunga The Fed (2024)", value: "5,25-5,50%", source: "Fed" },
      { label: "Pelemahan Rupiah 2024", value: "~3-5% YoY", source: "BI JISDOR" },
    ],
    relatedQuestions: ["ekonomi-01", "ekonomi-03", "ekonomi-05"],
  },
  {
    id: "ekonomi-05",
    category: "Ekonomi",
    question: "Seberapa kaya Indonesia dibanding negara tetangga?",
    answer:
      "Dalam hal PDB nominal, Indonesia adalah negara terbesar di Asia Tenggara dengan PDB sekitar USD 1,4 triliun pada tahun 2024 menurut World Bank. Ini jauh lebih besar dari Malaysia (~USD 400 miliar), Thailand (~USD 520 miliar), Filipina (~USD 440 miliar), dan Vietnam (~USD 430 miliar). Namun, ketika diukur per kapita, ceritanya berbeda. Malaysia memiliki pendapatan per kapita lebih dari dua kali lipat Indonesia, dan Thailand juga masih lebih tinggi. Keunggulan Indonesia terletak pada sumber daya alam yang melimpah, pasar domestik yang sangat besar, dan posisi strategis di jalur perdagangan internasional.",
    source: "BPS & World Bank",
    sourceUrl: "https://data.worldbank.org/indicator/NY.GDP.MKTP.CD?locations=ID-MY-TH-VN-PH",
    dataPoints: [
      { label: "PDB Indonesia 2024", value: "~USD 1,4 triliun", source: "BPS" },
      { label: "PDB Malaysia 2024", value: "~USD 400 miliar", source: "World Bank" },
      { label: "PDB Thailand 2024", value: "~USD 520 miliar", source: "World Bank" },
      { label: "PDB Vietnam 2024", value: "~USD 430 miliar", source: "World Bank" },
      { label: "PDB Filipina 2024", value: "~USD 440 miliar", source: "World Bank" },
    ],
    relatedQuestions: ["ekonomi-02", "ekonomi-03", "sosial-01"],
  },

  // ─────────────────────────────────────────────
  // KESEHATAN
  // ─────────────────────────────────────────────
  {
    id: "kesehatan-01",
    category: "Kesehatan",
    question: "Berapa lama harapan hidup orang Indonesia?",
    answer:
      "Menurut data BPS tahun 2024, harapan hidup rata-rata penduduk Indonesia saat lahir mencapai sekitar 71,8 tahun. Artinya, bayi yang baru lahir pada tahun tersebut diperkirakan akan hidup rata-rata hingga usia 71-72 tahun jika pola kematian saat itu tetap konstan. Angka ini mengalami penurunan drastis pada tahun 2021 akibat pandemi COVID-19 (turun ke 69,4 tahun), namun telah pulih kembali. WHO mencatat bahwa angka ini masih lebih rendah dari negara ASEAN lain seperti Thailand (78,7 tahun), Malaysia (76,2 tahun), dan Vietnam (75,4 tahun). Faktor utama yang membatasi harapan hidup Indonesia adalah tingginya angka kematian ibu dan bayi, prevalensi penyakit tidak menular, serta akses kesehatan yang belum merata di daerah terpencil.",
    source: "BPS & WHO",
    sourceUrl: "https://www.bps.go.id/id/statistics-table/2/MTY4NiMy/harapan-hidup-saat-lahir--tahun-.html",
    dataPoints: [
      { label: "Harapan hidup Indonesia 2024", value: "71,8 tahun", source: "BPS" },
      { label: "Harapan hidup Thailand", value: "78,7 tahun", source: "WHO" },
      { label: "Harapan hidup Malaysia", value: "76,2 tahun", source: "WHO" },
      { label: "Harapan hidup Vietnam", value: "75,4 tahun", source: "WHO" },
      { label: "Penurunan akibat COVID-19 (2021)", value: "69,4 tahun", source: "BPS" },
    ],
    relatedQuestions: ["kesehatan-02", "kesehatan-04", "kesehatan-05"],
  },
  {
    id: "kesehatan-02",
    category: "Kesehatan",
    question: "Apakah Indonesia kekurangan dokter?",
    answer:
      "Indonesia memang mengalami kekurangan dokter jika dibandingkan dengan standar WHO. Rasio dokter Indonesia mencapai sekitar 6,4 per 10.000 penduduk pada tahun 2024 menurut data Kemenkes. WHO merekomendasikan minimal 10 dokter per 10.000 penduduk untuk sistem kesehatan yang memadai. Artinya, Indonesia masih kekurangan sekitar 100.000 dokter. Situasi ini semakin parah di daerah terpencil dan pedalaman, di mana banyak kabupaten yang rasionya bahkan di bawah 3 dokter per 10.000 penduduk. Masalah lainnya adalah distribusi dokter yang tidak merata — sebagian besar dokter praktik di kota-kota besar seperti Jakarta, Surabaya, dan Bandung, sementara daerah di Papua, NTT, dan Maluku kekurangan tenaga medis.",
    source: "Kemenkes & WHO",
    sourceUrl: "https://www.kemkes.go.id/resources/download/statistik/Statistik-Prefektur-2023.pdf",
    dataPoints: [
      { label: "Rasio dokter Indonesia per 10.000 penduduk", value: "6,4", source: "Kemenkes" },
      { label: "Rekomendasi WHO per 10.000 penduduk", value: "10", source: "WHO" },
      { label: "Kekurangan dokter", value: "~100.000 orang", source: "Kalkulasi dari Kemenkes" },
      { label: "Rasio perawat per 10.000 penduduk", value: "~28", source: "Kemenkes" },
      { label: "Jumlah rumah sakit 2024", value: "3.896", source: "Kemenkes" },
    ],
    relatedQuestions: ["kesehatan-01", "kesehatan-03", "kesehatan-04"],
  },
  {
    id: "kesehatan-03",
    category: "Kesehatan",
    question: "Bagaimana kualitas air minum di Indonesia?",
    answer:
      "Akses terhadap air minum yang layak di Indonesia masih menjadi tantangan besar. Kementerian Kesehatan mencatat bahwa pada tahun 2024, sekitar 67% rumah tangga memiliki akses air minum layak (menggunakan layanan PDAM, bor, atau sumur terlindungi), sementara sisanya masih mengandalkan sumber air yang berisiko tercemar. Badan Pusat Statistik mencatat bahwa kualitas air minum di beberapa daerah masih mengandung kontaminan seperti E. coli dan logam berat. WHO menetapkan bahwa air minum yang aman harus bebas dari bakteri fecal dan bahan kimia berbahaya. Di kota-kota besar, PDAM masih sering mempermasalahkan kualitas air baku yang tercemar limbah industri dan domestik.",
    source: "KLHK & WHO",
    sourceUrl: "https://www.who.int/data/gho/data/themes/topics/drinking-water",
    dataPoints: [
      { label: "Akses air minum layak nasional 2024", value: "~67%", source: "Kemenkes" },
      { label: "Akses air minum layak di perkotaan", value: "~82%", source: "BPS" },
      { label: "Akses air minum layak di pedesaan", value: "~49%", source: "BPS" },
      { label: "Persentase air limbah yang diolah dengan aman", value: "~3%", source: "WHO/UNICEF JMP" },
    ],
    relatedQuestions: ["kesehatan-01", "lingkungan-03", "lingkungan-02"],
  },
  {
    id: "kesehatan-04",
    category: "Kesehatan",
    question: "Berapa angka kematian ibu melahirkan di Indonesia?",
    answer:
      "Angka Kematian Ibu (AKI) Indonesia pada tahun 2023 tercatat sekitar 177 per 100.000 kelahiran hidup menurut survei Kemenkes. Angka ini menurun dibandingkan tahun 2018 yang mencapai 289 per 100.000 kelahiran, namun masih jauh dari target Sustainable Development Goals (SDGs) yaitu kurang dari 70 per 100.000 kelahiran. UNICEF mencatat bahwa penyebab utama kematian ibu di Indonesia adalah perdarahan pasca persalinan, hipertensi dalam kehamilan, dan infeksi. Ketimpangan akses layanan kesehatan antara daerah perkotaan dan pedesaan menjadi faktor utama, di mana banyak ibu hamil di daerah terpencil tidak mendapat pemeriksaan kehamilan yang memadai.",
    source: "Kemenkes & UNICEF",
    sourceUrl: "https://www.unicef.org/indonesia/id/tema/kesehatan",
    dataPoints: [
      { label: "AKI Indonesia 2023", value: "177 per 100.000 kelahiran", source: "Kemenkes" },
      { label: "AKI Indonesia 2018", value: "289 per 100.000 kelahiran", source: "Kemenkes" },
      { label: "Target SDGs", value: "<70 per 100.000 kelahiran", source: "UN" },
      { label: "Persentase persalinan dengan tenaga kesehatan", value: "~93%", source: "Kemenkes" },
      { label: "AKI Malaysia", value: "~21 per 100.000 kelahiran", source: "WHO" },
    ],
    relatedQuestions: ["kesehatan-01", "kesehatan-02", "kesehatan-05"],
  },
  {
    id: "kesehatan-05",
    category: "Kesehatan",
    question: "Apakah gizi buruk masih jadi masalah di Indonesia?",
    answer:
      "Ya, gizi buruk dan stunting masih menjadi masalah serius di Indonesia meskipun angkanya terus menurun. Menurut data Kemenkes tahun 2024, prevalensi stunting pada balita mencapai 17,8%, turun dari 30,8% pada tahun 2018. Meskipun ini adalah kemajuan yang signifikan, Indonesia masih memiliki beban stunting tertinggi ketiga di dunia menurut WHO setelah India dan Nigeria dalam hal jumlah absolut. Selain stunting, masalah gizi lain yang masih mengkhawatirkan adalah wasting (kurus pendek) yang mencapai sekitar 7,2% pada balita, dan gizi mikro seperti anemia yang menyerang sekitar 32% ibu hamil. Badan Pangan Nasional mencatat bahwa sekitar 21,6% balita di Indonesia masih mengalami stunting berdasarkan data Riskesdas.",
    source: "BPS & WHO",
    sourceUrl: "https://www.who.int/data/gho/data/themes/topics/stunting",
    dataPoints: [
      { label: "Prevalensi stunting 2024", value: "17,8%", source: "Kemenkes" },
      { label: "Prevalensi stunting 2018", value: "30,8%", source: "Kemenkes" },
      { label: "Prevalensi wasting balita", value: "~7,2%", source: "Riskesdas" },
      { label: "Anemia pada ibu hamil", value: "~32%", source: "Kemenkes" },
      { label: "Target Nasional Stunting 2024", value: "14%", source: "Bappenas" },
    ],
    relatedQuestions: ["kesehatan-01", "kesehatan-04", "sosial-01"],
  },

  // ─────────────────────────────────────────────
  // PENDIDIKAN
  // ─────────────────────────────────────────────
  {
    id: "pendidikan-01",
    category: "Pendidikan",
    question: "Bagaimana peringkat pendidikan Indonesia di dunia?",
    answer:
      "Peringkat pendidikan Indonesia di level internasional masih cukup rendah. Dalam PISA (Programme for International Student Assessment) tahun 2022 yang dirilis oleh OECD, Indonesia menempati posisi ke-68 dari 81 negara partisipan. Skor rata-rata Indonesia dalam membaca adalah 359, matematika 366, dan sains 383 — semuanya jauh di bawah rata-rata OECD yang mencapai sekitar 476. Di tingkat ASEAN, Indonesia berada di bawah Singapura (yang masuk 5 besar dunia), Malaysia, Thailand, dan Brunei. Kemendikbudristek telah meluncurkan berbagai program reformasi seperti Kurikulum Merdeka untuk meningkatkan kualitas pendidikan, namun tantangan utamanya adalah kualitas guru yang belum merata dan fasilitas sekolah yang kurang memadai di daerah terpencil.",
    source: "Kemendikbud & OECD",
    sourceUrl: "https://www.oecd.org/en/publications/pisa-2022-results-volume-i-and-ii_53f23881-en.html",
    dataPoints: [
      { label: "Peringkat Indonesia PISA 2022", value: "ke-68 dari 81 negara", source: "OECD" },
      { label: "Skor membaca PISA 2022", value: "359 (OECD avg: 476)", source: "OECD" },
      { label: "Skor matematika PISA 2022", value: "366 (OECD avg: 472)", source: "OECD" },
      { label: "Skor sains PISA 2022", value: "383 (OECD avg: 485)", source: "OECD" },
      { label: "Angka melek huruf 2024", value: "97,35%", source: "BPS" },
    ],
    relatedQuestions: ["pendidikan-02", "pendidikan-03", "pendidikan-04"],
  },
  {
    id: "pendidikan-02",
    category: "Pendidikan",
    question: "Berapa lulusan SMA yang lanjut ke universitas?",
    answer:
      "Angka Partisipasi Murni (APM) jenjang pendidikan tinggi di Indonesia pada tahun 2024 mencapai sekitar 36,5% menurut data BPS. Artinya, dari 100 lulusan SMA/SMK, hanya sekitar 36-37 orang yang melanjutkan ke perguruan tinggi. Angka ini memang naik dibandingkan tahun 2018 yang hanya sekitar 28%, namun masih jauh di bawah negara-negara maju seperti Korea Selatan (~70%) dan Jepang (~64%). Di antara yang melanjutkan, sekitar 60% masuk ke universitas negeri dan sisanya ke universitas swasta. Tantangan utama adalah biaya pendidikan tinggi yang tinggi, terutama bagi keluarga dari kalangan menengah ke bawah. Meskipun ada program Kartu Indonesia Pintar (KIP) Kuliah, daya tampung terbatas.",
    source: "BPS",
    sourceUrl: "https://www.bps.go.id/id/statistics-table/2/MTQ4MiMy/angka-partisipasi-murni--apm--menurut-jenjang-pendidikan.html",
    dataPoints: [
      { label: "APM pendidikan tinggi 2024", value: "~36,5%", source: "BPS" },
      { label: "APM pendidikan tinggi 2018", value: "~28%", source: "BPS" },
      { label: "APM SMA/SMK 2024", value: "~93,88%", source: "BPS" },
      { label: "Jumlah perguruan tinggi 2024", value: "4.628", source: "Kemendikbud" },
      { label: "Daya tampung PTN per tahun", value: "~600.000", source: "Kemendikbud" },
    ],
    relatedQuestions: ["pendidikan-01", "pendidikan-03", "pendidikan-05"],
  },
  {
    id: "pendidikan-03",
    category: "Pendidikan",
    question: "Apakah siswa Indonesia bisa membaca dengan baik?",
    answer:
      "Berdasarkan hasil PISA 2022 dari OECD, kemampuan membaca siswa Indonesia rata-rata mencapai skor 359, yang jauh di bawah rata-rata OECD sebesar 476. Skor ini menempatkan Indonesia di peringkat yang sangat rendah secara global. Dalam konteks ini, berarti sebagian besar siswa Indonesia SMA hanya mampu membaca teks sederhana namun kesulitan memahami teks yang lebih kompleks, menarik kesimpulan, atau mengidentifikasi argumen. Program Literasi Nasional dan Gerakan Literasi Sekolah telah diluncurkan oleh Kemendikbud, namun kebiasaan membaca di kalangan pelajar masih rendah. Data Perpustakaan Nasional mencatat bahwa rata-rata orang Indonesia hanya membaca 3-5 buku per tahun, jauh di bawah negara seperti Jepang yang mencapai 25-30 buku per tahun.",
    source: "OECD & Kemendikbud",
    sourceUrl: "https://www.oecd.org/en/publications/pisa-2022-results-volume-i-and-ii_53f23881-en.html",
    dataPoints: [
      { label: "Skor literasi membaca Indonesia PISA 2022", value: "359", source: "OECD" },
      { label: "Rata-rata OECD", value: "476", source: "OECD" },
      { label: "Rata-rata buku dibaca per tahun (Indonesia)", value: "3-5 buku", source: "Perpusnas" },
      { label: "Rata-rata buku dibaca per tahun (Jepang)", value: "25-30 buku", source: "Perpusnas" },
      { label: "Rasio buku per penduduk", value: "~0,3 eksemplar", source: "Perpusnas" },
    ],
    relatedQuestions: ["pendidikan-01", "pendidikan-02", "pendidikan-04"],
  },
  {
    id: "pendidikan-04",
    category: "Pendidikan",
    question: "Bagaimana kualitas universitas Indonesia di dunia?",
    answer:
      "Berdasarkan QS World University Rankings 2025, Universitas Indonesia (UI) menempati peringkat 237 secara global, menjadikannya universitas terbaik di Indonesia. Universitas Gadjah Mada (UGM) berada di peringkat 257, Institut Teknologi Bandung (ITB) di peringkat 259, dan Universitas Airlangga di peringkat 408. Meskipun ada peningkatan dari tahun-tahun sebelumnya, belum ada universitas Indonesia yang masuk 100 besar dunia. Bandingkan dengan Singapura yang memiliki NUS (peringkat 8) dan NTU (peringkat 15), atau Malaysia yang memiliki Universiti Malaya (peringkat 60). Tantangan utama universitas Indonesia adalah kurangnya pembiayaan penelitian, rendahnya jumlah publikasi internasional, dan masih rendahnya reputasi akademik global.",
    source: "QS & Kemendikbud",
    sourceUrl: "https://www.topuniversities.com/world-university-rankings",
    dataPoints: [
      { label: "Peringkat Universitas Indonesia (UI)", value: "237 dunia", source: "QS 2025" },
      { label: "Peringkat UGM", value: "257 dunia", source: "QS 2025" },
      { label: "Peringkat ITB", value: "259 dunia", source: "QS 2025" },
      { label: "Peringkat NUS Singapura", value: "8 dunia", source: "QS 2025" },
      { label: "Jumlah perguruan tinggi di Indonesia", value: "4.628", source: "Kemendikbud" },
    ],
    relatedQuestions: ["pendidikan-01", "pendidikan-02", "pendidikan-05"],
  },
  {
    id: "pendidikan-05",
    category: "Pendidikan",
    question: "Berapa biaya pendidikan di Indonesia dibanding negara lain?",
    answer:
      "Biaya pendidikan di Indonesia bervariasi sangat jauh tergantung jenjang dan jenis sekolah. Untuk universitas negeri, SPP berkisar antara Rp 500.000 hingga Rp 10 juta per semester tergantung program studi dan universitas. Biaya kuliah S1 rata-rata di universitas negeri sekitar Rp 30-50 juta per tahun. Bandingkan dengan universitas negeri di Amerika Serikat yang rata-rata mencapai USD 10.000-35.000 per tahun (Rp 150-530 juta), atau di Australia sekitar AUD 20.000-45.000 per tahun (Rp 200-450 juta). Namun, World Bank mencatat bahwa biaya pendidikan di Indonesia relatif mahal dibandingkan dengan kemampuan membayar masyarakat. Rasio biaya pendidikan terhadap pengeluaran rumah tangga di Indonesia mencapai sekitar 15-20% untuk keluarga kelas menengah.",
    source: "World Bank & Kemendikbud",
    sourceUrl: "https://datatopics.worldbank.org/education/",
    dataPoints: [
      { label: "SPP universitas negeri Indonesia per semester", value: "Rp 500rb - Rp 10 juta", source: "Kemendikbud" },
      { label: "Rata-rata biaya kuliah S1 per tahun (Indonesia)", value: "Rp 30-50 juta", source: "Kemendikbud" },
      { label: "Biaya kuliah per tahun (AS negeri)", value: "USD 10.000-35.000", source: "College Board" },
      { label: "Biaya kuliah per tahun (Australia)", value: "AUD 20.000-45.000", source: "QS" },
      { label: "Rasio biaya pendidikan terhadap pengeluaran rumah tangga", value: "15-20%", source: "World Bank" },
    ],
    relatedQuestions: ["pendidikan-01", "pendidikan-02", "pendidikan-04"],
  },

  // ─────────────────────────────────────────────
  // LINGKUNGAN
  // ─────────────────────────────────────────────
  {
    id: "lingkungan-01",
    category: "Lingkungan",
    question: "Seberapa parah deforestasi di Indonesia?",
    answer:
      "Deforestasi di Indonesia masih menjadi masalah serius meskipun angkanya mengalami penurunan dalam beberapa tahun terakhir. Data KLHK mencatat bahwa pada tahun 2023, laju kehilangan tutupan pohon mencapai sekitar 163.000 hektar per tahun, turun drastis dari 480.000 hektar pada tahun 2018. Namun, Global Forest Watch mencatat angka yang sedikit lebih tinggi karena menggunakan metode berbeda. Penyebab utama deforestasi adalah konversi lahan untuk perkebunan kelapa sawit, pertambangan, dan perluasan area pertanian. Indonesia masih memiliki sekitar 92 juta hektar hutan primer, menjadikannya salah satu negara dengan hutan hujan tropis terluas di dunia. Komitmen pemerintah untuk moratorium hutan baru dan program penurunan emisi FOLU Net Sink 2030 diharapkan dapat terus mengurangi laju deforestasi.",
    source: "KLHK & Global Forest Watch",
    sourceUrl: "https://www.globalforestwatch.org/dashboards/country/IDN/",
    dataPoints: [
      { label: "Laju deforestasi 2023", value: "163.000 hektar/tahun", source: "KLHK" },
      { label: "Laju deforestasi 2018", value: "480.000 hektar/tahun", source: "KLHK" },
      { label: "Luas hutan primer tersisa", value: "~92 juta hektar", source: "KLHK" },
      { label: "Penurunan laju deforestasi 2018-2023", value: "~66%", source: "KLHK" },
      { label: "Target FOLU Net Sink", value: "2030", source: "BAPPENAS" },
    ],
    relatedQuestions: ["lingkungan-02", "lingkungan-04", "lingkungan-05"],
  },
  {
    id: "lingkungan-02",
    category: "Lingkungan",
    question: "Apakah Indonesia penyumbang sampah laut terbesar?",
    answer:
      "Indonesia secara konsisten masuk dalam lima besar negara penyumbang sampah plastik ke laut terbesar di dunia bersama China, Filipina, Vietnam, dan India menurut laporan Ocean Conservancy. KLHK memperkirakan Indonesia menghasilkan sekitar 6,8 juta ton sampah plastik per tahun pada tahun 2018, dan sekitar 4,5 juta ton di antaranya berpotensi masuk ke laut. Namun, angka ini terus menurun berkat berbagai kebijakan seperti pelarangan kantong plastik di beberapa daerah, program Daur Ulang, dan kampanye pengurangan plastik sekali pakai. Menurut studi yang diterbitkan di jurnal Science, kontribusi Indonesia terhadap sampah plastik laut global mencapai sekitar 10%, meskipun persentase ini mulai menurun dalam beberapa tahun terakhir.",
    source: "Ocean Conservancy & KLHK",
    sourceUrl: "https://oceanconservancy.org/trash-free-seas/international-coastal-cleanup/",
    dataPoints: [
      { label: "Total sampah plastik Indonesia per tahun", value: "~4,5 juta ton", source: "KLHK" },
      { label: "Peringkat global sampah laut", value: "Top 5 dunia", source: "Ocean Conservancy" },
      { label: "Persentase sampah laut global dari Indonesia", value: "~10%", source: "Science Journal" },
      { label: "Sampah plastik yang didaur ulang", value: "~12%", source: "KLHK" },
    ],
    relatedQuestions: ["lingkungan-01", "lingkungan-03", "lingkungan-04"],
  },
  {
    id: "lingkungan-03",
    category: "Lingkungan",
    question: "Bagaimana kualitas udara di kota-kota besar Indonesia?",
    answer:
      "Kualitas udara di kota-kota besar Indonesia bervariasi namun umumnya masih dalam kategori tidak sehat untuk kelompok sensitif. IQAir mencatat bahwa Jakarta secara konsisten memiliki indeks kualitas udara (AQI) rata-rata di atas 100, yang berarti kategori tidak sehat bagi kelompok sensitif. Kebakaran hutan dan lahan (karhutla) di Kalimantan dan Sumatera setiap tahun memperburuk kualitas udara di beberapa wilayah. Selain itu, polusi kendaraan bermotor di Jakarta menjadi kontributor utama, dengan emisi dari kendaraan bermotor menyumbang sekitar 30% polusi udara di ibu kota. KLHK telah menetapkan baku mutu udara ambien, namun banyak kota yang masih melampaui batas ambang untuk polutan seperti PM2.5 dan NO2.",
    source: "IQAir & KLHK",
    sourceUrl: "https://www.iqair.com/indonesia",
    dataPoints: [
      { label: "AQI rata-rata Jakarta 2024", value: ">100 (Tidak Sehat)", source: "IQAir" },
      { label: "Kontribusi kendaraan terhadap polusi Jakarta", value: "~30%", source: "KLHK" },
      { label: "Kota dengan kualitas udara terburuk", value: "Jakarta, Medan, Palembang", source: "IQAir" },
      { label: "PM2.5 rata-rata Jakarta", value: "~30-40 µg/m³", source: "IQAir" },
      { label: "Standar WHO PM2.5 tahunan", value: "5 µg/m³", source: "WHO" },
    ],
    relatedQuestions: ["lingkungan-01", "lingkungan-04", "lingkungan-05"],
  },
  {
    id: "lingkungan-04",
    category: "Lingkungan",
    question: "Berapa emisi karbon Indonesia dibanding dunia?",
    answer:
      "Indonesia merupakan salah satu negara dengan emisi gas rumah kaca terbesar di dunia. Data BAPPENAS mencatat bahwa total emisi gas rumah kaca Indonesia pada tahun 2023 mencapai sekitar 894 juta ton CO2e (setara CO2). Indonesia menempati peringkat ke-6 atau ke-7 sebagai negara penyumbang emisi terbesar di dunia menurut Our World in Data, di belakang China, AS, India, Rusia, dan Jepang. Namun, jika diukur per kapita, emisi Indonesia jauh lebih rendah yaitu sekitar 3,2 ton CO2 per orang per tahun, dibanding AS yang mencapai 14,9 ton dan China 8,9 ton. Sektor yang paling banyak berkontribusi adalah FOLU (Forestry and Other Land Use) dan energi. Pemerintah Indonesia telah berkomitmen untuk mencapai Net Zero Emissions pada tahun 2060.",
    source: "BAPPENAS & Our World in Data",
    sourceUrl: "https://ourworldindata.org/co2-emissions",
    dataPoints: [
      { label: "Total emisi Indonesia 2023", value: "894 juta ton CO2e", source: "BAPPENAS" },
      { label: "Peringkat global emisi", value: "Ke-6 atau ke-7", source: "Our World in Data" },
      { label: "Emisi per kapita Indonesia", value: "~3,2 ton CO2/orang/tahun", source: "Our World in Data" },
      { label: "Emisi per kapita AS", value: "~14,9 ton CO2/orang/tahun", source: "Our World in Data" },
      { label: "Target Net Zero Emissions Indonesia", value: "2060", source: "BAPPENAS" },
    ],
    relatedQuestions: ["lingkungan-01", "lingkungan-05", "lingkungan-02"],
  },
  {
    id: "lingkungan-05",
    category: "Lingkungan",
    question: "Apakah energi terbarukan sudah banyak digunakan di Indonesia?",
    answer:
      "Pangsa energi terbarukan di Indonesia masih relatif rendah meskipun terus meningkat. Menurut data Kementerian ESDM tahun 2024, pangsa energi terbarukan dari total bauran energi primer mencapai sekitar 17%, naik dari 12,6% pada tahun 2018. Mayoritas bauran energi terbarukan Indonesia masih berasal dari pembangkit listrik tenaga air (hydro) dan biomassa, sementara energi surya dan angin masih sangat kecil kontribusinya. IRENA mencatat bahwa Indonesia memiliki potensi energi terbarukan yang sangat besar, terutama energi surya (rata-rata radiasi matahari tinggi), panas bumi (cadangan terbesar ke-3 dunia), dan energi laut. Namun, tantangannya adalah investasi yang masih rendah, infrastruktur transmisi yang belum memadai, dan masih besarnya subsidi energi fosil.",
    source: "ESDM & IRENA",
    sourceUrl: "https://www.irena.org/IRENADocuments/Statistical_Profiles/Asia/Indonesia_Asia_RE_SP.pdf",
    dataPoints: [
      { label: "Pangsa energi terbarukan 2024", value: "17%", source: "ESDM" },
      { label: "Pangsa energi terbarukan 2018", value: "12,6%", source: "ESDM" },
      { label: "Potensi panas bumi Indonesia", value: "~40% cadangan dunia", source: "ESDM" },
      { label: "Target bauran energi terbarukan 2025", value: "23%", source: "ESDM" },
      { label: "Investasi energi terbarukan Indonesia 2023", value: "~USD 1,5 miliar", source: "IRENA" },
    ],
    relatedQuestions: ["lingkungan-04", "lingkungan-01", "lingkungan-03"],
  },

  // ─────────────────────────────────────────────
  // DIGITAL & TEKNOLOGI
  // ─────────────────────────────────────────────
  {
    id: "digital-01",
    category: "Digital & Teknologi",
    question: "Seberapa canggih internet di Indonesia?",
    answer:
      "Internet di Indonesia sudah sangat meluas namun masih menghadapi tantangan kualitas. Menurut laporan We Are Social & Meltwater tahun 2025, jumlah pengguna internet di Indonesia mencapai sekitar 213 juta jiwa atau sekitar 77% dari total penduduk. Penetrasi media sosial juga sangat tinggi dengan lebih dari 219 juta pengguna aktif media sosial. Namun, Kominfo mencatat bahwa kesenjangan digital antara perkotaan dan pedesaan masih cukup besar — penetrasi internet di perkotaan mencapai 85% sementara di pedesaan baru sekitar 58%. Kecepatan internet rata-rata masih di bawah rata-rata global menurut Speedtest Global Index, meskipun jaringan 5G telah mulai diluncurkan di kota-kota besar seperti Jakarta, Surabaya, dan Bandung.",
    source: "We Are Social & Kominfo",
    sourceUrl: "https://datareportal.com/reports/digital-2025-indonesia",
    dataPoints: [
      { label: "Pengguna internet Indonesia 2025", value: "~213 juta", source: "We Are Social" },
      { label: "Penetrasi internet", value: "~77%", source: "We Are Social" },
      { label: "Pengguna media sosial", value: "~219 juta", source: "DataReportal" },
      { label: "Penetrasi internet perkotaan", value: "~85%", source: "Kominfo" },
      { label: "Penetrasi internet pedesaan", value: "~58%", source: "Kominfo" },
    ],
    relatedQuestions: ["digital-02", "digital-04", "digital-05"],
  },
  {
    id: "digital-02",
    category: "Digital & Teknologi",
    question: "Berapa pengguna e-commerce di Indonesia?",
    answer:
      "Indonesia adalah salah satu pasar e-commerce terbesar di dunia. Laporan Google-Temasek-Bain e-Conomy SEA tahun 2024 mencatat bahwa jumlah pengguna e-commerce aktif di Indonesia mencapai sekitar 210 juta jiwa. Total nilai transaksi e-commerce (GMV) Indonesia mencapai sekitar USD 72 miliar pada tahun 2024, menjadikannya pasar e-commerce terbesar di Asia Tenggara. Platform e-commerce terpopuler termasuk Tokopedia (yang bergabung dengan TikTok Shop), Shopee, Lazada, dan Bukalapak. Penetrasi e-commerce terus meningkat terutama setelah pandemi COVID-19 yang mempercepat transformasi digital. Menariknya, transaksi e-commerce tidak hanya terjadi di kota-kota besar tetapi juga semakin merambah ke daerah tier 2 dan tier 3.",
    source: "Google-Temasek-Bain",
    sourceUrl: "https://www.bain.com/insights/e-conomy-sea-2024/",
    dataPoints: [
      { label: "Pengguna e-commerce aktif 2024", value: "~210 juta", source: "Google-Temasek-Bain" },
      { label: "GMV e-commerce Indonesia 2024", value: "~USD 72 miliar", source: "Google-Temasek-Bain" },
      { label: "Pertumbuhan GMV YoY", value: "~15%", source: "Google-Temasek-Bain" },
      { label: "Rata-rata transaksi per pengguna", value: "~USD 340/tahun", source: "Google-Temasek-Bain" },
    ],
    relatedQuestions: ["digital-01", "digital-04", "digital-05"],
  },
  {
    id: "digital-03",
    category: "Digital & Teknologi",
    question: "Apakah Indonesia bisa bersaing di bidang AI?",
    answer:
      "Indonesia memiliki potensi besar di bidang AI namun masih tertinggal dari negara-negara maju. Stanford AI Index Report 2024 mencatat bahwa Indonesia belum masuk dalam 20 besar negara dengan investasi AI terbesar. Namun, Kominfo mencatat bahwa jumlah startup AI di Indonesia tumbuh pesat dari sekitar 200 pada tahun 2020 menjadi lebih dari 500 pada tahun 2024. Keunggulan Indonesia adalah pasar yang besar dan kebutuhan spesifik seperti Bahasa Indonesia untuk Natural Language Processing (NLP). Beberapa perusahaan Indonesia seperti GoTo dan Tokopedia telah mengembangkan AI untuk personalisasi dan chatbot. Tantangan utama adalah keterbatasan tenaga ahli AI, infrastruktur komputasi yang belum memadai, dan masih rendahnya anggaran penelitian AI dari pemerintah.",
    source: "Stanford AI Index & Kominfo",
    sourceUrl: "https://aiindex.stanford.edu/report/",
    dataPoints: [
      { label: "Jumlah startup AI di Indonesia 2024", value: ">500", source: "Kominfo" },
      { label: "Investasi global AI 2023", value: "~USD 68 miliar", source: "Stanford AI Index" },
      { label: "Porsi investasi AI Indonesia dari ASEAN", value: "~15%", source: "Kominfo" },
      { label: "Kebutuhan ahli AI di Indonesia", value: "~10.000", source: "Kominfo" },
    ],
    relatedQuestions: ["digital-01", "digital-04", "digital-05"],
  },
  {
    id: "digital-04",
    category: "Digital & Teknologi",
    question: "Bagaimana kecepatan internet Indonesia dibanding ASEAN?",
    answer:
      "Kecepatan internet Indonesia masih tertinggal dibandingkan beberapa negara ASEAN lain. Berdasarkan Speedtest Global Index oleh Ookla tahun 2024, kecepatan internet rata-rata Indonesia (fixed broadband) mencapai sekitar 30-35 Mbps untuk download, sementara Singapura mencapai 250+ Mbps, Thailand sekitar 180 Mbps, dan Malaysia sekitar 100 Mbps. Untuk mobile internet, Indonesia mencapai sekitar 25-30 Mbps, sedangkan Singapura mencapai 50+ Mbps dan Thailand sekitar 40 Mbps. Kominfo terus memperluas jaringan fiber optik dan menara telekomunikasi ke daerah-daerah terpencil melalui program Palapa Ring dan USO (Universal Service Obligation). Peluncuran jaringan 5G di kota-kota besar juga diharapkan meningkatkan kecepatan internet secara signifikan.",
    source: "Speedtest Global Index & Kominfo",
    sourceUrl: "https://www.speedtest.net/global-index/indonesia",
    dataPoints: [
      { label: "Kecepatan download fixed broadband Indonesia", value: "~30-35 Mbps", source: "Speedtest" },
      { label: "Kecepatan download fixed broadband Singapura", value: "~250+ Mbps", source: "Speedtest" },
      { label: "Kecepatan download fixed broadband Thailand", value: "~180 Mbps", source: "Speedtest" },
      { label: "Kecepatan download mobile Indonesia", value: "~25-30 Mbps", source: "Speedtest" },
      { label: "Cakupan jaringan Palapa Ring", value: "100% kabupaten/kota", source: "Kominfo" },
    ],
    relatedQuestions: ["digital-01", "digital-02", "digital-03"],
  },
  {
    id: "digital-05",
    category: "Digital & Teknologi",
    question: "Berapa startup unicorn di Indonesia?",
    answer:
      "Indonesia memiliki jumlah startup unicorn (perusahaan rintisan bernilai lebih dari USD 1 miliar) terbanyak di Asia Tenggara. Menurut data BEHAVA.id dan CB Insights tahun 2024, Indonesia memiliki sekitar 6-7 unicorn aktif, termasuk GoTo (Gojek + Tokopedia), Traveloka, Bukalapak, Dana, Xendit, dan Blu (Bank BCA Digital). Jumlah ini sempat mencapai 8 pada tahun 2021-2022, namun beberapa telah merger atau turun valuasinya. Total valuasi unicorn Indonesia mencapai lebih dari USD 30 miliar. Indonesia juga memiliki beberapa decacorn (startup bernilai >USD 10 miliar) seperti GoTo. Ekosistem startup Indonesia terus berkembang meskipun mengalami masa sulit pada 2022-2023 akibat global tech downturn, dan mulai pulih pada 2024 dengan meningkatnya aktivitas venture capital.",
    source: "CB Insights & BEHAVA.id",
    sourceUrl: "https://behava.id/research/",
    dataPoints: [
      { label: "Jumlah unicorn Indonesia 2024", value: "6-7 perusahaan", source: "BEHAVA.id" },
      { label: "Total valuasi unicorn Indonesia", value: ">USD 30 miliar", source: "CB Insights" },
      { label: "Unicorn terbesar berdasarkan valuasi", value: "GoTo", source: "CB Insights" },
      { label: "Jumlah deal VC di Indonesia 2024", value: "156 deal", source: "DealStreetAsia" },
    ],
    relatedQuestions: ["digital-01", "digital-02", "digital-03"],
  },

  // ─────────────────────────────────────────────
  // SOSIAL & DEMOGRAFI
  // ─────────────────────────────────────────────
  {
    id: "sosial-01",
    category: "Sosial & Demografi",
    question: "Berapa penduduk miskin di Indonesia?",
    answer:
      "Jumlah penduduk miskin di Indonesia terus mengalami penurunan dalam beberapa tahun terakhir. BPS mencatat bahwa pada Maret 2024, tingkat kemiskinan nasional mencapai 9,03% atau sekitar 25,28 juta jiwa dari total 280 juta penduduk. Angka ini turun dibandingkan tahun 2018 yang mencapai 9,66% dan tahun 2020 yang sempat naik ke 10,19% akibat pandemi COVID-19. World Bank mencatat bahwa Indonesia telah berhasil mengeluarkan jutaan orang dari garis kemiskinan dalam dua dekade terakhir berkat program pengentasan kemiskinan seperti Program Keluarga Harapan (PKH) dan Bantuan Pangan Non Tunai (BPNT). Namun, garis kemiskinan nasional yang ditetapkan BPS pada tahun 2024 mencapai Rp 687.456 per kapita per bulan, yang berarti mereka yang berpenghasilan di bawah angka tersebut dikategorikan miskin.",
    source: "BPS & World Bank",
    sourceUrl: "https://www.bps.go.id/id/statistics-table/2/MjIzIzE=/tingkat-kemiskinan.html",
    dataPoints: [
      { label: "Tingkat kemiskinan Maret 2024", value: "9,03% (25,28 juta jiwa)", source: "BPS" },
      { label: "Tingkat kemiskinan 2018", value: "9,66%", source: "BPS" },
      { label: "Tingkat kemiskinan 2020 (COVID)", value: "10,19%", source: "BPS" },
      { label: "Garis kemiskinan 2024", value: "Rp 687.456/kapita/bulan", source: "BPS" },
      { label: "Penurunan kemiskinan ekstrem 2015-2024", value: "~75%", source: "World Bank" },
    ],
    relatedQuestions: ["sosial-02", "sosial-03", "ekonomi-02"],
  },
  {
    id: "sosial-02",
    category: "Sosial & Demografi",
    question: "Bagaimana kesenjangan pendapatan di Indonesia?",
    answer:
      "Kesenjangan pendapatan di Indonesia diukur menggunakan rasio GINI, yang menurut BPS tahun 2024 mencapai 0,365 (turun dari 0,389 pada tahun 2018). Angka ini menunjukkan bahwa kesenjangan pendapatan di Indonesia relatif moderat dibandingkan dengan negara-negara seperti Brazil (0,53) atau Afrika Selatan (0,63), namun masih lebih tinggi dari negara-negara Skandinavia (sekitar 0,25-0,28). World Bank mencatat bahwa 10% penduduk terkaya di Indonesia menguasai sekitar 42% total pendapatan nasional, sementara 40% penduduk terbawah hanya menguasai sekitar 17%. Kesenjangan antara wilayah juga signifikan — pendapatan per kapita di DKI Jakarta hampir tiga kali lipat dari NTT atau Papua. Program redistribusi lahan dan pembangunan infrastruktur di luar Jawa menjadi strategi utama pemerintah untuk mengurangi kesenjangan.",
    source: "BPS & World Bank",
    sourceUrl: "https://data.worldbank.org/indicator/SI.POV.GINI?locations=ID",
    dataPoints: [
      { label: "Rasio GINI Indonesia 2024", value: "0,365", source: "BPS" },
      { label: "Porsi pendapatan 10% terkaya", value: "~42%", source: "BPS" },
      { label: "Porsi pendapatan 40% terbawah", value: "~17%", source: "BPS" },
      { label: "GINI Brazil", value: "0,53", source: "World Bank" },
      { label: "Rasio GINI Indonesia 2018", value: "0,389", source: "BPS" },
    ],
    relatedQuestions: ["sosial-01", "sosial-03", "ekonomi-02"],
  },
  {
    id: "sosial-03",
    category: "Sosial & Demografi",
    question: "Berapa pengangguran lulusan baru?",
    answer:
      "Tingkat pengangguran terbuka di Indonesia pada tahun 2024 mencapai 4,91% menurut data BPS, yang berarti sekitar 7,67 juta orang dari total angkatan kerja. Yang mengkhawatirkan adalah pengangguran terdidik — lulusan diploma dan sarjana menyumbang sekitar 4,52% dari total pengangguran pada tahun 2024. ILO (International Labour Organization) mencatat bahwa youth unemployment (pengangguran usia 15-24 tahun) di Indonesia mencapai sekitar 14-16%, jauh lebih tinggi dari rata-rata nasional. Banyak lulusan baru yang kesulitan mendapatkan pekerjaan karena ketidaksesuaian antara keterampilan yang dimiliki dengan kebutuhan pasar kerja. Program Kartu Prakerja telah melatih jutaan peserta, namun dampaknya terhadap penurunan pengangguran masih perlu dievaluasi lebih lanjut.",
    source: "BPS & ILO",
    sourceUrl: "https://www.bps.go.id/id/statistics-table/2/MTEwNyMy/tingkat-pengangguran-terbuka--lptk--.html",
    dataPoints: [
      { label: "Tingkat pengangguran terbuka 2024", value: "4,91%", source: "BPS" },
      { label: "Total pengangguran 2024", value: "~7,67 juta", source: "BPS" },
      { label: "Youth unemployment (15-24 tahun)", value: "~14-16%", source: "ILO" },
      { label: "Pengangguran terdidik (D3/S1+)", value: "4,52%", source: "BPS" },
      { label: "Peserta Kartu Prakerja yang telah dilatih", value: ">20 juta", source: "Manpres" },
    ],
    relatedQuestions: ["sosial-01", "sosial-02", "ekonomi-02"],
  },
  {
    id: "sosial-04",
    category: "Sosial & Demografi",
    question: "Bagaimana Status Gender di Indonesia?",
    answer:
      "Gender Inequality Index (GII) Indonesia menurut UNDP tahun 2024 mencapai 0,400, menempatkan Indonesia di peringkat 97 dari 193 negara. Meskipun ini merupakan peningkatan dari tahun 2018 (0,446), kesenjangan gender masih cukup signifikan. Partisipasi tenaga kerja perempuan di Indonesia mencapai sekitar 53%, jauh di bawah laki-laki yang mencapai 82%. Di sektor pendidikan, kesenjangan gender sudah relatif kecil dengan angka melek huruf perempuan mencapai 96,4% dibanding laki-laki 97,7%. Namun, di sektor politik, perempuan baru menguasai sekitar 21% kursi DPR. Kemajuan terlihat dari meningkatnya akses perempuan terhadap pendidikan tinggi — saat ini perempuan bahkan sudah melebihi laki-laki dalam hal partisipasi pendidikan tinggi.",
    source: "UNDP & BPS",
    sourceUrl: "https://hdr.undp.org/data-center/country-insights#/ranks",
    dataPoints: [
      { label: "GII Indonesia 2024", value: "0,400 (peringkat 97)", source: "UNDP" },
      { label: "Partisipasi tenaga kerja perempuan", value: "~53%", source: "BPS" },
      { label: "Partisipasi tenaga kerja laki-laki", value: "~82%", source: "BPS" },
      { label: "Kursi perempuan di DPR", value: "~21%", source: "KPU" },
      { label: "Kesenjangan angka melek huruf", value: "1,3%", source: "BPS" },
    ],
    relatedQuestions: ["sosial-01", "sosial-02", "sosial-03"],
  },
  {
    id: "sosial-05",
    category: "Sosial & Demografi",
    question: "Berapa penduduk Indonesia yang punya akses listrik?",
    answer:
      "Akses listrik di Indonesia telah meningkat signifikan dalam satu dekade terakhir. Kementerian ESDM mencatat bahwa pada tahun 2024, rasio elektrifikasi nasional mencapai 99,4%, artinya hampir seluruh rumah tangga di Indonesia sudah terhubung ke jaringan listrik. Ini merupakan pencapaian luar biasa dibandingkan tahun 2014 yang hanya sekitar 88,3%. World Bank juga mencatat bahwa Indonesia merupakan salah satu negara yang paling berhasil dalam hal ekspansi akses listrik di Asia. Namun, meskipun akses listrik sudah merata, masih ada masalah terkait keandalan pasokan listrik — beberapa daerah masih mengalami pemadaman listrik secara berkala, terutama di luar Jawa. Selain itu, biaya listrik di Indonesia masih relatif murah berkat subsidi pemerintah, namun ini menjadi beban bagi PLN dan APBN.",
    source: "ESDM & World Bank",
    sourceUrl: "https://data.worldbank.org/indicator/EG.ELC.ACCS.ZS?locations=ID",
    dataPoints: [
      { label: "Rasio elektrifikasi nasional 2024", value: "99,4%", source: "ESDM" },
      { label: "Rasio elektrifikasi 2014", value: "88,3%", source: "ESDM" },
      { label: "Rasio desa berlistrik 2024", value: "~100%", source: "ESDM" },
      { label: "Kapasitas terpasang PLN 2024", value: "~82 GW", source: "PLN" },
      { label: "Porsi energi fosil dalam bauran listrik", value: "~80%", source: "ESDM" },
    ],
    relatedQuestions: ["lingkungan-05", "sosial-01", "sosial-02"],
  },
];

export const qaCategories = [
  {
    id: "ekonomi",
    name: "Ekonomi",
    icon: "TrendingUp",
    color: "from-blue-500 to-blue-600",
    count: qaData.filter((q) => q.category === "Ekonomi").length,
  },
  {
    id: "kesehatan",
    name: "Kesehatan",
    icon: "HeartPulse",
    color: "from-rose-500 to-rose-600",
    count: qaData.filter((q) => q.category === "Kesehatan").length,
  },
  {
    id: "pendidikan",
    name: "Pendidikan",
    icon: "GraduationCap",
    color: "from-indigo-500 to-indigo-600",
    count: qaData.filter((q) => q.category === "Pendidikan").length,
  },
  {
    id: "lingkungan",
    name: "Lingkungan",
    icon: "Leaf",
    color: "from-green-500 to-emerald-600",
    count: qaData.filter((q) => q.category === "Lingkungan").length,
  },
  {
    id: "digital",
    name: "Digital & Teknologi",
    icon: "Wifi",
    color: "from-cyan-500 to-cyan-600",
    count: qaData.filter((q) => q.category === "Digital & Teknologi").length,
  },
  {
    id: "sosial",
    name: "Sosial & Demografi",
    icon: "Users",
    color: "from-violet-500 to-violet-600",
    count: qaData.filter((q) => q.category === "Sosial & Demografi").length,
  },
];

export const searchQA = (query: string): QAItem[] => {
  const q = query.toLowerCase().trim();
  if (!q) return qaData;
  return qaData.filter(
    (item) =>
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.source.toLowerCase().includes(q),
  );
};
