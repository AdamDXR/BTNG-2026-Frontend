const btnUbahTeks = document.querySelector('#btn-ubah-teks');
const teksDeskripsi = document.querySelector('#teks-deskripsi');

btnUbahTeks.addEventListener('click', function() {
    teksDeskripsi.textContent = "Terima kasih sudah mengunjungi profil saya! Saat ini saya sedang fokus mengembangkan berbagai proyek aplikasi responsif dan mengeksplorasi teknologi baru.";
});

const btnGantiTema = document.querySelector('#btn-ganti-tema');
const body = document.querySelector('body');

btnGantiTema.addEventListener('click', function() {
    body.classList.toggle('tema-gelap');
});