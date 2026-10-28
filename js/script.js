const API_URL = "https://api-web.dnccudinus.org/api/mobil";

let listMobil = [];

const carGrid = document.getElementById("carGrid");
const katalogStatus = document.getElementById("katalogStatus");
const inputCari = document.getElementById("inputCari");
const filterBrand = document.getElementById("filterBrand");
const filterStatus = document.getElementById("filterStatus");
const sortHarga = document.getElementById("sortHarga");

const modalDetail = document.getElementById("modalDetail");
const modalKonten = document.getElementById("modalKonten");
const btnTutupModal = document.getElementById("btnTutupModal");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const formKontak = document.getElementById("formKontak");
const formNotif = document.getElementById("formNotif");

/* ===================================================
   1. FUNGSI PENDUKUNG (FORMATTER)
   =================================================== */

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(angka);
}

/* ===================================================
   2. INTEGRASI API: FETCH DATA MOBIL
   =================================================== */
async function ambilDataMobil() {
  try {
    katalogStatus.textContent = "Mengambil data mobil dari server...";
    
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Gagal mengambil data dari server (Status: " + response.status + ")");
    }

    const hasil = await response.json();
    listMobil = hasil.data || [];

    isiPilihanMerek(listMobil);

    tampilkanMobil(listMobil);

  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    katalogStatus.textContent = "";
    carGrid.innerHTML = `
      <div class="empty-box">
        <h3>Gagal Memuat Data Mobil</h3>
        <p>Pastikan koneksi internet Anda aktif, lalu coba muat ulang halaman.</p>
      </div>
    `;
  }
}

/* ===================================================
   3. DOM MANIPULATION: MENAMPILKAN KARTU MOBIL
   =================================================== */
function tampilkanMobil(data) {
  carGrid.innerHTML = "";

  if (data.length === 0) {
    katalogStatus.textContent = "Tidak ada mobil yang cocok dengan pencarian.";
    carGrid.innerHTML = `
      <div class="empty-box">
        <h3>Mobil Tidak Ditemukan</h3>
        <p>Silakan coba kata kunci atau filter yang berbeda.</p>
      </div>
    `;
    return;
  }

  katalogStatus.textContent = `Menampilkan ${data.length} dari ${listMobil.length} unit mobil`;

  data.forEach((mobil) => {
    const isTersedia = mobil.status.toLowerCase() === "tersedia";
    const statusClass = isTersedia ? "status-tersedia" : "status-sold";
    const statusText = isTersedia ? "Tersedia" : "Terjual";

    const card = document.createElement("article");
    card.className = "car-card";

    card.innerHTML = `
      <div class="car-card-img-wrap">
        <img src="${mobil.foto}" alt="${mobil.nama}" loading="lazy" onerror="this.src='images/fallback-mobil.jpg'">
        <span class="status-badge ${statusClass}">${statusText}</span>
      </div>
      <div class="car-card-body">
        <span class="car-brand-year">${mobil.brand} &bull; ${mobil.tahun}</span>
        <h3 class="car-title">${mobil.nama}</h3>
        <div class="car-specs">
          <span class="spec-pill">${mobil.transmisi}</span>
          <span class="spec-pill">${mobil.bahan_bakar}</span>
        </div>
        <div class="car-footer">
          <div class="car-price">${formatRupiah(mobil.harga)}</div>
          <button type="button" class="btn btn-secondary btn-detail">Detail</button>
        </div>
      </div>
    `;

    card.querySelector(".btn-detail").addEventListener("click", () => {
      bukaModalDetail(mobil);
    });

    carGrid.appendChild(card);
  });
}

function isiPilihanMerek(data) {
  const brandUnik = [...new Set(data.map((m) => m.brand))].sort();

  brandUnik.forEach((brand) => {
    const option = document.createElement("option");
    option.value = brand;
    option.textContent = brand;
    filterBrand.appendChild(option);
  });
}

/* ===================================================
   4. FILTER & PENCARIAN MOBIL
   =================================================== */
