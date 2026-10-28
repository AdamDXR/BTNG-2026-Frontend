# Garasi Mobil - Website Showroom Mobil

Website showroom mobil dibuat untuk memenuhi **Tugas Akhir BTNG Kelas Frontend**.
Dibangun menggunakan **HTML5, CSS3, dan Vanilla JavaScript murni** tanpa framework sesuai dengan ketentuan teknis yang dipersyaratkan.

## Fitur Website

1. **Integrasi API Resmi Panitia (Wajib):**
   - Mengambil data mobil dari endpoint `https://api-web.dnccudinus.org/api/mobil` menggunakan fungsi `fetch()`.
   - Mengolah respons JSON dan menampilkannya secara dinamis menggunakan DOM Manipulation (`createElement`, `innerHTML`).
2. **Pencarian & Penyaringan Data (Filter & Sort):**
   - Pencarian berdasarkan nama mobil dan brand secara langsung.
   - Filter dropdown merek kendaraan (otomatis diekstrak dari data API).
   - Filter status ketersediaan (Tersedia / Terjual).
   - Pengurutan harga (Terbaru, Harga Terendah, Harga Tertinggi).
3. **Modal Detail Kendaraan:**
   - Menampilkan informasi lengkap unit mobil (spesifikasi transmisi, bahan bakar, tahun produksi, status, dan harga).
   - Tombol interaktif langsung menuju pesan WhatsApp dengan template pesan otomatis unit yang diminati.
4. **Desain Bersih & Responsif:**
   - Tata letak yang ramah pengguna di berbagai ukuran layar: Desktop, Tablet, dan Smartphone.
   - Menu navigasi mobile (hamburger toggle).
5. **Formulir Kontak:**
   - Formulir pesan konsultasi showroom dengan validasi input sederhana.

## Struktur File & Folder

```
BTNG-Frontend-NamaGw/
├── index.html          # Struktur halaman utama (HTML5)
├── css/
│   └── style.css       # Desain dan tata letak responsif (CSS3)
├── js/
│   └── script.js       # Integrasi fetch API, DOM manipulation, filter & modal
├── images/             # Folder aset gambar lokal
│   └── README.md
└── README.md           # Dokumentasi proyek
```

## Cara Menjalankan

1. Clone atau unduh folder proyek ini.
2. Buka file `index.html` langsung menggunakan browser pilihan Anda (Chrome, Edge, Firefox, dll), atau jalankan menggunakan ekstensi **Live Server** di VS Code.
3. Pastikan perangkat Anda terhubung dengan internet agar fungsi `fetch()` ke API resmi dapat memuat data mobil.
