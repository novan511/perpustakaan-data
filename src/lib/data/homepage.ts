export interface FunFact {
  id: string;
  headline: string;
  summary: string;
  detail: string;
  source: string;
  category: string;
  icon: string;
}

export const funFacts: FunFact[] = [
  {
    id: "ff-01",
    headline: "Indonesia punya 17.000 pulau, tapi cuma 6.000 yang berpenghuni",
    summary: "Lebih dari 10.000 pulau di Indonesia tidak ada yang menetap di sana.",
    detail: "Dari 17.508 pulau yang tercatat, hanya sekitar 6.000 pulau yang berpenghuni. Sisanya masih alami tanpa penduduk tetap. Kalau kamu mengunjungi 1 pulau setiap hari, butuh 48 tahun untuk mengunjungi semuanya.",
    source: "BPS & Kementerian Kelautan",
    category: "Geografi",
    icon: "Island",
  },
  {
    id: "ff-02",
    headline: "Jumlah penduduk Indonesia lebih banyak dari seluruh Amerika Serikat Barat",
    summary: "280 juta orang Indonesia melebihi populasi 25 negara bagian AS digabung.",
    detail: "Indonesia dengan 280 juta penduduk adalah negara terbesar ke-4 di dunia. Jumlah ini lebih banyak dari seluruh populasi Amerika Serikat Barat (termasuk California, Texas, dan negara bagian lainnya) yang sekitar 130 juta. Indonesia hanya kalah dari India, China, dan AS.",
    source: "BPS & World Population Review",
    category: "Demografi",
    icon: "Users",
  },
  {
    id: "ff-03",
    headline: "Beras Indonesia cukup makan untuk 1,5 miliar orang",
    summary: "Produksi beras Indonesia mencapai 54 juta ton per tahun.",
    detail: "Indonesia adalah produsen beras terbesar ke-3 di dunia setelah China dan India. Dengan produksi 54 juta ton per tahun, beras Indonesia cukup untuk memberi makan 1,5 miliar orang. Tapi ironisnya, masih ada 27 juta penduduk Indonesia yang kekurangan gizi.",
    source: "Kementan & FAO",
    category: "Pertanian",
    icon: "Wheat",
  },
  {
    id: "ff-04",
    headline: "Orang Indonesia menghabiskan 8 jam sehari di internet",
    summary: "Rata-rata waktu online masyarakat Indonesia melebihi rata-rata global.",
    detail: "Berdasarkan data We Are Social 2025, rata-rata orang Indonesia menghabiskan 8 jam 17 menit per hari di internet — lebih lama dari rata-rata global (6 jam 40 menit). Indonesia masuk dalam 5 negara dengan waktu online terlama di dunia.",
    source: "We Are Social & DataReportal",
    category: "Digital",
    icon: "Smartphone",
  },
  {
    id: "ff-05",
    headline: "Indonesia punya 54% cadangan nikel dunia",
    summary: "Lebih dari setengah cadangan nikel planet ini ada di Indonesia.",
    detail: "Indonesia menguasai 54% cadangan nikel global (sekitar 21 juta ton dari 39 juta ton dunia). Nikel adalah bahan baku utama baterai listrik. Dengan dominasi ini, Indonesia berpotensi menjadi pemain utama dalam revolusi kendaraan listrik global.",
    source: "USGS & Kementerian ESDM",
    category: "Sumber Daya",
    icon: "Gem",
  },
  {
    id: "ff-06",
    headline: "Hutan Indonesia menyerap 600 juta ton CO2 per tahun",
    summary: "Hutan hujan tropis Indonesia adalah paru-paru dunia kedua setelah Amazon.",
    detail: "Hutan hujan tropis Indonesia menyerap sekitar 600 juta ton karbon dioksida per tahun. Ini setara dengan menyerap emisi dari 130 juta mobil. Indonesia memiliki 10% hutan hujan tropis dunia, menjadikannya salah satu penyimpan karbon terbesar di planet ini.",
    source: "KLHK & Global Forest Watch",
    category: "Lingkungan",
    icon: "TreePine",
  },
  {
    id: "ff-07",
    headline: "Gaji UMR Jakarta bisa beli 3x lebih banyak nasi goreng di Yogyakarta",
    summary: "Selisih biaya hidup antar kota di Indonesia sangat besar.",
    detail: "UMR Jakarta 2025 sekitar Rp 5,4 juta. Di Jakarta, uang itu mungkin cukup untuk 1 bulan. Tapi di Yogyakarta dengan UMR Rp 2,1 juta, biaya hidup jauh lebih rendah. Satu porsi nasi goreng di Jakarta Rp 25.000, di Yogya Rp 10.000. Beda daya beli sangat signifikan.",
    source: "Kemnaker & BPS",
    category: "Ekonomi",
    icon: "TrendingUp",
  },
  {
    id: "ff-08",
    headline: "Indonesia menghasilkan kopi terbaik dunia, tapi orang Indonesia minum kopi instan",
    summary: "Kopi specialty Indonesia dinilai 90+ poin oleh SCA, tapi konsumsi lokal didominai kopi sachet.",
    detail: "Kopi Gayo, Toraja, dan Flores dinilai sebagai kopi specialty terbaik dunia dengan skor SCA di atas 85-90. Harga kopi Gayo bisa mencapai Rp 500.000/kg di pasar internasional. Tapi ironisnya, 70% kopi yang dikonsumsi orang Indonesia adalah kopi instan berharga Rp 2.000 per sachet.",
    source: "SCA & AIKI",
    category: "Industri",
    icon: "Coffee",
  },
  {
    id: "ff-09",
    headline: "Pulau Jawa hanya 7% luas Indonesia, tapi menampung 56% penduduk",
    summary: "Kepadatan penduduk Pulau Jawa 11x lipat dari rata-rata nasional.",
    detail: "Pulau Jawa seluas 128.000 km² (7% dari total wilayah Indonesia) menampung 156 juta orang atau 56% penduduk nasional. Kepadatannya mencapai 1.218 orang/km², dibandingkan rata-rata nasional yang hanya 110 orang/km². Ini menjadikan Jawa salah satu pulau terpadat di dunia.",
    source: "BPS",
    category: "Demografi",
    icon: "MapPin",
  },
  {
    id: "ff-10",
    headline: "Indonesia adalah produsen kelapa sawit terbesar dunia dengan 47 juta hektar",
    summary: "Luas perkebunan sawit Indonesia setara dengan seluruh wilayah Jepang.",
    detail: "Indonesia menguasai 58% produksi minyak sawit dunia dengan 47 juta hektar perkebunan. Luas ini setara dengan seluruh wilayah Jepang (378.000 km²). Industri sawit menyumbang 4,5% PDB dan menyerap 16 juta tenaga kerja.",
    source: "Kementan & USDA",
    category: "Pertanian",
    icon: "TreePine",
  },
  {
    id: "ff-11",
    headline: "Biaya kuliah S1 di Indonesia 20x lebih murah dari MIT",
    summary: "Universitas negeri terbaik Indonesia hanya Rp 5-15 juta/tahun.",
    detail: "Biaya kuliah S1 di UI atau ITB sekitar Rp 5-15 juta per tahun (termasuk UKT). Di MIT, biaya kuliahnya mencapai US$ 60.000/tahun (sekitar Rp 960 juta). Artinya, kuliah di ITB 64x lebih murah dari MIT — meski kualitas riset Indonesia terus meningkat.",
    source: "Kemendikbud & MIT",
    category: "Pendidikan",
    icon: "GraduationCap",
  },
  {
    id: "ff-12",
    headline: "Indonesia punya 1.340 suku bangsa — lebih banyak dari negara manapun",
    summary: "Budaya Indonesia lebih beragam dari seluruh Eropa digabung.",
    detail: "Indonesia memiliki 1.340 suku bangsa yang tersebar di 17.000 pulau. Eropa yang memiliki 44 negara hanya sekitar 87 suku bangsa. Indonesia juga memiliki 718 bahasa daerah — menjadikannya salah satu negara paling linguistik beragam di dunia.",
    source: "Kemendikbud & Ethnologue",
    category: "Budaya",
    icon: "Globe",
  },
];

export const tickerItems = [
  { label: "PDB Q4-2025", value: "5,03%", change: "+0.12%", positive: true },
  { label: "Inflasi Jan", value: "1,51%", change: "-0.06%", positive: true },
  { label: "BI-Rate", value: "5,75%", change: "0,00%", positive: true },
  { label: "Kurs JISDOR", value: "Rp 15.850", change: "+120", positive: false },
  { label: "Cadangan Devisa", value: "US$ 155,6 M", change: "+3,2 M", positive: true },
  { label: "Harga Emas", value: "Rp 1.650.000/g", change: "+15.000", positive: true },
  { label: "NPL Perbankan", value: "2,24%", change: "-0,12%", positive: true },
  { label: "IHSG", value: "7.245", change: "+45,3", positive: true },
];
