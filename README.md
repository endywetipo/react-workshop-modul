# React Workshop — Modul Pemrograman Web

Proyek ini adalah implementasi rapi dan siap jalan dari materi **Workshop Pemrograman Web dengan React JS**. Seluruh latihan disatukan dalam satu dashboard interaktif agar setiap konsep dapat dipelajari melalui navigasi modul di sisi kiri.

## Kebutuhan sistem

Pastikan komputer telah memiliki **Node.js versi 18 atau lebih baru** dan npm. Tidak ada database atau API eksternal yang wajib disiapkan untuk menjalankan versi frontend ini.

## Menjalankan proyek

```bash
npm install
npm start
```

Setelah server aktif, buka alamat yang ditampilkan oleh Vite, biasanya `http://localhost:5173`.

Untuk membuat build produksi:

```bash
npm run build
npm run preview
```

## Struktur folder

```text
react-workshop/
├── backend-php/
│   ├── config.php
│   ├── products.php
│   └── README.md
├── public/
├── src/
│   ├── components/
│   ├── data/
│   │   └── workshopData.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

Folder `components/` disiapkan untuk pemisahan komponen lanjutan. Pada versi ini komponen demo yang saling berkaitan berada di `App.jsx` agar mudah dibandingkan dengan contoh modul, sementara data dipisahkan di `src/data/workshopData.js`.

## Pemetaan materi modul

| Bab | Implementasi dalam aplikasi |
|---|---|
| coba01 | Variabel `nama`, JSX, dan rendering elemen React |
| coba02 | Functional component, styling, dan kartu nilai |
| coba02b/c | Props, reusable component, array, dan `map()` |
| coba03 | Event handler `onClick` |
| coba03b | `useState` melalui demo counter |
| coba03c | Conditional rendering berdasarkan nilai state |
| coba04 | Project quantity/keranjang dengan event, state, dan conditional |
| coba05 | Controlled form, `onChange`, destructuring, dan spread operator |
| coba06 | Parent-child communication dan method as props |
| coba07 | CRUD dengan state: tambah, edit, hapus, dan tampil data |
| coba08/coba09 | Simulasi mode API dan backend PHP sederhana di folder `backend-php/` |

## Catatan mode API PHP

Frontend dapat dijalankan tanpa PHP melalui mode state lokal. Jika ingin mencoba backend PHP, jalankan dari root proyek:

```bash
php -S localhost:8000 -t backend-php
```

Endpoint tersedia di `http://localhost:8000/products.php`. Detail kontrak endpoint terdapat pada `backend-php/README.md`.

## Fitur yang tersedia

Aplikasi mencakup navigasi antar latihan, progress modul, contoh data siswa, kartu produk dengan props, quantity keranjang, form controlled, komunikasi parent-child, serta CRUD produk yang dapat diuji langsung. Desain sudah responsif untuk layar desktop dan mobile.

## Lisensi dan sumber materi

Kode ini dibuat sebagai proyek pembelajaran berdasarkan modul PDF yang diberikan pengguna. Gambar produk menggunakan URL gambar publik Unsplash dan hanya dipakai sebagai data demo.
