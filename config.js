// ============================================================
// RAUFA DIGITAL - PENGATURAN UTAMA
// ============================================================
// Edit file ini jika ingin mengganti nama toko, WhatsApp, produk,
// link Lynk, atau koneksi Supabase.
//
// PENTING:
// - Publishable key boleh digunakan di browser.
// - JANGAN pernah memasukkan Secret key / service_role key di sini.
// ============================================================

const CONFIG = {
  storeName: "Raufa Digital",
  tagline: "Worksheet & Produk Digital Anak",
  whatsapp: "6285264119867",
  email: "",

  // ===================== SUPABASE =====================
  // Project URL milik Raufa Digital.
  supabaseUrl: "https://cbftlvmlceabclyhdtgm.supabase.co",

  // Tempel PUBLISHABLE KEY dari Supabase > Settings > API Keys.
  // Contoh awal key: sb_publishable_...
  supabasePublishableKey: "sb_publishable_eXqGlCk1zlL-Yk2kFvhXtw__gNVR7i_",
  // Alias lama agar kode tetap kompatibel.
  supabaseAnonKey: "sb_publishable_eXqGlCk1zlL-Yk2kFvhXtw__gNVR7i_",

  // ===================== LYNK =====================
  lynkStoreUrl: "https://lynk.id/fadilyusdi",
  lynkMemberUrl: "https://lynk.id/fadilyusdi",

  // ===================== KATEGORI =====================
  categories: [
    { name: "Worksheet Anak", icon: "🧩", description: "Aktivitas seru" },
    { name: "Islami", icon: "🌙", description: "Anak sholeh & solehah" },
    { name: "Matematika", icon: "🔢", description: "Belajar berhitung" },
    { name: "Mewarnai", icon: "🎨", description: "Kreativitas anak" },
    { name: "Membaca", icon: "📖", description: "Belajar membaca" },
    { name: "Berhitung", icon: "🔢", description: "Latihan angka" },
    { name: "Aktivitas Anak", icon: "⭐", description: "Belajar sambil bermain" },
    { name: "Bundling", icon: "🎁", description: "Paket hemat" },
    { name: "Ebook", icon: "📚", description: "Panduan digital" },
    { name: "Produk Digital", icon: "💡", description: "Koleksi digital" }
  ],

  // ===================== PRODUK =====================
  // Harga tidak ditampilkan di kartu katalog, tetapi dipakai di detail produk.
  catalogProducts: [
    {
      id: "bundle-premium",
      name: "Paket Bundling Worksheet Anak Premium",
      category: "Bundling",
      price: 99999,
      icon: "🎁",
      description: "Paket premium worksheet anak untuk belajar, bermain, membaca, berhitung, menggambar, dan aktivitas lainnya.",
      lynk_url: "https://lynk.id/fadilyusdi/w30815z44we6",
      featured: true
    },
    {
      id: "islami",
      name: "1200++ Halaman Aktifitas Anak Islami",
      category: "Islami",
      price: 24000,
      icon: "🌙",
      description: "Kumpulan aktivitas islami untuk anak agar belajar agama dengan cara menyenangkan.",
      lynk_url: "https://lynk.id/fadilyusdi/zq8x7yqp3x80",
      featured: true
    },
    {
      id: "matematika",
      name: "Worksheet Matematika Dasar Anak 2–9 Tahun",
      category: "Matematika",
      price: 20000,
      icon: "🔢",
      description: "Latihan matematika dasar untuk membantu anak belajar angka dan berhitung.",
      lynk_url: "https://lynk.id/fadilyusdi/ow9dr62q4wx3",
      featured: true
    },
    {
      id: "printable",
      name: "39000+ Printable Anak Hebat",
      category: "Worksheet Anak",
      price: 24000,
      icon: "📚",
      description: "Koleksi printable anak untuk membaca, menghitung, mewarnai, dan berbagai aktivitas lainnya.",
      lynk_url: "https://lynk.id/fadilyusdi/9z89j3w58e66",
      featured: true
    },
    {
      id: "ebook-cuan",
      name: "Ebook Panduan Lengkap Cuan dari Lynk.id",
      category: "Ebook",
      price: 10000,
      icon: "💡",
      description: "Panduan digital untuk membantu memahami dan memulai penjualan produk melalui Lynk.id.",
      lynk_url: "https://lynk.id/fadilyusdi/d6y1zdoew5gz",
      featured: false
    },
    {
      id: "produk-digital-2026",
      name: "750++ Produk Digital 2026",
      category: "Produk Digital",
      price: 55000,
      icon: "🚀",
      description: "Koleksi produk digital yang dapat menjadi referensi dan bahan untuk mengembangkan bisnis digital.",
      lynk_url: "https://lynk.id/fadilyusdi/d3zr8w4ln20e",
      featured: true
    }
  ],

  pages: {
    login: "login.html",
    register: "register.html",
    dashboard: "dashboard.html",
    myProducts: "my-products.html",
    orders: "orders.html",
    adminLogin: "admin/login.html",
    adminLoginPath: "login.html",
    adminDashboard: "admin/dashboard.html"
  }
};

window.CONFIG = CONFIG;
window.RAUFA_CONFIG = CONFIG;