function saringDanUrutkanMobil() {
  const kataKunci = inputCari.value.trim().toLowerCase();
  const brandTerpilih = filterBrand.value;
  const statusTerpilih = filterStatus.value;
  const urutan = sortHarga.value;

  let hasil = listMobil.filter((mobil) => {
    const cocokNama = mobil.nama.toLowerCase().includes(kataKunci) ||
                      mobil.brand.toLowerCase().includes(kataKunci);
    const cocokBrand = !brandTerpilih || mobil.brand === brandTerpilih;
    const cocokStatus = !statusTerpilih || mobil.status.toLowerCase() === statusTerpilih;

    return cocokNama && cocokBrand && cocokStatus;
  });

  if (urutan === "termurah") {
    hasil.sort((a, b) => a.harga - b.harga);
  } else if (urutan === "termahal") {
    hasil.sort((a, b) => b.harga - a.harga);
  } else {
    hasil.sort((a, b) => b.id - a.id);
  }

  tampilkanMobil(hasil);
}

inputCari.addEventListener("input", saringDanUrutkanMobil);
filterBrand.addEventListener("change", saringDanUrutkanMobil);
filterStatus.addEventListener("change", saringDanUrutkanMobil);
sortHarga.addEventListener("change", saringDanUrutkanMobil);

/* ===================================================
   5. MODAL DETAIL MOBIL
   =================================================== */
function bukaModalDetail(mobil) {
  const isTersedia = mobil.status.toLowerCase() === "tersedia";
  const pesanWa = encodeURIComponent(`Halo Garasi Mobil, saya tertarik dengan unit *${mobil.nama} (${mobil.tahun})*. Apakah unit ini masih tersedia?`);

  modalKonten.innerHTML = `
    <img src="${mobil.foto}" alt="${mobil.nama}" class="modal-car-img" onerror="this.src='images/fallback-mobil.jpg'">
    <div class="modal-body">
      <span class="status-badge ${isTersedia ? "status-tersedia" : "status-sold"}">
        ${isTersedia ? "Tersedia" : "Terjual"}
      </span>
      <h3 style="font-size: 22px; font-weight: 700; color: #0f172a; margin-top: 10px;">${mobil.nama}</h3>
      <div class="modal-price">${formatRupiah(mobil.harga)}</div>

      <div class="modal-spec-grid">
        <div class="modal-spec-item">
          <span>Merek / Brand</span>
          <strong>${mobil.brand}</strong>
        </div>
        <div class="modal-spec-item">
          <span>Tahun Produksi</span>
          <strong>${mobil.tahun}</strong>
        </div>
        <div class="modal-spec-item">
          <span>Transmisi</span>
          <strong>${mobil.transmisi}</strong>
        </div>
        <div class="modal-spec-item">
          <span>Bahan Bakar</span>
          <strong>${mobil.bahan_bakar}</strong>
        </div>
      </div>

      <a href="https://wa.me/6281234567890?text=${pesanWa}" target="_blank" rel="noopener" class="modal-wa-btn">
        ${isTersedia ? "Tanya Unit Ini via WhatsApp" : "Tanyakan Unit Serupa via WhatsApp"}
      </a>
    </div>
  `;

  modalDetail.classList.add("active");
  document.body.style.overflow = "hidden";
}

function tutupModalDetail() {
  modalDetail.classList.remove("active");
  document.body.style.overflow = "";
}

btnTutupModal.addEventListener("click", tutupModalDetail);

modalDetail.addEventListener("click", (e) => {
  if (e.target === modalDetail) {
    tutupModalDetail();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalDetail.classList.contains("active")) {
    tutupModalDetail();
  }
});

/* ===================================================
   6. NAVIGASI MOBILE (HAMBURGER TOGGLE)
   =================================================== */
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

/* ===================================================
   7. FORM KONTAK (SIMULASI PENGIRIMAN)
   =================================================== */
formKontak.addEventListener("submit", (e) => {
  e.preventDefault();
  const nama = document.getElementById("namaPengirim").value.trim();

  formNotif.textContent = `Terima kasih ${nama}, pesan Anda berhasil dikirim! Tim kami akan segera menghubungi nomor WhatsApp Anda.`;
  formKontak.reset();

  setTimeout(() => {
    formNotif.textContent = "";
  }, 6000);
});

document.getElementById("tahunFooter").textContent = new Date().getFullYear();

ambilDataMobil();
