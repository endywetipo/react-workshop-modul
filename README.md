# React Workshop — Modul Pemrograman Web

Proyek ini adalah implementasi materi **Workshop Pemrograman Web dengan React JS** dalam satu dashboard interaktif. Materi mencakup JSX, component, props, array, event handling, state, conditional rendering, form, parent-child, CRUD state, dan CRUD API PHP.

## Kebutuhan sistem

Untuk frontend, gunakan **Node.js 18 atau lebih baru** dan npm. Untuk mode API permanen lokal, gunakan **PHP 8 atau lebih baru**. GitHub Pages hanya menjalankan frontend statis; PHP harus dijalankan pada server PHP atau komputer lokal.

## Menjalankan frontend saja

```bash
npm install
npm start
```

Buka alamat Vite, biasanya:

```text
http://localhost:5173
```

Mode default adalah **Mode State Lokal**. Perubahan tambah, edit, hapus, dan quantity hanya tersimpan selama halaman sedang terbuka.

## Menjalankan backend PHP

Buka terminal kedua dari folder root proyek, lalu jalankan:

```bash
php -S localhost:8000 -t backend-php
```

Endpoint API:

```text
http://localhost:8000/products.php
```

Biarkan terminal PHP tetap terbuka. Jika endpoint dapat dibuka dan menampilkan JSON produk, backend sudah aktif.

## Menggunakan CRUD permanen melalui API PHP

1. Jalankan backend PHP pada port `8000`.
2. Jalankan frontend dengan `npm start`.
3. Buka `http://localhost:5173`.
4. Pilih modul **coba08 — CRUD dengan API PHP**.
5. Klik tombol **Mode State Lokal** sampai berubah menjadi **Mode API PHP**.
6. Aplikasi akan mengambil data dari `products.php`.
7. Tambah, edit, atau hapus produk.
8. Data akan ditulis ke `backend-php/products.json` melalui endpoint PHP.
9. Refresh halaman atau matikan dan nyalakan kembali server; data API tetap ada selama file `products.json` tidak dihapus.

Frontend menggunakan URL API berikut secara default:

```text
http://localhost:8000/products.php
```

Untuk server PHP online, buat file `.env` pada root proyek:

```env
VITE_API_BASE_URL=https://domain-php-anda.com/products.php
```

Kemudian build ulang frontend:

```bash
npm run build
```

Pastikan server PHP online mengizinkan CORS dari domain frontend dan memiliki izin tulis pada `products.json`.

## Kontrak endpoint API

| Method | URL | Fungsi |
|---|---|---|
| GET | `/products.php` | Mengambil semua produk |
| POST | `/products.php` | Menambah produk |
| PUT | `/products.php?id=1` | Mengubah produk berdasarkan ID |
| DELETE | `/products.php?id=1` | Menghapus produk berdasarkan ID |

Contoh body JSON untuk `POST` dan `PUT`:

```json
{
  "nama": "Honda Civic",
  "keterangan": "Sedan sporty untuk data latihan.",
  "gambar": "https://example.com/civic.jpg",
  "link": "https://example.com"
}
```

## Struktur folder

```text
react-workshop/
├── backend-php/
│   ├── config.php
│   ├── products.php
│   ├── products.json
│   └── README.md
├── public/
├── src/
│   ├── data/
│   │   └── workshopData.js
│   ├── api.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Pemetaan materi modul

| Materi | Implementasi |
|---|---|
| coba01 | Variabel, JSX, dan rendering elemen React |
| coba02 | Functional component, styling, dan kartu nilai |
| coba02c | Props, reusable component, array, dan `map()` |
| coba03 | Event handler `onClick` |
| coba03b | `useState` melalui demo counter |
| coba03c | Conditional rendering: if, ternary, dan short-circuit |
| coba04 | Quantity keranjang dengan event, state, dan conditional |
| coba05 | Controlled form, `onChange`, destructuring, dan spread operator |
| coba06 | Parent-child communication dan method as props |
| coba07 | CRUD lokal dengan state |
| coba08 | CRUD permanen melalui API PHP dan `products.json` |

## Catatan hosting

Website frontend dapat di-host di GitHub Pages pada:

```text
https://endywetipo.github.io/react-workshop-modul/
```

Namun GitHub Pages **tidak menjalankan PHP**. Karena itu, mode API PHP permanen pada website online memerlukan hosting PHP terpisah, misalnya shared hosting/cPanel yang mendukung PHP, lalu nilai `VITE_API_BASE_URL` diarahkan ke endpoint PHP online tersebut. Jika backend belum di-host online, gunakan mode API PHP secara lokal.

## Build dan preview produksi

```bash
npm run build
npm run preview
```

## Sumber materi

Kode ini dibuat sebagai proyek pembelajaran berdasarkan modul PDF yang diberikan. Contoh gambar produk menggunakan URL publik Unsplash dan hanya digunakan sebagai data demo.
