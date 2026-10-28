# Garasi Mobil - Website Showroom Mobil

Tugas Akhir BTNG 2026 Frontend
Adam Haritsa Thahara

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

